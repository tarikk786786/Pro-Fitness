'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, MessageSquare, AlertCircle, Send, CheckCircle, Search, Clock, Lock } from 'lucide-react';
import gsap from 'gsap';

// Mock Data
const supportTickets = [
  { id: 'TKT-001', subject: 'Equipment issue on 3rd floor', status: 'In Progress', date: '2026-06-03', type: 'General' },
  { id: 'TKT-002', subject: 'Billing inquiry', status: 'Resolved', date: '2026-06-01', type: 'Billing' },
];

export default function SupportDashboard() {
  const [activeTab, setActiveTab] = useState<'support' | 'safety'>('support');
  const [formData, setFormData] = useState({ subject: '', description: '', anonymous: false });
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    gsap.fromTo(
      '.support-card',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out' }
    );
  }, [activeTab]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ subject: '', description: '', anonymous: false });
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white p-8 font-sans selection:bg-[#FFD600] selection:text-black">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
          Support & <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFD600] to-yellow-600">Reporting</span>
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl">
          We are committed to providing a safe, respectful, and premium environment. Reach out for general assistance or confidentially report safety concerns.
        </p>
      </motion.div>

      {/* Tabs */}
      <div className="flex space-x-4 mb-8 bg-white/5 p-1.5 rounded-2xl backdrop-blur-xl border border-white/10 w-fit">
        <button
          onClick={() => setActiveTab('support')}
          className={`flex items-center px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
            activeTab === 'support' 
              ? 'bg-[#FFD600] text-black shadow-[0_0_20px_rgba(255,214,0,0.3)]' 
              : 'text-gray-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <MessageSquare className="w-4 h-4 mr-2" />
          General Support
        </button>
        <button
          onClick={() => setActiveTab('safety')}
          className={`flex items-center px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
            activeTab === 'safety' 
              ? 'bg-red-500/10 text-red-500 border border-red-500/50 shadow-[0_0_20px_rgba(239,68,68,0.2)]' 
              : 'text-gray-400 hover:text-red-400 hover:bg-white/5'
          }`}
        >
          <Shield className="w-4 h-4 mr-2" />
          Safety Reporting
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.4 }}
              className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 relative overflow-hidden"
            >
              {/* Subtle background glow */}
              <div className={`absolute -top-40 -right-40 w-80 h-80 rounded-full blur-[100px] opacity-20 pointer-events-none ${activeTab === 'safety' ? 'bg-red-500' : 'bg-[#FFD600]'}`} />

              <h2 className="text-2xl font-bold mb-6 flex items-center">
                {activeTab === 'support' ? (
                  <>Create a Support Ticket</>
                ) : (
                  <><Lock className="w-5 h-5 mr-3 text-red-500" /> Confidential Safety Report</>
                )}
              </h2>

              {activeTab === 'safety' && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 mb-6 flex items-start">
                  <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 mr-3 flex-shrink-0" />
                  <p className="text-sm text-red-200">
                    This channel is strictly confidential. Reports are sent directly to the executive safety team. You may choose to remain completely anonymous.
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Subject / Category</label>
                  <input 
                    type="text" 
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-[#FFD600] transition-all"
                    placeholder={activeTab === 'support' ? "E.g., Membership inquiry" : "Brief description of incident"}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Details</label>
                  <textarea 
                    required
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-[#FFD600] transition-all h-32 resize-none"
                    placeholder="Please provide as much detail as possible..."
                  />
                </div>

                {activeTab === 'safety' && (
                  <label className="flex items-center space-x-3 cursor-pointer group w-fit">
                    <div className="relative flex items-center justify-center">
                      <input 
                        type="checkbox" 
                        className="peer sr-only"
                        checked={formData.anonymous}
                        onChange={(e) => setFormData({...formData, anonymous: e.target.checked})}
                      />
                      <div className="w-5 h-5 border-2 border-gray-500 rounded flex items-center justify-center peer-checked:bg-red-500 peer-checked:border-red-500 transition-colors">
                        <CheckCircle className="w-3 h-3 text-white opacity-0 peer-checked:opacity-100" strokeWidth={4} />
                      </div>
                    </div>
                    <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">Submit anonymously</span>
                  </label>
                )}

                <button 
                  type="submit"
                  disabled={isSubmitted}
                  className={`w-full py-4 rounded-xl font-bold flex items-center justify-center transition-all duration-300 ${
                    isSubmitted 
                      ? 'bg-green-500/20 text-green-400 border border-green-500/50' 
                      : activeTab === 'support'
                        ? 'bg-[#FFD600] text-black hover:shadow-[0_0_30px_rgba(255,214,0,0.4)] hover:scale-[1.02]'
                        : 'bg-red-500/20 text-red-400 border border-red-500/50 hover:bg-red-500/30 hover:shadow-[0_0_30px_rgba(239,68,68,0.3)] hover:scale-[1.02]'
                  }`}
                >
                  {isSubmitted ? (
                    <><CheckCircle className="w-5 h-5 mr-2" /> Received</>
                  ) : (
                    <><Send className="w-5 h-5 mr-2" /> Submit {activeTab === 'support' ? 'Ticket' : 'Report'}</>
                  )}
                </button>
              </form>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="support-card bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold">Recent Tickets</h3>
              <Search className="w-4 h-4 text-gray-400" />
            </div>
            
            <div className="space-y-4">
              {supportTickets.map((ticket) => (
                <div key={ticket.id} className="p-4 rounded-2xl bg-black/40 border border-white/5 hover:border-white/10 transition-colors cursor-pointer group">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-mono text-gray-500">{ticket.id}</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      ticket.status === 'Resolved' ? 'bg-green-500/10 text-green-400' : 'bg-[#FFD600]/10 text-[#FFD600]'
                    }`}>
                      {ticket.status}
                    </span>
                  </div>
                  <h4 className="text-sm font-semibold text-gray-200 group-hover:text-[#FFD600] transition-colors mb-2">
                    {ticket.subject}
                  </h4>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{ticket.type}</span>
                    <span className="flex items-center"><Clock className="w-3 h-3 mr-1" /> {ticket.date}</span>
                  </div>
                </div>
              ))}
            </div>
            
            <button className="w-full mt-6 py-3 rounded-xl border border-white/10 text-sm font-semibold text-gray-400 hover:text-white hover:bg-white/5 transition-all">
              View All History
            </button>
          </div>

          <div className="support-card bg-gradient-to-br from-black to-[#1a1a1a] border border-white/10 rounded-3xl p-6 text-center">
            <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/10">
              <MessageSquare className="w-6 h-6 text-[#FFD600]" />
            </div>
            <h3 className="text-lg font-bold mb-2">Live Chat Support</h3>
            <p className="text-sm text-gray-400 mb-6">
              Need immediate assistance? Our support team is online 24/7.
            </p>
            <button className="w-full py-3 rounded-xl bg-white text-black font-bold hover:bg-gray-200 transition-colors">
              Start Chat
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
