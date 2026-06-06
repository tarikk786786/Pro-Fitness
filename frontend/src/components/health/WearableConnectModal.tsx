"use client";

import { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { X, CheckCircle2, Loader2, Watch, Heart, Activity, Smartphone } from "lucide-react";

interface Device {
  id: string;
  name: string;
  icon: React.ReactNode;
  status: "disconnected" | "connecting" | "connected";
}

interface WearableConnectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function WearableConnectModal({ isOpen, onClose }: WearableConnectModalProps) {
  const [devices, setDevices] = useState<Device[]>([
    { id: "apple_health", name: "Apple Health", icon: <Heart className="w-6 h-6" />, status: "disconnected" },
    { id: "garmin", name: "Garmin", icon: <Watch className="w-6 h-6" />, status: "disconnected" },
    { id: "whoop", name: "Whoop", icon: <Activity className="w-6 h-6" />, status: "disconnected" },
    { id: "oura", name: "Oura Ring", icon: <Smartphone className="w-6 h-6" />, status: "disconnected" },
    { id: "strava", name: "Strava", icon: <Activity className="w-6 h-6" />, status: "disconnected" },
    { id: "ultrahuman", name: "Ultrahuman", icon: <Watch className="w-6 h-6" />, status: "disconnected" },
  ]);

  const handleConnect = (id: string) => {
    setDevices((prev) =>
      prev.map((dev) => (dev.id === id ? { ...dev, status: "connecting" } : dev))
    );

    setTimeout(() => {
      setDevices((prev) =>
        prev.map((dev) => (dev.id === id ? { ...dev, status: "connected" } : dev))
      );
    }, 2000);
  };

  const overlayVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.2 } },
  };

  const modalVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring" as const, damping: 25, stiffness: 300 } },
    exit: { opacity: 0, scale: 0.95, y: 20, transition: { duration: 0.2 } },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <motion.div
            className="w-full max-w-2xl bg-[#0A0A0A] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
            variants={modalVariants}
          >
            <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/5">
              <div>
                <h2 className="text-2xl font-bold text-white tracking-tight">Connect Devices</h2>
                <p className="text-white/60 text-sm mt-1">Sync your metrics via Open Wearables API.</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-white/10 transition-colors text-white/70 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[60vh] overflow-y-auto">
              {devices.map((device) => (
                <motion.button
                  key={device.id}
                  whileHover={{ scale: device.status === "connected" ? 1 : 1.02 }}
                  whileTap={{ scale: device.status === "connected" ? 1 : 0.98 }}
                  onClick={() => device.status === "disconnected" && handleConnect(device.id)}
                  className={`relative p-5 rounded-xl border flex items-center gap-4 transition-all duration-300 ${
                    device.status === "connected"
                      ? "border-[#FFD600]/30 bg-[#FFD600]/5 cursor-default"
                      : "border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20"
                  }`}
                >
                  <div
                    className={`p-3 rounded-lg ${
                      device.status === "connected" ? "bg-[#FFD600]/20 text-[#FFD600]" : "bg-white/10 text-white"
                    }`}
                  >
                    {device.icon}
                  </div>
                  
                  <div className="flex-1 text-left">
                    <h3 className="text-white font-medium">{device.name}</h3>
                    <p className="text-sm text-white/50">
                      {device.status === "disconnected" && "Not connected"}
                      {device.status === "connecting" && "Connecting..."}
                      {device.status === "connected" && "Synced & Active"}
                    </p>
                  </div>

                  <div className="ml-auto">
                    {device.status === "disconnected" && (
                      <div className="text-xs font-semibold uppercase tracking-wider text-white/40 group-hover:text-white/60 px-3 py-1.5 rounded-full border border-white/10">
                        Connect
                      </div>
                    )}
                    {device.status === "connecting" && (
                      <Loader2 className="w-5 h-5 text-[#FFD600] animate-spin" />
                    )}
                    {device.status === "connected" && (
                      <CheckCircle2 className="w-6 h-6 text-[#FFD600]" />
                    )}
                  </div>
                </motion.button>
              ))}
            </div>
            
            <div className="p-6 border-t border-white/10 bg-white/5 flex justify-end">
              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-[#FFD600] text-black font-semibold rounded-lg hover:bg-[#FFE55C] transition-colors shadow-[0_0_15px_rgba(255,214,0,0.3)]"
              >
                Done
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
