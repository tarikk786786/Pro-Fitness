const User = require('../models/User');
const { Payment } = require('../models/Membership');
const { asyncHandler } = require('../middleware/errorHandler');

exports.getStats = asyncHandler(async (req, res, next) => {
    res.status(200).json({ success: true, data: { totalUsers: 100, activeMembers: 80, revenue: 50000, trainers: 5 } });
});

exports.getUsers = asyncHandler(async (req, res, next) => {
    const users = await User.find().select('-password');
    res.status(200).json({ success: true, data: users });
});

exports.getRevenue = asyncHandler(async (req, res, next) => {
    const payments = await Payment.find();
    res.status(200).json({ success: true, data: payments });
});

exports.broadcastNotification = asyncHandler(async (req, res, next) => {
    res.status(200).json({ success: true, message: 'Notification broadcasted' });
});

exports.getAnalytics = asyncHandler(async (req, res, next) => {
    res.status(200).json({ success: true, data: {} });
});
