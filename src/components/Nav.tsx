"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IconMenu, IconClose, IconArrowRight } from "./Icons";
import { ScrollProgress, Magnetic } from "./Interactions";

const LINKS = [
  { href: "/services", label: "Services" },
  { href: "/work", label: "Work" },
  { href: "/team", label: "Team" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className="fixed inset-x-0 top-0 z-50"
      style={{
        background: scrolled ? "rgba(8,9,10,0.82)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: `1px solid ${scrolled ? "var(--hairline)" : "transparent"}`,
        transition: "background .2s ease, border-color .2s ease",
      }}
    >
      <nav className="container-cw flex h-16 items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-[10px]"
          style={{ color: "var(--color-paper)" }}
        >
                    <img src="/logo-mark-dark.png" alt="" width={26} height={14} style={{ height: 14, width: "auto" }} />
          <span
            style={{
              fontSize: 16,
              fontWeight: 510,
              letterSpacing: "-0.011em",
            }}
          >
            CWorks
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-1 md:flex">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="nav-link"
              data-active={pathname === l.href || pathname.startsWith(l.href + "/")}
            >
              {l.label}
            </Link>
          ))}
          <Magnetic className="ml-3">
            <Link href="/contact" className="btn-white">
              Start a project
            </Link>
          </Magnetic>
        </div>

        {/* Mobile trigger */}
        <button
          className="md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          style={{ color: "var(--color-mist)" }}
        >
          {open ? <IconClose width={22} height={22} /> : <IconMenu width={22} height={22} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden"
            style={{
              background: "rgba(8,9,10,0.97)",
              borderBottom: "1px solid var(--hairline)",
              overflow: "hidden",
            }}
          >
            <div className="container-cw flex flex-col py-4">
              {LINKS.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="flex items-center justify-between py-3"
                  style={{
                    fontSize: 15,
                    color: pathname === l.href ? "var(--color-paper)" : "var(--color-mist)",
                    borderBottom: "1px solid var(--hairline)",
                  }}
                >
                  {l.label}
                  <IconArrowRight width={16} height={16} style={{ color: "var(--color-ash)" }} />
                </Link>
              ))}
              <Link href="/contact" className="btn-acid mt-4 self-start">
                Start a project
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <ScrollProgress />
    </header>
  );
}
