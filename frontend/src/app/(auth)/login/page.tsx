"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, ArrowRight, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useGoogleLogin } from "@react-oauth/google";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || data.message || "Invalid credentials");
      }

      login(data.token, data.user);
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setIsLoading(true);
      setError("");
      try {
        const res = await fetch("http://localhost:5000/api/auth/google", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ access_token: tokenResponse.access_token }),
        });
        
        const data = await res.json();
        
        if (!res.ok) {
          throw new Error(data.error || data.message || "Google Authentication failed");
        }

        login(data.token, data.user);
        router.push("/dashboard");
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
  });

  const handleGoogleClick = () => {
    // Check if we are using the dummy Client ID. If so, bypass Google's popup to avoid the 401 error during testing.
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "739343033621-euv2sq9n4e37eqbheg74h2t2aab00e2a.apps.googleusercontent.com";
    if (clientId === "739343033621-euv2sq9n4e37eqbheg74h2t2aab00e2a.apps.googleusercontent.com") {
      setIsLoading(true);
      setError("");
      fetch("http://localhost:5000/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ access_token: "mock_token" }),
      })
      .then(res => res.json())
      .then(data => {
        if (data.token) {
          login(data.token, data.user);
          router.push("/dashboard");
        } else {
          throw new Error("Mock login failed");
        }
      })
      .catch(err => {
        setError(err.message);
        setIsLoading(false);
      });
      return;
    }

    // Otherwise, trigger the real Google popup
    googleLogin();
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center pt-24 pb-12 px-4 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#FF0033]/20 blur-[120px] rounded-full pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white/5 border border-white/10 p-8 rounded-[32px] backdrop-blur-xl relative z-10"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black mb-2">WELCOME BACK</h1>
          <p className="text-gray-400">Log in to continue your fitness journey</p>
        </div>

        {error && (
          <div className="bg-red-500/20 text-red-500 border border-red-500/30 p-4 rounded-xl mb-6 text-sm">
            {error}
          </div>
        )}

        <button 
          onClick={handleGoogleClick} 
          type="button"
          disabled={isLoading}
          className="w-full bg-white text-black font-bold rounded-xl py-3 flex items-center justify-center gap-3 hover:bg-gray-200 transition-colors mb-6 disabled:opacity-50"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Continue with Google
        </button>
        
        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-black text-gray-500">Or continue with email</span>
          </div>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Email Address</label>
            <div className="relative">
              <Mail className="w-5 h-5 text-gray-500 absolute left-4 top-3.5" />
              <input 
                type="email" 
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="w-full bg-black/50 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white focus:outline-none focus:border-[#FF0033] transition-colors" 
                placeholder="you@example.com"
              />
            </div>
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-400">Password</label>
              <Link href="/forgot-password" className="text-sm text-[#FF0033] hover:text-white transition-colors">Forgot Password?</Link>
            </div>
            <div className="relative">
              <Lock className="w-5 h-5 text-gray-500 absolute left-4 top-3.5" />
              <input 
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                className="w-full bg-black/50 border border-white/10 rounded-xl pl-12 pr-12 py-3 text-white focus:outline-none focus:border-[#FF0033] transition-colors" 
                placeholder="••••••••"
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-3.5 text-gray-500 hover:text-white"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-[#FF0033] text-white font-bold rounded-xl py-4 flex items-center justify-center gap-2 hover:bg-white hover:text-black transition-colors disabled:opacity-50"
          >
            {isLoading ? "Authenticating..." : "Login to Dashboard"} <ArrowRight className="w-5 h-5" />
          </button>
        </form>

        <div className="mt-8 text-center text-gray-400 text-sm">
          Don't have an account? <Link href="/signup" className="text-white font-bold hover:text-[#FF0033] transition-colors">Sign up here</Link>
        </div>
      </motion.div>
    </div>
  );
}
