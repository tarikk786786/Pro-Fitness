const { ProgressReport } = require('../models/Content');
const { asyncHandler, ErrorResponse } = require('../middleware/errorHandler');

exports.logProgress = asyncHandler(async (req, res, next) => {
    req.body.user = req.user.id;
    const progress = await ProgressReport.create(req.body);
    res.status(201).json({ success: true, data: progress });
});

exports.getProgress = asyncHandler(async (req, res, next) => {
    const progress = await ProgressReport.find({ user: req.user.id }).sort('-date');
    res.status(200).json({ success: true, count: progress.length, data: progress });
});

exports.getStats = asyncHandler(async (req, res, next) => {
    res.status(200).json({ success: true, data: { workoutsCompleted: 12, currentStreak: 3 } });
});

exports.getChartData = asyncHandler(async (req, res, next) => {
    res.status(200).json({ success: true, data: [] });
});
