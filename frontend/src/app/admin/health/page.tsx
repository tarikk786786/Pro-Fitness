"use client";

import React, { useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { 
  Activity, 
  Watch, 
  AlertTriangle, 
  Moon, 
  Download, 
  Send, 
  Heart, 
  ArrowUpRight, 
  ArrowDownRight,
  ShieldAlert
} from 'lucide-react';
import Image from 'next/image';
import dynamic from 'next/dynamic';

const AdminHealthChart = dynamic(() => import('@/components/admin/AdminHealthChart').then(mod => mod.AdminHealthChart), { ssr: false, loading: () => <div className="w-full h-full animate-pulse bg-white/5 rounded-xl"></div> });

// --- Mock Data ---

const kpis = [
  { label: 'Connected Wearables', value: '342', icon: Watch, trend: '+12% this month', positive: true },
  { label: 'Avg Health Score', value: '76', icon: Heart, trend: '+2% this week', positive: true },
  { label: 'High Risk Members', value: '12', icon: AlertTriangle, trend: '-3 since yesterday', positive: true },
  { label: 'Avg Sleep Quality', value: '82%', icon: Moon, trend: '+5% this month', positive: true },
];

const recoveryData = [
  { day: 'Mon', recovery: 72, stress: 45 },
  { day: 'Tue', recovery: 75, stress: 42 },
  { day: 'Wed', recovery: 68, stress: 55 },
  { day: 'Thu', recovery: 65, stress: 60 },
  { day: 'Fri', recovery: 70, stress: 50 },
  { day: 'Sat', recovery: 82, stress: 35 },
  { day: 'Sun', recovery: 85, stress: 30 },
];

const membersAtRisk = [
  { id: '1', name: 'Alex Johnson', issue: 'High Overtraining Risk', recoveryScore: 42, stressLevel: 'High', lastActive: '2 hours ago', avatar: 'https://i.pravatar.cc/150?u=1' },
  { id: '2', name: 'Sarah Miller', issue: 'Poor Sleep Quality', recoveryScore: 55, stressLevel: 'Medium', lastActive: '1 day ago', avatar: 'https://i.pravatar.cc/150?u=2' },
  { id: '3', name: 'Mike Davis', issue: 'Abnormal Heart Rate', recoveryScore: 60, stressLevel: 'High', lastActive: '4 hours ago', avatar: 'https://i.pravatar.cc/150?u=3' },
  { id: '4', name: 'Emily Chen', issue: 'High Overtraining Risk', recoveryScore: 38, stressLevel: 'Very High', lastActive: '5 mins ago', avatar: 'https://i.pravatar.cc/150?u=4' },
  { id: '5', name: 'David Wilson', issue: 'Consistent Low Recovery', recoveryScore: 45, stressLevel: 'Medium', lastActive: '3 days ago', avatar: 'https://i.pravatar.cc/150?u=5' },
];

// --- Animation Variants ---

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: 'spring' as const, stiffness: 300, damping: 24 }
  }
};

