'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';

const formatCurrency = (value: number) => {
  return `₹${value.toLocaleString('en-IN')}`;
};

// ─── CUSTOM TOOLTIP COMPONENTS ──────────────────────────────────────

interface RevenueTooltipProps {
  active?: boolean;
  payload?: Array<{ value: number; dataKey: string }>;
  label?: string;
}

const RevenueExpenseTooltip = ({ active, payload, label }: RevenueTooltipProps) => {
  if (!active || !payload) return null;
  return (
    <div className="bg-[#111] border border-white/10 rounded-2xl px-5 py-4 shadow-2xl backdrop-blur-xl">
      <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-2">{label}</p>
      {payload.map((entry, i) => (
        <p key={i} className="text-sm font-bold" style={{ color: entry.dataKey === 'Revenue' ? '#FFD600' : '#FF4444' }}>
          {entry.dataKey}: {formatCurrency(entry.value)}
        </p>
      ))}
    </div>
  );
};

interface ExpenseTooltipProps {
  active?: boolean;
  payload?: Array<{ value: number; payload: { category: string } }>;
}

const ExpenseTooltip = ({ active, payload }: ExpenseTooltipProps) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-[#111] border border-white/10 rounded-2xl px-5 py-4 shadow-2xl backdrop-blur-xl">
      <p className="text-white text-sm font-bold">{payload[0].payload.category}</p>
      <p className="text-[#FFD600] text-sm font-bold">{formatCurrency(payload[0].value)}</p>
    </div>
  );
};

interface PieTooltipProps {
  active?: boolean;
  payload?: Array<{ payload: { name: string; value: number; percentage: string; color: string } }>;
}

const PieTooltipContent = ({ active, payload }: PieTooltipProps) => {
  if (!active || !payload?.length) return null;
  const data = payload[0].payload;
  return (
    <div className="bg-[#111] border border-white/10 rounded-2xl px-5 py-4 shadow-2xl backdrop-blur-xl">
      <p className="text-sm font-bold" style={{ color: data.color }}>{data.name}</p>
      <p className="text-white text-sm font-bold">{formatCurrency(data.value)}</p>
      <p className="text-gray-400 text-xs font-bold">{data.percentage} of total</p>
    </div>
  );
};

// ─── PIE CHART LEGEND ───────────────────────────────────────────────

interface LegendEntry {
  value: string;
  color?: string;
  payload?: { percentage: string; value: number };
}

const CustomLegend = ({ payload }: { payload?: LegendEntry[] }) => {
  if (!payload) return null;
  return (
    <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 mt-4">
      {payload.map((entry, i) => (
        <div key={i} className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }} />
          <span className="text-gray-400 text-xs font-bold">
            {entry.value} ({(entry.payload as LegendEntry['payload'])?.percentage})
          </span>
        </div>
      ))}
    </div>
  );
};

export function RevenueExpenseChart({ data }: { data: any[] }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.06)" />
        <XAxis dataKey="month" stroke="#888" fontSize={12} tickLine={false} axisLine={false} dy={10} />
        <YAxis
          stroke="#888"
          fontSize={11}
          tickLine={false}
          axisLine={false}
          tickFormatter={(v: number) => `₹${(v / 1000).toFixed(0)}K`}
        />
        <Tooltip content={<RevenueExpenseTooltip />} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
        <Bar dataKey="Revenue" fill="#FFD600" radius={[6, 6, 0, 0]} barSize={28} />
        <Bar dataKey="Expenses" fill="#FF4444" radius={[6, 6, 0, 0]} barSize={28} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function MembershipTierPieChart({ data }: { data: any[] }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={95}
          paddingAngle={4}
          dataKey="value"
          stroke="none"
        >
          {data.map((entry: any, index: number) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip content={<PieTooltipContent />} />
        <Legend content={<CustomLegend />} />
      </PieChart>
    </ResponsiveContainer>
  );
}

export function ExpenseCategoriesChart({ data }: { data: any[] }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        layout="vertical"
        margin={{ top: 0, right: 30, left: 10, bottom: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="rgba(255,255,255,0.06)" />
        <XAxis
          type="number"
          stroke="#888"
          fontSize={11}
          tickLine={false}
          axisLine={false}
          tickFormatter={(v: number) => `₹${(v / 1000).toFixed(0)}K`}
        />
        <YAxis
          dataKey="category"
          type="category"
          stroke="#888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          width={90}
        />
        <Tooltip content={<ExpenseTooltip />} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
        <Bar dataKey="amount" radius={[0, 8, 8, 0]} barSize={24}>
          {data.map((_, index: number) => (
            <Cell
              key={`expense-cell-${index}`}
              fill={`rgba(255, 214, 0, ${1 - index * 0.14})`}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
