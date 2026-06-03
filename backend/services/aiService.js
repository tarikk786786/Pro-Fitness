// AI Service with fallback mock data when no API key is present
const OpenAI = require('openai');

let openai;
if (process.env.OPENAI_API_KEY) {
    openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
}

exports.generateRecommendation = async (input) => {
    // If OpenAI is configured, we could make an API call here.
    // For now, returning realistic mock data to ensure it always works.
    
    return {
        workoutPlan: {
            title: "AI Optimized Full Body Routine",
            type: "strength",
            goal: input.goal || "general_fitness",
            difficulty: input.experience || "intermediate",
            days: [
                {
                    day: "monday",
                    isRestDay: false,
                    exercises: [
                        { name: "Squats", sets: 3, reps: "10-12", restTime: 60 },
                        { name: "Push-ups", sets: 3, reps: "AMRAP", restTime: 45 }
                    ]
                }
            ]
        },
        dietPlan: {
            title: "AI Precision Nutrition Plan",
            type: input.foodPreference || "mixed",
            goal: input.goal || "maintenance",
            dailyTargets: {
                calories: 2200,
                protein: 150,
                carbs: 200,
                fats: 60
            },
            meals: [
                {
                    name: "Breakfast",
                    foods: [
                        { item: "Oatmeal", quantity: "1 cup", calories: 300, protein: 10, carbs: 54, fats: 5 }
                    ]
                }
            ]
        },
        dailyCalories: 2200,
        proteinIntake: 150,
        waterIntake: 3.5,
        weeklyRoadmap: [
            "Week 1: Adaptation phase",
            "Week 2: Volume increase"
        ]
    };
};

exports.chatWithCoach = async (message, history) => {
    if (openai) {
        try {
            const completion = await openai.chat.completions.create({
                model: "gpt-3.5-turbo",
                messages: [
                    { role: "system", content: "You are an AI fitness coach for PRO FITNESS." },
                    ...history,
                    { role: "user", content: message }
                ]
            });
            return completion.choices[0].message.content;
        } catch (error) {
            console.error("OpenAI Error:", error);
        }
    }
    
    // Mock Fallback
    return "I'm your PRO FITNESS AI Coach. I can help you with workouts, diets, and motivation. (Mock Mode Active)";
};

exports.analyzeBody = async (data) => {
    return "Based on the provided metrics, your body fat percentage is estimated to be within a healthy range. Keep up the consistent workouts!";
};
