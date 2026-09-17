import type { Metadata } from "next";
import site from "@/content/site.json";
import PageHead from "@/components/PageHead";
import { Reveal, RevealGroup, RevealItem } from "@/components/Motion";
import { CTABand } from "@/components/sections";
import { Tilt } from "@/components/Interactions";
import {
  IconArrowUpRight,
  IconPlay,
  IconCart,
  IconPulse,
  IconGraduation,
} from "@/components/Icons";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Products and platforms built by CWorks — Vybent event ticketing, OAE Inventory, and client websites from Kampala, Uganda.",
};

export default function WorkPage() {
  return (
    <>
      <PageHead
        beams
        eyebrow="Work"
        title="Products we've shipped, in production."
        body="We'd rather show you the software than tell you about it. Here's what we've built and where it's running."
      >
        <nav aria-label="Jump to project" className="mt-10 flex flex-wrap gap-2">
          {[
            ["Ticketing", "#vybent"],
            ["Inventory", "#oae"],
            ["Websites", "#shipped"],
            ["Dashboards", "#vybent"],
            ["Databases", "#oae"],
          ].map(([t, href]) => (
            <a key={t} href={href} className="pill pill-link">
              {t}
            </a>
          ))}
        </nav>
      </PageHead>

      {/* Feature: Vybent */}
      <section id="vybent" className="section scroll-mt-24" style={{ borderTop: "1px solid var(--hairline)" }}>
        <div className="container-cw">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <span className="badge">Flagship product</span>
                <h2 className="t-heading mt-4">Vybent</h2>
              </div>
              <p className="t-label max-w-[30ch]">
                Event ticketing for concerts, festivals, and sports
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="frame mt-10">
              <div className="chrome">
                <span className="chrome-dot" />
                <span className="chrome-dot" />
                <span className="chrome-dot" />
                <span className="t-mono ml-2" style={{ color: "var(--color-ash)", fontSize: 11 }}>
                  vybent — motion graphics
                </span>
              </div>
              <div>
                <div className="kenburns relative aspect-[16/9] overflow-hidden">
                  <video
                    className="h-full w-full object-cover"
                    src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/videos/vybent-hero.mp4`}
                    poster="/videos/vybent-hero.jpg"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    aria-label="Vybent motion graphics reel"
                  />
                  <span className="absolute bottom-3 left-3 pill" style={{ background: "rgba(8,9,10,0.7)" }}>
                    <IconPlay width={10} height={10} />
                    Ticketing flow
                  </span>
                </div>
                
              </div>
            </div>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1fr]">
            <Reveal>
              <div>
                <p className="t-body" style={{ color: "var(--color-fog)" }}>
                  Vybent is an end-to-end ticketing platform for live events:
                  tiered tickets including VIP and VVIP, mobile check-in at the
                  gate, and a live sales dashboard that organisers watch in real
                  time as tickets move. Built to hold up on event night, not just
                  in a demo.
                </p>
                <div className="mt-8 flex flex-wrap gap-2">
                  {["Tiered ticketing", "VIP / VVIP tiers", "Mobile check-in", "Live sales", "Uganda-built"].map(
                    (t) => (
                      <span key={t} className="pill">
                        {t}
                      </span>
                    )
                  )}
                </div>
              </div>
            </Reveal>

            <RevealGroup className="flex flex-col">
              {[
                ["The problem", "Event organisers were selling on paper lists and WhatsApp — no reliable count, no gate control, no visibility on sales."],
                ["What we built", "A ticketing platform with tiered pricing, mobile check-in, and a live dashboard for organisers."],
                ["Where it stands", "In active use for events, with the ad campaign and product run by the CWorks team."],
              ].map(([t, b]) => (
                <RevealItem key={t}>
                  <div className="py-5" style={{ borderTop: "1px solid var(--hairline)" }}>
                    <p style={{ fontSize: 15, fontWeight: 510, color: "var(--color-paper)" }}>{t}</p>
                    <p className="t-body-sm mt-2">{b}</p>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>
      </section>

      {/* Feature: OAE */}
      <section id="oae" className="section scroll-mt-24" style={{ borderTop: "1px solid var(--hairline)" }}>
        <div className="container-cw">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center">
            <Reveal>
              <div>
                <span className="badge">Custom system</span>
                <h2 className="t-heading mt-4">OAE Inventory</h2>
                <p className="t-body mt-6" style={{ color: "var(--color-fog)" }}>
                  A stock and inventory management system for a client operation
                  that had outgrown spreadsheets. Items, quantities, movement
                  history, and reorder alerts — in one place, accessible to the
                  people who actually use it every day.
                </p>
                <div className="mt-8 flex flex-wrap gap-2">
                  {["Stock control", "Movement history", "Reorder alerts", "Role-based access"].map((t) => (
                    <span key={t} className="pill">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <Tilt className="frame">
                <div className="chrome">
                  <span className="chrome-dot" />
                  <span className="chrome-dot" />
                  <span className="chrome-dot" />
                  <span className="t-mono ml-2" style={{ color: "var(--color-ash)", fontSize: 11 }}>
                    oae — inventory management
                  </span>
                </div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/images/work/oae.jpg`}
                  alt="OAE Inventory management system sign-in screen"
                  className="w-full"
                  style={{ display: "block" }}
                />
              </Tilt>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Client websites */}
      <section id="shipped" className="section scroll-mt-24" style={{ borderTop: "1px solid var(--hairline)" }}>
        <div className="container-cw">
          <Reveal>
            <p className="t-label" >
              Websites &amp; products
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="t-heading mt-4">Shipped by the team.</h2>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
            {site.work
              .filter((w) => w.media === "link")
              .map((w, i) => (
                <Reveal key={w.name} delay={i * 0.06}>
                  <a
                    href={w.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="card card-lift spotlight group flex h-full flex-col justify-between"
                    style={{ minHeight: 220 }}
                  >
                    <div>
                      <div className="flex items-start justify-between gap-4">
                        <span className="badge">{w.kind}</span>
                        <span
                          className="transition-transform duration-200 group-hover:-translate-y-[2px] group-hover:translate-x-[2px]"
                          style={{ color: "var(--color-ash)" }}
                        >
                          <IconArrowUpRight width={16} height={16} />
                        </span>
                      </div>
                      <p
                        className="mt-5"
                        style={{
                          fontSize: 24,
                          fontWeight: 510,
                          letterSpacing: "-0.012em",
                          color: "var(--color-paper)",
                        }}
                      >
                        {w.name}
                      </p>
                      <p className="t-body-sm mt-3">{w.desc}</p>
                    </div>
                    <p className="t-label mt-8">{w.note}</p>
                  </a>
                </Reveal>
              ))}
          </div>

          {/* Range of work — stated as capability, not fake client logos */}
          <Reveal delay={0.1}>
            <p
              className="t-label mt-24"
              
            >
              Also in range
            </p>
          </Reveal>
          <RevealGroup className="mt-8 grid grid-cols-1 gap-x-10 gap-y-10 md:grid-cols-3">
            {[
              { icon: IconCart, t: "Retail & commerce", d: "Ordering, stock, and payment flows for shops and distributors." },
              { icon: IconPulse, t: "Healthcare", d: "Patient records and clinic dashboards that stay usable under pressure." },
              { icon: IconGraduation, t: "Education", d: "Enrolment, results, and school management systems." },
            ].map((c) => (
              <RevealItem key={c.t}>
                <div className="pt-6" style={{ borderTop: "1px solid var(--hairline)" }}>
                  <span style={{ color: "var(--color-fog)" }}>
                    <c.icon width={20} height={20} />
                  </span>
                  <p
                    className="mt-4"
                    style={{ fontSize: 17, fontWeight: 510, color: "var(--color-paper)" }}
                  >
                    {c.t}
                  </p>
                  <p className="t-body-sm mt-2">{c.d}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <CTABand />
    </>
  );
}
