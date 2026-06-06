"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Activity, Stethoscope, Dumbbell, Utensils, ArrowRight, ShieldCheck, HeartPulse } from "lucide-react";
import { TOOLS_CONFIG } from "@/lib/ai-tools-config";
import gsap from "gsap";

const CATEGORIES = [
  { id: "all", name: "All Programs", icon: Dumbbell },
  { id: "Fat Loss", name: "Fat Loss", icon: Activity },
  { id: "Muscle Gain", name: "Muscle Gain", icon: HeartPulse },
  { id: "Strength", name: "Strength", icon: Dumbbell },
  { id: "Nutrition", name: "Nutrition", icon: Utensils },
  { id: "Wellness", name: "Wellness", icon: ShieldCheck },
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

  const filteredTools = TOOLS_CONFIG.filter(
    (tool) => 
      (activeTab === "all" || tool.category === activeTab) && 
      tool.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white py-20 px-6 overflow-hidden relative font-poppins">
      
      <div className="max-w-7xl mx-auto relative z-10 mt-10">
        <div ref={headerRef} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#FFD600]/10 border border-[#FFD600]/20 rounded-full mb-6">
            <HeartPulse className="w-4 h-4 text-[#FFD600]" />
            <span className="text-[#FFD600] text-sm font-bold tracking-widest uppercase">Expert Guidance</span>
          </div>
          <h1 className="font-bebas text-6xl md:text-8xl tracking-wider text-white mb-6 leading-none">
            EXPERT <span className="text-[#FFD600]">PROGRAMS</span>
          </h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto font-medium">
            Explore our professional training programs and calculators designed by the elite coaching team at PRO FITNESS.
          </p>
        </div>

        {/* Search & Filter */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-4 md:p-6 mb-16 flex flex-col xl:flex-row gap-6 items-center justify-between sticky top-20 z-20 backdrop-blur-xl">
          <div className="flex overflow-x-auto pb-2 xl:pb-0 w-full xl:w-auto gap-3 hide-scrollbar">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`flex items-center whitespace-nowrap px-6 py-4 rounded-2xl text-sm font-bold uppercase tracking-widest transition-all duration-300 ${
                  activeTab === cat.id 
                    ? "bg-[#FFD600] text-black" 
                    : "bg-black border border-zinc-800 text-gray-400 hover:border-zinc-600 hover:text-white"
                }`}
              >
                <cat.icon className={`w-5 h-5 mr-3 ${activeTab === cat.id ? "text-black" : "text-gray-500"}`} />
                {cat.name}
              </button>
            ))}
          </div>

          <div className="relative w-full xl:w-[400px]">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
            <input 
              placeholder="Search programs..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-14 pr-6 py-4 bg-black border border-zinc-800 focus:border-[#FFD600] text-white rounded-2xl outline-none transition-colors font-medium placeholder:text-gray-600"
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
                  <div className="group relative bg-white/5 border border-white/10 hover:border-[#FFD600]/50 rounded-3xl p-8 transition-all duration-500 hover:bg-white/10 hover:shadow-[0_0_30px_rgba(255,214,0,0.15)] h-full flex flex-col justify-between overflow-hidden">
                    
                    <div className="relative z-10">
                      <div className="flex justify-between items-start mb-6">
                        <div className="p-4 bg-black border border-white/10 rounded-2xl group-hover:bg-[#FFD600] group-hover:border-[#FFD600] group-hover:text-black transition-all duration-300">
                           <Dumbbell className="w-6 h-6" />
                        </div>
                        {tool.isNew && (
                          <span className="bg-[#FFD600]/20 text-[#FFD600] text-xs font-bold tracking-widest uppercase px-3 py-1.5 rounded-full border border-[#FFD600]/30">
                            Featured
                          </span>
                        )}
                      </div>
                      <h3 className="text-2xl font-bebas tracking-wide mb-3 group-hover:text-[#FFD600] transition-colors">{tool.name}</h3>
                      <p className="text-gray-400 text-sm mb-4 leading-relaxed">{tool.description}</p>
                      {tool.expertName && (
                        <p className="text-xs text-gray-500 font-medium mb-8">By {tool.expertName}</p>
                      )}
                    </div>

                    <div className="relative z-10 flex items-center text-gray-400 font-bold text-sm tracking-widest uppercase group-hover:text-[#FFD600] transition-colors mt-auto">
                      View Program
                      <ArrowRight className="w-5 h-5 ml-2 opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-300" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredTools.length === 0 && (
          <div className="text-center py-20 text-gray-500 font-medium">
            No programs found matching your search.
          </div>
        )}
      </div>
    </div>
  );
}
