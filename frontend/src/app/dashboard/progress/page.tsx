"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";
import { Activity, Scale, Target, Trophy } from "lucide-react";

export default function ProgressPage() {
  const [timeRange, setTimeRange] = useState("30D");

  const weightData = [
    { date: "May 1", weight: 82.5, fat: 18.2 },
    { date: "May 8", weight: 81.2, fat: 17.8 },
    { date: "May 15", weight: 80.5, fat: 17.5 },
    { date: "May 22", weight: 79.8, fat: 17.1 },
    { date: "May 29", weight: 79.1, fat: 16.8 },
    { date: "Jun 5", weight: 78.5, fat: 16.5 },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Progress Tracking</h1>
          <p className="text-gray-400 mt-1">Visualize your transformation journey.</p>
        </div>
        <button className="px-6 py-3 bg-[#FF0033] text-white font-bold rounded-xl hover:bg-white hover:text-black transition-colors shadow-[0_0_15px_rgba(255,0,51,0.3)]">
          Log Measurement
        </button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Current Weight", value: "78.5 kg", change: "-4.0 kg", icon: Scale, color: "#00D4FF" },
          { label: "Body Fat", value: "16.5%", change: "-1.7%", icon: Activity, color: "#FF0033" },
          { label: "Goal Weight", value: "75.0 kg", change: "3.5 kg to go", icon: Target, color: "#FFA500" },
          { label: "Milestones", value: "4 Achieved", change: "2 pending", icon: Trophy, color: "#10B981" },
        ].map((stat, idx) => (
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }}
            key={idx} className="bg-white/5 border border-white/10 rounded-2xl p-6"
          >
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-xl bg-black/50 text-[${stat.color}]`}>
                <stat.icon className="w-6 h-6" style={{ color: stat.color }} />
              </div>
            </div>
            <h3 className="text-gray-400 text-sm font-medium mb-1">{stat.label}</h3>
            <div className="flex items-end justify-between">
              <span className="text-2xl font-bold">{stat.value}</span>
              <span className="text-sm font-medium text-green-400">{stat.change}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Chart */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <h2 className="text-xl font-bold">Weight & Body Fat Trend</h2>
          
          <div className="flex bg-black/50 rounded-lg p-1 border border-white/10">
            {["7D", "30D", "3M", "1Y"].map(range => (
              <button 
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${
                  timeRange === range ? "bg-[#FF0033] text-white" : "text-gray-400 hover:text-white"
                }`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>

        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={weightData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorWeight" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00D4FF" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#00D4FF" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis dataKey="date" stroke="#666" tick={{ fill: '#666' }} axisLine={false} tickLine={false} />
              <YAxis stroke="#666" tick={{ fill: '#666' }} axisLine={false} tickLine={false} domain={['dataMin - 2', 'auto']} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0A0A0A', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                itemStyle={{ color: '#fff' }}
              />
              <Area type="monotone" dataKey="weight" stroke="#00D4FF" strokeWidth={3} fillOpacity={1} fill="url(#colorWeight)" name="Weight (kg)" />
              <Line type="monotone" dataKey="fat" stroke="#FF0033" strokeWidth={3} dot={false} name="Body Fat (%)" yAxisId="right" />
              <YAxis yAxisId="right" orientation="right" stroke="#666" tick={{ fill: '#666' }} axisLine={false} tickLine={false} domain={['dataMin - 1', 'auto']} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
