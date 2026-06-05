"use client";

import { useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ArrowRight, Clock } from 'lucide-react';
import { Poppins, Montserrat, Bebas_Neue } from 'next/font/google';

gsap.registerPlugin(ScrollTrigger);

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });
const montserrat = Montserrat({ subsets: ['latin'], weight: ['400', '500', '700', '900'] });
const bebas = Bebas_Neue({ subsets: ['latin'], weight: ['400'] });

export default function BlogPage() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from('.blog-card', {
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      scrollTrigger: {
        trigger: '.blog-grid',
        start: 'top 80%',
      }
    });
  }, { scope: container });

  const posts = [
    { title: "The Science of Hypertrophy", img: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop", tag: "Training", read: "5 min" },
    { title: "Optimizing Macronutrients for Power", img: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=2053&auto=format&fit=crop", tag: "Nutrition", read: "8 min" },
    { title: "Recovery: The Unsung Hero of Gains", img: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=2070&auto=format&fit=crop", tag: "Recovery", read: "6 min" }
  ];

  return (
    <div ref={container} className={`bg-[#0A0A0A] min-h-screen text-white pt-32 pb-32 ${poppins.className}`}>
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-20"
        >
          <h1 className={`text-6xl md:text-8xl mb-4 ${bebas.className}`}>THE <span className="text-[#FFD600]">INTEL</span></h1>
          <p className="text-gray-400 text-xl border-l-2 border-[#FFD600] pl-4">Cutting-edge research and tactical knowledge.</p>
        </motion.div>

        <div className="blog-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {posts.map((post, i) => (
            <div key={i} className="blog-card group cursor-pointer">
              <div className="relative h-72 rounded-[30px] overflow-hidden mb-6 border border-white/10 group-hover:border-[#FFD600]/50 transition-colors duration-500">
                <img src={post.img} alt={post.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute top-4 left-4 bg-[#FFD600] text-black text-xs font-bold uppercase tracking-wider px-4 py-1 rounded-full">
                  {post.tag}
                </div>
              </div>
              <div className="flex items-center text-gray-500 text-sm mb-3 gap-2">
                <Clock className="w-4 h-4" /> {post.read} Read
              </div>
              <h3 className={`text-2xl font-bold mb-4 group-hover:text-[#FFD600] transition-colors ${montserrat.className}`}>{post.title}</h3>
              <p className="text-gray-400 mb-4 line-clamp-2">Discover the latest methodologies behind optimizing human performance and breaking through plateaus.</p>
              <div className="flex items-center text-[#FFD600] font-bold uppercase tracking-widest text-sm group-hover:translate-x-2 transition-transform">
                Read Full Intel <ArrowRight className="w-4 h-4 ml-2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
