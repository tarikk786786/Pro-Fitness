'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, Variants } from 'framer-motion';
import gsap from 'gsap';
import {
  DollarSign,
  Users,
  TrendingDown,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  UserPlus,
  RefreshCw,
  XCircle,
  Clock,
  BarChart3,
  PieChart as PieChartIcon,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend,
} from 'recharts';

/* ─────────────────────── DATA ─────────────────────── */

const revenueData = [
  { day: 'Jun 1', revenue: 12400 },
  { day: 'Jun 2', revenue: 14200 },
  { day: 'Jun 3', revenue: 11800 },
  { day: 'Jun 4', revenue: 16500 },
  { day: 'Jun 5', revenue: 15100 },
  { day: 'Jun 6', revenue: 18200 },
  { day: 'Jun 7', revenue: 17600 },
  { day: 'Jun 8', revenue: 19300 },
  { day: 'Jun 9', revenue: 14700 },
  { day: 'Jun 10', revenue: 16800 },
  { day: 'Jun 11', revenue: 15400 },
  { day: 'Jun 12', revenue: 17900 },
  { day: 'Jun 13', revenue: 20100 },
  { day: 'Jun 14', revenue: 18700 },
  { day: 'Jun 15', revenue: 16200 },
  { day: 'Jun 16', revenue: 14900 },
  { day: 'Jun 17', revenue: 13500 },
  { day: 'Jun 18', revenue: 15800 },
  { day: 'Jun 19', revenue: 17200 },
  { day: 'Jun 20', revenue: 19500 },
  { day: 'Jun 21', revenue: 21000 },
  { day: 'Jun 22', revenue: 18300 },
  { day: 'Jun 23', revenue: 16700 },
  { day: 'Jun 24', revenue: 15600 },
  { day: 'Jun 25', revenue: 14100 },
  { day: 'Jun 26', revenue: 17400 },
  { day: 'Jun 27', revenue: 19800 },
  { day: 'Jun 28', revenue: 22100 },
  { day: 'Jun 29', revenue: 20400 },
  { day: 'Jun 30', revenue: 18900 },
];

const membershipData = [
  { name: 'Daily', value: 45, color: '#FFD600' },
  { name: 'Weekly', value: 89, color: '#00D4FF' },
  { name: 'Monthly', value: 156, color: '#FF4444' },
  { name: 'Yearly', value: 52, color: '#10B981' },
];

const capacityData = [
  { hour: '6 AM', capacity: 35 },
  { hour: '7 AM', capacity: 65 },
  { hour: '8 AM', capacity: 88 },
  { hour: '9 AM', capacity: 72 },
  { hour: '10 AM', capacity: 55 },
  { hour: '11 AM', capacity: 42 },
  { hour: '12 PM', capacity: 38 },
  { hour: '1 PM', capacity: 30 },
  { hour: '2 PM', capacity: 25 },
  { hour: '3 PM', capacity: 32 },
  { hour: '4 PM', capacity: 48 },
  { hour: '5 PM', capacity: 75 },
  { hour: '6 PM', capacity: 95 },
  { hour: '7 PM', capacity: 90 },
  { hour: '8 PM', capacity: 68 },
  { hour: '9 PM', capacity: 40 },
];

const recentActivity = [
  { id: 1, type: 'signup', name: 'Arjun Mehta', plan: 'Monthly Premium', time: '2 min ago', status: 'new' },
  { id: 2, type: 'renewal', name: 'Priya Sharma', plan: 'Yearly Elite', time: '15 min ago', status: 'renewed' },
  { id: 3, type: 'cancellation', name: 'Rahul Verma', plan: 'Weekly Basic', time: '32 min ago', status: 'cancelled' },
  { id: 4, type: 'signup', name: 'Sneha Patel', plan: 'Monthly Premium', time: '1 hr ago', status: 'new' },
  { id: 5, type: 'renewal', name: 'Vikram Singh', plan: 'Monthly Premium', time: '2 hrs ago', status: 'renewed' },
  { id: 6, type: 'signup', name: 'Ananya Iyer', plan: 'Yearly Elite', time: '3 hrs ago', status: 'new' },
  { id: 7, type: 'cancellation', name: 'Karan Joshi', plan: 'Daily Pass', time: '5 hrs ago', status: 'cancelled' },
  { id: 8, type: 'renewal', name: 'Divya Nair', plan: 'Monthly Premium', time: '6 hrs ago', status: 'renewed' },
];

