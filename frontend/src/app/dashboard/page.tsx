"use client";

import { useEffect, useRef } from "react";
import { motion, Variants } from "framer-motion";
import gsap from "gsap";
import { Flame, Droplets, Trophy, Activity, Dumbbell, ArrowRight, Brain, Clock, ChevronRight } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area, CartesianGrid } from "recharts";
import Link from "next/link";

const weeklyData = [
  { name: 'Mon', calories: 400 },
  { name: 'Tue', calories: 300 },
  { name: 'Wed', calories: 550 },
  { name: 'Thu', calories: 200 },
  { name: 'Fri', calories: 600 },
  { name: 'Sat', calories: 0 },
  { name: 'Sun', calories: 450 },
];

const weightData = [
  { date: 'Week 1', weight: 82 },
  { date: 'Week 2', weight: 81.2 },
  { date: 'Week 3', weight: 80.5 },
  { date: 'Week 4', weight: 79.8 },
];

const timetable = [
  { time: "07:00 AM", task: "Morning Run", type: "cardio" },
  { time: "09:30 AM", task: "Protein Breakfast", type: "diet" },
  { time: "02:00 PM", task: "Hydration Check", type: "habit" },
  { time: "06:00 PM", task: "Upper Body Power", type: "workout", active: true },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } }
};

