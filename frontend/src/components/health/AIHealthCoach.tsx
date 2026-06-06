"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { MessageSquare, Send, Bot, User, Zap, Activity, Moon, ChevronUp } from "lucide-react";

interface Message {
  id: string;
  sender: "ai" | "user";
  text: string;
  timestamp: Date;
}

export function AIHealthCoach() {
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "ai",
      text: "Welcome back! Your Health Score is 84 today. Your HRV is down 10% from your baseline.",
      timestamp: new Date(Date.now() - 1000 * 60 * 5),
    },
    {
      id: "2",
      sender: "ai",
      text: "I recommend focusing on Zone 2 cardio instead of HIIT today to optimize recovery.",
      timestamp: new Date(Date.now() - 1000 * 60 * 4),
    },
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isTyping]);

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    const newUserMsg: Message = {
      id: Date.now().toString(),
      sender: "user",
      text,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newUserMsg]);
    setInputValue("");
    setIsTyping(true);

    // Mock AI response
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: "ai",
          text: "I've updated your daily plan. Anything else you need help with?",
          timestamp: new Date(),
        },
      ]);
    }, 1500);
  };

  const widgetVariants: Variants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { type: "spring" as const, damping: 25, stiffness: 300 }
    },
    exit: { opacity: 0, y: 20, scale: 0.95, transition: { duration: 0.2 } },
  };

  const suggestions = [
    { label: "Generate Recovery Plan", icon: <Zap className="w-4 h-4" /> },
    { label: "Adjust Meal Plan", icon: <Activity className="w-4 h-4" /> },
    { label: "Explain Sleep Score", icon: <Moon className="w-4 h-4" /> },
  ];

  return (
    <>
      {/* Floating Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 p-4 rounded-full bg-[#FFD600] text-black shadow-[0_0_20px_rgba(255,214,0,0.4)] z-40 hover:bg-[#FFE55C] transition-all duration-300 ${isOpen ? 'scale-0 opacity-0 pointer-events-none' : 'scale-100 opacity-100'}`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <MessageSquare className="w-6 h-6" />
      </motion.button>

      {/* Chat Widget */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-6 right-6 w-[380px] max-w-[calc(100vw-32px)] h-[600px] max-h-[calc(100vh-100px)] z-50 flex flex-col bg-[#0A0A0A] border border-white/10 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-xl"
            variants={widgetVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Header */}
            <div className="p-4 border-b border-white/10 bg-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#FFD600]/20 flex items-center justify-center border border-[#FFD600]/30">
                  <Bot className="w-6 h-6 text-[#FFD600]" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">PRO FITNESS Coach</h3>
                  <p className="text-xs text-[#FFD600] flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-[#FFD600] animate-pulse"></span>
                    Online
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-full hover:bg-white/10 text-white/60 hover:text-white transition-colors"
              >
                <ChevronUp className="w-5 h-5 rotate-180" />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`flex max-w-[85%] gap-2 ${msg.sender === "user" ? "flex-row-reverse" : "flex-row"}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      msg.sender === "ai" ? "bg-white/10" : "bg-[#FFD600]/20"
                    }`}>
                      {msg.sender === "ai" ? (
                        <Bot className="w-4 h-4 text-white" />
                      ) : (
                        <User className="w-4 h-4 text-[#FFD600]" />
                      )}
                    </div>
                    
                    <div className={`p-3 rounded-2xl ${
                      msg.sender === "user"
                        ? "bg-[#FFD600] text-black rounded-tr-sm"
                        : "bg-white/10 text-white rounded-tl-sm border border-white/5"
                    }`}>
                      <p className="text-sm leading-relaxed">{msg.text}</p>
                      <span className={`text-[10px] mt-1 block ${
                        msg.sender === "user" ? "text-black/60 text-right" : "text-white/40"
                      }`}>
                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex max-w-[85%] gap-2 flex-row">
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                    <div className="p-4 rounded-2xl bg-white/10 text-white rounded-tl-sm border border-white/5 flex gap-1 items-center">
                      <div className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                      <div className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                      <div className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggestions */}
            {messages[messages.length - 1]?.sender === "ai" && !isTyping && (
              <div className="px-4 pb-2 flex flex-wrap gap-2">
                {suggestions.map((sug, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(sug.label)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-xs text-white/80 transition-colors"
                  >
                    {sug.icon}
                    {sug.label}
                  </button>
                ))}
              </div>
            )}

            {/* Input Area */}
            <div className="p-4 border-t border-white/10 bg-white/5">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend(inputValue);
                }}
                className="relative flex items-center"
              >
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask your health coach..."
                  className="w-full bg-black/50 border border-white/10 rounded-full py-3 pl-4 pr-12 text-sm text-white placeholder-white/40 focus:outline-none focus:border-[#FFD600]/50 transition-colors"
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim() || isTyping}
                  className="absolute right-2 p-2 rounded-full bg-[#FFD600] text-black disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#FFE55C] transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
