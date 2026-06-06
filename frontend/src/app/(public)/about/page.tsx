"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Users, Target, Heart } from "lucide-react";

export default function AboutPage() {
  const values = [
    {
      icon: <ShieldCheck className="w-8 h-8 text-[#FFD600]" />,
      title: "Safety First",
      description: "State-of-the-art equipment maintained to the highest safety standards."
    },
    {
      icon: <Heart className="w-8 h-8 text-[#FFD600]" />,
      title: "Comfort & Privacy",
      description: "A welcoming environment with a priority on women's comfort and safety."
    },
    {
      icon: <Users className="w-8 h-8 text-[#FFD600]" />,
      title: "Professional Guidance",
      description: "Expert trainers dedicated to helping you achieve your fitness goals."
    },
    {
      icon: <Target className="w-8 h-8 text-[#FFD600]" />,
      title: "Real Results",
      description: "No gimmicks. Just hard work, proper nutrition, and proven training methods."
    }
  ];

  return (
    <div className="min-h-screen bg-[#111111] text-white pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hero Section */}
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            Welcome to <span className="text-[#FFD600]">PRO FITNESS</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-400 max-w-2xl mx-auto"
          >
            The premium fitness destination in Balasore, redefining what a gym should be. 
            Real equipment, real training, and a real community.
          </motion.p>
        </div>

        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="relative h-[400px] rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-tr from-black to-zinc-900 flex items-center justify-center"
          >
            <span className="text-[#FFD600] font-bold text-2xl tracking-widest">PRO FITNESS</span>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-bold border-l-4 border-[#FFD600] pl-4">Our Story</h2>
            <p className="text-gray-300 leading-relaxed">
              Located in the heart of Sunnat, Balasore, PRO FITNESS was born from a simple vision: 
              to provide a world-class training facility that feels like home. We believe that 
              fitness is for everyone, regardless of age or experience level.
            </p>
            <p className="text-gray-300 leading-relaxed">
              We take pride in our clean, safe, and motivating environment. Our facility is designed 
              with a special emphasis on women's comfort and privacy, ensuring that every member 
              feels secure and confident during their workout.
            </p>
            <div className="bg-white/5 p-6 rounded-xl border border-white/10 mt-8">
              <h3 className="text-xl font-semibold mb-2 text-[#FFD600]">Visit Us</h3>
              <p className="text-gray-300">Sunnat, Balasore, Odisha - 756001</p>
              <p className="text-gray-300 mt-2">Phone: +91 91144 11026</p>
            </div>
          </motion.div>
        </div>

        {/* Values Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-12">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + (index * 0.1) }}
                className="bg-[#1a1a1a] p-8 rounded-2xl border border-white/5 hover:border-[#FFD600]/30 transition-colors"
              >
                <div className="bg-black w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 border border-white/10">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
