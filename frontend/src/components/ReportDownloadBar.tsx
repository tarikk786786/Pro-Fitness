"use client";

import React from "react";
import { Download, FileSpreadsheet, Share2, Mail } from "lucide-react";
import { generatePDFReport, generateExcelReport, shareWhatsApp, shareEmail, ReportOptions } from "@/lib/reports";
import { Button } from "@/components/ui/button";

export function ReportDownloadBar({ reportOptions }: { reportOptions: ReportOptions }) {
  const handleShareWhatsApp = () => {
    shareWhatsApp({
      text: `Check out my PRO FITNESS ${reportOptions.toolName} Report!\n\n${reportOptions.summary || ''}`
    });
  };

  const handleShareEmail = () => {
    shareEmail({
      subject: `PRO FITNESS ${reportOptions.toolName} Report`,
      body: `Here are my results from PRO FITNESS:\n\n${reportOptions.summary || ''}`
    });
  };

  return (
    <div className="flex flex-wrap gap-3 items-center justify-center p-4 bg-zinc-900 rounded-xl border border-zinc-800 shadow-lg mt-8">
      <Button 
        onClick={() => generatePDFReport(reportOptions)} 
        className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold"
      >
        <Download className="mr-2 h-4 w-4" /> Download PDF
      </Button>
      
      <Button 
        onClick={() => generateExcelReport(reportOptions)} 
        variant="outline" 
        className="border-zinc-700 hover:bg-zinc-800 text-white"
      >
        <FileSpreadsheet className="mr-2 h-4 w-4" /> Export Excel
      </Button>
      
      <Button 
        onClick={handleShareWhatsApp}
        variant="outline"
        className="border-zinc-700 hover:bg-zinc-800 text-green-400"
      >
        <Share2 className="mr-2 h-4 w-4" /> WhatsApp
      </Button>
      
      <Button 
        onClick={handleShareEmail}
        variant="outline"
        className="border-zinc-700 hover:bg-zinc-800 text-blue-400"
      >
        <Mail className="mr-2 h-4 w-4" /> Email
      </Button>
    </div>
  );
}
