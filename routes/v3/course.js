var express = require('express');
var router = express.Router();

const courseStorage = require('../../courseStorage');


/**
 * @swagger
 * tags:
 *   name: Course
 *   description: Get all course 
 * /v3/course:
 *   get:
 *     summary: Get a list of course
 *     description: Retrieve a list of course from the database
 *     security:
 *      - apiKey: []
 *     tags: [Course]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               {code: "0000", course: [ { id : '1', coursename: 'testing api', price: 4500 }, { id : '2', coursename: 'automate test', price: 6500 }]}
 *
 */
router.get('/', function (req, res, next) {
    const course = courseStorage.getAll();
    if (course != 0) {
        res.json({ code: "0000", course });
    } else {
        res.status(404).json({ code: "C001", message: 'course not found' });
    }
});

/**
 * @swagger
 * /v3/course/{id}:
 *   get:
 *     summary: Get a course by id
 *     description: Retrieve a course from the database by ID
 *     security:
 *      - apiKey: []
 *     tags: [Course]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: search course by id
 *         schema:
 *           type: string
 *       - in: header
 *         name: os
 *         required: true
 *         description: os device
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               {code: "0000", course: { "id": "1", "coursename" : "testing API", "price": 4500  }}
 *       404:
 *         description: course not found
 *         content:
 *           application/json:
 *             example:
 *               {code: "C001", message: 'course not found'}
 */
router.get('/:id', (req, res) => {
    const course = courseStorage.read(req.params.id);
    const osDevice = req.headers.os;
    //console.log("osss "+osDevice);
    if(osDevice == 0 || osDevice == undefined){
        res.status(400).json({ code: "C002", message: 'os is null' });
    }
    else if (course) {
        res.json({ code: "0000", course });
    } else {
        res.status(404).json({ code: "C001", message: 'course not found' });
    }

});

/**
 * @swagger
 * /v3/course:
 *   post:
 *     summary: Create a new course
 *     description: Create a new course in the database
 *     security:
 *      - apiKey: []
 *     tags: [Course]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               coursename:
 *                 type: string
 *                 description: The course's name.
 *                 example: testing
 *               price:
 *                 type: string
 *                 description: The course's price.
 *                 example: 4500
 *     responses:
 *       201:
 *         description: course created successfully
 *         content:
 *           application/json:
 *             example:
 *               {code: "0000", message: 'course created successfully', courseId:1}
 *       400:
 *         description: course name is null
 *         content:
 *           application/json:
 *             example:
 *               {code: "C002", message: 'course name is null'}
 */
router.post('/', (req, res) => {
    const { coursename, price } = req.body;

    if (coursename == 0) {
        res.status(400).json({ code: "C002", message: 'course name is null' });
    }
    else if (price == 0) {
        res.status(400).json({ code: "C002", message: 'price is null' });
    }
    else {
        var courseAll = courseStorage.getAll();
        var id = courseAll.length + 1
        if (courseAll.length > 0) {
            id = courseAll[courseAll.length - 1].id + 1
        }
        const course = { id, coursename, price };
        courseStorage.create(id, course);
        res.status(201).json({
            code: "0000",
            message: 'course created successfully',
            courseId: id
        });
    }
});

/**
 * @swagger
 * /v3/course/{id}:
 *   put:
 *     summary: Update course details
 *     description: Update course details in the database
 *     security:
 *      - apiKey: []
 *     tags: [Course]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: id of the course to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               coursename:
 *                 type: string
 *                 description: The course's name.
 *                 example: testing
 *               price:
 *                 type: string
 *                 description: The course's name.
 *                 example: 4500
 *     responses:
 *       200:
 *         description: course updated successfully
 *         content:
 *           application/json:
 *             example:
 *               {code: "0000", message: 'course updated successfully'}
 *       404:
 *         description: course not found
 *         content:
 *           application/json:
 *             example:
 *               {code: "C001",message: 'course not found'}
 */
router.put('/:id', (req, res) => {
    const { coursename, price } = req.body;
    if (coursename == 0) {
        res.status(400).json({ code: "C002", message: 'course name is null' });
    }
    else if (price == 0) {
        res.status(400).json({ code: "C002", message: 'price is null' });
    }
    else if (req.params.id == 0) {
        res.status(400).json({ code: "C002", message: 'id is null' });
    }
    else {
        const updatedcourse = { id: parseInt(req.params.id), coursename, price };
        const success = courseStorage.update(parseInt(req.params.id), updatedcourse);
        if (success) {
            res.json({ code: "0000", message: 'course updated successfully' });
        } else {
            res.status(404).json({ code: "C001", message: 'course not found' });
        }
    }
});

/**
 * @swagger
 * /v3/course/{id}:
 *   patch:
 *     summary: Update course details
 *     description: Update course details in the database
 *     security:
 *      - apiKey: []
 *     tags: [Course]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: id of the course to update
 *         schema:
 *           type: string
 *       - in: query
 *         name: price
 *         required: true
 *         description: price of the course to update
 *         schema:
 *           type: string
 
 *     responses:
 *       200:
 *         description: course updated successfully
 *         content:
 *           application/json:
 *             example:
 *               {code: "0000",message: 'course updated successfully'}
 *       404:
 *         description: course not found
 *         content:
 *           application/json:
 *             example:
 *               {code: "C001",message: 'course not found'}
 */
router.patch('/:id', (req, res) => {
    const price = req.query.price;
    //console.log("price"+price);
    if (price == 0 || price == undefined) {
        res.status(400).json({ code: "C002", message: 'price is null' });
    }
    else {
        const success = courseStorage.updatePrice(req.params.id, price);
        if (success) {
            res.json({ code: "0000", message: 'course updated successfully' });
        } else {
            res.status(404).json({ code: "C001", message: 'course not found' });
        }
    }
});

/**
 * @swagger
 * /v3/course/{id}:
 *   delete:
 *     summary: Delete a course
 *     description: Delete a course from the database
 *     security:
 *      - apiKey: []
 *     tags: [Course]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the course to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: course deleted successfully
 *         content:
 *           application/json:
 *             example:
 *               { code: "0000",message: 'course deleted successfully'}
 *       404:
 *         description: course not found
 *         content:
 *           application/json:
 *             example:
 *               { code: "C001", message: 'coursename is found'}
 */
router.delete('/:id', (req, res) => {
    const success = courseStorage.remove(req.params.id);

    if (success) {
        res.json({ code: "0000", message: 'course deleted successfully' });
    } else {
        res.status(404).json({ code: "C001", message: 'course not found' });
    }
});



module.exports = router;
