"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check, Shield, Zap, Star, CreditCard, QrCode, Smartphone,
  Trophy, Target, Crown, ChevronRight, Dumbbell, MapPin,
  Phone, Mail, Clock, Award, Download, Users, Sparkles
} from "lucide-react";
import { cn } from "@/lib/utils";

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const PLANS = [
  {
    id: "basic",
    tier: "BASIC",
    tagline: "Start Your Journey",
    price: 999,
    displayPrice: "999",
    description:
      "A perfect starting point for individuals beginning their fitness journey with essential gym access and guided support.",
    popular: false,
    icon: Target,
    accent: "#a3a3a3",
    glowColor: "rgba(163,163,163,0.12)",
    borderIdle: "border-zinc-700/60",
    borderHover: "hover:border-zinc-500",
    cta: "Choose Basic",
    features: [
      "Full Gym Floor Access",
      "Beginner Workout Guidance",
      "Group Classes (2 per month)",
      "Locker Room Access",
      "Fitness Progress Tracking",
      "Safe Training Environment",
      "Trainer Support During Workout",
    ],
  },
  {
    id: "pro",
    tier: "PRO",
    tagline: "Serious Transformation",
    price: 1999,
    displayPrice: "1,999",
    description:
      "Designed for members who want structured transformation with advanced AI coaching, unlimited classes, and full nutrition support.",
    popular: true,
    icon: Trophy,
    accent: "#FFD700",
    glowColor: "rgba(255,215,0,0.14)",
    borderIdle: "border-[#FFD700]/70",
    borderHover: "hover:border-[#FFD700]",
    cta: "Choose Pro",
    features: [
      "Everything in Basic",
      "Advanced AI Coach Access",
      "Custom Diet & Nutrition Plans",
      "Unlimited Group Classes",
      "Monthly Body Composition Scan",
      "Priority Trainer Assignment",
      "Dedicated Member Dashboard",
      "WhatsApp Fitness Reminders",
    ],
  },
  {
    id: "elite",
    tier: "ELITE",
    tagline: "The Ultimate Experience",
    price: 3999,
    displayPrice: "3,999",
    description:
      "The pinnacle of professional fitness. Personal trainer sessions, spa recovery, dietitian consultations, and VIP priority support.",
    popular: false,
    icon: Crown,
    accent: "#e2c96a",
    glowColor: "rgba(226,201,106,0.10)",
    borderIdle: "border-[#e2c96a]/40",
    borderHover: "hover:border-[#e2c96a]/80",
    cta: "Choose Elite",
    features: [
      "Everything in Pro",
      "4 Personal Training Sessions / mo",
      "Spa & Recovery Room Access",
      "Registered Dietitian Consultation",
      "Priority Support (24-hr response)",
      "Quarterly Transformation Review",
      "VIP Locker & Towel Service",
      "Exclusive Member Events",
    ],
  },
];

const PAYMENT_METHODS = [
  { icon: Smartphone, label: "UPI Payment",     desc: "PhonePe, GPay, Paytm",      type: "upi"  },
  { icon: QrCode,     label: "QR Code",          desc: "Scan at reception",          type: "qr"   },
  { icon: CreditCard, label: "Razorpay",          desc: "Cards, wallets & netbanking",type: "razorpay" },
  { icon: Shield,     label: "Cash",              desc: "Pay at reception",           type: "cash" },
];

const BRAND_MESSAGES = [
  { icon: "🔥", text: "Consistency builds transformation." },
  { icon: "🧠", text: "Train smart, train safely." },
  { icon: "🏋️", text: "Professional guidance for every member." },
  { icon: "🚀", text: "Your fitness journey starts here." },
];

