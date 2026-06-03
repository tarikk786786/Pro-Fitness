"use client";

import { motion } from "framer-motion";
import { Flame, Droplets, Trophy, Activity, Dumbbell, Apple, ArrowRight, Brain } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid } from "recharts";
import Link from "next/link";

const weeklyData = [
  { name: 'Mon', calories: 400 },
  { name: 'Tue', calories: 300 },
  { name: 'Wed', calories: 550 },
  { name: 'Thu', calories: 200 },
  { name: 'Fri', calories: 600 },
  { name: 'Sat', calories: 0 },
  { name: 'Sun', calories: 450 },
];

const weightData = [
  { date: 'Week 1', weight: 82 },
  { date: 'Week 2', weight: 81.2 },
  { date: 'Week 3', weight: 80.5 },
  { date: 'Week 4', weight: 79.8 },
];

export default function DashboardOverview() {
  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      {/* Welcome */}
      <div className="flex justify-between items-end">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-black mb-1">Welcome back, John! 🔥</h1>
          <p className="text-gray-400">Here's your fitness summary for today.</p>
        </motion.div>
        
        <Link href="/dashboard/workouts" className="hidden sm:flex items-center gap-2 bg-[#FF0033] px-5 py-2.5 rounded-full font-bold hover:bg-white hover:text-black transition-colors text-sm">
          Start Workout <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {[
          { icon: Flame, label: "Calories Burned", value: "2,450", unit: "kcal", color: "text-[#FF0033]", bg: "bg-[#FF0033]/10" },
          { icon: Dumbbell, label: "Workouts", value: "4", unit: "/ week", color: "text-[#00D4FF]", bg: "bg-[#00D4FF]/10" },
          { icon: Trophy, label: "Current Streak", value: "12", unit: "days", color: "text-[#FFB800]", bg: "bg-[#FFB800]/10" },
          { icon: Droplets, label: "Water Intake", value: "2.5", unit: "/ 3.5L", color: "text-blue-500", bg: "bg-blue-500/10" },
        ].map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white/5 border border-white/10 rounded-[24px] p-6 flex flex-col justify-between"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.bg}`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <span className="text-gray-400 font-medium text-sm">{stat.label}</span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-black">{stat.value}</span>
              <span className="text-gray-500 text-sm font-medium">{stat.unit}</span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Charts Section */}
        <div className="lg:col-span-2 space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white/5 border border-white/10 rounded-[32px] p-6 sm:p-8"
          >
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Activity className="w-5 h-5 text-[#00D4FF]" /> Activity Overview
            </h3>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyData}>
                  <XAxis dataKey="name" stroke="#888" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#888" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip cursor={{ fill: '#ffffff0a' }} contentStyle={{ backgroundColor: '#000', border: '1px solid #333', borderRadius: '12px' }} />
                  <Bar dataKey="calories" fill="#00D4FF" radius={[4, 4, 0, 0]} barSize={30} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white/5 border border-white/10 rounded-[32px] p-6 sm:p-8"
          >
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Trophy className="w-5 h-5 text-[#FFB800]" /> Weight Progress
            </h3>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={weightData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
                  <XAxis dataKey="date" stroke="#888" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#888" fontSize={12} tickLine={false} axisLine={false} domain={['dataMin - 2', 'dataMax + 2']} />
                  <Tooltip contentStyle={{ backgroundColor: '#000', border: '1px solid #333', borderRadius: '12px' }} />
                  <Line type="monotone" dataKey="weight" stroke="#FF0033" strokeWidth={3} dot={{ fill: '#FF0033', r: 4 }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>

        {/* Right Sidebar Area */}
        <div className="space-y-6">
          {/* Today's Workout */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-gradient-to-br from-[#FF0033]/20 to-black border border-[#FF0033]/30 rounded-[32px] p-6"
          >
            <div className="bg-[#FF0033] text-xs font-bold px-3 py-1 rounded-full inline-block mb-4">TODAY</div>
            <h3 className="text-2xl font-black mb-2">Upper Body Power</h3>
            <p className="text-gray-400 text-sm mb-6">45 mins • 6 exercises • 400 kcal</p>
            
            <div className="space-y-3 mb-6">
              {['Bench Press', 'Incline Dumbbell Press', 'Lat Pulldowns'].map((ex, i) => (
                <div key={i} className="flex justify-between items-center text-sm border-b border-white/10 pb-2">
                  <span>{ex}</span>
                  <span className="text-gray-400">4x10</span>
                </div>
              ))}
            </div>
            
            <button className="w-full py-3 bg-white text-black font-bold rounded-xl hover:bg-[#00D4FF] transition-colors">
              Start Session
            </button>
          </motion.div>

          {/* AI Recommendation */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white/5 border border-white/10 rounded-[32px] p-6"
          >
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Brain className="w-5 h-5 text-purple-500" /> AI Coach Insight
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              "Your sleep was optimal last night. I've adjusted your macros to +200 calories today to support the heavy upper body session. Hit it hard!"
            </p>
            <Link href="/dashboard/ai-coach" className="text-[#00D4FF] text-sm font-bold flex items-center gap-1 hover:text-white transition-colors">
              Chat with AI <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
