const mongoose = require('mongoose');

const workoutPlanSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  trainer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  title: { type: String, required: true, trim: true },
  description: { type: String },
  type: { type: String, enum: ['gym', 'home', 'dumbbell', 'bodyweight', 'cardio', 'strength', 'flexibility', 'hiit', 'custom'], required: true },
  goal: { type: String, enum: ['fat_loss', 'muscle_gain', 'strength', 'endurance', 'flexibility', 'general_fitness'], required: true },
  difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'], required: true },
  duration: { type: Number }, // weeks
  split: { type: String, enum: ['full_body', 'upper_lower', 'push_pull_legs', 'bro_split', 'custom'] },
  
  days: [{
    day: { type: String, enum: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'] },
    name: { type: String }, // e.g., "Push Day", "Chest & Triceps"
    isRestDay: { type: Boolean, default: false },
    exercises: [{
      name: { type: String, required: true },
      muscleGroup: { type: String },
      sets: { type: Number, required: true },
      reps: { type: String, required: true }, // "8-12" or "30 sec"
      weight: { type: String }, // "bodyweight", "moderate", or specific weight
      restTime: { type: Number }, // seconds
      notes: { type: String },
      videoUrl: { type: String },
      order: { type: Number }
    }],
    warmup: [{ name: String, duration: String }],
    cooldown: [{ name: String, duration: String }],
    estimatedDuration: { type: Number } // minutes
  }],

  isAIGenerated: { type: Boolean, default: false },
  healthCondition: { type: String },
  targetMuscles: [String],
  equipment: [String],
  caloriesBurned: { type: Number },
  isActive: { type: Boolean, default: true },
  completedSessions: { type: Number, default: 0 },
  rating: { type: Number, min: 1, max: 5 }
}, { timestamps: true });

workoutPlanSchema.index({ user: 1, isActive: 1 });
workoutPlanSchema.index({ type: 1, difficulty: 1 });

module.exports = mongoose.model('WorkoutPlan', workoutPlanSchema);
