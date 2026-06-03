"use client";

import { motion } from "framer-motion";
import { ChevronRight, Target, Users, MapPin, Award } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="pt-24 pb-32 bg-black min-h-screen">
      {/* Hero */}
      <section className="relative py-20 overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-gradient-to-b from-[#FF0033]/10 to-transparent"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black mb-6"
          >
            OUR <span className="text-[#FF0033]">STORY</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-xl max-w-2xl mx-auto"
          >
            Redefining fitness through the perfect fusion of artificial intelligence and human expertise.
          </motion.p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-24 container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-5xl font-black mb-8">MISSION & <span className="text-[#00D4FF]">VISION</span></h2>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              Founded in 2024, PRO FITNESS was born from a simple realization: the fitness industry was stuck in the past. Generic workout plans and cookie-cutter diets simply don't work for everyone.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              Our mission is to democratize elite fitness coaching. By leveraging advanced AI alongside world-class personal trainers, we provide a hyper-personalized fitness ecosystem that adapts to your unique biology, lifestyle, and goals.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/5 p-6 rounded-3xl border border-white/10 text-center flex flex-col items-center justify-center aspect-square">
              <Users className="w-10 h-10 text-[#FF0033] mb-4" />
              <h4 className="text-3xl font-black">10K+</h4>
              <p className="text-gray-500 text-sm uppercase tracking-wider">Members</p>
            </div>
            <div className="bg-white/5 p-6 rounded-3xl border border-white/10 text-center flex flex-col items-center justify-center aspect-square translate-y-8">
              <Target className="w-10 h-10 text-[#00D4FF] mb-4" />
              <h4 className="text-3xl font-black">99%</h4>
              <p className="text-gray-500 text-sm uppercase tracking-wider">Success Rate</p>
            </div>
            <div className="bg-white/5 p-6 rounded-3xl border border-white/10 text-center flex flex-col items-center justify-center aspect-square">
              <MapPin className="w-10 h-10 text-[#00D4FF] mb-4" />
              <h4 className="text-3xl font-black">5</h4>
              <p className="text-gray-500 text-sm uppercase tracking-wider">Locations</p>
            </div>
            <div className="bg-white/5 p-6 rounded-3xl border border-white/10 text-center flex flex-col items-center justify-center aspect-square translate-y-8">
              <Award className="w-10 h-10 text-[#FF0033] mb-4" />
              <h4 className="text-3xl font-black">50+</h4>
              <p className="text-gray-500 text-sm uppercase tracking-wider">Pro Trainers</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
