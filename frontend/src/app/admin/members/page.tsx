'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import {
  Search,
  Users,
  RefreshCw,
  Snowflake,
  Eye,
  ChevronLeft,
  ChevronRight,
  Filter,
  UserCheck,
  UserX,
  Pause,
  Crown,
} from 'lucide-react';

// ─── Types ───────────────────────────────────────────────────────────────────

type Plan = 'Daily' | 'Weekly' | 'Monthly' | 'Yearly';
type Status = 'Active' | 'Expired' | 'Frozen';

interface Member {
  id: number;
  name: string;
  email: string;
  phone: string;
  plan: Plan;
  startDate: string;
  expiryDate: string;
  status: Status;
  assignedTrainer: string;
}

// ─── Mock Data ───────────────────────────────────────────────────────────────

const mockMembers: Member[] = [
  { id: 1, name: 'Aarav Sharma', email: 'aarav.sharma@email.com', phone: '+91 98765 43210', plan: 'Yearly', startDate: '2025-01-15', expiryDate: '2026-01-15', status: 'Active', assignedTrainer: 'Coach Vikram' },
  { id: 2, name: 'Priya Patel', email: 'priya.patel@email.com', phone: '+91 87654 32109', plan: 'Monthly', startDate: '2025-11-01', expiryDate: '2025-12-01', status: 'Expired', assignedTrainer: 'Coach Meera' },
  { id: 3, name: 'Rohan Mehta', email: 'rohan.mehta@email.com', phone: '+91 76543 21098', plan: 'Yearly', startDate: '2025-06-20', expiryDate: '2026-06-20', status: 'Active', assignedTrainer: 'Coach Vikram' },
  { id: 4, name: 'Ananya Singh', email: 'ananya.singh@email.com', phone: '+91 65432 10987', plan: 'Monthly', startDate: '2025-09-10', expiryDate: '2025-10-10', status: 'Frozen', assignedTrainer: 'Coach Arjun' },
  { id: 5, name: 'Kabir Joshi', email: 'kabir.joshi@email.com', phone: '+91 54321 09876', plan: 'Weekly', startDate: '2026-05-25', expiryDate: '2026-06-01', status: 'Active', assignedTrainer: 'Coach Meera' },
  { id: 6, name: 'Ishita Reddy', email: 'ishita.reddy@email.com', phone: '+91 43210 98765', plan: 'Yearly', startDate: '2024-12-01', expiryDate: '2025-12-01', status: 'Expired', assignedTrainer: 'Coach Arjun' },
  { id: 7, name: 'Vihaan Kapoor', email: 'vihaan.kapoor@email.com', phone: '+91 32109 87654', plan: 'Monthly', startDate: '2026-04-15', expiryDate: '2026-05-15', status: 'Expired', assignedTrainer: 'Coach Vikram' },
  { id: 8, name: 'Diya Nair', email: 'diya.nair@email.com', phone: '+91 21098 76543', plan: 'Daily', startDate: '2026-06-01', expiryDate: '2026-06-01', status: 'Active', assignedTrainer: 'Coach Meera' },
  { id: 9, name: 'Arjun Gupta', email: 'arjun.gupta@email.com', phone: '+91 10987 65432', plan: 'Yearly', startDate: '2025-03-01', expiryDate: '2026-03-01', status: 'Frozen', assignedTrainer: 'Coach Arjun' },
  { id: 10, name: 'Saanvi Desai', email: 'saanvi.desai@email.com', phone: '+91 98712 34567', plan: 'Monthly', startDate: '2026-05-01', expiryDate: '2026-06-01', status: 'Active', assignedTrainer: 'Coach Vikram' },
  { id: 11, name: 'Reyansh Iyer', email: 'reyansh.iyer@email.com', phone: '+91 87612 34567', plan: 'Weekly', startDate: '2026-05-20', expiryDate: '2026-05-27', status: 'Expired', assignedTrainer: 'Coach Meera' },
  { id: 12, name: 'Myra Choudhary', email: 'myra.choudhary@email.com', phone: '+91 76512 34567', plan: 'Yearly', startDate: '2025-08-10', expiryDate: '2026-08-10', status: 'Active', assignedTrainer: 'Coach Arjun' },
  { id: 13, name: 'Aditya Verma', email: 'aditya.verma@email.com', phone: '+91 65412 34567', plan: 'Monthly', startDate: '2026-03-01', expiryDate: '2026-04-01', status: 'Frozen', assignedTrainer: 'Coach Vikram' },
  { id: 14, name: 'Kiara Malhotra', email: 'kiara.malhotra@email.com', phone: '+91 54312 34567', plan: 'Daily', startDate: '2026-06-04', expiryDate: '2026-06-04', status: 'Active', assignedTrainer: 'Coach Meera' },
  { id: 15, name: 'Dhruv Bhatia', email: 'dhruv.bhatia@email.com', phone: '+91 43212 34567', plan: 'Yearly', startDate: '2025-02-14', expiryDate: '2026-02-14', status: 'Active', assignedTrainer: 'Coach Arjun' },
];

