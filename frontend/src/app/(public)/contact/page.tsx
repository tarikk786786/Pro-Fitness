"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Clock } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#111111] text-white pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            Get In <span className="text-[#FFD600]">Touch</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-400 max-w-2xl mx-auto"
          >
            Ready to start your fitness journey? Drop by the gym or send us a message.
            We're here to help you transform your life.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Contact Info & Map */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-8"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur-md">
                <MapPin className="w-8 h-8 text-[#FFD600] mb-4" />
                <h3 className="text-xl font-semibold mb-2">Location</h3>
                <p className="text-gray-400 text-sm">Sunnat, Balasore</p>
                <p className="text-gray-400 text-sm">Odisha - 756001</p>
              </div>
              
              <div className="bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur-md">
                <Clock className="w-8 h-8 text-[#FFD600] mb-4" />
                <h3 className="text-xl font-semibold mb-2">Timings</h3>
                <p className="text-gray-400 text-sm">Morning: 6 AM - 10 AM</p>
                <p className="text-gray-400 text-sm">Evening: 4 PM - 10 PM</p>
                <p className="text-[#FFD600] text-sm mt-1 font-medium">Sunday Closed</p>
              </div>

              <div className="bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur-md sm:col-span-2">
                <Phone className="w-8 h-8 text-[#FFD600] mb-4" />
                <h3 className="text-xl font-semibold mb-2">Call Us</h3>
                <p className="text-gray-400 text-sm">+91 91144 11026</p>
              </div>
            </div>

            {/* Dummy Google Map */}
            <div className="w-full h-[300px] rounded-2xl overflow-hidden border border-white/10 bg-[#1a1a1a]">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d118939.98069354058!2d86.85292445820313!3d21.493863499999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a1c3df1921c54bd%3A0xcf8242f3612f0c!2sBalasore%2C%20Odisha!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={false} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
              ></iframe>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/5 p-8 rounded-2xl border border-white/10 backdrop-blur-md h-fit"
          >
            <h2 className="text-2xl font-bold mb-6">Send a Message</h2>
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                <input 
                  type="text" 
                  id="name" 
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#FFD600] transition-colors"
                  placeholder="John Doe"
                />
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">Phone Number</label>
                <input 
                  type="tel" 
                  id="phone" 
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#FFD600] transition-colors"
                  placeholder="+91 XXXXX XXXXX"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">Message</label>
                <textarea 
                  id="message" 
                  rows={4}
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#FFD600] transition-colors resize-none"
                  placeholder="How can we help you?"
                ></textarea>
              </div>

              <button 
                type="submit" 
                className="w-full bg-[#FFD600] text-black font-bold py-4 rounded-lg hover:bg-[#e6c100] transition-colors focus:outline-none focus:ring-2 focus:ring-[#FFD600] focus:ring-offset-2 focus:ring-offset-[#111111]"
              >
                Send Message
              </button>
            </form>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
