const mongoose = require('mongoose');

const dietPlanSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  trainer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  title: { type: String, required: true, trim: true },
  description: { type: String },
  type: { type: String, enum: ['indian', 'vegetarian', 'non_vegetarian', 'vegan', 'keto', 'high_protein', 'low_carb', 'mediterranean', 'custom'], required: true },
  goal: { type: String, enum: ['fat_loss', 'muscle_gain', 'maintenance', 'lean_bulk', 'cutting'], required: true },

  dailyTargets: {
    calories: { type: Number, required: true },
    protein: { type: Number }, // grams
    carbs: { type: Number },
    fats: { type: Number },
    fiber: { type: Number },
    water: { type: Number } // liters
  },

  meals: [{
    name: { type: String, required: true }, // "Breakfast", "Lunch", etc.
    time: { type: String }, // "7:00 AM"
    foods: [{
      item: { type: String, required: true },
      quantity: { type: String },
      calories: { type: Number },
      protein: { type: Number },
      carbs: { type: Number },
      fats: { type: Number },
      recipe: { type: String },
      alternatives: [String]
    }],
    totalCalories: { type: Number },
    notes: { type: String }
  }],

  supplements: [{
    name: { type: String },
    dosage: { type: String },
    timing: { type: String },
    notes: { type: String }
  }],

  groceryList: [{
    category: { type: String }, // "Proteins", "Vegetables", etc.
    items: [{ name: String, quantity: String }]
  }],

  foodsToAvoid: [String],
  healthCondition: { type: String },
  isAIGenerated: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true },
  duration: { type: Number }, // days
  rating: { type: Number, min: 1, max: 5 }
}, { timestamps: true });

dietPlanSchema.index({ user: 1, isActive: 1 });

module.exports = mongoose.model('DietPlan', dietPlanSchema);
