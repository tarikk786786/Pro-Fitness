"use client";

import { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

// Self-contained LoginModal — manages its own open/close state via
// a module-level event bus so it can be triggered from anywhere.
// Usage in layout.tsx: <LoginModal />
// To open from any component: import { openLoginModal } from "@/components/auth/LoginModal"

type Listener = (open: boolean) => void;
const listeners: Set<Listener> = new Set();

export function openLoginModal() {
  listeners.forEach((fn) => fn(true));
}

export function closeLoginModal() {
  listeners.forEach((fn) => fn(false));
}

export default function LoginModal() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Subscribe to open/close events
  useEffect(() => {
    listeners.add(setIsOpen);
    return () => {
      listeners.delete(setIsOpen);
    };
  }, []);

  const close = () => {
    setIsOpen(false);
    setError("");
    setShowRegister(false);
  };

  if (!isOpen) return null;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      const res = await signIn("credentials", { redirect: false, email, password });
      if (res?.error) {
        setError("Invalid email or password. Please try again.");
      } else {
        router.refresh();
        close();
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    signIn("google", { callbackUrl: "/" });
  };

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) close(); }}
    >
      <div className="w-full max-w-md p-8 bg-zinc-900 border border-yellow-500/20 rounded-2xl shadow-2xl relative animate-in fade-in zoom-in-95 duration-300">
        <button
          onClick={close}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-full transition"
        >
          ✕
        </button>

        {!showRegister ? (
          <>
            <h2 className="text-3xl font-black text-white mb-2 tracking-tight">
              WELCOME <span className="text-yellow-500">BACK</span>
            </h2>
            <p className="text-zinc-400 text-sm mb-6">Sign in to your PRO FITNESS account</p>

            {error && (
              <div className="mb-4 p-3 bg-red-500/10 border border-red-500/50 text-red-400 rounded-lg text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-zinc-400 mb-1 uppercase tracking-wider">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-yellow-500 transition placeholder:text-zinc-600"
                  placeholder="your@email.com"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-zinc-400 mb-1 uppercase tracking-wider">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-yellow-500 transition placeholder:text-zinc-600"
                  placeholder="••••••••"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-yellow-500 hover:bg-yellow-400 text-black font-black rounded-lg transition disabled:opacity-50 uppercase tracking-wider"
              >
                {isLoading ? "SIGNING IN..." : "SIGN IN"}
              </button>
            </form>

            <div className="my-6 flex items-center gap-4">
              <div className="h-px bg-zinc-800 flex-1" />
              <span className="text-zinc-500 text-xs uppercase tracking-widest">or</span>
              <div className="h-px bg-zinc-800 flex-1" />
            </div>

            <button
              onClick={handleGoogleSignIn}
              className="w-full py-3 bg-white hover:bg-zinc-100 text-black font-bold rounded-lg transition flex items-center justify-center gap-2"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
              <span>Continue with Google</span>
            </button>

            <p className="mt-6 text-center text-zinc-400 text-sm">
              Don&apos;t have an account?{" "}
              <button
                onClick={() => setShowRegister(true)}
                className="text-yellow-500 hover:text-yellow-400 font-bold transition"
              >
                Join Now
              </button>
            </p>
          </>
        ) : (
          <>
            <h2 className="text-3xl font-black text-white mb-2 tracking-tight">
              JOIN <span className="text-yellow-500">PRO FITNESS</span>
            </h2>
            <p className="text-zinc-400 text-sm mb-6">Create your transformation account</p>

            {error && (
              <div className="mb-4 p-3 bg-red-500/10 border border-red-500/50 text-red-400 rounded-lg text-sm">
                {error}
              </div>
            )}

            <form onSubmit={async (e) => {
              e.preventDefault();
              setIsLoading(true);
              setError("");
              try {
                const res = await fetch("/api/auth/register", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ name, email, password }),
                });
                if (!res.ok) {
                  const data = await res.json();
                  setError(data.message || "Registration failed");
                } else {
                  await signIn("credentials", { redirect: false, email, password });
                  router.refresh();
                  close();
                }
              } catch {
                setError("Something went wrong. Please try again.");
              } finally {
                setIsLoading(false);
              }
            }} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-zinc-400 mb-1 uppercase tracking-wider">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-yellow-500 transition placeholder:text-zinc-600"
                  placeholder="Your Name"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-zinc-400 mb-1 uppercase tracking-wider">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-yellow-500 transition placeholder:text-zinc-600"
                  placeholder="your@email.com"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-zinc-400 mb-1 uppercase tracking-wider">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-yellow-500 transition placeholder:text-zinc-600"
                  placeholder="Min. 8 characters"
                  required
                  minLength={8}
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-yellow-500 hover:bg-yellow-400 text-black font-black rounded-lg transition disabled:opacity-50 uppercase tracking-wider"
              >
                {isLoading ? "CREATING ACCOUNT..." : "CREATE ACCOUNT"}
              </button>
            </form>

            <button
              onClick={handleGoogleSignIn}
              className="mt-4 w-full py-3 bg-white hover:bg-zinc-100 text-black font-bold rounded-lg transition flex items-center justify-center gap-2"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
              <span>Sign up with Google</span>
            </button>

            <p className="mt-6 text-center text-zinc-400 text-sm">
              Already have an account?{" "}
              <button
                onClick={() => setShowRegister(false)}
                className="text-yellow-500 hover:text-yellow-400 font-bold transition"
              >
                Sign In
              </button>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
