const mongoose = require('mongoose');

const healthMetricSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  // Normalized metrics from Open Wearables API
  activity: {
    steps: { type: Number, default: 0 },
    caloriesBurned: { type: Number, default: 0 },
    activeMinutes: { type: Number, default: 0 },
    trainingLoad: { type: Number, default: 0 }
  },
  heartRate: {
    resting: { type: Number, default: null }, // bpm
    hrv: { type: Number, default: null }, // Heart Rate Variability in ms
    max: { type: Number, default: null }
  },
  sleep: {
    durationMinutes: { type: Number, default: 0 },
    deepSleepMinutes: { type: Number, default: 0 },
    remSleepMinutes: { type: Number, default: 0 },
    sleepScore: { type: Number, min: 0, max: 100, default: null }
  },
  intelligence: {
    recoveryScore: { type: Number, min: 0, max: 100, default: null },
    stressScore: { type: Number, min: 0, max: 100, default: null },
    energyScore: { type: Number, min: 0, max: 100, default: null },
    proFitnessHealthScore: { type: Number, min: 0, max: 100, default: null }
  }
}, { timestamps: true });

// One daily aggregate per user
healthMetricSchema.index({ userId: 1, date: 1 }, { unique: true });

module.exports = mongoose.model('HealthMetric', healthMetricSchema);
