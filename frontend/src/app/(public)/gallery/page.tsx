"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Camera, Loader2 } from "lucide-react";

// Mock API function to simulate fetching Instagram posts
const fetchInstagramPosts = async () => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1500));
  
  // In a real scenario, this would call Instagram Graph API:
  // `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,permalink,thumbnail_url&access_token=${ACCESS_TOKEN}`
  
  // For now, return mock data
  // Using some random fitness images from unsplash for mock
  return [
    { id: '1', media_url: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1000', permalink: '#', media_type: 'IMAGE' },
    { id: '2', media_url: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1000', permalink: '#', media_type: 'IMAGE' },
    { id: '3', media_url: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1000', permalink: '#', media_type: 'IMAGE' },
    { id: '4', media_url: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=1000', permalink: '#', media_type: 'IMAGE' },
    { id: '5', media_url: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=1000', permalink: '#', media_type: 'IMAGE' },
    { id: '6', media_url: 'https://images.unsplash.com/photo-1558611848-73f7eb4001a1?q=80&w=1000', permalink: '#', media_type: 'IMAGE' },
    { id: '7', media_url: 'https://images.unsplash.com/photo-1605296867304-46d5465a13f1?q=80&w=1000', permalink: '#', media_type: 'IMAGE' },
    { id: '8', media_url: 'https://images.unsplash.com/photo-1536922246289-88c42f95e611?q=80&w=1000', permalink: '#', media_type: 'IMAGE' },
    { id: '9', media_url: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=1000', permalink: '#', media_type: 'IMAGE' },
  ];
};

// Fallback images (Admin uploads)
const adminFallbackImages = [
  { id: 'f1', media_url: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1000' },
  { id: 'f2', media_url: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1000' },
  { id: 'f3', media_url: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1000' },
  { id: 'f4', media_url: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=1000' },
];

export default function GalleryPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInstagramPosts()
      .then(data => {
        if (data && data.length > 0) {
          setPosts(data);
        } else {
          setPosts(adminFallbackImages);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch Instagram posts, using fallback", err);
        setPosts(adminFallbackImages);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="pt-32 pb-32 bg-black min-h-screen text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-black mb-6 uppercase tracking-tighter"
          >
            OUR <span className="text-[#FFD700]">GALLERY</span>
          </motion.h1>
          <motion.a 
            href="https://instagram.com/profitness.balasore"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 text-gray-400 hover:text-[#FFD700] transition-colors group"
          >
            <Camera className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span className="font-bold tracking-wider uppercase text-sm">@profitness.balasore</span>
          </motion.a>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="w-10 h-10 text-[#FFD700] animate-spin" />
          </div>
        ) : (
          <div className="columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4 max-w-7xl mx-auto">
            {posts.map((post, i) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="break-inside-avoid relative group rounded-2xl overflow-hidden bg-white/5"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={post.media_url}
                  alt="Gallery image"
                  className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                
                {post.permalink && (
                  <a 
                    href={post.permalink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm"
                  >
                    <div className="flex flex-col items-center gap-3">
                      <Camera className="w-8 h-8 text-[#FFD700]" />
                      <span className="text-white font-bold uppercase tracking-widest text-sm border border-[#FFD700] px-6 py-2 rounded-full hover:bg-[#FFD700] hover:text-black transition-colors">
                        View on Instagram
                      </span>
                    </div>
                  </a>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
