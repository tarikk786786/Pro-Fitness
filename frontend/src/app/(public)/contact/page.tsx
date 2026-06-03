"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Send } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="pt-32 pb-32 bg-black min-h-screen">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-black mb-6"
          >
            GET IN <span className="text-[#FF0033]">TOUCH</span>
          </motion.h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Have questions about our programs? Want to try a free session? Our team is here to help you start your journey.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
          {/* Contact Info */}
          <div className="space-y-8">
            <h3 className="text-3xl font-bold text-white mb-8">Contact Information</h3>
            
            <div className="flex items-start gap-6 bg-white/5 p-6 rounded-2xl border border-white/10">
              <div className="w-12 h-12 bg-[#FF0033]/20 rounded-full flex items-center justify-center flex-shrink-0">
                <MapPin className="w-6 h-6 text-[#FF0033]" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-white mb-2">Our Location</h4>
                <p className="text-gray-400">123 Elite Avenue, Cyber City<br />New Delhi, India 110001</p>
              </div>
            </div>
            
            <div className="flex items-start gap-6 bg-white/5 p-6 rounded-2xl border border-white/10">
              <div className="w-12 h-12 bg-[#00D4FF]/20 rounded-full flex items-center justify-center flex-shrink-0">
                <Phone className="w-6 h-6 text-[#00D4FF]" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-white mb-2">Phone Number</h4>
                <p className="text-gray-400">+91 98765 43210<br />+91 11 2345 6789</p>
              </div>
            </div>
            
            <div className="flex items-start gap-6 bg-white/5 p-6 rounded-2xl border border-white/10">
              <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                <Mail className="w-6 h-6 text-purple-500" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-white mb-2">Email Address</h4>
                <p className="text-gray-400">support@profitness.ai<br />careers@profitness.ai</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white/5 p-8 rounded-[32px] border border-white/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF0033]/10 blur-[80px] rounded-full"></div>
            
            <h3 className="text-3xl font-bold text-white mb-8 relative z-10">Send us a Message</h3>
            
            <form className="space-y-6 relative z-10" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">First Name</label>
                  <input type="text" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#FF0033] transition-colors" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Last Name</label>
                  <input type="text" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#FF0033] transition-colors" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Email Address</label>
                <input type="email" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#FF0033] transition-colors" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Subject</label>
                <input type="text" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#FF0033] transition-colors" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Message</label>
                <textarea rows={4} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#FF0033] transition-colors resize-none"></textarea>
              </div>
              
              <button type="submit" className="w-full bg-[#FF0033] text-white font-bold rounded-xl py-4 flex items-center justify-center gap-2 hover:bg-white hover:text-black transition-colors">
                Send Message <Send className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
