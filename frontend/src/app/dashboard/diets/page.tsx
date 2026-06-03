"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Apple, Utensils, Droplets, Flame, Edit2 } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend } from "recharts";

export default function DietsPage() {
  const [activeDay, setActiveDay] = useState("Today");

  const macroData = [
    { name: "Protein", value: 180, color: "#FF0033" },
    { name: "Carbs", value: 220, color: "#00D4FF" },
    { name: "Fats", value: 75, color: "#FFA500" },
  ];

  const meals = [
    {
      time: "8:00 AM",
      name: "Breakfast",
      items: ["4 Scrambled Eggs", "2 Slices Whole Wheat Toast", "1/2 Avocado"],
      macros: { p: 32, c: 35, f: 22, cals: 466 }
    },
    {
      time: "1:00 PM",
      name: "Lunch",
      items: ["200g Grilled Chicken Breast", "150g Quinoa", "Steamed Broccoli"],
      macros: { p: 62, c: 45, f: 8, cals: 490 }
    },
    {
      time: "4:30 PM",
      name: "Pre-Workout Snack",
      items: ["1 Scoop Whey Protein", "1 Medium Banana"],
      macros: { p: 25, c: 27, f: 2, cals: 226 }
    },
    {
      time: "8:00 PM",
      name: "Dinner",
      items: ["200g Baked Salmon", "150g Sweet Potato", "Asparagus"],
      macros: { p: 45, c: 30, f: 26, cals: 534 }
    }
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">My Diet Plan</h1>
          <p className="text-gray-400 mt-1">Track your nutrition and meal plans.</p>
        </div>
        <button className="px-6 py-3 bg-[#00D4FF] text-black font-bold rounded-xl hover:bg-white transition-colors shadow-[0_0_15px_rgba(0,212,255,0.3)] hover:shadow-[0_0_20px_rgba(255,255,255,0.5)] flex items-center gap-2">
          <Apple className="w-5 h-5" /> Generate AI Diet
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Daily Plan */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Utensils className="w-5 h-5 text-[#00D4FF]" /> Meals for {activeDay}
              </h2>
              <button className="text-gray-400 hover:text-white"><Edit2 className="w-5 h-5" /></button>
            </div>

            <div className="space-y-4">
              {meals.map((meal, idx) => (
                <motion.div 
                  initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.1 }}
                  key={idx} 
                  className="p-5 bg-black/50 border border-white/5 rounded-xl hover:border-[#00D4FF]/50 transition-colors"
                >
                  <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-4">
                    <div>
                      <span className="text-[#00D4FF] text-sm font-bold">{meal.time}</span>
                      <h3 className="text-lg font-bold">{meal.name}</h3>
                    </div>
                    <div className="flex items-center gap-4 text-sm font-mono bg-white/5 px-4 py-2 rounded-lg">
                      <span className="text-[#FF0033]">{meal.macros.p}g P</span>
                      <span className="text-[#00D4FF]">{meal.macros.c}g C</span>
                      <span className="text-[#FFA500]">{meal.macros.f}g F</span>
                      <span className="text-white font-bold ml-2">{meal.macros.cals} kcal</span>
                    </div>
                  </div>
                  
                  <ul className="space-y-2">
                    {meal.items.map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-gray-300 text-sm before:content-['•'] before:text-[#00D4FF]">
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Stats & Macros */}
        <div className="space-y-6">
          {/* Macro Chart */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col items-center">
            <h3 className="text-lg font-bold mb-4 self-start">Daily Target</h3>
            
            <div className="relative w-full h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={macroData}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={90}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                  >
                    {macroData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <RechartsTooltip 
                    contentStyle={{ backgroundColor: '#0A0A0A', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Legend verticalAlign="bottom" height={36} />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none mt-[-36px]">
                <span className="text-2xl font-black">1,716</span>
                <span className="text-xs text-gray-400">kcal</span>
              </div>
            </div>
          </div>

          {/* Water Tracker */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Droplets className="w-5 h-5 text-[#00D4FF]" /> Water Intake
            </h3>
            <div className="flex justify-between items-end mb-2">
              <span className="text-3xl font-bold">2.5<span className="text-lg text-gray-400">/4 L</span></span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-3 mb-4">
              <div className="bg-[#00D4FF] h-3 rounded-full transition-all" style={{ width: '62.5%' }} />
            </div>
            <div className="flex gap-2 justify-between">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((cup) => (
                <div key={cup} className={`w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer transition-colors ${cup <= 5 ? 'bg-[#00D4FF]/20 text-[#00D4FF]' : 'bg-white/5 text-gray-500 hover:bg-white/10'}`}>
                  <Droplets className="w-4 h-4" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
