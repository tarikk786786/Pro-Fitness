"use client";

import Link from "next/link";
import { Dumbbell, Mail, MapPin, Phone, ArrowRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#050505] border-t border-white/10 pt-20 pb-10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-6">
              <Dumbbell className="w-8 h-8 text-[#FFD600]" />
              <span className="text-2xl font-black tracking-wider text-white">
                PRO<span className="text-[#FFD600]">FITNESS</span>
              </span>
            </Link>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Transform Your Body. Transform Your Life. The ultimate AI-powered luxury fitness ecosystem designed for your peak performance.
            </p>
            <div className="flex items-center gap-4">
              {/* Social icons temporarily removed due to icon library update */}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold text-white mb-6 uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-4">
              <FooterLink href="/about">About Us</FooterLink>
              <FooterLink href="/membership">Membership Plans</FooterLink>
              <FooterLink href="/trainers">Our Trainers</FooterLink>
              <FooterLink href="/classes">Class Schedule</FooterLink>
              <FooterLink href="/ai-tools">AI Fitness Tools</FooterLink>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-bold text-white mb-6 uppercase tracking-wider">Services</h4>
            <ul className="space-y-4">
              <FooterLink href="/services/personal-training">Personal Training</FooterLink>
              <FooterLink href="/services/ai-nutrition">AI Nutrition Planning</FooterLink>
              <FooterLink href="/services/group-classes">Group Classes</FooterLink>
              <FooterLink href="/services/transformation">Body Transformation</FooterLink>
              <FooterLink href="/services/spa">Recovery & Spa</FooterLink>
            </ul>
          </div>

          {/* Newsletter & Contact */}
          <div>
            <h4 className="text-lg font-bold text-white mb-6 uppercase tracking-wider">Join Newsletter</h4>
            <p className="text-gray-400 mb-4 text-sm">Subscribe for fitness tips, recipes, and exclusive offers.</p>
            <form className="flex mb-8 relative" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full bg-white/5 border border-white/10 rounded-full py-3 px-5 text-sm text-white focus:outline-none focus:border-[#FF0033] transition-colors"
              />
              <button 
                type="submit"
                className="absolute right-1 top-1 bottom-1 bg-[#FFD600] hover:bg-white text-black p-2 rounded-full transition-colors flex items-center justify-center w-10 h-10"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </form>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-400 text-sm">
                <MapPin className="w-4 h-4 text-[#FFD600]" />
                <span>Balasore, Odisha - 756001</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400 text-sm">
                <Phone className="w-4 h-4 text-[#FFD600]" />
                <span>+91 91144 11026</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400 text-sm">
                <Mail className="w-4 h-4 text-[#FFD600]" />
                <span>profitnessindia@gmail.com</span>
              </div>
            </div>
          </div>

        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} PRO FITNESS. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-gray-500 text-sm hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="text-gray-500 text-sm hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({ Icon, href }: { Icon: any, href: string }) {
  return (
    <Link 
      href={href} 
      className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-[#FFD600] hover:text-black transition-all duration-300"
    >
      <Icon className="w-5 h-5" />
    </Link>
  );
}

function FooterLink({ href, children }: { href: string, children: React.ReactNode }) {
  return (
    <li>
      <Link 
        href={href} 
        className="text-gray-400 hover:text-[#00D4FF] transition-colors text-sm flex items-center gap-2 group"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-transparent group-hover:bg-[#00D4FF] transition-colors" />
        {children}
      </Link>
    </li>
  );
}
