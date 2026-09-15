"use client";

import { useEffect, useState } from "react";
import site from "@/content/site.json";

/* Service jump-nav with a live active state.
   Anchors work without JS; the observer only shows where you are. */
export default function ServiceNav() {
  const [active, setActive] = useState<string>(site.services[0].slug);

  useEffect(() => {
    const sections = site.services
      .map((s) => document.getElementById(s.slug))
      .filter((el): el is HTMLElement => Boolean(el));

    if (!sections.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0, 0.25, 0.5, 1] },
    );

    sections.forEach((s) => io.observe(s));

    // Clear the active state once the reader moves past the last section
    const onScroll = () => {
      const last = sections[sections.length - 1];
      if (window.scrollY + 140 >= last.offsetTop + last.offsetHeight) setActive("");
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <nav aria-label="Jump to a service" className="mt-10 flex flex-wrap gap-2">
      {site.services.map((s) => {
        const on = active === s.slug;
        return (
          <a
            key={s.slug}
            href={`#${s.slug}`}
            aria-current={on ? "true" : undefined}
            className="pill pill-link"
            style={
              on
                ? {
                    color: "var(--color-void)",
                    background: "var(--color-acid)",
                    borderColor: "var(--color-acid)",
                  }
                : undefined
            }
          >
            {s.name}
          </a>
        );
      })}
    </nav>
  );
}
