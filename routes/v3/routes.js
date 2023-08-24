
const express = require('express');
const router = express.Router()
const apiKeyMiddleware = require('../../apiKeyMiddleware'); 

var courseRouter = require('./course');
var authRouter = require('./auth');


router.use('/auth',apiKeyMiddleware.log, authRouter);
router.use('/course',apiKeyMiddleware.verifyToken, courseRouter);

module.exports = router