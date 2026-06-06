'use client';

import { useEffect, useRef, useState } from 'react';
const camera_utils = require('@mediapipe/camera_utils');
const pose_module = require('@mediapipe/pose');
const drawing_utils = require('@mediapipe/drawing_utils');

const Camera = camera_utils.Camera || (typeof window !== 'undefined' ? (window as any).Camera : null);
const Pose = pose_module.Pose || (typeof window !== 'undefined' ? (window as any).Pose : null);
const POSE_CONNECTIONS = pose_module.POSE_CONNECTIONS || (typeof window !== 'undefined' ? (window as any).POSE_CONNECTIONS : null);
const drawConnectors = drawing_utils.drawConnectors || (typeof window !== 'undefined' ? (window as any).drawConnectors : null);
const drawLandmarks = drawing_utils.drawLandmarks || (typeof window !== 'undefined' ? (window as any).drawLandmarks : null);
import { analyzeBicepCurl, analyzeSquat, analyzePushup } from '@/utils/poseTracking';
import { motion } from 'framer-motion';
import { Camera as CameraIcon, Activity, Zap, CheckCircle } from 'lucide-react';

interface LiveCameraProps {
  exercise: 'bicep_curl' | 'squat' | 'pushup';
  onRepUpdate: (reps: number, score: number) => void;
}

