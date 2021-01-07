const express = require('express');

const userController = require('../controller/userController');

const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/notifications', protect, userController.getNotifications);

module.exports = router;
