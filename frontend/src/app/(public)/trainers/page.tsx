"use client";

import { useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Star, MapPin, Search, Camera, MessageCircle, Award, ShieldCheck, Heart, UserCheck } from 'lucide-react';
import { Poppins, Montserrat, Bebas_Neue } from 'next/font/google';

gsap.registerPlugin(ScrollTrigger);

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });
const montserrat = Montserrat({ subsets: ['latin'], weight: ['400', '500', '700', '900'] });
const bebas = Bebas_Neue({ subsets: ['latin'], weight: ['400'] });

export default function TrainersPage() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from('.badge-card', {
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power3.out',
      delay: 0.2
    });

    gsap.from('.trainer-card', {
      y: 100,
      opacity: 0,
      duration: 1,
      stagger: 0.15,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.trainers-grid',
        start: 'top 80%',
      }
    });
  }, { scope: container });

  const trainers = [
    { name: "Jaxon Steele", spec: "Hypertrophy Specialist", img: "https://images.unsplash.com/photo-1567013127542-490d757e51fc?q=80&w=1974&auto=format&fit=crop" },
    { name: "Maya Lin", spec: "Mobility & Flow", img: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=2070&auto=format&fit=crop" },
    { name: "Marcus Thorne", spec: "Strength & Power", img: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=2070&auto=format&fit=crop" },
    { name: "Elena Rostova", spec: "Endurance Coach", img: "https://images.unsplash.com/photo-1548690312-e3b507d8c110?q=80&w=1974&auto=format&fit=crop" }
  ];

  return (
    <div ref={container} className={`bg-[#0A0A0A] min-h-screen text-white pt-32 pb-32 ${poppins.className}`}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <motion.h1 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              className={`text-6xl md:text-8xl mb-4 ${bebas.className} tracking-wider`}
            >
              THE <span className="text-[#FFD600] drop-shadow-[0_0_15px_rgba(255,214,0,0.4)]">MASTERS</span>
            </motion.h1>
            <p className="text-gray-400 text-xl max-w-xl border-l-2 border-[#FFD600] pl-4">World-class athletes ready to forge your new reality.</p>
          </div>
          <div className="relative w-full md:w-96">
            <input 
              type="text" 
              placeholder="Find your coach..." 
              className="w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-full py-4 px-6 pl-14 text-white focus:outline-none focus:border-[#FFD600] focus:ring-1 focus:ring-[#FFD600] transition-all"
            />
            <Search className="w-6 h-6 text-gray-400 absolute left-5 top-4" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          <div className="badge-card bg-white/5 border border-white/10 rounded-2xl p-6 flex items-center gap-4 hover:border-[#FFD600]/30 hover:bg-white/10 transition-all duration-300">
            <div className="bg-[#FFD600]/10 p-3 rounded-full text-[#FFD600]">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-semibold">Certified Professionals</h4>
              <p className="text-gray-400 text-xs mt-1">Globally recognized certifications</p>
            </div>
          </div>
          <div className="badge-card bg-white/5 border border-white/10 rounded-2xl p-6 flex items-center gap-4 hover:border-[#FFD600]/30 hover:bg-white/10 transition-all duration-300">
            <div className="bg-[#FFD600]/10 p-3 rounded-full text-[#FFD600]">
              <UserCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-semibold">Respectful & Disciplined</h4>
              <p className="text-gray-400 text-xs mt-1">Highest standards of conduct</p>
            </div>
          </div>
          <div className="badge-card bg-white/5 border border-white/10 rounded-2xl p-6 flex items-center gap-4 hover:border-[#FFD600]/30 hover:bg-white/10 transition-all duration-300">
            <div className="bg-[#FFD600]/10 p-3 rounded-full text-[#FFD600]">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-semibold">Safety-Focused Coaching</h4>
              <p className="text-gray-400 text-xs mt-1">Injury prevention priority</p>
            </div>
          </div>
          <div className="badge-card bg-white/5 border border-white/10 rounded-2xl p-6 flex items-center gap-4 hover:border-[#FFD600]/30 hover:bg-white/10 transition-all duration-300">
            <div className="bg-[#FFD600]/10 p-3 rounded-full text-[#FFD600]">
              <Heart className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-semibold">Women-Friendly</h4>
              <p className="text-gray-400 text-xs mt-1">Safe & supportive environment</p>
            </div>
          </div>
        </div>

        <div className="trainers-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {trainers.map((trainer, i) => (
            <div key={i} className="trainer-card group relative rounded-[40px] overflow-hidden aspect-[3/4] border border-white/10 hover:border-[#FFD600]/50 transition-all duration-700">
              <img src={trainer.img} alt={trainer.name} className="absolute inset-0 w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/40 to-transparent" />
              
              <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-6 group-hover:translate-y-0 transition-transform duration-500">
                <h3 className={`text-3xl font-bold text-white mb-1 ${bebas.className} tracking-wide`}>{trainer.name}</h3>
                <p className="text-[#FFD600] text-sm font-bold uppercase tracking-widest mb-4">{trainer.spec}</p>
                
                <div className="flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                  <button className="bg-[#FFD600] text-black p-3 rounded-full hover:bg-white transition-colors">
                    <Camera className="w-5 h-5" />
                  </button>
                  <button className="bg-white/10 backdrop-blur-sm text-white border border-white/20 p-3 rounded-full hover:bg-white/30 transition-colors">
                    <MessageCircle className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
