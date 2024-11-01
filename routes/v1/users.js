var express = require('express');
var router = express.Router();

const localStorage = require('../../localStorage');


/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Get all users 
 * /v1/users:
 *   get:
 *     summary: Get a list of users
 *     description: Retrieve a list of users from the database
 *     security:
 *      - apiKey: []
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               { code: "0000",users: [ { username: 'testnaja', age: 15 , email: 'toptestaja@gmail.com' }, { username: 'anya', age: 1 , email: 'anyaja@gmail.com' } ]}
 *
 */
router.get('/', function (req, res, next) {
  const users = localStorage.getAll();

  if (users != 0) {
    res.json({ code: "0000", users });
  } else {
    res.status(404).json({ code: "U001", message: 'users not found' });
  }

});

/**
 * @swagger
 * /v1/users/{username}:
 *   get:
 *     summary: Get a user by username
 *     description: Retrieve a user from the database by ID
 *     security:
 *      - apiKey: []
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         description: search user by username
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               { code: "0000",user: { "username": "testnaja", "age": 15 , "email" : "email@gmail.com" }}
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             example:
 *               { code: "U001",message: 'User not found'}
 */
router.get('/:username', (req, res) => {
  const user = localStorage.read(req.params.username);

  if (user) {
    res.json({ code: "0000", user });
  } else {
    res.status(404).json({ code: "U001", message: 'User not found' });
  }

});

/**
 * @swagger
 * /v1/users:
 *   post:
 *     summary: Create a new user
 *     description: Create a new user in the database
 *     security:
 *      - apiKey: []
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The user's name.
 *                 example: testnaja
 *               age:
 *                 type: string
 *                 description: The user's name.
 *                 example: 15
 *               email:
 *                 type: string
 *                 description: The user's name.
 *                 example: testnaja@gmail.com
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             example:
 *               { code: "0000",message: 'User created successfully'}
 *       400:
 *         description: User is null
 *         content:
 *           application/json:
 *             example:
 *               { code: "U002",message: 'username is null'}
 */
router.post('/', (req, res) => {
  const { username, age, email } = req.body;

  if (username == 0) {
    res.status(400).json({ code: "U002", message: 'username is null' });
  } else if (age == 0) {
    res.status(400).json({ code: "U002", message: 'age is null' });
  } else if (email == 0) {
    res.status(400).json({ code: "U002", message: 'email is null' });

  } else {
    var checkUser = localStorage.checkUsername(username)
    var checkEmail = localStorage.checkEmail(email)
    if (checkUser) {
      res.status(400).json({ code: "U003", message: 'This username is already used' });
    }
    else if (checkEmail) {
      res.status(400).json({ code: "U003", message: 'This email is already used' });
    }
    else {
      const user = { username, age, email };
      localStorage.create(username, user);
      res.status(201).json({ code: "0000", message: 'User created successfully' });
    }

  }
});

/**
 * @swagger
 * /v1/users/{username}:
 *   put:
 *     summary: Update user details
 *     description: Update user details in the database
 *     security:
 *      - apiKey: []
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         description: Username of the user to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               age:
 *                 type: string
 *                 description: The user's name.
 *                 example: 15
 *               email:
 *                 type: string
 *                 description: The user's name.
 *                 example: testnaja@gmail.com
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             example:
 *               { code: "0000",message: 'User updated successfully'}
 *       404:
 *         description: user not found
 *         content:
 *           application/json:
 *             example:
 *               { code: "U001",message: 'username not found'}
 */
router.put('/:username', (req, res) => {
  const { age, email } = req.body;
  if (age == 0) {
    res.status(400).json({ code: "U002", message: 'age is null' });
  } else if (email == 0) {
    res.status(400).json({ code: "U002", message: 'email is null' });

  } else {
   // var checkUser = localStorage.checkUsername(req.params.username)
    var checkEmail = localStorage.checkEmail(email,req.params.username)
  if (checkEmail) {
      res.status(400).json({ code: "U003", message: 'This email is already used' });
    }
    else {
      const updatedUser = { username: req.params.username, age, email };
      const success = localStorage.update(req.params.username, updatedUser);
      if (success) {
        res.json({ code: "0000", message: 'User updated successfully' });
      } else {
        res.status(404).json({ code: "U001", message: 'User not found' });
      }
    }
  }
});



/**
 * @swagger
 * /v1/users/{username}:
 *   delete:
 *     summary: Delete a user
 *     description: Delete a user from the database
 *     security:
 *      - apiKey: []
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         description: ID of the user to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted successfully
 *         content:
 *           application/json:
 *             example:
 *               { code: "0000",message: 'User deleted successfully'}
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             example:
 *               { code: "U001",message: 'username is found'}
 */
router.delete('/:username', (req, res) => {
  const success = localStorage.remove(req.params.username);
  if (success) {
    res.json({ code: "0000", message: 'User deleted successfully' });
  } else {
    res.status(404).json({ code: "U001", message: 'User not found' });
  }
});



module.exports = router;
