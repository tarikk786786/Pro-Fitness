"use client";

import { motion } from "framer-motion";
import { CalendarDays, MapPin, Users, ArrowRight } from "lucide-react";

export default function EventsPage() {
  const events = [
    { title: "Summer Shred 8-Week Challenge", type: "Challenge", date: "June 1, 2025", location: "Global / Online", participants: "1.2k joined", image: "from-[#FF0033] to-[#FF4D6D]" },
    { title: "Powerlifting Meet 2024", type: "Competition", date: "November 15, 2024", location: "Delhi HQ", participants: "200 joined", image: "from-blue-600 to-[#00D4FF]" },
    { title: "Advanced Nutrition Workshop", type: "Seminar", date: "October 25, 2024", location: "Mumbai Studio", participants: "50 joined", image: "from-purple-600 to-pink-500" },
    { title: "Yoga & Mindfulness Retreat", type: "Workshop", date: "December 10, 2024", location: "Goa Resort", participants: "120 joined", image: "from-emerald-500 to-teal-400" },
  ];

  return (
    <div className="pt-32 pb-32 bg-black min-h-screen">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-black mb-4"
          >
            UPCOMING <span className="text-[#00D4FF]">EVENTS</span>
          </motion.h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">Join our community challenges, competitions, and educational seminars.</p>
        </div>

        <div className="space-y-6 max-w-4xl mx-auto">
          {events.map((event, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white/5 border border-white/10 rounded-3xl p-4 sm:p-6 flex flex-col md:flex-row gap-6 items-center group hover:bg-white/10 transition-colors"
            >
              {/* Event Graphic */}
              <div className={`w-full md:w-48 h-32 rounded-2xl bg-gradient-to-br ${event.image} flex items-center justify-center flex-shrink-0`}>
                <span className="bg-black/40 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                  {event.type}
                </span>
              </div>
              
              <div className="flex-grow text-center md:text-left">
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-[#00D4FF] transition-colors">{event.title}</h3>
                
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm text-gray-400 mb-4">
                  <span className="flex items-center gap-1"><CalendarDays className="w-4 h-4 text-white" /> {event.date}</span>
                  <span className="flex items-center gap-1"><MapPin className="w-4 h-4 text-white" /> {event.location}</span>
                  <span className="flex items-center gap-1"><Users className="w-4 h-4 text-white" /> {event.participants}</span>
                </div>
              </div>
              
              <div className="w-full md:w-auto flex-shrink-0">
                <button className="w-full md:w-auto px-6 py-3 bg-white text-black font-bold rounded-full hover:bg-[#FF0033] hover:text-white transition-colors flex items-center justify-center gap-2">
                  Register <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
