const { Notification } = require('../models/Content');
const { asyncHandler, ErrorResponse } = require('../middleware/errorHandler');

exports.getNotifications = asyncHandler(async (req, res, next) => {
    const notifications = await Notification.find({ user: req.user.id }).sort('-createdAt');
    res.status(200).json({ success: true, count: notifications.length, data: notifications });
});

exports.markAsRead = asyncHandler(async (req, res, next) => {
    const notification = await Notification.findOneAndUpdate(
        { _id: req.params.id, user: req.user.id },
        { isRead: true },
        { new: true }
    );
    res.status(200).json({ success: true, data: notification });
});

exports.markAllAsRead = asyncHandler(async (req, res, next) => {
    await Notification.updateMany({ user: req.user.id }, { isRead: true });
    res.status(200).json({ success: true, data: {} });
});

exports.deleteNotification = asyncHandler(async (req, res, next) => {
    await Notification.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    res.status(200).json({ success: true, data: {} });
});
