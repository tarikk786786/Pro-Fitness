"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Respect user's reduced-motion preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) return;

    const init = async () => {
      const { default: Lenis } = await import("lenis");

      const lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        lerp: 0.08,
        wheelMultiplier: 1.1,
        smoothWheel: true,
        touchMultiplier: 1.5,
      });

      lenisRef.current = lenis;

      // Bi-directional sync: Lenis scroll → ScrollTrigger update
      lenis.on("scroll", ScrollTrigger.update);

      // Drive Lenis via GSAP ticker for frame-perfect synchronisation
      gsap.ticker.add((time: number) => {
        lenis.raf(time * 1000);
      });

      // Eliminate GSAP lag smoothing so Lenis controls the pace
      gsap.ticker.lagSmoothing(0);
    };

    init();

    return () => {
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
      // Remove all GSAP ticker listeners tied to this effect
      gsap.ticker.remove(() => {});
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return <>{children}</>;
}
