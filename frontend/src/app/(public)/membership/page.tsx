"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import {
  Check, ChevronRight, Crown, Dumbbell, Star, Smartphone, QrCode, CreditCard, Shield, Plus, Download
} from "lucide-react";
import { cn } from "@/lib/utils";

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const PLANS = [
  {
    id: "daily",
    tier: "DAILY PASS",
    price: 200,
    displayPrice: "200",
    period: "per day",
    description: "Perfect for individuals looking for a focused daily workout experience in a professional gym environment.",
    features: [
      "1-Day Full Gym Access",
      "Strength & Cardio Training Area",
      "Professional Workout Environment",
      "Trainer Workout Guidance",
      "Safe & Disciplined Atmosphere",
      "High-Quality Gym Equipment",
      "Beginner-Friendly Support",
      "Free Drinking Water Access",
      "Comfortable Workout Space",
      "Fitness Progress Guidance"
    ],
    popular: false,
    icon: Dumbbell,
    cta: "Select DAILY PASS",
  },
  {
    id: "weekly",
    tier: "WEEKLY PLAN",
    price: 500,
    displayPrice: "500",
    period: "per week",
    description: "A balanced short-term fitness plan for maintaining consistency, improving strength, and building healthy workout habits.",
    features: [
      "7-Day Unlimited Gym Access",
      "Full Workout Equipment Access",
      "Fat Loss & Strength Support",
      "Workout Routine Guidance",
      "Daily Fitness Motivation",
      "Safe Training Environment",
      "Flexible Workout Timing",
      "Cardio & Weight Training Access",
      "Beginner & Intermediate Friendly",
      "Progress Monitoring Support"
    ],
    popular: true,
    icon: Star,
    cta: "Select WEEKLY PLAN",
  },
  {
    id: "monthly",
    tier: "MONTHLY PLAN",
    price: 1000,
    displayPrice: "1,000",
    period: "per month",
    description: "A complete transformation-focused membership designed for consistent progress, disciplined training, and long-term fitness improvement.",
    features: [
      "Full Month Unlimited Access",
      "Advanced Strength & Cardio Equipment",
      "Professional Workout Guidance",
      "Personalized Workout Suggestions",
      "Body Progress Tracking",
      "Fat Loss & Muscle Gain Support",
      "Consistency & Recovery Guidance",
      "Performance Improvement Support",
      "Comfortable & Professional Atmosphere",
      "Dedicated Fitness Assistance",
      "Transformation Progress Monitoring",
      "Nutrition & Meal Guidance Support"
    ],
    popular: false,
    icon: Crown,
    cta: "Select MONTHLY PLAN",
  },
  {
    id: "admission",
    tier: "ADMISSION + MONTHLY",
    price: 1500,
    displayPrice: "1,500",
    period: "registration",
    description: "One-time admission and membership activation process for new members joining the PRO FITNESS transformation environment.",
    features: [
      "Membership Registration Included",
      "First Month Activation Support",
      "Personalized Fitness Assessment",
      "Workout Goal Planning",
      "Beginner Guidance Support",
      "Fitness Progress Consultation",
      "Nutrition Guidance Introduction",
      "Gym Rules & Safety Orientation",
      "Professional Training Environment Access",
      "Transformation Journey Setup"
    ],
    popular: false,
    icon: Check,
    cta: "Start Membership",
  }
];

const FAQS = [
  {
    question: "Do I have to pay an admission fee?",
    answer: "Yes, new members must choose the 'Admission + Monthly Advance' plan which covers your one-time registration and your first month of training."
  },
  {
    question: "Is personal training included in the monthly plan?",
    answer: "The monthly plan includes a basic fitness assessment. One-on-one personal training is available for an additional premium fee."
  },
  {
    question: "Can I upgrade from a daily or weekly pass to a monthly plan?",
    answer: "Absolutely! Just pay the admission fee and the monthly plan amount when you're ready to commit to your transformation."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept UPI (GPay, PhonePe, Paytm), Cards via Razorpay, QR Code at the reception, and Cash."
  }
];

const PAYMENT_METHODS = [
  { icon: Smartphone, label: "UPI Payment", desc: "PhonePe, GPay, Paytm", type: "upi" },
  { icon: QrCode, label: "QR Code", desc: "Scan at reception", type: "qr" },
  { icon: CreditCard, label: "Razorpay", desc: "Cards, wallets & netbanking", type: "razorpay" },
  { icon: Shield, label: "Cash", desc: "Pay at reception", type: "cash" },
];

