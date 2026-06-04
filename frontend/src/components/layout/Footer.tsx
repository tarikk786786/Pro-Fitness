"use client";

import Link from "next/link";
import { Dumbbell, Globe, Share2, Video, ArrowUpRight, MapPin, Phone, Mail } from "lucide-react";

const footerLinks = {
  Platform: [
    { name: "AI Tools", href: "/ai-tools" },
    { name: "Workouts", href: "/services" },
    { name: "Nutrition", href: "/services" },
    { name: "Dashboard", href: "/dashboard" },
  ],
  Company: [
    { name: "About", href: "/about" },
    { name: "Trainers", href: "/trainers" },
    { name: "Blog", href: "/blog" },
    { name: "Events", href: "/contact" },
  ],
  Support: [
    { name: "Contact", href: "/contact" },
    { name: "Membership", href: "/membership" },
    { name: "FAQ", href: "/contact" },
    { name: "Privacy", href: "/contact" },
  ],
};

const socials = [
  { icon: Globe, href: "#", label: "Instagram" },
  { icon: Share2, href: "#", label: "Twitter / X" },
  { icon: Video, href: "#", label: "YouTube" },
];

const contactDetails = [
  { icon: MapPin, text: "Balasore, Odisha — 756001" },
  { icon: Phone, text: "+91 91144 11026" },
  { icon: Mail, text: "profitnessindia@gmail.com" },
];

export default function Footer() {
  return (
    <footer className="bg-[#050505] border-t border-white/5 relative overflow-hidden font-poppins">
      {/* Ambient floor glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-[#FFD600]/3 blur-[130px] rounded-full pointer-events-none" />
      {/* Left accent glow */}
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-[#FFD600]/2 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 pt-20 pb-10 relative z-10">
        {/* ── Top grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-6 group w-fit">
              <div className="relative">
                <div className="w-10 h-10 bg-[#FFD600] rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(255,214,0,0.3)] group-hover:shadow-[0_0_40px_rgba(255,214,0,0.5)] transition-all duration-300">
                  <Dumbbell className="w-6 h-6 text-black" />
                </div>
                <div className="absolute inset-0 bg-[#FFD600] rounded-xl blur-xl opacity-20 group-hover:opacity-50 transition-opacity pointer-events-none" />
              </div>
              <span className="font-bebas text-2xl tracking-wider">
                PRO<span className="text-[#FFD600]">FITNESS</span>
              </span>
            </Link>

            <p className="text-gray-500 text-sm leading-relaxed max-w-xs mb-6">
              The world&apos;s most advanced AI-powered fitness platform. Professional guidance, elite training, real transformation.
            </p>

            {/* Contact details */}
            <ul className="space-y-2 mb-8">
              {contactDetails.map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-center gap-2.5 text-gray-500 text-xs">
                  <Icon className="w-3.5 h-3.5 text-[#FFD600] flex-shrink-0" />
                  <span>{text}</span>
                </li>
              ))}
            </ul>

            {/* Social icons */}
            <div className="flex gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center text-gray-500 hover:text-[#FFD600] hover:border-[#FFD600]/30 hover:bg-[#FFD600]/5 transition-all duration-300"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-xs font-bold tracking-[0.25em] text-[#FFD600] uppercase mb-5 font-montserrat">
                {category}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-500 hover:text-white transition-colors duration-300 flex items-center gap-1 group"
                    >
                      {link.name}
                      <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -translate-y-0.5 group-hover:translate-y-0 transition-all duration-200" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ── Newsletter banner ── */}
        <div className="border border-white/5 rounded-2xl p-8 mb-16 bg-white/[0.02] backdrop-blur-sm relative overflow-hidden">
          {/* Subtle inner glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#FFD600]/3 via-transparent to-transparent pointer-events-none rounded-2xl" />
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
            <div>
              <h3 className="font-bebas text-2xl tracking-wide mb-1">
                Stay in the Game
              </h3>
              <p className="text-gray-500 text-sm">
                Weekly fitness tips, AI insights, and exclusive offers.
              </p>
            </div>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex gap-3 w-full md:w-auto"
            >
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 md:w-64 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#FFD600]/50 transition-colors"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-[#FFD600] text-black font-bold rounded-xl text-sm hover:bg-white transition-all duration-300 whitespace-nowrap shadow-[0_0_20px_rgba(255,214,0,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:scale-105"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="divider-luxury mb-8" />
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-600 text-xs">
            © {new Date().getFullYear()} PRO FITNESS. All rights reserved. Built for champions.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/contact"
              className="text-gray-600 hover:text-gray-400 text-xs transition-colors"
            >
              Privacy
            </Link>
            <Link
              href="/contact"
              className="text-gray-600 hover:text-gray-400 text-xs transition-colors"
            >
              Terms
            </Link>
            <span className="text-gray-600 text-xs">Made with 💪 in India</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
