"use client";

import { useEffect, useState, useRef } from "react";
import gsap from "gsap";

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        setIsLoading(false);
      }
    });

    // Animate progress
    tl.to(progressRef.current, {
      scaleX: 1,
      duration: 1.5,
      ease: "power3.inOut"
    });

    // Reveal logo & text
    tl.to(logoRef.current, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: "power4.out"
    }, "-=0.5");
    
    tl.to(textRef.current, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: "power4.out"
    }, "-=0.6");

    // Fade out and slide up entire preloader
    tl.to(containerRef.current, {
      yPercent: -100,
      duration: 1,
      ease: "power4.inOut",
      delay: 0.5
    });

    return () => {
      tl.kill();
    };
  }, []);

  if (!isLoading) return null;

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-brand-black overflow-hidden"
    >
      {/* Luxury Gradient Mask background */}
      <div className="absolute inset-0 opacity-20" style={{ background: "radial-gradient(circle at center, rgba(255,214,0,0.3) 0%, rgba(0,0,0,0) 70%)" }} />

      <div className="relative z-10 flex flex-col items-center overflow-hidden">
        <div ref={logoRef} className="translate-y-[100px] opacity-0 mb-4">
          <span className="text-5xl md:text-7xl font-bebas tracking-wider text-brand-white glow-white-lg">
            PRO<span className="text-brand-yellow">FITNESS</span>
          </span>
        </div>
        
        <div className="overflow-hidden">
          <div ref={textRef} className="translate-y-[50px] opacity-0 text-brand-yellow tracking-[0.3em] text-sm uppercase font-montserrat">
            Billion-Dollar Startup Standard
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 w-64 h-[1px] bg-white/10 overflow-hidden">
        <div 
          ref={progressRef}
          className="w-full h-full bg-brand-yellow origin-left scale-x-0"
        />
      </div>
    </div>
  );
}
