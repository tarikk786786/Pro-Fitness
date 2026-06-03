"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Bot, Activity, HeartPulse, Brain, ChartBar, Users, ShieldCheck, Zap, Dumbbell, Flame } from "lucide-react";
import { cn } from "@/lib/utils";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import MagneticButton from "@/components/ui/MagneticButton";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

// Luxury Dust Particles
function LuxuryParticles() {
  const container = useRef<HTMLDivElement>(null);
  
  useGSAP(() => {
    const elements = gsap.utils.toArray(".luxury-particle");
    elements.forEach((el: any) => {
      gsap.to(el, {
        y: "-=100vh",
        x: "random(-100, 100)",
        rotation: "random(-180, 180)",
        opacity: 0,
        duration: "random(10, 20)",
        repeat: -1,
        delay: "random(0, 5)",
        ease: "none",
        modifiers: {
          x: (x) => `${parseFloat(x) + Math.sin(Date.now() / 2000) * 10}px`
        }
      });
    });
  }, { scope: container });

  return (
    <div ref={container} className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {Array.from({ length: 40 }).map((_, i) => (
        <div
          key={i}
          className="luxury-particle absolute rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100 + 100}%`,
            width: Math.random() * 4 + 1,
            height: Math.random() * 4 + 1,
            background: Math.random() > 0.5 ? "#FFD600" : "#ffffff",
            boxShadow: Math.random() > 0.5 ? "0 0 10px #FFD600" : "0 0 10px #ffffff",
            opacity: Math.random() * 0.5 + 0.1,
            willChange: "transform, opacity"
          }}
        />
      ))}
    </div>
  );
}

