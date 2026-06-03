"use client";

import { motion } from "framer-motion";
import AICoachChat from "@/components/ai/AICoachChat";
import { Brain, Activity, Heart, Apple, Dumbbell } from "lucide-react";

export default function AICoachPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-white tracking-wider flex items-center gap-3">
            <Brain className="w-8 h-8 text-[#00D4FF]" />
            AI <span className="text-[#00D4FF]">COACH</span>
          </h1>
          <p className="text-gray-400 mt-1">Your personal, 24/7 intelligent fitness assistant.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Chat Interface */}
        <div className="lg:col-span-2">
          <AICoachChat />
        </div>

        {/* Right Column: AI Insights & Modules */}
        <div className="space-y-6">
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}
            className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md"
          >
            <h3 className="text-white font-bold mb-4 flex items-center gap-2">
              <Activity className="w-5 h-5 text-[#FF0033]" />
              Active Health Modules
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-black/40 rounded-xl border border-white/5">
                <span className="text-sm text-gray-300">PCOS Management AI</span>
                <span className="text-[10px] uppercase font-bold bg-[#FF0033]/20 text-[#FF0033] px-2 py-1 rounded-full">Active</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-black/40 rounded-xl border border-white/5 opacity-50 grayscale">
                <span className="text-sm text-gray-300">Thyroid Fitness AI</span>
                <span className="text-[10px] uppercase font-bold bg-white/10 text-gray-400 px-2 py-1 rounded-full">Inactive</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-black/40 rounded-xl border border-white/5 opacity-50 grayscale">
                <span className="text-sm text-gray-300">Diabetes Care AI</span>
                <span className="text-[10px] uppercase font-bold bg-white/10 text-gray-400 px-2 py-1 rounded-full">Inactive</span>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
            className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md"
          >
            <h3 className="text-white font-bold mb-4 flex items-center gap-2">
              <Brain className="w-5 h-5 text-[#00D4FF]" />
              Try Asking
            </h3>
            <div className="flex flex-col gap-2">
              <button className="text-left p-3 rounded-xl bg-black/40 border border-white/5 hover:border-[#00D4FF]/50 hover:bg-white/5 transition-colors text-sm text-gray-300 flex items-center gap-3">
                <Apple className="w-4 h-4 text-green-400" />
                "Generate a PCOS-friendly diet for today"
              </button>
              <button className="text-left p-3 rounded-xl bg-black/40 border border-white/5 hover:border-[#00D4FF]/50 hover:bg-white/5 transition-colors text-sm text-gray-300 flex items-center gap-3">
                <Dumbbell className="w-4 h-4 text-blue-400" />
                "What's my Push Day workout?"
              </button>
              <button className="text-left p-3 rounded-xl bg-black/40 border border-white/5 hover:border-[#00D4FF]/50 hover:bg-white/5 transition-colors text-sm text-gray-300 flex items-center gap-3">
                <Heart className="w-4 h-4 text-red-400" />
                "Analyze my recovery score"
              </button>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
