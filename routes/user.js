const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

// GET request to register new user
router.get('/register', userController.register_get);

// POST request to register new user
router.post('/register', userController.register_post);

// GET request to login user
router.get('/login', userController.login_get);

// POST request to login user
router.post('/login', userController.login_post);

// GET request to logout user
router.get('/logout', userController.logout_get);

module.exports = router;
