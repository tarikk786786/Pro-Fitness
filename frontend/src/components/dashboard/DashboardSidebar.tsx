"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Dumbbell,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface SidebarLink {
  label: string;
  href: string;
  icon: React.ReactNode;
}

interface DashboardSidebarProps {
  links: SidebarLink[];
  userRole: "user" | "trainer" | "admin";
  userName?: string;
  userAvatar?: string;
}

export default function DashboardSidebar({
  links,
  userRole,
  userName = "User",
  userAvatar,
}: DashboardSidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  const roleColors: Record<string, string> = {
    user: "text-[#00D4FF]",
    trainer: "text-[#00FF88]",
    admin: "text-[#FF0033]",
  };

  const roleBadgeColors: Record<string, string> = {
    user: "bg-[#00D4FF]/10 text-[#00D4FF] border-[#00D4FF]/20",
    trainer: "bg-[#00FF88]/10 text-[#00FF88] border-[#00FF88]/20",
    admin: "bg-[#FF0033]/10 text-[#FF0033] border-[#FF0033]/20",
  };

  const initials = userName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <>
      {/* Desktop Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: collapsed ? 80 : 260 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="hidden md:flex flex-col fixed left-0 top-0 h-screen bg-[#0A0A0A] border-r border-white/10 z-50"
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-5 h-16 border-b border-white/10">
          <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-[#FF0033] to-[#FF0033]/60 shrink-0">
            <Dumbbell className="w-5 h-5 text-white" />
          </div>
          <AnimatePresence>
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <h1 className="text-lg font-bold tracking-tight whitespace-nowrap">
                  <span className="text-white">PRO</span>{" "}
                  <span className="text-[#FF0033]">FITNESS</span>
                </h1>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto scrollbar-thin scrollbar-thumb-white/10">
          {links.map((link) => {
            const isActive =
              pathname === link.href ||
              (link.href !== "/dashboard" &&
                link.href !== "/trainer" &&
                link.href !== "/admin" &&
                pathname.startsWith(link.href));

            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group relative",
                  isActive
                    ? "bg-white/10 text-white"
                    : "text-white/50 hover:text-white/80 hover:bg-white/5"
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="sidebar-active"
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-[#FF0033] rounded-r-full"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span
                  className={cn(
                    "shrink-0 w-5 h-5 transition-colors",
                    isActive ? roleColors[userRole] : "text-white/40 group-hover:text-white/60"
                  )}
                >
                  {link.icon}
                </span>
                <AnimatePresence>
                  {!collapsed && (
                    <motion.span
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: "auto" }}
                      exit={{ opacity: 0, width: 0 }}
                      className="whitespace-nowrap overflow-hidden"
                    >
                      {link.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>
            );
          })}
        </nav>

        {/* User Section */}
        <div className="p-3 border-t border-white/10">
          <div
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-xl",
              collapsed ? "justify-center" : ""
            )}
          >
            {userAvatar ? (
              <img
                src={userAvatar}
                alt={userName}
                className="w-9 h-9 rounded-full object-cover ring-2 ring-white/10 shrink-0"
              />
            ) : (
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#FF0033]/80 to-[#FF0033]/40 flex items-center justify-center text-xs font-bold text-white shrink-0">
                {initials}
              </div>
            )}
            <AnimatePresence>
              {!collapsed && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex-1 min-w-0"
                >
                  <p className="text-sm font-medium text-white truncate">{userName}</p>
                  <span
                    className={cn(
                      "inline-block text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full border",
                      roleBadgeColors[userRole]
                    )}
                  >
                    {userRole}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Logout */}
          <button
            className={cn(
              "flex items-center gap-3 w-full px-3 py-2 rounded-xl text-sm text-white/40 hover:text-red-400 hover:bg-red-500/10 transition-colors mt-1",
              collapsed ? "justify-center" : ""
            )}
          >
            <LogOut className="w-4 h-4 shrink-0" />
            <AnimatePresence>
              {!collapsed && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="whitespace-nowrap"
                >
                  Logout
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>

        {/* Collapse Toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-20 w-6 h-6 rounded-full bg-[#0A0A0A] border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-white/20 transition-colors z-10"
        >
          {collapsed ? (
            <ChevronRight className="w-3 h-3" />
          ) : (
            <ChevronLeft className="w-3 h-3" />
          )}
        </button>
      </motion.aside>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-[#0A0A0A]/95 backdrop-blur-xl border-t border-white/10 z-50 px-2 py-2">
        <div className="flex items-center justify-around">
          {links.slice(0, 5).map((link) => {
            const isActive =
              pathname === link.href ||
              (link.href !== "/dashboard" &&
                link.href !== "/trainer" &&
                link.href !== "/admin" &&
                pathname.startsWith(link.href));

            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl text-[10px] font-medium transition-colors",
                  isActive ? "text-[#FF0033]" : "text-white/40"
                )}
              >
                <span className="w-5 h-5">{link.icon}</span>
                <span className="truncate max-w-[56px]">{link.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
