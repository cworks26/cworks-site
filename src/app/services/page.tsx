import type { Metadata } from "next";
import Link from "next/link";
import site from "@/content/site.json";
import PageHead from "@/components/PageHead";
import ServiceNav from "@/components/ServiceNav";
import PinnedDeck from "@/components/PinnedDeck";
import { Reveal, RevealGroup, RevealItem } from "@/components/Motion";
import { CTABand } from "@/components/sections";
import {
  serviceIcons,
  IconCheck,
  IconArrowUpRight,
  IconClock,
} from "@/components/Icons";

export const metadata: Metadata = {
  title: "Services & Pricing",
  description:
    "Web development, UI/UX design, graphic design, database management, and custom system building — with transparent UGX pricing from CWorks in Kampala.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHead
        beams
        eyebrow="Services"
        title="Everything you need to get online and run properly."
        body="Five service lines, each one delivered end-to-end. Pick the piece you need — or hand us the whole thing."
      >
        <ServiceNav />
      </PageHead>

      {/* Service sections */}
      {site.services.map((s, idx) => {
        const Icon = serviceIcons[s.slug];
        const alt = idx % 2 === 1;
        return (
          <section
            key={s.slug}
            id={s.slug}
            className="section"
            style={{ borderTop: "1px solid var(--hairline)", scrollMarginTop: 80 }}
          >
            <div className="container-cw relative">
              {/* Enquire — own row, top right */}
              <div className="flex justify-end">
                <Reveal delay={0.12}>
                  <Link href="/contact" className="btn-ghost shrink-0">
                    Enquire about {s.name.toLowerCase()}
                  </Link>
                </Reveal>
              </div>

              {/* Sticky context (left) + pricing deck (right) */}
              <div className="mt-4 grid grid-cols-1 gap-12 lg:grid-cols-[1.05fr_1fr] lg:items-start">
                {/* Left — stays in place while the pricing deck scrolls */}
                <div className="lg:sticky lg:top-[14vh]">
                  <Reveal>
                    <span
                      className="flex items-center justify-center"
                      style={{
                        width: 44,
                        height: 44,
                        borderRadius: 12,
                        background: "rgba(255,255,255,0.03)",
                        boxShadow: "rgb(35,37,42) 0 0 0 1px inset",
                        color: "var(--color-mist)",
                      }}
                    >
                      <Icon width={20} height={20} />
                    </span>
                  </Reveal>
                  <Reveal delay={0.05}>
                    <h2 className="t-subheading mt-5">{s.name}</h2>
                  </Reveal>
                  <Reveal delay={0.1}>
                    <p className="t-body mt-4" style={{ color: "var(--color-fog)" }}>
                      {s.short}
                    </p>
                  </Reveal>
                  <div className="mt-10">
                    <p className="t-label mb-6" >
                      What&apos;s included
                    </p>
                    <ul className="flex flex-col">
                      {s.included.map((inc, i) => (
                        <li
                          key={inc.t}
                          className="flex gap-4 py-5"
                          style={{ borderTop: i === 0 ? "1px solid var(--hairline)" : "1px solid var(--hairline)" }}
                        >
                          <span
                            className="mt-[3px] shrink-0"
                            style={{ color: "var(--color-pulse)" }}
                          >
                            <IconCheck width={15} height={15} />
                          </span>
                          <span>
                            <span
                              style={{
                                display: "block",
                                fontSize: 15,
                                fontWeight: 510,
                                color: "var(--color-paper)",
                              }}
                            >
                              {inc.t}
                            </span>
                            <span className="t-body-sm mt-2 block">{inc.b}</span>
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Right — pricing deck scrolls through while left holds */}
                <Reveal delay={0.08}>
                  <div>
                    <p className="t-label mb-6" >
                      Pricing
                    </p>
                    <PinnedDeck>
                      {s.pricing.map((p) => (
                        <div
                          key={p.tier}
                          className="card card-lift spotlight"
                          style={
                            p.popular
                              ? { boxShadow: "var(--color-acid) 0 0 0 1px inset" }
                              : undefined
                          }
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <p
                                style={{
                                  fontSize: 15,
                                  fontWeight: 510,
                                  color: "var(--color-paper)",
                                }}
                              >
                                {p.tier}
                              </p>
                              <p className="t-label mt-1">{p.price_note}</p>
                            </div>
                            {p.popular && <span className="badge">Most popular</span>}
                          </div>

                          <p
                            className="mt-4"
                            style={{
                              fontSize: 26,
                              fontWeight: 510,
                              letterSpacing: "-0.022em",
                              color: "var(--color-paper)",
                            }}
                          >
                            {p.price}
                          </p>

                          <p className="t-body-sm mt-3">{p.desc}</p>

                          <ul className="mt-5 flex flex-col gap-[10px]">
                            {p.features.map((f) => (
                              <li key={f} className="flex items-start gap-3">
                                <span className="mt-[3px] shrink-0" style={{ color: "var(--color-ash)" }}>
                                  <IconCheck width={13} height={13} />
                                </span>
                                <span className="t-caption" style={{ color: "var(--color-mist)" }}>
                                  {f}
                                </span>
                              </li>
                            ))}
                          </ul>

                          <Link
                            href="/contact"
                            className={p.popular ? "btn btn-acid mt-6 w-full" : "btn btn-ghost mt-6 w-full"}
                          >
                            Get started
                          </Link>
                        </div>
                      ))}
                    </PinnedDeck>
                    <p className="t-label mt-5 flex items-start gap-2">
                      <IconClock width={14} height={14} />
                      All prices in UGX. 50% deposit to begin, balance due on launch.
                    </p>
                  </div>
                </Reveal>
              </div>
            </div>
          </section>
        );
      })}

      {/* FAQ */}
      <section className="section" style={{ borderTop: "1px solid var(--hairline)" }}>
        <div className="container-cw">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <Reveal>
                <p className="t-label" >
                  Questions
                </p>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="t-heading mt-4 max-w-[14ch]">Answers before you ask.</h2>
              </Reveal>
            </div>

            <RevealGroup className="flex flex-col">
              {site.faq.map((f, i) => (
                <RevealItem key={f.q}>
                  <details
                    className="group py-6"
                    style={{ borderTop: i === 0 ? "1px solid var(--hairline)" : "1px solid var(--hairline)" }}
                  >
                    <summary
                      className="flex cursor-pointer list-none items-center justify-between gap-6"
                      style={{ fontSize: 17, fontWeight: 510, color: "var(--color-paper)" }}
                    >
                      {f.q}
                      <span
                        className="shrink-0 transition-transform duration-200 group-open:rotate-45"
                        style={{ color: "var(--color-ash)" }}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                          <path d="M12 5v14M5 12h14" />
                        </svg>
                      </span>
                    </summary>
                    <p className="t-body-sm mt-4 max-w-[62ch]" style={{ color: "var(--color-fog)" }}>
                      {f.a}
                    </p>
                  </details>
                </RevealItem>
              ))}
              <div className="rule" />
            </RevealGroup>
          </div>
        </div>
      </section>

      {/* Add-ons */}
      <section className="section-sm" style={{ borderTop: "1px solid var(--hairline)" }}>
        <div className="container-cw">
          <Reveal>
            <p className="t-label" >
              Add-ons
            </p>
          </Reveal>
          <RevealGroup className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
            {[
              {
                t: "Copywriting",
                d: "We write the words for you — headlines, service descriptions, and page copy that reads like a human wrote it.",
              },
              {
                t: "Maintenance retainer",
                d: "Monthly updates, fixes, and small changes so your site keeps working after launch.",
              },
              {
                t: "Brand kit",
                d: "Logo files, colour palette, type scale, and usage rules in one handover pack.",
              },
              {
                t: "Training & handover",
                d: "A recorded walkthrough plus a written guide so your team can run the system day to day.",
              },
            ].map((a) => (
              <RevealItem key={a.t}>
                <div className="card spotlight h-full">
                  <p style={{ fontSize: 15, fontWeight: 510, color: "var(--color-paper)" }}>{a.t}</p>
                  <p className="t-body-sm mt-3">{a.d}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
          <Reveal delay={0.1}>
            <a
              href={site.brand.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-10 inline-flex items-center gap-2 transition-colors hover:text-[var(--color-paper)]"
              style={{ fontSize: 14, color: "var(--color-mist)" }}
            >
              Ask about an add-on on WhatsApp
              <IconArrowUpRight width={15} height={15} />
            </a>
          </Reveal>
        </div>
      </section>

      <CTABand />
    </>
  );
}
