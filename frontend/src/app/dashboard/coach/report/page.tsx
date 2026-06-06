'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Share2, Award, Calendar, Activity, Zap, CheckCircle, ChevronLeft, Timer } from 'lucide-react';
import Link from 'next/link';
import dynamic from 'next/dynamic';

const ReportBarChart = dynamic(() => import('@/components/charts/ReportBarChart'), {
  ssr: false,
  loading: () => <div className="w-full h-full animate-pulse bg-white/5 rounded-xl"></div>
});

const mockRepData = [
  { set: 'Set 1', reps: 15, score: 95 },
  { set: 'Set 2', reps: 12, score: 90 },
  { set: 'Set 3', reps: 10, score: 85 },
  { set: 'Set 4', reps: 8, score: 78 }
];

export default function WorkoutReport() {
  const [downloading, setDownloading] = useState(false);

  const handleDownloadPDF = async () => {
    setDownloading(true);
    try {
      // @ts-ignore
      const html2pdf = (await import('html2pdf.js')).default;
      const element = document.getElementById('workout-report-content');
      if (element) {
        const opt = {
          margin: 0.5,
          filename: 'ProFitness-Workout-Report.pdf',
          image: { type: 'jpeg' as const, quality: 0.98 },
          html2canvas: { scale: 2, useCORS: true },
          jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
        };
        await html2pdf().set(opt as any).from(element).save();
      }
    } catch (error) {
      console.error("PDF generation failed:", error);
    } finally {
      setDownloading(false);
    }
  };

  const shareToWhatsApp = () => {
    const text = "I just crushed a workout at PRO FITNESS using the Smart Coach AI! 🔥 Burned 320 kcal with a form score of 92/100.";
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white p-6 md:p-10 font-sans">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header Actions */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link href="/dashboard/coach" className="p-2 hover:bg-white/5 rounded-lg transition-colors border border-white/10">
              <ChevronLeft className="w-6 h-6" />
            </Link>
            <h1 className="text-2xl md:text-3xl font-black uppercase tracking-tight">Session Report</h1>
          </div>
          
          <div className="flex items-center gap-3">
            <button onClick={shareToWhatsApp} className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg font-bold text-sm transition-colors">
              <Share2 className="w-4 h-4 text-[#10B981]" />
              WhatsApp
            </button>
            <button 
              onClick={handleDownloadPDF} 
              disabled={downloading}
              className="flex items-center gap-2 px-4 py-2 bg-[#FFD600] text-black hover:bg-yellow-400 rounded-lg font-bold text-sm transition-colors"
            >
              <Download className={`w-4 h-4 ${downloading ? 'animate-bounce' : ''}`} />
              {downloading ? 'Generating PDF...' : 'Download PDF'}
            </button>
          </div>
        </div>

        {/* Printable Content Container */}
        <div id="workout-report-content" className="space-y-8 bg-[#111111] p-8 rounded-2xl border border-white/5 shadow-2xl">
          
          <div className="text-center pb-8 border-b border-white/10">
            <h2 className="text-4xl font-black text-[#FFD600] tracking-tighter mb-2">PRO FITNESS</h2>
            <p className="text-gray-400 tracking-widest uppercase text-sm">Smart Workout Coach • Analysis Report</p>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Total Reps', value: '45', icon: Activity, color: 'text-[#00D4FF]' },
              { label: 'Calories', value: '320', icon: Zap, color: 'text-[#FF4444]' },
              { label: 'Form Score', value: '92/100', icon: CheckCircle, color: 'text-[#10B981]' },
              { label: 'Duration', value: '45m', icon: Timer, color: 'text-white' },
            ].map((stat, i) => (
              <div key={i} className="bg-black/50 p-6 rounded-xl border border-white/5 text-center">
                <stat.icon className="w-6 h-6 mx-auto mb-3 text-gray-500" />
                <div className={`text-3xl font-black ${stat.color}`}>{stat.value}</div>
                <div className="text-xs text-gray-500 uppercase tracking-wider mt-1">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Detailed Analysis */}
          <div className="grid md:grid-cols-2 gap-8 pt-4">
            {/* Chart */}
            <div className="space-y-4">
              <h3 className="font-bold uppercase tracking-wider text-sm text-gray-400">Rep Consistency & Form</h3>
              <div className="h-64 bg-black/50 rounded-xl p-4 border border-white/5">
                <ReportBarChart data={mockRepData} />
              </div>
            </div>

            {/* Coach Feedback & Gamification */}
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-[#10B981]/10 to-transparent p-6 rounded-xl border border-[#10B981]/20">
                <h3 className="font-bold flex items-center gap-2 mb-3 text-[#10B981]">
                  <CheckCircle className="w-5 h-5" />
                  Coach Feedback
                </h3>
                <p className="text-sm text-gray-300 leading-relaxed">
                  Excellent workout today. Your squat depth improved significantly in Set 3 and 4. Keep maintaining that straight back. You hit the calorie target easily!
                </p>
                <div className="mt-4 pt-4 border-t border-[#10B981]/20 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#10B981] flex items-center justify-center text-black font-black text-xs">SB</div>
                  <span className="text-xs text-gray-400 uppercase tracking-wider">Verified by Subham Behera</span>
                </div>
              </div>

              {/* Gamification Badge */}
              <div className="bg-[#FFD600]/10 p-4 rounded-xl border border-[#FFD600]/20 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#FFD600] flex items-center justify-center">
                  <Award className="w-6 h-6 text-black" />
                </div>
                <div>
                  <h4 className="font-bold text-[#FFD600]">Squat Master Badge Unlocked!</h4>
                  <p className="text-xs text-gray-400">Achieved 90+ form score on 4 consecutive sets.</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
