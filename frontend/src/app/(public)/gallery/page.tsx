"use client";

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Poppins, Montserrat, Bebas_Neue } from 'next/font/google';
import MasonryGallery from '@/components/media/MasonryGallery';

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });
const montserrat = Montserrat({ subsets: ['latin'], weight: ['400', '500', '700', '900'] });
const bebas = Bebas_Neue({ subsets: ['latin'], weight: ['400'] });

const mockGalleryData = [
  {
    id: "1",
    url: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070",
    type: "IMAGE" as const,
    category: "HERO_BANNER",
    caption: "Building strength, one rep at a time. #ProFitness"
  },
  {
    id: "2",
    url: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=2070",
    type: "IMAGE" as const,
    category: "FACILITIES",
    caption: "Our new functional training zone."
  },
  {
    id: "3",
    url: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=2069",
    type: "IMAGE" as const,
    category: "TRANSFORMATION",
    caption: "Incredible transformation!"
  },
  {
    id: "4",
    url: "https://images.unsplash.com/photo-1599058945522-28d584b6f4ff?q=80&w=2069",
    type: "IMAGE" as const,
    category: "TRAINERS",
    caption: "Meet Coach Vikram."
  },
  {
    id: "5",
    url: "https://cdn.coverr.co/videos/coverr-a-man-lifting-weights-in-a-gym-2849/1080p.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2070",
    type: "VIDEO" as const,
    category: "REELS",
    caption: "Deadlift form tips!"
  },
  {
    id: "6",
    url: "https://images.unsplash.com/photo-1526506159807-1c6e20926b4f?q=80&w=2070",
    type: "IMAGE" as const,
    category: "SOCIAL_PROOF",
    caption: "Sunday evening grind."
  }
];

export default function GalleryPage() {
  return (
    <div className={`bg-[#0A0A0A] min-h-screen text-white pt-32 pb-32 ${poppins.className}`}>
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

        <MasonryGallery media={mockGalleryData} />
      </div>
    </div>
  );
}
