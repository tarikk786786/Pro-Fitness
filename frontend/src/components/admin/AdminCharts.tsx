'use client';

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
} from 'recharts';

interface TooltipPayloadItem {
  value: number;
  name: string;
  dataKey: string;
  color?: string;
  payload: Record<string, unknown>;
}

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: TooltipPayloadItem[]; label?: string; }) {
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

function CapacityTooltip({ active, payload, label }: { active?: boolean; payload?: TooltipPayloadItem[]; label?: string; }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-[#111111] border border-white/10 rounded-2xl px-5 py-3.5 shadow-2xl backdrop-blur-xl">
      <p className="text-xs text-gray-400 font-semibold mb-1">{label}</p>
      <p className="text-lg font-black text-white">{payload[0].value}% Full</p>
    </div>
  );
}

function renderCustomLabel(props: any) {
  const { cx, cy, midAngle, innerRadius, outerRadius, percent, name } = props;
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 1.4;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" className="text-[11px] font-bold tracking-wider">
      {`${name} ${(percent * 100).toFixed(0)}%`}
    </text>
  );
}

export function AdminRevenueChart({ data }: { data: any[] }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
        <defs>
          <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFD600" stopOpacity={0.35} />
            <stop offset="100%" stopColor="#FFD600" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#222" />
        <XAxis dataKey="day" stroke="#555" fontSize={11} tickLine={false} axisLine={false} dy={10} interval={4} />
        <YAxis stroke="#555" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v: number) => `₹${(v / 1000).toFixed(0)}k`} />
        <Tooltip content={<CustomTooltip />} />
        <Area type="monotone" dataKey="revenue" stroke="#FFD600" strokeWidth={3} fillOpacity={1} fill="url(#revenueGradient)" activeDot={{ r: 7, fill: '#FFD600', stroke: '#0A0A0A', strokeWidth: 4 }} />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function AdminMembershipPieChart({ data }: { data: any[] }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie data={data} cx="50%" cy="50%" innerRadius={55} outerRadius={90} paddingAngle={4} dataKey="value" labelLine={false} label={renderCustomLabel} stroke="none">
          {data.map((entry) => (
            <Cell key={entry.name} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip contentStyle={{ backgroundColor: '#111111', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', fontWeight: 'bold', color: '#fff' }} />
      </PieChart>
    </ResponsiveContainer>
  );
}

export function AdminCapacityBarChart({ data }: { data: any[] }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#222" />
        <XAxis dataKey="hour" stroke="#555" fontSize={11} tickLine={false} axisLine={false} dy={10} interval={1} />
        <YAxis stroke="#555" fontSize={11} tickLine={false} axisLine={false} domain={[0, 100]} tickFormatter={(v: number) => `${v}%`} />
        <Tooltip content={<CapacityTooltip />} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
        <Bar
          dataKey="capacity"
          radius={[6, 6, 0, 0]}
          barSize={28}
          fill="#FFD600"
          fillOpacity={1}
          shape={(props: any) => {
            const { x, y, width, height, payload } = props;
            const isPeak = payload.capacity >= 80;
            return (
              <rect x={x} y={y} width={width} height={height} rx={6} ry={6} fill={isPeak ? '#FFD600' : 'rgba(255,214,0,0.3)'} style={isPeak ? { filter: 'drop-shadow(0 0 8px rgba(255,214,0,0.4))' } : undefined} />
            );
          }}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