const kpiCards = [
  {
    label: 'Total Revenue',
    value: 485000,
    prefix: '₹',
    formatted: '₹4,85,000',
    icon: DollarSign,
    color: '#FFD600',
    change: '+12.5%',
    changeType: 'up' as const,
    progress: 78,
  },
  {
    label: 'Active Members',
    value: 342,
    prefix: '',
    formatted: '342',
    icon: Users,
    color: '#00D4FF',
    change: '+8.3%',
    changeType: 'up' as const,
    progress: 68,
  },
  {
    label: 'Churn Rate',
    value: 3.2,
    prefix: '',
    suffix: '%',
    formatted: '3.2%',
    icon: TrendingDown,
    color: '#FF4444',
    change: '-0.5%',
    changeType: 'down' as const,
    progress: 32,
  },
  {
    label: 'Attendance Rate',
    value: 87,
    prefix: '',
    suffix: '%',
    formatted: '87%',
    icon: Activity,
    color: '#10B981',
    change: '+2.1%',
    changeType: 'up' as const,
    progress: 87,
  },
];

/* ─────────────────────── ANIMATION VARIANTS ─────────────────────── */

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring' as const, stiffness: 100, damping: 14 },
  },
};

const cardHoverVariants: Variants = {
  rest: { scale: 1 },
  hover: { scale: 1.02, transition: { type: 'spring' as const, stiffness: 400, damping: 17 } },
};

/* ─────────────────────── ANIMATED COUNTER ─────────────────────── */

function AnimatedCounter({
  target,
  prefix = '',
  suffix = '',
  formatted,
  duration = 2000,
}: {
  target: number;
  prefix?: string;
  suffix?: string;
  formatted: string;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let startTime: number | null = null;
    let rafId: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) {
        rafId = requestAnimationFrame(animate);
      } else {
        setDone(true);
      }
    };

    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [target, duration]);

  if (done) return <>{formatted}</>;

  if (prefix === '₹') {
    return (
      <>
        {prefix}
        {count.toLocaleString('en-IN')}
      </>
    );
  }

  return (
    <>
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </>
  );
}

/* ─────────────────────── CUSTOM TOOLTIP ─────────────────────── */

interface TooltipPayloadItem {
  value: number;
  name: string;
  dataKey: string;
  color?: string;
  payload: Record<string, unknown>;
}

function CustomTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: TooltipPayloadItem[];
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-[#111111] border border-white/10 rounded-2xl px-5 py-3.5 shadow-2xl backdrop-blur-xl">
      <p className="text-xs text-gray-400 font-semibold mb-1">{label}</p>
      <p className="text-lg font-black text-white">
        ₹{payload[0].value.toLocaleString('en-IN')}
      </p>
    </div>
  );
}

function CapacityTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: TooltipPayloadItem[];
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-[#111111] border border-white/10 rounded-2xl px-5 py-3.5 shadow-2xl backdrop-blur-xl">
      <p className="text-xs text-gray-400 font-semibold mb-1">{label}</p>
      <p className="text-lg font-black text-white">{payload[0].value}% Full</p>
    </div>
  );
}

/* ─────────────────────── CUSTOM PIE LABEL ─────────────────────── */

function renderCustomLabel({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  name,
}: {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
  name: string;
}) {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 1.4;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="#999"
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
      className="text-xs font-bold"
    >
      {name} ({(percent * 100).toFixed(0)}%)
    </text>
  );
}

/* ─────────────────────── STATUS BADGE ─────────────────────── */

