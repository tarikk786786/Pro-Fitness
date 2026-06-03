"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Activity, Users, Calculator, ActivitySquare, HeartPulse, ShieldCheck, 
  Dumbbell, Apple, LogOut, Menu, X, ChevronRight, Bell
} from "lucide-react";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login");
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return <div className="h-screen flex items-center justify-center bg-black text-[#FF0033]">Loading...</div>;
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
    <div className="flex h-screen bg-black text-white overflow-hidden">
      
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/80 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={cn(
          "fixed lg:static inset-y-0 left-0 z-50 w-64 bg-[#0A0A0A] border-r border-white/10 transform transition-transform duration-300 flex flex-col",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="p-6 flex items-center justify-between border-b border-white/5">
          <Link href="/" className="flex items-center gap-2 group">
            <Dumbbell className="w-8 h-8 text-[#FF0033] group-hover:animate-pulse" />
            <span className="text-xl font-black tracking-wider">
              PRO<span className="text-[#FF0033]">FITNESS</span>
            </span>
          </Link>
          <button className="lg:hidden text-gray-400 hover:text-white" onClick={() => setIsSidebarOpen(false)}>
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-6 px-4 space-y-2 no-scrollbar">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm",
                pathname === link.href 
                  ? "bg-[#FF0033] text-white shadow-[0_0_15px_rgba(255,0,51,0.3)]" 
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              )}
            >
              <link.icon className="w-5 h-5" />
              {link.name}
            </Link>
          ))}
        </div>

        <div className="p-4 border-t border-white/5">
          <button 
            onClick={logout}
            className="flex items-center gap-3 w-full px-4 py-3 text-gray-400 hover:text-[#FF0033] hover:bg-white/5 rounded-xl transition-all font-medium text-sm"
          >
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="h-20 bg-[#0A0A0A]/50 backdrop-blur-md border-b border-white/5 flex items-center justify-between px-6 z-10 flex-shrink-0">
          <div className="flex items-center gap-4">
            <button className="lg:hidden text-gray-400 hover:text-white" onClick={() => setIsSidebarOpen(true)}>
              <Menu className="w-6 h-6" />
            </button>
            <h2 className="text-xl font-bold capitalize hidden sm:block">
              {pathname.split('/').pop()?.replace('-', ' ') || 'Dashboard'}
            </h2>
          </div>
          
          <div className="flex items-center gap-6">
            <button className="relative text-gray-400 hover:text-white transition-colors">
              <Bell className="w-6 h-6" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-[#FF0033] rounded-full ring-2 ring-[#0A0A0A]" />
            </button>
            
            <div className="flex items-center gap-3 cursor-pointer group">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#FF0033] to-[#00D4FF] flex items-center justify-center text-white font-bold">
                {user.name.substring(0, 2).toUpperCase()}
              </div>
              <div className="hidden md:block">
                <p className="text-sm font-bold group-hover:text-[#00D4FF] transition-colors">{user.name}</p>
                <p className="text-xs text-gray-500 capitalize">{user.role}</p>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-auto p-6 md:p-8 bg-black">
          {children}
        </div>
      </main>
    </div>
  );
}
