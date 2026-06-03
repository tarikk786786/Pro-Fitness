"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Search, Activity, Stethoscope, Dumbbell, Utensils, ChevronRight, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { TOOLS_CONFIG } from "@/lib/ai-tools-config";

const CATEGORIES = [
  { id: "all", name: "All Tools", icon: Activity },
  { id: "fitness", name: "Fitness & Metrics", icon: Activity },
  { id: "health", name: "Health Conditions", icon: Stethoscope },
  { id: "workout", name: "Workout & Training", icon: Dumbbell },
  { id: "diet", name: "Diet & Nutrition", icon: Utensils },
];

export default function AIToolsHub() {
  const [activeTab, setActiveTab] = useState("all");
  const [search, setSearch] = useState("");

  const filteredTools = TOOLS_CONFIG.filter(
    (tool) => 
      (activeTab === "all" || tool.category === activeTab) && 
      tool.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-black text-white py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black mb-4 uppercase tracking-tighter"
          >
            AI <span className="text-yellow-500">Tools Ecosystem</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-zinc-400 text-lg max-w-2xl mx-auto"
          >
            Access 40+ advanced AI calculators, analyzers, and planners designed to elevate your fitness journey.
          </motion.p>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col md:flex-row gap-6 mb-12 items-center justify-between">
          <div className="flex overflow-x-auto pb-2 md:pb-0 w-full md:w-auto gap-2 hide-scrollbar">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`flex items-center whitespace-nowrap px-6 py-3 rounded-full text-sm font-semibold transition-all ${
                  activeTab === cat.id 
                    ? "bg-yellow-500 text-black" 
                    : "bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-white"
                }`}
              >
                <cat.icon className="w-4 h-4 mr-2" />
                {cat.name}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 w-5 h-5" />
            <Input 
              placeholder="Search tools..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-12 bg-zinc-900 border-zinc-800 focus:border-yellow-500 text-white rounded-full h-12"
            />
          </div>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.map((tool, i) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              key={tool.id}
            >
              <Link href={tool.path}>
                <div className="group relative bg-zinc-900 border border-zinc-800 hover:border-yellow-500/50 rounded-2xl p-6 transition-all duration-300 hover:bg-zinc-800/50 hover:-translate-y-1 h-full flex flex-col justify-between overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/10 rounded-bl-full -mr-16 -mt-16 transition-transform group-hover:scale-150 duration-500" />
                  
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <div className="p-3 bg-zinc-800 rounded-xl group-hover:bg-yellow-500 group-hover:text-black transition-colors">
                        {tool.category === "health" ? <Stethoscope className="w-6 h-6" /> : 
                         tool.category === "fitness" ? <Activity className="w-6 h-6" /> :
                         tool.category === "workout" ? <Dumbbell className="w-6 h-6" /> : <Utensils className="w-6 h-6" />}
                      </div>
                      {tool.isNew && (
                        <span className="bg-yellow-500/20 text-yellow-500 text-xs font-bold px-3 py-1 rounded-full border border-yellow-500/20">
                          NEW
                        </span>
                      )}
                    </div>
                    <h3 className="text-xl font-bold mb-2">{tool.name}</h3>
                    <p className="text-zinc-400 text-sm mb-6">{tool.description}</p>
                  </div>

                  <div className="flex items-center text-yellow-500 font-semibold text-sm group-hover:gap-2 transition-all">
                    Launch Tool <ArrowRight className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
