
const express = require('express');
const router = express.Router()
const apiKeyMiddleware = require('../../apiKeyMiddleware'); 

var authRouter = require('./auth');
var productRouter = require('./product');
var productTypeRouter = require('./productType');
var orderRouter = require('./orders');
router.use('/auth',apiKeyMiddleware.log, authRouter);
router.use('/product',apiKeyMiddleware.verifyToken, productRouter);
router.use('/producttype',apiKeyMiddleware.verifyToken, productTypeRouter);
router.use('/orders',apiKeyMiddleware.verifyToken, orderRouter);
module.exports = router