export default function DashboardOverview() {
  const headerRef = useRef(null);

  useEffect(() => {
    if (headerRef.current) {
      gsap.fromTo(headerRef.current, 
        { opacity: 0, y: -30 }, 
        { opacity: 1, y: 0, duration: 1, ease: "power4.out" }
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
      {/* Welcome Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6" ref={headerRef}>
        <div>
          <h1 className="text-4xl font-black tracking-tight mb-2 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
            Welcome back, Elite.
          </h1>
          <p className="text-gray-400 font-medium">Your physiological data is synced and ready.</p>
        </div>
        
        <Link href="/dashboard/workouts" className="group flex items-center gap-2 bg-[#FFD600] text-black px-6 py-3 rounded-full font-black hover:bg-white transition-all shadow-[0_0_20px_rgba(255,214,0,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)]">
          Launch Session <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {[
          { icon: Flame, label: "Active Energy", value: "2,450", unit: "kcal", progress: 75, color: "#FFD600" },
          { icon: Dumbbell, label: "Volume Load", value: "14.2", unit: "tons", progress: 60, color: "#fff" },
          { icon: Trophy, label: "Discipline", value: "12", unit: "day streak", progress: 100, color: "#FFD600" },
          { icon: Droplets, label: "Hydration", value: "2.5", unit: "L / 3.5L", progress: 70, color: "#00D4FF" },
        ].map((stat, i) => (
          <motion.div 
            key={i}
            variants={itemVariants}
            className="relative bg-white/5 backdrop-blur-md border border-white/10 rounded-[32px] p-6 overflow-hidden group hover:bg-white/10 transition-colors"
          >
            {/* Progress Bar Background */}
            <div className="absolute bottom-0 left-0 h-1.5 bg-white/5 w-full">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${stat.progress}%` }}
                transition={{ duration: 1.5, delay: i * 0.2, ease: "easeOut" }}
                className="h-full rounded-r-full shadow-[0_0_10px_currentColor]"
                style={{ backgroundColor: stat.color, color: stat.color }}
              />
            </div>

            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-black/50 flex items-center justify-center border border-white/5 group-hover:border-white/20 transition-colors">
                  <stat.icon className="w-6 h-6" style={{ color: stat.color }} />
                </div>
              </div>
            </div>
            
            <div className="space-y-1">
              <p className="text-gray-400 font-medium text-sm tracking-wide uppercase">{stat.label}</p>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-black tracking-tight">{stat.value}</span>
                <span className="text-gray-500 font-bold text-sm">{stat.unit}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* Main Charts Area */}
        <div className="xl:col-span-2 space-y-6">
          
          <motion.div variants={itemVariants} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-[32px] p-6 sm:p-8">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-xl font-black tracking-tight flex items-center gap-3">
                <div className="w-2 h-8 bg-[#FFD600] rounded-full shadow-[0_0_10px_rgba(255,214,0,0.5)]"></div>
                Metabolic Output
              </h3>
              <select className="bg-black/50 border border-white/10 rounded-xl px-4 py-2 text-sm font-bold text-gray-300 outline-none">
                <option>This Week</option>
                <option>Last Week</option>
              </select>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#333" />
                  <XAxis dataKey="name" stroke="#888" fontSize={12} tickLine={false} axisLine={false} dy={10} />
                  <YAxis stroke="#888" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip 
                    cursor={{ fill: '#ffffff05' }} 
                    contentStyle={{ backgroundColor: '#0A0A0A', border: '1px solid #333', borderRadius: '16px', color: '#fff', fontWeight: 'bold' }} 
                  />
                  <Bar dataKey="calories" fill="#FFD600" radius={[6, 6, 0, 0]} barSize={40}>
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-[32px] p-6 sm:p-8">
            <h3 className="text-xl font-black tracking-tight flex items-center gap-3 mb-8">
              <div className="w-2 h-8 bg-white rounded-full"></div>
              Body Composition Trend
            </h3>
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={weightData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorWeight" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ffffff" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#ffffff" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#333" />
                  <XAxis dataKey="date" stroke="#888" fontSize={12} tickLine={false} axisLine={false} dy={10} />
                  <YAxis stroke="#888" fontSize={12} tickLine={false} axisLine={false} domain={['dataMin - 1', 'dataMax + 1']} />
                  <Tooltip contentStyle={{ backgroundColor: '#0A0A0A', border: '1px solid #333', borderRadius: '16px', fontWeight: 'bold' }} />
                  <Area type="monotone" dataKey="weight" stroke="#ffffff" strokeWidth={4} fillOpacity={1} fill="url(#colorWeight)" activeDot={{ r: 8, fill: '#FFD600', stroke: '#000', strokeWidth: 4 }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>

        {/* Side Panel Area */}
        <div className="space-y-6">
          
          {/* Daily Protocol */}
          <motion.div variants={itemVariants} className="bg-gradient-to-b from-[#1a1a1a] to-black border border-white/10 rounded-[32px] p-6 sm:p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#FFD600]/10 rounded-full blur-[50px]"></div>
            
            <h3 className="text-xl font-black mb-6 tracking-tight">Daily Protocol</h3>
            
            <div className="relative border-l-2 border-white/10 pl-6 ml-3 space-y-8">
              {timetable.map((item, i) => (
                <div key={i} className="relative">
                  <div className={`absolute -left-[35px] top-1 w-4 h-4 rounded-full border-4 border-black ${item.active ? 'bg-[#FFD600] shadow-[0_0_10px_#FFD600]' : 'bg-gray-600'}`} />
                  <p className="text-xs font-bold text-gray-500 mb-1 flex items-center gap-1"><Clock className="w-3 h-3" /> {item.time}</p>
                  <p className={`font-bold ${item.active ? 'text-white text-lg' : 'text-gray-400'}`}>{item.task}</p>
                  {item.active && (
                    <Link href="/dashboard/workouts" className="mt-3 inline-flex items-center gap-1 text-xs font-bold bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg transition-colors">
                      Execute <ChevronRight className="w-3 h-3" />
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          {/* AI Coach Insight */}
          <motion.div variants={itemVariants} className="bg-[#FFD600] text-black rounded-[32px] p-6 sm:p-8 relative overflow-hidden group">
            <div className="absolute -right-8 -top-8 text-black/10 group-hover:scale-110 transition-transform duration-500">
              <Brain className="w-48 h-48" />
            </div>
            
            <h3 className="text-xl font-black mb-4 flex items-center gap-2 relative z-10">
              <Brain className="w-6 h-6" /> AI Intelligence
            </h3>
            <p className="text-black/80 font-bold leading-relaxed mb-6 relative z-10">
              "HRV indicates prime readiness. Increasing volume on compound lifts by 5% today is recommended."
            </p>
            <Link href="/dashboard/ai-coach" className="inline-flex items-center gap-2 bg-black text-white px-5 py-2.5 rounded-full text-sm font-bold hover:bg-white hover:text-black transition-colors relative z-10 shadow-lg">
              View Analysis <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

        </div>
      </div>
    </motion.div>
  );
}
