'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, Variants, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import {
  Users,
  Star,
  Clock,
  Shield,
  UserPlus,
  CalendarClock,
  Eye,
  Search,
  Filter,
  Dumbbell,
  Apple,
  Briefcase,
  Activity,
  ChevronDown,
} from 'lucide-react';

/* ─── Types ──────────────────────────────────────────────────────── */

type Role = 'Head Trainer' | 'Trainer' | 'Nutritionist' | 'Manager';
type DutyStatus = 'On Duty' | 'Off Duty';

interface StaffMember {
  id: number;
  name: string;
  role: Role;
  specialty: string;
  assignedMembers: number | null;
  rating: number | null;
  shift: string;
  status: DutyStatus;
  initials: string;
}

/* ─── Mock Data ──────────────────────────────────────────────────── */

const staffData: StaffMember[] = [
  {
    id: 1,
    name: 'Rajesh Kumar',
    role: 'Head Trainer',
    specialty: 'Strength & Conditioning',
    assignedMembers: 28,
    rating: 4.9,
    shift: '6AM - 2PM',
    status: 'On Duty',
    initials: 'RK',
  },
  {
    id: 2,
    name: 'Priya Sharma',
    role: 'Trainer',
    specialty: 'Women Fitness',
    assignedMembers: 22,
    rating: 4.8,
    shift: '7AM - 3PM',
    status: 'On Duty',
    initials: 'PS',
  },
  {
    id: 3,
    name: 'Arjun Patel',
    role: 'Trainer',
    specialty: 'CrossFit',
    assignedMembers: 18,
    rating: 4.7,
    shift: '8AM - 4PM',
    status: 'Off Duty',
    initials: 'AP',
  },
  {
    id: 4,
    name: 'Sneha Reddy',
    role: 'Nutritionist',
    specialty: 'Diet Planning',
    assignedMembers: 35,
    rating: 4.9,
    shift: '9AM - 5PM',
    status: 'On Duty',
    initials: 'SR',
  },
  {
    id: 5,
    name: 'Vikram Singh',
    role: 'Trainer',
    specialty: 'Powerlifting',
    assignedMembers: 15,
    rating: 4.6,
    shift: '10AM - 6PM',
    status: 'Off Duty',
    initials: 'VS',
  },
  {
    id: 6,
    name: 'Anita Das',
    role: 'Trainer',
    specialty: 'Yoga & Mobility',
    assignedMembers: 20,
    rating: 4.8,
    shift: '6AM - 2PM',
    status: 'On Duty',
    initials: 'AD',
  },
  {
    id: 7,
    name: 'Rohit Mehra',
    role: 'Manager',
    specialty: 'Operations',
    assignedMembers: null,
    rating: null,
    shift: '9AM - 6PM',
    status: 'On Duty',
    initials: 'RM',
  },
  {
    id: 8,
    name: 'Kavita Joshi',
    role: 'Trainer',
    specialty: 'Cardio & HIIT',
    assignedMembers: 24,
    rating: 4.7,
    shift: '7AM - 3PM',
    status: 'Off Duty',
    initials: 'KJ',
  },
];

const allRoles: Role[] = ['Head Trainer', 'Trainer', 'Nutritionist', 'Manager'];

/* ─── Helpers ────────────────────────────────────────────────────── */

function getRoleIcon(role: Role) {
  switch (role) {
    case 'Head Trainer':
      return Shield;
    case 'Trainer':
      return Dumbbell;
    case 'Nutritionist':
      return Apple;
    case 'Manager':
      return Briefcase;
  }
}

function getRoleColor(role: Role): string {
  switch (role) {
    case 'Head Trainer':
      return '#FFD600';
    case 'Trainer':
      return '#00D4FF';
    case 'Nutritionist':
      return '#22C55E';
    case 'Manager':
      return '#A855F7';
  }
}

