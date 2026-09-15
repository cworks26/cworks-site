"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/* Smooth wheel (Lenis) + "ease into sections" landing.

   Timing model (tuned per user feedback: respond instantly, glide slow):
   - The catch is keyed to INPUT ending, not to velocity dying. Last
     wheel/touch event + ~80ms → the glide begins, blending from Lenis's
     natural momentum into an easeInOutCubic sweep (gentle pickup, long
     soft landing, 0.9–1.5s distance-proportional).
   - Directional: down-gesture lands on the next section top (a slight
     overshoot INTO a section still lands on it); up-gesture the previous.
   - Free zones: stops further than 1.1 viewports from any boundary stay
     put — that keeps the pinned pricing decks freely traversable.
   - No CSS scroll-snap (fights smoothed scrolling). No JS / reduced
     motion → native scrolling. */
export default function LenisProvider() {
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.4,
    });

    // ---- anchors glide too ------------------------------------------------
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute("href")!.slice(1);
      const el = document.getElementById(id);
      if (el) {
        e.preventDefault();
        lenis.scrollTo(el, { offset: -64 });
      }
    };
    document.addEventListener("click", onClick);

    // ---- input tracking ---------------------------------------------------
    let lastInput = 0;
    let dir: 1 | -1 = 1;
    const markInput = (delta: number) => {
      lastInput = performance.now();
      if (Math.abs(delta) > 2) dir = delta > 0 ? 1 : -1;
    };
    const onWheel = (e: WheelEvent) => markInput(e.deltaY);
    const onTouchMove = (e: TouchEvent) => {
      const t = e.touches[0];
      if (t && t.clientY != null) markInput(1);
    };
    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });

    // ---- ease-into-sections engine ----------------------------------------
    const snapTargets = () =>
      Array.from(
        document.querySelectorAll<HTMLElement>("main section, main header, footer")
      ).filter(
        (el) => el.parentElement?.classList.contains("page-enter") || el.tagName === "FOOTER"
      );

    let idle: ReturnType<typeof setTimeout> | undefined;
    let snapping = false;

    const easeInOutCubic = (t: number) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    const easeInto = () => {
      if (snapping) return;
      const vh = window.innerHeight;
      const y = window.scrollY;
      const tops = snapTargets()
        .map((t) => t.getBoundingClientRect().top + y)
        .sort((a, b) => a - b);

      let candidate: number | null = null;
      if (dir > 0) {
        // next boundary below — a small overshoot INTO a section still lands on it
        for (const t of tops) {
          if (t > y - vh * 0.5) {
            candidate = t;
            break;
          }
        }
      } else {
        for (let i = tops.length - 1; i >= 0; i--) {
          if (tops[i] < y + vh * 0.5) {
            candidate = tops[i];
            break;
          }
        }
      }
      if (candidate === null) return;

      const dist = Math.abs(candidate - y);
      if (dist < 4 || dist > vh * 1.1) return; // already there / free zone

      snapping = true;
      lenis.scrollTo(candidate, {
        duration: Math.min(1.5, 0.9 + (dist / vh) * 0.6),
        easing: easeInOutCubic,
        onComplete: () => {
          snapping = false;
        },
      });
    };

    const onScroll = ({ velocity }: { velocity: number }) => {
      if (snapping) return;
      clearTimeout(idle);
      const sinceInput = performance.now() - lastInput;
      if (sinceInput < 80) return; // fingers still on the wheel
      if (Math.abs(velocity) > 2.5) return; // momentum still hot — let it breathe
      idle = setTimeout(easeInto, 40); // near-instant response
    };
    lenis.on("scroll", onScroll as never);

    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(idle);
      lenis.off("scroll", onScroll as never);
      document.removeEventListener("click", onClick);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchmove", onTouchMove);
      lenis.destroy();
    };
  }, []);

  return null;
}
