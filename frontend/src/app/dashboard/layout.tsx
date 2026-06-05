"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import gsap from "gsap";
import { 
  Activity, Users, Calculator, ActivitySquare, HeartPulse, ShieldCheck, 
  Dumbbell, Apple, LogOut, Menu, X, ChevronRight, Bell
} from "lucide-react";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout, isLoading } = useAuth();
  const sidebarRef = useRef(null);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login");
    }
  }, [user, isLoading, router]);

  useEffect(() => {
    if (sidebarRef.current) {
      gsap.fromTo(
        sidebarRef.current,
        { x: -50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
      );
    }
  }, []);

  if (isLoading) {
    return <div className="h-screen flex items-center justify-center bg-[#0A0A0A] text-[#FFD600]">Loading...</div>;
  }

  if (!user) {
    return null; // Will redirect
  }
  
  const links = [
    { name: "Overview", href: "/dashboard", icon: Activity },
    { name: "My Workouts", href: "/dashboard/workouts", icon: Dumbbell },
    { name: "My Diet", href: "/dashboard/diets", icon: Apple },
    { name: "Progress", href: "/dashboard/progress", icon: ActivitySquare },
    { name: "AI Coach", href: "/dashboard/ai-coach", icon: ShieldCheck },
    { name: "Calculators", href: "/calculators", icon: Calculator },
    { name: "Membership", href: "/dashboard/membership", icon: HeartPulse },
    { name: "Profile", href: "/dashboard/profile", icon: Users },
  ];

  return (
    <div className="flex h-screen bg-[#0A0A0A] text-white overflow-hidden">
      
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/80 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        ref={sidebarRef}
        className={cn(
          "fixed lg:static inset-y-0 left-0 z-50 w-72 bg-white/5 backdrop-blur-2xl border-r border-white/10 transform transition-transform duration-500 ease-in-out flex flex-col shadow-[4px_0_24px_rgba(0,0,0,0.5)]",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="p-8 flex items-center justify-between border-b border-white/10">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="p-2 bg-[#FFD600]/10 rounded-xl group-hover:bg-[#FFD600]/20 transition-colors">
              <Dumbbell className="w-6 h-6 text-[#FFD600] group-hover:scale-110 transition-transform duration-300" />
            </div>
            <span className="text-2xl font-black tracking-tight text-white">
              PRO<span className="text-[#FFD600]">FITNESS</span>
            </span>
          </Link>
          <button className="lg:hidden text-gray-400 hover:text-white transition-colors" onClick={() => setIsSidebarOpen(false)}>
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-8 px-4 space-y-2 no-scrollbar">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 font-semibold text-sm relative group",
                  isActive 
                    ? "bg-[#FFD600] text-black shadow-[0_0_20px_rgba(255,214,0,0.4)]" 
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                )}
              >
                {isActive && (
                  <motion.div 
                    layoutId="activeTab"
                    className="absolute inset-0 bg-[#FFD600] rounded-2xl -z-10"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <link.icon className={cn("w-5 h-5", isActive ? "text-black" : "text-gray-400 group-hover:text-[#FFD600] transition-colors")} />
                {link.name}
              </Link>
            )
          })}
        </div>

        <div className="p-6 border-t border-white/10">
          <button 
            onClick={logout}
            className="flex items-center gap-3 w-full px-4 py-3.5 text-gray-400 hover:text-[#FFD600] hover:bg-white/5 rounded-2xl transition-all duration-300 font-semibold text-sm group"
          >
            <LogOut className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        
        {/* Subtle Ambient Background Gradient */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#FFD600]/5 rounded-full blur-[120px] pointer-events-none -z-10" />

        {/* Header */}
        <header className="h-24 bg-transparent flex items-center justify-between px-8 z-10 flex-shrink-0">
          <div className="flex items-center gap-4">
            <button className="lg:hidden text-gray-400 hover:text-white bg-white/5 p-2 rounded-xl transition-colors" onClick={() => setIsSidebarOpen(true)}>
              <Menu className="w-6 h-6" />
            </button>
            <h2 className="text-3xl font-black capitalize hidden sm:block tracking-tight">
              {pathname === '/dashboard' ? 'Overview' : pathname.split('/').pop()?.replace('-', ' ')}
            </h2>
          </div>
          
          <div className="flex items-center gap-6">
            <button className="relative text-gray-400 hover:text-white transition-colors bg-white/5 p-3 rounded-full hover:bg-white/10">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-[#FFD600] rounded-full shadow-[0_0_8px_rgba(255,214,0,0.8)]" />
            </button>
            
            <div className="flex items-center gap-4 cursor-pointer group bg-white/5 pr-4 pl-1.5 py-1.5 rounded-full border border-white/10 hover:bg-white/10 transition-colors">
              <div className="w-10 h-10 rounded-full bg-[#FFD600] flex items-center justify-center text-black font-black text-sm shadow-[0_0_12px_rgba(255,214,0,0.5)]">
                {user.name.substring(0, 2).toUpperCase()}
              </div>
              <div className="hidden md:block">
                <p className="text-sm font-bold group-hover:text-[#FFD600] transition-colors">{user.name}</p>
                <p className="text-xs text-gray-400 capitalize font-medium">{user.role}</p>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-auto p-4 md:p-8 relative z-0">
          {children}
        </div>
      </main>
    </div>
  );
}
