export interface ToolField {
  name: string;
  label: string;
  type: "text" | "number" | "select";
  placeholder?: string;
  options?: string[];
}

export interface ToolConfig {
  id: string;
  name: string;
  category: string;
  description: string;
  calculationType: "score" | "risk" | "analysis";
  fields: ToolField[];
  path: string;
  isNew?: boolean;
  expertName?: string;
}

export const TOOLS_CONFIG: ToolConfig[] = [
  {
    id: "fat-loss-transformation",
    name: "Fat Loss Transformation Program",
    category: "Fat Loss",
    description: "Elite protocol to maximize fat oxidation while preserving lean muscle mass, authored by Biswajit Das.",
    calculationType: "analysis",
    path: "/ai-tools/fat-loss/fat-loss-transformation",
    isNew: true,
    expertName: "Biswajit Das",
    fields: [
      { name: "name", label: "Full Name", type: "text", placeholder: "e.g. John Doe" },
      { name: "age", label: "Age", type: "number", placeholder: "e.g. 28" },
      { name: "weight", label: "Current Weight (kg)", type: "number", placeholder: "e.g. 85" },
      { name: "height", label: "Height (cm)", type: "number", placeholder: "e.g. 175" },
      { name: "targetWeight", label: "Target Weight (kg)", type: "number", placeholder: "e.g. 75" },
      { name: "activityLevel", label: "Activity Level", type: "select", options: ["Sedentary", "Light", "Moderate", "High", "Athlete"] },
      { name: "condition", label: "Special Condition", type: "select", options: ["None", "Thyroid", "PCOS", "Diabetes", "Hypertension"] }
    ]
  },
  {
    id: "muscle-gain-program",
    name: "Muscle Gain Program",
    category: "Muscle Gain",
    description: "Hypertrophy-focused training and surplus nutrition protocols designed by Coach Satyajit Nayak.",
    calculationType: "analysis",
    path: "/ai-tools/muscle-gain/muscle-gain-program",
    isNew: true,
    expertName: "Satyajit Nayak",
    fields: [
      { name: "name", label: "Full Name", type: "text", placeholder: "e.g. John Doe" },
      { name: "age", label: "Age", type: "number" },
      { name: "weight", label: "Current Weight (kg)", type: "number" },
      { name: "targetWeight", label: "Target Weight (kg)", type: "number" },
      { name: "experience", label: "Lifting Experience", type: "select", options: ["Beginner", "Intermediate", "Advanced"] }
    ]
  },
  {
    id: "strength-training-program",
    name: "Strength Training Program",
    category: "Strength",
    description: "Neurological adaptation and maximal strength protocols by Trainer Asutosh Pradhan.",
    calculationType: "analysis",
    path: "/ai-tools/strength/strength-training-program",
    expertName: "Asutosh Pradhan",
    fields: [
      { name: "name", label: "Full Name", type: "text" },
      { name: "weight", label: "Current Weight (kg)", type: "number" },
      { name: "squat", label: "Current 1RM Squat (kg)", type: "number" },
      { name: "bench", label: "Current 1RM Bench (kg)", type: "number" },
      { name: "deadlift", label: "Current 1RM Deadlift (kg)", type: "number" }
    ]
  },
  {
    id: "weight-gain-program",
    name: "Weight Gain Program",
    category: "Nutrition",
    description: "Caloric surplus and progressive overload strategies crafted by Rajesh Mohanty.",
    calculationType: "analysis",
    path: "/ai-tools/nutrition/weight-gain-program",
    expertName: "Rajesh Mohanty",
    fields: [
      { name: "name", label: "Full Name", type: "text" },
      { name: "age", label: "Age", type: "number" },
      { name: "weight", label: "Current Weight (kg)", type: "number" },
      { name: "metabolism", label: "Metabolic Rate Guess", type: "select", options: ["Fast (Hardgainer)", "Normal", "Slow"] }
    ]
  },
  {
    id: "women-fitness-program",
    name: "Women Fitness Program",
    category: "Wellness",
    description: "Specialized fitness, toning, and hormonal-balance training by the Wellness Team.",
    calculationType: "analysis",
    path: "/ai-tools/wellness/women-fitness-program",
    isNew: true,
    expertName: "PRO FITNESS Wellness Team",
    fields: [
      { name: "name", label: "Full Name", type: "text" },
      { name: "age", label: "Age", type: "number" },
      { name: "weight", label: "Current Weight (kg)", type: "number" },
      { name: "condition", label: "Special Condition", type: "select", options: ["None", "PCOS", "Thyroid", "Post-Pregnancy"] }
    ]
  },
  {
    id: "beginner-fitness-program",
    name: "Beginner Fitness Program",
    category: "Beginner",
    description: "Foundation building and habit forming routines by Coach Sambit Rout.",
    calculationType: "analysis",
    path: "/ai-tools/beginner/beginner-fitness-program",
    expertName: "Sambit Rout",
    fields: [
      { name: "name", label: "Full Name", type: "text" },
      { name: "age", label: "Age", type: "number" },
      { name: "commitment", label: "Days per Week", type: "select", options: ["2 Days", "3 Days", "4 Days"] }
    ]
  },
  {
    id: "athletic-conditioning-program",
    name: "Athletic Conditioning Program",
    category: "Performance",
    description: "Plyometrics, agility, and sport-specific endurance by Coach Subham Behera.",
    calculationType: "analysis",
    path: "/ai-tools/performance/athletic-conditioning-program",
    expertName: "Subham Behera",
    fields: [
      { name: "name", label: "Full Name", type: "text" },
      { name: "sport", label: "Primary Sport", type: "text", placeholder: "e.g. Football, Cricket" },
      { name: "weight", label: "Current Weight (kg)", type: "number" }
    ]
  },
  {
    id: "home-workout-program",
    name: "Home Workout Program",
    category: "Transformation",
    description: "No-equipment and minimal-equipment bodyweight mastery protocols.",
    calculationType: "analysis",
    path: "/ai-tools/transformation/home-workout-program",
    expertName: "PRO FITNESS Expert Team",
    fields: [
      { name: "name", label: "Full Name", type: "text" },
      { name: "equipment", label: "Available Equipment", type: "select", options: ["None", "Dumbbells Only", "Resistance Bands", "Basic Home Gym"] }
    ]
  },
  {
    id: "wellness-recovery-program",
    name: "Wellness & Recovery Program",
    category: "Wellness",
    description: "Mobility, flexibility, and CNS recovery strategies by Coach Chinmay Rout.",
    calculationType: "analysis",
    path: "/ai-tools/wellness/wellness-recovery-program",
    expertName: "Chinmay Rout",
    fields: [
      { name: "name", label: "Full Name", type: "text" },
      { name: "painPoints", label: "Current Pain/Stiffness", type: "select", options: ["Lower Back", "Shoulders/Neck", "Knees", "General Fatigue"] }
    ]
  },
  {
    id: "senior-fitness-program",
    name: "Senior Fitness Program",
    category: "Health",
    description: "Joint-friendly, longevity-focused functional training for older adults.",
    calculationType: "analysis",
    path: "/ai-tools/health/senior-fitness-program",
    expertName: "PRO FITNESS Expert Team",
    fields: [
      { name: "name", label: "Full Name", type: "text" },
      { name: "age", label: "Age", type: "number", placeholder: "e.g. 60+" },
      { name: "mobility", label: "Mobility Level", type: "select", options: ["Independent", "Uses Support", "Limited"] }
    ]
  }
];
