const mongoose = require('mongoose');

const membershipSchema = new mongoose.Schema({
  name: { type: String, required: true, enum: ['Basic', 'Pro', 'Elite'] },
  slug: { type: String, required: true, unique: true },
  price: {
    monthly: { type: Number, required: true },
    quarterly: { type: Number },
    yearly: { type: Number },
    currency: { type: String, default: 'INR' }
  },
  features: [{ type: String }],
  maxTrainerSessions: { type: Number, default: 0 },
  hasAICoach: { type: Boolean, default: false },
  hasDietPlans: { type: Boolean, default: false },
  hasWorkoutPlans: { type: Boolean, default: false },
  hasProgressTracking: { type: Boolean, default: false },
  hasGroupClasses: { type: Boolean, default: false },
  hasPersonalTrainer: { type: Boolean, default: false },
  hasNutritionConsultation: { type: Boolean, default: false },
  hasSaunaAccess: { type: Boolean, default: false },
  hasPrioritySupport: { type: Boolean, default: false },
  description: { type: String },
  isPopular: { type: Boolean, default: false },
  color: { type: String },
  order: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

const paymentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  membership: { type: mongoose.Schema.Types.ObjectId, ref: 'Membership' },
  amount: { type: Number, required: true },
  currency: { type: String, default: 'INR' },
  status: { type: String, enum: ['pending', 'completed', 'failed', 'refunded'], default: 'pending' },
  paymentMethod: { type: String, enum: ['stripe', 'razorpay', 'upi', 'card', 'net_banking'] },
  transactionId: { type: String },
  stripePaymentIntentId: { type: String },
  razorpayOrderId: { type: String },
  razorpayPaymentId: { type: String },
  razorpaySignature: { type: String },
  billingPeriod: { type: String, enum: ['monthly', 'quarterly', 'yearly'] },
  startDate: { type: Date },
  endDate: { type: Date },
  couponCode: { type: String },
  discount: { type: Number, default: 0 },
  receipt: { type: String },
  notes: { type: String }
}, { timestamps: true });

paymentSchema.index({ user: 1, createdAt: -1 });

const couponSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true, uppercase: true },
  discount: { type: Number, required: true }, // percentage
  maxDiscount: { type: Number },
  minAmount: { type: Number, default: 0 },
  maxUses: { type: Number, default: 100 },
  currentUses: { type: Number, default: 0 },
  validFrom: { type: Date, default: Date.now },
  validUntil: { type: Date, required: true },
  isActive: { type: Boolean, default: true },
  applicablePlans: [{ type: String, enum: ['basic', 'pro', 'elite'] }]
}, { timestamps: true });

const Membership = mongoose.model('Membership', membershipSchema);
const Payment = mongoose.model('Payment', paymentSchema);
const Coupon = mongoose.model('Coupon', couponSchema);

module.exports = { Membership, Payment, Coupon };
