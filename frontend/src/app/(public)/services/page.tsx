"use client";

import { useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Activity, Brain, Dumbbell, Zap, Heart, Trophy, Crosshair, Flame } from 'lucide-react';
import { Poppins, Montserrat, Bebas_Neue } from 'next/font/google';

gsap.registerPlugin(ScrollTrigger);

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });
const montserrat = Montserrat({ subsets: ['latin'], weight: ['400', '500', '700', '900'] });
const bebas = Bebas_Neue({ subsets: ['latin'], weight: ['400'] });

export default function ServicesPage() {
  const container = useRef<HTMLDivElement>(null);
  
  useGSAP(() => {
    gsap.from('.service-card', {
      opacity: 0,
      scale: 0.8,
      rotationY: 45,
      duration: 1,
      stagger: 0.1,
      scrollTrigger: {
        trigger: '.services-grid',
        start: 'top 80%',
      }
    });
  }, { scope: container });

  const services = [
    { icon: Crosshair, title: "Personal Coaching", desc: "Bespoke 1-on-1 sessions designed for your unique biometric profile." },
    { icon: Flame, title: "HIIT Inferno", desc: "High-intensity classes that push cardiovascular limits and torch calories." },
    { icon: Brain, title: "AI Nutrition", desc: "Algorithmic meal planning based on continuous metabolic feedback." },
    { icon: Dumbbell, title: "Hypertrophy", desc: "Science-backed muscle building protocols with strict form oversight." },
    { icon: Zap, title: "Athletic Output", desc: "Sport-specific training focusing on explosive power and agility." },
    { icon: Heart, title: "Recovery Lab", desc: "Cryotherapy, infrared saunas, and mobility work for optimal healing." },
    { icon: Trophy, title: "The 90-Day Apex", desc: "Our signature transformation program for total life overhaul." },
    { icon: Activity, title: "Metabolic Testing", desc: "VO2 Max and DEXA scans to track precise physiological adaptations." }
  ];

  return (
    <div ref={container} className={`bg-[#0A0A0A] min-h-screen text-white pt-32 pb-32 overflow-hidden ${poppins.className}`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, type: 'spring' }}
          >
            <h1 className={`text-7xl md:text-9xl mb-6 ${bebas.className} tracking-wide`}>
              ELITE <span className="text-[#FFD600] drop-shadow-[0_0_20px_rgba(255,214,0,0.5)]">DISCIPLINES</span>
            </h1>
          </motion.div>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className={`text-gray-400 max-w-2xl mx-auto text-xl ${montserrat.className}`}
          >
            Precision engineering for the human body. Choose your path to greatness.
          </motion.p>
        </div>

        <div className="services-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
          {services.map((service, i) => (
            <div
              key={i}
              className="service-card bg-white/5 backdrop-blur-xl border border-white/10 rounded-[40px] p-8 hover:bg-[#111] hover:border-[#FFD600]/60 transition-all duration-500 group relative overflow-hidden cursor-pointer"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#FFD600]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <div className="w-16 h-16 bg-black/50 rounded-2xl flex items-center justify-center mb-8 border border-white/5 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(255,214,0,0.3)] transition-all duration-300">
                  <service.icon className="w-8 h-8 text-[#FFD600]" />
                </div>
                <h3 className={`text-2xl font-bold text-white mb-4 ${montserrat.className}`}>{service.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-8">{service.desc}</p>
                <div className="flex items-center text-[#FFD600] font-bold text-sm uppercase tracking-widest group-hover:translate-x-2 transition-transform">
                  Explore <Zap className="w-4 h-4 ml-2" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
