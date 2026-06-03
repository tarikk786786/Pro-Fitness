"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Calculator, Activity, Droplets, Flame, Apple, Moon, Scale, HeartPulse 
} from "lucide-react";

export default function CalculatorsHub() {
  const [activeTab, setActiveTab] = useState<string>("bmi");
  
  // Generic Inputs
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState<"male" | "female">("male");
  const [activity, setActivity] = useState("moderate");
  const [goal, setGoal] = useState("maintenance");

  // Calculate BMI
  const bmi = weight && height ? Number((Number(weight) / Math.pow(Number(height) / 100, 2)).toFixed(1)) : 0;
  let bmiCategory = "Normal";
  let bmiColor = "text-green-500";
  if (bmi < 18.5) { bmiCategory = "Underweight"; bmiColor = "text-blue-500"; }
  else if (bmi >= 25 && bmi < 30) { bmiCategory = "Overweight"; bmiColor = "text-orange-500"; }
  else if (bmi >= 30) { bmiCategory = "Obese"; bmiColor = "text-red-500"; }

  // Calculate BMR (Mifflin-St Jeor)
  const bmr = weight && height && age ? Math.round(
    10 * Number(weight) + 6.25 * Number(height) - 5 * Number(age) + (gender === "male" ? 5 : -161)
  ) : 0;

  // Calculate TDEE
  const multipliers: Record<string, number> = { sedentary: 1.2, light: 1.375, moderate: 1.55, active: 1.725, very_active: 1.9 };
  const tdee = bmr ? Math.round(bmr * (multipliers[activity] || 1.55)) : 0;

  // Calculate Macros
  const proteinCals = tdee * 0.3; // 30%
  const fatCals = tdee * 0.25; // 25%
  const carbCals = tdee * 0.45; // 45%
  const proteinGrams = Math.round(proteinCals / 4);
  const fatGrams = Math.round(fatCals / 9);
  const carbGrams = Math.round(carbCals / 4);

  // Calculate Water Intake (Liters)
  const waterBase = weight ? Number(weight) * 0.033 : 0;
  const waterIntake = waterBase ? Number((waterBase * (multipliers[activity] / 1.2)).toFixed(1)) : 0;

  // Calculate Target Heart Rate
  const maxHR = age ? 220 - Number(age) : 0;
  const targetHRZone = maxHR ? `${Math.round(maxHR * 0.65)} - ${Math.round(maxHR * 0.85)}` : "0 - 0";

  const tabs = [
    { id: "bmi", label: "BMI & BMR", icon: Activity },
    { id: "tdee", label: "TDEE & Macros", icon: Calculator },
    { id: "water", label: "Water & HR", icon: Droplets }
  ];

  return (
    <div className="pt-24 pb-32 bg-black min-h-screen">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-black mb-4 flex items-center justify-center gap-4 text-white tracking-wider"
          >
            AI SMART <span className="text-[#FF0033]">CALCULATORS</span>
          </motion.h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Input your metrics below and let our intelligent system calculate your exact biological requirements for optimal performance and transformation.
          </p>
        </div>

        {/* Global Input Form */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-8 mb-8 backdrop-blur-xl">
          <h2 className="text-xl font-bold mb-6 text-white flex items-center gap-2">
            <Scale className="w-5 h-5 text-[#00D4FF]" />
            Your Biological Metrics
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Age</label>
              <input type="number" value={age} onChange={e => setAge(e.target.value)} placeholder="e.g. 28" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00D4FF]" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Gender</label>
              <select value={gender} onChange={e => setGender(e.target.value as any)} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00D4FF]">
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Weight (kg)</label>
              <input type="number" value={weight} onChange={e => setWeight(e.target.value)} placeholder="e.g. 75" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00D4FF]" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Height (cm)</label>
              <input type="number" value={height} onChange={e => setHeight(e.target.value)} placeholder="e.g. 180" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00D4FF]" />
            </div>
            <div className="lg:col-span-2">
              <label className="block text-sm font-medium text-gray-400 mb-2">Activity Level</label>
              <select value={activity} onChange={e => setActivity(e.target.value)} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00D4FF]">
                <option value="sedentary">Sedentary (Little to no exercise)</option>
                <option value="light">Lightly Active (1-3 days/week)</option>
                <option value="moderate">Moderately Active (3-5 days/week)</option>
                <option value="active">Very Active (6-7 days/week)</option>
                <option value="very_active">Super Active (Physical job + training)</option>
              </select>
            </div>
            <div className="lg:col-span-2">
              <label className="block text-sm font-medium text-gray-400 mb-2">Primary Goal</label>
              <select value={goal} onChange={e => setGoal(e.target.value)} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00D4FF]">
                <option value="weight_loss">Weight Loss / Fat Loss</option>
                <option value="maintenance">Maintenance</option>
                <option value="muscle_gain">Muscle Gain / Bulking</option>
              </select>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap bg-white/5 p-1 rounded-2xl mb-8 border border-white/10">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-3 px-4 rounded-xl flex items-center justify-center gap-2 font-bold transition-all text-sm sm:text-base ${
                activeTab === tab.id ? "bg-[#FF0033] text-white shadow-[0_0_20px_rgba(255,0,51,0.4)]" : "text-gray-400 hover:text-white"
              }`}
            >
              <tab.icon className="w-4 h-4 hidden sm:block" /> {tab.label}
            </button>
          ))}
        </div>

        {/* Results Area */}
        <AnimatePresence mode="wait">
          {activeTab === "bmi" && (
            <motion.div 
              key="bmi" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              <div className="bg-black/60 border border-white/10 rounded-3xl p-8 flex flex-col items-center justify-center text-center backdrop-blur-xl">
                <Activity className="w-8 h-8 text-[#00D4FF] mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Body Mass Index (BMI)</h3>
                <p className="text-gray-400 text-sm mb-6">A measure of body fat based on height and weight.</p>
                <div className="text-6xl font-black text-white mb-4">{bmi || "0.0"}</div>
                {bmi > 0 && (
                  <div className={`px-6 py-2 rounded-full font-bold text-sm bg-white/5 border ${bmiColor.replace("text-", "border-")} ${bmiColor}`}>
                    {bmiCategory}
                  </div>
                )}
              </div>
              <div className="bg-black/60 border border-white/10 rounded-3xl p-8 flex flex-col items-center justify-center text-center backdrop-blur-xl">
                <Flame className="w-8 h-8 text-[#FF0033] mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Basal Metabolic Rate (BMR)</h3>
                <p className="text-gray-400 text-sm mb-6">Calories burned while completely at rest.</p>
                <div className="text-6xl font-black text-white mb-4">{bmr || "0"}<span className="text-2xl text-gray-500 ml-2">kcal</span></div>
              </div>
            </motion.div>
          )}

          {activeTab === "tdee" && (
            <motion.div 
              key="tdee" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <div className="bg-gradient-to-r from-[#FF0033]/20 to-[#00D4FF]/20 border border-white/10 rounded-3xl p-8 text-center backdrop-blur-xl relative overflow-hidden">
                <div className="absolute inset-0 bg-black/40" />
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold text-white mb-2">Total Daily Energy Expenditure (TDEE)</h3>
                  <p className="text-gray-300 text-sm mb-6 max-w-xl mx-auto">
                    This is your maintenance calories. To lose weight, eat 500 kcal less. To gain muscle, eat 300 kcal more.
                  </p>
                  <div className="text-6xl font-black text-white mb-4">{tdee || "0"}<span className="text-2xl text-gray-400 ml-2">kcal/day</span></div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-black/60 border border-white/10 rounded-3xl p-6 text-center backdrop-blur-xl">
                  <h4 className="text-gray-400 font-bold mb-4 uppercase tracking-wider text-sm">Protein (30%)</h4>
                  <div className="text-4xl font-black text-blue-400 mb-2">{proteinGrams || "0"}g</div>
                  <div className="text-sm text-gray-500">{proteinCals || "0"} kcal</div>
                </div>
                <div className="bg-black/60 border border-white/10 rounded-3xl p-6 text-center backdrop-blur-xl">
                  <h4 className="text-gray-400 font-bold mb-4 uppercase tracking-wider text-sm">Carbs (45%)</h4>
                  <div className="text-4xl font-black text-green-400 mb-2">{carbGrams || "0"}g</div>
                  <div className="text-sm text-gray-500">{carbCals || "0"} kcal</div>
                </div>
                <div className="bg-black/60 border border-white/10 rounded-3xl p-6 text-center backdrop-blur-xl">
                  <h4 className="text-gray-400 font-bold mb-4 uppercase tracking-wider text-sm">Fats (25%)</h4>
                  <div className="text-4xl font-black text-orange-400 mb-2">{fatGrams || "0"}g</div>
                  <div className="text-sm text-gray-500">{fatCals || "0"} kcal</div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "water" && (
            <motion.div 
              key="water" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              <div className="bg-black/60 border border-blue-500/20 rounded-3xl p-8 flex flex-col items-center justify-center text-center backdrop-blur-xl relative overflow-hidden">
                <div className="absolute inset-0 bg-blue-500/5" />
                <Droplets className="w-8 h-8 text-blue-400 mb-4 relative z-10" />
                <h3 className="text-xl font-bold text-white mb-2 relative z-10">Daily Water Intake</h3>
                <p className="text-gray-400 text-sm mb-6 relative z-10">Recommended hydration based on weight and activity.</p>
                <div className="text-6xl font-black text-blue-400 mb-4 relative z-10">{waterIntake || "0"}<span className="text-2xl text-blue-500/50 ml-2">Liters</span></div>
              </div>

              <div className="bg-black/60 border border-red-500/20 rounded-3xl p-8 flex flex-col items-center justify-center text-center backdrop-blur-xl relative overflow-hidden">
                <div className="absolute inset-0 bg-red-500/5" />
                <HeartPulse className="w-8 h-8 text-red-500 mb-4 relative z-10" />
                <h3 className="text-xl font-bold text-white mb-2 relative z-10">Target Heart Rate</h3>
                <p className="text-gray-400 text-sm mb-6 relative z-10">Optimal fat burning zone (65% - 85% of Max HR).</p>
                <div className="text-5xl font-black text-red-500 mb-4 relative z-10">{targetHRZone}<span className="text-2xl text-red-500/50 ml-2">BPM</span></div>
                <div className="text-sm text-gray-500 relative z-10">Max Heart Rate: {maxHR || "0"} BPM</div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
