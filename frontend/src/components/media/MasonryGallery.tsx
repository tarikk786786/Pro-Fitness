'use client';

import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Play } from 'lucide-react';
import Lightbox from './Lightbox';
import Image from 'next/image';

export interface MediaItem {
  id: string;
  url: string;
  type: 'IMAGE' | 'VIDEO';
  category: string;
  caption: string;
  thumbnail?: string;
}

interface MasonryGalleryProps {
  media: MediaItem[];
}

const CATEGORIES = ['All', 'About', 'Facilities', 'Events', 'Trainers'];

export default function MasonryGallery({ media }: MasonryGalleryProps) {
  const [filter, setFilter] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    if (!galleryRef.current) return;
    
    const items = galleryRef.current.querySelectorAll('.masonry-item');
    
    if (items.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(items, 
        { opacity: 0, y: 30 },
        {
          opacity: 1, 
          y: 0,
          stagger: 0.05,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: galleryRef.current,
            start: 'top 85%',
          }
        }
      );
    }, galleryRef);

    return () => ctx.revert();
  }, [filter, media]);

  const filteredMedia = media.filter(item => filter === 'All' || item.category === filter);

  return (
    <div className="w-full">
      {/* Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-10 sm:mb-16">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-5 sm:px-8 py-2.5 sm:py-3 rounded-full text-sm font-semibold transition-all duration-300 backdrop-blur-md ${
              filter === cat 
                ? 'bg-[#FFD600] text-black shadow-[0_0_20px_rgba(255,214,0,0.3)] border border-[#FFD600]' 
                : 'bg-white/5 text-white hover:bg-white/10 border border-white/10'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Masonry Grid */}
      <div ref={galleryRef} className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
        {filteredMedia.map((item) => (
          <div 
            key={item.id} 
            className="masonry-item break-inside-avoid relative group cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-white/5 transform transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,214,0,0.15)] hover:border-white/20"
            onClick={() => setLightboxIndex(media.findIndex(m => m.id === item.id))}
          >
            {item.type === 'VIDEO' ? (
              <div className="relative w-full">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <Image 
                  src={item.thumbnail || item.url} 
                  alt={item.caption} 
                  width={800}
                  height={800}
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  loading="lazy"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center border border-white/20 group-hover:bg-[#FFD600] group-hover:border-[#FFD600] transition-all duration-300">
                    <Play className="w-6 h-6 text-white group-hover:text-black ml-1" fill="currentColor" />
                  </div>
                </div>
              </div>
            ) : (
              <Image 
                src={item.url} 
                alt={item.caption} 
                width={800}
                height={800}
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                loading="lazy"
              />
            )}
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <span className="inline-block px-3 py-1 bg-[#FFD600]/90 text-black text-xs font-bold rounded-full mb-3 shadow-lg">
                  {item.category}
                </span>
                <p className="text-white font-medium line-clamp-2 drop-shadow-md">{item.caption}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Lightbox 
        isOpen={lightboxIndex !== null}
        media={media} 
        initialIndex={lightboxIndex ?? 0} 
        onClose={() => setLightboxIndex(null)} 
      />
    </div>
  );
}
