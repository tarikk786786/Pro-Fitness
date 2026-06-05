"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Activity, Stethoscope, Dumbbell, Utensils, ArrowRight, Sparkles, Cpu, ShieldCheck } from "lucide-react";
import { Input } from "@/components/ui/input";
import { TOOLS_CONFIG } from "@/lib/ai-tools-config";
import gsap from "gsap";

const CATEGORIES = [
  { id: "all", name: "All Modules", icon: Cpu },
  { id: "fitness", name: "Biometrics", icon: Activity },
  { id: "health", name: "Health Analytics", icon: Stethoscope },
  { id: "workout", name: "Training", icon: Dumbbell },
  { id: "diet", name: "Nutrition", icon: Utensils },
  { id: "safety", name: "Safety & Form", icon: ShieldCheck },
];

const SAFETY_TOOLS = [
  {
    id: "warmup-ai",
    name: "Dynamic Warm-up AI",
    description: "Generates biomechanically sound warm-up protocols based on your target muscle groups to prevent strains.",
    category: "safety",
    path: "#",
    isNew: true
  },
  {
    id: "cooldown-ai",
    name: "Cool-down Architect",
    description: "Prescribes tailored static stretching and mobility flows to accelerate lactic acid clearance and flexibility.",
    category: "safety",
    path: "#",
    isNew: true
  },
  {
    id: "recovery-ai",
    name: "Recovery Dashboard",
    description: "Tracks CNS fatigue and prescribes automated reminders for sleep optimization, hydration, and active recovery.",
    category: "safety",
    path: "#",
    isNew: true
  },
  {
    id: "form-ai",
    name: "Posture & Form Check",
    description: "Advanced AI analysis of your lifting mechanics to ensure optimal posture and force production.",
    category: "safety",
    path: "#",
    isNew: true
  },
  {
    id: "injury-ai",
    name: "Injury Pre-hab",
    description: "Identifies structural imbalances and prescribes targeted corrective exercises to bulletproof your joints.",
    category: "safety",
    path: "#",
    isNew: true
  }
];

export default function AIToolsHub() {
  const [activeTab, setActiveTab] = useState("all");
  const [search, setSearch] = useState("");
  
  const headerRef = useRef(null);
  
  useEffect(() => {
    gsap.fromTo(headerRef.current, 
      { opacity: 0, y: 50 }, 
      { opacity: 1, y: 0, duration: 1.2, ease: "power4.out" }
    );
  }, []);

  const allTools = [...TOOLS_CONFIG, ...SAFETY_TOOLS];

  const filteredTools = allTools.filter(
    (tool) => 
      (activeTab === "all" || tool.category === activeTab) && 
      tool.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white py-20 px-6 overflow-hidden relative">
      {/* Background accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#FFD600]/5 blur-[120px] pointer-events-none rounded-full" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div ref={headerRef} className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#FFD600]/10 border border-[#FFD600]/20 rounded-full mb-8">
            <Sparkles className="w-4 h-4 text-[#FFD600]" />
            <span className="text-[#FFD600] text-sm font-bold tracking-widest uppercase">Proprietary Tech</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-6 uppercase tracking-tighter leading-none">
            Intelligence <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFD600] to-[#FFE666]">Ecosystem</span>
          </h1>
          <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto font-medium">
            Access our elite suite of AI-driven calculators, analyzers, and protocol generators to engineer your ultimate physique.
          </p>
        </div>

        {/* Search & Filter */}
        <div className="bg-[#111] border border-zinc-800 rounded-3xl p-4 md:p-6 mb-16 shadow-2xl backdrop-blur-xl flex flex-col xl:flex-row gap-6 items-center justify-between sticky top-4 z-20">
          <div className="flex overflow-x-auto pb-2 xl:pb-0 w-full xl:w-auto gap-3 hide-scrollbar">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`flex items-center whitespace-nowrap px-6 py-4 rounded-2xl text-sm font-black uppercase tracking-wider transition-all duration-300 ${
                  activeTab === cat.id 
                    ? "bg-[#FFD600] text-black shadow-[0_0_15px_rgba(255,214,0,0.4)]" 
                    : "bg-black border border-zinc-800 text-zinc-400 hover:border-zinc-600 hover:text-white"
                }`}
              >
                <cat.icon className={`w-5 h-5 mr-3 ${activeTab === cat.id ? "text-black" : "text-zinc-500"}`} />
                {cat.name}
              </button>
            ))}
          </div>

          <div className="relative w-full xl:w-[400px]">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-500 w-5 h-5" />
            <input 
              placeholder="Search modules..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-14 pr-6 py-4 bg-black border border-zinc-800 focus:border-[#FFD600] text-white rounded-2xl outline-none transition-colors font-medium placeholder:text-zinc-600"
            />
          </div>
        </div>

        {/* Tools Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredTools.map((tool, i) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                key={tool.id}
              >
                <Link href={tool.path}>
                  <div className="group relative bg-[#111] border border-zinc-800 hover:border-[#FFD600]/50 rounded-3xl p-8 transition-all duration-500 hover:bg-black hover:shadow-[0_0_30px_rgba(255,214,0,0.1)] h-full flex flex-col justify-between overflow-hidden">
                    {/* Decorative glow */}
                    <div className="absolute top-0 right-0 w-48 h-48 bg-[#FFD600]/5 rounded-bl-[100%] -mr-10 -mt-10 transition-transform group-hover:scale-150 group-hover:bg-[#FFD600]/10 duration-700 ease-out" />
                    
                    <div className="relative z-10">
                      <div className="flex justify-between items-start mb-6">
                        <div className="p-4 bg-black border border-zinc-800 rounded-2xl group-hover:bg-[#FFD600] group-hover:border-[#FFD600] group-hover:text-black transition-all duration-300">
                          {tool.category === "health" ? <Stethoscope className="w-6 h-6" /> : 
                           tool.category === "fitness" ? <Activity className="w-6 h-6" /> :
                           tool.category === "safety" ? <ShieldCheck className="w-6 h-6" /> :
                           tool.category === "workout" ? <Dumbbell className="w-6 h-6" /> : <Utensils className="w-6 h-6" />}
                        </div>
                        {tool.isNew && (
                          <span className="bg-[#FFD600]/10 text-[#FFD600] text-xs font-black tracking-widest uppercase px-3 py-1.5 rounded-full border border-[#FFD600]/20">
                            New
                          </span>
                        )}
                      </div>
                      <h3 className="text-2xl font-black uppercase tracking-tight mb-3 group-hover:text-[#FFD600] transition-colors">{tool.name}</h3>
                      <p className="text-zinc-500 text-base mb-8 leading-relaxed font-medium">{tool.description}</p>
                    </div>

                    <div className="relative z-10 flex items-center text-zinc-400 font-bold text-sm tracking-widest uppercase group-hover:text-[#FFD600] transition-colors mt-auto">
                      Initialize Module 
                      <ArrowRight className="w-5 h-5 ml-2 opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-300" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredTools.length === 0 && (
          <div className="text-center py-20 text-zinc-500 font-medium">
            No modules found matching your criteria.
          </div>
        )}
      </div>
    </div>
  );
}
