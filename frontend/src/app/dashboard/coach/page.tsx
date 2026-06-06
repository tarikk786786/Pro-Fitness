'use client';

import React, { useState } from 'react';
import { motion, Variants, AnimatePresence } from 'framer-motion';
import { 
  Camera, Dumbbell, Flame, Calendar, Apple, 
  Trophy, Award, PhoneCall, User, PlayCircle, Zap, Target
} from 'lucide-react';
import Link from 'next/link';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { staggerChildren: 0.1 } 
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { type: 'spring' as const, stiffness: 100, damping: 15 } 
  }
};

const tabVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { type: 'spring' as const } },
  exit: { opacity: 0, x: 20, transition: { duration: 0.2 } }
};

export default function SmartCoachDashboard() {
  const [activeTab, setActiveTab] = useState<'fatloss' | 'muscle' | 'personal'>('fatloss');

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white p-6 md:p-10 pb-24 lg:pb-10 font-sans">
      <motion.div 
        className="max-w-7xl mx-auto space-y-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
              PRO FITNESS <span className="text-[#FFD600]">Smart Coach</span>
            </h1>
            <p className="text-gray-400 mt-2 text-lg">AI-Powered Training & Nutrition at your fingertips.</p>
          </div>
          
          <Link href="/dashboard/coach/live" className="group">
            <button className="relative overflow-hidden rounded-full bg-[#FFD600] text-black px-8 py-4 font-bold text-lg flex items-center gap-3 transition-transform hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,214,0,0.3)] hover:shadow-[0_0_30px_rgba(255,214,0,0.5)]">
              <Camera className="w-6 h-6 group-hover:animate-pulse" />
              <span>Start Live Camera Workout</span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out rounded-full" />
            </button>
          </Link>
        </motion.div>

        {/* Top Widgets: Gamification & Stats */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 flex items-center gap-5 hover:border-white/20 transition-colors">
            <div className="bg-[#FFD600]/20 p-4 rounded-full text-[#FFD600]">
              <Flame className="w-8 h-8" />
            </div>
            <div>
              <p className="text-gray-400 text-sm font-medium uppercase tracking-wider">Current Streak</p>
              <h3 className="text-3xl font-bold">14 Days</h3>
            </div>
          </div>
          
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 flex items-center gap-5 hover:border-white/20 transition-colors">
            <div className="bg-[#FFD600]/20 p-4 rounded-full text-[#FFD600]">
              <Trophy className="w-8 h-8" />
            </div>
            <div>
              <p className="text-gray-400 text-sm font-medium uppercase tracking-wider">Total Workouts</p>
              <h3 className="text-3xl font-bold">128</h3>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 flex flex-col justify-center hover:border-white/20 transition-colors">
            <div className="flex items-center justify-between mb-2">
              <p className="text-gray-400 text-sm font-medium uppercase tracking-wider">Next Badge</p>
              <Award className="w-5 h-5 text-[#FFD600]" />
            </div>
            <div className="w-full bg-white/10 rounded-full h-2 mb-2 overflow-hidden">
              <div className="bg-[#FFD600] h-full rounded-full w-[75%]" />
            </div>
            <p className="text-xs text-gray-400 text-right">Titanium Tier (75%)</p>
          </div>
        </motion.div>

        {/* Workout Generators */}
        <motion.div variants={itemVariants} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl shadow-black/50">
          <div className="flex flex-col sm:flex-row border-b border-white/10">
            <button 
              onClick={() => setActiveTab('fatloss')}
              className={`flex-1 py-4 px-6 text-center font-bold transition-colors ${activeTab === 'fatloss' ? 'bg-[#FFD600] text-black' : 'hover:bg-white/5 text-gray-300'}`}
            >
              Fat Loss Generator
            </button>
            <button 
              onClick={() => setActiveTab('muscle')}
              className={`flex-1 py-4 px-6 text-center font-bold transition-colors border-t sm:border-t-0 sm:border-l border-white/10 ${activeTab === 'muscle' ? 'bg-[#FFD600] text-black' : 'hover:bg-white/5 text-gray-300'}`}
            >
              Muscle Building
            </button>
            <button 
              onClick={() => setActiveTab('personal')}
              className={`flex-1 py-4 px-6 text-center font-bold transition-colors border-t sm:border-t-0 sm:border-l border-white/10 ${activeTab === 'personal' ? 'bg-[#FFD600] text-black' : 'hover:bg-white/5 text-gray-300'}`}
            >
              Personalized Plan
            </button>
          </div>
          
          <div className="p-6 md:p-10 min-h-[350px]">
            <AnimatePresence mode="wait">
              {activeTab === 'fatloss' && (
                <motion.div key="fatloss" variants={tabVariants} initial="hidden" animate="visible" exit="exit" className="flex flex-col md:flex-row gap-8 items-center">
                  <div className="flex-1 space-y-4">
                    <div className="inline-block bg-white/10 px-3 py-1 rounded-full text-xs font-semibold text-[#FFD600] tracking-widest uppercase mb-2">High Intensity</div>
                    <h2 className="text-3xl font-bold">Fat Loss Protocol</h2>
                    <p className="text-gray-400 leading-relaxed text-lg">Shred body fat while maintaining lean muscle. This dynamic HIIT & circuit training blend is designed to maximize caloric burn post-workout.</p>
                    <div className="flex items-center gap-3 mt-4 text-sm text-gray-300 bg-white/5 p-3 rounded-xl w-fit">
                      <User className="w-5 h-5 text-[#FFD600]" />
                      <span>Guided by <strong className="text-white">Trainer Biswajit Das</strong></span>
                    </div>
                    <button className="mt-6 bg-white text-black px-6 py-3 rounded-xl font-bold hover:bg-gray-200 transition flex items-center gap-2">
                      <PlayCircle className="w-5 h-5" /> Generate Routine
                    </button>
                  </div>
                  <div className="w-full md:w-1/3 aspect-square bg-gradient-to-br from-[#FFD600]/20 to-transparent rounded-2xl border border-[#FFD600]/30 flex items-center justify-center relative overflow-hidden group">
                    <Flame className="w-32 h-32 text-[#FFD600]/50 group-hover:scale-110 transition-transform duration-500" />
                  </div>
                </motion.div>
              )}
              
              {activeTab === 'muscle' && (
                <motion.div key="muscle" variants={tabVariants} initial="hidden" animate="visible" exit="exit" className="flex flex-col md:flex-row gap-8 items-center">
                  <div className="flex-1 space-y-4">
                    <div className="inline-block bg-white/10 px-3 py-1 rounded-full text-xs font-semibold text-[#FFD600] tracking-widest uppercase mb-2">Hypertrophy</div>
                    <h2 className="text-3xl font-bold">Muscle Building Block</h2>
                    <p className="text-gray-400 leading-relaxed text-lg">Progressive overload designed for maximum hypertrophy. Focus on compound movements and time under tension.</p>
                    <div className="flex items-center gap-3 mt-4 text-sm text-gray-300 bg-white/5 p-3 rounded-xl w-fit">
                      <User className="w-5 h-5 text-[#FFD600]" />
                      <span>Guided by <strong className="text-white">Coach Satyajit Nayak</strong></span>
                    </div>
                    <button className="mt-6 bg-white text-black px-6 py-3 rounded-xl font-bold hover:bg-gray-200 transition flex items-center gap-2">
                      <Dumbbell className="w-5 h-5" /> Generate Routine
                    </button>
                  </div>
                  <div className="w-full md:w-1/3 aspect-square bg-gradient-to-bl from-zinc-800 to-transparent rounded-2xl border border-white/10 flex items-center justify-center relative overflow-hidden group">
                    <Dumbbell className="w-32 h-32 text-gray-600 group-hover:scale-110 transition-transform duration-500" />
                  </div>
                </motion.div>
              )}

              {activeTab === 'personal' && (
                <motion.div key="personal" variants={tabVariants} initial="hidden" animate="visible" exit="exit" className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold mb-2">AI Custom Generator</h2>
                    <p className="text-gray-400">Fill in your details to let our AI build the perfect custom workout.</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm text-gray-400 font-medium">Age</label>
                      <input type="number" placeholder="e.g. 25" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#FFD600] transition" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm text-gray-400 font-medium">Weight (kg)</label>
                      <input type="number" placeholder="e.g. 75" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#FFD600] transition" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm text-gray-400 font-medium">Goal</label>
                      <select className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#FFD600] transition appearance-none">
                        <option>General Fitness</option>
                        <option>Endurance</option>
                        <option>Strength</option>
                        <option>Flexibility</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm text-gray-400 font-medium">Available Equipment</label>
                      <select className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#FFD600] transition appearance-none">
                        <option>Full Gym</option>
                        <option>Dumbbells Only</option>
                        <option>Bodyweight</option>
                        <option>Resistance Bands</option>
                      </select>
                    </div>
                  </div>
                  <button className="w-full bg-[#FFD600] text-black font-bold py-4 rounded-xl hover:bg-[#e6c200] transition flex justify-center items-center gap-2 mt-4">
                    <Zap className="w-5 h-5" /> Generate My AI Plan
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Weekly Timetable */}
          <motion.div variants={itemVariants} className="space-y-6">
            <div className="flex items-center gap-3">
              <Calendar className="w-6 h-6 text-[#FFD600]" />
              <h2 className="text-2xl font-bold">Weekly Timetable</h2>
            </div>
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden flex flex-col">
              {[
                { day: 'Monday', focus: 'Chest & Triceps', color: 'bg-blue-500' },
                { day: 'Tuesday', focus: 'Back & Biceps', color: 'bg-green-500' },
                { day: 'Wednesday', focus: 'Active Recovery', color: 'bg-gray-500' },
                { day: 'Thursday', focus: 'Legs & Core', color: 'bg-[#FFD600]' },
                { day: 'Friday', focus: 'Shoulders & Abs', color: 'bg-purple-500' },
                { day: 'Saturday', focus: 'Full Body HIIT', color: 'bg-red-500' },
                { day: 'Sunday', focus: 'Rest', color: 'bg-zinc-700' },
              ].map((schedule, idx) => (
                <div key={idx} className="flex items-center gap-4 p-4 border-b border-white/5 last:border-0 hover:bg-white/10 transition-colors cursor-pointer group">
                  <div className="w-24 text-sm font-bold text-gray-400 group-hover:text-white transition-colors">{schedule.day}</div>
                  <div className={`w-2 h-2 rounded-full ${schedule.color}`} />
                  <div className="flex-1 font-medium">{schedule.focus}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Nutrition Plan */}
          <motion.div variants={itemVariants} className="space-y-6">
            <div className="flex items-center gap-3">
              <Apple className="w-6 h-6 text-[#FFD600]" />
              <h2 className="text-2xl font-bold">Nutrition Plan</h2>
            </div>
            <div className="grid gap-4">
              {[
                { meal: 'Breakfast', time: '08:00 AM', food: 'Oats with whey protein, berries, and almonds.' },
                { meal: 'Lunch', time: '01:00 PM', food: 'Grilled chicken breast, quinoa, and steamed broccoli.' },
                { meal: 'Pre-Workout', time: '04:30 PM', food: 'Banana and a shot of espresso.' },
                { meal: 'Post-Workout', time: '06:30 PM', food: 'Protein shake and rice cakes.' },
                { meal: 'Dinner', time: '08:30 PM', food: 'Baked salmon, sweet potato, and asparagus.' },
              ].map((item, idx) => (
                <div key={idx} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center gap-4 hover:bg-white/10 transition-colors cursor-pointer">
                  <div className="sm:w-32">
                    <p className="font-bold text-[#FFD600]">{item.meal}</p>
                    <p className="text-xs text-gray-400">{item.time}</p>
                  </div>
                  <div className="h-px w-full sm:w-px sm:h-10 bg-white/10 hidden sm:block" />
                  <p className="flex-1 text-sm text-gray-300">{item.food}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Expert Guidance */}
        <motion.div variants={itemVariants} className="space-y-6 pt-6 border-t border-white/10">
          <div className="flex items-center gap-3">
            <Target className="w-6 h-6 text-[#FFD600]" />
            <h2 className="text-2xl font-bold">Expert Guidance</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { name: 'Subham Behera', role: 'Head Coach & Nutritionist' },
              { name: 'Rajesh Mohanty', role: 'Strength Specialist' },
              { name: 'Chinmay Rout', role: 'Mobility & Recovery' },
            ].map((coach, idx) => (
              <div key={idx} className="bg-black/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6 flex flex-col items-center text-center hover:border-[#FFD600]/50 transition-colors group cursor-pointer">
                <div className="w-20 h-20 bg-white/5 rounded-full mb-4 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <User className="w-10 h-10 text-gray-400 group-hover:text-[#FFD600] transition-colors" />
                </div>
                <h3 className="font-bold text-lg">{coach.name}</h3>
                <p className="text-sm text-gray-400 mb-4">{coach.role}</p>
                <button className="w-full py-2 rounded-lg border border-white/20 text-sm font-medium hover:bg-white hover:text-black transition-colors flex items-center justify-center gap-2">
                  <PhoneCall className="w-4 h-4" /> Contact
                </button>
              </div>
            ))}
          </div>
        </motion.div>

      </motion.div>
    </div>
  );
}
