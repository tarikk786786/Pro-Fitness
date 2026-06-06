"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

export default function MembershipPage() {
  const plans = [
    {
      name: "DAILY PASS",
      price: "₹200",
      duration: "Per Day",
      features: [
        "Full Gym Access",
        "Weight Training Area",
        "Cardio Section",
        "Safe Environment"
      ],
      popular: false
    },
    {
      name: "WEEKLY PLAN",
      price: "₹500",
      duration: "For 7 Days",
      features: [
        "Full Gym Access",
        "Weight Training Area",
        "Cardio Section",
        "Safe Environment"
      ],
      popular: false
    },
    {
      name: "MONTHLY PLAN",
      price: "₹1000",
      duration: "Per Month",
      features: [
        "Full Gym Access",
        "Weight Training Area",
        "Cardio Section",
        "Professional Guidance",
        "Safe Environment"
      ],
      popular: true
    },
    {
      name: "ADMISSION + MONTHLY",
      price: "₹1500",
      duration: "First Month",
      breakdown: "₹500 Admission + ₹1000 Advance",
      features: [
        "Full Gym Access",
        "Weight Training Area",
        "Cardio Section",
        "Professional Guidance",
        "Safe Environment"
      ],
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-[#111111] text-white pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            Membership <span className="text-[#FFD600]">Plans</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-400 max-w-2xl mx-auto"
          >
            Simple, transparent pricing. No hidden fees. 
            Choose the plan that fits your fitness journey.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {plans.map((plan, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + (index * 0.1) }}
              className={`relative bg-[#1a1a1a] rounded-2xl border ${plan.popular ? 'border-[#FFD600]' : 'border-white/10'} p-8 flex flex-col hover:border-[#FFD600]/50 transition-colors`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#FFD600] text-black px-4 py-1 rounded-full text-xs font-bold tracking-wider whitespace-nowrap">
                  MOST POPULAR
                </div>
              )}
              
              <div className="text-center mb-8">
                <h3 className="text-lg font-bold text-gray-300 mb-4">{plan.name}</h3>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-4xl font-extrabold text-white">{plan.price}</span>
                </div>
                <p className="text-sm text-gray-400 mt-2">{plan.duration}</p>
                {plan.breakdown && (
                  <p className="text-xs text-[#FFD600] mt-2 font-medium">{plan.breakdown}</p>
                )}
              </div>

              <div className="flex-grow space-y-4 mb-8">
                {plan.features.map((feature, fIndex) => (
                  <div key={fIndex} className="flex items-start gap-3">
                    <div className="mt-1 bg-white/5 rounded-full p-1 shrink-0">
                      <Check className="w-3 h-3 text-[#FFD600]" />
                    </div>
                    <span className="text-sm text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>

              <button className={`w-full py-3 rounded-lg font-bold transition-colors ${plan.popular ? 'bg-[#FFD600] text-black hover:bg-[#e6c100]' : 'bg-white/5 text-white hover:bg-white/10 border border-white/10'}`}>
                Choose Plan
              </button>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}
