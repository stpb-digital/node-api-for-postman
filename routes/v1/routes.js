
const express = require('express');
const router = express.Router()
const apiKeyMiddleware = require('../../apiKeyMiddleware'); 

var usersRouter = require('./users');
var authRouter = require('./auth');
var courseRouter = require('./course');


router.use('/users',apiKeyMiddleware.verifyToken, usersRouter);

router.use('/auth',apiKeyMiddleware.log, authRouter);
router.use('/course',apiKeyMiddleware.verifyToken, courseRouter);

module.exports = router