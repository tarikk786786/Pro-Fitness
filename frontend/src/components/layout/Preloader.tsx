"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Dumbbell } from "lucide-react";

export default function Preloader() {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"loading" | "done">("loading");

  useEffect(() => {
    // Simulate cinematic load progress with realistic acceleration curve
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setPhase("done");
          setTimeout(() => setIsVisible(false), 800);
          return 100;
        }
        // Slowdown near end for dramatic effect
        const remaining = 100 - prev;
        const step = remaining > 20
          ? Math.random() * 12 + 3
          : Math.random() * 3 + 1;
        return Math.min(prev + step, 100);
      });
    }, 80);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.7, ease: [0.43, 0.13, 0.23, 0.96] }}
          className="fixed inset-0 z-[99999] bg-[#0A0A0A] flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Ambient deep glow */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <motion.div
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="w-[700px] h-[700px] bg-[#FFD600]/5 rounded-full blur-[160px]"
            />
          </div>

          {/* Secondary radial ring */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <motion.div
              initial={{ scale: 0.4, opacity: 0 }}
              animate={{ scale: 1.4, opacity: 0 }}
              transition={{ duration: 2.5, ease: "easeOut", repeat: Infinity, repeatDelay: 1 }}
              className="w-[300px] h-[300px] border border-[#FFD600]/10 rounded-full"
            />
          </div>

          {/* Logo block */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.34, 1.56, 0.64, 1] }}
            className="relative mb-14 flex flex-col items-center"
          >
            {/* Icon */}
            <div className="relative mb-6">
              <div className="w-20 h-20 bg-[#FFD600] rounded-3xl flex items-center justify-center shadow-[0_0_60px_rgba(255,214,0,0.5)]">
                <Dumbbell className="w-10 h-10 text-black" />
              </div>
              {/* Glow blur behind icon */}
              <div className="absolute inset-0 bg-[#FFD600] rounded-3xl blur-2xl opacity-30 -z-10" />
            </div>

            {/* Wordmark */}
            <div className="font-bebas text-5xl tracking-widest text-center">
              PRO<span className="text-[#FFD600]">FITNESS</span>
            </div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-gray-500 text-center text-xs tracking-[0.4em] uppercase font-montserrat mt-3"
            >
              Transform Your Life
            </motion.p>
          </motion.div>

          {/* Progress bar */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0.8 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="w-64 h-px bg-white/10 relative overflow-hidden rounded-full"
          >
            <motion.div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#FFD600] via-white to-[#FFD600] rounded-full"
              animate={{ width: `${Math.min(progress, 100)}%` }}
              transition={{ duration: 0.12, ease: "easeOut" }}
            />
            {/* Shimmer glide */}
            <motion.div
              className="absolute inset-y-0 w-12 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-full"
              animate={{ left: ["-10%", "110%"] }}
              transition={{ duration: 1.4, ease: "easeInOut", repeat: Infinity, repeatDelay: 0.2 }}
            />
          </motion.div>

          {/* Status text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-gray-600 text-xs tracking-[0.4em] uppercase font-montserrat mt-5"
          >
            {phase === "done" ? (
              <motion.span
                key="ready"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-[#FFD600]/70"
              >
                Ready
              </motion.span>
            ) : (
              <span>Loading&nbsp;·&nbsp;{Math.round(Math.min(progress, 100))}%</span>
            )}
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
