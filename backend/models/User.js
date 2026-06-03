const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: { type: String, required: [true, 'Name is required'], trim: true, maxlength: 50 },
  email: { type: String, required: [true, 'Email is required'], unique: true, lowercase: true, match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Invalid email'] },
  password: { type: String, minlength: 6, select: false },
  phone: { type: String, match: [/^[0-9]{10,15}$/, 'Invalid phone number'] },
  role: { type: String, enum: ['user', 'trainer', 'admin', 'nutritionist'], default: 'user' },
  avatar: { type: String, default: '' },
  googleId: { type: String },
  isVerified: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true },
  
  // Profile
  profile: {
    age: { type: Number, min: 13, max: 120 },
    gender: { type: String, enum: ['male', 'female', 'other'] },
    height: { type: Number }, // cm
    weight: { type: Number }, // kg
    targetWeight: { type: Number },
    activityLevel: { type: String, enum: ['sedentary', 'light', 'moderate', 'active', 'very_active'] },
    fitnessGoal: { type: String, enum: ['weight_loss', 'muscle_gain', 'maintenance', 'endurance', 'flexibility', 'general_fitness'] },
    experience: { type: String, enum: ['beginner', 'intermediate', 'advanced'] },
    sleepHours: { type: Number, min: 1, max: 24 },
    foodPreference: { type: String, enum: ['vegetarian', 'non_vegetarian', 'vegan', 'eggetarian'] },
    bio: { type: String, maxlength: 500 }
  },

  // Health
  healthConditions: [{
    type: String,
    enum: ['thyroid', 'pcos', 'pcod', 'diabetes', 'hypertension', 'heart_disease', 'asthma', 'arthritis', 'none']
  }],
  allergies: [String],
  medications: [String],

  // Membership
  membership: {
    plan: { type: String, enum: ['basic', 'pro', 'elite', 'none'], default: 'none' },
    startDate: Date,
    endDate: Date,
    isActive: { type: Boolean, default: false },
    autoRenew: { type: Boolean, default: false }
  },

  // Tracking
  streak: { type: Number, default: 0 },
  lastActive: { type: Date, default: Date.now },
  totalWorkouts: { type: Number, default: 0 },
  joinedAt: { type: Date, default: Date.now },

  // Assigned trainer
  trainer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

  // OTP
  otp: { code: String, expiresAt: Date },
  resetPasswordToken: String,
  resetPasswordExpire: Date
}, { timestamps: true });

// Hash password before save
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare password
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Remove password from JSON output
userSchema.methods.toJSON = function() {
  const obj = this.toObject();
  delete obj.password;
  delete obj.otp;
  delete obj.resetPasswordToken;
  delete obj.resetPasswordExpire;
  return obj;
};

module.exports = mongoose.model('User', userSchema);
