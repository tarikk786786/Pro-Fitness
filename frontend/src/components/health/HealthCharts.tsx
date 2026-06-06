"use client";

import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  Legend,
} from 'recharts';

const sleepData = [
  { day: 'Mon', light: 4, deep: 2, rem: 1.5 },
  { day: 'Tue', light: 3.5, deep: 2.5, rem: 2 },
  { day: 'Wed', light: 4.5, deep: 1.5, rem: 1 },
  { day: 'Thu', light: 3, deep: 3, rem: 2.5 },
  { day: 'Fri', light: 4, deep: 2, rem: 1.5 },
  { day: 'Sat', light: 5, deep: 2.5, rem: 2 },
  { day: 'Sun', light: 4.5, deep: 3, rem: 2.5 },
];

const recoveryData = [
  { day: 'Mon', trainingLoad: 80, recovery: 90 },
  { day: 'Tue', trainingLoad: 120, recovery: 75 },
  { day: 'Wed', trainingLoad: 90, recovery: 85 },
  { day: 'Thu', trainingLoad: 150, recovery: 60 },
  { day: 'Fri', trainingLoad: 60, recovery: 95 },
  { day: 'Sat', trainingLoad: 180, recovery: 50 },
  { day: 'Sun', trainingLoad: 40, recovery: 100 },
];

const heartRateData = Array.from({ length: 30 }, (_, i) => ({
  day: i + 1,
  hr: Math.round(45 + Math.random() * 10 + (Math.sin(i / 3) * 5)),
}));

interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string | number;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#0A0A0A]/90 backdrop-blur-md border border-white/10 p-3 rounded-lg shadow-xl">
        <p className="text-white/70 text-sm mb-2">{label}</p>
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center gap-2 text-sm">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
            <span className="text-white font-medium">{entry.name}:</span>
            <span className="text-white/90">{Number(entry.value).toFixed(1)}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export function SleepTrendChart() {
  return (
    <div className="h-full w-full min-h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={sleepData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="colorLight" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorDeep" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorRem" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#ffffff0d" vertical={false} />
          <XAxis dataKey="day" stroke="#ffffff80" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis stroke="#ffffff80" fontSize={12} tickLine={false} axisLine={false} />
          <Tooltip content={<CustomTooltip />} />
          <Legend wrapperStyle={{ fontSize: '12px', opacity: 0.8 }} />
          <Area type="monotone" dataKey="light" name="Light Sleep" stackId="1" stroke="#3b82f6" fill="url(#colorLight)" />
          <Area type="monotone" dataKey="deep" name="Deep Sleep" stackId="1" stroke="#8b5cf6" fill="url(#colorDeep)" />
          <Area type="monotone" dataKey="rem" name="REM Sleep" stackId="1" stroke="#10b981" fill="url(#colorRem)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export function RecoveryChart() {
  return (
    <div className="h-full w-full min-h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={recoveryData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#ffffff0d" vertical={false} />
          <XAxis dataKey="day" stroke="#ffffff80" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis stroke="#ffffff80" fontSize={12} tickLine={false} axisLine={false} />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: '#ffffff0a' }} />
          <Legend wrapperStyle={{ fontSize: '12px', opacity: 0.8 }} />
          <Bar dataKey="trainingLoad" name="Training Load" fill="#FFD600" radius={[4, 4, 0, 0]} />
          <Bar dataKey="recovery" name="Recovery %" fill="#10b981" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function HeartRateChart() {
  return (
    <div className="h-full w-full min-h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={heartRateData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#ffffff0d" vertical={false} />
          <XAxis dataKey="day" stroke="#ffffff80" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis domain={['dataMin - 5', 'dataMax + 5']} stroke="#ffffff80" fontSize={12} tickLine={false} axisLine={false} />
          <Tooltip content={<CustomTooltip />} />
          <Line type="monotone" dataKey="hr" name="Resting HR (bpm)" stroke="#ef4444" strokeWidth={2} dot={false} activeDot={{ r: 6, fill: '#ef4444', stroke: '#0A0A0A', strokeWidth: 2 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default function HealthCharts() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
        <h3 className="text-lg font-medium text-white mb-6">Sleep Stages & Trends</h3>
        <SleepTrendChart />
      </div>
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
        <h3 className="text-lg font-medium text-white mb-6">Training Load vs Recovery</h3>
        <RecoveryChart />
      </div>
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 lg:col-span-2">
        <h3 className="text-lg font-medium text-white mb-6">Resting Heart Rate (30 Days)</h3>
        <HeartRateChart />
      </div>
    </div>
  );
}
