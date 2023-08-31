var express = require('express');
var router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: Health-Check
 * /v1/auth/health:
 *   get:
 *     summary: Get Check
 *     description: Check
 *     tags: [Authentication]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               {  message: 'Ok', date: "Date" }
 *
 */
router.get('/health', function (req, res, next) {
  console.log("healthhhhhhhhhhhh");
  const data = {
    message: 'Ok',
    date: new Date(),
  }
  //res.status(200).send(data);
  res.status(200).json({data});
});

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: Authentication
 * /v1/auth/key:
 *   get:
 *     summary: Authentication
 *     description: Get Authentication
 *     tags: [Authentication]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               {  message: 'Ok', token: "11111111" }
 *
 */
router.get('/key', function (req, res, next) {
  const data = {
    message: 'Ok',
    token: "a3c45d73e82f09b87cd9f2e41ab1de9682ab36fd",
  }
  res.status(200).send(data);
});




module.exports = router;