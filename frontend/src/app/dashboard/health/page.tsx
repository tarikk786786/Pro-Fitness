"use client";

import React, { useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { Activity, Flame, Heart, Moon, Zap, Target, Dumbbell, RefreshCcw, Brain, TrendingUp, CheckCircle2 } from 'lucide-react';
import dynamic from 'next/dynamic';

const HealthCharts = dynamic(() => import('@/components/health/HealthCharts'), { ssr: false, loading: () => <div className="w-full h-96 animate-pulse bg-white/5 rounded-xl"></div> });

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 300, damping: 24 } }
};

const kpis = [
  { title: "Daily Steps", value: "12,450", icon: Activity, color: "text-blue-500", bg: "bg-blue-500/10" },
  { title: "Calories Burned", value: "3,200 kcal", icon: Flame, color: "text-orange-500", bg: "bg-orange-500/10" },
  { title: "Sleep Score", value: "92", icon: Moon, color: "text-indigo-500", bg: "bg-indigo-500/10", subtitle: "Optimal" },
  { title: "Recovery Score", value: "85", icon: Zap, color: "text-[#FFD600]", bg: "bg-[#FFD600]/10", subtitle: "Primed to Train" }
];

const tabs = [
  { id: 'fat-loss', label: 'Fat Loss Intelligence', icon: Target },
  { id: 'muscle', label: 'Muscle Building Intelligence', icon: Dumbbell },
  { id: 'recovery', label: 'Recovery Intelligence', icon: RefreshCcw }
] as const;

export default function HealthIntelligencePage() {
  const [activeTab, setActiveTab] = useState<typeof tabs[number]['id']>('fat-loss');

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white p-6 md:p-10 font-sans">
      <motion.div 
        className="max-w-7xl mx-auto space-y-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-2">PRO FITNESS Health Intelligence</h1>
            <p className="text-white/60 text-lg">AI-driven insights to optimize your elite performance.</p>
          </div>
          
          <div className="flex items-center gap-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 pr-6">
            <div className="relative w-16 h-16 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-white/10"
                  strokeWidth="3"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <motion.path
                  className="text-[#FFD600]"
                  strokeWidth="3"
                  strokeDasharray="88, 100"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  initial={{ strokeDasharray: "0, 100" }}
                  animate={{ strokeDasharray: "88, 100" }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-xl font-bold">88</span>
              </div>
            </div>
            <div>
              <div className="text-sm text-white/60 font-medium">Health Score</div>
              <div className="text-[#FFD600] font-bold text-lg">ELITE</div>
            </div>
          </div>
        </motion.div>

        {/* KPI Grid */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {kpis.map((kpi, idx) => (
            <div key={idx} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors">
              <div className="flex items-center gap-4 mb-4">
                <div className={`p-3 rounded-xl ${kpi.bg}`}>
                  <kpi.icon className={`w-6 h-6 ${kpi.color}`} />
                </div>
                <div className="text-white/60 font-medium">{kpi.title}</div>
              </div>
              <div className="text-3xl font-bold mb-1">{kpi.value}</div>
              {kpi.subtitle && (
                <div className="text-sm text-white/50">{kpi.subtitle}</div>
              )}
            </div>
          ))}
        </motion.div>

        {/* Tabs */}
        <motion.div variants={itemVariants} className="space-y-6">
          <div className="flex overflow-x-auto pb-2 scrollbar-hide gap-2 border-b border-white/10">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-4 font-medium transition-all relative whitespace-nowrap ${
                  activeTab === tab.id ? 'text-[#FFD600]' : 'text-white/60 hover:text-white'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                {tab.label}
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FFD600]"
                  />
                )}
              </button>
            ))}
          </div>

          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-8 min-h-[300px]">
            {activeTab === 'fat-loss' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-3 mb-6">
                  <Flame className="w-8 h-8 text-orange-500" />
                  <h2 className="text-2xl font-bold">Fat Loss Intelligence</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-white/80">Metabolic Status</h3>
                    <p className="text-white/60 leading-relaxed">
                      Your current metabolic rate is operating at 112% of baseline. 
                      You have maintained a caloric deficit of 300-500 kcal for 4 consecutive days.
                    </p>
                    <ul className="space-y-3 mt-4">
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                        <span className="text-white/80">Optimal fat oxidation phase achieved during morning fasted cardio.</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                        <span className="text-white/80">NEAT (Non-Exercise Activity Thermogenesis) is up by 15% this week.</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-black/20 rounded-xl p-6 border border-white/5">
                    <h3 className="text-lg font-medium text-white/80 mb-4">AI Recommendation</h3>
                    <p className="text-white/70">
                      To avoid metabolic adaptation, we recommend a refeed day tomorrow. Increase carbohydrate intake by 40% targeting peri-workout windows to replenish muscle glycogen without spilling over into fat storage.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'muscle' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-3 mb-6">
                  <Dumbbell className="w-8 h-8 text-blue-500" />
                  <h2 className="text-2xl font-bold">Muscle Building Intelligence</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-white/80">Hypertrophy Status</h3>
                    <p className="text-white/60 leading-relaxed">
                      Training volume for Chest and Back has hit the optimal hypertrophy threshold (15-20 sets/week). Progressive overload detected on compound movements.
                    </p>
                    <ul className="space-y-3 mt-4">
                      <li className="flex items-start gap-3">
                        <TrendingUp className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                        <span className="text-white/80">Bench Press estimated 1RM increased by 5lbs.</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                        <span className="text-white/80">Protein synthesis window capitalized effectively across all training days.</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-black/20 rounded-xl p-6 border border-white/5">
                    <h3 className="text-lg font-medium text-white/80 mb-4">AI Recommendation</h3>
                    <p className="text-white/70">
                      Leg training volume is currently suboptimal. Increase quadriceps working sets by 20% in the next mesocycle. Focus on slow eccentrics for maximum mechanical tension.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'recovery' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-3 mb-6">
                  <RefreshCcw className="w-8 h-8 text-emerald-500" />
                  <h2 className="text-2xl font-bold">Recovery Intelligence</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-white/80">System Readiness</h3>
                    <p className="text-white/60 leading-relaxed">
                      Central Nervous System (CNS) recovery is at 95%. HRV (Heart Rate Variability) is trending positively, indicating a strong parasympathetic dominance.
                    </p>
                    <ul className="space-y-3 mt-4">
                      <li className="flex items-start gap-3">
                        <Moon className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                        <span className="text-white/80">Deep sleep duration increased by 22 minutes on average.</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Heart className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                        <span className="text-white/80">Resting heart rate remains stable at an elite 46 bpm.</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-black/20 rounded-xl p-6 border border-white/5">
                    <h3 className="text-lg font-medium text-white/80 mb-4">AI Recommendation</h3>
                    <p className="text-white/70">
                      You are fully primed for a high-intensity session today. Proceed with maximum effort on your planned strength block. Consider adding an evening mobility routine to maintain joint health.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Charts */}
        <motion.div variants={itemVariants}>
          <div className="flex items-center gap-3 mb-6">
            <Brain className="w-6 h-6 text-[#FFD600]" />
            <h2 className="text-2xl font-bold">Biometric Trends</h2>
          </div>
          <HealthCharts />
        </motion.div>

      </motion.div>
    </div>
  );
}
