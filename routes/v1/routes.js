
const express = require('express');
const router = express.Router()
const apiKeyMiddleware = require('../../apiKeyMiddleware'); 

var usersRouter = require('./users');
var authRouter = require('./auth');


router.use('/users',apiKeyMiddleware.verifyToken, usersRouter);

router.use('/auth',apiKeyMiddleware.log, authRouter);

module.exports = router