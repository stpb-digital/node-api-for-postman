var express = require('express');
var router = express.Router();

const productStorage = require('../v2/productStorage');


/**
 * @swagger
 * tags:
 *   name: Product
 *   description: Get all product 
 * /v2/product:
 *   get:
 *     summary: Get a list of product
 *     description: Retrieve a list of product from the database
 *     security:
 *      - apiKey: []
 *     tags: [Product]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               {code: "0000", product: [ { id : '1', producttype: '1', productname: 'เสื้อครอบ', price: 4500 }, { id : '2', producttype: '1', productname: 'กระโปรงยีนส์', price: 6500 }]}
 *
 */
router.get('/', function (req, res, next) {
    const product = productStorage.getAll();
    if (product != 0) {
        res.json({ code: "0000", product });
    } else {
        res.status(404).json({ code: "P001", message: 'Product not found' });
    }
});

/**
 * @swagger
 * /v2/product/{id}:
 *   get:
 *     summary: Get a product by id
 *     description: Retrieve a product from the database by ID
 *     security:
 *      - apiKey: []
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: search product by id
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               {code: "0000",product: { "id": "1", producttype: '1', "productname" : "เสื้อครอบ", "price": 4500  }}
 *       404:
 *         description: Product not found
 *         content:
 *           application/json:
 *             example:
 *               {code: "P001",message: 'Product not found'}
 */
router.get('/:id', (req, res) => {
    const product = productStorage.read(req.params.id);
   
    if (product) {
        res.json({ code: "0000", product });
    } else {
        res.status(404).json({ code: "P001", message: 'Product not found' });
    }

});

/**
 * @swagger
 * /v2/product:
 *   post:
 *     summary: Create a new product
 *     description: Create a new product in the database
 *     security:
 *      - apiKey: []
 *     tags: [Product]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               producttype:
 *                 type: string
 *                 description: The product's type id.
 *                 example: 1
 *               productname:
 *                 type: string
 *                 description: The product's name.
 *                 example: crop top
 *               price:
 *                 type: string
 *                 description: The product's price.
 *                 example: 450
 *     responses:
 *       201:
 *         description: Product created successfully
 *         content:
 *           application/json:
 *             example:
 *               { code: "0000",message: 'Product created successfully'}
 *       400:
 *         description: Product not found
 *         content:
 *           application/json:
 *             example:
 *               { code: "P002", message: 'Product name is null'}
 */
router.post('/', (req, res) => {
    const { producttype, productname, price } = req.body;

    if (productname == 0) {
        res.status(400).json({ code: "P002", message: 'Product name is null' });
    }
    else if (producttype == 0) {
        res.status(400).json({ code: "P002", message: 'Product type is null' });
    }
    else {
        var checkType = productStorage.readtype(producttype)
        if (checkType) {
            var productAll = productStorage.getAll();
            var id = productAll.length + 1
            if (productAll.length > 0) {
                id = productAll[productAll.length - 1].id + 1
            }
            const product = { id, producttype, productname, price };
            productStorage.create(id, product);
            res.status(201).json({
                code: "0000",
                message: 'Product created successfully',
                productId: id
            });
        } else {
            res.status(400).json({ code: "P003", message: 'Product type is incorrect' });
        }
    }
});

/**
 * @swagger
 * /v2/product/{id}:
 *   put:
 *     summary: Update product details
 *     description: Update product details in the database
 *     security:
 *      - apiKey: []
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: id of the product to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               producttype:
 *                 type: string
 *                 description: The product's type id.
 *                 example: 1
 *               productname:
 *                 type: string
 *                 description: The product's name.
 *                 example: crop top
 *               price:
 *                 type: string
 *                 description: The product's price.
 *                 example: 450
 *     responses:
 *       200:
 *         description: Product updated successfully
 *         content:
 *           application/json:
 *             example:
 *               {code: "0000",message: 'Product updated successfully'}
 *       404:
 *         description: Product not found
 *         content:
 *           application/json:
 *             example:
 *               {code: "P001",message: 'Product not found'}
 */
router.put('/:id', (req, res) => {
    const { producttype, productname, price } = req.body;
    if (producttype == 0) {
        res.status(400).json({ code: "P002", message: 'Product name is null' });
    }
    else if (productname == 0) {
        res.status(400).json({ code: "P002", message: 'Product name is null' });
    }
    else if (price == 0) {
        res.status(400).json({ code: "P002", message: 'Price is null' });
    }
    else {
        var checkType = productStorage.readtype(producttype)
        if (checkType) {
            const updatedproduct = { id: req.params.id, producttype, productname, price };
            const success = productStorage.update(req.params.id, updatedproduct);
            if (success) {
                res.json({ code: "0000", message: 'Product updated successfully' });
            } else {
                res.status(404).json({ code: "P001", message: 'Product not found' });
            }
        } else {
            res.status(400).json({ code: "P003", message: 'Product type is incorrect' });
        }
    }
});

/**
 * @swagger
 * /v2/product/{id}:
 *   patch:
 *     summary: Update product details
 *     description: Update product details in the database
 *     security:
 *      - apiKey: []
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: id of the product to update
 *         schema:
 *           type: string
 *       - in: query
 *         name: price
 *         required: true
 *         description: price of the product to update
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product updated successfully
 *         content:
 *           application/json:
 *             example:
 *               { code: "0000",message: 'Product updated successfully'}
 *       404:
 *         description: Product not found
 *         content:
 *           application/json:
 *             example:
 *               { code: "P001",message: 'Product not found'}
 */
router.patch('/:id', (req, res) => {
    const price = req.query.price;
    if (price == 0 || price == undefined) {
        res.status(400).json({ code: "P002", message: 'Price is null' });
    }
    else {
        const success = productStorage.updatePrice(req.params.id, price);
        if (success) {
            res.json({ code: "0000", message: 'Product updated successfully' });
        } else {
            res.status(404).json({ code: "P001", message: 'Product not found' });
        }
    }
});

/**
 * @swagger
 * /v2/product/{id}:
 *   delete:
 *     summary: Delete a product
 *     description: Delete a product from the database
 *     security:
 *      - apiKey: []
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the product to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: product deleted successfully
 *         content:
 *           application/json:
 *             example:
 *               { code: "0000",message: 'product deleted successfully'}
 *       404:
 *         description: Product not found
 *         content:
 *           application/json:
 *             example:
 *               { code: "P001",message: 'Product not found'}
 */
router.delete('/:id', (req, res) => {
    const success = productStorage.remove(req.params.id);
    if (success) {
        res.json({ code: "0000",message: 'product deleted successfully' });
    } else {
        res.status(404).json({code: "P001", message: 'Product not found' });
    }
});

module.exports = router;
