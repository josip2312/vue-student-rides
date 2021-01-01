const express = require('express');
const authController = require('../controller/authController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/login', authController.loginUser);

router.post('/google', authController.googleAuthenticate);

router.post('/register', authController.registerUser);

module.exports = router;
