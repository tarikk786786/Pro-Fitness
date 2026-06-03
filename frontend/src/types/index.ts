// ===== USER TYPES =====

export interface User {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  role: "user" | "trainer" | "admin" | "nutritionist";
  avatar?: string;
  isVerified: boolean;
  isActive: boolean;
  profile: UserProfile;
  healthConditions: string[];
  allergies: string[];
  membership: MembershipStatus;
  streak: number;
  lastActive: string;
  totalWorkouts: number;
  joinedAt: string;
  trainer?: string;
}

export interface UserProfile {
  age?: number;
  gender?: "male" | "female" | "other";
  height?: number;
  weight?: number;
  targetWeight?: number;
  activityLevel?: "sedentary" | "light" | "moderate" | "active" | "very_active";
  fitnessGoal?: "weight_loss" | "muscle_gain" | "maintenance" | "endurance" | "flexibility" | "general_fitness";
  experience?: "beginner" | "intermediate" | "advanced";
  sleepHours?: number;
  foodPreference?: "vegetarian" | "non_vegetarian" | "vegan" | "eggetarian";
  bio?: string;
}

export interface MembershipStatus {
  plan: "basic" | "pro" | "elite" | "none";
  startDate?: string;
  endDate?: string;
  isActive: boolean;
  autoRenew: boolean;
}

// ===== WORKOUT TYPES =====

export interface WorkoutPlan {
  _id: string;
  user: string;
  trainer?: string;
  title: string;
  description?: string;
  type: string;
  goal: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  duration?: number;
  split?: string;
  days: WorkoutDay[];
  isAIGenerated: boolean;
  healthCondition?: string;
  targetMuscles: string[];
  equipment: string[];
  caloriesBurned?: number;
  isActive: boolean;
  completedSessions: number;
  rating?: number;
  createdAt: string;
}

export interface WorkoutDay {
  day: string;
  name?: string;
  isRestDay: boolean;
  exercises: Exercise[];
  warmup?: { name: string; duration: string }[];
  cooldown?: { name: string; duration: string }[];
  estimatedDuration?: number;
}

export interface Exercise {
  name: string;
  muscleGroup?: string;
  sets: number;
  reps: string;
  weight?: string;
  restTime?: number;
  notes?: string;
  videoUrl?: string;
  order?: number;
}

// ===== DIET TYPES =====

export interface DietPlan {
  _id: string;
  user: string;
  title: string;
  description?: string;
  type: string;
  goal: string;
  dailyTargets: DailyTargets;
  meals: Meal[];
  supplements: Supplement[];
  groceryList: GroceryCategory[];
  foodsToAvoid: string[];
  healthCondition?: string;
  isAIGenerated: boolean;
  isActive: boolean;
  duration?: number;
  rating?: number;
  createdAt: string;
}

export interface DailyTargets {
  calories: number;
  protein?: number;
  carbs?: number;
  fats?: number;
  fiber?: number;
  water?: number;
}

export interface Meal {
  name: string;
  time?: string;
  foods: FoodItem[];
  totalCalories?: number;
  notes?: string;
}

export interface FoodItem {
  item: string;
  quantity?: string;
  calories?: number;
  protein?: number;
  carbs?: number;
  fats?: number;
  recipe?: string;
  alternatives?: string[];
}

export interface Supplement {
  name: string;
  dosage?: string;
  timing?: string;
  notes?: string;
}

export interface GroceryCategory {
  category: string;
  items: { name: string; quantity: string }[];
}

// ===== MEMBERSHIP TYPES =====

export interface MembershipPlan {
  _id: string;
  name: "Basic" | "Pro" | "Elite";
  slug: string;
  price: { monthly: number; quarterly?: number; yearly?: number; currency: string };
  features: string[];
  maxTrainerSessions: number;
  hasAICoach: boolean;
  hasDietPlans: boolean;
  hasWorkoutPlans: boolean;
  hasProgressTracking: boolean;
  hasGroupClasses: boolean;
  hasPersonalTrainer: boolean;
  hasNutritionConsultation: boolean;
  hasSaunaAccess: boolean;
  hasPrioritySupport: boolean;
  description?: string;
  isPopular: boolean;
  color?: string;
}

export interface Payment {
  _id: string;
  user: string;
  membership?: string;
  amount: number;
  currency: string;
  status: "pending" | "completed" | "failed" | "refunded";
  paymentMethod: string;
  transactionId?: string;
  billingPeriod?: string;
  startDate?: string;
  endDate?: string;
  couponCode?: string;
  discount: number;
  createdAt: string;
}

// ===== BLOG TYPES =====

export interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  coverImage?: string;
  author: { _id: string; name: string; avatar?: string };
  category: string;
  tags: string[];
  readTime?: number;
  views: number;
  likes: number;
  isPublished: boolean;
  publishedAt?: string;
  createdAt: string;
}

// ===== EVENT TYPES =====

export interface FitnessEvent {
  _id: string;
  title: string;
  description: string;
  type: string;
  image?: string;
  startDate: string;
  endDate: string;
  location?: string;
  maxParticipants?: number;
  registeredUsers: string[];
  price: number;
  isFree: boolean;
  isActive: boolean;
  prizes?: { position: number; prize: string }[];
  rules?: string[];
}

// ===== PROGRESS TYPES =====

export interface ProgressReport {
  _id: string;
  user: string;
  date: string;
  weight?: number;
  bodyFat?: number;
  muscleMass?: number;
  measurements?: Measurements;
  photos?: { front?: string; side?: string; back?: string };
  waterIntake?: number;
  caloriesConsumed?: number;
  workoutCompleted: boolean;
  sleepHours?: number;
  mood?: "great" | "good" | "neutral" | "bad" | "terrible";
  energyLevel?: number;
}

export interface Measurements {
  chest?: number;
  waist?: number;
  hips?: number;
  biceps?: number;
  thighs?: number;
  calves?: number;
  shoulders?: number;
  neck?: number;
}

// ===== NOTIFICATION TYPES =====

export interface Notification {
  _id: string;
  user?: string;
  title: string;
  message: string;
  type: string;
  isRead: boolean;
  link?: string;
  icon?: string;
  isBroadcast: boolean;
  createdAt: string;
}

// ===== AI TYPES =====

export interface AIFitnessInput {
  height: number;
  weight: number;
  age: number;
  gender: "male" | "female" | "other";
  goal: string;
  activityLevel: string;
  sleepHours: number;
  foodPreference: string;
  experience: string;
  healthConditions: string[];
}

export interface AIRecommendation {
  workoutPlan: WorkoutPlan;
  dietPlan: DietPlan;
  dailyCalories: number;
  proteinIntake: number;
  waterIntake: number;
  macros: { protein: number; carbs: number; fats: number };
  supplements: Supplement[];
  weeklyRoadmap: string[];
  transformationPrediction: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

// ===== TRAINER TYPES =====

export interface TrainerProfile extends User {
  specializations: string[];
  certifications: string[];
  experience: number;
  rating: number;
  totalClients: number;
  bio: string;
  availability: { day: string; slots: string[] }[];
  socialMedia?: { instagram?: string; youtube?: string };
}

// ===== CALCULATOR TYPES =====

export interface CalculatorResult {
  value: number;
  label: string;
  unit: string;
  category?: string;
  color?: string;
  description?: string;
}

// ===== API RESPONSE =====

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}
