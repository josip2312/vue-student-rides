const asyncHandler = require('express-async-handler');
const db = require('../models/index');
const Notification = db.Notification;
const Request = db.Request;

// @desc    Get user notifications
// @route   GET /api/user/notifications
// @access  Private
const getNotifications = asyncHandler(async (req, res, next) => {
    const notifications = await Notification.findAll({
        where: {
            id: req.user.id,
        },
    });

    const requests = await Request.findAll();
    for (let i = 0; i < rides.length; i++) {
        const sender = await User.findOne({
            where: { id: notifications[i].senderId },
        });
        rides[i].dataValues.sender = sender;
    }

    res.status(200).json([...notifications, ...requests]);
});

module.exports = {
    getNotifications,
};
