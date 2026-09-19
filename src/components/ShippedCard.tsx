"use client";

import { useRef, useState, type ReactNode } from "react";

/* Shipped-by-the-team card.
   Hover (or first tap on touch) expands a SQUARE whose side = the card's own
   width into the project image; the slot reserves that space so the section
   grows downward and nothing overlaps. Second tap on touch opens the site. */

export default function ShippedCard({
  href,
  name,
  image,
  children,
}: {
  href: string;
  name: string;
  image?: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const armed = useRef(false);

  return (
    <div
      className="shipped-slot"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
    >
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${name} — visit site`}
        className={`card card-lift spotlight group shipped-panel flex h-full flex-col justify-between${open ? " is-open" : ""}`}
        style={{ minHeight: 220 }}
        onClick={(e) => {
          if (typeof window === "undefined") return;
          if (!window.matchMedia("(hover: none)").matches) return; // mouse: plain link
          if (!armed.current) {
            e.preventDefault(); // first tap = expand
            armed.current = true;
            setOpen(true);
          }
        }}
      >
        {children}

      {image && (
        <span
          aria-hidden
          className="work-expand"
          style={{ backgroundImage: `url(${image})` }}
        >
          <span className="work-expand-meta">
            <span className="pill">{name}</span>
            <span className="pill">Visit site ↗</span>
          </span>
        </span>
      )}
      </a>

    </div>
  );
}
