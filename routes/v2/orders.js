var express = require('express');
var router = express.Router();

const productStorage = require('./productStorage');

/**
 * @swagger
 * tags:
 *   name: Order
 *   description: Get all order 
 * /v2/orders:
 *   get:
 *     summary: Get a list of order
 *     description: Retrieve a list of order from the database
 *     security:
 *      - apiKey: []
 *     tags: [Order]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               {code: "0000",order: [ { id : '1', producutid : '1', username: 'LG', quantity: 1 }, { id : '2', producutid: '1', username: 'Beam', price: 2 }]}
 *
 */
router.get('/', function (req, res, next) {
    const order = productStorage.getAllOrder();

    if (order != 0) {
        res.json({ code: "0000", order });
    } else {
        res.status(404).json({ code: "O001", message: 'order not found' });
    }
});

/**
 * @swagger
 * /v2/orders/{id}:
 *   get:
 *     summary: Get a order by id
 *     description: Retrieve a order from the database by ID
 *     security:
 *      - apiKey: []
 *     tags: [Order]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: search order by id
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
 *               { code: "0000",order: { id : '1', producutid : '1', username: 'LG', quantity: 1 }}
 *       404:
 *         description: order not found
 *         content:
 *           application/json:
 *             example:
 *               { code: "O001",message: 'order not found'}
 */
router.get('/:id', (req, res) => {
    const order = productStorage.readOrder(req.params.id);
    const osDevice = req.headers.os;
    //console.log("osss "+osDevice);
    if(osDevice == 0 || osDevice == undefined){
        res.status(400).json({ code: "O002", message: 'os is null' });
    }
    else if (order) {
        res.json({ code: "0000", order });
    } else {
        res.status(404).json({ code: "O001", message: 'order not found' });
    }

});

/**
 * @swagger
 * /v2/orders:
 *   post:
 *     summary: Create a new order
 *     description: Create a new order in the database
 *     security:
 *      - apiKey: []
 *     tags: [Order]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               producutid:
 *                 type: string
 *                 description: The product's type id.
 *                 example: 1
 *               username:
 *                 type: string
 *                 description: The order's name.
 *                 example: mac
 *               quantity:
 *                 type: string
 *                 description: The order's price.
 *                 example: 3
 *     responses:
 *       201:
 *         description: order created successfully
 *         content:
 *           application/json:
 *             example:
 *               {code: "0000",message: 'order created successfully'}
 *       400:
 *         description: ordername is null
 *         content:
 *           application/json:
 *             example:
 *               {code: "O002",message: 'ordername is null'}
 */
router.post('/', (req, res) => {
    const { producutid, username, quantity } = req.body;

    if (username == 0) {
        res.status(400).json({ code: "O002", message: 'username is null' });
    }
    else if (producutid == 0) {
        res.status(400).json({ code: "O002", message: 'producutid is null' });
    }
    else if (quantity == 0) {
        res.status(400).json({ code: "O002", message: 'quantity is null' });
    } else {
        var checkProduct = productStorage.read(producutid)
        console.log("checkProduct " + checkProduct)
        if (checkProduct) {
            var orderAll = productStorage.getAllOrder();
            var id = orderAll.length + 1
            const order = { id, producutid, username, quantity };
            productStorage.createOrder(id, order);
            res.status(201).json({
                code: "0000",
                message: 'order created successfully',
                orderId: id
            });
        } else {
            res.status(400).json({ code: "O003", message: 'producut id is incorrect' });
        }
    }
});

/**
 * @swagger
 * /v2/orders/{id}:
 *   put:
 *     summary: Update order details
 *     description: Update order details in the database
 *     security:
 *      - apiKey: []
 *     tags: [Order]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: id of the order to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               producutid:
 *                 type: string
 *                 description: The product's type id.
 *                 example: 1
 *               username:
 *                 type: string
 *                 description: The order's name.
 *                 example: mac
 *               quantity:
 *                 type: string
 *                 description: The order's price.
 *                 example: 3
 *     responses:
 *       200:
 *         description: order updated successfully
 *         content:
 *           application/json:
 *             example:
 *               {code: "0000",message: 'order updated successfully'}
 *       404:
 *         description: order not found
 *         content:
 *           application/json:
 *             example:
 *               {code: "O001",message: 'order not found'}
 */
router.put('/:id', (req, res) => {
    const { producutid, username, quantity } = req.body;
    if (username == 0) {
        res.status(400).json({ code: "O002", message: 'username is null' });
    }
    else if (producutid == 0) {
        res.status(400).json({ code: "O002", message: 'producutid is null' });
    }
    else if (quantity == 0) {
        res.status(400).json({ code: "O002", message: 'quantity is null' });
    } else {
        if (productStorage.read(producutid)) {
            const updatedorder = { id: req.params.id, producutid, username, quantity };
            const success = productStorage.updateOrder(req.params.id, updatedorder);
            if (success) {
                res.json({ code: "0000", message: 'order updated successfully' });
            } else {
                res.status(404).json({ code: "O001", message: 'order not found' });
            }
        } else {
            res.status(400).json({ code: "O003", message: 'producut id is incorrect' });
        }

    }
});

/**
 * @swagger
 * /v2/orders/{id}:
 *   delete:
 *     summary: Delete a order
 *     description: Delete a order from the database
 *     security:
 *      - apiKey: []
 *     tags: [Order]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the order to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: order deleted successfully
 *         content:
 *           application/json:
 *             example:
 *                {code: "0000",message: 'order deleted successfully'}
 *       404:
 *         description: order not found
 *         content:
 *           application/json:
 *             example:
 *               {code: "O001",message: 'order is found'}
 */
router.delete('/:id', (req, res) => {

    const success = productStorage.removeOrder(req.params.id);
    if (success) {
        res.json({ code: "0000", message: 'order deleted successfully' });
    } else {
        res.status(404).json({ code: "O001", message: 'order not found' });
    }

});



module.exports = router;
