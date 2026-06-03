const { asyncHandler, ErrorResponse } = require('../middleware/errorHandler');

exports.createStripeSession = asyncHandler(async (req, res, next) => {
    res.status(200).json({ success: true, message: "Stripe checkout session mock" });
});

exports.createRazorpayOrder = asyncHandler(async (req, res, next) => {
    res.status(200).json({ success: true, message: "Razorpay order mock" });
});

exports.verifyRazorpay = asyncHandler(async (req, res, next) => {
    res.status(200).json({ success: true, message: "Razorpay verification mock" });
});

exports.getHistory = asyncHandler(async (req, res, next) => {
    res.status(200).json({ success: true, data: [] });
});

exports.applyCoupon = asyncHandler(async (req, res, next) => {
    res.status(200).json({ success: true, data: { discount: 10 } });
});
