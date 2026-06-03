const DietPlan = require('../models/DietPlan');
const { asyncHandler, ErrorResponse } = require('../middleware/errorHandler');

// @desc    Create new diet plan
// @route   POST /api/diets
// @access  Private
exports.createDietPlan = asyncHandler(async (req, res, next) => {
  const dietPlan = await DietPlan.create(req.body);

  res.status(201).json({
    success: true,
    data: dietPlan
  });
});

// @desc    Get user's diet plans
// @route   GET /api/diets
// @access  Private
exports.getDietPlans = asyncHandler(async (req, res, next) => {
  let query;

  if (req.user.role === 'admin') {
    query = DietPlan.find();
  } else {
    // Find diets assigned to the user
    query = DietPlan.find({ user: req.user.id });
  }

  const dietPlans = await query;

  res.status(200).json({
    success: true,
    count: dietPlans.length,
    data: dietPlans
  });
});

// @desc    Get single diet plan
// @route   GET /api/diets/:id
// @access  Private
exports.getDietPlan = asyncHandler(async (req, res, next) => {
  const dietPlan = await DietPlan.findById(req.params.id);

  if (!dietPlan) {
    return next(new ErrorResponse(`Diet plan not found with id of ${req.params.id}`, 404));
  }

  // Ensure user owns the plan, or is admin
  if (dietPlan.user.toString() !== req.user.id && req.user.role === 'user') {
     return next(new ErrorResponse(`Not authorized to access this diet plan`, 403));
  }

  res.status(200).json({
    success: true,
    data: dietPlan
  });
});

// @desc    Update diet plan
// @route   PUT /api/diets/:id
// @access  Private
exports.updateDietPlan = asyncHandler(async (req, res, next) => {
  let dietPlan = await DietPlan.findById(req.params.id);

  if (!dietPlan) {
    return next(new ErrorResponse(`Diet plan not found with id of ${req.params.id}`, 404));
  }

  if (dietPlan.user.toString() !== req.user.id && req.user.role === 'user') {
     return next(new ErrorResponse(`Not authorized to update this diet plan`, 403));
  }

  dietPlan = await DietPlan.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: dietPlan
  });
});

// @desc    Delete diet plan
// @route   DELETE /api/diets/:id
// @access  Private
exports.deleteDietPlan = asyncHandler(async (req, res, next) => {
  const dietPlan = await DietPlan.findById(req.params.id);

  if (!dietPlan) {
    return next(new ErrorResponse(`Diet plan not found with id of ${req.params.id}`, 404));
  }

  if (dietPlan.user.toString() !== req.user.id && req.user.role === 'user') {
     return next(new ErrorResponse(`Not authorized to delete this diet plan`, 403));
  }

  await dietPlan.remove();

  res.status(200).json({
    success: true,
    data: {}
  });
});
