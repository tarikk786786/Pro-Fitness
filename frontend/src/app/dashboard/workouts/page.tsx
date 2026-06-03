"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Dumbbell, Clock, Flame, Calendar, CheckCircle2, Play } from "lucide-react";

export default function WorkoutsPage() {
  const [activePlan, setActivePlan] = useState<string | null>("plan-1");

  const mockPlans = [
    {
      id: "plan-1",
      title: "Advanced Hypertrophy",
      type: "Muscle Building",
      difficulty: "Advanced",
      daysPerWeek: 5,
      progress: 45,
      isActive: true,
    },
    {
      id: "plan-2",
      title: "Fat Shredder 90",
      type: "Fat Loss",
      difficulty: "Intermediate",
      daysPerWeek: 4,
      progress: 100,
      isActive: false,
    }
  ];

  const mockSchedule = [
    { day: "Monday", focus: "Chest & Triceps", duration: "60 min", completed: true },
    { day: "Tuesday", focus: "Back & Biceps", duration: "65 min", completed: false },
    { day: "Wednesday", focus: "Active Recovery", duration: "30 min", completed: false },
    { day: "Thursday", focus: "Legs & Core", duration: "75 min", completed: false },
    { day: "Friday", focus: "Shoulders & Arms", duration: "55 min", completed: false },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">My Workouts</h1>
          <p className="text-gray-400 mt-1">Manage and track your training programs.</p>
        </div>
        <button className="px-6 py-3 bg-[#FF0033] text-white font-bold rounded-xl hover:bg-white hover:text-black transition-colors shadow-[0_0_15px_rgba(255,0,51,0.3)] hover:shadow-[0_0_20px_rgba(255,255,255,0.5)] flex items-center gap-2">
          <Dumbbell className="w-5 h-5" /> Generate AI Workout
        </button>
      </div>

      {/* Plan Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockPlans.map((plan) => (
          <motion.div 
            key={plan.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`p-6 rounded-2xl border transition-all cursor-pointer ${
              plan.isActive 
                ? "bg-white/5 border-[#FF0033] shadow-[0_0_20px_rgba(255,0,51,0.15)]" 
                : "bg-black/50 border-white/5 hover:border-white/20"
            }`}
            onClick={() => setActivePlan(plan.id)}
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                {plan.isActive && <span className="inline-block px-3 py-1 bg-[#FF0033]/20 text-[#FF0033] text-xs font-bold rounded-full mb-3">ACTIVE PLAN</span>}
                <h3 className="text-xl font-bold">{plan.title}</h3>
                <p className="text-gray-400 text-sm">{plan.type}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <Flame className="w-4 h-4 text-[#FF0033]" /> {plan.difficulty}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <Calendar className="w-4 h-4 text-[#00D4FF]" /> {plan.daysPerWeek} Days/Wk
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Progress</span>
                <span className="font-bold">{plan.progress}%</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-[#FF0033] to-[#00D4FF] h-2 rounded-full transition-all"
                  style={{ width: `${plan.progress}%` }}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Schedule Detail */}
      {activePlan && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8"
        >
          <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-6">
            <h2 className="text-2xl font-bold">This Week's Schedule</h2>
            <button className="text-sm font-medium text-[#FF0033] hover:text-white transition-colors">View Full Plan</button>
          </div>

          <div className="space-y-4">
            {mockSchedule.map((day, idx) => (
              <div 
                key={idx} 
                className={`flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border transition-colors ${
                  day.completed ? "bg-green-500/10 border-green-500/30" : "bg-black/50 border-white/5 hover:border-white/20"
                }`}
              >
                <div className="flex items-center gap-4 mb-4 sm:mb-0">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold ${
                    day.completed ? "bg-green-500/20 text-green-500" : "bg-white/5 text-white"
                  }`}>
                    {day.completed ? <CheckCircle2 className="w-6 h-6" /> : day.day.substring(0, 3)}
                  </div>
                  <div>
                    <h4 className="font-bold">{day.focus}</h4>
                    <p className="text-sm text-gray-400">{day.day} • {day.duration}</p>
                  </div>
                </div>
                
                {!day.completed && (
                  <button className="flex items-center justify-center gap-2 px-5 py-2.5 bg-white/10 hover:bg-[#FF0033] text-white rounded-lg transition-all font-medium text-sm">
                    <Play className="w-4 h-4" /> Start Session
                  </button>
                )}
                {day.completed && (
                  <span className="text-green-500 font-medium text-sm px-4">Completed</span>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
