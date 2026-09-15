"use client";

import { Children, useEffect, useRef, useState } from "react";

/* Pinned in-section scrolling: the deck locks in place while the visitor
   scrolls through its cards one by one, then releases to the next section.
   Enhancement only — without JS (or on mobile / reduced motion) it renders
   as a plain stacked list. */
export default function PinnedDeck({ children }: { children: React.ReactNode }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [active, setActive] = useState(0);
  const count = Children.count(children);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (matchMedia("(max-width: 1023px)").matches) return;
    if (count < 2) return;

    setReady(true);
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const rect = wrap.getBoundingClientRect();
        const vh = window.innerHeight;
        const total = rect.height - vh;
        if (total <= 0) return;
        const progress = Math.min(1, Math.max(0, -rect.top / total));
        setActive(Math.min(count - 1, Math.floor(progress * count)));
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [count]);

  if (!ready) return <div className="flex flex-col gap-4">{children}</div>;

  return (
    <div ref={wrapRef} style={{ height: `calc(100svh * ${count})` }}>
      <div className="sticky top-0 flex h-[100svh] flex-col justify-center">
        <div className="relative" style={{ display: "grid", alignItems: "start" }}>
          {Children.map(children, (child, i) => (
            <div
              key={i}
              aria-hidden={i !== active}
              style={{
                transition: "opacity .45s cubic-bezier(.16,1,.3,1), transform .45s cubic-bezier(.16,1,.3,1)",
                opacity: i === active ? 1 : 0,
                transform: i === active ? "none" : "translateY(14px) scale(.97)",
                pointerEvents: i === active ? "auto" : "none",
                gridArea: "1/1",
              }}
            >
              {child}
            </div>
          ))}
        </div>
        <div className="mt-5 flex items-center gap-2" aria-hidden>
          {Array.from({ length: count }).map((_, i) => (
            <span
              key={i}
              style={{
                width: i === active ? 20 : 6,
                height: 6,
                borderRadius: 999,
                background: i === active ? "var(--color-acid)" : "var(--color-graphite)",
                transition: "width .3s ease, background .3s ease",
              }}
            />
          ))}
          <span className="t-mono ml-2" style={{ fontSize: 11, color: "var(--color-ash)" }}>
            {active + 1} / {count}
          </span>
        </div>
      </div>
    </div>
  );
}
