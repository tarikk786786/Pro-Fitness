"use client";

import { useState, useEffect, useRef } from "react";
import { motion, Variants } from "framer-motion";
import gsap from "gsap";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";
import { Activity, Scale, Target, Trophy, ChevronDown, Plus } from "lucide-react";

export default function ProgressPage() {
  const [timeRange, setTimeRange] = useState("30D");
  const headerRef = useRef(null);

  const weightData = [
    { date: "May 1", weight: 82.5, fat: 18.2 },
    { date: "May 8", weight: 81.2, fat: 17.8 },
    { date: "May 15", weight: 80.5, fat: 17.5 },
    { date: "May 22", weight: 79.8, fat: 17.1 },
    { date: "May 29", weight: 79.1, fat: 16.8 },
    { date: "Jun 5", weight: 78.5, fat: 16.5 },
  ];

  useEffect(() => {
    if (headerRef.current) {
      gsap.fromTo(headerRef.current, 
        { opacity: 0, y: -30 }, 
        { opacity: 1, y: 0, duration: 1, ease: "power4.out" }
      );
    }
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } }
  };

  return (
    <motion.div 
      className="space-y-8 max-w-[1400px] mx-auto pb-12"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6" ref={headerRef}>
        <div>
          <h1 className="text-4xl font-black tracking-tight mb-2 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
            Transformation Analytics
          </h1>
          <p className="text-gray-400 font-medium">Quantify your physical evolution.</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-[#FFD600] text-black font-black rounded-full hover:bg-white transition-all shadow-[0_0_20px_rgba(255,214,0,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)]">
          <Plus className="w-5 h-5" /> Log Metrics
        </button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Current Mass", value: "78.5", unit: "kg", change: "-4.0 kg", icon: Scale, color: "#FFD600", trend: "down" },
          { label: "Body Fat", value: "16.5", unit: "%", change: "-1.7%", icon: Activity, color: "#fff", trend: "down" },
          { label: "Target Mass", value: "75.0", unit: "kg", change: "3.5 kg to go", icon: Target, color: "#FFD600", trend: "neutral" },
          { label: "Milestones", value: "4", unit: "Achieved", change: "2 pending", icon: Trophy, color: "#00D4FF", trend: "up" },
        ].map((stat, idx) => (
          <motion.div 
            variants={itemVariants}
            key={idx} 
            className="group bg-white/5 backdrop-blur-md border border-white/10 rounded-[32px] p-6 hover:bg-white/10 transition-colors"
          >
            <div className="flex justify-between items-start mb-6">
              <div className="w-12 h-12 rounded-2xl bg-black/50 border border-white/5 flex items-center justify-center group-hover:border-white/20 transition-colors">
                <stat.icon className="w-6 h-6" style={{ color: stat.color }} />
              </div>
            </div>
            <h3 className="text-gray-400 text-sm font-bold tracking-wide uppercase mb-2">{stat.label}</h3>
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-4xl font-black tracking-tight">{stat.value}</span>
              <span className="text-gray-500 font-bold">{stat.unit}</span>
            </div>
            <div className="text-sm font-medium" style={{ color: stat.trend === 'down' ? '#10B981' : (stat.trend === 'up' ? '#00D4FF' : '#FFD600') }}>
              {stat.change}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Chart */}
      <motion.div variants={itemVariants} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-[32px] p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
          <h2 className="text-2xl font-black tracking-tight flex items-center gap-3">
             <div className="w-2 h-8 bg-[#FFD600] rounded-full shadow-[0_0_10px_rgba(255,214,0,0.5)]"></div>
             Mass & Composition Trend
          </h2>
          
          <div className="flex bg-black/50 rounded-2xl p-1 border border-white/10 relative">
            {["7D", "30D", "3M", "1Y"].map(range => (
              <button 
                key={range}
                onClick={() => setTimeRange(range)}
                className={`relative px-6 py-2 text-sm font-black rounded-xl transition-colors z-10 ${
                  timeRange === range ? "text-black" : "text-gray-400 hover:text-white"
                }`}
              >
                {timeRange === range && (
                  <motion.div 
                    layoutId="timeRangeTab"
                    className="absolute inset-0 bg-[#FFD600] rounded-xl -z-10 shadow-[0_0_10px_rgba(255,214,0,0.4)]"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                {range}
              </button>
            ))}
          </div>
        </div>

        <div className="h-[450px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={weightData} margin={{ top: 20, right: 20, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorWeight" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#FFD600" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#FFD600" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis dataKey="date" stroke="#666" tick={{ fill: '#666', fontWeight: 'bold' }} axisLine={false} tickLine={false} dy={10} />
              <YAxis stroke="#666" tick={{ fill: '#666', fontWeight: 'bold' }} axisLine={false} tickLine={false} domain={['dataMin - 2', 'auto']} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0A0A0A', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', fontWeight: 'bold' }}
                itemStyle={{ color: '#fff' }}
              />
              <Area type="monotone" dataKey="weight" stroke="#FFD600" strokeWidth={4} fillOpacity={1} fill="url(#colorWeight)" name="Mass (kg)" activeDot={{ r: 8, fill: '#FFD600', stroke: '#000', strokeWidth: 4 }} />
              <Line type="monotone" dataKey="fat" stroke="#ffffff" strokeWidth={4} dot={false} name="Body Fat (%)" yAxisId="right" />
              <YAxis yAxisId="right" orientation="right" stroke="#666" tick={{ fill: '#666', fontWeight: 'bold' }} axisLine={false} tickLine={false} domain={['dataMin - 1', 'auto']} dx={10} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </motion.div>
  );
}
