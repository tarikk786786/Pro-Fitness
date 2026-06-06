'use client';

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function ReportBarChart({ data }: { data: any }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data}>
        <XAxis dataKey="set" stroke="#4B5563" fontSize={12} />
        <YAxis stroke="#4B5563" fontSize={12} />
        <Tooltip contentStyle={{ backgroundColor: '#0A0A0A', border: '1px solid #333' }} />
        <Bar dataKey="reps" fill="#FFD600" radius={[4, 4, 0, 0]} />
        <Bar dataKey="score" fill="#10B981" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
