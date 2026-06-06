const mongoose = require('mongoose');

const healthConnectionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  provider: {
    type: String,
    enum: ['apple_health', 'garmin', 'whoop', 'oura', 'strava', 'ultrahuman', 'google_fit'],
    required: true
  },
  accessToken: String,
  refreshToken: String,
  externalUserId: String,
  lastSync: Date,
  status: {
    type: String,
    enum: ['active', 'error', 'disconnected'],
    default: 'active'
  }
}, { timestamps: true });

// Avoid duplicate connections for same provider per user
healthConnectionSchema.index({ userId: 1, provider: 1 }, { unique: true });

module.exports = mongoose.model('HealthConnection', healthConnectionSchema);
