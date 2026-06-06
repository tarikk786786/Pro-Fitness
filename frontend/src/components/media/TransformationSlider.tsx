'use client';

import React, { useState, useRef, useEffect, MouseEvent as ReactMouseEvent, TouchEvent as ReactTouchEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import Image from 'next/image';

export interface TransformationItem {
  id: string;
  beforeUrl: string;
  afterUrl: string;
  name: string;
  story: string;
}

interface TransformationSliderProps {
  transformations: TransformationItem[];
}

export default function TransformationSlider({ transformations }: TransformationSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!transformations || transformations.length === 0) return null;

  const next = () => setCurrentIndex((prev) => (prev === transformations.length - 1 ? 0 : prev + 1));
  const prev = () => setCurrentIndex((prev) => (prev === 0 ? transformations.length - 1 : prev - 1));

  return (
    <section className="py-16 bg-[#0A0A0A] text-white">
      <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
        <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">
              Real <span className="text-[#FFD600]">Results</span>
            </h2>
            <p className="text-gray-400 max-w-xl">
              See the incredible transformations of our members. Drag the slider to compare before and after.
            </p>
          </div>
          <div className="flex gap-4">
            <button
              onClick={prev}
              className="p-3 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-colors text-white"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={next}
              className="p-3 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-colors text-white"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-3xl bg-white/5 border border-white/10 p-4 md:p-8 shadow-2xl backdrop-blur-xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
              style={{ willChange: "transform, opacity" }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center"
            >
              <div className="order-2 lg:order-1 flex flex-col justify-center">
                <Quote className="w-12 h-12 text-[#FFD600]/20 mb-6" />
                <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-8 italic">
                  "{transformations[currentIndex].story}"
                </p>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-1">
                    {transformations[currentIndex].name}
                  </h3>
                  <p className="text-[#FFD600] font-medium">Pro Fitness Member</p>
                </div>
              </div>

              <div className="order-1 lg:order-2">
                <BeforeAfterImage
                  before={transformations[currentIndex].beforeUrl}
                  after={transformations[currentIndex].afterUrl}
                />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function BeforeAfterImage({ before, after }: { before: string; after: string }) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percentage = (x / rect.width) * 100;
    setSliderPosition(percentage);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      handleMove(e.clientX);
    }
  };
  
  const handleTouchMove = (e: TouchEvent) => {
    if (isDragging) {
      handleMove(e.touches[0].clientX);
    }
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', () => setIsDragging(false));
      window.addEventListener('touchmove', handleTouchMove, { passive: false });
      window.addEventListener('touchend', () => setIsDragging(false));
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', () => setIsDragging(false));
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', () => setIsDragging(false));
    };
  }, [isDragging]);

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-[4/5] md:aspect-square rounded-2xl overflow-hidden cursor-ew-resize select-none bg-black/20"
      onMouseDown={(e: ReactMouseEvent) => {
        setIsDragging(true);
        handleMove(e.clientX);
      }}
      onTouchStart={(e: ReactTouchEvent) => {
        setIsDragging(true);
        handleMove(e.touches[0].clientX);
      }}
    >
      <Image
        src={after}
        alt="After transformation"
        fill
        sizes="(max-width: 1024px) 100vw, 50vw"
        className="object-cover pointer-events-none"
      />

      <div
        className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <Image
          src={before}
          alt="Before transformation"
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover pointer-events-none"
        />
      </div>

      <div
        className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize flex items-center justify-center shadow-[0_0_10px_rgba(0,0,0,0.5)]"
        style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
      >
        <div className="w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center absolute left-1/2 -translate-x-1/2">
          <div className="flex gap-1">
            <ChevronLeft className="w-3 h-3 text-black" />
            <ChevronRight className="w-3 h-3 text-black" />
          </div>
        </div>
      </div>

      <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase text-white/90 shadow-md">
        Before
      </div>
      <div className="absolute top-4 right-4 bg-[#FFD600]/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase text-black shadow-md">
        After
      </div>
    </div>
  );
}
