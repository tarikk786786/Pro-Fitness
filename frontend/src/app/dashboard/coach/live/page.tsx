'use client';

import { useState } from 'react';
import LiveCamera from '@/components/coach/LiveCamera';
import { motion } from 'framer-motion';
import { Activity, Target, Timer, Flame, ChevronLeft } from 'lucide-react';
import Link from 'next/link';

export default function LiveWorkoutDashboard() {
  const [selectedExercise, setSelectedExercise] = useState<'bicep_curl' | 'squat' | 'pushup'>('squat');
  const [sessionStats, setSessionStats] = useState({ reps: 0, avgScore: 100, calories: 0, duration: 0 });

  const handleRepUpdate = (reps: number, score: number) => {
    setSessionStats(prev => ({
      ...prev,
      reps,
      avgScore: Math.round((prev.avgScore + score) / 2),
      calories: prev.calories + 0.5 // mock calorie burn per rep
    }));
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white p-6 md:p-10 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/dashboard/coach" className="p-2 hover:bg-white/5 rounded-lg transition-colors">
              <ChevronLeft className="w-6 h-6" />
            </Link>
            <div>
              <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tight">Live Camera Training</h1>
              <p className="text-gray-400">Powered by Good-GYM Computer Vision Engine</p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-[#FFD600]/10 text-[#FFD600] px-4 py-2 rounded-full border border-[#FFD600]/20 font-bold tracking-wide text-sm">
            <div className="w-2 h-2 rounded-full bg-[#FFD600] animate-pulse"></div>
            LIVE TRACKING
          </div>
        </div>

        {/* Top Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Current Exercise', value: selectedExercise.replace('_', ' ').toUpperCase(), icon: Target, color: 'text-white' },
            { label: 'Total Reps', value: sessionStats.reps, icon: Activity, color: 'text-[#00D4FF]' },
            { label: 'Calories Burned', value: `${Math.round(sessionStats.calories)} kcal`, icon: Flame, color: 'text-[#FF4444]' },
            { label: 'Avg Form Score', value: `${sessionStats.avgScore}/100`, icon: Timer, color: sessionStats.avgScore >= 90 ? 'text-[#10B981]' : 'text-[#FFD600]' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col"
            >
              <div className="flex items-center gap-3 mb-2 text-gray-400">
                <stat.icon className="w-5 h-5" />
                <span className="text-sm font-medium uppercase tracking-wider">{stat.label}</span>
              </div>
              <span className={`text-2xl font-black tracking-tight ${stat.color}`}>{stat.value}</span>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Camera Feed */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex gap-2">
              {(['squat', 'pushup', 'bicep_curl'] as const).map(ex => (
                <button
                  key={ex}
                  onClick={() => {
                    setSelectedExercise(ex);
                    setSessionStats({ reps: 0, avgScore: 100, calories: 0, duration: 0 }); // reset session on switch
                  }}
                  className={`px-4 py-2 rounded-lg font-bold uppercase tracking-wider text-sm transition-all ${selectedExercise === ex ? 'bg-[#FFD600] text-black shadow-[0_0_15px_rgba(255,214,0,0.3)]' : 'bg-white/5 text-gray-400 hover:bg-white/10 border border-white/10'}`}
                >
                  {ex.replace('_', ' ')}
                </button>
              ))}
            </div>
            
            <LiveCamera exercise={selectedExercise} onRepUpdate={handleRepUpdate} />
          </div>

          {/* Side Panel: Form Analysis & Next Up */}
          <div className="space-y-6">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Activity className="text-[#FFD600] w-5 h-5" />
                Form Analysis
              </h3>
              <ul className="space-y-4 text-sm text-gray-300">
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#10B981] mt-1.5"></div>
                  <p>Maintain a straight back and tight core during the movement.</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#10B981] mt-1.5"></div>
                  <p>Control the eccentric (lowering) phase for maximum muscle activation.</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#FFD600] mt-1.5"></div>
                  <p>Ensure full range of motion to register a valid repetition.</p>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-[#FFD600]/10 to-transparent border border-[#FFD600]/20 rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-2">Trainer's Note</h3>
              <p className="text-gray-400 text-sm mb-4">"Keep your breathing steady. Exhale on the exertion, inhale on the way down. You got this!"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#FFD600] flex items-center justify-center text-black font-black">
                  BD
                </div>
                <div>
                  <p className="font-bold text-white text-sm">Biswajit Das</p>
                  <p className="text-xs text-[#FFD600]">Fat Loss Expert</p>
                </div>
              </div>
            </div>

            <button className="w-full bg-white/5 hover:bg-[#FF4444] hover:text-white border border-white/10 transition-colors py-4 rounded-xl font-bold uppercase tracking-wider text-sm text-gray-300">
              End Workout & Save Report
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}
