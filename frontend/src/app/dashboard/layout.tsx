import Link from "next/link";
import { Dumbbell } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white selection:bg-[#FFD600] selection:text-black">
      {/* Clean Top Nav */}
      <nav className="border-b border-white/10 bg-black/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link 
              href="/" 
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <div className="bg-[#FFD600] p-2 rounded-lg text-black">
                <Dumbbell className="h-5 w-5" />
              </div>
              <span className="text-xl font-bold tracking-tight">
                PRO <span className="text-[#FFD600]">FITNESS</span>
              </span>
            </Link>
            <Link 
              href="/" 
              className="text-sm font-medium text-gray-400 hover:text-[#FFD600] transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}
