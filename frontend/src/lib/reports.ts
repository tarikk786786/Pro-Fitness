// Imports are now dynamic inside functions for SSR safety and bundle splitting
export interface ReportOptions {
  toolName: string;
  data?: any;
  summary?: string;
  columns?: string[];
}

const BRAND_DETAILS = {
  name: "PRO FITNESS ELITE",
  address: "Balasore, Odisha – 756001",
  phone: "+91 91144 11026",
  email: "profitnessindia@gmail.com",
};

export const generatePDFReport = async (options: ReportOptions) => {
  const { jsPDF } = await import("jspdf");
  const { default: autoTable } = await import("jspdf-autotable");
  const doc = new jsPDF();
  
  const addHeader = () => {
    doc.setFontSize(26);
    doc.setTextColor(255, 215, 0); // PRO FITNESS Yellow
    doc.setFont("helvetica", "bold");
    doc.text(BRAND_DETAILS.name, 14, 20);
    
    doc.setFontSize(10);
    doc.setTextColor(120, 120, 120);
    doc.setFont("helvetica", "normal");
    doc.text(`${BRAND_DETAILS.address} | ${BRAND_DETAILS.phone} | ${BRAND_DETAILS.email}`, 14, 28);
    
    doc.setDrawColor(200, 200, 200);
    doc.line(14, 32, 196, 32);
  };

  const checkPageBreak = (startY: number, requiredSpace: number) => {
    if (startY + requiredSpace > 280) {
      doc.addPage();
      addHeader();
      return 45;
    }
    return startY;
  };

  addHeader();

  doc.setFontSize(18);
  doc.setTextColor(0, 0, 0);
  doc.setFont("helvetica", "bold");
  doc.text(`ELITE AI REPORT: ${options.toolName.toUpperCase()}`, 14, 45);
  doc.setFont("helvetica", "normal");

  let startY = 55;

  if (options.data) {
    const { userProfile, expertTrainer, status, message, healthAnalysis, workoutPlan, dietPlan, coachRecommendations, trainerNotes, professionalGuidance, workoutFocusAreas, recoveryRecommendations, timeline, roadmap, predictions, specialConditions, safety } = options.data;

    if (userProfile) {
      startY = checkPageBreak(startY, 40);
      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.text("1. User Profile & Objective", 14, startY);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      startY += 8;
      
      const pData = { ...userProfile, "Assigned Expert": expertTrainer };
      const profileData = Object.keys(pData).map(key => [key.toUpperCase(), pData[key]]);
      autoTable(doc, {
        startY: startY,
        head: [['Attribute', 'Value']],
        body: profileData,
        theme: 'grid',
        headStyles: { fillColor: [10, 10, 10], textColor: [255, 215, 0], fontStyle: 'bold' },
        styles: { fontSize: 9 },
        alternateRowStyles: { fillColor: [245, 245, 245] }
      });
      startY = (doc as any).lastAutoTable.finalY + 15;
    }

    if (message) {
      startY = checkPageBreak(startY, 40);
      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.text("2. Goal Assessment & AI Summary", 14, startY);
      startY += 8;
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.text(`Status: ${status}`, 14, startY);
      startY += 6;
      const splitSummary = doc.splitTextToSize(message, 180);
      doc.text(splitSummary, 14, startY);
      startY += (splitSummary.length * 5) + 10;
    }

    if (healthAnalysis) {
       startY = checkPageBreak(startY, 60);
       doc.setFontSize(12);
       doc.setFont("helvetica", "bold");
       doc.text("3. Deep Health & Body Analysis", 14, startY);
       
       const healthData = Object.keys(healthAnalysis).map(key => [key.toUpperCase(), healthAnalysis[key]]);
       
       autoTable(doc, {
         startY: startY + 5,
         head: [['Metric', 'Value']],
         body: healthData,
         theme: 'grid',
         headStyles: { fillColor: [10, 10, 10], textColor: [255, 215, 0], fontStyle: 'bold' },
         styles: { fontSize: 10 },
         alternateRowStyles: { fillColor: [245, 245, 245] }
       });
       startY = (doc as any).lastAutoTable.finalY + 15;
    }

    if (dietPlan && dietPlan.macros) {
       startY = checkPageBreak(startY, 50);
       doc.setFontSize(12);
       doc.setFont("helvetica", "bold");
       doc.text("4. Calorie Breakdown", 14, startY);
       
       const macroData = [
         ['Total Calories', `${dietPlan.macros.totalCalories} kcal`],
         ['Protein', `${dietPlan.macros.protein}g (${dietPlan.breakdown?.proteinPct || 30}%)`],
         ['Carbohydrates', `${dietPlan.macros.carbs}g (${dietPlan.breakdown?.carbsPct || 40}%)`],
         ['Fats', `${dietPlan.macros.fat}g (${dietPlan.breakdown?.fatPct || 30}%)`]
       ];
       
       autoTable(doc, {
         startY: startY + 5,
         head: [['Macronutrient', 'Target']],
         body: macroData,
         theme: 'grid',
         headStyles: { fillColor: [10, 10, 10], textColor: [255, 215, 0], fontStyle: 'bold' },
         styles: { fontSize: 10 },
         alternateRowStyles: { fillColor: [245, 245, 245] }
       });
       startY = (doc as any).lastAutoTable.finalY + 15;
    }

    if (dietPlan && dietPlan.meals) {
      startY = checkPageBreak(startY, 80);
      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.text("5. Nutrition Plan", 14, startY);
      
      const mealRows = dietPlan.meals.map((m: any) => [m.time, m.meal]);
      
      autoTable(doc, {
        startY: startY + 5,
        head: [['Time', 'Meal Protocol (Indian Examples)']],
        body: mealRows,
        theme: 'grid',
        headStyles: { fillColor: [10, 10, 10], textColor: [255, 215, 0], fontStyle: 'bold' },
        styles: { fontSize: 9 },
        alternateRowStyles: { fillColor: [245, 245, 245] }
      });
      startY = (doc as any).lastAutoTable.finalY + 15;
    }

    if (workoutPlan && workoutPlan.length > 0) {
      startY = checkPageBreak(startY, 100);
      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.text("6. Workout Plan", 14, startY);
      
      const workoutRows: any[] = [];
      workoutPlan.forEach((day: any) => {
        day.exercises.forEach((ex: any, idx: number) => {
           if (idx === 0) {
             workoutRows.push([day.day, day.type, ex.name, ex.sets, ex.reps, ex.tempo || "-", ex.rest || "-"]);
           } else {
             workoutRows.push(["", "", ex.name, ex.sets, ex.reps, ex.tempo || "-", ex.rest || "-"]);
           }
        });
      });

      autoTable(doc, {
        startY: startY + 5,
        head: [['Day', 'Focus', 'Exercise', 'Sets', 'Reps', 'Tempo', 'Rest']],
        body: workoutRows,
        theme: 'grid',
        headStyles: { fillColor: [10, 10, 10], textColor: [255, 215, 0], fontStyle: 'bold' },
        styles: { fontSize: 8 },
        alternateRowStyles: { fillColor: [245, 245, 245] }
      });
      startY = (doc as any).lastAutoTable.finalY + 15;
    }

    if (workoutFocusAreas) {
       startY = checkPageBreak(startY, 30);
       doc.setFontSize(12);
       doc.setFont("helvetica", "bold");
       doc.text("7. Workout Focus Areas", 14, startY);
       doc.setFont("helvetica", "normal");
       doc.setFontSize(10);
       startY += 8;
       doc.text(workoutFocusAreas.join(", "), 14, startY);
       startY += 12;
    }

    if (roadmap) {
       startY = checkPageBreak(startY, 60);
       doc.setFontSize(12);
       doc.setFont("helvetica", "bold");
       doc.text("8. Transformation Roadmap (30/60/90 Days)", 14, startY);
       
       const roadRows = roadmap.map((t: any) => [t.milestone, t.focus]);
       autoTable(doc, {
         startY: startY + 5,
         head: [['Milestone', 'Expected Progress']],
         body: roadRows,
         theme: 'grid',
         headStyles: { fillColor: [10, 10, 10], textColor: [255, 215, 0], fontStyle: 'bold' },
         styles: { fontSize: 9 },
         alternateRowStyles: { fillColor: [245, 245, 245] }
       });
       startY = (doc as any).lastAutoTable.finalY + 15;
    }

    if (predictions && predictions.length > 0) {
       startY = checkPageBreak(startY, 80);
       doc.setFontSize(12);
       doc.setFont("helvetica", "bold");
       doc.text("9. Predictive Progress Trajectory", 14, startY);
       
       const predRows = predictions.map((p: any) => [p.week, p.weight, p.bodyFat, p.performanceScore.toFixed(1)]);
       autoTable(doc, {
         startY: startY + 5,
         head: [['Week', 'Weight (Est)', 'Body Fat % (Est)', 'Performance Score']],
         body: predRows,
         theme: 'grid',
         headStyles: { fillColor: [10, 10, 10], textColor: [255, 215, 0], fontStyle: 'bold' },
         styles: { fontSize: 9 },
         alternateRowStyles: { fillColor: [245, 245, 245] }
       });
       startY = (doc as any).lastAutoTable.finalY + 15;
    }

    if (coachRecommendations) {
       startY = checkPageBreak(startY, 50);
       doc.setFontSize(12);
       doc.setFont("helvetica", "bold");
       doc.text("10. Coach Recommendations", 14, startY);
       doc.setFont("helvetica", "normal");
       doc.setFontSize(10);
       startY += 8;
       coachRecommendations.forEach((rec: string) => {
         const lines = doc.splitTextToSize(`• ${rec}`, 180);
         doc.text(lines, 14, startY);
         startY += (lines.length * 5) + 2;
       });
       startY += 8;
    }

    if (trainerNotes) {
       startY = checkPageBreak(startY, 30);
       doc.setFontSize(12);
       doc.setFont("helvetica", "bold");
       doc.text("11. Trainer Notes", 14, startY);
       doc.setFont("helvetica", "normal");
       doc.setFontSize(10);
       startY += 8;
       const lines = doc.splitTextToSize(trainerNotes, 180);
       doc.text(lines, 14, startY);
       startY += (lines.length * 5) + 8;
    }

    if (professionalGuidance) {
       startY = checkPageBreak(startY, 30);
       doc.setFontSize(12);
       doc.setFont("helvetica", "bold");
       doc.text("12. Professional Guidance", 14, startY);
       doc.setFont("helvetica", "normal");
       doc.setFontSize(10);
       startY += 8;
       const lines = doc.splitTextToSize(professionalGuidance, 180);
       doc.text(lines, 14, startY);
       startY += (lines.length * 5) + 8;
    }

    if (recoveryRecommendations) {
       startY = checkPageBreak(startY, 40);
       doc.setFontSize(12);
       doc.setFont("helvetica", "bold");
       doc.text("13. Recovery Recommendations", 14, startY);
       doc.setFont("helvetica", "normal");
       doc.setFontSize(10);
       startY += 8;
       recoveryRecommendations.forEach((rec: string) => {
         doc.text(`• ${rec}`, 14, startY);
         startY += 6;
       });
       startY += 8;
    }

    if (specialConditions && specialConditions.note) {
       startY = checkPageBreak(startY, 30);
       doc.setFontSize(12);
       doc.setFont("helvetica", "bold");
       doc.text("14. Special Conditions (Thyroid/PCOS/Diabetes)", 14, startY);
       doc.setFont("helvetica", "normal");
       doc.setFontSize(10);
       startY += 8;
       const lines = doc.splitTextToSize(specialConditions.note, 180);
       doc.text(lines, 14, startY);
       startY += (lines.length * 5) + 8;
    }

    if (safety && safety.tips && safety.rules) {
      startY = checkPageBreak(startY, 60);
      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(220, 38, 38);
      doc.text("15. SAFETY FIRST: Train Smart, Train Safely", 14, startY);
      doc.setTextColor(0, 0, 0);
      startY += 10;
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      safety.rules.forEach((rule: string) => {
        doc.text(`[CRITICAL] ${rule}`, 14, startY);
        startY += 6;
      });
      safety.tips.forEach((tip: string) => {
        doc.text(`[TIP] ${tip}`, 14, startY);
        startY += 6;
      });
    }
  }

  const cleanToolName = options.toolName.replace(/ Calculator| Analyzer| Manager| Tool/gi, '');
  const fileName = `PRO-FITNESS-${cleanToolName.replace(/\s+/g, '-').toUpperCase()}-REPORT.pdf`;
  doc.save(fileName);
};

