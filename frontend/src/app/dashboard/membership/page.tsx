"use client";

import { motion } from "framer-motion";
import { CreditCard, CheckCircle2, Shield, Download, Calendar, Bell } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function MembershipPage() {
  const { user } = useAuth();

  const billingHistory = [
    { id: "INV-001", date: "May 1, 2026", amount: "₹1,500", status: "Paid", plan: "MONTHLY PLAN (+Admission)" },
    { id: "INV-002", date: "Apr 1, 2026", amount: "₹1,000", status: "Paid", plan: "MONTHLY PLAN" },
    { id: "INV-003", date: "Mar 1, 2026", amount: "₹1,000", status: "Paid", plan: "MONTHLY PLAN" },
  ];

  return (
    <div className="space-y-8 pb-12">
      <div>
        <h1 className="text-3xl font-black uppercase tracking-tight">Membership & Billing</h1>
        <p className="text-gray-400 mt-1">Manage your active subscription and track payment history.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Current Plan */}
        <div className="lg:col-span-2 space-y-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="bg-white/5 border border-[#FFD700]/30 backdrop-blur-md rounded-3xl p-8 relative overflow-hidden shadow-[0_0_40px_rgba(255,215,0,0.05)]"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#FFD700]/10 blur-[80px] rounded-full pointer-events-none" />
            
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative z-10">
              <div>
                <span className="inline-block px-4 py-1.5 bg-[#FFD700]/20 text-[#FFD700] text-xs font-bold rounded-full mb-4 uppercase tracking-wider">
                  Active Membership
                </span>
                <h2 className="text-4xl font-black mb-2 uppercase">MONTHLY PLAN</h2>
                <div className="flex items-center gap-2 text-gray-400">
                  <Calendar className="w-4 h-4 text-[#FFD700]" />
                  <p>Expiry Date: <span className="text-white font-bold">July 1, 2026</span></p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-5xl font-black text-[#FFD700]">₹1,000<span className="text-xl text-gray-500 font-medium">/mo</span></p>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-white/10 flex flex-col sm:flex-row gap-4 relative z-10">
              <button className="px-8 py-3 bg-[#FFD700] text-black font-bold uppercase tracking-wider rounded-xl hover:bg-white transition-all shadow-[0_0_20px_rgba(255,215,0,0.2)]">
                Renew Now
              </button>
              <button className="px-8 py-3 border border-white/20 text-white font-bold uppercase tracking-wider rounded-xl hover:bg-white/5 transition-all">
                Cancel Membership
              </button>
            </div>
          </motion.div>

          {/* Auto Renewal Reminder */}
          <div className="bg-[#FFD700]/10 border border-[#FFD700]/30 rounded-2xl p-5 flex items-start gap-4">
            <div className="mt-1 bg-[#FFD700]/20 p-2 rounded-full">
              <Bell className="w-5 h-5 text-[#FFD700]" />
            </div>
            <div>
              <h3 className="font-bold text-[#FFD700] mb-1">Auto-Renewal Reminder</h3>
              <p className="text-sm text-gray-300">
                Your membership is set to auto-renew on <strong>July 1, 2026</strong>. We will charge your primary payment method ₹1,000. You can cancel anytime before the renewal date.
              </p>
            </div>
          </div>

          {/* Billing History */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
            <h3 className="text-xl font-bold mb-6 uppercase tracking-wide">Payment History</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-white/10 text-gray-400 text-sm uppercase tracking-wider">
                    <th className="pb-4 font-medium">Invoice</th>
                    <th className="pb-4 font-medium">Date</th>
                    <th className="pb-4 font-medium">Plan</th>
                    <th className="pb-4 font-medium">Amount</th>
                    <th className="pb-4 font-medium">Status</th>
                    <th className="pb-4 font-medium text-right">Receipts</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {billingHistory.map((invoice) => (
                    <tr key={invoice.id} className="text-sm hover:bg-white/5 transition-colors">
                      <td className="py-4 font-medium text-gray-300">{invoice.id}</td>
                      <td className="py-4 text-gray-400">{invoice.date}</td>
                      <td className="py-4 text-gray-300">{invoice.plan}</td>
                      <td className="py-4 font-bold text-[#FFD700]">{invoice.amount}</td>
                      <td className="py-4">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-[#FFD700]/10 text-[#FFD700]">
                          <CheckCircle2 className="w-3.5 h-3.5" /> PAID
                        </span>
                      </td>
                      <td className="py-4 text-right">
                        <button className="text-gray-400 hover:text-[#FFD700] transition-colors" title="Download Invoice">
                          <Download className="w-5 h-5 inline-block" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Payment Method */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2 uppercase tracking-wide">
              <CreditCard className="w-5 h-5 text-[#FFD700]" /> Payment Method
            </h3>
            
            <div className="p-4 bg-black/50 border border-white/10 rounded-xl mb-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-8 bg-white/10 rounded-md flex items-center justify-center">
                  <span className="font-bold italic text-sm">UPI</span>
                </div>
                <div>
                  <p className="font-bold">user@okaxis</p>
                  <p className="text-xs text-gray-400">Linked Account</p>
                </div>
              </div>
              <span className="text-xs bg-[#FFD700]/20 px-2 py-1 rounded text-[#FFD700] font-bold">PRIMARY</span>
            </div>

            <button className="w-full py-3 border border-white/20 rounded-xl text-sm font-bold uppercase tracking-wider hover:bg-white/5 hover:border-[#FFD700]/50 transition-all text-[#FFD700]">
              + Add Payment Method
            </button>
          </div>

          <div className="bg-gradient-to-b from-[#FFD700]/10 to-black/0 border border-[#FFD700]/20 rounded-2xl p-6">
            <Shield className="w-8 h-8 text-[#FFD700] mb-4" />
            <h3 className="text-lg font-bold mb-2 uppercase tracking-wide">Secure Payments</h3>
            <p className="text-sm text-gray-400 mb-4">
              Your payment information is encrypted and securely processed via Razorpay/UPI. We never store your full payment details on our servers.
            </p>
            <div className="flex gap-2">
              <div className="w-10 h-6 bg-white/10 rounded-sm"></div>
              <div className="w-10 h-6 bg-white/10 rounded-sm"></div>
              <div className="w-10 h-6 bg-white/10 rounded-sm"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
