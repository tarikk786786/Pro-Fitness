"use client";

import Link from "next/link";
import { Dumbbell, MapPin, Phone, Mail } from "lucide-react";

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Membership", href: "/membership" },
  { name: "Programs", href: "/services" },
  { name: "Contact", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="bg-[#050505] border-t border-white/5 relative overflow-hidden font-poppins">
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-10 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          
          {/* Brand & Message */}
          <div className="flex flex-col">
            <Link href="/" className="flex items-center gap-3 mb-6 w-fit">
              <div className="w-10 h-10 bg-[#FFD600] rounded-xl flex items-center justify-center">
                <Dumbbell className="w-6 h-6 text-black" />
              </div>
              <span className="font-bebas text-2xl tracking-wider text-white">
                PRO<span className="text-[#FFD600]">FITNESS</span>
              </span>
            </Link>
            <p className="text-[#FFD600] font-bold text-lg mb-4 tracking-wide">
              “Train Smart. Train Safe. Stay Consistent.”
            </p>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
              Your trusted transformation center in Balasore. We provide a professional, disciplined, and safe environment for everyone to achieve their fitness goals.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold tracking-[0.1em] text-white uppercase mb-6 border-b border-white/10 pb-2 inline-block">
              Quick Links
            </h4>
            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-[#FFD600] text-sm transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-sm font-bold tracking-[0.1em] text-white uppercase mb-6 border-b border-white/10 pb-2 inline-block">
              Contact Us
            </h4>
            <ul className="space-y-5">
              <li className="flex items-start gap-3 text-gray-400 text-sm leading-relaxed">
                <MapPin className="w-5 h-5 text-[#FFD600] flex-shrink-0 mt-0.5" />
                <span>
                  <strong>PRO FITNESS</strong><br/>
                  Sunnat, Balasore<br/>
                  Odisha – 756001<br/>
                  India
                </span>
              </li>
              <li className="flex items-center gap-3 text-gray-400 text-sm">
                <Phone className="w-5 h-5 text-[#FFD600] flex-shrink-0" />
                <span>+91 91144 11026</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400 text-sm">
                <Mail className="w-5 h-5 text-[#FFD600] flex-shrink-0" />
                <a href="mailto:profitnessindia@gmail.com" className="hover:text-[#FFD600] transition-colors">
                  profitnessindia@gmail.com
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-600 text-xs">
            © {new Date().getFullYear()} PRO FITNESS. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs text-gray-600">
            <span>Made with discipline in India</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