export default function AdminHealthDashboard() {
  const [downloading, setDownloading] = useState(false);

  const handleDownload = async () => {
    setDownloading(true);
    try {
      // @ts-ignore
      const html2pdf = (await import('html2pdf.js')).default;
      const element = document.getElementById('health-dashboard-content');
      if (element) {
        const opt = {
          margin: 0.5,
          filename: 'ProFitness-Health-Report.pdf',
          image: { type: 'jpeg' as const, quality: 0.98 },
          html2canvas: { scale: 2, useCORS: true, logging: true },
          jsPDF: { unit: 'in', format: 'a4', orientation: 'landscape' }
        };
        await html2pdf().set(opt as any).from(element).save();
      }
    } catch (error) {
      console.error("PDF generation failed:", error);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white p-6 md:p-10 font-sans selection:bg-[#FFD600] selection:text-black">
      <motion.div 
        id="health-dashboard-content"
        className="max-w-7xl mx-auto space-y-8"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-2">
              Health Analytics
            </h1>
            <p className="text-white/60">
              Aggregate member health trends and recovery monitoring.
            </p>
          </div>
          <button 
            onClick={handleDownload}
            disabled={downloading}
            className="flex items-center gap-2 bg-[#FFD600] text-black px-6 py-3 rounded-full font-semibold hover:bg-[#FFE55C] transition-all disabled:opacity-70 disabled:cursor-not-allowed"
          >
            <Download className={`w-5 h-5 ${downloading ? 'animate-bounce' : ''}`} />
            {downloading ? 'Downloading...' : 'Download Report'}
          </button>
        </motion.div>

        {/* KPI Grid */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {kpis.map((kpi, idx) => (
            <div key={idx} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <kpi.icon className="w-16 h-16 text-[#FFD600]" />
              </div>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-[#FFD600]/10 rounded-xl text-[#FFD600]">
                  <kpi.icon className="w-6 h-6" />
                </div>
                <h3 className="font-medium text-white/80">{kpi.label}</h3>
              </div>
              <div className="text-4xl font-bold mb-2">{kpi.value}</div>
              <div className={`flex items-center gap-1 text-sm ${kpi.positive ? 'text-green-400' : 'text-red-400'}`}>
                {kpi.positive ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                <span>{kpi.trend}</span>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Chart Section */}
        <motion.div variants={itemVariants} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Activity className="w-5 h-5 text-[#FFD600]" />
                Gym-wide Recovery Trends
              </h2>
              <p className="text-white/50 text-sm mt-1">Average recovery vs stress levels over the last 7 days</p>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#FFD600]" />
                <span className="text-white/80">Recovery</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <span className="text-white/80">Stress</span>
              </div>
            </div>
          </div>
          
          <div className="h-[300px] w-full">
            <AdminHealthChart recoveryData={recoveryData} />
          </div>
        </motion.div>

        {/* Table Section */}
        <motion.div variants={itemVariants} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden">
          <div className="p-6 md:p-8 border-b border-white/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="text-xl font-bold flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-red-500" />
                Members Needing Attention
              </h2>
              <p className="text-white/50 text-sm mt-1">Users with low recovery scores or high stress levels</p>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-white/5 text-white/50 text-xs uppercase tracking-wider">
                  <th className="p-4 font-medium pl-8">Member</th>
                  <th className="p-4 font-medium">Issue</th>
                  <th className="p-4 font-medium">Recovery Score</th>
                  <th className="p-4 font-medium">Stress Level</th>
                  <th className="p-4 font-medium text-right pr-8">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {membersAtRisk.map((member) => (
                  <tr key={member.id} className="hover:bg-white/5 transition-colors">
                    <td className="p-4 pl-8">
                      <div className="flex items-center gap-3">
                        <Image 
                          src={member.avatar} 
                          alt={member.name} 
                          width={40}
                          height={40}
                          className="w-10 h-10 rounded-full border border-white/20 object-cover"
                          loading="lazy"
                        />
                        <div>
                          <div className="font-medium text-white">{member.name}</div>
                          <div className="text-xs text-white/50">Active: {member.lastActive}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-500/10 text-red-400 border border-red-500/20">
                        {member.issue}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <div className="w-full max-w-[100px] h-2 bg-white/10 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${member.recoveryScore < 50 ? 'bg-red-500' : 'bg-[#FFD600]'}`} 
                            style={{ width: `${member.recoveryScore}%` }}
                          />
                        </div>
                        <span className="text-sm font-bold">{member.recoveryScore}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`text-sm font-medium ${member.stressLevel === 'Very High' ? 'text-red-500' : member.stressLevel === 'High' ? 'text-orange-400' : 'text-yellow-400'}`}>
                        {member.stressLevel}
                      </span>
                    </td>
                    <td className="p-4 pr-8 text-right">
                      <button className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-[#FFD600] hover:text-black text-white px-4 py-2 rounded-lg text-sm font-medium transition-all group whitespace-nowrap">
                        <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        Send Plan
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
