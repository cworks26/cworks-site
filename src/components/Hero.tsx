"use client";

import Link from "next/link";
import { IconArrowRight } from "./Icons";
import { Magnetic } from "./Interactions";
import GridDistortion from "./GridDistortion";

/* ==========================================================================
   Hero — full-screen. Real footage background (placeholder until the client
   supplies the final film), words anchored bottom-left. SSR-complete; the
   kinetic entrance is CSS-only enhancement.
   ========================================================================== */

const EASE = [0.16, 1, 0.3, 1] as const;

const WORDS: { w: string; d: number; italic?: boolean }[] = [
  { w: "Systems", d: 60 },
  { w: "Ugandan", d: 120 },
  { w: "businesses", d: 180 },
  { w: "actually", d: 240, italic: true },
  { w: "run", d: 300 },
  { w: "on.", d: 360 },
];

export default function Hero() {
  return (
    <section className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden pt-[120px] pb-[9vh]">
      {/* background — mouse-reactive WebGL grid distortion over the footage still */}
      <div aria-hidden className="absolute inset-0">
        <GridDistortion
          imageSrc={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/videos/hero-bg.jpg`}
          grid={12}
          mouse={0.12}
          strength={0.12}
          relaxation={0.92}
        />
        {/* legibility: void gradient from the bottom + brand-blue cast */}
        <div
          className="absolute inset-0"
          style={{
            pointerEvents: "none",
            background:
              "linear-gradient(to top, rgba(8,9,10,0.96) 0%, rgba(8,9,10,0.72) 34%, rgba(8,9,10,0.38) 62%, rgba(8,9,10,0.55) 100%)",
          }}
        />
        <div
          className="absolute inset-0 mix-blend-soft-light"
          style={{ pointerEvents: "none", background: "rgba(63,185,236,0.18)" }}
        />
      </div>

      {/* words — bottom left */}
      <div className="container-x pointer-events-none relative">
        <p className="eyebrow rise" style={{ ["--rise-delay" as string]: "40ms" }}>
          A software studio in Kampala, Uganda
        </p>

        <h1 className="mt-[22px] max-w-[16ch] text-[clamp(2rem,4.6vw,4.25rem)] font-[510] leading-[1.03] tracking-[-0.035em] text-[color:var(--text-primary)]">
          {WORDS.map(({ w, d, italic }) => (
            <span
              key={w}
              className={`kinetic${italic ? " serif-accent" : ""}`}
              style={{ ["--rise-delay" as string]: `${d}ms` }}
            >
              {w}
              {"\u00A0"}
            </span>
          ))}
        </h1>

        <p
          className="rise mt-[22px] max-w-[52ch] text-[17px] leading-[1.6] text-[color:var(--text-secondary)]"
          style={{ ["--rise-delay" as string]: "430ms" }}
        >
          CWorks designs, builds and maintains custom systems — websites, stores,
          databases and the tools that run a business.
        </p>

        <div
          className="rise pointer-events-auto mt-[30px] flex flex-wrap items-center gap-x-8 gap-y-4"
          style={{ ["--rise-delay" as string]: "500ms" }}
        >
          <Magnetic>
            <Link href="/contact" className="btn btn-acid glow-pulse">
              Start a project
            </Link>
          </Magnetic>
          <Link href="/work" className="link-arrow">
            See the work
            <IconArrowRight width={14} height={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
