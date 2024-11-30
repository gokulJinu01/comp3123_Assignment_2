const express = require('express');
const router = express.Router();
const { signup, login } = require('../controllers/userController');

// @route   POST /api/users/signup
// @desc    Register a new user
// @access  Public
router.post('/signup', signup);

// @route   POST /api/users/login
// @desc    Login user and return JWT token
// @access  Public
router.post('/login', login);

module.exports = router;
