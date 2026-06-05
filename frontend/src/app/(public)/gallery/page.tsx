"use client";

import { useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Poppins, Montserrat, Bebas_Neue } from 'next/font/google';

gsap.registerPlugin(ScrollTrigger);

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });
const montserrat = Montserrat({ subsets: ['latin'], weight: ['400', '500', '700', '900'] });
const bebas = Bebas_Neue({ subsets: ['latin'], weight: ['400'] });

export default function GalleryPage() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from('.gallery-item', {
      scale: 0.5,
      opacity: 0,
      duration: 1,
      stagger: 0.1,
      scrollTrigger: {
        trigger: '.gallery-grid',
        start: 'top 80%',
      }
    });
  }, { scope: container });

  const images = [
    "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=1974&auto=format&fit=crop"
  ];

  return (
    <div ref={container} className={`bg-[#0A0A0A] min-h-screen text-white pt-32 pb-32 ${poppins.className}`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-24">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`text-6xl md:text-8xl mb-4 ${bebas.className}`}
          >
            THE <span className="text-[#FFD600]">IRON</span> TEMPLE
          </motion.h1>
          <p className="text-gray-400 text-xl max-w-2xl mx-auto">Take a look inside our state-of-the-art facilities designed for champions.</p>
        </div>

        <div className="gallery-grid columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {images.map((img, i) => (
            <div key={i} className="gallery-item relative overflow-hidden rounded-[30px] break-inside-avoid border border-white/10 group cursor-pointer">
              <img src={img} alt={`Gallery ${i}`} className="w-full h-auto transform transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm">
                <span className={`text-[#FFD600] text-xl font-bold uppercase tracking-widest ${bebas.className} border-2 border-[#FFD600] px-6 py-2 rounded-full`}>View</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
