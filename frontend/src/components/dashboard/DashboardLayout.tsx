"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Bell,
  ChevronDown,
  Settings,
  User,
  LogOut,
  X,
} from "lucide-react";
import DashboardSidebar, { SidebarLink } from "./DashboardSidebar";
import { cn } from "@/lib/utils";

interface DashboardLayoutProps {
  children: React.ReactNode;
  sidebarLinks: SidebarLink[];
  userRole: "user" | "trainer" | "admin";
  userName?: string;
  userAvatar?: string;
  pageTitle?: string;
}

const mockNotifications = [
  { id: "1", title: "Workout Complete!", message: "Great job on today's session", time: "5m ago", read: false },
  { id: "2", title: "New Diet Plan", message: "Your AI diet plan is ready", time: "1h ago", read: false },
  { id: "3", title: "Achievement Unlocked", message: "7-day streak! Keep going", time: "3h ago", read: true },
  { id: "4", title: "Membership Renewal", message: "Your Pro plan renews in 5 days", time: "1d ago", read: true },
];

export default function DashboardLayout({
  children,
  sidebarLinks,
  userRole,
  userName = "User",
  userAvatar,
  pageTitle,
}: DashboardLayoutProps) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const unreadCount = mockNotifications.filter((n) => !n.read).length;

  const initials = userName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="min-h-screen bg-black text-white">
      <DashboardSidebar
        links={sidebarLinks}
        userRole={userRole}
        userName={userName}
        userAvatar={userAvatar}
      />

      {/* Main Content Area */}
      <div className="md:ml-[260px] transition-all duration-300">
        {/* Top Header Bar */}
        <header className="sticky top-0 z-40 h-16 bg-black/80 backdrop-blur-xl border-b border-white/5">
          <div className="flex items-center justify-between h-full px-4 md:px-8">
            {/* Left: Page title / Search */}
            <div className="flex items-center gap-4 flex-1">
              {pageTitle && (
                <h2 className="text-lg font-semibold text-white hidden md:block">{pageTitle}</h2>
              )}

              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <AnimatePresence>
                  {searchOpen ? (
                    <motion.div
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: "100%" }}
                      exit={{ opacity: 0, width: 0 }}
                      className="flex items-center"
                    >
                      <Search className="absolute left-3 w-4 h-4 text-white/40" />
                      <input
                        type="text"
                        placeholder="Search workouts, diets, clients..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-10 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#FF0033]/50 focus:ring-1 focus:ring-[#FF0033]/25 transition-all"
                        autoFocus
                      />
                      <button
                        onClick={() => {
                          setSearchOpen(false);
                          setSearchQuery("");
                        }}
                        className="absolute right-3 text-white/40 hover:text-white"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </motion.div>
                  ) : (
                    <button
                      onClick={() => setSearchOpen(true)}
                      className="flex items-center gap-2 px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-white/40 hover:text-white/60 hover:border-white/20 transition-all"
                    >
                      <Search className="w-4 h-4" />
                      <span className="hidden sm:inline">Search...</span>
                      <kbd className="hidden lg:inline text-[10px] px-1.5 py-0.5 bg-white/5 rounded border border-white/10 text-white/30 ml-4">
                        ⌘K
                      </kbd>
                    </button>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Right: Notifications + Profile */}
            <div className="flex items-center gap-2">
              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={() => {
                    setNotifOpen(!notifOpen);
                    setProfileOpen(false);
                  }}
                  className="relative p-2.5 rounded-xl hover:bg-white/5 transition-colors"
                >
                  <Bell className="w-5 h-5 text-white/60" />
                  {unreadCount > 0 && (
                    <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-[#FF0033] rounded-full text-[10px] font-bold flex items-center justify-center text-white">
                      {unreadCount}
                    </span>
                  )}
                </button>

                <AnimatePresence>
                  {notifOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-2 w-80 bg-[#111111] border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
                    >
                      <div className="px-4 py-3 border-b border-white/10">
                        <h3 className="text-sm font-semibold text-white">Notifications</h3>
                      </div>
                      <div className="max-h-80 overflow-y-auto">
                        {mockNotifications.map((notif) => (
                          <div
                            key={notif.id}
                            className={cn(
                              "px-4 py-3 border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer",
                              !notif.read && "bg-[#FF0033]/5"
                            )}
                          >
                            <div className="flex items-start gap-3">
                              {!notif.read && (
                                <div className="w-2 h-2 rounded-full bg-[#FF0033] mt-1.5 shrink-0" />
                              )}
                              <div className={cn(!notif.read ? "" : "ml-5")}>
                                <p className="text-sm font-medium text-white">{notif.title}</p>
                                <p className="text-xs text-white/50 mt-0.5">{notif.message}</p>
                                <p className="text-[10px] text-white/30 mt-1">{notif.time}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="px-4 py-2.5 border-t border-white/10">
                        <button className="text-xs text-[#FF0033] hover:text-[#FF0033]/80 font-medium w-full text-center">
                          View All Notifications
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Profile Dropdown */}
              <div className="relative">
                <button
                  onClick={() => {
                    setProfileOpen(!profileOpen);
                    setNotifOpen(false);
                  }}
                  className="flex items-center gap-2 px-2 py-1.5 rounded-xl hover:bg-white/5 transition-colors"
                >
                  {userAvatar ? (
                    <img
                      src={userAvatar}
                      alt={userName}
                      className="w-8 h-8 rounded-full object-cover ring-2 ring-white/10"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#FF0033]/80 to-[#FF0033]/40 flex items-center justify-center text-xs font-bold text-white">
                      {initials}
                    </div>
                  )}
                  <span className="text-sm font-medium text-white/80 hidden sm:block">
                    {userName.split(" ")[0]}
                  </span>
                  <ChevronDown className="w-3 h-3 text-white/40 hidden sm:block" />
                </button>

                <AnimatePresence>
                  {profileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-2 w-56 bg-[#111111] border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
                    >
                      <div className="px-4 py-3 border-b border-white/10">
                        <p className="text-sm font-semibold text-white">{userName}</p>
                        <p className="text-xs text-white/40 capitalize">{userRole} Account</p>
                      </div>
                      <div className="py-1">
                        {[
                          { icon: <User className="w-4 h-4" />, label: "My Profile", href: "#" },
                          { icon: <Settings className="w-4 h-4" />, label: "Settings", href: "#" },
                        ].map((item) => (
                          <a
                            key={item.label}
                            href={item.href}
                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-white/60 hover:text-white hover:bg-white/5 transition-colors"
                          >
                            {item.icon}
                            {item.label}
                          </a>
                        ))}
                        <div className="border-t border-white/10 mt-1 pt-1">
                          <button className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors w-full">
                            <LogOut className="w-4 h-4" />
                            Sign Out
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 md:p-8 pb-24 md:pb-8">
          {children}
        </main>
      </div>

      {/* Click-away overlay for dropdowns */}
      {(notifOpen || profileOpen) && (
        <div
          className="fixed inset-0 z-30"
          onClick={() => {
            setNotifOpen(false);
            setProfileOpen(false);
          }}
        />
      )}
    </div>
  );
}
