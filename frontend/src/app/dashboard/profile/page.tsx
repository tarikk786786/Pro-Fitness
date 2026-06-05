"use client";

import { useState, useEffect, useRef } from "react";
import { motion, Variants } from "framer-motion";
import gsap from "gsap";
import { User, Mail, Phone, Ruler, Weight, ShieldCheck, CheckCircle2 } from "lucide-react";

export default function ProfilePage() {
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const headerRef = useRef(null);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSaved(false);
    setTimeout(() => {
      setIsSaving(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }, 1500);
  };

  useEffect(() => {
    if (headerRef.current) {
      gsap.fromTo(headerRef.current, 
        { opacity: 0, y: -30 }, 
        { opacity: 1, y: 0, duration: 1, ease: "power4.out" }
      );
    }
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } }
  };

  return (
    <motion.div 
      className="max-w-5xl mx-auto space-y-8 pb-12"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div ref={headerRef} className="mb-10">
        <h1 className="text-4xl font-black tracking-tight mb-2 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
          Operative Profile
        </h1>
        <p className="text-gray-400 font-medium">Manage your biometric parameters and security clearance.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Avatar & Membership */}
        <div className="space-y-6">
          <motion.div 
            variants={itemVariants}
            className="bg-white/5 backdrop-blur-md border border-white/10 rounded-[32px] p-8 flex flex-col items-center text-center relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#FFD600]/10 rounded-full blur-[40px] pointer-events-none" />
            
            <div className="relative mb-6">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#FFD600] to-yellow-600 flex items-center justify-center text-5xl font-black text-black shadow-[0_0_40px_rgba(255,214,0,0.4)] relative z-10 group-hover:scale-105 transition-transform duration-500">
                JD
              </div>
              <div className="absolute inset-0 border-2 border-[#FFD600] rounded-full animate-ping opacity-20" />
            </div>
            
            <h2 className="text-2xl font-black mb-1 tracking-tight">John Doe</h2>
            <p className="text-gray-400 font-medium text-sm mb-6">Enlisted March 2024</p>
            <div className="bg-[#FFD600]/10 text-[#FFD600] text-xs font-black px-5 py-2 rounded-full border border-[#FFD600]/30 shadow-[0_0_15px_rgba(255,214,0,0.2)]">
              ELITE CLEARANCE
            </div>
          </motion.div>
          
          <motion.div 
            variants={itemVariants}
            className="bg-white/5 backdrop-blur-md border border-white/10 rounded-[32px] p-8"
          >
            <h3 className="text-lg font-black tracking-tight mb-6 flex items-center gap-3">
              <div className="p-2 bg-white/10 rounded-lg"><ShieldCheck className="w-5 h-5 text-white" /></div> Security Protocol
            </h3>
            <button className="w-full text-left px-5 py-4 bg-black/50 hover:bg-white/10 border border-white/5 rounded-2xl text-sm font-bold transition-colors mb-4 text-white">
              Update Cryptography (Password)
            </button>
            <button className="w-full text-left px-5 py-4 bg-black/50 hover:bg-red-500/10 border border-white/5 rounded-2xl text-sm font-bold transition-colors text-red-500 group">
              <span className="group-hover:translate-x-1 inline-block transition-transform">Enable 2FA Protection</span>
            </button>
          </motion.div>
        </div>

        {/* Forms */}
        <div className="lg:col-span-2">
          <motion.form 
            onSubmit={handleSave}
            variants={itemVariants}
            className="bg-white/5 backdrop-blur-md border border-white/10 rounded-[32px] p-6 sm:p-10 space-y-8 relative overflow-hidden"
          >
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-[#FFD600]/5 rounded-full blur-[60px] pointer-events-none" />

            <div>
              <h3 className="text-xl font-black tracking-tight mb-8 flex items-center gap-3">
                 <div className="w-2 h-6 bg-[#FFD600] rounded-full"></div>
                 Identity Parameters
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold tracking-wider text-gray-500 uppercase mb-3">Full Designation</label>
                  <div className="relative group">
                    <User className="w-5 h-5 text-gray-500 absolute left-4 top-3.5 group-focus-within:text-[#FFD600] transition-colors" />
                    <input type="text" defaultValue="John Doe" className="w-full bg-black/60 border border-white/10 rounded-2xl pl-12 pr-4 py-3.5 text-white font-medium focus:outline-none focus:border-[#FFD600] focus:ring-1 focus:ring-[#FFD600] transition-all" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold tracking-wider text-gray-500 uppercase mb-3">Comms Channel</label>
                  <div className="relative">
                    <Mail className="w-5 h-5 text-gray-600 absolute left-4 top-3.5" />
                    <input type="email" defaultValue="john@example.com" disabled className="w-full bg-black/30 border border-white/5 rounded-2xl pl-12 pr-4 py-3.5 text-gray-600 font-medium cursor-not-allowed" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold tracking-wider text-gray-500 uppercase mb-3">Secure Line</label>
                  <div className="relative group">
                    <Phone className="w-5 h-5 text-gray-500 absolute left-4 top-3.5 group-focus-within:text-[#FFD600] transition-colors" />
                    <input type="tel" defaultValue="+91 9876543210" className="w-full bg-black/60 border border-white/10 rounded-2xl pl-12 pr-4 py-3.5 text-white font-medium focus:outline-none focus:border-[#FFD600] focus:ring-1 focus:ring-[#FFD600] transition-all" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold tracking-wider text-gray-500 uppercase mb-3">Biological Age</label>
                  <input type="number" defaultValue={28} className="w-full bg-black/60 border border-white/10 rounded-2xl px-5 py-3.5 text-white font-medium focus:outline-none focus:border-[#FFD600] focus:ring-1 focus:ring-[#FFD600] transition-all" />
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-white/10">
              <h3 className="text-xl font-black tracking-tight mb-8 flex items-center gap-3">
                 <div className="w-2 h-6 bg-[#FFD600] rounded-full"></div>
                 Physiological Metrics
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold tracking-wider text-gray-500 uppercase mb-3">Height (cm)</label>
                  <div className="relative group">
                    <Ruler className="w-5 h-5 text-gray-500 absolute left-4 top-3.5 group-focus-within:text-white transition-colors" />
                    <input type="number" defaultValue={180} className="w-full bg-black/60 border border-white/10 rounded-2xl pl-12 pr-4 py-3.5 text-white font-medium focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold tracking-wider text-gray-500 uppercase mb-3">Mass (kg)</label>
                  <div className="relative group">
                    <Weight className="w-5 h-5 text-gray-500 absolute left-4 top-3.5 group-focus-within:text-white transition-colors" />
                    <input type="number" defaultValue={82} className="w-full bg-black/60 border border-white/10 rounded-2xl pl-12 pr-4 py-3.5 text-white font-medium focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold tracking-wider text-gray-500 uppercase mb-3">Primary Objective</label>
                  <select className="w-full bg-black/60 border border-white/10 rounded-2xl px-5 py-3.5 text-white font-medium focus:outline-none focus:border-[#FFD600] focus:ring-1 focus:ring-[#FFD600] transition-all appearance-none cursor-pointer">
                    <option value="muscle_gain">Hypertrophy (Muscle Gain)</option>
                    <option value="weight_loss">Adipose Reduction (Weight Loss)</option>
                    <option value="endurance">Cardiovascular Endurance</option>
                    <option value="maintenance">Equilibrium (Maintenance)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold tracking-wider text-gray-500 uppercase mb-3">Nutritional Framework</label>
                  <select className="w-full bg-black/60 border border-white/10 rounded-2xl px-5 py-3.5 text-white font-medium focus:outline-none focus:border-[#FFD600] focus:ring-1 focus:ring-[#FFD600] transition-all appearance-none cursor-pointer">
                    <option value="non-vegetarian">Omnivore (Non-Vegetarian)</option>
                    <option value="vegetarian">Herbivore (Vegetarian)</option>
                    <option value="vegan">Plant-Based (Vegan)</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="pt-8 flex items-center justify-between">
              <div className="flex items-center">
                {saved && (
                  <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-2 text-[#FFD600] font-bold text-sm">
                    <CheckCircle2 className="w-5 h-5" />
                    Protocol Updated
                  </motion.div>
                )}
              </div>
              <button 
                type="submit" 
                disabled={isSaving}
                className="px-10 py-4 bg-[#FFD600] text-black font-black rounded-full hover:bg-white transition-all shadow-[0_0_20px_rgba(255,214,0,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] disabled:opacity-50 disabled:hover:bg-[#FFD600] disabled:hover:shadow-[0_0_20px_rgba(255,214,0,0.3)] flex items-center justify-center min-w-[200px]"
              >
                {isSaving ? (
                  <div className="w-6 h-6 border-4 border-black/20 border-t-black rounded-full animate-spin" />
                ) : "Compile & Save"}
              </button>
            </div>
          </motion.form>
        </div>
      </div>
    </motion.div>
  );
}
