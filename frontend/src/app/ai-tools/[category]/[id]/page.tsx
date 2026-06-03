"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Download, FileSpreadsheet, Activity, ChevronRight, MessageCircle, Mail, AlertTriangle, Target, Dumbbell, Utensils, BarChart3, ShieldCheck, HeartPulse } from "lucide-react";
import { TOOLS_CONFIG, ToolConfig } from "@/lib/ai-tools-config";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { generatePDFReport, generateExcelReport, shareWhatsApp, shareEmail } from "@/lib/reports";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";

export default function AIToolDynamicPage() {
  const params = useParams();
  const router = useRouter();
  
  const [tool, setTool] = useState<ToolConfig | null>(null);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    if (params.id) {
      const foundTool = TOOLS_CONFIG.find(t => t.id === params.id);
      if (foundTool) {
        setTool(foundTool);
      }
    }
  }, [params.id]);

  if (!tool) {
    return <div className="min-h-screen bg-[#0A0A0A] text-white flex items-center justify-center">Loading Elite Systems...</div>;
  }

  const handleInputChange = (name: string, value: any) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const getExpertForCategory = (category: string) => {
    const cat = category.toLowerCase();
    if (cat.includes("strength") || cat.includes("muscle") || cat.includes("lift")) return "Satyajit Nayak";
    if (cat.includes("fat") || cat.includes("loss") || cat.includes("cardio")) return "Biswajit Das";
    if (cat.includes("nutrition") || cat.includes("diet") || cat.includes("macro") || cat.includes("calorie")) return "Rajesh Mohanty";
    if (cat.includes("wellness") || cat.includes("health") || cat.includes("sleep")) return "Chinmay Rout";
    if (cat.includes("beginner") || cat.includes("start")) return "Sambit Rout";
    if (cat.includes("transformation") || cat.includes("track") || cat.includes("assess")) return "Debasish Sahoo";
    return "PRO FITNESS Expert Team";
  };

  const handleAnalyze = async () => {
    setLoading(true);
    setTimeout(() => {
      let mockResult: any = {
        userProfile: { name: formData.name || "Elite Athlete", age: formData.age || 28, weight: formData.weight || 85, targetWeight: 75, goal: "Shred & Build", activityLevel: "High" },
        expertTrainer: getExpertForCategory(tool.category),
        scores: { 
          fitness: Math.floor(Math.random() * 20) + 80, 
          recovery: Math.floor(Math.random() * 20) + 70, 
          sleep: Math.floor(Math.random() * 20) + 70, 
          hydration: Math.floor(Math.random() * 20) + 80,
          endurance: Math.floor(Math.random() * 20) + 75,
          strength: Math.floor(Math.random() * 20) + 80,
        },
        status: "Optimal Performance Phase",
        message: `Based on your inputs, your ${tool.name} profile shows you are in a prime state for transformation. Your assigned expert coach has crafted an elite 12-week protocol tailored to Indian dietary patterns.`,
        healthAnalysis: { bmi: 24.5, bmr: 1850, tdee: 2600, bodyFat: 15, leanBodyMass: 72.25, hydrationLevel: "Optimal", sleepQuality: "Moderate", metabolicAge: 25 },
        workoutPlan: [
          { day: "Monday", type: "Hypertrophy Push", exercises: [
            { name: "Incline Dumbbell Press", sets: 4, reps: "8-10", tempo: "3-1-1-1", rest: "90s" }, 
            { name: "Overhead Press", sets: 3, reps: "10-12", tempo: "2-0-2-0", rest: "60s" },
            { name: "Tricep Extensions", sets: 3, reps: "12-15", tempo: "2-0-2-1", rest: "45s" }
          ] },
          { day: "Tuesday", type: "Hypertrophy Pull", exercises: [
            { name: "Weighted Pull-ups", sets: 4, reps: "6-8", tempo: "2-1-1-1", rest: "90s" }, 
            { name: "Barbell Rows", sets: 3, reps: "8-10", tempo: "3-0-1-1", rest: "90s" },
            { name: "Preacher Curls", sets: 3, reps: "10-12", tempo: "3-0-1-0", rest: "60s" }
          ] },
          { day: "Wednesday", type: "Legs & Core", exercises: [
            { name: "Barbell Squats", sets: 4, reps: "6-8", tempo: "3-1-1-0", rest: "120s" }, 
            { name: "Romanian Deadlifts", sets: 3, reps: "8-10", tempo: "3-1-1-0", rest: "90s" },
            { name: "Hanging Leg Raises", sets: 4, reps: "15", tempo: "2-0-2-0", rest: "60s" }
          ] },
          { day: "Thursday", type: "Active Recovery", exercises: [
            { name: "Zone 2 Cardio", sets: 1, reps: "45 mins", tempo: "Steady", rest: "N/A" }, 
            { name: "Mobility Flow", sets: 1, reps: "15 mins", tempo: "Controlled", rest: "N/A" }
          ] },
          { day: "Friday", type: "Upper Body Power", exercises: [
            { name: "Bench Press", sets: 5, reps: "3-5", tempo: "2-0-X-0", rest: "180s" }, 
            { name: "Pendlay Rows", sets: 5, reps: "3-5", tempo: "2-0-X-0", rest: "180s" }
          ] },
          { day: "Saturday", type: "Lower Body Power", exercises: [
            { name: "Deadlifts", sets: 5, reps: "3-5", tempo: "2-1-X-0", rest: "180s" }, 
            { name: "Box Jumps", sets: 4, reps: "5", tempo: "Explosive", rest: "90s" }
          ] },
          { day: "Sunday", type: "Complete Rest", exercises: [{ name: "Rest", sets: 0, reps: "0", tempo: "-", rest: "-" }] },
        ],
        dietPlan: {
          meals: [
            { time: "07:00", meal: "Pre-Workout: Black coffee, 1 banana / 1 apple" },
            { time: "09:00", meal: "Breakfast: Oats with whey OR Poha with peanuts OR Paneer sandwich" },
            { time: "11:30", meal: "Mid-Morning: Greek yogurt / Curd, handful almonds" },
            { time: "13:30", meal: "Lunch: Rice + Dal + 150g Chicken breast / Roti + Paneer sabji" },
            { time: "16:00", meal: "Afternoon Snack: Roasted Chana / Apple" },
            { time: "18:30", meal: "Post-Workout: 1 scoop Whey isolate OR 4 Boiled eggs (1 whole, 3 whites)" },
            { time: "21:00", meal: "Dinner: 200g Fish / Chicken, 2 Roti, mixed salad" },
            { time: "All Day", meal: "Hydration: 4-5 liters water, tender coconut water" }
          ],
          macros: { protein: 220, carbs: 300, fat: 85, totalCalories: 2845 },
          breakdown: { proteinPct: 30, carbsPct: 45, fatPct: 25 }
        },
        roadmap: [
           { milestone: "30-Day", focus: "Metabolic conditioning & Habit building. Expect 2-3kg weight fluctuation and improved sleep." },
           { milestone: "60-Day", focus: "Strength accumulation & Muscle density. Visible body recomposition and clothing size changes." },
           { milestone: "90-Day", focus: "Peak performance & Solidified lifestyle. Significant fat loss and muscle definition." },
        ],
        predictions: Array.from({length: 12}, (_, i) => ({
          week: `W${i+1}`, 
          weight: (85 - (i*0.6)).toFixed(1), 
          bodyFat: (15 - (i*0.3)).toFixed(1), 
          performanceScore: 70 + (i*2.5)
        })),
        specialConditions: {
          note: "Protocols have been adjusted for Thyroid/PCOS/Diabetes considerations: utilizing low GI carbs, hormone-balancing fats, and cortisol-conscious training volume."
        },
        coachRecommendations: [
           "Implement progressive overload weekly. Add 2.5kg to major lifts.",
           "Prioritize 8 hours of sleep for CNS recovery and hormonal balance.",
           "Hit 4-5 liters water intake religiously to support muscle fascia.",
           "Do not skip Zone 2 cardio; it builds mitochondrial density."
        ],
        trainerNotes: "Your metabolic rate is highly responsive. Focus on consistency over intensity during the first 2 weeks to prime your central nervous system.",
        professionalGuidance: "Consult your assigned coach before making any macro adjustments or swapping major compound movements.",
        workoutFocusAreas: ["Posterior Chain", "Core Stability", "Cardiovascular Endurance"],
        recoveryRecommendations: ["Epsom salt baths twice a week", "15 mins active stretching post-workout", "Minimum 7 hours sleep"],
        timeline: [
           { phase: "Weeks 1-4: Foundation", focus: "Hypertrophy & Neurological Adaptation" },
           { phase: "Weeks 5-8: Accumulation", focus: "Strength & Volume Peaking" },
           { phase: "Weeks 9-12: Intensification", focus: "Maximal Fat Loss & Performance Peak" }
        ],
        safety: {
          tips: ["Dynamic warmup is non-negotiable before hitting the iron.", "Hydrate pre, intra, and post workout."],
          rules: ["Leave ego at the door.", "Listen to joint pain; differentiate it from muscle soreness.", "Always use collars on barbells."]
        }
      };
      
      setResult(mockResult);
      setLoading(false);
      setActiveTab("overview");
    }, 2500);
  };

  const TABS = [
    { id: "overview", label: "Overview", icon: Target },
    { id: "workout", label: "Training", icon: Dumbbell },
    { id: "diet", label: "Nutrition", icon: Utensils },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "coach", label: "Coach AI", icon: ShieldCheck },
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white pb-20 font-sans selection:bg-[#FFD600] selection:text-black">
      {/* Header */}
      <div className="border-b border-zinc-900 bg-[#0A0A0A]/90 backdrop-blur-xl sticky top-0 z-30 shadow-2xl shadow-black">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => router.push('/ai-tools')}
              className="p-2 hover:bg-zinc-900 rounded-full transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-zinc-400" />
            </button>
            <div>
              <div className="flex items-center text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-1">
                <span>AI Ecosystem</span>
                <ChevronRight className="w-3 h-3 mx-1" />
                <span className="text-[#FFD600]">{tool.category}</span>
              </div>
              <h1 className="text-xl font-bold tracking-tight">{tool.name}</h1>
            </div>
          </div>
          {result && (
            <div className="flex items-center gap-2">
              <Button onClick={() => shareWhatsApp({ text: `Check out my Elite PRO FITNESS Report by ${result.expertTrainer}!` })} variant="ghost" size="icon" className="text-green-500 hover:bg-zinc-900 rounded-full">
                <MessageCircle className="w-5 h-5" />
              </Button>
              <Button onClick={() => shareEmail({ subject: "My Elite Report", body: "Attached" })} variant="ghost" size="icon" className="text-blue-500 hover:bg-zinc-900 rounded-full mr-2">
                <Mail className="w-5 h-5" />
              </Button>
              <Button onClick={() => generatePDFReport({ toolName: tool.name, data: result })} variant="outline" className="border-zinc-800 bg-[#0A0A0A] text-white hover:bg-zinc-900 hover:text-[#FFD600] rounded-full h-10 px-4 flex items-center gap-2 transition-all">
                <Download className="w-4 h-4" /> PDF Report
              </Button>
              <Button onClick={() => generateExcelReport({ toolName: tool.name, data: result })} variant="outline" className="border-zinc-800 bg-[#0A0A0A] text-white hover:bg-zinc-900 hover:text-green-500 rounded-full h-10 px-4 flex items-center gap-2 transition-all">
                <FileSpreadsheet className="w-4 h-4" /> Excel
              </Button>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Sidebar Form */}
          <div className="lg:col-span-4">
            <div className="bg-[#111111] border border-zinc-900 p-6 rounded-2xl sticky top-28 shadow-xl shadow-black/50">
              <h2 className="text-lg font-bold mb-6 flex items-center gap-2 uppercase tracking-wide">
                <Activity className="w-5 h-5 text-[#FFD600]" /> Expert Parameters
              </h2>
              
              <div className="space-y-5">
                {tool.fields.map(field => (
                  <div key={field.name}>
                    <label className="block text-sm font-medium text-zinc-400 mb-2">
                      {field.label}
                    </label>
                    {field.type === 'select' ? (
                      <select 
                        className="w-full bg-[#0A0A0A] border border-zinc-800 rounded-xl h-12 px-4 text-white focus:border-[#FFD600] focus:ring-1 focus:ring-[#FFD600] outline-none transition-all"
                        onChange={(e) => handleInputChange(field.name, e.target.value)}
                        value={formData[field.name] || ""}
                      >
                        <option value="">Select option...</option>
                        {field.options?.map(opt => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    ) : (
                      <Input
                        type={field.type}
                        placeholder={field.placeholder || ""}
                        className="bg-[#0A0A0A] border-zinc-800 h-12 rounded-xl focus:border-[#FFD600] focus:ring-1 focus:ring-[#FFD600] text-white transition-all"
                        onChange={(e) => handleInputChange(field.name, e.target.value)}
                        value={formData[field.name] || ""}
                      />
                    )}
                  </div>
                ))}
              </div>

              <Button 
                onClick={handleAnalyze} 
                disabled={loading}
                className="w-full bg-[#FFD600] hover:bg-yellow-400 text-black font-black uppercase tracking-widest h-14 rounded-xl mt-8 transition-all shadow-[0_0_20px_rgba(255,214,0,0.15)] hover:shadow-[0_0_30px_rgba(255,214,0,0.3)]"
              >
                {loading ? "Synthesizing..." : "Generate Elite Protocol"}
              </Button>
            </div>
          </div>

          {/* Results Area */}
          <div className="lg:col-span-8">
            {!result && !loading && (
              <div className="h-full min-h-[500px] border border-dashed border-zinc-800 rounded-2xl flex flex-col items-center justify-center text-zinc-500 p-10 text-center bg-[#111111]/30">
                <Activity className="w-16 h-16 text-zinc-800 mb-6" />
                <h3 className="text-2xl font-bold text-zinc-400 mb-2 uppercase tracking-wide">System Standby</h3>
                <p className="max-w-md">Input your parameters to generate a highly detailed, 12-week predictive fitness and nutrition protocol.</p>
              </div>
            )}
            
            {loading && (
              <div className="h-full min-h-[500px] border border-zinc-900 rounded-2xl flex flex-col items-center justify-center bg-[#111111]/50 shadow-2xl">
                <div className="relative w-24 h-24 mb-8">
                  <div className="absolute inset-0 border-4 border-zinc-800 rounded-full"></div>
                  <div className="absolute inset-0 border-4 border-t-[#FFD600] rounded-full animate-spin"></div>
                  <Activity className="absolute inset-0 m-auto w-8 h-8 text-[#FFD600] animate-pulse" />
                </div>
                <p className="text-xl font-bold text-[#FFD600] animate-pulse uppercase tracking-widest">Running Neural Engines...</p>
                <p className="text-zinc-500 mt-2">Synthesizing 10,000+ data points</p>
              </div>
            )}

            {result && !loading && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
                
                {/* Expert Trainer Badge */}
                <div className="bg-gradient-to-r from-[#FFD600]/10 to-transparent border border-[#FFD600]/20 p-4 rounded-xl flex items-center justify-between">
                  <div>
                    <h4 className="text-xs text-[#FFD600] font-bold uppercase tracking-widest mb-1">Assigned Expert</h4>
                    <p className="text-white font-bold text-lg">{result.expertTrainer}</p>
                  </div>
                  <ShieldCheck className="w-8 h-8 text-[#FFD600] opacity-80" />
                </div>

                {/* Elite Score Grid (6 Metrics) */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                  {Object.entries(result.scores).map(([key, value]) => (
                     <div key={key} className="bg-[#111111] border border-zinc-900 p-4 rounded-xl flex flex-col items-center justify-center relative overflow-hidden group">
                       <h3 className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest mb-2 z-10">{key}</h3>
                       <div className="text-2xl font-black text-white z-10">{value as number}</div>
                       <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-[#FFD600] to-yellow-600 transition-all" style={{ width: `${value}%` }} />
                     </div>
                  ))}
                </div>

                {/* Navigation Tabs */}
                <div className="flex items-center gap-2 border-b border-zinc-900 pb-px overflow-x-auto no-scrollbar">
                   {TABS.map(tab => {
                     const Icon = tab.icon;
                     return (
                       <button
                         key={tab.id}
                         onClick={() => setActiveTab(tab.id)}
                         className={`flex items-center gap-2 px-5 py-4 text-sm font-bold uppercase tracking-wider transition-colors relative whitespace-nowrap ${
                           activeTab === tab.id ? "text-[#FFD600]" : "text-zinc-500 hover:text-zinc-300"
                         }`}
                       >
                         <Icon className="w-4 h-4" />
                         {tab.label}
                         {activeTab === tab.id && (
                           <motion.div layoutId="activeTabElite" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FFD600] shadow-[0_0_10px_rgba(255,214,0,0.5)]" />
                         )}
                       </button>
                     );
                   })}
                </div>

                {/* Tab Content */}
                <AnimatePresence mode="wait">
                  
                  {activeTab === "overview" && (
                    <motion.div key="overview" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
                      <div className="bg-[#111111] border border-zinc-900 p-8 rounded-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-[#FFD600]/5 rounded-full blur-3xl -mr-20 -mt-20" />
                        <h3 className="text-2xl font-black mb-4 flex items-center gap-3 uppercase tracking-wide">
                           <Target className="text-[#FFD600] w-8 h-8" /> Executive Summary
                        </h3>
                        <p className="text-zinc-300 text-lg leading-relaxed mb-8">{result.message}</p>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          {[
                            { label: "BMI", val: result.healthAnalysis.bmi },
                            { label: "BMR (kcal)", val: result.healthAnalysis.bmr },
                            { label: "TDEE (kcal)", val: result.healthAnalysis.tdee, highlight: true },
                            { label: "Body Fat %", val: result.healthAnalysis.bodyFat },
                            { label: "Lean Mass (kg)", val: result.healthAnalysis.leanBodyMass },
                            { label: "Metabolic Age", val: result.healthAnalysis.metabolicAge },
                            { label: "Sleep Quality", val: result.healthAnalysis.sleepQuality },
                            { label: "Hydration", val: result.healthAnalysis.hydrationLevel },
                          ].map((item, idx) => (
                            <div key={idx} className="bg-[#0A0A0A] p-4 rounded-xl border border-zinc-900">
                               <div className="text-[10px] text-zinc-500 uppercase tracking-widest mb-1">{item.label}</div>
                               <div className={`text-xl font-bold ${item.highlight ? 'text-[#FFD600]' : 'text-white'}`}>{item.val}</div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-[#111111] border border-zinc-900 p-6 rounded-2xl">
                          <h4 className="font-bold text-[#FFD600] mb-6 text-sm uppercase tracking-wider flex items-center gap-2">
                            <Target className="w-4 h-4" /> 30/60/90 Day Roadmap
                          </h4>
                          <div className="space-y-4">
                            {result.roadmap.map((t: any, i: number) => (
                              <div key={i} className="flex items-start gap-4">
                                <div className="mt-1 flex flex-col items-center">
                                  <div className="w-3 h-3 bg-[#FFD600] rounded-full shadow-[0_0_10px_rgba(255,214,0,0.5)]" />
                                  {i !== result.roadmap.length - 1 && <div className="w-px h-12 bg-zinc-800 my-1" />}
                                </div>
                                <div>
                                  <div className="font-bold text-white text-sm">{t.milestone}</div>
                                  <div className="text-zinc-400 text-xs mt-1 leading-relaxed">{t.focus}</div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-6">
                          <div className="bg-red-950/10 border border-red-900/30 p-6 rounded-2xl">
                            <h3 className="text-red-500 font-bold mb-4 flex items-center gap-2 uppercase tracking-widest text-sm">
                              <AlertTriangle className="w-4 h-4" /> Safety Protocols
                            </h3>
                            <div>
                              <ul className="space-y-2">
                                {result.safety.rules.map((rule: string, i: number) => (
                                  <li key={i} className="text-zinc-400 text-sm flex items-start gap-2">
                                    <span className="text-red-500 mt-1">•</span> {rule}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>

                          <div className="bg-blue-950/10 border border-blue-900/30 p-6 rounded-2xl">
                            <h3 className="text-blue-500 font-bold mb-4 flex items-center gap-2 uppercase tracking-widest text-sm">
                              <HeartPulse className="w-4 h-4" /> Special Conditions
                            </h3>
                            <p className="text-zinc-300 text-sm leading-relaxed">{result.specialConditions.note}</p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === "workout" && (
                    <motion.div key="workout" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
                      <div className="bg-[#111111] border border-zinc-900 p-6 rounded-2xl">
                        <div className="flex justify-between items-center mb-6">
                           <h3 className="text-xl font-bold flex items-center gap-2 uppercase tracking-wide">
                             <Dumbbell className="text-[#FFD600] w-6 h-6" /> Microcycle Protocol
                           </h3>
                           <div className="text-xs text-zinc-400 uppercase tracking-widest bg-zinc-900 px-3 py-1 rounded">
                             Focus: {result.workoutFocusAreas.join(", ")}
                           </div>
                        </div>
                        
                        <div className="space-y-4">
                          {result.workoutPlan.map((day: any, i: number) => (
                            <div key={i} className="bg-[#0A0A0A] border border-zinc-800 rounded-xl overflow-hidden group hover:border-zinc-700 transition-colors">
                               <div className="bg-zinc-900/50 px-6 py-4 flex items-center justify-between border-b border-zinc-800">
                                 <div className="flex items-center gap-3">
                                   <div className="bg-[#FFD600] text-black text-xs font-bold px-2 py-1 rounded uppercase tracking-widest">{day.day}</div>
                                   <div className="font-bold text-white uppercase tracking-wide">{day.type}</div>
                                 </div>
                               </div>
                               <div className="p-6">
                                 {day.exercises.length > 0 && day.exercises[0].name !== "Rest" ? (
                                   <div className="overflow-x-auto">
                                     <table className="w-full text-left border-collapse">
                                       <thead>
                                         <tr className="text-zinc-500 text-[10px] uppercase tracking-widest border-b border-zinc-800">
                                            <th className="pb-3 font-medium">Exercise</th>
                                            <th className="pb-3 font-medium">Sets</th>
                                            <th className="pb-3 font-medium">Reps</th>
                                            <th className="pb-3 font-medium">Tempo</th>
                                            <th className="pb-3 font-medium">Rest</th>
                                         </tr>
                                       </thead>
                                       <tbody className="text-sm">
                                         {day.exercises.map((ex: any, j: number) => (
                                           <tr key={j} className="border-b border-zinc-900/50 last:border-0">
                                             <td className="py-3 font-bold text-zinc-200">{ex.name}</td>
                                             <td className="py-3 text-[#FFD600] font-bold">{ex.sets}</td>
                                             <td className="py-3 text-white">{ex.reps}</td>
                                             <td className="py-3 text-zinc-400">{ex.tempo}</td>
                                             <td className="py-3 text-zinc-400">{ex.rest}</td>
                                           </tr>
                                         ))}
                                       </tbody>
                                     </table>
                                   </div>
                                 ) : (
                                   <div className="text-center text-zinc-600 py-4 font-bold uppercase tracking-widest">
                                     Complete CNS Recovery
                                   </div>
                                 )}
                               </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === "diet" && (
                    <motion.div key="diet" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
                      <div className="bg-[#111111] border border-zinc-900 p-8 rounded-2xl text-center shadow-2xl">
                         <h4 className="text-zinc-500 font-bold uppercase tracking-widest text-sm mb-8">Daily Nutritional Targets</h4>
                         <div className="flex flex-wrap justify-center gap-8 md:gap-24">
                            <div>
                               <div className="text-xs text-zinc-400 uppercase font-bold tracking-widest mb-2">Total Calories</div>
                               <div className="text-4xl font-black text-[#FFD600]">{result.dietPlan.macros.totalCalories}</div>
                            </div>
                            <div className="w-px h-16 bg-zinc-800 hidden md:block" />
                            <div>
                               <div className="text-3xl font-black text-white mb-1">{result.dietPlan.macros.protein}<span className="text-lg text-zinc-500">g</span></div>
                               <div className="text-xs text-[#FFD600] uppercase font-bold tracking-widest">Protein ({result.dietPlan.breakdown.proteinPct}%)</div>
                            </div>
                            <div>
                               <div className="text-3xl font-black text-white mb-1">{result.dietPlan.macros.carbs}<span className="text-lg text-zinc-500">g</span></div>
                               <div className="text-xs text-blue-500 uppercase font-bold tracking-widest">Carbs ({result.dietPlan.breakdown.carbsPct}%)</div>
                            </div>
                            <div>
                               <div className="text-3xl font-black text-white mb-1">{result.dietPlan.macros.fat}<span className="text-lg text-zinc-500">g</span></div>
                               <div className="text-xs text-green-500 uppercase font-bold tracking-widest">Fats ({result.dietPlan.breakdown.fatPct}%)</div>
                            </div>
                         </div>
                      </div>

                      <div className="bg-[#111111] border border-zinc-900 p-6 rounded-2xl">
                        <h3 className="text-xl font-bold mb-6 flex items-center gap-2 uppercase tracking-wide">
                          <Utensils className="text-[#FFD600] w-6 h-6" /> 8-Meal Protocol (Indian Context)
                        </h3>
                        <div className="grid gap-3">
                          {result.dietPlan.meals.map((m: any, i: number) => (
                            <div key={i} className="flex items-center gap-6 bg-[#0A0A0A] p-4 rounded-xl border border-zinc-800 hover:border-[#FFD600]/30 transition-colors">
                              <div className="text-[#FFD600] font-black text-lg min-w-[60px]">{m.time}</div>
                              <div className="w-px h-8 bg-zinc-800" />
                              <div className="text-zinc-200 font-medium text-sm md:text-base leading-relaxed">{m.meal}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === "analytics" && (
                    <motion.div key="analytics" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
                      <div className="bg-[#111111] border border-zinc-900 p-6 rounded-2xl h-96">
                        <h3 className="text-sm font-bold text-zinc-400 mb-6 uppercase tracking-wider">12-Week Weight & Body Fat Trajectory</h3>
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={result.predictions} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                            <defs>
                              <linearGradient id="colorWeight" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#FFD600" stopOpacity={0.3}/>
                                <stop offset="95%" stopColor="#FFD600" stopOpacity={0}/>
                              </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#27272A" vertical={false} />
                            <XAxis dataKey="week" stroke="#71717A" fontSize={12} tickLine={false} axisLine={false} />
                            <YAxis yAxisId="left" stroke="#71717A" fontSize={12} tickLine={false} axisLine={false} domain={['dataMin - 2', 'dataMax + 2']} />
                            <YAxis yAxisId="right" orientation="right" stroke="#71717A" fontSize={12} tickLine={false} axisLine={false} domain={['dataMin - 1', 'dataMax + 1']} />
                            <Tooltip 
                              contentStyle={{ backgroundColor: '#0A0A0A', border: '1px solid #27272A', borderRadius: '8px', color: '#fff' }}
                              itemStyle={{ color: '#FFD600' }}
                            />
                            <Area yAxisId="left" type="monotone" dataKey="weight" stroke="#FFD600" strokeWidth={3} fillOpacity={1} fill="url(#colorWeight)" name="Weight (kg)" />
                            <Line yAxisId="right" type="monotone" dataKey="bodyFat" stroke="#3B82F6" strokeWidth={2} dot={false} name="Body Fat %" />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === "coach" && (
                    <motion.div key="coach" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
                      <div className="bg-[#111111] border border-zinc-900 p-8 rounded-2xl relative">
                        <div className="absolute top-6 right-6">
                           <ShieldCheck className="w-12 h-12 text-zinc-800" />
                        </div>
                        <h3 className="text-xl font-bold mb-2 text-[#FFD600] uppercase tracking-wide">Expert Coach Directives</h3>
                        <p className="text-zinc-500 text-sm mb-8 uppercase tracking-widest">Authored by: {result.expertTrainer}</p>
                        
                        <div className="space-y-6 mb-8">
                          {result.coachRecommendations.map((rec: string, i: number) => (
                            <div key={i} className="flex gap-4 items-start">
                              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-zinc-900 border border-zinc-700 flex items-center justify-center text-[#FFD600] font-black text-xs">
                                0{i+1}
                              </div>
                              <p className="text-zinc-300 leading-relaxed pt-1">{rec}</p>
                            </div>
                          ))}
                        </div>

                        <div className="grid md:grid-cols-2 gap-6 mt-8 pt-8 border-t border-zinc-900">
                           <div>
                             <h4 className="text-zinc-400 font-bold text-xs uppercase tracking-widest mb-3">Trainer Notes</h4>
                             <p className="text-zinc-300 text-sm leading-relaxed">{result.trainerNotes}</p>
                           </div>
                           <div>
                             <h4 className="text-zinc-400 font-bold text-xs uppercase tracking-widest mb-3">Recovery Plan</h4>
                             <ul className="space-y-2">
                               {result.recoveryRecommendations.map((rec: string, i: number) => (
                                 <li key={i} className="text-zinc-300 text-sm flex items-start gap-2">
                                   <span className="text-[#FFD600]">•</span> {rec}
                                 </li>
                               ))}
                             </ul>
                           </div>
                        </div>

                        <div className="mt-6 p-4 bg-zinc-900/50 rounded-xl border border-zinc-800">
                          <h4 className="text-zinc-500 font-bold text-[10px] uppercase tracking-widest mb-1">Professional Guidance Notice</h4>
                          <p className="text-zinc-400 text-xs">{result.professionalGuidance}</p>
                        </div>
                      </div>
                    </motion.div>
                  )}

                </AnimatePresence>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
