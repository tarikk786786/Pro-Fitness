'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Play, X, ChevronUp, ChevronDown, Eye } from 'lucide-react';
import { InstagramMedia } from './InstagramGallery';
import Image from 'next/image';

const modalVariants: Variants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { type: 'spring' as const, damping: 25, stiffness: 300 } 
  },
  exit: { opacity: 0, y: -50, scale: 0.95, transition: { duration: 0.2 } }
};

export default function ReelsShowcase() {
  const [reels, setReels] = useState<InstagramMedia[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeReelIndex, setActiveReelIndex] = useState<number | null>(null);

  useEffect(() => {
    const fetchReels = async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/media?category=REELS');
        if (!res.ok) throw new Error('Failed to fetch reels');
        const data = await res.json();
        const items: InstagramMedia[] = Array.isArray(data) ? data : data.items || [];
        setReels(items.filter(item => item.type === 'REEL'));
      } catch (error) {
        console.error('Error fetching reels:', error);
        // Fallback for development
        setReels([
          {
            id: 'r1',
            url: 'https://cdn.coverr.co/videos/coverr-a-man-lifting-weights-in-a-gym-2849/1080p.mp4',
            thumbnailUrl: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2070',
            caption: 'Heavy deadlifts session. Form check!',
            type: 'REEL',
            category: 'REELS',
            metadata: { likes: 4500, comments: 200 }
          },
          {
            id: 'r2',
            url: 'https://assets.mixkit.co/videos/preview/mixkit-man-lifting-a-barbell-in-a-gym-23214-large.mp4',
            thumbnailUrl: 'https://images.unsplash.com/photo-1526506159807-1c6e20926b4f?q=80&w=2070',
            caption: 'Crossfit vibes 🔥',
            type: 'REEL',
            category: 'REELS',
            metadata: { likes: 2100, comments: 150 }
          },
          {
            id: 'r3',
            url: 'https://cdn.coverr.co/videos/coverr-woman-doing-squats-in-a-gym-2852/1080p.mp4',
            thumbnailUrl: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=2070',
            caption: 'Squats all day every day.',
            type: 'REEL',
            category: 'REELS',
            metadata: { likes: 8900, comments: 400 }
          }
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchReels();
  }, []);

  const openModal = (index: number) => setActiveReelIndex(index);
  const closeModal = () => setActiveReelIndex(null);

  const nextReel = () => {
    if (activeReelIndex !== null && activeReelIndex < reels.length - 1) {
      setActiveReelIndex(activeReelIndex + 1);
    }
  };

  const prevReel = () => {
    if (activeReelIndex !== null && activeReelIndex > 0) {
      setActiveReelIndex(activeReelIndex - 1);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeReelIndex === null) return;
      if (e.key === 'ArrowDown') nextReel();
      if (e.key === 'ArrowUp') prevReel();
      if (e.key === 'Escape') closeModal();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeReelIndex, reels.length]);

  if (!loading && reels.length === 0) return null;

  return (
    <section className="py-16 bg-[#0A0A0A] text-white border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl md:text-5xl font-bebas tracking-wide uppercase">
            Featured <span className="text-[#FFD600]">Reels</span>
          </h2>
        </div>

        {loading ? (
          <div className="flex gap-4 overflow-x-auto pb-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="flex-none w-64 md:w-72 aspect-[9/16] rounded-2xl bg-white/5 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {reels.map((reel, index) => (
              <ReelCard key={reel.id} reel={reel} onClick={() => openModal(index)} />
            ))}
          </div>
        )}
      </div>

      <AnimatePresence>
        {activeReelIndex !== null && (
          <ReelModal
            reels={reels}
            activeIndex={activeReelIndex}
            onClose={closeModal}
            onNext={nextReel}
            onPrev={prevReel}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

function ReelCard({ reel, onClick }: { reel: InstagramMedia; onClick: () => void }) {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (isHovered && videoRef.current) {
      videoRef.current.play().catch(() => {});
    } else if (!isHovered && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [isHovered]);

  return (
    <div
      className="relative flex-none w-64 md:w-72 aspect-[9/16] rounded-2xl overflow-hidden cursor-pointer snap-center group border border-white/10 bg-white/5 shadow-xl transition-transform duration-300 hover:scale-[1.02]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <Image
        src={reel.thumbnailUrl || reel.url}
        alt={reel.caption}
        width={400}
        height={700}
        sizes="(max-width: 768px) 100vw, 33vw"
        loading="lazy"
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${isHovered ? 'opacity-0' : 'opacity-100'}`}
      />
      <video
        ref={videoRef}
        src={reel.url}
        muted
        loop
        playsInline
        preload="none"
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
      />
      
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-5">
        <div className="flex items-center gap-2 text-sm font-semibold mb-2 text-gray-200">
          <Eye className="w-4 h-4 text-[#FFD600]" />
          <span>{((reel.metadata?.likes || 0) / 1000).toFixed(1)}k</span>
        </div>
        <p className="text-sm line-clamp-2 text-white font-medium">{reel.caption}</p>
      </div>

      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/20">
        <div className="w-14 h-14 bg-[#FFD600] rounded-full flex items-center justify-center backdrop-blur-md shadow-[0_0_20px_rgba(255,214,0,0.4)]">
          <Play className="w-6 h-6 text-black ml-1" fill="currentColor" />
        </div>
      </div>
    </div>
  );
}

function ReelModal({
  reels,
  activeIndex,
  onClose,
  onNext,
  onPrev
}: {
  reels: InstagramMedia[];
  activeIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}) {
  const reel = reels[activeIndex];
  const videoRef = useRef<HTMLVideoElement>(null);
  
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  }, [activeIndex]);

  const handleDragEnd = (e: any, info: any) => {
    if (info.offset.y < -50) {
      onNext();
    } else if (info.offset.y > 50) {
      onPrev();
    }
  };

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ willChange: "opacity" }}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 md:top-8 md:right-8 z-[110] p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors text-white border border-white/10"
      >
        <X className="w-6 h-6" />
      </button>

      <div className="relative w-full max-w-md h-[100dvh] md:h-[90vh] flex flex-col justify-center items-center">
        {activeIndex > 0 && (
          <button
            onClick={onPrev}
            className="absolute top-4 md:top-auto md:-left-20 md:top-1/2 md:-translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors z-[110] text-white border border-white/10 shadow-lg"
          >
            <ChevronUp className="w-6 h-6 hidden md:block" />
            <ChevronUp className="w-6 h-6 md:hidden" />
          </button>
        )}

        <motion.div
          key={reel.id}
          drag="y"
          dragConstraints={{ top: 0, bottom: 0 }}
          onDragEnd={handleDragEnd}
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          style={{ willChange: "transform, opacity" }}
          className="relative w-full h-full md:aspect-[9/16] md:rounded-2xl overflow-hidden bg-black md:border border-white/10 shadow-2xl cursor-grab active:cursor-grabbing"
        >
          <video
            ref={videoRef}
            src={reel.url}
            controls
            autoPlay
            loop
            playsInline
            preload="none"
            className="w-full h-full object-contain md:object-cover bg-black"
          />
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 bg-gradient-to-t from-black/90 via-black/50 to-transparent pointer-events-none">
            <p className="text-white text-lg font-medium mb-3">{reel.caption}</p>
            <div className="flex items-center gap-2 text-gray-300">
              <Eye className="w-5 h-5 text-[#FFD600]" />
              <span className="font-medium">{(reel.metadata?.likes || 0).toLocaleString()} likes</span>
            </div>
          </div>
        </motion.div>

        {activeIndex < reels.length - 1 && (
          <button
            onClick={onNext}
            className="absolute bottom-4 md:bottom-auto md:-right-20 md:top-1/2 md:-translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors z-[110] text-white border border-white/10 shadow-lg"
          >
            <ChevronDown className="w-6 h-6 hidden md:block" />
            <ChevronDown className="w-6 h-6 md:hidden" />
          </button>
        )}
      </div>
    </motion.div>
  );
}
