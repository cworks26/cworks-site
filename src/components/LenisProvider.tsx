"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/* Smooth wheel (Lenis) + global spotlight cursor tracker.
   Pure smooth scrolling with zero auto-snap hijacking, so sections flow
   naturally without lag or pause. */
export default function LenisProvider() {
  useEffect(() => {
    // Global spotlight mouse tracker (rAF-throttled, single passive listener)
    let spotRaf = 0;
    const onMouseMove = (e: MouseEvent) => {
      if (spotRaf) return;
      spotRaf = requestAnimationFrame(() => {
        spotRaf = 0;
        const target = (e.target as HTMLElement | null)?.closest?.<HTMLElement>(".spotlight");
        if (!target) return;
        const rect = target.getBoundingClientRect();
        target.style.setProperty("--sx", `${e.clientX - rect.left}px`);
        target.style.setProperty("--sy", `${e.clientY - rect.top}px`);
      });
    };
    window.addEventListener("mousemove", onMouseMove, { passive: true });

    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return () => {
        window.removeEventListener("mousemove", onMouseMove);
        if (spotRaf) cancelAnimationFrame(spotRaf);
      };
    }

    const lenis = new Lenis({
      duration: 0.95,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.2,
    });

    // Smooth anchor links
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute("href")!.slice(1);
      if (!id) return;
      const el = document.getElementById(id);
      if (el) {
        e.preventDefault();
        lenis.scrollTo(el, { offset: -64 });
      }
    };
    document.addEventListener("click", onClick);

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      if (spotRaf) cancelAnimationFrame(spotRaf);
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("click", onClick);
      lenis.destroy();
    };
  }, []);

  return null;
}
