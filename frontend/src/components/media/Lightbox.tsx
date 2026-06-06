'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { MediaItem } from './MasonryGallery';
import Image from 'next/image';

interface LightboxProps {
  isOpen: boolean;
  media: MediaItem[];
  initialIndex: number;
  onClose: () => void;
}

const backdropVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modalVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { type: 'spring' as const, damping: 25, stiffness: 300 }
  },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } }
};

export default function Lightbox({ isOpen, media, initialIndex, onClose }: LightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialIndex);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, initialIndex]);

  useEffect(() => {
    if (!isOpen) return;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, currentIndex, onClose, media.length]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === media.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? media.length - 1 : prev - 1));
  };

  if (media.length === 0) return null;

  const currentMedia = media[currentIndex] || media[0];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8">
          <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            style={{ willChange: "opacity" }}
            className="absolute inset-0 bg-black/90 backdrop-blur-md"
            onClick={onClose}
          />
          
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={{ willChange: "transform, opacity" }}
            className="relative w-full max-w-6xl max-h-full flex flex-col items-center justify-center z-10"
          >
            <button 
              onClick={onClose}
              className="absolute -top-12 right-0 sm:-right-12 sm:top-0 p-2 text-white/70 hover:text-white transition-colors bg-white/5 hover:bg-white/10 rounded-full backdrop-blur-md"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="relative w-full flex items-center justify-center h-[75vh] bg-black/50 border border-white/10 rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.5)]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  style={{ willChange: "transform, opacity" }}
                  className="w-full h-full flex items-center justify-center relative"
                >
                  {currentMedia.type === 'VIDEO' ? (
                    <video 
                      src={currentMedia.url}
                      controls
                      autoPlay
                      className="max-w-full max-h-full object-contain"
                    />
                  ) : (
                    <Image 
                      src={currentMedia.url} 
                      alt={currentMedia.caption} 
                      fill
                      sizes="100vw"
                      className="object-contain"
                    />
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="mt-6 w-full flex flex-col sm:flex-row items-center justify-between gap-4">
              <button 
                onClick={handlePrev}
                className="hidden sm:flex p-3 text-white/70 hover:text-[#FFD600] transition-colors bg-white/5 hover:bg-white/10 rounded-full backdrop-blur-md border border-white/5"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              
              <div className="text-center px-4">
                <span className="inline-block px-3 py-1 bg-[#FFD600]/20 text-[#FFD600] border border-[#FFD600]/30 text-xs font-bold rounded-full mb-2">
                  {currentMedia.category}
                </span>
                <p className="text-white text-lg font-medium">{currentMedia.caption}</p>
                <p className="text-white/50 text-sm mt-1">{currentIndex + 1} / {media.length}</p>
              </div>

              <div className="flex sm:hidden gap-4">
                <button 
                  onClick={handlePrev}
                  className="p-3 text-white/70 hover:text-[#FFD600] transition-colors bg-white/5 hover:bg-white/10 rounded-full backdrop-blur-md border border-white/5"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button 
                  onClick={handleNext}
                  className="p-3 text-white/70 hover:text-[#FFD600] transition-colors bg-white/5 hover:bg-white/10 rounded-full backdrop-blur-md border border-white/5"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>

              <button 
                onClick={handleNext}
                className="hidden sm:flex p-3 text-white/70 hover:text-[#FFD600] transition-colors bg-white/5 hover:bg-white/10 rounded-full backdrop-blur-md border border-white/5"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
