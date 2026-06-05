"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Dumbbell, Clock, Flame, Calendar, CheckCircle2, Play, Sparkles, X, Target, Activity, ChevronRight } from "lucide-react";
import gsap from "gsap";

const MOCK_GENERATED_PLAN = {
  title: "Elite Hypertrophy Protocol",
  type: "Muscle Building",
  difficulty: "Advanced",
  daysPerWeek: 5,
  progress: 0,
  isActive: true,
  schedule: [
    { day: "Monday", focus: "Chest & Triceps (Heavy)", duration: "75 min", completed: false },
    { day: "Tuesday", focus: "Back & Biceps (Volume)", duration: "65 min", completed: false },
    { day: "Wednesday", focus: "Active Recovery", duration: "30 min", completed: false },
    { day: "Thursday", focus: "Legs (Quad Focus)", duration: "80 min", completed: false },
    { day: "Friday", focus: "Shoulders & Arms", duration: "60 min", completed: false },
  ]
};

export default function WorkoutsPage() {
  const [activePlan, setActivePlan] = useState<string | null>("plan-1");
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

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    
    // Simulate cinematic loading steps
    const steps = [
      "Analyzing user biometrics...",
      "Calculating optimal volume and intensity...",
      "Structuring periodization phases...",
      "Finalizing Elite Protocol..."
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
            Elite <span className="text-[#FFD600]">Training</span>
          </h1>
          <p className="text-zinc-400 mt-2 text-lg">Precision-engineered workout protocols.</p>
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
                    <h2 className="text-2xl font-black uppercase tracking-wider text-[#FFD600]">Configure AI Protocol</h2>
                    <button onClick={() => setShowForm(false)} className="text-zinc-500 hover:text-white transition-colors">
                      <X className="w-6 h-6" />
                    </button>
                  </div>
                  <form onSubmit={handleGenerate} className="p-8 space-y-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-zinc-400 uppercase tracking-wider">Primary Goal</label>
                      <select className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:border-[#FFD600] focus:ring-1 focus:ring-[#FFD600] outline-none transition-all appearance-none">
                        <option>Hypertrophy (Muscle Gain)</option>
                        <option>Strength & Power</option>
                        <option>Fat Loss & Conditioning</option>
                        <option>Athletic Performance</option>
                      </select>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-zinc-400 uppercase tracking-wider">Experience Level</label>
                        <select className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:border-[#FFD600] focus:ring-1 focus:ring-[#FFD600] outline-none transition-all appearance-none">
                          <option>Intermediate</option>
                          <option>Advanced</option>
                          <option>Elite</option>
                          <option>Beginner</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-zinc-400 uppercase tracking-wider">Days Per Week</label>
                        <select className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:border-[#FFD600] focus:ring-1 focus:ring-[#FFD600] outline-none transition-all appearance-none">
                          <option>5 Days</option>
                          <option>4 Days</option>
                          <option>6 Days</option>
                          <option>3 Days</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-zinc-400 uppercase tracking-wider">Target Weaknesses (Optional)</label>
                      <input 
                        type="text" 
                        placeholder="e.g., Upper Chest, Calves, Rear Delts" 
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:border-[#FFD600] focus:ring-1 focus:ring-[#FFD600] outline-none transition-all"
                      />
                    </div>

                    <button type="submit" className="w-full py-4 bg-[#FFD600] text-black font-black uppercase tracking-widest text-lg hover:bg-white transition-colors rounded-xl mt-4">
                      Initialize AI Synthesis
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
                  <h3 className="text-2xl font-black uppercase tracking-wider text-[#FFD600] mb-4">Synthesizing Protocol</h3>
                  <div className="h-8 overflow-hidden relative w-full max-w-sm">
                    <AnimatePresence mode="wait">
                      <motion.p
                        key={loadingStep}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="text-zinc-400 font-mono text-sm absolute inset-0 w-full text-center"
                      >
                        {["Analyzing user biometrics...", "Calculating optimal volume and intensity...", "Structuring periodization phases...", "Finalizing Elite Protocol..."][loadingStep]}
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
            className="space-y-8"
          >
            <div className="bg-[#111] border border-[#FFD600]/20 rounded-3xl p-8 md:p-12 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#FFD600]/5 rounded-full blur-[100px] -mr-40 -mt-40 pointer-events-none" />
              
              <div className="relative z-10">
                <span className="inline-block px-4 py-1.5 bg-[#FFD600]/10 text-[#FFD600] text-sm font-black uppercase tracking-widest rounded-full border border-[#FFD600]/20 mb-6">
                  Active Protocol
                </span>
                <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight mb-2">{MOCK_GENERATED_PLAN.title}</h2>
                <p className="text-xl text-zinc-400 mb-8">{MOCK_GENERATED_PLAN.type} • {MOCK_GENERATED_PLAN.difficulty} • {MOCK_GENERATED_PLAN.daysPerWeek} Days/Wk</p>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                  {[
                    { label: "Volume", value: "High", icon: Activity },
                    { label: "Intensity", value: "RIR 1-2", icon: Flame },
                    { label: "Focus", value: "Hypertrophy", icon: Target },
                    { label: "Duration", value: "8 Weeks", icon: Calendar },
                  ].map((stat, i) => (
                    <div key={i} className="bg-black/50 border border-zinc-800 rounded-2xl p-4 flex flex-col justify-center backdrop-blur-md">
                      <stat.icon className="w-6 h-6 text-[#FFD600] mb-2" />
                      <span className="text-sm text-zinc-500 font-bold uppercase">{stat.label}</span>
                      <span className="text-lg font-black">{stat.value}</span>
                    </div>
                  ))}
                </div>

                <div className="space-y-4">
                  <h3 className="text-2xl font-black uppercase tracking-wider border-b border-zinc-800 pb-4 mb-6">Microcycle Schedule</h3>
                  {MOCK_GENERATED_PLAN.schedule.map((day, idx) => (
                    <motion.div 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      key={idx} 
                      className="group/item flex flex-col sm:flex-row justify-between items-start sm:items-center p-5 bg-black/40 border border-zinc-800 rounded-2xl hover:border-[#FFD600]/50 hover:bg-black/60 transition-all cursor-pointer"
                    >
                      <div className="flex items-center gap-5">
                        <div className="w-14 h-14 bg-zinc-900 border border-zinc-800 rounded-xl flex items-center justify-center font-black text-xl text-zinc-500 group-hover/item:text-[#FFD600] group-hover/item:border-[#FFD600]/30 transition-colors">
                          {idx + 1}
                        </div>
                        <div>
                          <p className="text-[#FFD600] font-bold text-sm tracking-widest uppercase mb-1">{day.day}</p>
                          <h4 className="text-xl font-black">{day.focus}</h4>
                        </div>
                      </div>
                      
                      <div className="mt-4 sm:mt-0 flex items-center gap-6">
                        <span className="text-zinc-500 font-mono flex items-center gap-2"><Clock className="w-4 h-4" /> {day.duration}</span>
                        <button className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center text-white group-hover/item:bg-[#FFD600] group-hover/item:text-black transition-colors">
                          <Play className="w-5 h-5 ml-1" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Safety & Recovery Widgets */}
                <div className="mt-12">
                  <div className="flex items-center gap-3 mb-6 border-b border-zinc-800 pb-4">
                    <Activity className="w-8 h-8 text-[#FFD600]" />
                    <h3 className="text-2xl font-black uppercase tracking-wider text-[#FFD600]">Safety & Recovery Protocol</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {[
                      { title: "Warm-up Guidance", desc: "Dynamic mobility routines to prime the CNS and prevent strains.", icon: Flame },
                      { title: "Cool-down Routines", desc: "Static stretching to enhance flexibility and clear lactic acid.", icon: Clock },
                      { title: "Recovery Reminders", desc: "Hydration and sleep optimization alerts tailored to your volume.", icon: CheckCircle2 },
                      { title: "Posture/Form", desc: "Real-time biomechanical cues for every prescribed movement.", icon: Target },
                      { title: "Injury Prevention", desc: "Pre-hab exercises addressing common weak points and imbalances.", icon: Activity },
                    ].map((feature, idx) => (
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 + idx * 0.1 }}
                        key={idx} 
                        className="bg-[#0A0A0A] border border-zinc-800 rounded-2xl p-5 hover:border-[#FFD600]/40 transition-all hover:shadow-[0_0_20px_rgba(255,214,0,0.1)] group/safety"
                      >
                        <feature.icon className="w-6 h-6 text-zinc-500 group-hover/safety:text-[#FFD600] mb-3 transition-colors" />
                        <h4 className="text-lg font-black uppercase tracking-wide mb-2">{feature.title}</h4>
                        <p className="text-sm text-zinc-400 font-medium leading-relaxed">{feature.desc}</p>
                      </motion.div>
                    ))}
                  </div>
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
              <Dumbbell className="w-10 h-10 text-zinc-600" />
            </div>
            <h3 className="text-2xl font-black uppercase text-zinc-500 mb-2">No Active Protocol</h3>
            <p className="text-zinc-600 max-w-md text-center">Generate a new AI-powered training block to see your highly optimized schedule here.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
