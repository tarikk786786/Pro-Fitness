// Standard angle calculation between 3 joints (e.g., shoulder, elbow, wrist)
export function calculateAngle(a: {x: number, y: number}, b: {x: number, y: number}, c: {x: number, y: number}): number {
  const radians = Math.atan2(c.y - b.y, c.x - b.x) - Math.atan2(a.y - b.y, a.x - b.x);
  let angle = Math.abs((radians * 180.0) / Math.PI);
  
  if (angle > 180.0) {
    angle = 360 - angle;
  }
  return angle;
}

// Logic for analyzing a Bicep Curl
// Returns { stage: 'down' | 'up', rep: boolean, score: number }
export function analyzeBicepCurl(shoulder: any, elbow: any, wrist: any, currentStage: string): { stage: string, rep: boolean, score: number } {
  if (!shoulder || !elbow || !wrist) return { stage: currentStage, rep: false, score: 0 };
  
  const angle = calculateAngle(shoulder, elbow, wrist);
  let rep = false;
  let newStage = currentStage;
  let score = 100;
  
  if (angle > 160) {
    newStage = 'down';
  }
  if (angle < 30 && currentStage === 'down') {
    newStage = 'up';
    rep = true; // 1 rep completed
  }
  
  // Basic form score (e.g., if they don't fully extend)
  if (currentStage === 'up' && angle > 90 && angle < 140) {
     score = 80; // partial range of motion warning
  }
  
  return { stage: newStage, rep, score };
}

// Logic for analyzing a Squat
export function analyzeSquat(hip: any, knee: any, ankle: any, currentStage: string): { stage: string, rep: boolean, score: number } {
  if (!hip || !knee || !ankle) return { stage: currentStage, rep: false, score: 0 };
  
  const angle = calculateAngle(hip, knee, ankle);
  let rep = false;
  let newStage = currentStage;
  let score = 100;
  
  if (angle > 160) {
    newStage = 'up';
  }
  if (angle < 90 && currentStage === 'up') {
    newStage = 'down';
    rep = true;
  }
  
  // Form check: not deep enough
  if (currentStage === 'down' && angle > 100) {
    score = 70; // "Go deeper!"
  }
  
  return { stage: newStage, rep, score };
}

// Logic for Pushup
export function analyzePushup(shoulder: any, elbow: any, wrist: any, currentStage: string): { stage: string, rep: boolean, score: number } {
  if (!shoulder || !elbow || !wrist) return { stage: currentStage, rep: false, score: 0 };
  
  const angle = calculateAngle(shoulder, elbow, wrist);
  let rep = false;
  let newStage = currentStage;
  let score = 100;
  
  if (angle > 160) {
    newStage = 'up';
  }
  if (angle < 90 && currentStage === 'up') {
    newStage = 'down';
    rep = true;
  }
  
  return { stage: newStage, rep, score };
}
