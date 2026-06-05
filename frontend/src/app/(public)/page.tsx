"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import {
  ArrowRight, Bot, Activity, HeartPulse, Brain, BarChart3,
  Users, ShieldCheck, Zap, Dumbbell, Flame, Star, Play,
  ChevronDown, Trophy, TrendingUp, CheckCircle
} from "lucide-react";
import { cn } from "@/lib/utils";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

/* ===================== CUSTOM CURSOR ===================== */
function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
    const cursor = cursorRef.current;
    if (!cursor || window.innerWidth < 1024) return;
    let mx = window.innerWidth / 2, my = window.innerHeight / 2;
    let cx = mx, cy = my;
    const move = (e: MouseEvent) => { mx = e.clientX; my = e.clientY; };
    window.addEventListener("mousemove", move);
    let id: number;
    const loop = () => {
      cx += (mx - cx) * 0.08; cy += (my - cy) * 0.08;
      cursor.style.transform = `translate3d(${cx}px,${cy}px,0) translate(-50%,-50%)`;
      id = requestAnimationFrame(loop);
    };
    id = requestAnimationFrame(loop);
    return () => { window.removeEventListener("mousemove", move); cancelAnimationFrame(id); };
  }, []);
  if (!mounted) return null;
  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 w-72 h-72 rounded-full pointer-events-none z-[9998] mix-blend-screen hidden lg:block"
      style={{ background: "radial-gradient(circle, rgba(255,214,0,0.07) 0%, transparent 70%)", willChange: "transform" }}
    />
  );
}

/* ===================== LUXURY PARTICLES ===================== */
function LuxuryParticles({ count = 30 }: { count?: number }) {
  const particles = useRef(
    Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100 + 100,
      size: Math.random() * 3 + 1,
      isYellow: Math.random() > 0.45,
      delay: Math.random() * 8,
      duration: Math.random() * 12 + 10,
    }))
  );
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {particles.current.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: p.isYellow ? "#FFD600" : "#fff",
            boxShadow: p.isYellow ? "0 0 8px #FFD600" : "0 0 8px #fff",
          }}
          animate={{ y: [0, -1400], opacity: [0, 0.6, 0.6, 0] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "linear" }}
        />
      ))}
    </div>
  );
}

