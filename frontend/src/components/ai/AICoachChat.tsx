"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Send, Mic, MicOff, Volume2, VolumeX, Bot, User, Activity } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

export default function AICoachChat() {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: `Hello ${user?.name || "there"}! I'm your PRO FITNESS AI Coach. I can help you with personalized workouts, diet plans, health conditions (like PCOS, Thyroid), and real-time form correction. How can I transform your body today?`,
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(true); // Auto-speak AI responses
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Handle Speech Recognition (Web Speech API)
  useEffect(() => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) return;
    
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.continuous = false;
    recognition.interimResults = true;
    
    recognition.onresult = (event: any) => {
      const transcript = Array.from(event.results)
        .map((result: any) => result[0])
        .map((result: any) => result.transcript)
        .join("");
      
      setInput(transcript);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    if (isListening) {
      try { recognition.start(); } catch(e) {}
    } else {
      recognition.stop();
    }
    
    return () => recognition.stop();
  }, [isListening]);

  // Handle Text-to-Speech
  const speakText = (text: string) => {
    if (!isSpeaking || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel(); // Stop current speech
    const utterance = new SpeechSynthesisUtterance(text);
    // Try to find a good English voice
    const voices = window.speechSynthesis.getVoices();
    const goodVoice = voices.find(v => v.name.includes("Google") || v.name.includes("Premium") || v.lang === "en-US");
    if (goodVoice) utterance.voice = goodVoice;
    utterance.rate = 1.05;
    window.speechSynthesis.speak(utterance);
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMessage: Message = { id: Date.now().toString(), role: "user", content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // MOCK AI LOGIC FOR INSTANT PREVIEW
    setTimeout(() => {
      let aiResponse = "";
      const lowerInput = userMessage.content.toLowerCase();
      
      if (lowerInput.includes("pcos") || lowerInput.includes("thyroid")) {
        aiResponse = "I have detected a specific health condition. Our Advanced Health Module is activating... \n\nFor PCOS/Thyroid, we must focus on insulin sensitivity and hormonal balance. I recommend a low-GI diet (under 1,500 kcal) rich in Omega-3s, and a 4-day strength training split mixed with 2 days of LISS cardio to lower cortisol levels. Would you like me to generate your full 7-day plan now?";
      } else if (lowerInput.includes("diet") || lowerInput.includes("calories")) {
        aiResponse = "Based on your profile, your TDEE is approximately 2,450 kcal. For lean muscle gain, you need 2,750 kcal daily. \n\nMacros: 180g Protein, 300g Carbs, 70g Fat. \nI have updated your AI Dashboard with this new target. Remember to drink at least 3.5L of water today!";
      } else if (lowerInput.includes("workout") || lowerInput.includes("exercise")) {
        aiResponse = "Let's crush it! Generating your workout... \n\n**Push Day (Hypertrophy)**\n1. Incline Dumbbell Press (4x10)\n2. Overhead Press (3x12)\n3. Lateral Raises (4x15)\n4. Triceps Pushdown (3x15)\n\nMaintain 90 seconds rest between sets. Your AI progression system shows you should increase the weight by 2.5kg on the Dumbbell Press today!";
      } else {
        aiResponse = "I am your PRO FITNESS AI Coach. I'm analyzing your biometrics now... Your recovery score is 85% today! You are primed for a high-intensity session. How can I assist you further?";
      }

      const aiMessage: Message = { id: (Date.now() + 1).toString(), role: "assistant", content: aiResponse };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
      speakText(aiResponse);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-[700px] max-h-[80vh] bg-white/5 border border-white/10 rounded-3xl overflow-hidden backdrop-blur-xl shadow-2xl relative">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#00D4FF]/10 blur-[100px] rounded-full pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-white/10 bg-black/40 relative z-10">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 bg-[#FF0033]/20 rounded-full flex items-center justify-center border border-[#FF0033]/50">
              <Bot className="w-6 h-6 text-[#FF0033]" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-black animate-pulse" />
          </div>
          <div>
            <h3 className="font-bold text-white tracking-wider">PRO FITNESS AI</h3>
            <div className="flex items-center gap-2 text-xs text-[#00D4FF]">
              <Activity className="w-3 h-3" /> System Active
            </div>
          </div>
        </div>
        
        <button 
          onClick={() => setIsSpeaking(!isSpeaking)}
          className={`p-2 rounded-full transition-colors ${isSpeaking ? 'bg-[#00D4FF]/20 text-[#00D4FF]' : 'bg-white/5 text-gray-500'}`}
          title={isSpeaking ? "Voice Output On" : "Voice Output Off"}
        >
          {isSpeaking ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
        </button>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 relative z-10 scrollbar-thin scrollbar-thumb-white/10">
        {messages.map((msg) => (
          <motion.div
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            key={msg.id}
            className={`flex items-end gap-2 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === "user" ? "bg-white/10" : "bg-[#FF0033]/20 border border-[#FF0033]/30"}`}>
              {msg.role === "user" ? <User className="w-4 h-4 text-white" /> : <Bot className="w-4 h-4 text-[#FF0033]" />}
            </div>
            <div className={`max-w-[75%] p-4 rounded-2xl ${
              msg.role === "user" 
                ? "bg-white/10 text-white rounded-br-none" 
                : "bg-black/60 border border-white/5 text-gray-200 rounded-bl-none shadow-[0_4px_30px_rgba(0,0,0,0.1)]"
            }`}>
              <p className="whitespace-pre-wrap leading-relaxed text-sm">{msg.content}</p>
            </div>
          </motion.div>
        ))}
        
        {isTyping && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-end gap-2">
            <div className="w-8 h-8 rounded-full bg-[#FF0033]/20 border border-[#FF0033]/30 flex items-center justify-center shrink-0">
              <Bot className="w-4 h-4 text-[#FF0033]" />
            </div>
            <div className="bg-black/60 border border-white/5 p-4 rounded-2xl rounded-bl-none flex gap-1">
              <div className="w-2 h-2 bg-[#FF0033] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-2 h-2 bg-[#FF0033] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-2 h-2 bg-[#FF0033] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-black/60 border-t border-white/10 backdrop-blur-xl relative z-10">
        <form 
          onSubmit={(e) => { e.preventDefault(); handleSend(); }}
          className="flex items-center gap-2 relative"
        >
          <button 
            type="button"
            onClick={() => setIsListening(!isListening)}
            className={`absolute left-2 p-2 rounded-full transition-all ${isListening ? 'bg-[#FF0033] text-white animate-pulse' : 'text-gray-400 hover:text-white hover:bg-white/10'}`}
          >
            {isListening ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
          </button>
          
          <input 
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={isListening ? "Listening..." : "Ask your AI Coach..."}
            className="w-full bg-white/5 border border-white/10 rounded-full py-4 pl-12 pr-12 text-sm text-white focus:outline-none focus:border-[#00D4FF]/50 focus:ring-1 focus:ring-[#00D4FF]/50 transition-all"
          />
          
          <button 
            type="submit"
            disabled={!input.trim() || isTyping}
            className="absolute right-2 p-2 bg-[#00D4FF] hover:bg-white hover:text-black text-black rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
