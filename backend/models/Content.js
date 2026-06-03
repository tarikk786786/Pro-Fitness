const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true },
  content: { type: String, required: true },
  excerpt: { type: String, maxlength: 300 },
  coverImage: { type: String },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  category: { type: String, enum: ['fat_loss', 'muscle_gain', 'supplements', 'motivation', 'women_fitness', 'pcos', 'thyroid', 'nutrition', 'workout_tips', 'health', 'lifestyle'], required: true },
  tags: [String],
  readTime: { type: Number }, // minutes
  views: { type: Number, default: 0 },
  likes: { type: Number, default: 0 },
  isPublished: { type: Boolean, default: false },
  publishedAt: { type: Date },
  seo: {
    metaTitle: String,
    metaDescription: String,
    keywords: [String]
  }
}, { timestamps: true });

blogSchema.pre('save', function(next) {
  if (!this.slug) {
    this.slug = this.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  }
  if (!this.readTime && this.content) {
    this.readTime = Math.ceil(this.content.split(/\s+/).length / 200);
  }
  next();
});

blogSchema.index({ slug: 1 });
blogSchema.index({ category: 1, isPublished: 1 });

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  type: { type: String, enum: ['challenge', 'gym_fest', 'marathon', 'competition', 'workshop', 'seminar', 'bootcamp'], required: true },
  image: { type: String },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  location: { type: String },
  maxParticipants: { type: Number },
  registeredUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  price: { type: Number, default: 0 },
  isFree: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true },
  prizes: [{ position: Number, prize: String }],
  rules: [String],
  organizer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

eventSchema.index({ startDate: 1, isActive: 1 });

const notificationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  title: { type: String, required: true },
  message: { type: String, required: true },
  type: { type: String, enum: ['workout', 'diet', 'membership', 'payment', 'event', 'achievement', 'system', 'trainer', 'promotion'], required: true },
  isRead: { type: Boolean, default: false },
  link: { type: String },
  icon: { type: String },
  isBroadcast: { type: Boolean, default: false }
}, { timestamps: true });

notificationSchema.index({ user: 1, isRead: 1, createdAt: -1 });

const progressReportSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, default: Date.now },
  weight: { type: Number },
  bodyFat: { type: Number },
  muscleMass: { type: Number },
  measurements: {
    chest: Number, waist: Number, hips: Number,
    biceps: Number, thighs: Number, calves: Number,
    shoulders: Number, neck: Number
  },
  photos: { front: String, side: String, back: String },
  notes: { type: String },
  waterIntake: { type: Number }, // liters
  caloriesConsumed: { type: Number },
  workoutCompleted: { type: Boolean, default: false },
  sleepHours: { type: Number },
  mood: { type: String, enum: ['great', 'good', 'neutral', 'bad', 'terrible'] },
  energyLevel: { type: Number, min: 1, max: 10 }
}, { timestamps: true });

progressReportSchema.index({ user: 1, date: -1 });

const Blog = mongoose.model('Blog', blogSchema);
const Event = mongoose.model('Event', eventSchema);
const Notification = mongoose.model('Notification', notificationSchema);
const ProgressReport = mongoose.model('ProgressReport', progressReportSchema);

module.exports = { Blog, Event, Notification, ProgressReport };
