"use client";

import { useLayoutEffect, useRef, useCallback, type ReactNode } from "react";

/* ScrollStack — TS-adapted for CWorks.
   Full-page variant: cards pin and stack as the PAGE scrolls.
   No internal Lenis — the site's LenisProvider owns window scrolling;
   we just listen to scroll/resize and apply transforms.

   Math model (pure function of scrollY — no feedback):
   - Card positions are CACHED from the offsetTop chain (layout boxes,
     unaffected by transforms or ancestor Reveal transforms), re-measured
     on resize / image load. Never getBoundingClientRect per frame.
   - Card i pins when its natural top reaches restTop_i = pinTop + i*stackGap;
     while pinned ty grows with scroll (glued to the viewport) up to cap_i,
     after which the whole frozen stack scrolls away naturally.
   - cap_i = (top_{n-1} - top_i) - (n-1-i)*stackGap: everything freezes the
     moment the LAST card arrives, so the stack releases as one block.
   - Scale: card i shrinks toward (1 - (n-1-i)*itemScale) only while the NEXT
     card travels up to cover it — never while it is still approaching. */

export const ScrollStackItem = ({ children, itemClassName = "" }: { children: ReactNode; itemClassName?: string }) => (
  <div className={`scroll-stack-card ${itemClassName}`.trim()}>{children}</div>
);

type Props = {
  children: ReactNode;
  className?: string;
  /** gap between in-flow cards (px) */
  itemDistance?: number;
  /** how much each deeper card shrinks once pinned */
  itemScale?: number;
  /** px offset between pinned cards (top strip each earlier card peeks) */
  itemStackDistance?: number;
  /** where the pinned stack rests, as % of viewport height from the top */
  stackPosition?: string;
};

const ScrollStack = ({
  children, className = "", itemDistance = 100, itemScale = 0.03, itemStackDistance = 30,
  stackPosition = "12%",
}: Props) => {
  const cardsRef = useRef<HTMLElement[]>([]);
  const posRef = useRef<{ tops: number[]; caps: number[]; spans: number[]; pinTop: number }>({
    tops: [], caps: [], spans: [], pinTop: 0,
  });
  const rafRef = useRef<number | null>(null);

  /** Measure untransformed layout positions. offsetTop ignores transforms. */
  const measure = useCallback(() => {
    const cards = cardsRef.current;
    const n = cards.length;
    if (!n) return;
    const docTop = (el: HTMLElement) => {
      let t = 0, node: HTMLElement | null = el;
      while (node) { t += node.offsetTop; node = node.offsetParent as HTMLElement | null; }
      return t;
    };
    const pinTop = (parseFloat(stackPosition) / 100) * window.innerHeight;
    const hold = 0.45 * window.innerHeight; // all cards stay glued this long after the last one arrives
    const tops = cards.map(docTop);
    const caps = tops.map((t, i) => Math.max(0, tops[n - 1] - t - (n - 1 - i) * itemStackDistance) + hold);
    // span_i = scroll distance between card i+1 starting to cover card i and
    // card i+1 fully arriving (= spacing between arrivals)
    const spans = tops.map((t, i) =>
      i < n - 1 ? Math.max(1, tops[i + 1] - t - itemStackDistance) : 1
    );
    posRef.current = { tops, caps, spans, pinTop };
  }, [itemStackDistance, stackPosition]);

  const update = useCallback(() => {
    const cards = cardsRef.current;
    const { tops, caps, spans, pinTop } = posRef.current;
    const n = cards.length;
    if (!n || tops.length !== n) return;
    const y = window.scrollY;

    for (let i = 0; i < n; i++) {
      const restTop = pinTop + i * itemStackDistance;
      const trigger = tops[i] - restTop; // scrollY at which card i first touches its rest position
      const ty = Math.min(Math.max(y - trigger, 0), caps[i]);

      // shrink card i only while card i+1 travels up to cover it
      let scale = 1;
      if (i < n - 1) {
        const nextTrigger = tops[i + 1] - restTop - itemStackDistance;
        const p = Math.min(Math.max((y - (nextTrigger - spans[i])) / spans[i], 0), 1);
        scale = 1 - (n - 1 - i) * itemScale * p;
      }

      const card = cards[i];
      card.style.transform = `translate3d(0, ${Math.round(ty * 100) / 100}px, 0) scale(${Math.round(scale * 1000) / 1000})`;
    }
  }, [itemScale, itemStackDistance]);

  useLayoutEffect(() => {
    cardsRef.current = Array.from(document.querySelectorAll<HTMLElement>(".scroll-stack-card"));
    const cards = cardsRef.current;
    cards.forEach((card, i) => {
      if (i < cards.length - 1) card.style.marginBottom = `${itemDistance}px`;
      card.style.zIndex = String(i + 1); // later cards always cover earlier ones
      card.style.transformOrigin = "top center";
      card.style.backfaceVisibility = "hidden";
      card.style.willChange = "transform";
    });
    // Reduced motion: pinning is itself motion (WCAG 2.3.3) — serve a plain
    // static stack: layout (margins/z-index) stays, transforms/listeners don't.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return () => {
        cardsRef.current = [];
      };
    }
    measure();

    // re-measure when card heights settle (images, fonts) or on resize
    let ro: ResizeObserver | undefined;
    if (typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(() => measure());
      cards.forEach((c) => ro!.observe(c));
    }
    const onImg = (e: Event) => {
      if ((e.target as HTMLElement)?.closest?.(".scroll-stack-card")) measure();
    };
    document.addEventListener("load", onImg, true);

    let pending = false;
    const onScroll = () => {
      if (pending) return;
      pending = true;
      rafRef.current = requestAnimationFrame(() => { pending = false; update(); });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    const onResize = () => { measure(); update(); };
    window.addEventListener("resize", onResize);
    update();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      ro?.disconnect();
      document.removeEventListener("load", onImg, true);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      cards.forEach((c) => { c.style.transform = ""; c.style.marginBottom = ""; });
      cardsRef.current = [];
    };
  }, [itemDistance, measure, update]);

  return (
    <div className={`scroll-stack-window ${className}`.trim()}>
      <div className="scroll-stack-inner">
        {children}
        <div className="scroll-stack-end" />
      </div>
    </div>
  );
};

export default ScrollStack;
