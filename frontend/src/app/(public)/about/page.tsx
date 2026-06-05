"use client";

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Target, Users, MapPin, Award, ChevronRight } from 'lucide-react';
import { Poppins, Montserrat, Bebas_Neue } from 'next/font/google';

gsap.registerPlugin(ScrollTrigger);

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });
const montserrat = Montserrat({ subsets: ['latin'], weight: ['400', '500', '700', '900'] });
const bebas = Bebas_Neue({ subsets: ['latin'], weight: ['400'] });

export default function AboutPage() {
  const container = useRef<HTMLDivElement>(null);
  
  useGSAP(() => {
    const sections = gsap.utils.toArray('.gsap-section');
    sections.forEach((sec: any) => {
      gsap.from(sec, {
        opacity: 0,
        y: 100,
        duration: 1,
        scrollTrigger: {
          trigger: sec,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        }
      });
    });
  }, { scope: container });

  return (
    <div ref={container} className={`bg-[#0A0A0A] min-h-screen text-white pt-32 pb-32 overflow-hidden ${poppins.className}`}>
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center border-b border-white/10">
        <div className="absolute inset-0 bg-gradient-to-b from-[#FFD600]/5 to-[#0A0A0A] z-0" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          >
            <h1 className={`text-7xl md:text-9xl tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-white via-[#FFD600] to-white mb-6 ${bebas.className}`}>
              OUR LEGACY
            </h1>
          </motion.div>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className={`text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto ${montserrat.className}`}
          >
            Forged in discipline. Perfected by science. We are the architects of human potential.
          </motion.p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="gsap-section py-24 container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className={`text-5xl md:text-7xl mb-8 ${bebas.className}`}>BEYOND <span className="text-[#FFD600]">LIMITS</span></h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-6">
              We don't just change bodies; we forge unbreakable minds. Our facilities merge state-of-the-art equipment with world-class coaching.
            </p>
            <div className="h-1 w-24 bg-[#FFD600] rounded-full shadow-[0_0_15px_rgba(255,214,0,0.5)]" />
          </div>
          <div className="grid grid-cols-2 gap-6">
            {[ 
              { icon: Users, val: '25K+', label: 'Elite Members' },
              { icon: Target, val: '99%', label: 'Goal Success' },
              { icon: MapPin, val: '12', label: 'Global Studios' },
              { icon: Award, val: '150+', label: 'Master Coaches' }
            ].map((stat, i) => (
              <div key={i} className={`bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl flex flex-col items-center justify-center text-center transform transition-all duration-500 hover:scale-105 hover:border-[#FFD600]/50 hover:shadow-[0_0_30px_rgba(255,214,0,0.15)] ${i % 2 !== 0 ? 'translate-y-8' : ''}`}>
                <stat.icon className="w-12 h-12 text-[#FFD600] mb-4 drop-shadow-[0_0_10px_rgba(255,214,0,0.8)]" />
                <h4 className={`text-4xl ${bebas.className}`}>{stat.val}</h4>
                <p className="text-gray-500 text-sm uppercase tracking-widest font-bold mt-2">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Cinematic Image Section */}
      <section className="gsap-section py-24">
        <div className="container mx-auto px-4">
           <div className="relative h-[60vh] rounded-[40px] overflow-hidden border border-white/10">
             <img src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop" alt="Gym interior" className="w-full h-full object-cover opacity-60 mix-blend-luminosity hover:mix-blend-normal hover:opacity-100 transition-all duration-1000" />
             <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] to-transparent" />
             <div className="absolute bottom-10 left-10">
               <h3 className={`text-5xl md:text-7xl ${bebas.className} text-white drop-shadow-2xl`}>THE <span className="text-[#FFD600]">SANCTUARY</span></h3>
             </div>
           </div>
        </div>
      </section>
    </div>
  );
}
