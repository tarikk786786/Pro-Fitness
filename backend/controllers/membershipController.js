const { asyncHandler, ErrorResponse } = require('../middleware/errorHandler');
const { MembershipPlan, Payment } = require('../models/Membership');

// @desc    Get all membership plans
// @route   GET /api/memberships/plans
// @access  Public
exports.getPlans = asyncHandler(async (req, res, next) => {
  const plans = await MembershipPlan.find();
  res.status(200).json({ success: true, data: plans });
});

// @desc    Get single plan
// @route   GET /api/memberships/plans/:id
// @access  Public
exports.getPlan = asyncHandler(async (req, res, next) => {
    const plan = await MembershipPlan.findById(req.params.id);
    if (!plan) return next(new ErrorResponse('Plan not found', 404));
    res.status(200).json({ success: true, data: plan });
});

// @desc    Subscribe to a plan (Mock)
// @route   POST /api/memberships/subscribe
// @access  Private
exports.subscribe = asyncHandler(async (req, res, next) => {
    res.status(200).json({ success: true, message: "Subscription logic to be implemented via Stripe/Razorpay" });
});

// @desc    Cancel membership
// @route   PUT /api/memberships/cancel
// @access  Private
exports.cancelMembership = asyncHandler(async (req, res, next) => {
    res.status(200).json({ success: true, message: "Membership cancelled" });
});

// @desc    Get current user's membership
// @route   GET /api/memberships/my-membership
// @access  Private
exports.getMyMembership = asyncHandler(async (req, res, next) => {
    res.status(200).json({ success: true, data: req.user.membership });
});
