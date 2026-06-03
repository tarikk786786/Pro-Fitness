"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { User, Mail, Phone, Ruler, Weight, ShieldCheck } from "lucide-react";

export default function ProfilePage() {
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => setIsSaving(false), 1500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-black mb-1">My Profile</h1>
        <p className="text-gray-400">Manage your personal information and fitness goals.</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Avatar & Membership */}
        <div className="space-y-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }}
            className="bg-white/5 border border-white/10 rounded-[32px] p-6 flex flex-col items-center text-center"
          >
            <div className="w-32 h-32 rounded-full bg-gradient-to-r from-[#FF0033] to-[#00D4FF] mb-4 flex items-center justify-center text-4xl font-black shadow-[0_0_30px_rgba(255,0,51,0.3)]">
              JD
            </div>
            <h2 className="text-xl font-bold mb-1">John Doe</h2>
            <p className="text-gray-400 text-sm mb-4">Joined March 2024</p>
            <div className="bg-[#FF0033]/20 text-[#FF0033] text-xs font-bold px-4 py-1.5 rounded-full border border-[#FF0033]/30">
              PRO MEMBER
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}
            className="bg-white/5 border border-white/10 rounded-[24px] p-6"
          >
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#00D4FF]" /> Account Security
            </h3>
            <button className="w-full text-left px-4 py-3 bg-white/5 hover:bg-white/10 rounded-xl text-sm font-medium transition-colors mb-3">
              Change Password
            </button>
            <button className="w-full text-left px-4 py-3 bg-white/5 hover:bg-white/10 rounded-xl text-sm font-medium transition-colors text-red-400">
              Enable 2FA
            </button>
          </motion.div>
        </div>

        {/* Forms */}
        <div className="md:col-span-2">
          <motion.form 
            onSubmit={handleSave}
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
            className="bg-white/5 border border-white/10 rounded-[32px] p-6 sm:p-8 space-y-6"
          >
            <h3 className="text-xl font-bold mb-6">Personal Details</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Full Name</label>
                <div className="relative">
                  <User className="w-5 h-5 text-gray-500 absolute left-4 top-3" />
                  <input type="text" defaultValue="John Doe" className="w-full bg-black/50 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white focus:outline-none focus:border-[#FF0033]" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Email</label>
                <div className="relative">
                  <Mail className="w-5 h-5 text-gray-500 absolute left-4 top-3" />
                  <input type="email" defaultValue="john@example.com" disabled className="w-full bg-black/50 border border-white/5 rounded-xl pl-12 pr-4 py-3 text-gray-500 cursor-not-allowed" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Phone</label>
                <div className="relative">
                  <Phone className="w-5 h-5 text-gray-500 absolute left-4 top-3" />
                  <input type="tel" defaultValue="+91 9876543210" className="w-full bg-black/50 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white focus:outline-none focus:border-[#FF0033]" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Age</label>
                <input type="number" defaultValue={28} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#FF0033]" />
              </div>
            </div>

            <h3 className="text-xl font-bold mt-8 mb-6 pt-6 border-t border-white/10">Fitness Metrics</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Height (cm)</label>
                <div className="relative">
                  <Ruler className="w-5 h-5 text-gray-500 absolute left-4 top-3" />
                  <input type="number" defaultValue={180} className="w-full bg-black/50 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white focus:outline-none focus:border-[#00D4FF]" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Weight (kg)</label>
                <div className="relative">
                  <Weight className="w-5 h-5 text-gray-500 absolute left-4 top-3" />
                  <input type="number" defaultValue={82} className="w-full bg-black/50 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white focus:outline-none focus:border-[#00D4FF]" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Primary Goal</label>
                <select className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00D4FF] appearance-none">
                  <option value="muscle_gain">Muscle Gain</option>
                  <option value="weight_loss">Weight Loss</option>
                  <option value="endurance">Endurance</option>
                  <option value="maintenance">Maintenance</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Dietary Preference</label>
                <select className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00D4FF] appearance-none">
                  <option value="non-vegetarian">Non-Vegetarian</option>
                  <option value="vegetarian">Vegetarian</option>
                  <option value="vegan">Vegan</option>
                </select>
              </div>
            </div>

            <div className="pt-6">
              <button 
                type="submit" 
                disabled={isSaving}
                className="px-8 py-3 bg-[#FF0033] text-white font-bold rounded-xl hover:bg-white hover:text-black transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isSaving ? "Saving Changes..." : "Save Profile"}
              </button>
            </div>
          </motion.form>
        </div>
      </div>
    </div>
  );
}
