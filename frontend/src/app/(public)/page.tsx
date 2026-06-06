"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ShieldCheck, Dumbbell, Activity, CheckCircle, MapPin, Star } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function Homepage() {
  useGSAP(() => {
    // Simple fade-up reveals for sections
    const sections = gsap.utils.toArray<HTMLElement>(".reveal");
    sections.forEach((section) => {
      gsap.fromTo(
        section,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
          },
        }
      );
    });
  });

  return (
    <div className="bg-[#050505] min-h-screen font-poppins selection:bg-[#FFD600] selection:text-black">
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Image / Overlay */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop" 
            alt="Gym Background"
            fill
            className="object-cover opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-black/50" />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto mt-20">
          <span className="text-[#FFD600] font-bold tracking-widest uppercase text-sm mb-4 block reveal">
            Welcome to PRO FITNESS Balasore
          </span>
          <h1 className="font-bebas text-6xl md:text-8xl lg:text-9xl tracking-wider text-white mb-6 leading-none reveal">
            TRANSFORM YOUR BODY.<br />
            <span className="text-[#FFD600]">TRANSFORM YOUR LIFE.</span>
          </h1>
          <p className="text-gray-300 text-lg md:text-xl mb-10 max-w-2xl mx-auto reveal">
            Professional training, disciplined environment, and real fitness support at PRO FITNESS. Your journey to a healthier, stronger you starts here.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 reveal">
            <Link 
              href="/contact" 
              className="w-full sm:w-auto bg-[#FFD600] text-black font-bold uppercase tracking-widest px-8 py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-white transition-all shadow-[0_0_20px_rgba(255,214,0,0.3)]"
            >
              Join Now <ArrowRight className="w-5 h-5" />
            </Link>
            <Link 
              href="/membership" 
              className="w-full sm:w-auto bg-white/10 text-white font-bold uppercase tracking-widest px-8 py-4 rounded-xl flex items-center justify-center hover:bg-white/20 transition-all border border-white/10"
            >
              View Memberships
            </Link>
          </div>
        </div>
      </section>

      {/* 2. WHY CHOOSE US / HIGHLIGHTS */}
      <section className="py-24 px-6 relative bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 reveal">
            <h2 className="font-bebas text-5xl md:text-6xl tracking-wider text-white mb-4">
              WHY <span className="text-[#FFD600]">PRO FITNESS?</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              We focus on real results through discipline, consistency, and professional guidance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Dumbbell, title: "Modern Equipment", desc: "Train with the best fitness machines and free weights for all muscle groups." },
              { icon: Activity, title: "Professional Trainers", desc: "Expert guidance to ensure your form is correct and you reach your goals safely." },
              { icon: MapPin, title: "Prime Location", desc: "Located conveniently in Sunnat, Balasore with a clean, hygienic workout space." },
            ].map((feature, i) => (
              <div key={i} className="bg-white/5 border border-white/5 rounded-3xl p-8 hover:bg-white/10 transition-all reveal group">
                <div className="w-16 h-16 bg-[#FFD600]/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-8 h-8 text-[#FFD600]" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. LADIES SAFETY & ENVIRONMENT */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
          <div className="w-full md:w-1/2 relative h-[500px] rounded-3xl overflow-hidden reveal">
            <Image 
              src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=2070&auto=format&fit=crop" 
              alt="Women working out safely"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/20" />
          </div>
          
          <div className="w-full md:w-1/2 reveal">
            <div className="inline-flex items-center gap-2 bg-[#FFD600]/10 text-[#FFD600] px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <ShieldCheck className="w-4 h-4" />
              Professional Training Environment
            </div>
            <h2 className="font-bebas text-5xl md:text-6xl tracking-wider text-white mb-6">
              A SAFE & RESPECTFUL <br/><span className="text-[#FFD600]">SPACE FOR ALL</span>
            </h2>
            <p className="text-gray-300 text-lg mb-8 leading-relaxed">
              At PRO FITNESS, we maintain a highly disciplined atmosphere. We prioritize women's comfort and safety, ensuring a professional and secure environment so you can focus entirely on your fitness journey.
            </p>
            <ul className="space-y-4">
              {[
                "Strict professional behavior policy",
                "Dedicated trainers for proper guidance",
                "Comfortable, harassment-free workout space",
                "Respect and discipline above everything"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-gray-300">
                  <CheckCircle className="w-5 h-5 text-[#FFD600] flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 4. SIMPLE PRICING */}
      <section className="py-24 px-6 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 reveal">
            <h2 className="font-bebas text-5xl md:text-6xl tracking-wider text-white mb-4">
              SIMPLE & HONEST <span className="text-[#FFD600]">PRICING</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              No hidden fees. Just affordable fitness for everyone in Balasore.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "DAILY PASS", price: "₹200", desc: "1 Day Access", highlight: false },
              { name: "WEEKLY PLAN", price: "₹500", desc: "7 Days Access", highlight: false },
              { name: "MONTHLY PLAN", price: "₹1000", desc: "30 Days Access", highlight: false },
              { name: "ADMISSION + MONTHLY", price: "₹1500", desc: "₹500 Admission + ₹1000 Advance", highlight: true },
            ].map((plan, i) => (
              <div 
                key={i} 
                className={`rounded-3xl p-8 relative overflow-hidden transition-transform hover:-translate-y-2 reveal ${
                  plan.highlight 
                    ? "bg-gradient-to-b from-[#FFD600]/20 to-black border-2 border-[#FFD600] shadow-[0_0_30px_rgba(255,214,0,0.2)]" 
                    : "bg-white/5 border border-white/10"
                }`}
              >
                {plan.highlight && (
                  <div className="absolute top-0 inset-x-0 bg-[#FFD600] text-black text-xs font-bold uppercase tracking-widest text-center py-1">
                    Best Value
                  </div>
                )}
                <h3 className={`font-bebas text-3xl tracking-wide mb-2 ${plan.highlight ? 'mt-4 text-[#FFD600]' : 'text-gray-400'}`}>
                  {plan.name}
                </h3>
                <div className="text-5xl font-bold text-white mb-4">{plan.price}</div>
                <p className="text-gray-400 text-sm mb-8">{plan.desc}</p>
                
                <ul className="space-y-3 mb-8">
                  {["Full Gym Access", "Weight Training", "Cardio Training", "Professional Guidance", "Safe Environment"].map((feat, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm text-gray-300">
                      <CheckCircle className="w-4 h-4 text-[#FFD600]" /> {feat}
                    </li>
                  ))}
                </ul>
                
                <Link 
                  href="/contact" 
                  className={`block text-center w-full py-4 rounded-xl font-bold uppercase tracking-widest transition-colors ${
                    plan.highlight 
                      ? "bg-[#FFD600] text-black hover:bg-white" 
                      : "bg-white/10 text-white hover:bg-[#FFD600] hover:text-black"
                  }`}
                >
                  Choose Plan
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CTA SECTION */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[#FFD600] z-0" />
        <div className="relative z-10 max-w-4xl mx-auto text-center reveal">
          <h2 className="font-bebas text-6xl md:text-8xl tracking-wider text-black mb-6">
            READY TO START?
          </h2>
          <p className="text-black/80 text-lg md:text-xl font-medium mb-10">
            Join the most disciplined and professional gym in Balasore today.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="/contact" 
              className="w-full sm:w-auto bg-black text-white font-bold uppercase tracking-widest px-8 py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-white hover:text-black transition-all"
            >
              Contact Us <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
