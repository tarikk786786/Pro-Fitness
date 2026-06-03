"use client";

import { motion } from "framer-motion";
import { Star, MapPin, Search } from "lucide-react";

export default function TrainersPage() {
  const trainers = [
    { name: "Alex Mercer", specialization: "Strength & Conditioning", experience: "8 Years", rating: 4.9, clients: 120 },
    { name: "Sarah Connor", specialization: "HIIT & Cardio", experience: "5 Years", rating: 4.8, clients: 85 },
    { name: "Marcus Johnson", specialization: "Bodybuilding", experience: "12 Years", rating: 5.0, clients: 200 },
    { name: "Elena Rodriguez", specialization: "Yoga & Mobility", experience: "7 Years", rating: 4.9, clients: 150 },
    { name: "David Kim", specialization: "Sports Performance", experience: "6 Years", rating: 4.7, clients: 90 },
    { name: "Jessica Smith", specialization: "Weight Loss", experience: "4 Years", rating: 4.8, clients: 110 },
    { name: "Michael Chang", specialization: "CrossFit", experience: "9 Years", rating: 4.9, clients: 140 },
    { name: "Rachel Green", specialization: "Pilates", experience: "5 Years", rating: 4.8, clients: 75 }
  ];

  return (
    <div className="pt-32 pb-32 bg-black min-h-screen">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-6xl font-black mb-4"
            >
              ELITE <span className="text-[#00D4FF]">TRAINERS</span>
            </motion.h1>
            <p className="text-gray-400 text-lg max-w-xl">Work with the best in the industry to achieve your ultimate physique.</p>
          </div>
          
          <div className="relative w-full md:w-72">
            <input 
              type="text" 
              placeholder="Search trainers..." 
              className="w-full bg-white/5 border border-white/10 rounded-full py-3 px-5 pl-12 text-white focus:outline-none focus:border-[#00D4FF]"
            />
            <Search className="w-5 h-5 text-gray-400 absolute left-4 top-3.5" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {trainers.map((trainer, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="bg-white/5 border border-white/10 rounded-[32px] overflow-hidden group hover:bg-white/10 transition-all"
            >
              {/* Image Placeholder */}
              <div className="h-64 bg-gradient-to-br from-gray-800 to-gray-900 relative">
                <div className="absolute inset-0 flex items-center justify-center text-4xl font-black text-white/10">
                  {trainer.name.split(' ').map(n => n[0]).join('')}
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-1">{trainer.name}</h3>
                <p className="text-[#00D4FF] text-sm font-medium mb-4">{trainer.specialization}</p>
                
                <div className="flex justify-between items-center mb-6 text-sm text-gray-400">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-[#FFB800] fill-current" />
                    <span className="text-white font-bold">{trainer.rating}</span>
                  </div>
                  <span>{trainer.experience} Exp.</span>
                  <span>{trainer.clients} Clients</span>
                </div>
                
                <button className="w-full py-3 border border-white/20 rounded-full text-white font-bold hover:bg-white hover:text-black transition-colors">
                  View Profile
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
