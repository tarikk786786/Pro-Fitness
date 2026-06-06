'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Heart, MessageCircle } from 'lucide-react';

import Image from 'next/image';

export interface InstagramMedia {
  id: string;
  url: string;
  type: 'IMAGE' | 'CAROUSEL' | 'REEL';
  category: string;
  thumbnailUrl?: string;
  caption: string;
  metadata: {
    likes: number;
    comments: number;
  };
}

const CATEGORIES = ['All', 'Hero', 'Facilities', 'Workout', 'Transformation', 'Events', 'Trainers', 'Social Proof'];

export default function InstagramGallery() {
  const [mediaItems, setMediaItems] = useState<InstagramMedia[]>([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/media');
        if (!res.ok) throw new Error('Failed to fetch media');
        const data = await res.json();
        // Assuming data is an array or data.items
        setMediaItems(Array.isArray(data) ? data : data.items || []);
      } catch (error) {
        console.error('Error fetching media:', error);
        // Fallback for development if API is missing
        setMediaItems([
          {
            id: '1',
            url: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1470',
            type: 'IMAGE',
            category: 'Hero',
            caption: 'Push your limits. Every single day.',
            metadata: { likes: 1245, comments: 89 }
          },
          {
            id: '2',
            url: 'https://images.unsplash.com/photo-1571019614242-c5c5adee9f50?q=80&w=1470',
            type: 'IMAGE',
            category: 'Facilities',
            caption: 'Our new elite equipment has arrived.',
            metadata: { likes: 856, comments: 42 }
          },
          {
            id: '3',
            url: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=1469',
            type: 'IMAGE',
            category: 'Workout',
            caption: 'Leg day motivation.',
            metadata: { likes: 2341, comments: 156 }
          },
          {
            id: '4',
            url: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1470',
            type: 'IMAGE',
            category: 'Transformation',
            caption: 'Client transformation of the week!',
            metadata: { likes: 4521, comments: 342 }
          },
          {
            id: '5',
            url: 'https://images.unsplash.com/photo-1526506159807-1c6e20926b4f?q=80&w=1470',
            type: 'IMAGE',
            category: 'Social Proof',
            caption: 'Join our growing community.',
            metadata: { likes: 1892, comments: 76 }
          },
          {
            id: '6',
            url: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=1470',
            type: 'IMAGE',
            category: 'Facilities',
            caption: 'Clean, safe, and professional environment.',
            metadata: { likes: 982, comments: 24 }
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchMedia();
  }, []);

  const filteredMedia = activeCategory === 'All' 
    ? mediaItems.filter(m => m.type !== 'REEL') 
    : mediaItems.filter(m => m.category === activeCategory && m.type !== 'REEL');

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 300, damping: 24 } },
    exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2 } }
  };

  return (
    <section className="py-24 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-[#FFD600] text-xs font-bold tracking-[0.35em] uppercase font-montserrat mb-4"
          >
            Gym Life & Social Proof
          </motion.p>
          <h2 className="font-bebas text-5xl md:text-7xl text-white tracking-wide uppercase mb-8">
            Follow The <span className="text-[#FFD600]">Journey</span>
          </h2>

          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {CATEGORIES.map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === category
                    ? 'bg-[#FFD600] text-black shadow-[0_0_15px_rgba(255,214,0,0.4)]'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-10 h-10 border-4 border-[#FFD600] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredMedia.map(item => (
                <motion.div
                  key={item.id}
                  layout
                  variants={itemVariants}
                  initial="hidden"
                  animate="show"
                  exit="exit"
                  style={{ willChange: "transform, opacity" }}
                  className="relative group overflow-hidden rounded-2xl bg-white/5 break-inside-avoid border border-white/10"
                >
                  <div className="aspect-w-1 aspect-h-1 w-full">
                    <Image
                      src={item.thumbnailUrl || item.url}
                      alt={item.caption || 'Instagram Post'}
                      width={800}
                      height={800}
                      className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      loading="lazy"
                    />
                  </div>
                  
                  <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center p-6 text-center backdrop-blur-sm">
                    <p className="text-white text-sm font-medium line-clamp-3 mb-6">
                      {item.caption}
                    </p>
                    <div className="flex items-center gap-6 text-[#FFD600] font-semibold">
                      <div className="flex items-center gap-2">
                        <Heart className="w-5 h-5 fill-current" />
                        <span>{item.metadata.likes.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MessageCircle className="w-5 h-5 fill-current" />
                        <span>{item.metadata.comments.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
        
        {filteredMedia.length === 0 && !loading && (
          <div className="text-center py-20 text-gray-500">
            No media found for this category.
          </div>
        )}
      </div>
    </section>
  );
}