export default function LiveCamera({ exercise, onRepUpdate }: LiveCameraProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const [isReady, setIsReady] = useState(false);
  const [reps, setReps] = useState(0);
  const [formScore, setFormScore] = useState(100);
  const [stage, setStage] = useState('down'); // internal state
  const [cameraActive, setCameraActive] = useState(false);

  // Use refs for state accessed inside the Mediapipe callback
  const repsRef = useRef(0);
  const stageRef = useRef('down');
  const scoreRef = useRef(100);

  useEffect(() => {
    if (!cameraActive) return;

    let camera: any = null;
    let pose: any = null;

    const initializeCamera = async () => {
      const videoElement = videoRef.current;
      const canvasElement = canvasRef.current;
      if (!videoElement || !canvasElement) return;

      const canvasCtx = canvasElement.getContext('2d');
      if (!canvasCtx) return;

      pose = new Pose({
        locateFile: (file: string) => `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`,
      });

      pose.setOptions({
        modelComplexity: 1,
        smoothLandmarks: true,
        enableSegmentation: false,
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5,
      });

      pose.onResults((results: any) => {
        setIsReady(true);
        canvasCtx.save();
        canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
        
        // Draw video frame to canvas
        canvasCtx.drawImage(results.image, 0, 0, canvasElement.width, canvasElement.height);

        if (results.poseLandmarks) {
          drawConnectors(canvasCtx, results.poseLandmarks, POSE_CONNECTIONS, { color: '#FFD600', lineWidth: 4 });
          drawLandmarks(canvasCtx, results.poseLandmarks, { color: '#0A0A0A', fillColor: '#FFFFFF', lineWidth: 2, radius: 4 });

          // Exercise tracking logic
          let analysis = { stage: stageRef.current, rep: false, score: 100 };
          
          if (exercise === 'bicep_curl') {
            const shoulder = results.poseLandmarks[11]; // left shoulder
            const elbow = results.poseLandmarks[13]; // left elbow
            const wrist = results.poseLandmarks[15]; // left wrist
            analysis = analyzeBicepCurl(shoulder, elbow, wrist, stageRef.current);
          } else if (exercise === 'squat') {
            const hip = results.poseLandmarks[23]; // left hip
            const knee = results.poseLandmarks[25]; // left knee
            const ankle = results.poseLandmarks[27]; // left ankle
            analysis = analyzeSquat(hip, knee, ankle, stageRef.current);
          } else if (exercise === 'pushup') {
            const shoulder = results.poseLandmarks[11];
            const elbow = results.poseLandmarks[13];
            const wrist = results.poseLandmarks[15];
            analysis = analyzePushup(shoulder, elbow, wrist, stageRef.current);
          }

          stageRef.current = analysis.stage;
          if (analysis.rep) {
            repsRef.current += 1;
            setReps(repsRef.current);
          }
          if (analysis.score !== scoreRef.current) {
            scoreRef.current = analysis.score;
            setFormScore(analysis.score);
          }

          // Trigger parent update
          if (analysis.rep || analysis.score !== scoreRef.current) {
            onRepUpdate(repsRef.current, scoreRef.current);
          }
        }
        canvasCtx.restore();
      });

      camera = new Camera(videoElement, {
        onFrame: async () => {
          await pose!.send({ image: videoElement });
        },
        width: 1280,
        height: 720,
      });

      camera.start();
    };

    initializeCamera();

    return () => {
      if (camera) camera.stop();
      if (pose) pose.close();
    };
  }, [cameraActive, exercise]); // eslint-disable-line

  return (
    <div className="relative w-full max-w-4xl mx-auto rounded-2xl overflow-hidden bg-[#111111] border border-white/10 shadow-2xl">
      {!cameraActive ? (
        <div className="aspect-video flex flex-col items-center justify-center p-8 text-center space-y-6">
          <div className="w-20 h-20 bg-[#FFD600]/10 rounded-full flex items-center justify-center">
            <CameraIcon className="w-10 h-10 text-[#FFD600]" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white mb-2">Start Smart Workout</h3>
            <p className="text-gray-400 max-w-md mx-auto">
              PRO FITNESS requires camera access to analyze your posture, count reps, and provide real-time form correction using the Good-GYM AI engine.
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setCameraActive(true)}
            className="px-8 py-4 bg-[#FFD600] text-black font-bold rounded-xl flex items-center gap-2 hover:bg-yellow-400 transition-colors"
          >
            <Activity className="w-5 h-5" />
            Enable Camera & Start
          </motion.button>
        </div>
      ) : (
        <div className="relative aspect-video">
          <video ref={videoRef} className="hidden" playsInline />
          <canvas ref={canvasRef} className="w-full h-full object-cover" width={1280} height={720} />
          
          {/* Overlay UI */}
          <div className="absolute top-0 left-0 w-full p-6 flex justify-between items-start pointer-events-none">
            <div className="flex gap-4">
              <div className="bg-black/60 backdrop-blur-md px-6 py-3 rounded-xl border border-white/10 flex flex-col items-center justify-center">
                <span className="text-sm text-gray-400 font-medium uppercase tracking-wider mb-1">REPS</span>
                <span className="text-4xl font-black text-white">{reps}</span>
              </div>
              <div className="bg-black/60 backdrop-blur-md px-6 py-3 rounded-xl border border-white/10 flex flex-col items-center justify-center">
                <span className="text-sm text-gray-400 font-medium uppercase tracking-wider mb-1">FORM SCORE</span>
                <div className="flex items-center gap-2">
                  <span className={`text-4xl font-black ${formScore >= 90 ? 'text-[#10B981]' : formScore >= 70 ? 'text-[#FFD600]' : 'text-[#FF4444]'}`}>
                    {formScore}
                  </span>
                  <span className="text-lg text-gray-500">/100</span>
                </div>
              </div>
            </div>
            
            <div className="bg-[#FFD600] text-black px-4 py-2 rounded-lg font-bold flex items-center gap-2 shadow-lg">
              <Zap className="w-4 h-4 fill-current" />
              {isReady ? 'AI Tracking Active' : 'Initializing AI Engine...'}
            </div>
          </div>

          {/* Form Warning Overlay */}
          {formScore < 80 && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-red-500/90 text-white px-8 py-4 rounded-full font-bold shadow-[0_0_30px_rgba(239,68,68,0.5)] backdrop-blur-sm"
            >
              ⚠️ Improve your form! Go deeper.
            </motion.div>
          )}
          {formScore >= 90 && reps > 0 && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="absolute bottom-8 right-8 bg-[#10B981]/90 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 backdrop-blur-sm shadow-xl"
            >
              <CheckCircle className="w-5 h-5" />
              Perfect Form
            </motion.div>
          )}
        </div>
      )}
    </div>
  );
}
