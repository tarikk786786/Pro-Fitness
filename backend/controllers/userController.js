const User = require('../models/User');
const { asyncHandler, ErrorResponse } = require('../middleware/errorHandler');

// @desc    Get all users (admin)
// @route   GET /api/users
// @access  Private/Admin
exports.getUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find().select('-password');
  res.status(200).json({
    success: true,
    count: users.length,
    data: users
  });
});

// @desc    Get single user
// @route   GET /api/users/:id
// @access  Private (User/Admin/Trainer)
exports.getUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id).select('-password');

  if (!user) {
    return next(new ErrorResponse(`User not found with id of ${req.params.id}`, 404));
  }

  // Ensure user can only get their own info unless admin/trainer
  if (req.user.id !== req.params.id && req.user.role === 'user') {
    return next(new ErrorResponse(`Not authorized to access this user`, 403));
  }

  res.status(200).json({
    success: true,
    data: user
  });
});

// @desc    Update user profile
// @route   PUT /api/users/:id/profile
// @access  Private
exports.updateProfile = asyncHandler(async (req, res, next) => {
  // Ensure user can only update their own profile unless admin
  if (req.user.id !== req.params.id && req.user.role !== 'admin') {
    return next(new ErrorResponse(`Not authorized to update this user`, 403));
  }

  const { name, phone, profile, healthConditions, allergies } = req.body;

  let user = await User.findById(req.params.id);

  if (!user) {
    return next(new ErrorResponse(`User not found with id of ${req.params.id}`, 404));
  }

  user.name = name || user.name;
  user.phone = phone || user.phone;
  
  if (profile) {
      user.profile = { ...user.profile, ...profile };
  }
  
  if (healthConditions) user.healthConditions = healthConditions;
  if (allergies) user.allergies = allergies;

  await user.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
    data: user
  });
});

// @desc    Update user (Admin)
// @route   PUT /api/users/:id
// @access  Private/Admin
exports.updateUser = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  }).select('-password');

  if (!user) {
    return next(new ErrorResponse(`User not found with id of ${req.params.id}`, 404));
  }

  res.status(200).json({
    success: true,
    data: user
  });
});

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
exports.deleteUser = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id);

  if (!user) {
    return next(new ErrorResponse(`User not found with id of ${req.params.id}`, 404));
  }

  res.status(200).json({
    success: true,
    data: {}
  });
});