export const generateExcelReport = async (options: ReportOptions) => {
  const XLSX = await import("xlsx");
  const wb = XLSX.utils.book_new();

  if (options.data) {
     const { userProfile, expertTrainer, healthAnalysis, workoutPlan, dietPlan, predictions, roadmap } = options.data;

     if (userProfile) {
        const ws = XLSX.utils.json_to_sheet([{ ...userProfile, expertTrainer }]);
        XLSX.utils.book_append_sheet(wb, ws, "User Profile");
     }

     if (healthAnalysis) {
        const ws = XLSX.utils.json_to_sheet([healthAnalysis]);
        XLSX.utils.book_append_sheet(wb, ws, "Health Analysis");
     }

     if (workoutPlan) {
        const workoutData: any[] = [];
        workoutPlan.forEach((day: any) => {
           day.exercises.forEach((ex: any) => {
              workoutData.push({ Day: day.day, Focus: day.type, Exercise: ex.name, Sets: ex.sets, Reps: ex.reps, Tempo: ex.tempo, Rest: ex.rest });
           });
        });
        const ws = XLSX.utils.json_to_sheet(workoutData);
        XLSX.utils.book_append_sheet(wb, ws, "Workout Plan");
     }

     if (dietPlan && dietPlan.meals) {
        const ws = XLSX.utils.json_to_sheet(dietPlan.meals);
        XLSX.utils.book_append_sheet(wb, ws, "Nutrition Plan");
     }

     if (roadmap) {
        const ws = XLSX.utils.json_to_sheet(roadmap);
        XLSX.utils.book_append_sheet(wb, ws, "Transformation Roadmap");
     }

     if (predictions) {
        const ws = XLSX.utils.json_to_sheet(predictions);
        XLSX.utils.book_append_sheet(wb, ws, "12-Week Predictions");
     }
  }
  
  const cleanToolName = options.toolName.replace(/ Calculator| Analyzer| Manager| Tool/gi, '');
  const fileName = `PRO-FITNESS-${cleanToolName.replace(/\s+/g, '-').toUpperCase()}-REPORT.xlsx`;
  XLSX.writeFile(wb, fileName);
};

export const shareWhatsApp = (options: { text: string }) => {
  const url = `https://wa.me/?text=${encodeURIComponent(options.text)}`;
  window.open(url, "_blank");
};

export const shareEmail = (options: { subject: string, body: string }) => {
  const url = `mailto:?subject=${encodeURIComponent(options.subject)}&body=${encodeURIComponent(options.body)}`;
  window.location.href = url;
};
