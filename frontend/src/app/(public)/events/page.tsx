"use client";

import { useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Calendar, MapPin } from 'lucide-react';
import { Poppins, Montserrat, Bebas_Neue } from 'next/font/google';

gsap.registerPlugin(ScrollTrigger);

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });
const montserrat = Montserrat({ subsets: ['latin'], weight: ['400', '500', '700', '900'] });
const bebas = Bebas_Neue({ subsets: ['latin'], weight: ['400'] });

export default function EventsPage() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from('.event-row', {
      x: -50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      scrollTrigger: {
        trigger: '.events-list',
        start: 'top 80%',
      }
    });
  }, { scope: container });

  const events = [
    { date: "OCT 15", title: "The Iron Challenge 2026", loc: "Main Arena, NY", type: "Competition" },
    { date: "NOV 02", title: "Masterclass: Olympic Lifting", loc: "Studio B", type: "Workshop" },
    { date: "NOV 20", title: "Endurance Protocol Seminar", loc: "Virtual / Online", type: "Seminar" },
  ];

  return (
    <div ref={container} className={`bg-[#0A0A0A] min-h-screen text-white pt-32 pb-32 ${poppins.className}`}>
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center mb-20"
        >
          <h1 className={`text-6xl md:text-8xl mb-6 ${bebas.className}`}>UPCOMING <span className="text-[#FFD600]">BATTLES</span></h1>
          <p className="text-gray-400 text-xl max-w-2xl mx-auto">Test your mettle or expand your knowledge. Join our elite events.</p>
        </motion.div>

        <div className="events-list max-w-5xl mx-auto bg-white/5 backdrop-blur-xl border border-white/10 rounded-[40px] overflow-hidden">
          {events.map((ev, i) => (
            <div key={i} className="event-row flex flex-col md:flex-row items-center justify-between p-8 md:p-10 border-b border-white/10 hover:bg-white/5 transition-colors group">
              <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 w-full md:w-auto">
                <div className={`text-center md:text-left ${bebas.className}`}>
                  <span className="text-5xl text-[#FFD600]">{ev.date.split(' ')[1]}</span>
                  <span className="block text-2xl text-gray-400">{ev.date.split(' ')[0]}</span>
                </div>
                <div className="text-center md:text-left">
                  <div className="inline-block bg-[#FFD600]/10 text-[#FFD600] text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-2 border border-[#FFD600]/20">
                    {ev.type}
                  </div>
                  <h3 className={`text-2xl md:text-3xl font-bold mb-2 ${montserrat.className}`}>{ev.title}</h3>
                  <div className="flex items-center justify-center md:justify-start text-gray-500 gap-2">
                    <MapPin className="w-4 h-4" /> {ev.loc}
                  </div>
                </div>
              </div>
              <button className="mt-8 md:mt-0 px-8 py-4 border-2 border-[#FFD600] text-[#FFD600] font-bold uppercase tracking-widest rounded-full hover:bg-[#FFD600] hover:text-black transition-colors w-full md:w-auto">
                Secure Spot
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
