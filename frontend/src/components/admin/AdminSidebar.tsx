'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import {
  LayoutDashboard,
  Users,
  UserCog,
  DollarSign,
  MessageCircle,
  Settings as SettingsIcon,
  LogOut,
  Dumbbell,
  Menu,
  X,
} from 'lucide-react';

const navItems = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Members', href: '/admin/members', icon: Users },
  { name: 'Staff', href: '/admin/staff', icon: UserCog },
  { name: 'Finances', href: '/admin/finances', icon: DollarSign },
  { name: 'WhatsApp', href: '/admin/whatsapp', icon: MessageCircle },
  { name: 'Settings', href: '/admin/settings', icon: SettingsIcon },
];

const sidebarVariants: Variants = {
  hidden: { x: '-100%', opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { type: 'spring' as const, stiffness: 300, damping: 30 },
  },
  exit: {
    x: '-100%',
    opacity: 0,
    transition: { type: 'spring' as const, stiffness: 300, damping: 30 },
  },
};

const linkHoverVariants: Variants = {
  rest: { x: 0 },
  hover: { x: 6, transition: { type: 'spring' as const, stiffness: 400, damping: 20 } },
};

export default function AdminSidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href: string) =>
    pathname === href || (href !== '/admin' && pathname?.startsWith(href));

  /* ─── Sidebar content (shared between desktop & mobile) ─── */
  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* ── Logo ── */}
      <div className="flex items-center gap-3 mb-12 px-2">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#FFD600] to-[#FF8A00] flex items-center justify-center shadow-lg shadow-[#FFD600]/20 shrink-0">
          <Dumbbell className="text-black" size={24} strokeWidth={2.5} />
        </div>
        <div className="flex flex-col">
          <h1 className="text-xl font-black tracking-widest text-white leading-tight">
            PRO FITNESS
          </h1>
          <span className="text-[10px] text-[#FFD600] font-bold tracking-[0.2em] uppercase">
            Admin Portal
          </span>
        </div>
      </div>

      {/* ── Navigation ── */}
      <nav className="flex-1 space-y-1.5">
        {navItems.map((item) => {
          const active = isActive(item.href);
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="block"
            >
              <motion.div
                variants={linkHoverVariants}
                initial="rest"
                whileHover="hover"
                whileTap={{ scale: 0.97 }}
                className={`relative flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-colors duration-300 ${
                  active
                    ? 'bg-[#FFD600]/10 text-[#FFD600] border-l-2 border-[#FFD600] shadow-[0_0_15px_rgba(255,214,0,0.08)]'
                    : 'text-neutral-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {active && (
                  <motion.div
                    layoutId="activeAdminTabIndicator"
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-7 bg-[#FFD600] rounded-r-full shadow-[0_0_10px_rgba(255,214,0,0.5)]"
                    transition={{ type: 'spring' as const, stiffness: 300, damping: 30 }}
                  />
                )}
                <Icon
                  size={22}
                  className={active ? 'text-[#FFD600]' : 'text-neutral-400'}
                  strokeWidth={active ? 2.5 : 2}
                />
                <span
                  className={`font-semibold tracking-wide text-sm ${
                    active ? 'text-[#FFD600]' : ''
                  }`}
                >
                  {item.name}
                </span>
              </motion.div>
            </Link>
          );
        })}
      </nav>

      {/* ── Bottom section ── */}
      <div className="mt-auto pt-6 border-t border-white/10 space-y-4">
        {/* User avatar placeholder */}
        <div className="flex items-center gap-3 px-4 py-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FFD600]/30 to-[#FF8A00]/30 border border-[#FFD600]/20 flex items-center justify-center text-[#FFD600] font-bold text-sm shrink-0">
            A
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-sm font-semibold text-white truncate">Admin User</span>
            <span className="text-xs text-neutral-500 truncate">admin@profitness.com</span>
          </div>
        </div>

        {/* Logout */}
        <motion.button
          whileHover={{ x: 4, backgroundColor: 'rgba(255, 0, 51, 0.1)', color: '#FF0033' }}
          whileTap={{ scale: 0.97 }}
          className="flex items-center gap-4 px-4 py-3.5 w-full text-neutral-400 rounded-2xl transition-colors duration-300 group hover:border hover:border-[#FF0033]/20 border border-transparent"
        >
          <LogOut
            size={22}
            className="group-hover:text-[#FF0033] transition-colors"
          />
          <span className="font-semibold tracking-wide text-sm">Log Out</span>
        </motion.button>
      </div>
    </div>
  );

  return (
    <>
      {/* ─── Desktop sidebar (fixed, 280px) ─── */}
      <aside className="hidden md:flex flex-col h-screen w-[280px] bg-white/5 backdrop-blur-xl border-r border-white/10 text-white p-6 sticky top-0 z-50 shrink-0">
        {sidebarContent}
      </aside>

      {/* ─── Mobile hamburger button ─── */}
      <button
        onClick={() => setMobileOpen(true)}
        className="md:hidden fixed top-4 left-4 z-[60] p-2.5 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 text-white hover:bg-white/10 transition-colors"
        aria-label="Open sidebar"
      >
        <Menu size={22} />
      </button>

      {/* ─── Mobile slide-in sidebar ─── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-[70]"
            />

            {/* Drawer */}
            <motion.aside
              variants={sidebarVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="md:hidden fixed top-0 left-0 h-screen w-[280px] bg-[#0A0A0A]/95 backdrop-blur-xl border-r border-white/10 text-white p-6 z-[80]"
            >
              {/* Close button */}
              <button
                onClick={() => setMobileOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Close sidebar"
              >
                <X size={20} />
              </button>

              {sidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
