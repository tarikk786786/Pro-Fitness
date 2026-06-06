"use client";

import { motion } from "framer-motion";
import { Award, Target, TrendingUp, Star } from "lucide-react";

export default function TrainersPage() {
  const trainers = [
    {
      name: "Tarik",
      role: "Head Coach & Founder",
      qualification: "Certified Fitness Professional",
      experience: "8+ Years",
      specialization: "Hypertrophy & Strength Training",
      expertise: "Body Transformation, Powerlifting"
    },
    {
      name: "Rahul",
      role: "Senior Trainer",
      qualification: "ACE Certified",
      experience: "5+ Years",
      specialization: "Weight Loss & Conditioning",
      expertise: "Functional Training, Fat Loss"
    },
    {
      name: "Priya",
      role: "Fitness Coach",
      qualification: "Diploma in Personal Training",
      experience: "3+ Years",
      specialization: "Women's Fitness",
      expertise: "Flexibility, Core Strength, Posture"
    }
  ];

  return (
    <div className="min-h-screen bg-[#111111] text-white pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            Meet Our <span className="text-[#FFD600]">Trainers</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-400 max-w-2xl mx-auto"
          >
            Professional guidance from experienced coaches who are dedicated to your success.
            We don't just train; we educate and inspire.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {trainers.map((trainer, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + (index * 0.1) }}
              className="bg-[#1a1a1a] rounded-2xl border border-white/5 overflow-hidden hover:border-[#FFD600]/30 transition-colors"
            >
              {/* Trainer Image Placeholder */}
              <div className="h-64 w-full bg-gradient-to-b from-zinc-800 to-[#1a1a1a] relative flex items-center justify-center border-b border-white/5">
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#FFD600] via-transparent to-transparent"></div>
                <div className="w-32 h-32 rounded-full bg-black border-4 border-[#1a1a1a] shadow-xl flex items-center justify-center z-10 overflow-hidden">
                   <span className="text-4xl font-bold text-[#FFD600]">{trainer.name.charAt(0)}</span>
                </div>
              </div>

              <div className="p-8">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-white mb-1">{trainer.name}</h2>
                  <p className="text-[#FFD600] text-sm font-medium">{trainer.role}</p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Award className="w-5 h-5 text-gray-400 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-xs text-gray-500 uppercase font-semibold">Qualification</p>
                      <p className="text-sm text-gray-300">{trainer.qualification}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <TrendingUp className="w-5 h-5 text-gray-400 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-xs text-gray-500 uppercase font-semibold">Experience</p>
                      <p className="text-sm text-gray-300">{trainer.experience}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Target className="w-5 h-5 text-gray-400 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-xs text-gray-500 uppercase font-semibold">Specialization</p>
                      <p className="text-sm text-gray-300">{trainer.specialization}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Star className="w-5 h-5 text-[#FFD600] mt-0.5 shrink-0" />
                    <div>
                      <p className="text-xs text-[#FFD600] uppercase font-semibold">Expertise</p>
                      <p className="text-sm text-gray-300">{trainer.expertise}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}