/* ─── Framer Variants ────────────────────────────────────────────── */

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring' as const, stiffness: 120, damping: 18 },
  },
  exit: {
    opacity: 0,
    y: -20,
    scale: 0.9,
    transition: { duration: 0.25 },
  },
};

const headerVariants: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring' as const, stiffness: 100, damping: 20 },
  },
};

const statVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: 'spring' as const, stiffness: 150, damping: 15 },
  },
};

/* ─── Star Rating Component ──────────────────────────────────────── */

function StarRating({ rating }: { rating: number }) {
  const fullStars = Math.floor(rating);
  const partialFill = (rating - fullStars) * 100;

  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => {
        if (i < fullStars) {
          return (
            <Star
              key={i}
              className="w-3.5 h-3.5 fill-[#FFD600] text-[#FFD600]"
            />
          );
        }
        if (i === fullStars && partialFill > 0) {
          return (
            <div key={i} className="relative w-3.5 h-3.5">
              <Star className="absolute inset-0 w-3.5 h-3.5 text-gray-600" />
              <div
                className="absolute inset-0 overflow-hidden"
                style={{ width: `${partialFill}%` }}
              >
                <Star className="w-3.5 h-3.5 fill-[#FFD600] text-[#FFD600]" />
              </div>
            </div>
          );
        }
        return (
          <Star key={i} className="w-3.5 h-3.5 text-gray-600" />
        );
      })}
      <span className="ml-1 text-sm font-bold text-[#FFD600]">{rating}</span>
    </div>
  );
}

/* ─── Page Component ─────────────────────────────────────────────── */