/* ─────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────── */
export default function MembershipPage() {
  const [loadingId, setLoadingId]     = useState<string | null>(null);
  const [modal, setModal]             = useState<typeof PLANS[0] | null>(null);
  const [payMethod, setPayMethod]     = useState<string | null>(null);

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
      theme: { color: "#FFD700" },
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
    <div className="min-h-screen bg-[#070707] text-white overflow-x-hidden">

      {/* ══════════════════════════════════════
          HERO / HEADER
      ══════════════════════════════════════ */}
      <section className="relative pt-36 pb-28 text-center overflow-hidden">
        {/* Ambient light blobs */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-[#FFD700]/7 rounded-full blur-[130px]" />
          <div className="absolute top-60 left-0 w-[400px] h-[400px] bg-[#FFD700]/4 rounded-full blur-[100px]" />
          <div className="absolute top-60 right-0 w-[400px] h-[400px] bg-[#FFD700]/4 rounded-full blur-[100px]" />
          {/* Grid lines */}
          <div className="absolute inset-0 opacity-[0.03]"
            style={{ backgroundImage: "linear-gradient(#FFD700 1px,transparent 1px),linear-gradient(90deg,#FFD700 1px,transparent 1px)", backgroundSize: "60px 60px" }} />
        </div>

        <div className="relative z-10 container mx-auto px-4">
          {/* Pill badge */}
          <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-[#FFD700]/10 border border-[#FFD700]/30 rounded-full px-5 py-2 mb-8">
            <Sparkles className="w-4 h-4 text-[#FFD700]" />
            <span className="text-[#FFD700] text-xs font-black uppercase tracking-[0.2em]">PRO FITNESS · Balasore</span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-none mb-6">
            Premium
            <br />
            <span className="text-[#FFD700] relative">
              Membership Tiers
              <svg className="absolute -bottom-2 left-0 w-full" height="6" viewBox="0 0 400 6" fill="none">
                <path d="M0 3 Q200 0 400 3" stroke="#FFD700" strokeWidth="2" strokeOpacity="0.5"/>
              </svg>
            </span>
          </motion.h1>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.16 }}
            className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Choose the membership plan that matches your fitness goals, training style, and commitment level.
            Flexible access, professional guidance, and a disciplined fitness environment designed for real transformation.
          </motion.p>
        </div>
      </section>

      {/* ══════════════════════════════════════
          PRICING CARDS
      ══════════════════════════════════════ */}
      <section className="container mx-auto px-4 pb-28">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {PLANS.map((plan, i) => {
            const Icon = plan.icon;
            return (
              <motion.div key={plan.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className={cn(
                  "relative flex flex-col rounded-3xl border transition-all duration-500 overflow-hidden group",
                  "bg-gradient-to-b from-[#111111] to-[#0a0a0a]",
                  plan.borderIdle, plan.borderHover,
                  plan.popular
                    ? "md:-translate-y-5 shadow-[0_0_80px_rgba(255,215,0,0.14)]"
                    : "hover:-translate-y-2 hover:shadow-[0_24px_64px_rgba(0,0,0,0.5)]"
                )}
                style={{ boxShadow: plan.popular ? `0 0 80px ${plan.glowColor}` : undefined }}
              >
                {/* Top accent line */}
                <div className="h-[3px] w-full" style={{ background: `linear-gradient(90deg, transparent, ${plan.accent}, transparent)` }} />

                {/* Popular badge */}
                {plan.popular && (
                  <div className="absolute -top-[14px] left-1/2 -translate-x-1/2 z-20">
                    <div className="flex items-center gap-1.5 bg-[#FFD700] text-black text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-[0.18em] shadow-xl whitespace-nowrap">
                      <Star className="w-3 h-3 fill-black" /> Most Popular
                    </div>
                  </div>
                )}

                <div className="p-8 flex flex-col flex-1">
                  {/* Tier icon + name */}
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <div className="flex items-center gap-2.5 mb-3">
                        <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                          style={{ background: `${plan.accent}18` }}>
                          <Icon className="w-5 h-5" style={{ color: plan.accent }} />
                        </div>
                        <div>
                          <div className="text-[10px] font-black uppercase tracking-[0.2em]"
                            style={{ color: plan.accent }}>{plan.tagline}</div>
                        </div>
                      </div>
                      <h3 className="text-3xl font-black uppercase tracking-tight text-white">{plan.tier}</h3>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="mb-6">
                    <div className="flex items-baseline gap-1 mb-1">
                      <span className="text-2xl font-bold" style={{ color: plan.accent }}>₹</span>
                      <span className="text-6xl font-black text-white leading-none">{plan.displayPrice}</span>
                    </div>
                    <div className="text-zinc-500 text-sm font-medium">per month</div>
                    <div className="w-10 h-[3px] rounded-full mt-4" style={{ background: plan.accent }} />
                  </div>

                  {/* Description */}
                  <p className="text-zinc-400 text-sm leading-relaxed mb-8 min-h-[60px]">
                    {plan.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-3 mb-10 flex-1">
                    {plan.features.map((f, j) => (
                      <motion.li key={j}
                        initial={{ opacity: 0, x: -8 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.05 * j + 0.2 }}
                        className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5"
                          style={{ background: `${plan.accent}20` }}>
                          <Check className="w-3 h-3" style={{ color: plan.accent }} />
                        </div>
                        <span className="text-zinc-300 text-sm font-medium leading-snug group-hover:text-zinc-200 transition-colors">
                          {f}
                        </span>
                      </motion.li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <button
                    onClick={() => { setModal(plan); setPayMethod(null); }}
                    className={cn(
                      "relative w-full py-4 rounded-2xl font-black uppercase tracking-widest text-sm transition-all duration-300 overflow-hidden group/btn",
                      plan.popular
                        ? "bg-[#FFD700] text-black shadow-[0_0_30px_rgba(255,215,0,0.25)] hover:bg-white hover:shadow-[0_0_50px_rgba(255,215,0,0.4)]"
                        : "bg-zinc-800/80 text-white border border-zinc-700 hover:border-transparent"
                    )}
                    style={!plan.popular ? { "--hover-bg": plan.accent } as any : {}}
                    onMouseEnter={(e) => { if (!plan.popular) { (e.currentTarget as any).style.background = plan.accent; (e.currentTarget as any).style.color = "#000"; } }}
                    onMouseLeave={(e) => { if (!plan.popular) { (e.currentTarget as any).style.background = ""; (e.currentTarget as any).style.color = ""; } }}
                  >
                    <span className="flex items-center justify-center gap-2">
                      {plan.cta}
                      <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </span>
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Admission info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto mt-12"
        >
          <div className="flex items-center justify-center gap-3 bg-[#111] border border-[#FFD700]/20 rounded-2xl px-8 py-5">
            <Award className="w-5 h-5 text-[#FFD700] flex-shrink-0" />
            <p className="text-zinc-400 text-sm text-center leading-relaxed">
              <span className="text-[#FFD700] font-bold">Admission ₹1,000 + Monthly Advance ₹1,000</span>
              {" "}— Required for monthly membership activation.
            </p>
          </div>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════
          BRAND MESSAGES
      ══════════════════════════════════════ */}
      <section className="border-y border-zinc-900 bg-[#050505] py-14 mb-0">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {BRAND_MESSAGES.map((msg, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="text-center px-4 py-6 rounded-2xl bg-zinc-900/40 border border-zinc-800/60 hover:border-[#FFD700]/25 transition-colors">
                <div className="text-3xl mb-3">{msg.icon}</div>
                <p className="text-zinc-300 text-sm font-medium italic leading-relaxed">&ldquo;{msg.text}&rdquo;</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          GYM TIMINGS + PAYMENT + CONTACT
      ══════════════════════════════════════ */}
      <section className="container mx-auto px-4 py-24">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">

          {/* Timings */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-[#111] border border-zinc-800 rounded-3xl p-8"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-[#FFD700]/15 rounded-xl flex items-center justify-center">
                <Clock className="w-5 h-5 text-[#FFD700]" />
              </div>
              <h2 className="font-black text-xl uppercase tracking-wider">Gym Timings</h2>
            </div>
            <div className="space-y-4">
              {[
                { emoji: "🌅", label: "Morning", time: "6:00 AM – 10:00 AM", days: "Monday – Saturday", color: "text-amber-400" },
                { emoji: "🌆", label: "Evening", time: "4:00 PM – 10:00 PM", days: "Monday – Saturday", color: "text-orange-400" },
                { emoji: "🔒", label: "Sunday",  time: "CLOSED",              days: "Rest & Recovery",   color: "text-zinc-500" },
              ].map((slot, i) => (
                <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800">
                  <span className="text-2xl">{slot.emoji}</span>
                  <div className="flex-1">
                    <div className={cn("font-black text-sm uppercase tracking-wider", slot.color)}>{slot.label}</div>
                    <div className="text-zinc-500 text-xs mt-0.5">{slot.days}</div>
                  </div>
                  <div className={cn("font-bold text-sm text-right", slot.color)}>{slot.time}</div>
                </div>
              ))}
            </div>

            {/* Payment icons */}
            <div className="mt-8 pt-8 border-t border-zinc-800">
              <p className="text-zinc-500 text-xs uppercase tracking-widest font-bold mb-4">We Accept</p>
              <div className="grid grid-cols-2 gap-3">
                {PAYMENT_METHODS.map((m, i) => {
                  const Icon = m.icon;
                  return (
                    <div key={i} className="flex items-center gap-3 bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3">
                      <Icon className="w-4 h-4 text-[#FFD700]" />
                      <div>
                        <div className="text-white text-xs font-bold">{m.label}</div>
                        <div className="text-zinc-600 text-[10px]">{m.desc}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="mt-3 grid grid-cols-2 gap-3">
                {["Receipt Provided", "Invoice Generation", "Membership Activation", "Renewal Reminders"].map((f, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <Check className="w-3 h-3 text-[#FFD700] flex-shrink-0" />
                    <span className="text-zinc-500 text-[11px]">{f}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-[#111] border border-zinc-800 rounded-3xl p-8 flex flex-col"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-[#FFD700]/15 rounded-xl flex items-center justify-center">
                <Dumbbell className="w-5 h-5 text-[#FFD700]" />
              </div>
              <div>
                <h2 className="font-black text-xl uppercase tracking-wider">PRO FITNESS</h2>
                <p className="text-zinc-500 text-xs">Balasore, Odisha</p>
              </div>
            </div>

            <div className="space-y-5 mb-8 flex-1">
              {[
                { icon: MapPin, label: "Address", value: "Balasore, Odisha – 756001" },
                { icon: Phone,  label: "Phone",   value: "+91 91144 11026" },
                { icon: Mail,   label: "Email",   value: "profitnessindia@gmail.com" },
                { icon: Users,  label: "Community", value: "500+ Active Members" },
              ].map(({ icon: Icon, label, value }, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-9 h-9 bg-zinc-800 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Icon className="w-4 h-4 text-[#FFD700]" />
                  </div>
                  <div>
                    <div className="text-[10px] text-zinc-600 uppercase tracking-widest font-bold mb-0.5">{label}</div>
                    <div className="text-zinc-200 text-sm font-medium">{value}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-3 mt-auto">
              <a href="tel:+919114411026"
                className="flex items-center justify-center gap-2 w-full py-4 bg-[#FFD700] text-black font-black rounded-2xl hover:bg-white transition-all uppercase tracking-widest text-sm shadow-[0_0_20px_rgba(255,215,0,0.2)]">
                <Phone className="w-4 h-4" /> Call Us Now
              </a>
              <a href="https://wa.me/919114411026?text=Hi%2C%20I%20want%20to%20know%20more%20about%20PRO%20FITNESS%20membership"
                target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-4 bg-green-600 hover:bg-green-500 text-white font-black rounded-2xl transition-all uppercase tracking-widest text-sm">
                💬 WhatsApp Us
              </a>
              <p className="text-center text-zinc-600 text-xs pt-2">
                Walk in with ID proof — we&apos;ll get you started immediately.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          PAYMENT MODAL
      ══════════════════════════════════════ */}
      <AnimatePresence>
        {modal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => { if (e.target === e.currentTarget) { setModal(null); setPayMethod(null); } }}
            className="fixed inset-0 z-[300] bg-black/88 backdrop-blur-lg flex items-center justify-center px-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 24 }}
              transition={{ type: "spring", stiffness: 320, damping: 28 }}
              className="w-full max-w-md bg-[#111] border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl"
            >
              {/* Modal header */}
              <div className="relative bg-gradient-to-br from-[#1a1400] to-[#0d0d0d] border-b border-zinc-800 p-7">
                <div className="absolute inset-0 bg-[#FFD700]/4 pointer-events-none" />
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-[#FFD700] text-[10px] font-black uppercase tracking-[0.2em] mb-1">
                      PRO FITNESS MEMBERSHIP
                    </div>
                    <h3 className="text-2xl font-black uppercase tracking-tight text-white mb-2">{modal.tier}</h3>
                    <div className="flex items-baseline gap-1">
                      <span className="text-[#FFD700] text-lg font-bold">₹</span>
                      <span className="text-4xl font-black text-white">{modal.displayPrice}</span>
                      <span className="text-zinc-500 text-sm">/mo</span>
                    </div>
                  </div>
                  <button
                    onClick={() => { setModal(null); setPayMethod(null); }}
                    className="w-9 h-9 rounded-full bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center text-zinc-400 hover:text-white transition-colors text-sm"
                  >✕</button>
                </div>
              </div>

              {/* Methods */}
              <div className="p-7 space-y-3">
                <p className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.18em] mb-4">
                  Select Payment Method
                </p>
                {PAYMENT_METHODS.map((method) => {
                  const Icon = method.icon;
                  const isSelected = payMethod === method.type;
                  return (
                    <button key={method.type}
                      onClick={() => setPayMethod(method.type)}
                      className={cn(
                        "w-full flex items-center gap-4 p-4 rounded-2xl border transition-all text-left",
                        isSelected
                          ? "border-[#FFD700] bg-[#FFD700]/10"
                          : "border-zinc-800 bg-zinc-900/60 hover:border-zinc-600"
                      )}
                    >
                      <div className={cn(
                        "w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0",
                        isSelected ? "bg-[#FFD700]/20" : "bg-zinc-800"
                      )}>
                        <Icon className={cn("w-5 h-5", isSelected ? "text-[#FFD700]" : "text-zinc-400")} />
                      </div>
                      <div className="flex-1">
                        <div className={cn("font-bold text-sm", isSelected ? "text-white" : "text-zinc-300")}>
                          {method.label}
                        </div>
                        <div className="text-zinc-500 text-xs">{method.desc}</div>
                      </div>
                      {isSelected && (
                        <div className="w-5 h-5 rounded-full bg-[#FFD700] flex items-center justify-center">
                          <Check className="w-3 h-3 text-black" />
                        </div>
                      )}
                    </button>
                  );
                })}

                <button
                  disabled={!payMethod || loadingId === modal.id}
                  onClick={() => handlePay(modal)}
                  className="w-full mt-3 py-4 bg-[#FFD700] text-black font-black uppercase tracking-widest rounded-2xl hover:bg-white transition-all disabled:opacity-35 disabled:cursor-not-allowed text-sm shadow-[0_0_20px_rgba(255,215,0,0.2)]"
                >
                  {loadingId === modal.id
                    ? "Processing..."
                    : payMethod
                    ? `Pay ₹${modal.displayPrice}`
                    : "Select a Payment Method"}
                </button>

                <div className="flex items-center justify-center gap-4 pt-2">
                  <div className="flex items-center gap-1.5">
                    <Shield className="w-3 h-3 text-zinc-600" />
                    <span className="text-zinc-600 text-[11px]">Encrypted & Secure</span>
                  </div>
                  <div className="w-px h-3 bg-zinc-800" />
                  <div className="flex items-center gap-1.5">
                    <Download className="w-3 h-3 text-zinc-600" />
                    <span className="text-zinc-600 text-[11px]">Receipt Provided</span>
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
