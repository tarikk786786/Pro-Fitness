const WorkoutPlan = require('../models/WorkoutPlan');
const { asyncHandler, ErrorResponse } = require('../middleware/errorHandler');

// @desc    Create new workout plan
// @route   POST /api/workouts
// @access  Private (Trainer/Admin)
exports.createWorkoutPlan = asyncHandler(async (req, res, next) => {
  // Add user to req.body if assigned, or use the logged-in user
  req.body.trainer = req.user.id;

  const workoutPlan = await WorkoutPlan.create(req.body);

  res.status(201).json({
    success: true,
    data: workoutPlan
  });
});

// @desc    Get user's workout plans
// @route   GET /api/workouts
// @access  Private
exports.getWorkoutPlans = asyncHandler(async (req, res, next) => {
  let query;

  if (req.user.role === 'admin') {
    query = WorkoutPlan.find();
  } else if (req.user.role === 'trainer') {
      // Find workouts created by this trainer or assigned to their clients
      query = WorkoutPlan.find({ trainer: req.user.id });
  } else {
    // Find workouts assigned to the user
    query = WorkoutPlan.find({ user: req.user.id });
  }

  const workoutPlans = await query;

  res.status(200).json({
    success: true,
    count: workoutPlans.length,
    data: workoutPlans
  });
});

// @desc    Get single workout plan
// @route   GET /api/workouts/:id
// @access  Private
exports.getWorkoutPlan = asyncHandler(async (req, res, next) => {
  const workoutPlan = await WorkoutPlan.findById(req.params.id);

  if (!workoutPlan) {
    return next(new ErrorResponse(`Workout plan not found with id of ${req.params.id}`, 404));
  }

  // Ensure user owns the plan, or is admin/trainer
  if (workoutPlan.user.toString() !== req.user.id && req.user.role === 'user') {
     return next(new ErrorResponse(`Not authorized to access this workout plan`, 403));
  }

  res.status(200).json({
    success: true,
    data: workoutPlan
  });
});

// @desc    Update workout plan
// @route   PUT /api/workouts/:id
// @access  Private
exports.updateWorkoutPlan = asyncHandler(async (req, res, next) => {
  let workoutPlan = await WorkoutPlan.findById(req.params.id);

  if (!workoutPlan) {
    return next(new ErrorResponse(`Workout plan not found with id of ${req.params.id}`, 404));
  }

  // Ensure user owns the plan, or is admin/trainer
  if (workoutPlan.user.toString() !== req.user.id && req.user.role === 'user') {
     return next(new ErrorResponse(`Not authorized to update this workout plan`, 403));
  }

  workoutPlan = await WorkoutPlan.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: workoutPlan
  });
});

// @desc    Delete workout plan
// @route   DELETE /api/workouts/:id
// @access  Private
exports.deleteWorkoutPlan = asyncHandler(async (req, res, next) => {
  const workoutPlan = await WorkoutPlan.findById(req.params.id);

  if (!workoutPlan) {
    return next(new ErrorResponse(`Workout plan not found with id of ${req.params.id}`, 404));
  }

  // Ensure user owns the plan, or is admin/trainer
  if (workoutPlan.user.toString() !== req.user.id && req.user.role === 'user') {
     return next(new ErrorResponse(`Not authorized to delete this workout plan`, 403));
  }

  await workoutPlan.remove();

  res.status(200).json({
    success: true,
    data: {}
  });
});
