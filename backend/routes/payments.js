const express = require('express');
const { createStripeSession, createRazorpayOrder, verifyRazorpay, getHistory, applyCoupon } = require('../controllers/paymentController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.use(protect);

router.post('/create-stripe-session', createStripeSession);
router.post('/create-razorpay-order', createRazorpayOrder);
router.post('/verify-razorpay', verifyRazorpay);
router.get('/history', getHistory);
router.post('/apply-coupon', applyCoupon);

module.exports = router;
