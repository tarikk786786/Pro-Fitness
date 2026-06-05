"use client";

import { useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { MapPin, Phone, Mail, Send } from 'lucide-react';
import { Poppins, Montserrat, Bebas_Neue } from 'next/font/google';

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });
const montserrat = Montserrat({ subsets: ['latin'], weight: ['400', '500', '700', '900'] });
const bebas = Bebas_Neue({ subsets: ['latin'], weight: ['400'] });

export default function ContactPage() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from('.contact-element', {
      x: -50,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
    });
  }, { scope: container });

  return (
    <div ref={container} className={`bg-[#0A0A0A] min-h-screen text-white pt-32 pb-32 relative overflow-hidden ${poppins.className}`}>
      <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-[#FFD600]/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div>
            <motion.h1 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={`text-7xl md:text-9xl mb-8 ${bebas.className} contact-element`}
            >
              COMMIT <br/><span className="text-[#FFD600]">NOW</span>
            </motion.h1>
            <p className="text-gray-400 text-xl mb-12 contact-element border-l-2 border-[#FFD600] pl-6 py-2">
              Ready to redefine your limits? Our team is standing by to forge your custom protocol.
            </p>

            <div className="space-y-8 contact-element">
              <div className="flex items-center gap-6 bg-white/5 backdrop-blur-md p-6 rounded-3xl border border-white/10">
                <div className="w-14 h-14 bg-[#FFD600]/10 rounded-full flex items-center justify-center">
                  <MapPin className="text-[#FFD600] w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-bold">The Headquarters</h4>
                  <p className="text-gray-400">100 Elite Avenue, Iron City, NY 10001</p>
                </div>
              </div>
              <div className="flex items-center gap-6 bg-white/5 backdrop-blur-md p-6 rounded-3xl border border-white/10">
                <div className="w-14 h-14 bg-[#FFD600]/10 rounded-full flex items-center justify-center">
                  <Phone className="text-[#FFD600] w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-bold">Direct Line</h4>
                  <p className="text-gray-400">+1 (800) FORGE-IT</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-12 rounded-[40px] contact-element shadow-[0_0_50px_rgba(0,0,0,0.5)]">
            <h3 className={`text-4xl mb-8 ${bebas.className}`}>INITIATE CONTACT</h3>
            <form className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <input type="text" placeholder="First Name" className="bg-black/50 border border-white/10 rounded-2xl p-4 text-white focus:border-[#FFD600] outline-none transition-colors w-full" />
                <input type="text" placeholder="Last Name" className="bg-black/50 border border-white/10 rounded-2xl p-4 text-white focus:border-[#FFD600] outline-none transition-colors w-full" />
              </div>
              <input type="email" placeholder="Email Address" className="bg-black/50 border border-white/10 rounded-2xl p-4 text-white focus:border-[#FFD600] outline-none transition-colors w-full" />
              <textarea placeholder="Your Goals..." rows={4} className="bg-black/50 border border-white/10 rounded-2xl p-4 text-white focus:border-[#FFD600] outline-none transition-colors w-full resize-none"></textarea>
              <button className="w-full bg-[#FFD600] text-black font-bold uppercase tracking-widest py-5 rounded-2xl flex items-center justify-center gap-3 hover:bg-white transition-colors">
                Transmit <Send className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