function StatusBadge({ status }: { status: string }) {
  const config: Record<string, { bg: string; text: string; label: string }> = {
    new: { bg: 'bg-[#10B981]/15', text: 'text-[#10B981]', label: 'New' },
    renewed: { bg: 'bg-[#00D4FF]/15', text: 'text-[#00D4FF]', label: 'Renewed' },
    cancelled: { bg: 'bg-[#FF4444]/15', text: 'text-[#FF4444]', label: 'Cancelled' },
  };
  const c = config[status] ?? config.new;
  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase ${c.bg} ${c.text}`}
    >
      {c.label}
    </span>
  );
}

function ActivityIcon({ type }: { type: string }) {
  switch (type) {
    case 'signup':
      return (
        <div className="w-10 h-10 rounded-xl bg-[#10B981]/10 border border-[#10B981]/20 flex items-center justify-center shrink-0">
          <UserPlus className="w-5 h-5 text-[#10B981]" />
        </div>
      );
    case 'renewal':
      return (
        <div className="w-10 h-10 rounded-xl bg-[#00D4FF]/10 border border-[#00D4FF]/20 flex items-center justify-center shrink-0">
          <RefreshCw className="w-5 h-5 text-[#00D4FF]" />
        </div>
      );
    case 'cancellation':
      return (
        <div className="w-10 h-10 rounded-xl bg-[#FF4444]/10 border border-[#FF4444]/20 flex items-center justify-center shrink-0">
          <XCircle className="w-5 h-5 text-[#FF4444]" />
        </div>
      );
    default:
      return null;
  }
}

/* ─────────────────────── MAIN PAGE ─────────────────────── */

export default function AdminDashboard() {
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
      {/* ───── HEADER ───── */}
      <div ref={headerRef} className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6">
        <div>
          <p className="text-[#FFD600] text-sm font-bold tracking-[0.2em] uppercase mb-2">
            Admin Portal
          </p>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
            Analytics Hub
          </h1>
          <p className="text-gray-500 font-medium mt-2">
            Real-time overview • Updated just now
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm font-bold text-gray-400 flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Last 30 Days
          </div>
        </div>
      </div>

      {/* ───── KPI GRID ───── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {kpiCards.map((kpi, i) => {
          const Icon = kpi.icon;
          return (
            <motion.div
              key={kpi.label}
              variants={itemVariants}
              whileHover="hover"
              initial="rest"
              animate="rest"
            >
              <motion.div
                variants={cardHoverVariants}
                className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-[28px] p-6 overflow-hidden group hover:border-white/20 transition-colors cursor-default"
              >
                {/* Glow accent */}
                <div
                  className="absolute -top-12 -right-12 w-32 h-32 rounded-full blur-[60px] opacity-20 group-hover:opacity-35 transition-opacity"
                  style={{ backgroundColor: kpi.color }}
                />

                <div className="flex justify-between items-start mb-5">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center border border-white/5 group-hover:border-white/20 transition-colors"
                    style={{ backgroundColor: `${kpi.color}10` }}
                  >
                    <Icon className="w-6 h-6" style={{ color: kpi.color }} />
                  </div>
                  <div
                    className={`flex items-center gap-1 text-xs font-bold ${
                      kpi.label === 'Churn Rate'
                        ? 'text-[#10B981]'
                        : kpi.changeType === 'up'
                          ? 'text-[#10B981]'
                          : 'text-[#FF4444]'
                    }`}
                  >
                    {kpi.label === 'Churn Rate' ? (
                      <ArrowDownRight className="w-3.5 h-3.5" />
                    ) : kpi.changeType === 'up' ? (
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    ) : (
                      <ArrowDownRight className="w-3.5 h-3.5" />
                    )}
                    {kpi.change}
                  </div>
                </div>

                <div className="space-y-1 relative z-10">
                  <p className="text-gray-400 font-semibold text-sm tracking-wide uppercase">
                    {kpi.label}
                  </p>
                  <p className="text-3xl md:text-4xl font-black tracking-tight text-white">
                    <AnimatedCounter
                      target={kpi.value}
                      prefix={kpi.prefix}
                      suffix={kpi.suffix}
                      formatted={kpi.formatted}
                      duration={1800 + i * 200}
                    />
                  </p>
                </div>

                {/* Progress bar */}
                <div className="absolute bottom-0 left-0 w-full h-1.5 bg-white/5">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${kpi.progress}%` }}
                    transition={{ duration: 1.5, delay: 0.3 + i * 0.15, ease: 'easeOut' }}
                    className="h-full rounded-r-full"
                    style={{
                      backgroundColor: kpi.color,
                      boxShadow: `0 0 12px ${kpi.color}60`,
                    }}
                  />
                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      {/* ───── ROW: REVENUE CHART + MEMBERSHIP PIE ───── */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Revenue AreaChart */}
        <motion.div
          variants={itemVariants}
          className="xl:col-span-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[28px] p-6 sm:p-8"
        >
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-black tracking-tight flex items-center gap-3">
              <div className="w-2 h-8 bg-[#FFD600] rounded-full shadow-[0_0_10px_rgba(255,214,0,0.5)]" />
              Revenue Overview
            </h3>
            <div className="flex items-center gap-2">
              <span className="inline-block w-3 h-3 rounded-full bg-[#FFD600]" />
              <span className="text-xs font-bold text-gray-400">Daily Revenue</span>
            </div>
          </div>
          <div className="h-[320px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#FFD600" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="#FFD600" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#222" />
                <XAxis
                  dataKey="day"
                  stroke="#555"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                  dy={10}
                  interval={4}
                />
                <YAxis
                  stroke="#555"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(v: number) => `₹${(v / 1000).toFixed(0)}k`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#FFD600"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#revenueGradient)"
                  activeDot={{
                    r: 7,
                    fill: '#FFD600',
                    stroke: '#0A0A0A',
                    strokeWidth: 4,
                  }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Membership Distribution PieChart */}
        <motion.div
          variants={itemVariants}
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[28px] p-6 sm:p-8"
        >
          <h3 className="text-xl font-black tracking-tight flex items-center gap-3 mb-2">
            <div className="w-2 h-8 bg-[#00D4FF] rounded-full shadow-[0_0_10px_rgba(0,212,255,0.5)]" />
            Membership Split
          </h3>
          <p className="text-xs text-gray-500 font-semibold mb-6 ml-5">342 active members</p>
          <div className="h-[240px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={membershipData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={90}
                  paddingAngle={4}
                  dataKey="value"
                  labelLine={false}
                  label={renderCustomLabel}
                  stroke="none"
                >
                  {membershipData.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#111111',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '16px',
                    fontWeight: 'bold',
                    color: '#fff',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          {/* Legend */}
          <div className="grid grid-cols-2 gap-3 mt-4">
            {membershipData.map((entry) => (
              <div key={entry.name} className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full shrink-0"
                  style={{ backgroundColor: entry.color }}
                />
                <span className="text-xs font-bold text-gray-400">
                  {entry.name}{' '}
                  <span className="text-white">{entry.value}</span>
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ───── ROW: ACTIVITY FEED + CAPACITY CHART ───── */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Recent Activity Feed */}
        <motion.div
          variants={itemVariants}
          className="xl:col-span-1 bg-gradient-to-b from-[#111111] to-[#0A0A0A] border border-white/10 rounded-[28px] p-6 sm:p-8 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-40 h-40 bg-[#FFD600]/5 rounded-full blur-[60px] pointer-events-none" />

          <h3 className="text-xl font-black tracking-tight flex items-center gap-3 mb-6 relative z-10">
            <div className="w-2 h-8 bg-[#FF4444] rounded-full shadow-[0_0_10px_rgba(255,68,68,0.5)]" />
            Recent Activity
          </h3>

          <div className="space-y-1 relative z-10 max-h-[420px] overflow-y-auto pr-1 scrollbar-thin">
            {recentActivity.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: 0.6 + idx * 0.08,
                  type: 'spring' as const,
                  stiffness: 120,
                  damping: 14,
                }}
                className="flex items-center gap-4 p-3 rounded-2xl hover:bg-white/5 transition-colors group"
              >
                <ActivityIcon type={item.type} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-white truncate">{item.name}</p>
                  <p className="text-xs text-gray-500 font-medium truncate">{item.plan}</p>
                </div>
                <div className="text-right shrink-0">
                  <StatusBadge status={item.status} />
                  <p className="text-[10px] text-gray-600 font-semibold mt-1.5 flex items-center justify-end gap-1">
                    <Clock className="w-3 h-3" />
                    {item.time}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Gym Capacity BarChart */}
        <motion.div
          variants={itemVariants}
          className="xl:col-span-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[28px] p-6 sm:p-8"
        >
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-8">
            <h3 className="text-xl font-black tracking-tight flex items-center gap-3">
              <div className="w-2 h-8 bg-[#10B981] rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
              Gym Capacity
            </h3>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="inline-block w-3 h-3 rounded bg-[#FFD600]" />
                <span className="text-[11px] font-bold text-gray-400">Peak</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-block w-3 h-3 rounded bg-[#FFD600]/30" />
                <span className="text-[11px] font-bold text-gray-400">Normal</span>
              </div>
            </div>
          </div>
          <div className="h-[320px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={capacityData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#222" />
                <XAxis
                  dataKey="hour"
                  stroke="#555"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                  dy={10}
                  interval={1}
                />
                <YAxis
                  stroke="#555"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                  domain={[0, 100]}
                  tickFormatter={(v: number) => `${v}%`}
                />
                <Tooltip content={<CapacityTooltip />} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
                <Bar
                  dataKey="capacity"
                  radius={[6, 6, 0, 0]}
                  barSize={28}
                  fill="#FFD600"
                  fillOpacity={1}
                  shape={(props: Record<string, unknown>) => {
                    const { x, y, width, height, payload } = props as {
                      x: number;
                      y: number;
                      width: number;
                      height: number;
                      payload: { capacity: number };
                    };
                    const isPeak = payload.capacity >= 80;
                    return (
                      <rect
                        x={x}
                        y={y}
                        width={width}
                        height={height}
                        rx={6}
                        ry={6}
                        fill={isPeak ? '#FFD600' : 'rgba(255,214,0,0.3)'}
                        style={
                          isPeak
                            ? { filter: 'drop-shadow(0 0 8px rgba(255,214,0,0.4))' }
                            : undefined
                        }
                      />
                    );
                  }}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
          {/* Peak hours callout */}
          <div className="mt-4 flex items-center gap-3 bg-[#FFD600]/5 border border-[#FFD600]/10 rounded-xl px-4 py-3">
            <BarChart3 className="w-5 h-5 text-[#FFD600] shrink-0" />
            <p className="text-xs font-bold text-gray-400">
              Peak hours:{' '}
              <span className="text-[#FFD600]">8 AM, 6 PM – 7 PM</span>
              {' '}• Average occupancy:{' '}
              <span className="text-white">56%</span>
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
