const User = require('../models/User');
const WorkoutPlan = require('../models/WorkoutPlan');
const DietPlan = require('../models/DietPlan');
const { asyncHandler, ErrorResponse } = require('../middleware/errorHandler');

exports.getClients = asyncHandler(async (req, res, next) => {
    const clients = await User.find({ trainer: req.user.id }).select('-password');
    res.status(200).json({ success: true, count: clients.length, data: clients });
});

exports.assignWorkout = asyncHandler(async (req, res, next) => {
    req.body.trainer = req.user.id;
    const workout = await WorkoutPlan.create(req.body);
    res.status(201).json({ success: true, data: workout });
});

exports.assignDiet = asyncHandler(async (req, res, next) => {
    const diet = await DietPlan.create(req.body);
    res.status(201).json({ success: true, data: diet });
});

exports.getSchedule = asyncHandler(async (req, res, next) => {
    res.status(200).json({ success: true, data: [] });
});

exports.getClientProgress = asyncHandler(async (req, res, next) => {
    res.status(200).json({ success: true, data: [] });
});
