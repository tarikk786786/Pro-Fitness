"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Dumbbell } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Membership", href: "/membership" },
  { name: "AI Tools", href: "/ai-tools" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const pathname = usePathname();
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 50);
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? (scrollY / docHeight) * 100 : 0);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Scroll Progress Bar */}
      <div
        className="scroll-progress-bar fixed top-0 left-0 z-[10000] h-[2px]"
        style={{ width: `${scrollProgress}%` }}
      />

      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="fixed top-0 w-full z-50 pointer-events-none"
      >
        {/* Main Navbar */}
        <div
          className={cn(
            "pointer-events-auto mx-auto transition-all duration-500",
            isScrolled
              ? "max-w-6xl mt-3 rounded-2xl bg-black/80 backdrop-blur-2xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.6)] px-6 py-3"
              : "max-w-full bg-transparent px-8 py-6"
          )}
        >
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="w-9 h-9 bg-[#FFD600] rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(255,214,0,0.4)] group-hover:shadow-[0_0_30px_rgba(255,214,0,0.7)] transition-all duration-300">
                  <Dumbbell className="w-5 h-5 text-black" />
                </div>
                <div className="absolute inset-0 bg-[#FFD600] rounded-xl blur-xl opacity-30 group-hover:opacity-60 transition-opacity pointer-events-none" />
              </div>
              <div className="font-bebas text-2xl tracking-wider">
                PRO<span className="text-[#FFD600]">FITNESS</span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "relative px-4 py-2 text-sm font-semibold tracking-wide transition-all duration-300 rounded-xl font-poppins",
                    pathname === link.href
                      ? "text-[#FFD600]"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  )}
                >
                  {pathname === link.href && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute inset-0 bg-[#FFD600]/10 rounded-xl border border-[#FFD600]/20"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-10">{link.name}</span>
                </Link>
              ))}
            </nav>

            {/* CTA Buttons */}
            <div className="hidden lg:flex items-center gap-3">
              {user ? (
                <>
                  <Link
                    href="/dashboard"
                    className="px-5 py-2.5 bg-[#FFD600] text-black font-bold rounded-xl hover:bg-white transition-all duration-300 text-sm shadow-[0_0_20px_rgba(255,214,0,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:scale-105"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={logout}
                    className="px-5 py-2.5 border border-white/15 text-white rounded-xl hover:bg-white/10 transition-all text-sm font-semibold"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="?login=true"
                    className="px-4 py-2.5 text-gray-300 font-semibold hover:text-white transition-colors text-sm"
                    scroll={false}
                  >
                    Log In
                  </Link>
                  <Link
                    href="/signup"
                    className="px-6 py-2.5 bg-[#FFD600] text-black font-bold rounded-xl hover:bg-white transition-all duration-300 text-sm shadow-[0_0_20px_rgba(255,214,0,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] hover:scale-105"
                  >
                    Join Now
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Toggle */}
            <button
              aria-label="Toggle mobile menu"
              aria-expanded={isMobileMenuOpen}
              className="lg:hidden w-10 h-10 flex items-center justify-center text-white border border-white/10 rounded-xl bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <AnimatePresence mode="wait" initial={false}>
                {isMobileMenuOpen ? (
                  <motion.span
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <X className="w-5 h-5" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <Menu className="w-5 h-5" />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="pointer-events-auto fixed inset-x-4 top-20 bg-[#0A0A0A]/95 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl z-50 overflow-hidden lg:hidden"
            >
              <div className="p-6 space-y-1">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={cn(
                        "block px-4 py-3 rounded-xl text-base font-semibold font-poppins transition-all",
                        pathname === link.href
                          ? "text-[#FFD600] bg-[#FFD600]/10"
                          : "text-gray-300 hover:text-white hover:bg-white/5"
                      )}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: navLinks.length * 0.05 + 0.1 }}
                  className="pt-4 border-t border-white/10 flex flex-col gap-3"
                >
                  {user ? (
                    <>
                      <Link
                        href="/dashboard"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="w-full py-3 text-center text-sm font-bold bg-[#FFD600] text-black rounded-xl shadow-[0_0_20px_rgba(255,214,0,0.3)]"
                      >
                        Dashboard
                      </Link>
                      <button
                        onClick={() => { logout(); setIsMobileMenuOpen(false); }}
                        className="w-full py-3 text-center text-sm font-bold border border-white/15 rounded-xl hover:bg-white/10 transition-all"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        href="/login"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="w-full py-3 text-center text-sm font-bold border border-white/15 rounded-xl hover:bg-white/10 transition-all"
                      >
                        Sign In
                      </Link>
                      <Link
                        href="/signup"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="w-full py-3 text-center text-sm font-bold bg-[#FFD600] text-black rounded-xl shadow-[0_0_20px_rgba(255,214,0,0.3)]"
                      >
                        Join Now — It&apos;s Free
                      </Link>
                    </>
                  )}
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
}