/* ===================== HERO SECTION ===================== */
function HeroSection() {
  const container = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useGSAP(() => {
    const tl = gsap.timeline({ delay: 0.3 });
    tl.fromTo(".hw",
      { opacity: 0, filter: "blur(24px)", y: 80, scale: 0.85 },
      { opacity: 1, filter: "blur(0px)", y: 0, scale: 1, duration: 1.3, stagger: 0.1, ease: "power4.out" }
    )
    .fromTo(".h-sub", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1, ease: "power3.out" }, "-=0.9")
    .fromTo(".h-btn", { opacity: 0, scale: 0.88, y: 15 }, { opacity: 1, scale: 1, y: 0, duration: 0.7, ease: "back.out(1.7)", stagger: 0.15 }, "-=0.7")
    .fromTo(".h-stat", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: "power2.out" }, "-=0.5");

    if (videoRef.current) {
      ScrollTrigger.create({
        trigger: container.current,
        start: "top top",
        end: "bottom top",
        scrub: 1.5,
        animation: gsap.timeline()
          .to(videoRef.current, { scale: 1.25, filter: "brightness(0.15) blur(12px)", ease: "none" })
          .to(".h-content", { y: 160, opacity: 0, ease: "none" }, 0)
      });
    }
  }, { scope: container });

  const line1 = "Transform Your Body.".split(" ");
  const line2 = "Transform Your Life.".split(" ");

  const stats = [
    { value: "500+", label: "Elite Members" },
    { value: "50+", label: "Pro Trainers" },
    { value: "10K+", label: "Transformations" },
    { value: "4.9★", label: "Avg Rating" },
  ];

  return (
    <section ref={container} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0A0A0A] -mt-24 pt-24">
      {/* Video BG */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay muted loop playsInline
          onCanPlay={() => setVideoLoaded(true)}
          className={cn("absolute w-full h-full object-cover transition-opacity duration-1000", videoLoaded ? "opacity-45" : "opacity-0")}
          style={{ willChange: "transform, filter" }}
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-man-lifting-a-barbell-in-a-gym-23214-large.mp4" type="video/mp4" />
        </video>
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/70 via-[#0A0A0A]/10 to-[#0A0A0A]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A]/70 via-transparent to-[#0A0A0A]/70" />
      </div>

      <LuxuryParticles />

      {/* Content */}
      <div className="h-content relative z-10 max-w-7xl mx-auto px-6 text-center flex flex-col items-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.5, ease: "backOut" }}
          className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full border border-white/10 bg-black/50 backdrop-blur-xl mb-10"
        >
          <span className="w-2 h-2 rounded-full bg-[#FFD600] shadow-[0_0_8px_#FFD600]" style={{ animation: "pulse 2s infinite" }} />
          <span className="text-[10px] font-bold uppercase tracking-[0.35em] text-gray-300 font-montserrat">
            India's #1 AI Fitness Platform
          </span>
        </motion.div>

        {/* Headline */}
        <h1 className="font-bebas text-[4rem] sm:text-[5.5rem] md:text-[7rem] lg:text-[9rem] leading-[0.92] mb-10 flex flex-col items-center gap-2">
          <div className="flex flex-wrap justify-center gap-x-5">
            {line1.map((word, i) => (
              <span key={i} className={cn("hw inline-block opacity-0 will-change-transform", word === "Transform" ? "text-[#FFD600]" : "text-white")}>
                {word}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-x-5">
            {line2.map((word, i) => (
              <span key={i} className={cn("hw inline-block opacity-0 will-change-transform", word === "Transform" ? "text-[#FFD600]" : "text-white")}>
                {word}
              </span>
            ))}
          </div>
        </h1>

        {/* Subheading */}
        <p className="h-sub opacity-0 text-lg md:text-2xl text-gray-400 max-w-2xl font-light font-poppins mb-12 leading-relaxed">
          Step into a world where{" "}
          <strong className="text-white font-semibold">elite personal training</strong> meets{" "}
          <strong className="text-[#FFD600] font-semibold">cutting-edge AI</strong>. Real coaches. Real results.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-20">
          <Link
            href="/membership"
            className="h-btn opacity-0 group px-10 py-4 bg-[#FFD600] text-black font-black rounded-full text-base uppercase tracking-wider transition-all duration-300 shadow-[0_0_30px_rgba(255,214,0,0.35)] hover:shadow-[0_0_55px_rgba(255,214,0,0.6)] hover:scale-105 active:scale-95 flex items-center gap-3 font-poppins"
          >
            Start Your Journey
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="#ai-tools"
            className="h-btn opacity-0 group px-10 py-4 border border-white/15 bg-white/5 backdrop-blur-md hover:bg-white/10 hover:border-white/30 text-white rounded-full font-bold text-base transition-all uppercase tracking-wider flex items-center justify-center gap-3 font-poppins"
          >
            <Play className="w-4 h-4 fill-white" />
            Discover AI Tools
          </Link>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl w-full">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              className="h-stat opacity-0"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3 + i * 0.5, delay: i * 0.3, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="bg-white/5 backdrop-blur-xl border border-white/8 rounded-2xl px-4 py-4 text-center hover:border-[#FFD600]/20 transition-colors duration-300">
                <div className="font-bebas text-3xl text-[#FFD600] mb-0.5">{s.value}</div>
                <div className="text-gray-500 text-xs font-montserrat tracking-wide uppercase">{s.label}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <ChevronDown className="w-6 h-6 text-gray-600" />
        </motion.div>
      </div>
    </section>
  );
}

/* ===================== MARQUEE STRIP ===================== */
function MarqueeStrip() {
  const items = ["TRANSFORM YOUR BODY", "AI-POWERED COACHING", "ELITE TRAINING", "REAL RESULTS", "DISCIPLINED", "PROFESSIONAL", "PREMIUM FITNESS"];
  const repeated = [...items, ...items];
  return (
    <div className="relative py-5 bg-[#050505] border-y border-white/5 overflow-hidden">
      <div
        className="flex gap-8 whitespace-nowrap"
        style={{ animation: "marquee 28s linear infinite", width: "max-content" }}
      >
        {repeated.map((item, i) => (
          <span key={i} className="flex items-center gap-8 font-bebas text-lg tracking-[0.2em] text-gray-600">
            {item}
            <span className="text-[#FFD600] text-xl">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ===================== STATS COUNTER SECTION ===================== */
function StatsSection() {
  const container = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    gsap.fromTo(".stat-item",
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power3.out",
        scrollTrigger: { trigger: container.current, start: "top 80%" } }
    );
  }, { scope: container });

  const stats = [
    { value: "500+", label: "Elite Members", icon: Users },
    { value: "50+", label: "Certified Trainers", icon: Trophy },
    { value: "10,000+", label: "Transformations", icon: TrendingUp },
    { value: "4.9/5", label: "Member Rating", icon: Star },
  ];

  return (
    <section ref={container} className="py-24 bg-[#050505]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/5 rounded-3xl overflow-hidden border border-white/5">
          {stats.map((s, i) => (
            <div key={i} className="stat-item opacity-0 bg-[#070707] p-10 text-center flex flex-col items-center gap-3 hover:bg-[#0A0A0A] transition-colors group">
              <div className="w-12 h-12 bg-[#FFD600]/8 border border-[#FFD600]/15 rounded-2xl flex items-center justify-center mb-2 group-hover:bg-[#FFD600]/15 transition-colors">
                <s.icon className="w-6 h-6 text-[#FFD600]" />
              </div>
              <div className="font-bebas text-5xl lg:text-6xl text-white tracking-wide">{s.value}</div>
              <div className="text-gray-600 text-xs uppercase tracking-[0.2em] font-montserrat">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===================== FEATURES SECTION ===================== */
function FeaturesSection() {
  const container = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    gsap.fromTo(".f-card",
      { y: 70, opacity: 0, rotateX: -12 },
      { y: 0, opacity: 1, rotateX: 0, duration: 0.9, stagger: 0.1, ease: "power3.out",
        scrollTrigger: { trigger: container.current, start: "top 75%" } }
    );
  }, { scope: container });

  const features = [
    { icon: Bot, title: "AI Workouts", desc: "Hyper-personalized routines that adapt to your progress in real-time using advanced machine learning." },
    { icon: Activity, title: "Smart Nutrition", desc: "Macro-calculated Indian meal plans calibrated to your exact body composition and goals." },
    { icon: HeartPulse, title: "Health Modules", desc: "Specialized programs for PCOS, Thyroid, Diabetes, and 10+ conditions. Safe and science-backed." },
    { icon: BarChart3, title: "Deep Analytics", desc: "Track every rep, gram, and calorie with precision. Visualize your transformation journey." },
    { icon: Users, title: "Elite Trainers", desc: "1-on-1 coaching with certified professionals who have transformed thousands of lives." },
    { icon: Brain, title: "24/7 AI Coach", desc: "Instant answers to any fitness or nutrition question, anytime. Never train alone again." },
  ];

  return (
    <section ref={container} className="py-32 bg-[#0A0A0A] relative z-10" style={{ perspective: "1200px" }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <motion.p
            initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
            className="text-[#FFD600] text-xs font-bold tracking-[0.35em] uppercase font-montserrat mb-4"
          >
            Built Different
          </motion.p>
          <h2 className="font-bebas text-5xl md:text-7xl text-white tracking-wide uppercase mb-4">
            Intelligent <span className="text-[#FFD600]">Fitness</span>
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-base font-light">
            Next-generation features engineered to accelerate your transformation and optimize every aspect of your performance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <div
              key={i}
              className="f-card opacity-0 group relative bg-[#0A0A0A] border border-white/5 rounded-3xl p-8 hover:border-[#FFD600]/20 transition-all duration-500 cursor-default overflow-hidden"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Hover glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#FFD600]/4 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
              {/* Top shine line */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FFD600]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10">
                <div className="w-14 h-14 bg-[#111] border border-white/8 rounded-2xl flex items-center justify-center mb-7 group-hover:border-[#FFD600]/30 group-hover:scale-110 transition-all duration-400 shadow-lg">
                  <f.icon className="w-7 h-7 text-[#FFD600]" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-white tracking-wide">{f.title}</h3>
                <p className="text-gray-500 leading-relaxed text-sm font-light">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===================== TRANSFORMATION SECTION ===================== */
function TransformationSection() {
  const container = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    gsap.fromTo(".t-left", { x: -60, opacity: 0 }, {
      x: 0, opacity: 1, duration: 1, ease: "power3.out",
      scrollTrigger: { trigger: container.current, start: "top 70%" }
    });
    gsap.fromTo(".t-right", { x: 60, opacity: 0 }, {
      x: 0, opacity: 1, duration: 1, delay: 0.2, ease: "power3.out",
      scrollTrigger: { trigger: container.current, start: "top 70%" }
    });
  }, { scope: container });

  const metrics = [
    { label: "Avg. Fat Loss", value: "12kg", icon: TrendingUp },
    { label: "Success Rate", value: "89%", icon: Trophy },
    { label: "Avg. Duration", value: "8 Weeks", icon: Star },
  ];

  return (
    <section ref={container} className="py-32 bg-[#050505] relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_left,rgba(255,214,0,0.05)_0%,transparent_50%)] pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="t-left opacity-0">
            <p className="text-[#FFD600] text-xs font-bold tracking-[0.35em] uppercase font-montserrat mb-5">Results That Speak</p>
            <h2 className="font-bebas text-6xl md:text-8xl text-white leading-none mb-8 tracking-wide uppercase">
              Real<br /><span className="text-[#FFD600]">Transformations</span>
            </h2>
            <p className="text-gray-500 text-base mb-10 leading-relaxed max-w-md">
              Thousands of members have achieved their dream physique with our AI-guided programs and expert coaching.
            </p>
            <div className="space-y-4 mb-12">
              {metrics.map((m, i) => (
                <div key={i} className="flex items-center gap-4 bg-white/3 border border-white/5 rounded-2xl px-6 py-4 hover:border-[#FFD600]/15 transition-colors group">
                  <div className="w-10 h-10 bg-[#FFD600]/8 rounded-xl flex items-center justify-center group-hover:bg-[#FFD600]/15 transition-colors">
                    <m.icon className="w-5 h-5 text-[#FFD600]" />
                  </div>
                  <div>
                    <div className="font-bebas text-2xl text-white">{m.value}</div>
                    <div className="text-gray-600 text-xs tracking-wide font-montserrat">{m.label}</div>
                  </div>
                </div>
              ))}
            </div>
            <Link href="/membership" className="inline-flex items-center gap-3 px-8 py-4 bg-[#FFD600] text-black font-black rounded-full uppercase tracking-wider text-sm hover:bg-white transition-all hover:scale-105 shadow-[0_0_30px_rgba(255,214,0,0.35)]">
              Start Yours <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="t-right opacity-0">
            <div className="relative bg-[#0A0A0A] border border-white/8 rounded-3xl p-8 overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#FFD600]/10 blur-[70px] rounded-full" />
              {/* Progress card mockup */}
              <div className="relative z-10 space-y-6">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#FFD600] to-[#998000] flex items-center justify-center">
                    <Flame className="w-6 h-6 text-black" />
                  </div>
                  <div>
                    <div className="font-bold text-white">Member Progress Story</div>
                    <div className="text-gray-600 text-xs">8-Week Transformation</div>
                  </div>
                </div>
                {[
                  { week: "Week 1", label: "Getting Started", pct: 15 },
                  { week: "Week 3", label: "Building Momentum", pct: 40 },
                  { week: "Week 6", label: "Strong Results", pct: 72 },
                  { week: "Week 8", label: "Goal Achieved ✓", pct: 95 },
                ].map((row, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.15 }}
                    className="space-y-2"
                  >
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-300 font-medium">{row.week}</span>
                      <span className="text-gray-600 text-xs">{row.label}</span>
                    </div>
                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${row.pct}%` }}
                        transition={{ duration: 1, delay: i * 0.15 + 0.3, ease: "easeOut" }}
                        className="h-full rounded-full"
                        style={{ background: `linear-gradient(90deg, #FFD600, ${row.pct > 80 ? "#fff" : "#cc9900"})` }}
                      />
                    </div>
                  </motion.div>
                ))}
                <div className="mt-6 p-4 bg-[#FFD600]/5 border border-[#FFD600]/15 rounded-2xl">
                  <p className="text-gray-300 text-sm italic leading-relaxed">
                    "Lost 14kg in 8 weeks. The AI coach adjusted my plan every week. Absolutely game-changing!"
                  </p>
                  <p className="text-[#FFD600] text-xs mt-2 font-semibold">— Rahul K., Bhubaneswar</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ===================== AI COACH SECTION ===================== */
function AICoachSection() {
  const container = useRef<HTMLDivElement>(null);
  const [messages] = useState([
    { role: "ai", text: "Your recovery score is 94% today. Sleep architecture excellent. Ready for a high-intensity leg session?" },
    { role: "user", text: "Yes! But I only have 45 minutes." },
    { role: "ai", text: "Optimizing your plan for 45 minutes. Generating high-intensity circuit now... 🔥" },
  ]);

  useGSAP(() => {
    const tl = gsap.timeline({ scrollTrigger: { trigger: container.current, start: "top 65%" } });
    tl.fromTo(".ai-text > *", { x: -50, opacity: 0 }, { x: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out" })
      .fromTo(".ai-chat", { x: 50, opacity: 0, rotateY: 10 }, { x: 0, opacity: 1, rotateY: 0, duration: 1, ease: "power3.out" }, "-=0.5");

    gsap.to(".ai-chat", {
      y: -50, ease: "none",
      scrollTrigger: { trigger: container.current, start: "top bottom", end: "bottom top", scrub: true }
    });
  }, { scope: container });

  return (
    <section id="ai-tools" ref={container} className="py-32 bg-[#0A0A0A] relative overflow-hidden" style={{ perspective: "1200px" }}>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_right,rgba(255,214,0,0.06)_0%,transparent_55%)] pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="ai-text space-y-6">
            <p className="text-[#FFD600] text-xs font-bold tracking-[0.35em] uppercase font-montserrat">AI-Powered</p>
            <h2 className="font-bebas text-6xl md:text-8xl text-white leading-none tracking-wide">
              Meet Your<br /><span className="text-[#FFD600]">AI Coach</span>
            </h2>
            <p className="text-gray-500 text-base leading-relaxed max-w-md">
              Our proprietary AI deeply analyzes your biomechanics, sleep patterns, and recovery to orchestrate the perfect fitness journey — every single day.
            </p>
            <ul className="space-y-4">
              {["Instant Workout Adaptations", "Real-time Macro Calculations", "Form Correction & Safety Tips", "24/7 Motivational Support"].map((item, i) => (
                <li key={i} className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-xl bg-[#FFD600]/8 border border-[#FFD600]/20 flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-4 h-4 text-[#FFD600]" />
                  </div>
                  <span className="text-gray-300 text-sm font-light">{item}</span>
                </li>
              ))}
            </ul>
            <Link href="/ai-tools" className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black font-black rounded-full uppercase tracking-wider text-sm hover:bg-[#FFD600] transition-all hover:scale-105">
              Try AI Coach Free <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="ai-chat">
            <div className="bg-[#050505] border border-white/8 rounded-[2.5rem] p-7 shadow-[0_20px_60px_rgba(0,0,0,0.6)] relative overflow-hidden">
              <div className="absolute top-[-15%] right-[-10%] w-56 h-56 bg-[#FFD600]/15 blur-[80px] rounded-full" />
              {/* Chat header */}
              <div className="flex items-center gap-3 mb-6 pb-5 border-b border-white/6 relative z-10">
                <div className="w-10 h-10 rounded-full bg-[#FFD600] flex items-center justify-center shadow-[0_0_20px_rgba(255,214,0,0.4)]">
                  <Bot className="w-5 h-5 text-black" />
                </div>
                <div>
                  <div className="text-white font-bold text-sm">PRO FITNESS AI</div>
                  <div className="flex items-center gap-1.5 text-xs text-[#00FF88]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00FF88] shadow-[0_0_6px_#00FF88]" />
                    Online — Always Ready
                  </div>
                </div>
              </div>
              {/* Messages */}
              <div className="space-y-4 relative z-10">
                {messages.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.25 }}
                    className={cn("flex gap-3", msg.role === "user" && "flex-row-reverse")}
                  >
                    <div className={cn(
                      "w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold",
                      msg.role === "ai"
                        ? "bg-[#FFD600] text-black shadow-[0_0_12px_rgba(255,214,0,0.4)]"
                        : "bg-white/10 text-white border border-white/15"
                    )}>
                      {msg.role === "ai" ? <Bot className="w-4 h-4" /> : "U"}
                    </div>
                    <div className={cn(
                      "max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed",
                      msg.role === "ai"
                        ? "bg-white/5 border border-white/8 text-gray-200 rounded-tl-sm"
                        : "bg-white/10 border border-white/10 text-white rounded-tr-sm"
                    )}>
                      {msg.text}
                    </div>
                  </motion.div>
                ))}
                {/* Typing indicator */}
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#FFD600] text-black flex items-center justify-center flex-shrink-0 shadow-[0_0_12px_rgba(255,214,0,0.4)]">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="bg-white/5 border border-white/8 rounded-2xl rounded-tl-sm px-4 py-3 flex gap-1.5 items-center">
                    {[0, 0.2, 0.4].map((d, i) => (
                      <motion.span key={i} animate={{ y: [0, -6, 0] }} transition={{ duration: 0.7, delay: d, repeat: Infinity }} className="w-1.5 h-1.5 rounded-full bg-[#FFD600]" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ===================== SAFE ENVIRONMENT SECTION ===================== */
function SafeEnvironmentSection() {
  const container = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    const tl = gsap.timeline({ scrollTrigger: { trigger: container.current, start: "top 75%" } });
    tl.fromTo(".safe-tag", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" })
      .fromTo(".safe-title", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, "-=0.4")
      .fromTo(".safe-desc", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, "-=0.6")
      .fromTo(".safe-card", { y: 50, opacity: 0, rotateX: -10 }, { y: 0, opacity: 1, rotateX: 0, duration: 0.8, stagger: 0.15, ease: "power3.out" }, "-=0.4");
  }, { scope: container });

  const features = [
    { icon: ShieldCheck, title: "Safety Before Intensity", desc: "Expert supervision ensures proper form and minimizes injury risk. Your well-being is our top priority." },
    { icon: HeartPulse, title: "Women's Comfort First", desc: "A secure, respectful, and empowering space designed for women to train with absolute confidence." },
    { icon: Users, title: "Professionalism & Respect", desc: "A disciplined atmosphere free of intimidation. We foster a supportive community for all levels." },
    { icon: Dumbbell, title: "Discipline Creates Transformation", desc: "We provide the structure and elite guidance you need to build lifelong habits and achieve real results." }
  ];

  return (
    <section ref={container} className="py-32 bg-[#050505] relative overflow-hidden" style={{ perspective: "1200px" }}>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(255,214,0,0.04)_0%,transparent_60%)] pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <p className="safe-tag opacity-0 text-[#FFD600] text-xs font-bold tracking-[0.35em] uppercase font-montserrat mb-4">Elite Standards</p>
          <h2 className="safe-title opacity-0 font-bebas text-5xl md:text-7xl text-white tracking-wide uppercase mb-6">
            Safe & <span className="text-[#FFD600]">Professional</span> Environment
          </h2>
          <p className="safe-desc opacity-0 text-gray-500 max-w-2xl mx-auto text-base font-light leading-relaxed">
            We believe that true transformation happens in an environment built on respect, safety, and unwavering discipline. Step into a sanctuary designed for focused progress.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {features.map((f, i) => (
            <div
              key={i}
              className="safe-card opacity-0 group bg-[#0A0A0A] border border-white/5 rounded-3xl p-8 hover:border-[#FFD600]/20 hover:bg-[#0c0c0c] transition-all duration-500 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#FFD600]/5 blur-[50px] rounded-full group-hover:bg-[#FFD600]/10 transition-colors duration-500" />
              <div className="flex gap-6 relative z-10">
                <div className="w-14 h-14 bg-[#111] border border-white/8 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:border-[#FFD600]/30 transition-colors duration-400">
                  <f.icon className="w-7 h-7 text-[#FFD600]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-white tracking-wide">{f.title}</h3>
                  <p className="text-gray-500 leading-relaxed text-sm font-light">{f.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===================== MEMBERSHIP SECTION ===================== */
function MembershipSection() {
  const container = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    gsap.fromTo(".plan-card",
      { y: 60, opacity: 0, scale: 0.94 },
      { y: 0, opacity: 1, scale: 1, duration: 0.9, stagger: 0.15, ease: "back.out(1.3)",
        scrollTrigger: { trigger: container.current, start: "top 75%" } }
    );
  }, { scope: container });

  const plans = [
    {
      name: "DAILY PASS", price: "200", period: "day", color: "#FFFFFF",
      features: ["1-Day Gym Access", "Standard Equipment", "Locker Room Access", "Free Wi-Fi"]
    },
    {
      name: "WEEKLY PLAN", price: "500", period: "week", color: "#FFFFFF",
      features: ["7-Day Gym Access", "Standard Equipment", "Locker Room Access", "Free Wi-Fi", "1 Group Class"]
    },
    {
      name: "MONTHLY PLAN", price: "1,000", period: "month", color: "#FFD600", popular: true,
      features: ["Full Month Access", "All Equipment & Weights", "Unlimited Group Classes", "Fitness Assessment", "Locker Room Access"]
    },
    {
      name: "ADMISSION + MONTHLY", price: "1,000", period: "registration", color: "#FFFFFF",
      features: ["Registration Fee Included", "First Month Access", "Welcome Kit", "Personalized Plan", "Diet Consultation"]
    },
  ];

  return (
    <section ref={container} className="py-32 bg-[#050505] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.04) 1px, transparent 0)", backgroundSize: "48px 48px" }} />
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <p className="text-[#FFD600] text-xs font-bold tracking-[0.35em] uppercase font-montserrat mb-4">No Hidden Fees</p>
          <h2 className="font-bebas text-5xl md:text-8xl text-white tracking-wide uppercase mb-4">
            Premium <span className="text-[#FFD600]">Tiers</span>
          </h2>
          <p className="text-gray-500 max-w-lg mx-auto text-base font-light">
            Choose the tier that matches your ambition. Cancel anytime, upgrade whenever.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-center max-w-7xl mx-auto">
          {plans.map((plan, i) => (
            <div
              key={i}
              className={cn(
                "plan-card opacity-0 relative rounded-[2.5rem] p-9 transition-all duration-500 group",
                plan.popular
                  ? "bg-[#0C0C00] border border-[#FFD600]/40 shadow-[0_0_60px_rgba(255,214,0,0.12)] md:-translate-y-5 z-10"
                  : "bg-[#0A0A0A] border border-white/5 hover:border-white/15"
              )}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <motion.div
                    animate={{ boxShadow: ["0 0 12px rgba(255,214,0,0.4)", "0 0 25px rgba(255,214,0,0.8)", "0 0 12px rgba(255,214,0,0.4)"] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="bg-[#FFD600] text-black text-[10px] font-black px-5 py-1.5 rounded-full uppercase tracking-[0.2em]"
                  >
                    Most Popular
                  </motion.div>
                </div>
              )}
              <h3 className="font-bebas text-4xl tracking-widest mb-2" style={{ color: plan.color }}>{plan.name}</h3>
              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-xl text-gray-500 font-montserrat">₹</span>
                <span className="font-bebas text-6xl text-white tracking-tight">{plan.price}</span>
                <span className="text-gray-600 text-sm font-montserrat">/{plan.period}</span>
              </div>
              <ul className="space-y-4 mb-10">
                {plan.features.map((feat, j) => (
                  <li key={j} className="flex items-center gap-3">
                    <Zap className="w-4 h-4 flex-shrink-0" style={{ color: plan.color }} />
                    <span className="text-gray-400 text-sm font-light">{feat}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/membership"
                className={cn(
                  "block w-full py-4 rounded-full font-bold text-sm uppercase tracking-wider text-center transition-all duration-300 hover:scale-105 active:scale-95",
                  plan.popular
                    ? "bg-[#FFD600] text-black hover:bg-white shadow-[0_0_25px_rgba(255,214,0,0.35)] hover:shadow-[0_0_35px_rgba(255,255,255,0.5)]"
                    : "bg-white/5 text-white hover:bg-white hover:text-black border border-white/8"
                )}
              >
                Select {plan.name}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===================== TESTIMONIALS ===================== */
function TestimonialsSection() {
  const container = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    gsap.fromTo(".test-card",
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power3.out",
        scrollTrigger: { trigger: container.current, start: "top 80%" } }
    );
  }, { scope: container });

  const testimonials = [
    { name: "Priya S.", location: "Bhubaneswar", stat: "Lost 18kg", quote: "The AI diet plan is insane — it gave me Indian food options I actually love. Lost 18kg without starving!", stars: 5, color: "from-yellow-500 to-orange-500" },
    { name: "Rahul K.", location: "Cuttack", stat: "Gained 8kg muscle", quote: "The GSAP-powered dashboard made tracking so satisfying. The AI coach checked my form through video — revolutionary.", stars: 5, color: "from-blue-500 to-purple-500" },
    { name: "Anjali M.", location: "Balasore", stat: "PCOS controlled", quote: "The PCOS health module changed my life. Specialized workouts + diet, and my symptoms are 90% better in 3 months!", stars: 5, color: "from-pink-500 to-red-500" },
  ];

  return (
    <section ref={container} className="py-32 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-[#FFD600] text-xs font-bold tracking-[0.35em] uppercase font-montserrat mb-4">Success Stories</p>
          <h2 className="font-bebas text-5xl md:text-7xl text-white tracking-wide uppercase">
            Lives <span className="text-[#FFD600]">Changed</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div key={i} className="test-card opacity-0 bg-white/2 border border-white/6 rounded-3xl p-8 backdrop-blur-sm hover:border-white/12 transition-all duration-300 group">
              <div className="flex gap-1 mb-5">
                {Array.from({ length: t.stars }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 text-[#FFD600] fill-[#FFD600]" />
                ))}
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-6 italic">"{t.quote}"</p>
              <div className="flex items-center gap-4">
                <div className={cn("w-11 h-11 rounded-full bg-gradient-to-br flex-shrink-0", t.color)} />
                <div>
                  <div className="text-white font-semibold text-sm">{t.name}</div>
                  <div className="text-gray-600 text-xs">{t.location}</div>
                </div>
                <div className="ml-auto">
                  <span className="text-[#FFD600] text-xs font-bold bg-[#FFD600]/8 border border-[#FFD600]/15 px-3 py-1 rounded-full font-montserrat">
                    {t.stat}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===================== CTA SECTION ===================== */
function CTASection() {
  return (
    <section className="py-40 bg-[#050505] relative overflow-hidden">
      <LuxuryParticles count={20} />
      {/* Central glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[700px] h-[400px] bg-[#FFD600]/6 blur-[120px] rounded-full" />
      </div>
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-[#FFD600] text-xs font-bold tracking-[0.35em] uppercase font-montserrat mb-6">Your Journey Starts Here</p>
          <h2 className="font-bebas text-6xl md:text-9xl text-white leading-none tracking-wide uppercase mb-8">
            Start Your<br /><span className="text-[#FFD600]">Transformation</span><br />Today
          </h2>
          <p className="text-gray-500 text-lg mb-12 max-w-xl mx-auto font-light">
            Join 500+ members already achieving their dream body with AI-powered training and elite coaching.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/membership"
              className="group px-12 py-5 bg-[#FFD600] text-black font-black rounded-full text-base uppercase tracking-wider transition-all duration-300 shadow-[0_0_40px_rgba(255,214,0,0.4)] hover:shadow-[0_0_70px_rgba(255,214,0,0.7)] hover:scale-105 active:scale-95 flex items-center justify-center gap-3 font-poppins"
            >
              Get Started — Join Now
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/membership"
              className="px-12 py-5 border border-white/15 bg-white/3 backdrop-blur-md hover:bg-white/8 text-white rounded-full font-bold text-base uppercase tracking-wider transition-all font-poppins"
            >
              View All Plans
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ===================== MAIN PAGE ===================== */
export default function Home() {
  return (
    <main className="bg-[#0A0A0A] min-h-screen text-white overflow-x-hidden">
      <CustomCursor />
      <HeroSection />
      <MarqueeStrip />
      <StatsSection />
      <FeaturesSection />
      <TransformationSection />
      <AICoachSection />
      <SafeEnvironmentSection />
      <MembershipSection />
      <TestimonialsSection />
      <CTASection />
    </main>
  );
}
