var express = require('express');
var router = express.Router();

const productStorage = require('../v2/productStorage');


/**
 * @swagger
 * tags:
 *   name: Product Type
 *   description: Get all product type 
 * /v2/producttype:
 *   get:
 *     summary: Get a list of product type
 *     description: Retrieve a list of product type from the database
 *     security:
 *      - apiKey: []
 *     tags: [Product Type]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               {code: "0000", producttype: [ { "id": "1", "producttypename": "top" }, {"id": "2", "producttypename": "jeans" }]}
 *
 */
router.get('/', function (req, res, next) {
    const producttype = productStorage.getAllType();
    if (producttype != 0) {
        res.json({ code: "0000",producttype });
    } else {
        res.status(404).json({ code: "P001", message: 'product type not found' });
    }
});


/**
 * @swagger
 * /v2/producttype:
 *   post:
 *     summary: Create a new product type
 *     description: Create a new product type in the database
 *     security:
 *      - apiKey: []
 *     tags: [Product Type]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               producttypename:
 *                 type: string
 *                 description: The product type's name.
 *                 example: shirt
 *     responses:
 *       201:
 *         description: product type created successfully
 *         content:
 *           application/json:
 *             example:
 *               { code: "0000", message: 'producttype created successfully'}
 *       400:
 *         description: product type name is null
 *         content:
 *           application/json:
 *             example:
 *               { code: "P001", message: 'product type name is null'}
 */
router.post('/', (req, res) => {
    const { producttypename } = req.body;

    if (producttypename == 0) {
        res.status(400).json({ code: "P001", message: 'product type name is null' });
    } else {
        var producttypeAll = productStorage.getAllType();
        var id = producttypeAll.length + 1
        const producttype = { id, producttypename };
        productStorage.createtype(id, producttype);
        res.status(201).json({
            code: "0000",
            message: 'producttype created successfully',
            producttypeId: id
        });
    }
});

module.exports = router;