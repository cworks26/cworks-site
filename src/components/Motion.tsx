"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

/* ==========================================================================
   Motion primitives — restrained, one effect per section.

   These are progressive enhancements: markup ships fully visible, and the
   animations only switch on once the `js` class is present and the element
   scrolls into view. Crawlers, no-JS visitors, and screenshot tools all get
   the complete page.
   ========================================================================== */

function useInViewOnce<T extends HTMLElement>(margin = "-60px") {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) {
      el.classList.add("is-in");
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            el.classList.add("is-in");
            io.disconnect();
          }
        }
      },
      { rootMargin: `0px 0px ${margin} 0px` }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [margin]);

  return ref;
}

/** Fade + rise when the element scrolls into view. */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const ref = useInViewOnce<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`reveal${className ? ` ${className}` : ""}`}
      style={{ ["--reveal-delay" as string]: `${delay * 1000}ms` }}
    >
      {children}
    </div>
  );
}

/** Container whose direct children rise in a staggered sequence (CSS-driven). */
export function RevealGroup({
  children,
  className,
  stagger = 0.06,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
}) {
  const ref = useInViewOnce<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`reveal-group${className ? ` ${className}` : ""}`}
      style={{
        ["--group-step" as string]: `${stagger * 1000}ms`,
        ["--group-delay" as string]: `${delay * 1000}ms`,
      }}
    >
      {children}
    </div>
  );
}

/** Child of RevealGroup — plain wrapper; the stagger lives in CSS. */
export function RevealItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
  y?: number;
}) {
  return <div className={className}>{children}</div>;
}

/** Number that counts up once when scrolled into view. */
export function CountUp({
  to,
  suffix = "",
  duration = 1.4,
}: {
  to: number;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  // Starts at the real value so the markup is correct without JS.
  const [val, setVal] = useState(to);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) return;

    let raf = 0;
    let started = false;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting || started) continue;
          started = true;
          io.disconnect();

          const start = performance.now();
          setVal(0);

          const tick = (now: number) => {
            const p = Math.min((now - start) / (duration * 1000), 1);
            const eased = 1 - Math.pow(1 - p, 3);
            setVal(Math.round(eased * to));
            if (p < 1) raf = requestAnimationFrame(tick);
          };
          raf = requestAnimationFrame(tick);
        }
      },
      { rootMargin: "0px 0px -40px 0px" }
    );

    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to, duration]);

  return (
    <span ref={ref}>
      {val}
      {suffix}
    </span>
  );
}

/** Slow vertical drift — atmospheric, never distracting (CSS-driven). */
export function Drift({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
  amount?: number;
  duration?: number;
}) {
  return <div className={`drift${className ? ` ${className}` : ""}`}>{children}</div>;
}

/** Wrapper that nudges content toward the cursor on hover. */
export function Magnetic({
  children,
  className,
  strength = 6,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || window.matchMedia("(pointer: coarse)").matches) return;

    const move = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const dx = ((e.clientX - (r.left + r.width / 2)) / r.width) * strength * 2;
      const dy = ((e.clientY - (r.top + r.height / 2)) / r.height) * strength * 2;
      el.style.transform = `translate3d(${dx}px, ${dy}px, 0)`;
    };
    const leave = () => {
      el.style.transform = "translate3d(0, 0, 0)";
    };

    el.style.transition = "transform .25s cubic-bezier(.16,1,.3,1)";
    el.addEventListener("mousemove", move);
    el.addEventListener("mouseleave", leave);
    return () => {
      el.removeEventListener("mousemove", move);
      el.removeEventListener("mouseleave", leave);
    };
  }, [strength]);

  return (
    <div ref={ref} className={className} style={{ display: "inline-block" }}>
      {children}
    </div>
  );
}

/** A thin line that draws itself across when in view. */
export function DrawLine({ className }: { className?: string }) {
  const ref = useInViewOnce<HTMLDivElement>();
  return <div ref={ref} className={`${className ?? "rule"} draw-line`} />;
}