// ─── Status Helpers ──────────────────────────────────────────────────────────

const statusColors: Record<Status, string> = {
  Active: '#10B981',
  Expired: '#FF4444',
  Frozen: '#3B82F6',
};

const statusIcons: Record<Status, React.ReactNode> = {
  Active: <UserCheck className="w-3 h-3" />,
  Expired: <UserX className="w-3 h-3" />,
  Frozen: <Pause className="w-3 h-3" />,
};

const planBadgeColors: Record<Plan, string> = {
  Daily: 'bg-white/10 text-gray-300',
  Weekly: 'bg-amber-500/10 text-amber-400',
  Monthly: 'bg-purple-500/10 text-purple-400',
  Yearly: 'bg-[#FFD600]/10 text-[#FFD600]',
};

// ─── Animation Variants ──────────────────────────────────────────────────────

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.04,
    },
  },
};

const headerVariants: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring' as const, stiffness: 100, damping: 15 },
  },
};

const rowVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: 'spring' as const, stiffness: 120, damping: 17 },
  },
  exit: {
    opacity: 0,
    x: 20,
    transition: { duration: 0.2 },
  },
};

const filterVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: 'spring' as const, stiffness: 200, damping: 20 },
  },
};

// ─── Constants ───────────────────────────────────────────────────────────────

const ROWS_PER_PAGE = 8;
const filterOptions: Array<{ label: string; value: Status | 'All' }> = [
  { label: 'All', value: 'All' },
  { label: 'Active', value: 'Active' },
  { label: 'Expired', value: 'Expired' },
  { label: 'Frozen', value: 'Frozen' },
];

// ─── Component ───────────────────────────────────────────────────────────────

