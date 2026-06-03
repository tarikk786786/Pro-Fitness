"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import Link from "next/link";

export default function WhatsAppButton() {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end group">
      {/* Tooltip */}
      <div className="mb-2 px-4 py-2 bg-white text-black text-sm font-bold rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg translate-y-2 group-hover:translate-y-0 transform">
        Chat with our AI Coach!
        <div className="absolute -bottom-2 right-6 w-4 h-4 bg-white transform rotate-45"></div>
      </div>
      
      {/* Button */}
      <Link href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer">
        <motion.div
          animate={{
            boxShadow: ["0px 0px 0px 0px rgba(37, 211, 102, 0.4)", "0px 0px 0px 15px rgba(37, 211, 102, 0)"],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
          }}
          className="w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300"
        >
          <MessageCircle className="w-7 h-7 text-white fill-current" />
        </motion.div>
      </Link>
    </div>
  );
}
