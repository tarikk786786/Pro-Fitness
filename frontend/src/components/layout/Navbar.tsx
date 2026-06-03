"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Dumbbell, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import MagneticButton from "@/components/ui/MagneticButton";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Membership", href: "/membership" },
  { name: "Trainers", href: "/trainers" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        isScrolled
          ? "bg-brand-black/90 backdrop-blur-xl border-b border-white/5 py-4"
          : "bg-transparent py-6"
      )}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group relative z-50">
            <MagneticButton as="div">
              <div className="flex items-center gap-2">
                <Dumbbell className="w-8 h-8 text-brand-yellow group-hover:scale-110 transition-transform duration-500" />
                <span className="text-2xl md:text-3xl font-bebas tracking-wider text-brand-white">
                  PRO<span className="text-brand-yellow">FITNESS</span>
                </span>
              </div>
            </MagneticButton>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8 font-poppins">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "text-sm font-semibold tracking-wide transition-all duration-300 hover:text-brand-yellow relative group",
                  pathname === link.href ? "text-brand-yellow" : "text-gray-300"
                )}
              >
                {link.name}
                <span className={cn(
                  "absolute -bottom-2 left-0 h-0.5 bg-brand-yellow transition-all duration-300",
                  pathname === link.href ? "w-full" : "w-0 group-hover:w-full"
                )} />
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="hidden lg:flex items-center gap-6 font-poppins relative z-50">
            {user ? (
              <>
                <MagneticButton as="div">
                  <Link
                    href="/dashboard"
                    className="px-6 py-2.5 bg-brand-yellow text-brand-black font-bold rounded-full hover:bg-white transition-colors"
                  >
                    Dashboard
                  </Link>
                </MagneticButton>
                <MagneticButton>
                  <button
                    onClick={logout}
                    className="px-6 py-2.5 border border-white/20 text-white font-bold rounded-full hover:bg-white/10 transition-colors"
                  >
                    Logout
                  </button>
                </MagneticButton>
              </>
            ) : (
              <>
                <MagneticButton as="div">
                  <Link
                    href="?login=true"
                    className="px-4 py-2.5 text-white font-semibold hover:text-brand-yellow transition-colors"
                    scroll={false}
                  >
                    Log In
                  </Link>
                </MagneticButton>
                <MagneticButton as="div">
                  <Link
                    href="/signup"
                    className="px-6 py-2.5 bg-brand-yellow text-brand-black font-bold rounded-full hover:bg-white transition-all duration-300 shadow-glow-yellow hover:shadow-glow-yellow-lg"
                  >
                    Join Now
                  </Link>
                </MagneticButton>
              </>
            )}
          </div>

          {/* Mobile Toggle */}
          <button
            className="lg:hidden text-white relative z-50"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100vh" }}
            exit={{ opacity: 0, height: 0 }}
            className="fixed inset-0 top-[72px] bg-brand-black/95 backdrop-blur-2xl z-40 lg:hidden overflow-hidden font-poppins"
          >
            <div className="flex flex-col items-center justify-center h-full gap-8 p-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "text-3xl font-bebas tracking-wider transition-colors",
                    pathname === link.href ? "text-brand-yellow" : "text-white hover:text-brand-yellow"
                  )}
                >
                  {link.name}
                </Link>
              ))}
              <div className="flex flex-col w-full max-w-sm gap-4 mt-12">
                <Link
                  href="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full py-4 text-center text-lg font-bold border border-white/20 rounded-full hover:bg-white/10"
                >
                  Sign In
                </Link>
                <Link
                  href="/membership"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full py-4 text-center text-lg font-bold bg-brand-yellow rounded-full text-brand-black shadow-glow-yellow"
                >
                  Join Now
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