export default function StaffManagementPage() {
  const [activeRole, setActiveRole] = useState<Role | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);
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

  const filteredStaff = staffData.filter((staff) => {
    const matchesRole = activeRole === 'All' || staff.role === activeRole;
    const matchesSearch =
      searchQuery === '' ||
      staff.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      staff.specialty.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRole && matchesSearch;
  });

  const onDutyCount = staffData.filter((s) => s.status === 'On Duty').length;
  const totalMembers = staffData.reduce(
    (sum, s) => sum + (s.assignedMembers ?? 0),
    0
  );
  const avgRating =
    staffData.filter((s) => s.rating !== null).reduce((sum, s) => sum + (s.rating ?? 0), 0) /
    staffData.filter((s) => s.rating !== null).length;

  return (
    <motion.div
      className="space-y-8 max-w-[1400px] mx-auto pb-12"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* ── Header ─────────────────────────────────────────────── */}
      <div
        ref={headerRef}
        className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6"
      >
        <div>
          <motion.h1
            variants={headerVariants}
            className="text-4xl font-black tracking-tight mb-2 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400"
          >
            Staff & Trainers
          </motion.h1>
          <motion.p variants={headerVariants} className="text-gray-400 font-medium">
            Manage your elite coaching team and operations staff.
          </motion.p>
        </div>

        <motion.button
          variants={headerVariants}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="group flex items-center gap-2 bg-[#FFD600] text-black px-6 py-3 rounded-full font-black hover:bg-white transition-all shadow-[0_0_20px_rgba(255,214,0,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)]"
        >
          <UserPlus className="w-5 h-5" /> Add Staff
        </motion.button>
      </div>

      {/* ── Quick Stats ────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            icon: Users,
            label: 'Total Staff',
            value: String(staffData.length),
            color: '#FFD600',
          },
          {
            icon: Activity,
            label: 'On Duty Now',
            value: String(onDutyCount),
            color: '#22C55E',
          },
          {
            icon: Users,
            label: 'Members Assigned',
            value: String(totalMembers),
            color: '#00D4FF',
          },
          {
            icon: Star,
            label: 'Avg Rating',
            value: avgRating.toFixed(1),
            color: '#FFD600',
          },
        ].map((stat, i) => (
          <motion.div
            key={i}
            variants={statVariants}
            className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 overflow-hidden group hover:bg-white/10 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center border border-white/5"
                style={{ backgroundColor: `${stat.color}15` }}
              >
                <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                  {stat.label}
                </p>
                <p className="text-2xl font-black tracking-tight">{stat.value}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* ── Search & Filters ───────────────────────────────────── */}
      <motion.div
        variants={headerVariants}
        className="flex flex-col md:flex-row gap-4 items-start md:items-center"
      >
        {/* Search bar */}
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          <input
            type="text"
            placeholder="Search by name or specialty…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl pl-12 pr-4 py-3 text-sm font-medium text-white placeholder:text-gray-500 outline-none focus:border-[#FFD600]/50 focus:shadow-[0_0_20px_rgba(255,214,0,0.1)] transition-all"
          />
        </div>

        {/* Role filters — Desktop */}
        <div className="hidden md:flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setActiveRole('All')}
            className={`px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${
              activeRole === 'All'
                ? 'bg-[#FFD600] text-black shadow-[0_0_15px_rgba(255,214,0,0.3)]'
                : 'bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10'
            }`}
          >
            All
          </button>
          {allRoles.map((role) => {
            const Icon = getRoleIcon(role);
            return (
              <button
                key={role}
                onClick={() => setActiveRole(role)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${
                  activeRole === role
                    ? 'bg-[#FFD600] text-black shadow-[0_0_15px_rgba(255,214,0,0.3)]'
                    : 'bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10'
                }`}
              >
                <Icon className="w-4 h-4" />
                {role}
              </button>
            );
          })}
        </div>

        {/* Role filter — Mobile dropdown */}
        <div className="relative md:hidden w-full">
          <button
            onClick={() => setFilterOpen(!filterOpen)}
            className="flex items-center justify-between w-full px-4 py-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl text-sm font-bold text-gray-300"
          >
            <span className="flex items-center gap-2">
              <Filter className="w-4 h-4" />
              {activeRole === 'All' ? 'All Roles' : activeRole}
            </span>
            <ChevronDown
              className={`w-4 h-4 transition-transform ${filterOpen ? 'rotate-180' : ''}`}
            />
          </button>
          <AnimatePresence>
            {filterOpen && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="absolute top-full mt-2 left-0 right-0 bg-[#1a1a1a] border border-white/10 rounded-2xl overflow-hidden z-50"
              >
                <button
                  onClick={() => {
                    setActiveRole('All');
                    setFilterOpen(false);
                  }}
                  className={`w-full text-left px-4 py-3 text-sm font-bold transition-colors ${
                    activeRole === 'All'
                      ? 'bg-[#FFD600]/10 text-[#FFD600]'
                      : 'text-gray-400 hover:bg-white/5'
                  }`}
                >
                  All Roles
                </button>
                {allRoles.map((role) => (
                  <button
                    key={role}
                    onClick={() => {
                      setActiveRole(role);
                      setFilterOpen(false);
                    }}
                    className={`w-full text-left px-4 py-3 text-sm font-bold transition-colors ${
                      activeRole === role
                        ? 'bg-[#FFD600]/10 text-[#FFD600]'
                        : 'text-gray-400 hover:bg-white/5'
                    }`}
                  >
                    {role}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* ── Staff Grid ─────────────────────────────────────────── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeRole + searchQuery}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          {filteredStaff.map((staff) => {
            const RoleIcon = getRoleIcon(staff.role);
            const roleColor = getRoleColor(staff.role);
            const isOnDuty = staff.status === 'On Duty';

            return (
              <motion.div
                key={staff.id}
                variants={cardVariants}
                layout
                className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden group hover:border-white/20 transition-all duration-300"
              >
                {/* Top accent line */}
                <div
                  className="absolute top-0 left-0 right-0 h-[2px]"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${roleColor}, transparent)`,
                  }}
                />

                {/* Card glow on hover */}
                <div
                  className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-[60px] opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                  style={{ backgroundColor: roleColor }}
                />

                <div className="relative p-6 space-y-5">
                  {/* ── Avatar & Status ── */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      {/* Avatar */}
                      <div
                        className="relative w-14 h-14 rounded-2xl flex items-center justify-center font-black text-lg border border-white/10"
                        style={{
                          backgroundColor: `${roleColor}15`,
                          color: roleColor,
                        }}
                      >
                        {staff.initials}

                        {/* Duty dot */}
                        <span
                          className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-[#0A0A0A] ${
                            isOnDuty
                              ? 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.7)]'
                              : 'bg-gray-500'
                          }`}
                        />
                      </div>

                      <div>
                        <h3 className="text-base font-black tracking-tight text-white leading-tight">
                          {staff.name}
                        </h3>
                        <div
                          className="flex items-center gap-1.5 mt-1"
                          style={{ color: roleColor }}
                        >
                          <RoleIcon className="w-3.5 h-3.5" />
                          <span className="text-xs font-bold uppercase tracking-wider">
                            {staff.role}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Duty badge */}
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                        isOnDuty
                          ? 'bg-emerald-400/10 text-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.15)]'
                          : 'bg-white/5 text-gray-500'
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          isOnDuty
                            ? 'bg-emerald-400 animate-pulse'
                            : 'bg-gray-600'
                        }`}
                      />
                      {staff.status}
                    </span>
                  </div>

                  {/* ── Details ── */}
                  <div className="space-y-3">
                    {/* Specialty */}
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center">
                        <Dumbbell className="w-3.5 h-3.5 text-gray-400" />
                      </div>
                      <span className="text-sm font-medium text-gray-300">
                        {staff.specialty}
                      </span>
                    </div>

                    {/* Shift */}
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center">
                        <Clock className="w-3.5 h-3.5 text-gray-400" />
                      </div>
                      <span className="text-sm font-medium text-gray-300">
                        {staff.shift}
                      </span>
                    </div>

                    {/* Members & Rating row */}
                    <div className="flex items-center justify-between pt-1">
                      {staff.assignedMembers !== null ? (
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center">
                            <Users className="w-3.5 h-3.5 text-gray-400" />
                          </div>
                          <span className="text-sm font-medium text-gray-300">
                            <span className="text-white font-bold">
                              {staff.assignedMembers}
                            </span>{' '}
                            members
                          </span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center">
                            <Users className="w-3.5 h-3.5 text-gray-400" />
                          </div>
                          <span className="text-sm font-medium text-gray-500">
                            N/A
                          </span>
                        </div>
                      )}

                      {staff.rating !== null ? (
                        <StarRating rating={staff.rating} />
                      ) : (
                        <span className="text-sm font-medium text-gray-500">
                          N/A
                        </span>
                      )}
                    </div>
                  </div>

                  {/* ── Separator ── */}
                  <div className="h-px bg-white/5" />

                  {/* ── Action Buttons ── */}
                  <div className="flex items-center gap-2">
                    <button className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-[#FFD600]/10 text-[#FFD600] text-xs font-bold hover:bg-[#FFD600]/20 transition-colors">
                      <UserPlus className="w-3.5 h-3.5" />
                      Assign
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-white/5 text-gray-300 text-xs font-bold hover:bg-white/10 transition-colors">
                      <CalendarClock className="w-3.5 h-3.5" />
                      Schedule
                    </button>
                    <button className="flex items-center justify-center w-9 h-9 rounded-xl bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white transition-colors">
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </AnimatePresence>

      {/* Empty state */}
      {filteredStaff.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center py-20 text-center"
        >
          <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6">
            <Users className="w-10 h-10 text-gray-600" />
          </div>
          <h3 className="text-xl font-black text-gray-400 mb-2">
            No Staff Found
          </h3>
          <p className="text-sm text-gray-600 max-w-sm">
            No staff members match your current filters. Try adjusting your
            search or role filter.
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}