// Custom Glow Cursor
function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;
    
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let cursorX = window.innerWidth / 2;
    let cursorY = window.innerHeight / 2;
    
    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    
    window.addEventListener("mousemove", onMouseMove);
    
    const render = () => {
      cursorX += (mouseX - cursorX) * 0.1;
      cursorY += (mouseY - cursorY) * 0.1;
      cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0) translate(-50%, -50%)`;
      requestAnimationFrame(render);
    };
    requestAnimationFrame(render);
    
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, []);

  return (
    <div 
      ref={cursorRef} 
      className="fixed top-0 left-0 w-64 h-64 bg-brand-yellow/10 rounded-full blur-[80px] pointer-events-none z-[9999] mix-blend-screen"
      style={{ willChange: "transform" }}
    />
  );
}

// Floating 3D Element
function FloatingElement({ children, className, delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) {
  const elRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!elRef.current) return;
    
    // Float animation
    gsap.to(elRef.current, {
      y: "-=20",
      rotationX: "random(-10, 10)",
      rotationY: "random(-10, 10)",
      duration: "random(3, 5)",
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay
    });

    // Mouse tilt
    const handleMouseMove = (e: MouseEvent) => {
      const rect = elRef.current!.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const deltaX = (e.clientX - centerX) * 0.05;
      const deltaY = (e.clientY - centerY) * 0.05;

      gsap.to(elRef.current, {
        x: deltaX,
        y: deltaY,
        duration: 1,
        ease: "power2.out"
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div ref={elRef} className={cn("absolute pointer-events-none will-change-transform", className)}>
      {children}
    </div>
  );
}

function HeroSection() {
  const container = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  useGSAP(() => {
    const tl = gsap.timeline({ delay: 0.5 });

    // Text stagger & blur in
    tl.fromTo(".hero-word", 
      { opacity: 0, filter: "blur(20px)", y: 50, scale: 0.8 }, 
      { opacity: 1, filter: "blur(0px)", y: 0, scale: 1, duration: 1.2, stagger: 0.15, ease: "power4.out" }
    )
    .fromTo(".hero-sub", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1, ease: "power3.out" }, "-=0.8")
    .fromTo(".hero-cta-btn", { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.5)", stagger: 0.2 }, "-=0.6");

    // Scroll parallax & video effect
    ScrollTrigger.create({
      trigger: container.current,
      start: "top top",
      end: "bottom top",
      scrub: 1,
      animation: gsap.timeline()
        .to(videoRef.current, { scale: 1.2, filter: "brightness(0.2) blur(15px)", ease: "none" })
        .to(".hero-content-parallax", { y: 200, opacity: 0, ease: "none" }, 0)
    });

  }, { scope: container });

  const titleWords = "Transform Your Body. Transform Your Life.".split(" ");

  return (
    <section ref={container} className="relative h-[120vh] flex items-center justify-center overflow-hidden bg-[#0A0A0A] -mt-20 pt-20">
      {/* Background Video */}
      <div className="absolute inset-0 z-0 overflow-hidden w-full h-full">
        <video 
          ref={videoRef}
          autoPlay 
          muted 
          loop 
          playsInline
          className="absolute w-full h-full object-cover opacity-50"
          style={{ willChange: "transform, filter" }}
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-man-lifting-a-barbell-in-a-gym-23214-large.mp4" type="video/mp4" />
        </video>
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/40 via-transparent to-[#0A0A0A]"></div>
      </div>

      <LuxuryParticles />

      {/* Floating 3D Elements */}
      <FloatingElement className="top-[25%] left-[10%] opacity-80 mix-blend-screen hidden md:block" delay={0}>
        <div className="w-24 h-24 bg-brand-yellow/10 border border-brand-yellow/30 rounded-2xl backdrop-blur-md flex items-center justify-center shadow-glow-yellow">
          <Dumbbell className="w-10 h-10 text-brand-yellow" />
        </div>
      </FloatingElement>
      
      <FloatingElement className="bottom-[35%] right-[12%] opacity-80 hidden lg:block" delay={1}>
        <div className="w-32 h-40 bg-white/5 border border-white/10 rounded-xl backdrop-blur-md p-4 shadow-2xl flex flex-col items-center justify-center gap-3">
          <Bot className="w-8 h-8 text-white" />
          <div className="h-1 w-12 bg-white/20 rounded-full"></div>
          <div className="h-1 w-8 bg-brand-yellow/50 rounded-full"></div>
        </div>
      </FloatingElement>

      <FloatingElement className="top-[30%] right-[15%] opacity-60 hidden md:block" delay={0.5}>
        <div className="w-16 h-16 bg-gradient-to-tr from-brand-yellow/20 to-transparent rounded-full blur-[2px] flex items-center justify-center border border-brand-yellow/20">
          <Flame className="w-6 h-6 text-brand-yellow" />
        </div>
      </FloatingElement>

      {/* Hero Content */}
      <div className="hero-content-parallax relative z-10 container-custom text-center flex flex-col items-center">
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-white/10 bg-black/40 backdrop-blur-md mb-8">
          <span className="w-2 h-2 rounded-full bg-brand-yellow animate-pulse shadow-glow-yellow"></span>
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-gray-300 font-montserrat">Cinematic Fitness Experience</span>
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-[6rem] font-bebas tracking-wide leading-[1.1] mb-8 flex flex-wrap justify-center max-w-5xl gap-x-4 gap-y-2">
          {titleWords.map((word, i) => (
            <span key={i} className="hero-word inline-block text-white will-change-transform">
              {word.includes("Transform") ? (
                <span className="text-transparent bg-clip-text bg-gradient-to-br from-brand-yellow to-brand-yellow/60 drop-shadow-[0_0_20px_rgba(255,214,0,0.4)]">
                  {word}
                </span>
              ) : word}
            </span>
          ))}
        </h1>

        <p className="hero-sub text-lg md:text-2xl text-gray-300 max-w-2xl font-light font-poppins mb-12 drop-shadow-md">
          Step into a world where <strong className="text-white font-medium">elite personal training</strong> meets <strong className="text-brand-yellow font-medium">cutting-edge AI</strong>. Experience the luxury of real results.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto">
          <MagneticButton className="hero-cta-btn" as="div">
            <Link
              href="/membership"
              className="px-12 py-5 bg-brand-yellow text-[#0A0A0A] rounded-full font-black text-lg transition-all shadow-[0_0_30px_rgba(255,214,0,0.3)] hover:shadow-[0_0_50px_rgba(255,214,0,0.5)] flex items-center justify-center gap-3 font-poppins uppercase tracking-wider hover:scale-105"
            >
              Start Your Journey <ArrowRight className="w-5 h-5" />
            </Link>
          </MagneticButton>
          <MagneticButton className="hero-cta-btn" as="div">
            <Link
              href="#ai-tools"
              className="px-12 py-5 border border-white/20 bg-white/5 backdrop-blur-md hover:bg-white/10 hover:border-brand-yellow/50 text-white rounded-full font-bold text-lg transition-all flex items-center justify-center font-poppins uppercase tracking-wider"
            >
              Discover AI
            </Link>
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}

function SectionTransition() {
  return (
    <div className="relative h-48 bg-gradient-to-b from-[#0A0A0A] to-[#050505] -mt-48 z-20 pointer-events-none"></div>
  );
}

function FeaturesSection() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(".feature-card", 
      { y: 100, opacity: 0, rotateX: -10 },
      { 
        y: 0, 
        opacity: 1, 
        rotateX: 0,
        duration: 1, 
        stagger: 0.1, 
        ease: "power3.out",
        scrollTrigger: {
          trigger: container.current,
          start: "top 75%",
        }
      }
    );
  }, { scope: container });

  const features = [
    { icon: Bot, title: "AI Workouts", desc: "Hyper-personalized routines that adapt to your progress in real-time." },
    { icon: Activity, title: "Smart Nutrition", desc: "Macro-calculated diet plans based on your exact body composition." },
    { icon: HeartPulse, title: "Health Modules", desc: "Specialized programs for PCOS, Thyroid, Diabetes, and more." },
    { icon: ChartBar, title: "Deep Analytics", desc: "Track every rep, pound, and calorie with precision dashboards." },
    { icon: Users, title: "Elite Trainers", desc: "1-on-1 coaching with world-class certified fitness professionals." },
    { icon: Brain, title: "24/7 AI Coach", desc: "Instant answers to your fitness and nutrition questions anytime." },
  ];

  return (
    <section ref={container} className="py-32 bg-[#050505] relative z-20" style={{ perspective: "1000px" }}>
      <div className="container-custom">
        <div className="text-center mb-24 font-poppins">
          <h2 className="text-5xl md:text-7xl font-bebas mb-6 text-white tracking-wide uppercase">Intelligent <span className="text-brand-yellow">Fitness</span></h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg font-light">Next-generation features designed to accelerate your transformation and optimize your performance seamlessly.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 font-poppins">
          {features.map((feature, i) => (
            <div
              key={i}
              className="feature-card opacity-0 bg-[#0A0A0A]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8 group hover:bg-white/5 hover:border-brand-yellow/30 transition-all duration-500 hover:shadow-[0_10px_40px_-10px_rgba(255,214,0,0.1)] relative overflow-hidden"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-brand-yellow/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="w-16 h-16 bg-[#0A0A0A] border border-white/10 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:border-brand-yellow/50 transition-all duration-500 relative z-10 shadow-lg">
                <feature.icon className="w-8 h-8 text-brand-yellow" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white relative z-10 tracking-wide">{feature.title}</h3>
              <p className="text-gray-400 leading-relaxed relative z-10 font-light">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AICoachSection() {
  const container = useRef<HTMLDivElement>(null);
  
  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: { 
        trigger: container.current, 
        start: "top 60%",
      }
    });

    tl.fromTo(".ai-coach-text > *", 
      { x: -50, opacity: 0 }, 
      { x: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out" }
    )
    .fromTo(".ai-coach-mock", 
      { x: 50, opacity: 0, rotateY: 15 }, 
      { x: 0, opacity: 1, rotateY: 0, duration: 1, ease: "power3.out" }, "-=0.5"
    );
    
    gsap.to(".ai-coach-mock", {
      y: -60,
      ease: "none",
      scrollTrigger: {
        trigger: container.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });
  }, { scope: container });

  return (
    <section id="ai-tools" ref={container} className="py-32 bg-[#0A0A0A] overflow-hidden font-poppins relative z-20" style={{ perspective: "1000px" }}>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_right,rgba(255,214,0,0.05)_0%,transparent_50%)] pointer-events-none"></div>
      
      <div className="container-custom relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="ai-coach-text lg:w-1/2">
            <h2 className="text-5xl md:text-8xl font-bebas tracking-wide mb-6 text-white leading-none">
              Meet Your <br/><span className="text-brand-yellow">AI Coach</span>
            </h2>
            <p className="text-gray-400 text-xl mb-8 leading-relaxed font-light">
              Experience the absolute future of fitness. Our proprietary AI deeply analyzes your biomechanics, dietary preferences, and recovery rates to orchestrate the perfect fitness journey. 
            </p>
            <ul className="space-y-5 mb-12">
              {['Instant Workout Adjustments', 'Real-time Macro Calculations', 'Form Correction Tips', '24/7 Motivational Support'].map((item, i) => (
                <li key={i} className="flex items-center gap-4 text-lg">
                  <div className="w-8 h-8 rounded-full bg-brand-yellow/10 flex items-center justify-center border border-brand-yellow/30">
                    <ShieldCheck className="w-4 h-4 text-brand-yellow" />
                  </div>
                  <span className="text-gray-200 font-light tracking-wide">{item}</span>
                </li>
              ))}
            </ul>
            <MagneticButton as="div">
              <Link href="/ai-tools" className="px-10 py-5 bg-white text-[#0A0A0A] font-bold rounded-full hover:bg-brand-yellow transition-colors inline-flex items-center gap-3 uppercase tracking-wider">
                Interact with AI <ArrowRight className="w-5 h-5" />
              </Link>
            </MagneticButton>
          </div>
          
          <div className="lg:w-1/2 w-full">
            <div className="ai-coach-mock bg-[#050505]/80 backdrop-blur-2xl border border-white/10 rounded-[40px] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden">
              <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-brand-yellow/20 blur-[80px] rounded-full pointer-events-none"></div>
              
              <div className="space-y-6 relative z-10 font-montserrat">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-yellow to-[#998000] flex-shrink-0 flex items-center justify-center shadow-glow-yellow">
                    <Bot className="w-6 h-6 text-[#0A0A0A]" />
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-2xl rounded-tl-none p-5 text-sm md:text-base text-gray-200 leading-relaxed">
                    Welcome back to the elite program! Your recovery score is 92% today. Based on your sleep architecture, I recommend a high-volume leg day. Ready?
                  </div>
                </div>
                <div className="flex gap-4 flex-row-reverse">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex-shrink-0 overflow-hidden border border-white/20"></div>
                  <div className="bg-white/10 border border-white/10 rounded-2xl rounded-tr-none p-5 text-sm md:text-base text-white shadow-inner">
                    Let's do it! But I only have 45 minutes today.
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-yellow to-[#998000] flex-shrink-0 flex items-center justify-center shadow-glow-yellow">
                    <Bot className="w-6 h-6 text-[#0A0A0A]" />
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-2xl rounded-tl-none p-5 text-sm md:text-base text-gray-200 leading-relaxed">
                    Understood. I've seamlessly condensed your routine into a high-intensity circuit maintaining total volume. Generating your 45-min master plan now...
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

function MembershipSection() {
  const container = useRef<HTMLDivElement>(null);
  
  useGSAP(() => {
    gsap.fromTo(".plan-card", 
      { y: 50, opacity: 0, scale: 0.95 },
      { 
        y: 0, 
        opacity: 1, 
        scale: 1,
        duration: 0.8, 
        stagger: 0.15, 
        ease: "back.out(1.2)",
        scrollTrigger: {
          trigger: container.current,
          start: "top 75%",
        }
      }
    );
  }, { scope: container });

  const plans = [
    { name: "BASIC", price: "999", color: "white", features: ["Access to gym floor", "Basic AI Workout Plan", "Group Classes (2/mo)", "Locker Room Access"] },
    { name: "PRO", price: "1,999", color: "#FFD600", popular: true, features: ["Everything in Basic", "Advanced AI Coach", "Custom Diet Plans", "Unlimited Classes", "Monthly Body Scan"] },
    { name: "ELITE", price: "3,999", color: "#FFFFFF", features: ["Everything in Pro", "4 Personal Training Sessions", "Spa & Recovery Access", "Priority Support", "Dietitian Consultation"] }
  ];

  return (
    <section ref={container} className="py-32 bg-[#050505] font-poppins relative z-20">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
      
      <div className="container-custom">
        <div className="text-center mb-24">
          <h2 className="text-5xl md:text-8xl font-bebas mb-6 text-white tracking-wide uppercase">Premium <span className="text-brand-yellow">Tiers</span></h2>
          <p className="text-gray-400 text-xl max-w-2xl mx-auto font-light">Choose the tier that matches your uncompromising ambition. No hidden fees, cancel anytime.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-center">
          {plans.map((plan, i) => (
            <div
              key={i}
              className={cn(
                "plan-card opacity-0 rounded-[2.5rem] p-10 relative transition-all duration-500 group",
                plan.popular ? "bg-[#0A0A0A] border border-brand-yellow/50 shadow-[0_0_40px_rgba(255,214,0,0.15)] md:-translate-y-6 z-10" : "bg-[#0A0A0A]/50 border border-white/5 hover:border-white/20"
              )}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-brand-yellow text-[#0A0A0A] text-xs font-bold px-6 py-2 rounded-full uppercase tracking-widest shadow-glow-yellow">
                  Most Popular
                </div>
              )}
              <h3 className="text-4xl font-bebas mb-2 tracking-widest" style={{ color: plan.color }}>{plan.name}</h3>
              <div className="flex items-baseline gap-1 mb-10">
                <span className="text-2xl text-gray-400 font-montserrat">₹</span>
                <span className="text-7xl font-black text-white tracking-tight">{plan.price}</span>
                <span className="text-gray-500 font-montserrat">/mo</span>
              </div>
              
              <ul className="space-y-5 mb-12 font-montserrat">
                {plan.features.map((feature, j) => (
                  <li key={j} className="flex items-center gap-4">
                    <Zap className="w-5 h-5 flex-shrink-0" style={{ color: plan.color }} />
                    <span className="text-gray-300 text-base font-light tracking-wide">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <MagneticButton className="w-full">
                <button 
                  className={cn(
                    "w-full py-5 rounded-full font-bold transition-all uppercase tracking-wider text-sm",
                    plan.popular ? "bg-brand-yellow text-[#0A0A0A] hover:bg-white hover:shadow-[0_0_30px_rgba(255,255,255,0.5)]" : "bg-white/5 text-white hover:bg-white hover:text-[#0A0A0A] border border-white/10"
                  )}
                >
                  Select {plan.name}
                </button>
              </MagneticButton>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div className="bg-[#0A0A0A] min-h-screen text-white selection:bg-brand-yellow selection:text-black">
      <CustomCursor />
      <HeroSection />
      <SectionTransition />
      <FeaturesSection />
      <AICoachSection />
      <MembershipSection />
    </div>
  );
}
