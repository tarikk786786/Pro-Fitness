'use client';

import { useEffect, useRef } from 'react';
import { motion, Variants } from 'framer-motion';
import gsap from 'gsap';
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  Download,
  Receipt,
  CreditCard,
  CalendarDays,
  IndianRupee,
  PieChart as PieChartIcon,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight,
  FileText,
  CheckCircle2,
  Clock,
  RotateCcw,
} from 'lucide-react';
import dynamic from 'next/dynamic';

const RevenueExpenseChart = dynamic(() => import('@/components/admin/FinancesCharts').then(mod => mod.RevenueExpenseChart), { ssr: false, loading: () => <div className="w-full h-full animate-pulse bg-white/5 rounded-xl"></div> });
const MembershipTierPieChart = dynamic(() => import('@/components/admin/FinancesCharts').then(mod => mod.MembershipTierPieChart), { ssr: false, loading: () => <div className="w-full h-full animate-pulse bg-white/5 rounded-xl"></div> });
const ExpenseCategoriesChart = dynamic(() => import('@/components/admin/FinancesCharts').then(mod => mod.ExpenseCategoriesChart), { ssr: false, loading: () => <div className="w-full h-full animate-pulse bg-white/5 rounded-xl"></div> });

// ─── ANIMATION VARIANTS ────────────────────────────────────────────

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring' as const, stiffness: 120, damping: 18 },
  },
};

const cardHover: Variants = {
  rest: { scale: 1 },
  hover: { scale: 1.02, transition: { type: 'spring' as const, stiffness: 300, damping: 20 } },
};

// ─── DATA ───────────────────────────────────────────────────────────

const revenueSummary = [
  { label: 'Today', value: '₹12,400', trend: '+8.2%', up: true, icon: DollarSign },
  { label: 'This Week', value: '₹78,500', trend: '+12.5%', up: true, icon: CalendarDays },
  { label: 'This Month', value: '₹4,85,000', trend: '+5.8%', up: true, icon: CreditCard },
  { label: 'This Year', value: '₹52,30,000', trend: '-2.1%', up: false, icon: IndianRupee },
];

const revenueExpenseData = [
  { month: 'Jan', Revenue: 420000, Expenses: 280000 },
  { month: 'Feb', Revenue: 460000, Expenses: 295000 },
  { month: 'Mar', Revenue: 510000, Expenses: 310000 },
  { month: 'Apr', Revenue: 475000, Expenses: 265000 },
  { month: 'May', Revenue: 530000, Expenses: 320000 },
  { month: 'Jun', Revenue: 485000, Expenses: 290000 },
];

const membershipTierData = [
  { name: 'Daily', value: 45000, percentage: '9%', color: '#FFD600' },
  { name: 'Weekly', value: 89000, percentage: '18%', color: '#FF9500' },
  { name: 'Monthly', value: 280000, percentage: '58%', color: '#00D4FF' },
  { name: 'Yearly', value: 71000, percentage: '15%', color: '#A855F7' },
];

const transactions = [
  { id: 'INV-2024-001', member: 'Rajesh Kumar', amount: '₹4,500', plan: 'Monthly', date: '2024-12-01', status: 'Paid' },
  { id: 'INV-2024-002', member: 'Priya Sharma', amount: '₹12,000', plan: 'Yearly', date: '2024-12-01', status: 'Paid' },
  { id: 'INV-2024-003', member: 'Arun Patel', amount: '₹200', plan: 'Daily', date: '2024-12-02', status: 'Pending' },
  { id: 'INV-2024-004', member: 'Sneha Reddy', amount: '₹1,200', plan: 'Weekly', date: '2024-12-02', status: 'Paid' },
  { id: 'INV-2024-005', member: 'Vikram Singh', amount: '₹4,500', plan: 'Monthly', date: '2024-12-03', status: 'Refunded' },
  { id: 'INV-2024-006', member: 'Ananya Gupta', amount: '₹4,500', plan: 'Monthly', date: '2024-12-03', status: 'Paid' },
  { id: 'INV-2024-007', member: 'Karthik Nair', amount: '₹200', plan: 'Daily', date: '2024-12-04', status: 'Pending' },
  { id: 'INV-2024-008', member: 'Deepa Joshi', amount: '₹12,000', plan: 'Yearly', date: '2024-12-04', status: 'Paid' },
  { id: 'INV-2024-009', member: 'Rohit Mehra', amount: '₹1,200', plan: 'Weekly', date: '2024-12-05', status: 'Paid' },
  { id: 'INV-2024-010', member: 'Kavya Iyer', amount: '₹4,500', plan: 'Monthly', date: '2024-12-05', status: 'Pending' },
  { id: 'INV-2024-011', member: 'Suresh Rao', amount: '₹200', plan: 'Daily', date: '2024-12-06', status: 'Paid' },
  { id: 'INV-2024-012', member: 'Meena Das', amount: '₹4,500', plan: 'Monthly', date: '2024-12-06', status: 'Refunded' },
];

