"use client";

import { motion } from "framer-motion";
import { Search, Calendar, Clock, User } from "lucide-react";
import Link from "next/link";

export default function BlogPage() {
  const categories = ["All", "Fat Loss", "Muscle Gain", "Nutrition", "Motivation", "Women Fitness"];
  
  const posts = [
    { title: "The Science of Hypertrophy: How to Actually Build Muscle", category: "Muscle Gain", excerpt: "Discover the latest research on muscle growth and how to apply it to your workouts for maximum results.", author: "Alex Mercer", date: "Oct 15, 2024", readTime: "8 min" },
    { title: "Managing PCOS Through Resistance Training", category: "Women Fitness", excerpt: "Learn why strength training is one of the most effective tools for managing PCOS symptoms and regulating hormones.", author: "Dr. Sarah Connor", date: "Oct 12, 2024", readTime: "6 min" },
    { title: "The Optimal Pre-Workout Meal Timeline", category: "Nutrition", excerpt: "What to eat and when to eat it to maximize your energy, pump, and performance in the gym.", author: "David Kim", date: "Oct 08, 2024", readTime: "5 min" },
    { title: "Breaking Through Plateaus: A Strategic Guide", category: "Motivation", excerpt: "Hit a wall in your progress? Here are 5 scientifically proven strategies to restart your gains.", author: "Marcus Johnson", date: "Oct 01, 2024", readTime: "7 min" },
    { title: "HIIT vs LISS: The Ultimate Fat Loss Debate", category: "Fat Loss", excerpt: "Which cardio method is actually better for shedding body fat? We break down the pros and cons of both.", author: "Elena Rodriguez", date: "Sep 28, 2024", readTime: "6 min" },
    { title: "Supplements That Actually Work (And Which to Skip)", category: "Nutrition", excerpt: "An evidence-based guide to fitness supplements. Save your money and buy only what actually produces results.", author: "Alex Mercer", date: "Sep 22, 2024", readTime: "10 min" },
  ];

  return (
    <div className="pt-32 pb-32 bg-black min-h-screen">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-8">
          <div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-6xl font-black mb-4"
            >
              FITNESS <span className="text-[#FF0033]">JOURNAL</span>
            </motion.h1>
            <p className="text-gray-400 text-lg max-w-xl">Science-backed articles, training tips, and nutrition guides.</p>
          </div>
          
          <div className="relative w-full md:w-80">
            <input 
              type="text" 
              placeholder="Search articles..." 
              className="w-full bg-white/5 border border-white/10 rounded-full py-3 px-5 pl-12 text-white focus:outline-none focus:border-[#FF0033]"
            />
            <Search className="w-5 h-5 text-gray-400 absolute left-4 top-3.5" />
          </div>
        </div>

        {/* Categories */}
        <div className="flex overflow-x-auto pb-4 mb-12 gap-2 no-scrollbar">
          {categories.map((cat, i) => (
            <button 
              key={i}
              className={`px-6 py-2 rounded-full whitespace-nowrap font-bold text-sm transition-colors ${
                i === 0 ? "bg-[#FF0033] text-white" : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/5"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white/5 border border-white/10 rounded-[32px] overflow-hidden group cursor-pointer"
            >
              {/* Image Placeholder */}
              <div className="h-48 bg-gradient-to-br from-gray-800 to-[#FF0033]/20 relative overflow-hidden">
                <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-white">
                  {post.category}
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#00D4FF] transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-gray-400 text-sm mb-6 line-clamp-3">
                  {post.excerpt}
                </p>
                
                <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 pt-4 border-t border-white/10">
                  <span className="flex items-center gap-1"><User className="w-3 h-3" /> {post.author}</span>
                  <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {post.date}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {post.readTime}</span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
}
