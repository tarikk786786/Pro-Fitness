'use client';
import { ReactNode } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0A0A0A] flex selection:bg-[#FFD600]/30 selection:text-[#FFD600]">
      <AdminSidebar />
      <main className="flex-1 relative overflow-y-auto overflow-x-hidden">
        {/* Subtle background glow effects for luxury aesthetic */}
        <div className="fixed top-0 left-1/4 w-full h-[500px] bg-[#FFD600]/5 rounded-full blur-[150px] pointer-events-none -z-10" />
        <div className="fixed bottom-0 right-0 w-3/4 h-[500px] bg-[#00D4FF]/5 rounded-full blur-[150px] pointer-events-none -z-10" />

        <div className="p-6 md:p-10 lg:p-16 max-w-7xl mx-auto min-h-full">
          {children}
        </div>
      </main>
    </div>
  );
}
