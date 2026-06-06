'use client';

import React from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from 'recharts';

export function AdminHealthChart({ recoveryData }: { recoveryData: any[] }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={recoveryData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
        <defs>
          <linearGradient id="colorRecovery" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#FFD600" stopOpacity={0.3}/>
            <stop offset="95%" stopColor="#FFD600" stopOpacity={0}/>
          </linearGradient>
          <linearGradient id="colorStress" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
            <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#ffffff15" vertical={false} />
        <XAxis 
          dataKey="day" 
          stroke="#ffffff50" 
          tick={{ fill: '#ffffff50', fontSize: 12 }} 
          axisLine={false} 
          tickLine={false} 
        />
        <YAxis 
          stroke="#ffffff50" 
          tick={{ fill: '#ffffff50', fontSize: 12 }} 
          axisLine={false} 
          tickLine={false} 
        />
        <Tooltip 
          contentStyle={{ backgroundColor: '#171717', borderColor: '#ffffff20', borderRadius: '12px' }}
          itemStyle={{ color: '#fff' }}
        />
        <Area 
          type="monotone" 
          dataKey="recovery" 
          stroke="#FFD600" 
          strokeWidth={3}
          fillOpacity={1} 
          fill="url(#colorRecovery)" 
        />
        <Area 
          type="monotone" 
          dataKey="stress" 
          stroke="#ef4444" 
          strokeWidth={3}
          fillOpacity={1} 
          fill="url(#colorStress)" 
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
