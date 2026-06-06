const mongoose = require('mongoose');

const mediaSchema = new mongoose.Schema({
  instagramId: {
    type: String,
    required: true,
    unique: true
  },
  url: {
    type: String,
    required: true
  },
  thumbnailUrl: {
    type: String
  },
  type: {
    type: String,
    enum: ['IMAGE', 'VIDEO', 'REEL'],
    required: true
  },
  caption: {
    type: String
  },
  category: {
    type: String,
    enum: ['HERO_BANNER', 'ABOUT', 'FACILITIES', 'WORKOUT', 'TRANSFORMATION', 'EVENTS', 'TRAINERS', 'REELS', 'SOCIAL_PROOF', 'UNCATEGORIZED'],
    default: 'UNCATEGORIZED'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  metadata: {
    views: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
    comments: { type: Number, default: 0 }
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

module.exports = mongoose.model('Media', mediaSchema);