/* ─────────────────────────────────────────────
   MAGNETIC BUTTON
───────────────────────────────────────────── */
function MagneticButton({ children, className, onClick, disabled }: any) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  
  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;
    
    const xTo = gsap.quickTo(button, "x", { duration: 1, ease: "elastic.out(1, 0.3)" });
    const yTo = gsap.quickTo(button, "y", { duration: 1, ease: "elastic.out(1, 0.3)" });

    const handleMouseMove = (e: MouseEvent) => {
      const rect = button.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) * 0.2;
      const y = (e.clientY - rect.top - rect.height / 2) * 0.2;
      xTo(x);
      yTo(y);
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
    };

    button.addEventListener("mousemove", handleMouseMove);
    button.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      button.removeEventListener("mousemove", handleMouseMove);
      button.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <button ref={buttonRef} className={className} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}

/* ─────────────────────────────────────────────
   ACCORDION ITEM
───────────────────────────────────────────── */
function FAQItem({ faq, isOpen, onClick }: { faq: typeof FAQS[0], isOpen: boolean, onClick: () => void }) {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      gsap.to(contentRef.current, { height: "auto", duration: 0.4, ease: "power3.out" });
    } else {
      gsap.to(contentRef.current, { height: 0, duration: 0.4, ease: "power3.inOut" });
    }
  }, [isOpen]);

  return (
    <div className="border-b border-zinc-800">
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between py-6 text-left group"
      >
        <span className="text-lg font-medium text-zinc-200 group-hover:text-[#FFD600] transition-colors">
          {faq.question}
        </span>
        <div className="relative w-6 h-6 flex items-center justify-center flex-shrink-0">
          <motion.div animate={{ rotate: isOpen ? 135 : 0 }} transition={{ duration: 0.3, ease: "easeInOut" }}>
            <Plus className={cn("w-5 h-5 text-zinc-400 group-hover:text-[#FFD600] transition-colors", isOpen && "text-[#FFD600]")} />
          </motion.div>
        </div>
      </button>
      <div ref={contentRef} className="h-0 overflow-hidden">
        <div className="pb-6 text-zinc-400 leading-relaxed">
          {faq.answer}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────── */
export default function MembershipPage() {
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [modal, setModal] = useState<typeof PLANS[0] | null>(null);
  const [payMethod, setPayMethod] = useState<string | null>(null);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Cinematic entrance
    const ctx = gsap.context(() => {
      gsap.fromTo(".cinematic-text", 
        { y: 50, opacity: 0, filter: "blur(10px)" }, 
        { y: 0, opacity: 1, filter: "blur(0px)", duration: 1.2, stagger: 0.2, ease: "power4.out" }
      );
    }, heroRef);
    return () => ctx.revert();
  }, []);

  /* Razorpay handler */
  const openRazorpay = async (plan: typeof PLANS[0]) => {
    setLoadingId(plan.id);
    await new Promise<void>((res) => {
      if ((window as any).Razorpay) { res(); return; }
      const s = document.createElement("script");
      s.src = "https://checkout.razorpay.com/v1/checkout.js";
      s.onload = () => res(); document.body.appendChild(s);
    });
    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_mock",
      amount: plan.price * 100,
      currency: "INR",
      name: "PRO FITNESS",
      description: `${plan.tier} Membership`,
      image: "/logo.png",
      handler: (r: any) => {
        alert(`✅ Payment Successful!\nID: ${r.razorpay_payment_id}\n\nWelcome to PRO FITNESS!`);
        setLoadingId(null); setModal(null); setPayMethod(null);
      },
      theme: { color: "#FFD600" },
    };
    const rz = new (window as any).Razorpay(options);
    rz.on("payment.failed", () => { alert("Payment failed."); setLoadingId(null); });
    rz.open();
  };

  const handlePay = (plan: typeof PLANS[0]) => {
    if (payMethod === "razorpay") return openRazorpay(plan);
    if (payMethod === "upi") {
      window.open(`upi://pay?pa=profitnessindia@upi&pn=PRO+FITNESS&am=${plan.price}&cu=INR`, "_blank");
    } else {
      alert(payMethod === "qr"
        ? "Please visit PRO FITNESS reception to scan the QR code."
        : "Please visit PRO FITNESS reception to pay in cash and collect your receipt.");
      setModal(null); setPayMethod(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white selection:bg-[#FFD600] selection:text-black">
      
      {/* ─────────────────────────────────────────────
          HERO
      ───────────────────────────────────────────── */}
      <section ref={heroRef} className="relative pt-40 pb-20 overflow-hidden flex flex-col items-center text-center px-4">
        {/* Soft Ambient Background Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#FFD600]/5 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="cinematic-text mb-6">
          <div className="inline-flex items-center gap-2 bg-[#FFD600]/10 border border-[#FFD600]/20 rounded-full px-5 py-2">
            <Crown className="w-4 h-4 text-[#FFD600]" />
            <span className="text-[#FFD600] text-xs font-black uppercase tracking-[0.2em]">Elevate Your Limits</span>
          </div>
        </div>

        <h1 className="cinematic-text text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-none mb-6 text-white drop-shadow-2xl">
          CHOOSE YOUR <br/>
          <span className="text-[#FFD600]">FITNESS JOURNEY</span>
        </h1>
        
        <p className="cinematic-text text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
          Professional training, disciplined environment, and real transformation support designed for every fitness level.
        </p>
      </section>

      {/* ─────────────────────────────────────────────
          PRICING GRID
      ───────────────────────────────────────────── */}
      <section className="container mx-auto px-4 pb-24 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-8 max-w-7xl mx-auto items-stretch">
          {PLANS.map((plan, i) => {
            const Icon = plan.icon;
            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className={cn(
                  "relative flex flex-col p-8 rounded-3xl bg-[#111111] border transition-all duration-500 overflow-hidden group",
                  plan.popular 
                    ? "border-[#FFD600]/40 shadow-[0_0_50px_rgba(255,214,0,0.1)] lg:-translate-y-4" 
                    : "border-zinc-800 hover:border-zinc-600 hover:bg-[#161616]"
                )}
                style={{
                  boxShadow: plan.popular ? "0 0 50px rgba(255, 214, 0, 0.1)" : undefined
                }}
              >
                {/* Hover Soft Glow for non-popular */}
                {!plan.popular && (
                  <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                )}

                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute top-0 inset-x-0 flex justify-center">
                    <div className="bg-[#FFD600] text-black text-[10px] font-black px-4 py-1.5 rounded-b-xl uppercase tracking-[0.2em] shadow-lg">
                      Most Popular
                    </div>
                  </div>
                )}

                {/* Header */}
                <div className={cn("flex items-center gap-3 mb-6", plan.popular && "mt-4")}>
                  <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center", 
                    plan.popular ? "bg-[#FFD600]/20 text-[#FFD600]" : "bg-zinc-800 text-zinc-400 group-hover:text-white transition-colors"
                  )}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-black text-xl uppercase tracking-wider text-white">{plan.tier}</h3>
                  </div>
                </div>

                {/* Price */}
                <div className="mb-4 flex items-baseline gap-1">
                  <span className={cn("text-2xl font-bold", plan.popular ? "text-[#FFD600]" : "text-zinc-500")}>₹</span>
                  <span className="text-5xl font-black text-white">{plan.displayPrice}</span>
                </div>
                <div className="text-zinc-500 text-sm font-medium uppercase tracking-widest mb-6">
                  {plan.period}
                </div>

                <p className="text-zinc-400 text-sm leading-relaxed mb-8 min-h-[4rem]">
                  {plan.description}
                </p>

                {/* Features */}
                <ul className="space-y-4 mb-10 flex-1">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <div className={cn("mt-1 w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0", 
                        plan.popular ? "bg-[#FFD600]/20" : "bg-zinc-800"
                      )}>
                        <Check className={cn("w-2.5 h-2.5", plan.popular ? "text-[#FFD600]" : "text-zinc-400")} />
                      </div>
                      <span className="text-zinc-300 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <MagneticButton
                  onClick={() => { setModal(plan); setPayMethod(null); }}
                  className={cn(
                    "w-full py-4 rounded-xl font-black uppercase tracking-widest text-sm transition-all duration-300 flex items-center justify-center gap-2",
                    plan.popular
                      ? "bg-[#FFD600] text-black shadow-[0_0_20px_rgba(255,214,0,0.3)] hover:bg-white hover:shadow-[0_0_30px_rgba(255,214,0,0.5)]"
                      : "bg-zinc-800 text-white hover:bg-zinc-700"
                  )}
                >
                  {plan.cta}
                  <ChevronRight className="w-4 h-4" />
                </MagneticButton>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ─────────────────────────────────────────────
          PROFESSIONAL MESSAGE
      ───────────────────────────────────────────── */}
      <section className="bg-[#0A0A0A] py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#111111] to-[#0A0A0A]" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex-1 space-y-6 text-center md:text-left"
            >
              <h3 className="text-2xl md:text-3xl font-bebas tracking-wide text-white">
                “Consistency, discipline, and proper guidance create real transformation.”
              </h3>
              <p className="text-[#FFD600] font-black uppercase tracking-widest text-sm">
                Train smart, train safely.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex-1 border-l-2 border-[#FFD600]/20 pl-8"
            >
              <p className="text-zinc-400 text-lg leading-relaxed">
                <span className="text-white font-medium">Professional environment.</span><br />
                <span className="text-white font-medium">Focused training.</span><br />
                <span className="text-[#FFD600] font-bold">Real progress.</span>
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────
          FAQ SECTION
      ───────────────────────────────────────────── */}
      <section className="bg-[#050505] py-24 border-t border-zinc-900">
        <div className="container mx-auto px-4 max-w-3xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4 text-white">
              Frequent <span className="text-[#FFD600]">Questions</span>
            </h2>
            <p className="text-zinc-400 text-lg">Everything you need to know about memberships.</p>
          </motion.div>

          <div className="space-y-2">
            {FAQS.map((faq, index) => (
              <FAQItem 
                key={index} 
                faq={faq} 
                isOpen={openFaqIndex === index} 
                onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)} 
              />
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────
          PAYMENT MODAL
      ───────────────────────────────────────────── */}
      <AnimatePresence>
        {modal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => { if (e.target === e.currentTarget) { setModal(null); setPayMethod(null); } }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center px-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="w-full max-w-md bg-[#111111] border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl"
            >
              <div className="p-6 border-b border-zinc-800 bg-gradient-to-b from-[#1a1810] to-[#111111]">
                <div className="flex justify-between items-start mb-4">
                  <div className="text-[#FFD600] text-xs font-black uppercase tracking-[0.2em]">
                    Checkout
                  </div>
                  <button 
                    onClick={() => { setModal(null); setPayMethod(null); }}
                    className="w-8 h-8 rounded-full bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center text-zinc-400 transition-colors"
                  >
                    ✕
                  </button>
                </div>
                <h3 className="text-2xl font-black uppercase tracking-tight text-white mb-2">{modal.tier}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-[#FFD600] text-xl font-bold">₹</span>
                  <span className="text-5xl font-black text-white">{modal.displayPrice}</span>
                </div>
              </div>

              <div className="p-6">
                <p className="text-zinc-500 text-xs font-black uppercase tracking-[0.15em] mb-4">
                  Select Payment Method
                </p>
                <div className="space-y-3 mb-6">
                  {PAYMENT_METHODS.map((method) => {
                    const Icon = method.icon;
                    const isSelected = payMethod === method.type;
                    return (
                      <button key={method.type}
                        onClick={() => setPayMethod(method.type)}
                        className={cn(
                          "w-full flex items-center gap-4 p-4 rounded-xl border transition-all text-left",
                          isSelected
                            ? "border-[#FFD600] bg-[#FFD600]/10"
                            : "border-zinc-800 bg-zinc-900/50 hover:border-zinc-700 hover:bg-zinc-800"
                        )}
                      >
                        <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0", 
                          isSelected ? "bg-[#FFD600]/20" : "bg-zinc-800"
                        )}>
                          <Icon className={cn("w-5 h-5", isSelected ? "text-[#FFD600]" : "text-zinc-400")} />
                        </div>
                        <div className="flex-1">
                          <div className={cn("font-bold text-sm", isSelected ? "text-white" : "text-zinc-300")}>
                            {method.label}
                          </div>
                          <div className="text-zinc-500 text-xs">{method.desc}</div>
                        </div>
                        {isSelected && (
                          <div className="w-5 h-5 rounded-full bg-[#FFD600] flex items-center justify-center">
                            <Check className="w-3 h-3 text-black" />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>

                <MagneticButton
                  disabled={!payMethod || loadingId === modal.id}
                  onClick={() => handlePay(modal)}
                  className="w-full py-4 bg-[#FFD600] text-black font-black uppercase tracking-widest rounded-xl hover:bg-white transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm flex items-center justify-center shadow-[0_0_20px_rgba(255,214,0,0.2)]"
                >
                  {loadingId === modal.id
                    ? "Processing..."
                    : payMethod
                    ? `Pay ₹${modal.displayPrice}`
                    : "Select Method"}
                </MagneticButton>
                
                <div className="flex items-center justify-center gap-4 mt-4 opacity-70">
                  <div className="flex items-center gap-1.5">
                    <Shield className="w-3 h-3 text-zinc-500" />
                    <span className="text-zinc-500 text-[10px] uppercase font-bold tracking-wider">Secure</span>
                  </div>
                  <div className="w-1 h-1 rounded-full bg-zinc-700" />
                  <div className="flex items-center gap-1.5">
                    <Download className="w-3 h-3 text-zinc-500" />
                    <span className="text-zinc-500 text-[10px] uppercase font-bold tracking-wider">Receipt</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
