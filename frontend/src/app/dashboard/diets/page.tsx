"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Apple, Utensils, Droplets, Flame, Edit2, Sparkles, X, Activity, Target } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend } from "recharts";
import gsap from "gsap";

const MOCK_MEALS = [
  {
    time: "08:00",
    name: "Anabolic Breakfast",
    items: ["200g Egg Whites", "2 Whole Eggs", "100g Cream of Rice", "Almond Butter"],
    macros: { p: 45, c: 50, f: 18, cals: 542 }
  },
  {
    time: "13:00",
    name: "Performance Lunch",
    items: ["250g Chicken Breast", "200g Jasmine Rice", "100g Asparagus", "Olive Oil"],
    macros: { p: 55, c: 60, f: 12, cals: 568 }
  },
  {
    time: "16:30",
    name: "Pre-Training Matrix",
    items: ["50g Whey Isolate", "60g Dextrose", "1 Banana"],
    macros: { p: 45, c: 80, f: 2, cals: 518 }
  },
  {
    time: "20:00",
    name: "Recovery Dinner",
    items: ["200g Lean Steak", "250g Sweet Potato", "Mixed Greens"],
    macros: { p: 48, c: 55, f: 22, cals: 610 }
  }
];

export default function DietsPage() {
  const [showForm, setShowForm] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [hasGenerated, setHasGenerated] = useState(false);

  const headerRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(headerRef.current, 
      { opacity: 0, y: 30 }, 
      { opacity: 1, y: 0, duration: 1, ease: "power4.out" }
    );
  }, []);

  const macroData = [
    { name: "Protein", value: 193, color: "#FFD600" },
    { name: "Carbs", value: 245, color: "#333333" },
    { name: "Fats", value: 54, color: "#666666" },
  ];

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    
    const steps = [
      "Calculating Basal Metabolic Rate...",
      "Optimizing Macronutrient Ratios...",
      "Sourcing High-Quality Ingredients...",
      "Finalizing Nutritional Protocol..."
    ];
    
    let step = 0;
    const interval = setInterval(() => {
      step++;
      if (step >= steps.length) {
        clearInterval(interval);
        setTimeout(() => {
          setIsGenerating(false);
          setShowForm(false);
          setHasGenerated(true);
        }, 1000);
      } else {
        setLoadingStep(step);
      }
    }, 1200);
  };

  return (
    <div className="space-y-10 text-white min-h-screen pb-20">
      {/* Header */}
      <div ref={headerRef} className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">
            Elite <span className="text-[#FFD600]">Nutrition</span>
          </h1>
          <p className="text-zinc-400 mt-2 text-lg">AI-calibrated fueling strategies.</p>
        </div>
        <button 
          onClick={() => setShowForm(true)}
          className="group relative px-8 py-4 bg-[#FFD600] text-black font-black uppercase tracking-wider rounded-none overflow-hidden transition-all hover:scale-105 shadow-[0_0_20px_rgba(255,214,0,0.3)] hover:shadow-[0_0_40px_rgba(255,214,0,0.6)]"
        >
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
          <span className="relative flex items-center gap-2">
            <Sparkles className="w-5 h-5" /> Generate Protocol
          </span>
        </button>
      </div>

      {/* Generation Form Modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl bg-[#0A0A0A] border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl"
            >
              {!isGenerating ? (
                <>
                  <div className="p-8 border-b border-zinc-800 flex justify-between items-center">
                    <h2 className="text-2xl font-black uppercase tracking-wider text-[#FFD600]">Configure Diet Protocol</h2>
                    <button onClick={() => setShowForm(false)} className="text-zinc-500 hover:text-white transition-colors">
                      <X className="w-6 h-6" />
                    </button>
                  </div>
                  <form onSubmit={handleGenerate} className="p-8 space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-zinc-400 uppercase tracking-wider">Goal</label>
                        <select className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:border-[#FFD600] focus:ring-1 focus:ring-[#FFD600] outline-none transition-all appearance-none">
                          <option>Lean Bulk</option>
                          <option>Maintenance</option>
                          <option>Aggressive Cut</option>
                          <option>Body Recomposition</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-zinc-400 uppercase tracking-wider">Diet Type</label>
                        <select className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:border-[#FFD600] focus:ring-1 focus:ring-[#FFD600] outline-none transition-all appearance-none">
                          <option>Standard / Balanced</option>
                          <option>High Protein / Low Carb</option>
                          <option>Ketogenic</option>
                          <option>Plant-Based (Vegan)</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-zinc-400 uppercase tracking-wider">Allergies & Restrictions</label>
                      <input 
                        type="text" 
                        placeholder="e.g., Gluten-free, Peanut allergy" 
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:border-[#FFD600] focus:ring-1 focus:ring-[#FFD600] outline-none transition-all"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-zinc-400 uppercase tracking-wider">Meals Per Day</label>
                      <input 
                        type="range" 
                        min="2" max="6" defaultValue="4"
                        className="w-full accent-[#FFD600]"
                      />
                      <div className="flex justify-between text-zinc-500 text-xs font-mono">
                        <span>2 Meals</span>
                        <span>4 Meals</span>
                        <span>6 Meals</span>
                      </div>
                    </div>

                    <button type="submit" className="w-full py-4 bg-[#FFD600] text-black font-black uppercase tracking-widest text-lg hover:bg-white transition-colors rounded-xl mt-4">
                      Synthesize Plan
                    </button>
                  </form>
                </>
              ) : (
                <div className="p-16 flex flex-col items-center justify-center text-center min-h-[400px]">
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                    className="w-20 h-20 border-4 border-zinc-800 border-t-[#FFD600] rounded-full mb-8"
                  />
                  <h3 className="text-2xl font-black uppercase tracking-wider text-[#FFD600] mb-4">Processing Data</h3>
                  <div className="h-8 overflow-hidden relative w-full max-w-sm">
                    <AnimatePresence mode="wait">
                      <motion.p
                        key={loadingStep}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="text-zinc-400 font-mono text-sm absolute inset-0 w-full text-center"
                      >
                        {["Calculating Basal Metabolic Rate...", "Optimizing Macronutrient Ratios...", "Sourcing High-Quality Ingredients...", "Finalizing Nutritional Protocol..."][loadingStep]}
                      </motion.p>
                    </AnimatePresence>
                  </div>
                  <div className="w-full max-w-sm bg-zinc-900 h-1 mt-8 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-[#FFD600]"
                      initial={{ width: "0%" }}
                      animate={{ width: `${(loadingStep + 1) * 25}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <AnimatePresence mode="wait">
        {hasGenerated ? (
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            {/* Left Column: Daily Plan */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-[#111] border border-zinc-800 rounded-3xl p-8 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#FFD600] to-transparent opacity-50" />
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-2xl font-black uppercase tracking-wider flex items-center gap-3">
                    <Utensils className="w-6 h-6 text-[#FFD600]" /> Today's Rations
                  </h2>
                  <button className="text-zinc-500 hover:text-[#FFD600] transition-colors"><Edit2 className="w-5 h-5" /></button>
                </div>

                <div className="space-y-4">
                  {MOCK_MEALS.map((meal, idx) => (
                    <motion.div 
                      initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.1 }}
                      key={idx} 
                      className="group p-6 bg-black border border-zinc-800 rounded-2xl hover:border-[#FFD600]/30 transition-all duration-300"
                    >
                      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-4">
                        <div>
                          <span className="text-[#FFD600] text-sm font-black font-mono tracking-widest">{meal.time}</span>
                          <h3 className="text-xl font-bold uppercase mt-1">{meal.name}</h3>
                        </div>
                        <div className="flex flex-wrap items-center gap-2 text-sm font-mono bg-zinc-900 px-4 py-2 rounded-xl border border-zinc-800">
                          <span className="text-white"><span className="text-zinc-500">P:</span>{meal.macros.p}g</span>
                          <span className="text-zinc-700">/</span>
                          <span className="text-white"><span className="text-zinc-500">C:</span>{meal.macros.c}g</span>
                          <span className="text-zinc-700">/</span>
                          <span className="text-white"><span className="text-zinc-500">F:</span>{meal.macros.f}g</span>
                          <span className="text-[#FFD600] font-black ml-2 border-l border-zinc-700 pl-4">{meal.macros.cals} KCAL</span>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-2">
                        {meal.items.map((item, i) => (
                          <span key={i} className="px-3 py-1.5 bg-zinc-900 text-zinc-300 text-sm rounded-lg border border-zinc-800/50">
                            {item}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Stats & Macros */}
            <div className="space-y-6">
              {/* Macro Chart */}
              <div className="bg-[#111] border border-zinc-800 rounded-3xl p-8 flex flex-col items-center relative overflow-hidden group hover:border-[#FFD600]/30 transition-colors">
                <h3 className="text-xl font-black uppercase tracking-wider mb-6 self-start w-full border-b border-zinc-800 pb-4 text-[#FFD600]">Macro Profile</h3>
                
                <div className="relative w-full h-[280px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={macroData}
                        cx="50%"
                        cy="50%"
                        innerRadius={80}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                        stroke="none"
                      >
                        {macroData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <RechartsTooltip 
                        contentStyle={{ backgroundColor: '#0A0A0A', border: '1px solid #333', borderRadius: '12px' }}
                        itemStyle={{ color: '#fff', fontWeight: 'bold' }}
                      />
                      <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ paddingTop: "20px" }}/>
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none mt-[-36px]">
                    <span className="text-4xl font-black text-white">2,238</span>
                    <span className="text-sm font-bold tracking-widest text-[#FFD600] uppercase">Kcal</span>
                  </div>
                </div>
              </div>

              {/* Water Tracker */}
              <div className="bg-[#111] border border-zinc-800 rounded-3xl p-8 hover:border-[#FFD600]/30 transition-colors">
                <h3 className="text-xl font-black uppercase tracking-wider mb-6 flex items-center gap-3 text-[#FFD600]">
                  <Droplets className="w-5 h-5" /> Hydration
                </h3>
                <div className="flex justify-between items-end mb-4">
                  <span className="text-5xl font-black">3.0<span className="text-2xl text-zinc-600">/4L</span></span>
                </div>
                <div className="w-full bg-zinc-900 rounded-full h-4 mb-6 p-1">
                  <div className="bg-[#FFD600] h-full rounded-full transition-all" style={{ width: '75%' }} />
                </div>
                <div className="grid grid-cols-4 gap-3">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((cup) => (
                    <div key={cup} className={`aspect-square rounded-xl flex items-center justify-center cursor-pointer transition-all duration-300 ${cup <= 6 ? 'bg-[#FFD600]/20 text-[#FFD600] border border-[#FFD600]/30' : 'bg-zinc-900 text-zinc-600 border border-zinc-800 hover:bg-zinc-800'}`}>
                      <Droplets className={`w-6 h-6 ${cup <= 6 ? 'fill-[#FFD600]' : ''}`} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-32 px-4 border-2 border-dashed border-zinc-800 rounded-3xl"
          >
            <div className="w-24 h-24 bg-zinc-900 rounded-full flex items-center justify-center mb-6">
              <Apple className="w-10 h-10 text-zinc-600" />
            </div>
            <h3 className="text-2xl font-black uppercase text-zinc-500 mb-2">No Nutrition Protocol</h3>
            <p className="text-zinc-600 max-w-md text-center">Generate a new AI-powered diet block to see your optimized macros and meals here.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
