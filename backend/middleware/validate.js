const Joi = require('joi');

// Validation middleware factory
const validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body, { abortEarly: false, stripUnknown: true });
  if (error) {
    const messages = error.details.map(detail => detail.message).join(', ');
    return res.status(400).json({ success: false, error: messages });
  }
  next();
};

// Auth schemas
const registerSchema = Joi.object({
  name: Joi.string().trim().min(2).max(50).required().messages({
    'string.min': 'Name must be at least 2 characters',
    'string.max': 'Name cannot exceed 50 characters',
    'any.required': 'Name is required'
  }),
  email: Joi.string().email().lowercase().required().messages({
    'string.email': 'Please provide a valid email',
    'any.required': 'Email is required'
  }),
  password: Joi.string().min(6).max(128).required().messages({
    'string.min': 'Password must be at least 6 characters',
    'any.required': 'Password is required'
  }),
  phone: Joi.string().pattern(/^[0-9]{10,15}$/).optional().messages({
    'string.pattern.base': 'Phone number must be 10-15 digits'
  }),
  role: Joi.string().valid('user', 'trainer').default('user')
});

const loginSchema = Joi.object({
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().required()
});

const forgotPasswordSchema = Joi.object({
  email: Joi.string().email().lowercase().required()
});

const resetPasswordSchema = Joi.object({
  token: Joi.string().required(),
  password: Joi.string().min(6).max(128).required()
});

// Profile schemas
const updateProfileSchema = Joi.object({
  name: Joi.string().trim().min(2).max(50),
  phone: Joi.string().pattern(/^[0-9]{10,15}$/),
  profile: Joi.object({
    age: Joi.number().min(13).max(120),
    gender: Joi.string().valid('male', 'female', 'other'),
    height: Joi.number().min(50).max(300),
    weight: Joi.number().min(20).max(500),
    targetWeight: Joi.number().min(20).max(500),
    activityLevel: Joi.string().valid('sedentary', 'light', 'moderate', 'active', 'very_active'),
    fitnessGoal: Joi.string().valid('weight_loss', 'muscle_gain', 'maintenance', 'endurance', 'flexibility', 'general_fitness'),
    experience: Joi.string().valid('beginner', 'intermediate', 'advanced'),
    sleepHours: Joi.number().min(1).max(24),
    foodPreference: Joi.string().valid('vegetarian', 'non_vegetarian', 'vegan', 'eggetarian'),
    bio: Joi.string().max(500)
  }),
  healthConditions: Joi.array().items(Joi.string()),
  allergies: Joi.array().items(Joi.string())
});

// Workout schemas
const workoutSchema = Joi.object({
  title: Joi.string().trim().required(),
  description: Joi.string(),
  type: Joi.string().valid('gym', 'home', 'dumbbell', 'bodyweight', 'cardio', 'strength', 'flexibility', 'hiit', 'custom').required(),
  goal: Joi.string().valid('fat_loss', 'muscle_gain', 'strength', 'endurance', 'flexibility', 'general_fitness').required(),
  difficulty: Joi.string().valid('beginner', 'intermediate', 'advanced').required(),
  duration: Joi.number(),
  split: Joi.string().valid('full_body', 'upper_lower', 'push_pull_legs', 'bro_split', 'custom'),
  days: Joi.array().items(Joi.object({
    day: Joi.string().valid('monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'),
    name: Joi.string(),
    isRestDay: Joi.boolean(),
    exercises: Joi.array().items(Joi.object({
      name: Joi.string().required(),
      muscleGroup: Joi.string(),
      sets: Joi.number().required(),
      reps: Joi.string().required(),
      weight: Joi.string(),
      restTime: Joi.number(),
      notes: Joi.string()
    }))
  }))
});

// Diet schemas
const dietSchema = Joi.object({
  title: Joi.string().trim().required(),
  description: Joi.string(),
  type: Joi.string().valid('indian', 'vegetarian', 'non_vegetarian', 'vegan', 'keto', 'high_protein', 'low_carb', 'mediterranean', 'custom').required(),
  goal: Joi.string().valid('fat_loss', 'muscle_gain', 'maintenance', 'lean_bulk', 'cutting').required(),
  dailyTargets: Joi.object({
    calories: Joi.number().required(),
    protein: Joi.number(),
    carbs: Joi.number(),
    fats: Joi.number(),
    fiber: Joi.number(),
    water: Joi.number()
  }).required(),
  meals: Joi.array().items(Joi.object({
    name: Joi.string().required(),
    time: Joi.string(),
    foods: Joi.array().items(Joi.object({
      item: Joi.string().required(),
      quantity: Joi.string(),
      calories: Joi.number(),
      protein: Joi.number(),
      carbs: Joi.number(),
      fats: Joi.number()
    }))
  }))
});

// AI generation schemas
const aiGenerateSchema = Joi.object({
  height: Joi.number().min(50).max(300).required(),
  weight: Joi.number().min(20).max(500).required(),
  age: Joi.number().min(13).max(120).required(),
  gender: Joi.string().valid('male', 'female', 'other').required(),
  goal: Joi.string().required(),
  activityLevel: Joi.string().valid('sedentary', 'light', 'moderate', 'active', 'very_active').required(),
  sleepHours: Joi.number().min(1).max(24),
  foodPreference: Joi.string().valid('vegetarian', 'non_vegetarian', 'vegan', 'eggetarian'),
  experience: Joi.string().valid('beginner', 'intermediate', 'advanced'),
  healthConditions: Joi.array().items(Joi.string())
});

// Blog schema
const blogSchema = Joi.object({
  title: Joi.string().trim().required(),
  content: Joi.string().required(),
  excerpt: Joi.string().max(300),
  category: Joi.string().valid('fat_loss', 'muscle_gain', 'supplements', 'motivation', 'women_fitness', 'pcos', 'thyroid', 'nutrition', 'workout_tips', 'health', 'lifestyle').required(),
  tags: Joi.array().items(Joi.string()),
  coverImage: Joi.string(),
  isPublished: Joi.boolean()
});

// Event schema
const eventSchema = Joi.object({
  title: Joi.string().trim().required(),
  description: Joi.string().required(),
  type: Joi.string().valid('challenge', 'gym_fest', 'marathon', 'competition', 'workshop', 'seminar', 'bootcamp').required(),
  startDate: Joi.date().required(),
  endDate: Joi.date().required(),
  location: Joi.string(),
  maxParticipants: Joi.number(),
  price: Joi.number(),
  isFree: Joi.boolean()
});

// Coupon schema
const couponSchema = Joi.object({
  code: Joi.string().uppercase().required(),
  discount: Joi.number().min(1).max(100).required(),
  maxDiscount: Joi.number(),
  minAmount: Joi.number(),
  maxUses: Joi.number(),
  validUntil: Joi.date().required(),
  applicablePlans: Joi.array().items(Joi.string().valid('basic', 'pro', 'elite'))
});

module.exports = {
  validate,
  registerSchema,
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  updateProfileSchema,
  workoutSchema,
  dietSchema,
  aiGenerateSchema,
  blogSchema,
  eventSchema,
  couponSchema
};
