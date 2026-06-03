import { AIFitnessInput, AIRecommendation, ChatMessage, WorkoutPlan, DietPlan } from "@/types";
import { calculateBMI, calculateBMR, calculateTDEE, calculateProteinIntake } from "@/lib/utils";

export async function generateWorkoutPlan(input: AIFitnessInput): Promise<WorkoutPlan> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000));

  return {
    _id: "mock_ai_workout_123",
    user: "mock_user",
    title: `AI ${input.goal.replace("_", " ")} Protocol`,
    description: "Personalized algorithmic workout plan based on your metrics.",
    type: "strength",
    goal: input.goal,
    difficulty: input.experience as any,
    days: [
      {
        day: "monday",
        isRestDay: false,
        exercises: [
          { name: "Barbell Squats", sets: 4, reps: "8-10", restTime: 90 },
          { name: "Leg Press", sets: 3, reps: "10-12", restTime: 60 },
          { name: "Romanian Deadlifts", sets: 3, reps: "10-12", restTime: 60 },
          { name: "Calf Raises", sets: 4, reps: "15-20", restTime: 45 }
        ]
      },
      {
        day: "tuesday",
        isRestDay: false,
        exercises: [
          { name: "Bench Press", sets: 4, reps: "8-10", restTime: 90 },
          { name: "Incline Dumbbell Press", sets: 3, reps: "10-12", restTime: 60 },
          { name: "Lat Pulldowns", sets: 3, reps: "10-12", restTime: 60 },
          { name: "Barbell Rows", sets: 4, reps: "8-10", restTime: 90 }
        ]
      },
      {
        day: "wednesday",
        isRestDay: true,
        exercises: []
      },
      {
        day: "thursday",
        isRestDay: false,
        exercises: [
          { name: "Overhead Press", sets: 4, reps: "8-10", restTime: 90 },
          { name: "Lateral Raises", sets: 3, reps: "15", restTime: 45 },
          { name: "Bicep Curls", sets: 3, reps: "12", restTime: 45 },
          { name: "Tricep Extensions", sets: 3, reps: "12", restTime: 45 }
        ]
      },
      {
        day: "friday",
        isRestDay: false,
        exercises: [
          { name: "Deadlifts", sets: 3, reps: "5-8", restTime: 120 },
          { name: "Pull-ups", sets: 3, reps: "AMRAP", restTime: 90 },
          { name: "Face Pulls", sets: 3, reps: "15", restTime: 45 },
          { name: "Plank", sets: 3, reps: "60s", restTime: 45 }
        ]
      },
      { day: "saturday", isRestDay: true, exercises: [] },
      { day: "sunday", isRestDay: true, exercises: [] }
    ],
    isAIGenerated: true,
    targetMuscles: ["Full Body", "Core", "Legs"],
    equipment: ["Barbell", "Dumbbells", "Machines"],
    isActive: true,
    completedSessions: 0,
    createdAt: new Date().toISOString()
  };
}

export async function generateDietPlan(input: AIFitnessInput): Promise<DietPlan> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000));

  const bmrGender: "male" | "female" = input.gender === "male" ? "male" : "female";
  const bmr = calculateBMR(input.weight, input.height, input.age, bmrGender);
  let tdee = calculateTDEE(bmr, input.activityLevel);
  
  if (input.goal === "weight_loss") tdee -= 500;
  if (input.goal === "muscle_gain") tdee += 300;

  const protein = calculateProteinIntake(input.weight, input.goal, input.activityLevel);

  return {
    _id: "mock_ai_diet_123",
    user: "mock_user",
    title: `AI Optimized ${input.goal.replace("_", " ")} Diet`,
    description: "Calculated macros for optimal performance.",
    type: input.foodPreference,
    goal: input.goal,
    dailyTargets: {
      calories: tdee,
      protein: protein,
      carbs: Math.round((tdee - (protein * 4) - (input.weight * 0.8 * 9)) / 4), // remainder
      fats: Math.round(input.weight * 0.8), // 0.8g per kg
      water: 3.5
    },
    meals: [
      {
        name: "Breakfast",
        time: "08:00",
        foods: [
          { item: "Oats", quantity: "60g", calories: 230, protein: 8, carbs: 40, fats: 4 },
          { item: "Whey Protein", quantity: "1 scoop", calories: 120, protein: 25, carbs: 3, fats: 1 },
          { item: "Almonds", quantity: "15g", calories: 90, protein: 3, carbs: 3, fats: 8 }
        ]
      },
      {
        name: "Lunch",
        time: "13:30",
        foods: [
          { item: "Chicken Breast", quantity: "150g", calories: 240, protein: 45, carbs: 0, fats: 5 },
          { item: "Brown Rice", quantity: "150g", calories: 170, protein: 4, carbs: 35, fats: 1 },
          { item: "Broccoli", quantity: "100g", calories: 35, protein: 3, carbs: 7, fats: 0 }
        ]
      },
      {
        name: "Dinner",
        time: "20:00",
        foods: [
          { item: "Salmon", quantity: "150g", calories: 310, protein: 30, carbs: 0, fats: 20 },
          { item: "Sweet Potato", quantity: "200g", calories: 180, protein: 3, carbs: 40, fats: 0 }
        ]
      }
    ],
    supplements: [
      { name: "Whey Protein", timing: "Post-workout" },
      { name: "Creatine Monohydrate", dosage: "5g", timing: "Daily" },
      { name: "Multivitamin", timing: "With Breakfast" }
    ],
    groceryList: [],
    foodsToAvoid: ["Refined Sugar", "Processed Oils", "Deep Fried Foods"],
    isAIGenerated: true,
    isActive: true,
    createdAt: new Date().toISOString()
  };
}

export async function chatWithCoach(message: string, history: ChatMessage[]): Promise<string> {
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const m = message.toLowerCase();
  
  if (m.includes("protein")) {
    return "Aim for 1.6-2.2g of protein per kg of body weight depending on your goals. Great sources include chicken, eggs, whey, lentils, and paneer.";
  }
  if (m.includes("sore") || m.includes("pain")) {
    return "Muscle soreness (DOMS) is normal! Make sure you are hydrating, getting 7-8 hours of sleep, and doing some light active recovery like walking or stretching.";
  }
  if (m.includes("hello") || m.includes("hi")) {
    return "Hello! I'm your PRO FITNESS AI Coach. How can I help you crush your fitness goals today?";
  }
  
  return "That's a great question. Remember that consistency is key. Keep pushing your limits, track your macros, and the results will follow! Let me know if you need a specific workout or diet adjustment.";
}
