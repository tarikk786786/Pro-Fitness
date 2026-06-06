'use client';

import React, { useState } from 'react';
import { motion, Variants } from 'framer-motion';
import Image from 'next/image';
import { 
  Camera, 
  RefreshCw, 
  Video, 
  Play, 
  Image as ImageIcon, 
  CheckCircle, 
  EyeOff, 
  Trash2, 
  Check, 
  ShieldCheck, 
  Activity,
  ChevronDown
} from 'lucide-react';

type MediaType = 'Image' | 'Reel' | 'Video';
type MediaCategory = 'Hero Banner' | 'Gallery' | 'Transformation' | 'Reels' | 'Hidden' | 'Uncategorized';
type MediaStatus = 'Approved' | 'Pending' | 'Hidden';

interface MediaItem {
  id: number;
  type: MediaType;
  url: string;
  category: MediaCategory;
  status: MediaStatus;
}

const INITIAL_MOCK_MEDIA: MediaItem[] = [
  { id: 1, type: 'Image', url: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=400&auto=format&fit=crop', category: 'Hero Banner', status: 'Approved' },
  { id: 2, type: 'Reel', url: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=400&auto=format&fit=crop', category: 'Reels', status: 'Pending' },
  { id: 3, type: 'Video', url: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=400&auto=format&fit=crop', category: 'Gallery', status: 'Approved' },
  { id: 4, type: 'Image', url: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=400&auto=format&fit=crop', category: 'Transformation', status: 'Hidden' },
  { id: 5, type: 'Reel', url: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=400&auto=format&fit=crop', category: 'Gallery', status: 'Pending' },
  { id: 6, type: 'Image', url: 'https://images.unsplash.com/photo-1576678927484-cc907957088c?q=80&w=400&auto=format&fit=crop', category: 'Uncategorized', status: 'Pending' },
];

const CATEGORIES: MediaCategory[] = ['Hero Banner', 'Gallery', 'Transformation', 'Reels', 'Hidden', 'Uncategorized'];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 300, damping: 24 } }
};

export default function AdminMediaDashboard() {
  const [media, setMedia] = useState<MediaItem[]>(INITIAL_MOCK_MEDIA);
  const [isSyncing, setIsSyncing] = useState(false);
  const [isConnected, setIsConnected] = useState(true);

  const handleSync = () => {
    setIsSyncing(true);
    setTimeout(() => setIsSyncing(false), 1500);
  };

  const handleCategoryChange = (id: number, newCategory: MediaCategory) => {
    setMedia(media.map(item => item.id === id ? { ...item, category: newCategory } : item));
  };

  const handleStatusChange = (id: number, newStatus: MediaStatus) => {
    setMedia(media.map(item => item.id === id ? { ...item, status: newStatus } : item));
  };

  const handleDelete = (id: number) => {
    setMedia(media.filter(item => item.id !== id));
  };

  const getTypeIcon = (type: MediaType) => {
    switch (type) {
      case 'Image': return <ImageIcon className="w-4 h-4" />;
      case 'Video': return <Video className="w-4 h-4" />;
      case 'Reel': return <Play className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white p-6 md:p-10 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Header */}
        <div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Media Management</h1>
          <p className="text-gray-400">Manage and categorize your synced social media assets.</p>
        </div>

        {/* Section 1: Connection */}
        <motion.section
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring' as const, stiffness: 300, damping: 24 }}
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
        >
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-gradient-to-tr from-[#FFD600] to-orange-500 p-[2px]">
              <div className="h-full w-full rounded-full bg-[#0A0A0A] flex items-center justify-center">
                <Camera className="w-6 h-6 text-white" />
              </div>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-1 flex items-center gap-2">
                Social Account
                {isConnected && (
                  <span className="inline-flex items-center justify-center bg-green-500/20 text-green-400 text-xs px-2 py-0.5 rounded-full font-medium">
                    <Check className="w-3 h-3 mr-1" /> Active
                  </span>
                )}
              </h2>
              {isConnected ? (
                <p className="text-gray-400 text-sm">Connected as <span className="text-white font-medium">@profitness.balasore</span></p>
              ) : (
                <p className="text-gray-400 text-sm">Not connected to any account.</p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            {!isConnected ? (
              <button
                onClick={() => setIsConnected(true)}
                className="w-full md:w-auto px-6 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl font-medium transition-colors"
              >
                Connect Account
              </button>
            ) : (
              <button
                onClick={handleSync}
                disabled={isSyncing}
                className="w-full md:w-auto px-6 py-2.5 bg-[#FFD600] hover:bg-[#E6C200] text-black rounded-xl font-bold transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
                {isSyncing ? 'Syncing...' : 'Sync Latest Posts'}
              </button>
            )}
          </div>
        </motion.section>

        {/* Section 2: Media Library */}
        <section className="space-y-6">
          <div className="flex justify-between items-end">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Activity className="w-6 h-6 text-[#FFD600]" />
              Media Library
            </h2>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {media.map((item) => (
              <motion.div
                key={item.id}
                variants={itemVariants}
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden group flex flex-col"
              >
                {/* Media Thumbnail */}
                <div className="relative h-48 w-full overflow-hidden bg-black/50">
                  <Image
                    src={item.url}
                    alt={`Media ${item.id}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md px-2 py-1 rounded-lg text-xs font-medium flex items-center gap-1.5 border border-white/10">
                    {getTypeIcon(item.type)}
                    {item.type}
                  </div>

                  <div className="absolute top-3 left-3 flex gap-2">
                    {item.status === 'Approved' && (
                      <div className="bg-green-500/80 backdrop-blur-md w-7 h-7 rounded-full flex items-center justify-center border border-white/20 shadow-lg" title="Approved">
                        <ShieldCheck className="w-4 h-4 text-white" />
                      </div>
                    )}
                    {item.status === 'Hidden' && (
                      <div className="bg-zinc-500/80 backdrop-blur-md w-7 h-7 rounded-full flex items-center justify-center border border-white/20 shadow-lg" title="Hidden">
                        <EyeOff className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Content & Controls */}
                <div className="p-5 flex-1 flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs text-gray-400 font-medium uppercase tracking-wider">Category</label>
                    <div className="relative">
                      <select
                        value={item.category}
                        onChange={(e) => handleCategoryChange(item.id, e.target.value as MediaCategory)}
                        className="w-full appearance-none bg-black/40 border border-white/10 text-white rounded-xl py-2.5 pl-4 pr-10 outline-none focus:border-[#FFD600] focus:ring-1 focus:ring-[#FFD600] transition-all text-sm cursor-pointer"
                      >
                        {CATEGORIES.map(cat => (
                          <option key={cat} value={cat} className="bg-[#0A0A0A]">{cat}</option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-400">
                        <ChevronDown className="w-4 h-4" />
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-2 mt-auto border-t border-white/5 flex items-center justify-between gap-2">
                    <button
                      onClick={() => handleStatusChange(item.id, 'Approved')}
                      className={`flex-1 flex flex-col items-center justify-center py-2 rounded-lg transition-colors ${item.status === 'Approved' ? 'text-green-400 bg-green-500/10' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
                      title="Approve"
                    >
                      <CheckCircle className="w-5 h-5 mb-1" />
                      <span className="text-[10px] font-medium uppercase tracking-wider">Approve</span>
                    </button>
                    <button
                      onClick={() => handleStatusChange(item.id, 'Hidden')}
                      className={`flex-1 flex flex-col items-center justify-center py-2 rounded-lg transition-colors ${item.status === 'Hidden' ? 'text-yellow-400 bg-yellow-500/10' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
                      title="Hide"
                    >
                      <EyeOff className="w-5 h-5 mb-1" />
                      <span className="text-[10px] font-medium uppercase tracking-wider">Hide</span>
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="flex-1 flex flex-col items-center justify-center py-2 rounded-lg text-gray-400 hover:bg-red-500/10 hover:text-red-400 transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-5 h-5 mb-1" />
                      <span className="text-[10px] font-medium uppercase tracking-wider">Delete</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>
      </div>
    </div>
  );
}