export default function MembersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<Status | 'All'>('All');
  const [currentPage, setCurrentPage] = useState(1);

  // Filtered + searched members
  const filteredMembers = useMemo(() => {
    let result = mockMembers;

    if (activeFilter !== 'All') {
      result = result.filter((m) => m.status === activeFilter);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (m) =>
          m.name.toLowerCase().includes(q) ||
          m.email.toLowerCase().includes(q) ||
          m.phone.includes(q) ||
          m.assignedTrainer.toLowerCase().includes(q)
      );
    }

    return result;
  }, [searchQuery, activeFilter]);

  // Pagination
  const totalPages = Math.max(1, Math.ceil(filteredMembers.length / ROWS_PER_PAGE));
  const paginatedMembers = filteredMembers.slice(
    (currentPage - 1) * ROWS_PER_PAGE,
    currentPage * ROWS_PER_PAGE
  );

  // Reset page when filters change
  const handleFilterChange = (filter: Status | 'All') => {
    setActiveFilter(filter);
    setCurrentPage(1);
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  // Count stats
  const activeCount = mockMembers.filter((m) => m.status === 'Active').length;
  const expiredCount = mockMembers.filter((m) => m.status === 'Expired').length;
  const frozenCount = mockMembers.filter((m) => m.status === 'Frozen').length;

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      {/* ── Page Header ──────────────────────────────────────────────── */}
      <motion.div variants={headerVariants} className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-[#FFD600]/10 flex items-center justify-center">
              <Users className="w-5 h-5 text-[#FFD600]" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
              Member CRM
            </h1>
          </div>
          <p className="text-gray-500 text-sm ml-[52px]">
            Manage all gym memberships, plans, and member profiles
          </p>
        </div>

        {/* Quick stats */}
        <motion.div variants={filterVariants} className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl px-4 py-2">
            <Crown className="w-4 h-4 text-[#FFD600]" />
            <span className="text-gray-400">Total</span>
            <span className="text-white font-semibold">{mockMembers.length}</span>
          </div>
          <div className="hidden sm:flex items-center gap-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl px-4 py-2">
            <div className="w-2 h-2 rounded-full bg-[#10B981]" />
            <span className="text-gray-400">{activeCount}</span>
          </div>
          <div className="hidden sm:flex items-center gap-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl px-4 py-2">
            <div className="w-2 h-2 rounded-full bg-[#FF4444]" />
            <span className="text-gray-400">{expiredCount}</span>
          </div>
          <div className="hidden sm:flex items-center gap-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl px-4 py-2">
            <div className="w-2 h-2 rounded-full bg-[#3B82F6]" />
            <span className="text-gray-400">{frozenCount}</span>
          </div>
        </motion.div>
      </motion.div>

      {/* ── Search & Filters ─────────────────────────────────────────── */}
      <motion.div
        variants={headerVariants}
        className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
      >
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search by name, email, phone, trainer..."
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl text-white text-sm placeholder:text-gray-600 focus:outline-none focus:border-[#FFD600]/50 focus:ring-1 focus:ring-[#FFD600]/20 transition-all duration-300"
          />
        </div>

        {/* Filter buttons */}
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-500 mr-1" />
          {filterOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => handleFilterChange(opt.value)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                activeFilter === opt.value
                  ? opt.value === 'Active'
                    ? 'bg-[#10B981]/20 text-[#10B981] border border-[#10B981]/30'
                    : opt.value === 'Expired'
                    ? 'bg-[#FF4444]/20 text-[#FF4444] border border-[#FF4444]/30'
                    : opt.value === 'Frozen'
                    ? 'bg-[#3B82F6]/20 text-[#3B82F6] border border-[#3B82F6]/30'
                    : 'bg-[#FFD600]/20 text-[#FFD600] border border-[#FFD600]/30'
                  : 'bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10 hover:text-white'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </motion.div>

      {/* ── Data Table ────────────────────────────────────────────────── */}
      <motion.div
        variants={headerVariants}
        className="bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead>
              <tr className="border-b border-white/10">
                <th className="px-6 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-gray-500">
                  Member
                </th>
                <th className="px-6 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-gray-500">
                  Phone
                </th>
                <th className="px-6 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-gray-500">
                  Plan
                </th>
                <th className="px-6 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-gray-500">
                  Duration
                </th>
                <th className="px-6 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-gray-500">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-gray-500">
                  Trainer
                </th>
                <th className="px-6 py-4 text-right text-[11px] font-semibold uppercase tracking-wider text-gray-500">
                  Actions
                </th>
              </tr>
            </thead>
            <AnimatePresence mode="wait">
              <motion.tbody
                key={`${activeFilter}-${searchQuery}-${currentPage}`}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                {paginatedMembers.length === 0 ? (
                  <motion.tr variants={rowVariants}>
                    <td colSpan={7} className="px-6 py-16 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <Users className="w-10 h-10 text-gray-700" />
                        <p className="text-gray-500 text-sm">No members found</p>
                        <p className="text-gray-600 text-xs">
                          Try adjusting your search or filter criteria
                        </p>
                      </div>
                    </td>
                  </motion.tr>
                ) : (
                  paginatedMembers.map((member) => (
                    <motion.tr
                      key={member.id}
                      variants={rowVariants}
                      className="bg-white/[0.02] hover:bg-white/[0.06] border-b border-white/5 transition-colors duration-200 group"
                    >
                      {/* Member Info */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#FFD600]/20 to-[#FFD600]/5 border border-[#FFD600]/20 flex items-center justify-center text-sm font-semibold text-[#FFD600] shrink-0">
                            {member.name.charAt(0)}
                          </div>
                          <div className="min-w-0">
                            <p className="text-white text-sm font-medium truncate">
                              {member.name}
                            </p>
                            <p className="text-gray-500 text-xs truncate">
                              {member.email}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Phone */}
                      <td className="px-6 py-4">
                        <span className="text-gray-300 text-sm">{member.phone}</span>
                      </td>

                      {/* Plan */}
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium ${planBadgeColors[member.plan]}`}
                        >
                          {member.plan === 'Yearly' && (
                            <Crown className="w-3 h-3" />
                          )}
                          {member.plan}
                        </span>
                      </td>

                      {/* Duration */}
                      <td className="px-6 py-4">
                        <div className="text-sm">
                          <p className="text-gray-300">
                            {formatDate(member.startDate)}
                          </p>
                          <p className="text-gray-600 text-xs">
                            → {formatDate(member.expiryDate)}
                          </p>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="px-6 py-4">
                        <span
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium"
                          style={{
                            backgroundColor: `${statusColors[member.status]}15`,
                            color: statusColors[member.status],
                            border: `1px solid ${statusColors[member.status]}30`,
                          }}
                        >
                          {statusIcons[member.status]}
                          {member.status}
                        </span>
                      </td>

                      {/* Trainer */}
                      <td className="px-6 py-4">
                        <span className="text-gray-300 text-sm">
                          {member.assignedTrainer}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2 opacity-70 group-hover:opacity-100 transition-opacity">
                          <button
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/20 hover:bg-[#10B981]/20 transition-all duration-200"
                            title="Renew membership"
                          >
                            <RefreshCw className="w-3 h-3" />
                            Renew
                          </button>
                          <button
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-[#3B82F6]/10 text-[#3B82F6] border border-[#3B82F6]/20 hover:bg-[#3B82F6]/20 transition-all duration-200"
                            title="Freeze membership"
                          >
                            <Snowflake className="w-3 h-3" />
                            Freeze
                          </button>
                          <button
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-transparent text-gray-400 border border-white/10 hover:bg-white/5 hover:text-white transition-all duration-200"
                            title="View profile"
                          >
                            <Eye className="w-3 h-3" />
                            View
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))
                )}
              </motion.tbody>
            </AnimatePresence>
          </table>
        </div>

        {/* ── Pagination ────────────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-4 border-t border-white/10">
          <p className="text-gray-500 text-sm">
            Showing{' '}
            <span className="text-gray-300 font-medium">
              {filteredMembers.length === 0
                ? 0
                : (currentPage - 1) * ROWS_PER_PAGE + 1}
            </span>
            –
            <span className="text-gray-300 font-medium">
              {Math.min(currentPage * ROWS_PER_PAGE, filteredMembers.length)}
            </span>{' '}
            of{' '}
            <span className="text-gray-300 font-medium">
              {filteredMembers.length}
            </span>{' '}
            members
          </p>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-9 h-9 rounded-lg text-sm font-medium transition-all duration-200 ${
                  page === currentPage
                    ? 'bg-[#FFD600]/20 text-[#FFD600] border border-[#FFD600]/30'
                    : 'bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10 hover:text-white'
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Utilities ───────────────────────────────────────────────────────────────

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}