const expenseCategories = [
  { category: 'Salaries', amount: 180000 },
  { category: 'Rent', amount: 120000 },
  { category: 'Equipment', amount: 65000 },
  { category: 'Marketing', amount: 42000 },
  { category: 'Utilities', amount: 28000 },
  { category: 'Maintenance', amount: 18000 },
];

// ─── HELPERS ────────────────────────────────────────────────────────

const statusConfig: Record<string, { bg: string; text: string; icon: typeof CheckCircle2 }> = {
  Paid: { bg: 'bg-emerald-500/15', text: 'text-emerald-400', icon: CheckCircle2 },
  Pending: { bg: 'bg-amber-500/15', text: 'text-amber-400', icon: Clock },
  Refunded: { bg: 'bg-red-500/15', text: 'text-red-400', icon: RotateCcw },
};

const formatCurrency = (value: number) => {
  return `₹${value.toLocaleString('en-IN')}`;
};

// ─── CUSTOM TOOLTIP COMPONENTS MOVED TO FinanceCharts.tsx ────────

// ─── PAGE COMPONENT ─────────────────────────────────────────────────

export default function FinancesPage() {
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (headerRef.current) {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: -30 },
        { opacity: 1, y: 0, duration: 1, ease: 'power4.out' }
      );
    }
  }, []);

  return (
    <motion.div
      className="space-y-8 max-w-[1400px] mx-auto pb-12"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* ── HEADER ─────────────────────────────────────────────────── */}
      <div ref={headerRef} className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6">
        <div>
          <h1 className="text-4xl font-black tracking-tight mb-2 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
            Financial Reporting
          </h1>
          <p className="text-gray-400 font-medium flex items-center gap-2">
            <Receipt className="w-4 h-4" /> Invoicing, revenue analytics &amp; expense tracking
          </p>
        </div>
        <button className="group flex items-center gap-2 bg-[#FFD600] text-black px-6 py-3 rounded-full font-black hover:bg-white transition-all shadow-[0_0_20px_rgba(255,214,0,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)]">
          <FileText className="w-5 h-5" /> Export Report
        </button>
      </div>

      {/* ── 1. REVENUE SUMMARY CARDS ───────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {revenueSummary.map((card, i) => (
          <motion.div
            key={card.label}
            variants={itemVariants}
            whileHover="hover"
            initial="rest"
            animate="rest"
          >
            <motion.div
              variants={cardHover}
              className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 overflow-hidden group hover:bg-white/[0.08] transition-colors cursor-default"
            >
              {/* Glow accent */}
              <div
                className="absolute -top-12 -right-12 w-32 h-32 rounded-full blur-[60px] opacity-20 group-hover:opacity-40 transition-opacity"
                style={{ backgroundColor: card.up ? '#FFD600' : '#FF4444' }}
              />

              <div className="flex justify-between items-start mb-4 relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-black/50 flex items-center justify-center border border-white/10 group-hover:border-white/20 transition-colors">
                  <card.icon className="w-6 h-6 text-[#FFD600]" />
                </div>
                <div
                  className={`flex items-center gap-1 text-sm font-bold px-2.5 py-1 rounded-lg ${
                    card.up
                      ? 'bg-emerald-500/15 text-emerald-400'
                      : 'bg-red-500/15 text-red-400'
                  }`}
                >
                  {card.up ? (
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  ) : (
                    <ArrowDownRight className="w-3.5 h-3.5" />
                  )}
                  {card.trend}
                </div>
              </div>

              <div className="relative z-10">
                <p className="text-gray-400 font-medium text-sm tracking-wide uppercase mb-1">
                  {card.label}
                </p>
                <p className="text-3xl font-black tracking-tight">{card.value}</p>
              </div>

              {/* Bottom progress accent */}
              <div className="absolute bottom-0 left-0 h-1 bg-white/5 w-full">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 1.5, delay: i * 0.15, ease: 'easeOut' }}
                  className="h-full rounded-r-full"
                  style={{ backgroundColor: card.up ? '#FFD600' : '#FF4444' }}
                />
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* ── 2 & 3. CHARTS ROW ─────────────────────────────────────── */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Revenue vs Expenses Bar Chart */}
        <motion.div
          variants={itemVariants}
          className="xl:col-span-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 sm:p-8"
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <h3 className="text-xl font-black tracking-tight flex items-center gap-3">
              <div className="w-2 h-8 bg-[#FFD600] rounded-full shadow-[0_0_10px_rgba(255,214,0,0.5)]" />
              Revenue vs Expenses
            </h3>
            <div className="flex items-center gap-4 text-xs font-bold">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-sm bg-[#FFD600]" />
                <span className="text-gray-400">Revenue</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-sm bg-[#FF4444]" />
                <span className="text-gray-400">Expenses</span>
              </div>
            </div>
          </div>
          <div className="h-[320px] w-full">
            <RevenueExpenseChart data={revenueExpenseData} />
          </div>
        </motion.div>

        {/* Membership Tier Pie Chart */}
        <motion.div
          variants={itemVariants}
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 sm:p-8"
        >
          <h3 className="text-xl font-black tracking-tight flex items-center gap-3 mb-6">
            <div className="w-2 h-8 bg-[#00D4FF] rounded-full shadow-[0_0_10px_rgba(0,212,255,0.5)]" />
            Membership Breakdown
          </h3>
          <div className="h-[280px] w-full">
            <MembershipTierPieChart data={membershipTierData} />
          </div>
          {/* Center stat */}
          <div className="text-center -mt-4">
            <p className="text-gray-500 text-xs font-bold uppercase tracking-wider">Total Revenue</p>
            <p className="text-2xl font-black text-white">₹4,85,000</p>
          </div>
        </motion.div>
      </div>

      {/* ── 4. RECENT TRANSACTIONS TABLE ───────────────────────────── */}
      <motion.div
        variants={itemVariants}
        className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 sm:p-8"
      >
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <h3 className="text-xl font-black tracking-tight flex items-center gap-3">
            <div className="w-2 h-8 bg-white rounded-full" />
            Recent Transactions
          </h3>
          <div className="flex items-center gap-2 text-gray-400 text-xs font-bold">
            <Receipt className="w-4 h-4" />
            <span>Showing last 12 invoices</span>
          </div>
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/10">
                <th className="pb-4 text-gray-500 font-bold text-xs uppercase tracking-wider">Invoice</th>
                <th className="pb-4 text-gray-500 font-bold text-xs uppercase tracking-wider">Member</th>
                <th className="pb-4 text-gray-500 font-bold text-xs uppercase tracking-wider">Amount</th>
                <th className="pb-4 text-gray-500 font-bold text-xs uppercase tracking-wider">Plan</th>
                <th className="pb-4 text-gray-500 font-bold text-xs uppercase tracking-wider">Date</th>
                <th className="pb-4 text-gray-500 font-bold text-xs uppercase tracking-wider">Status</th>
                <th className="pb-4 text-gray-500 font-bold text-xs uppercase tracking-wider text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx, i) => {
                const sc = statusConfig[tx.status];
                const StatusIcon = sc.icon;
                return (
                  <motion.tr
                    key={tx.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.04 }}
                    className="border-b border-white/5 hover:bg-white/[0.03] transition-colors group"
                  >
                    <td className="py-4 text-sm font-bold text-[#FFD600]">{tx.id}</td>
                    <td className="py-4 text-sm font-medium text-gray-200">{tx.member}</td>
                    <td className="py-4 text-sm font-bold text-white">{tx.amount}</td>
                    <td className="py-4">
                      <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-white/10 text-gray-300">
                        {tx.plan}
                      </span>
                    </td>
                    <td className="py-4 text-sm text-gray-400 font-medium">{tx.date}</td>
                    <td className="py-4">
                      <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-lg ${sc.bg} ${sc.text}`}>
                        <StatusIcon className="w-3 h-3" />
                        {tx.status}
                      </span>
                    </td>
                    <td className="py-4 text-right">
                      <button
                        className="p-2 rounded-xl bg-white/5 hover:bg-[#FFD600]/20 border border-white/10 hover:border-[#FFD600]/50 transition-all group-hover:opacity-100 opacity-50"
                        title="Download Invoice"
                      >
                        <Download className="w-4 h-4 text-gray-300 group-hover:text-[#FFD600]" />
                      </button>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-3">
          {transactions.map((tx, i) => {
            const sc = statusConfig[tx.status];
            const StatusIcon = sc.icon;
            return (
              <motion.div
                key={tx.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.04 }}
                className="bg-white/[0.03] border border-white/5 rounded-xl p-4 space-y-3"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-bold text-[#FFD600]">{tx.id}</p>
                    <p className="text-sm text-gray-200 font-medium">{tx.member}</p>
                  </div>
                  <span className={`inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-lg ${sc.bg} ${sc.text}`}>
                    <StatusIcon className="w-3 h-3" />
                    {tx.status}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <span className="text-white font-bold text-sm">{tx.amount}</span>
                    <span className="text-xs font-bold px-2 py-0.5 rounded-lg bg-white/10 text-gray-400">{tx.plan}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500">{tx.date}</span>
                    <button className="p-1.5 rounded-lg bg-white/5 border border-white/10" title="Download Invoice">
                      <Download className="w-3.5 h-3.5 text-gray-400" />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* ── 5. EXPENSE CATEGORIES ──────────────────────────────────── */}
      <motion.div
        variants={itemVariants}
        className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 sm:p-8"
      >
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <h3 className="text-xl font-black tracking-tight flex items-center gap-3">
            <div className="w-2 h-8 bg-[#FF4444] rounded-full shadow-[0_0_10px_rgba(255,68,68,0.5)]" />
            Expense Categories
          </h3>
          <p className="text-gray-400 text-xs font-bold flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            Monthly breakdown
          </p>
        </div>
        <div className="h-[320px] w-full">
          <ExpenseCategoriesChart data={expenseCategories} />
        </div>
      </motion.div>

      {/* ── FOOTER INSIGHT CARD ────────────────────────────────────── */}
      <motion.div
        variants={itemVariants}
        className="bg-gradient-to-r from-[#FFD600]/10 to-[#00D4FF]/10 border border-white/10 rounded-2xl p-6 sm:p-8 relative overflow-hidden"
      >
        <div className="absolute -right-16 -bottom-16 w-64 h-64 bg-[#FFD600]/10 rounded-full blur-[80px]" />
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h4 className="text-lg font-black mb-1 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-[#FFD600]" />
              Revenue Insight
            </h4>
            <p className="text-gray-400 text-sm font-medium leading-relaxed max-w-xl">
              Monthly memberships generate <span className="text-[#FFD600] font-bold">58%</span> of total revenue. 
              Consider promoting yearly plans with early-bird discounts to improve long-term retention and cash flow.
            </p>
          </div>
          <button className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-5 py-2.5 rounded-full text-sm font-bold transition-colors whitespace-nowrap">
            View Details <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
