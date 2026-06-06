"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Shield, Lock, EyeOff, AlertTriangle, Users, Target, ShieldCheck, Dumbbell } from "lucide-react";
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

export default function SafetyEthicsPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const sections = gsap.utils.toArray(".gsap-section") as HTMLElement[];

    sections.forEach((section) => {
      gsap.fromTo(
        section,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const values = [
    { title: "Discipline Before Distraction", desc: "We focus on the work. No loud filming, no unnecessary disruptions." },
    { title: "Respect Before Ego", desc: "Check your ego at the door. Everyone is here to improve." },
  ];

  const rules = [
    "Re-rack your weights after use.",
    "Wipe down equipment when finished.",
    "Do not drop weights from unnecessary heights.",
    "Respect personal space; do not hover over occupied machines.",
    "No tripod filming during peak hours.",
    "Use headphones; no external music.",
    "Wear appropriate and clean gym attire.",
    "Zero tolerance for unsolicited advice or staring.",
  ];

  return (
    <div ref={containerRef} className="min-h-screen bg-[#0A0A0A] text-white overflow-hidden pb-32 pt-24 font-sans">
      {/* Hero Section */}
      <section className="relative px-6 py-24 md:py-32 flex flex-col items-center justify-center text-center gsap-section">
        <div className="absolute inset-0 bg-gradient-to-b from-[#111] to-[#0A0A0A] z-0" />
        <div className="relative z-10 max-w-4xl mx-auto space-y-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#FFD600]/30 bg-[#FFD600]/10 backdrop-blur-md text-[#FFD600] font-semibold tracking-widest text-xs uppercase"
          >
            <Shield className="w-4 h-4" />
            <span>Safety & Ethics Hub</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold tracking-tight uppercase"
          >
            Professional Safety <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFD600] to-yellow-600">
              & Discipline
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto"
          >
            A dedicated environment built on a foundation of training ethics, and member respect system.
          </motion.p>
        </div>
      </section>

      {/* 1. Brand Values */}
      <section className="px-6 py-16 md:py-24 max-w-7xl mx-auto gsap-section">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 uppercase tracking-wide">Brand Values</h2>
          <div className="w-24 h-1 bg-[#FFD600] mx-auto rounded-full" />
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {values.map((val, idx) => (
            <div
              key={idx}
              className="p-8 rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-xl hover:border-[#FFD600]/30 transition-all duration-500 group"
            >
              <Target className="w-12 h-12 text-[#FFD600] mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-2xl font-bold mb-4">{val.title}</h3>
              <p className="text-gray-400 leading-relaxed">{val.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 2. Women Safety & Comfort */}
      <section className="px-6 py-16 md:py-24 bg-gradient-to-r from-[#111] to-[#0A0A0A] border-y border-white/5 gsap-section">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="w-full md:w-1/2 space-y-6">
            <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-wide">
              Women Safety <br />
              <span className="text-[#FFD600]">& Comfort</span>
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed">
              We provide an uncompromising environment where privacy and dignity are paramount. 
              <strong className="text-white font-medium ml-1">"Respect for every member is mandatory."</strong>
            </p>
            <ul className="space-y-4 pt-4">
              {[
                { icon: Lock, text: "Secure, private changing facilities" },
                { icon: EyeOff, text: "Strict zero-tolerance policy for staring" },
                { icon: ShieldCheck, text: "Staff trained in rapid response" },
              ].map((item, idx) => (
                <li key={idx} className="flex items-center gap-4 text-gray-300">
                  <div className="w-10 h-10 rounded-full bg-[#FFD600]/10 flex items-center justify-center shrink-0">
                    <item.icon className="w-5 h-5 text-[#FFD600]" />
                  </div>
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="w-full md:w-1/2">
              <div className="aspect-square md:aspect-video rounded-3xl overflow-hidden border border-white/10 relative group">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#FFD600]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
              <Image 
                src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                alt="Women Training" 
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover filter grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3. Strict Professional Environment */}
      <section className="px-6 py-16 md:py-24 max-w-7xl mx-auto gsap-section text-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-6 uppercase tracking-wide">
          Strict Professional Environment
        </h2>
        <p className="text-xl text-[#FFD600] font-medium mb-12">No harassment. No disturbance.</p>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { title: "Focus", desc: "Headphones on, world off. Let others work." },
            { title: "Conduct", desc: "Professional behavior is expected at all times." },
            { title: "Enforcement", desc: "Immediate membership revocation for violations." }
          ].map((item, idx) => (
            <div key={idx} className="p-8 rounded-2xl border border-white/5 bg-[#111] backdrop-blur-xl">
              <h4 className="text-xl font-bold mb-3">{item.title}</h4>
              <p className="text-gray-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Member Code of Conduct */}
      <section className="px-6 py-16 md:py-24 max-w-4xl mx-auto gsap-section">
        <div className="p-8 md:p-12 rounded-3xl border border-[#FFD600]/20 bg-gradient-to-b from-[#FFD600]/5 to-transparent relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#FFD600]/10 blur-[100px] rounded-full pointer-events-none" />
          
          <div className="flex items-center gap-4 mb-10">
            <Users className="w-8 h-8 text-[#FFD600]" />
            <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-wide">Code of Conduct</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-x-8 gap-y-6">
            {rules.map((rule, idx) => (
              <div key={idx} className="flex gap-4 items-start">
                <span className="text-[#FFD600] font-bold font-mono text-lg opacity-50">0{idx + 1}</span>
                <p className="text-gray-300 pt-0.5">{rule}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Training Safety System */}
      <section className="px-6 py-16 md:py-24 max-w-7xl mx-auto gsap-section">
        <div className="text-center mb-16">
          <AlertTriangle className="w-12 h-12 text-[#FFD600] mx-auto mb-6" />
          <h2 className="text-3xl md:text-5xl font-bold mb-4 uppercase tracking-wide">Training Safety System</h2>
          <p className="text-xl text-gray-400">Train smart, train safely.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: Dumbbell, title: "Equipment Maintenance", desc: "Rigorous daily checks on all machines and free weights." },
            { icon: Shield, title: "First Aid & AED", desc: "Multiple stations throughout the facility. Staff are fully certified." },
            { icon: Users, title: "Spotting Protocol", desc: "Always use a spotter for heavy lifts. Staff are available to assist." }
          ].map((item, idx) => (
            <div key={idx} className="p-8 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors">
              <div className="w-14 h-14 rounded-full bg-[#FFD600]/10 flex items-center justify-center mb-6">
                <item.icon className="w-6 h-6 text-[#FFD600]" />
              </div>
              <h3 className="text-xl font-bold mb-3">{item.title}</h3>
              <p className="text-gray-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
