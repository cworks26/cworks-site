import Link from "next/link";
import BeamsLayer from "./BeamsLayer";
import site from "@/content/site.json";
import { Reveal, RevealGroup, RevealItem, CountUp } from "./Motion";
import {
  serviceIcons,
  IconArrowRight,
  IconArrowUpRight,
  IconCart,
  IconPulse,
  IconPhone,
  IconGraduation,
  IconHouse,
  IconHeart,
} from "./Icons";
import { InventoryFrame, DeployFrame } from "./ProductFrame";
import { Tilt, Magnetic } from "./Interactions";
import AccordionGallery, { type AccordionItem } from "./AccordionGallery";
import ServicesHandoff from "./ServicesHandoff";

/* ---------- Trust strip --------------------------------------------------- */

export function TrustStrip() {
  const items = [
    "Vybent",
    "OAE Inventory",
    "What About Anime",
    "Kaizoq",
    "Business systems",
    "Custom databases",
  ];
  return (
    <section style={{ borderTop: "1px solid var(--hairline)", borderBottom: "1px solid var(--hairline)" }}>
      <div className="container-cw py-8">
        <div className="flex flex-col items-center gap-5 md:flex-row md:gap-10">
          <p className="t-label shrink-0" >
            Selected work &amp; practice
          </p>
          <div className="marquee w-full min-w-0 flex-1 md:w-auto" aria-hidden>
            <div className="marquee-track">
              {[...items, ...items].map((i, idx) => (
                <span key={`${i}-${idx}`} className="logo-strip shrink-0 px-6">
                  {i}
                </span>
              ))}
            </div>
          </div>
          <div className="sr-only">
            {items.map((i) => (
              <span key={i}>{i}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Section heading ----------------------------------------------- */

export function SectionHead({
  eyebrow,
  title,
  body,
  action,
}: {
  eyebrow: string;
  title: string;
  body?: string;
  action?: { href: string; label: string };
}) {
  return (
    <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
      <div className="max-w-[52ch]">
        <Reveal>
          <p className="t-label" >
            {eyebrow}
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="t-heading mt-4">{title}</h2>
        </Reveal>
        {body && (
          <Reveal delay={0.1}>
            <p className="t-body mt-5" style={{ color: "var(--color-fog)" }}>
              {body}
            </p>
          </Reveal>
        )}
      </div>
      {action && (
        <Reveal delay={0.15}>
          <Link
            href={action.href}
            className="inline-flex shrink-0 items-center gap-2 transition-colors hover:text-[var(--color-paper)]"
            style={{ fontSize: 14, color: "var(--color-mist)" }}
          >
            {action.label}
          </Link>
        </Reveal>
      )}
    </div>
  );
}

/* ---------- Services (alternating rows, never a 3-col grid) --------------- */

export function ServicesSection() {
  return (
    <section id="services" className="section services-handoff">
      {/* the ivory ground the pinned sequence reveals beneath the content */}
      <div className="services-handoff__ground" aria-hidden />
      <div className="container-cw">
        <SectionHead
          eyebrow="What we do"
          title="Five things, done properly."
          body="We keep the offer narrow on purpose. Everything we take on, we take on end-to-end — design, build, deploy, and hand over."
          action={{ href: "/services", label: "All services & pricing" }}
        />

        {/* margin-top is owned by .services-handoff__list (viewport-height scaled) */}
        <div className="services-handoff__list flex flex-col">
          {site.services.map((s, i) => {
            const Icon = serviceIcons[s.slug];
            return (
              <Reveal key={s.slug} delay={i * 0.04}>
                <Link
                  href={`/services#${s.slug}`}
                  className="spotlight group grid grid-cols-1 gap-6 py-6 md:grid-cols-[64px_1fr_1fr_auto] md:items-center"
                  style={{ borderTop: "1px solid var(--hairline)" }}
                >
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

                  <span
                    style={{
                      fontSize: 20,
                      fontWeight: 510,
                      letterSpacing: "-0.012em",
                      color: "var(--color-paper)",
                    }}
                  >
                    {s.name}
                  </span>

                  <span className="t-body-sm">{s.short}</span>

                  <span
                    className="flex items-center gap-3"
                    style={{ color: "var(--color-ash)" }}
                  >
                    <span className="t-mono hidden md:inline" style={{ fontSize: 11 }}>
                      from {s.pricing[0].price}
                    </span>
                    <IconArrowRight
                      width={16}
                      height={16}
                      className="transition-transform duration-200 group-hover:translate-x-1"
                    />
                  </span>
                </Link>
              </Reveal>
            );
          })}
          <div className="rule" />
        </div>
      </div>
      <ServicesHandoff sectionId="services" />
    </section>
  );
}

/* ---------- Industries ---------------------------------------------------- */

const INDUSTRIES = [
  { icon: IconCart, name: "Retail & commerce" },
  { icon: IconPulse, name: "Healthcare" },
  { icon: IconPhone, name: "Hospitality" },
  { icon: IconGraduation, name: "Education" },
  { icon: IconHouse, name: "Real estate" },
  { icon: IconHeart, name: "NGOs & community" },
];

export function IndustriesSection() {
  return (
    <section className="section" style={{ borderTop: "1px solid var(--hairline)" }}>
      <div className="container-cw">
        <SectionHead
          eyebrow="Where we work"
          title="Built for how Ugandan businesses operate."
          body="Every sector has its own rhythm — stock that moves daily, students enrolling each term, patients queuing. We build for those realities, not for a demo."
        />

        <RevealGroup className="mt-14 grid grid-cols-1 gap-px sm:grid-cols-2 lg:grid-cols-3">
          {INDUSTRIES.map((it) => (
            <RevealItem key={it.name}>
              <div
                className="spotlight flex h-full items-center gap-4 px-6 py-6"
                style={{ background: "var(--color-carbon)" }}
              >
                <span style={{ color: "var(--color-fog)" }}>
                  <it.icon width={20} height={20} />
                </span>
                <span style={{ fontSize: 15, color: "var(--color-mist)" }}>{it.name}</span>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}

/* ---------- Case study feature -------------------------------------------- */

export function WorkFeature() {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

  /* Vybent (video) and OAE (system) have no `image` field in site.json; both
     already have a real asset elsewhere on the site — nothing is invented. */
  const artFallback: Record<string, string> = {
    Vybent: "/videos/vybent-hero.jpg",
    "OAE Inventory": "/images/work/oae.jpg",
  };

  /* The panel window is landscape on a laptop, so the two portrait captures
     are framed on the plate (contain) rather than cropped through the middle.
     The two landscape captures crop from the left: measured column detail in
     both assets is near zero through the centre and rich on the left, so a
     centred crop left the collapsed strip looking empty. */
  const artFit: Record<string, { fit: "cover" | "contain"; position?: string }> = {
    Vybent: { fit: "cover", position: "5% center" },
    "OAE Inventory": { fit: "cover", position: "5% center" },
    "What About Anime": { fit: "contain" },
    Kaizoq: { fit: "contain" },
  };

  const panels: AccordionItem[] = site.work.map((w) => {
    const art = artFit[w.name] ?? { fit: "cover" as const };
    return {
      label: w.name,
      alt: w.kind,
      link: w.url,
      image: `${base}${w.image ?? artFallback[w.name] ?? ""}`,
      fit: art.fit,
      position: art.position,
    };
  });

  return (
    <section id="work-feature" className="section band-ivory">
      <div className="container-cw">
        <SectionHead
          eyebrow="Selected work"
          title="Real products, built by CWorks."
          body="Four products we designed, built and still run — a ticketing platform, an inventory system for a client operation, and two sites built by the team."
          action={{ href: "/work", label: "All work" }}
        />

        <div className="mt-14">
          <AccordionGallery items={panels} />
        </div>
      </div>
    </section>
  );
}

/* ---------- Process ------------------------------------------------------- */

export function ProcessSection() {
  return (
    <section className="section" style={{ borderTop: "1px solid var(--hairline)" }}>
      <div className="container-cw">
        <SectionHead
          eyebrow="How we work"
          title="A clear path from first call to launch day."
          body="No black boxes and no surprise invoices. You see the design before we write code, and you see a preview link before we go live."
        />

        <div className="mt-16 grid grid-cols-1 gap-x-16 gap-y-10 md:grid-cols-2">
          {site.process.map((p, i) => (
            <Reveal key={p.n} delay={i * 0.03}>
              <div className="flex gap-5">
                <span
                  className="t-mono shrink-0 pt-[3px]"
                  style={{ fontSize: 12, color: "var(--color-cwblue)" }}
                >
                  {p.n}
                </span>
                <div>
                  <h3 style={{ fontSize: 17, fontWeight: 590, color: "var(--color-paper)" }}>
                    {p.title}
                  </h3>
                  <p className="t-body-sm mt-2">{p.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Stats --------------------------------------------------------- */

export function StatsSection() {
  const stats: { to: number; suffix: string; label: string }[] = [
    { to: 6, suffix: "", label: "Products & platforms shipped" },
    { to: 5, suffix: "", label: "Service lines, end-to-end" },
    { to: 8, suffix: "", label: "People on the team" },
    { to: 100, suffix: "%", label: "Built in Kampala" },
  ];
  return (
    <section id="stats" className="section-sm" style={{ borderTop: "1px solid var(--hairline)" }}>
      <div className="container-cw">
        <RevealGroup className="grid grid-cols-2 gap-y-10 lg:grid-cols-4">
          {stats.map((s) => (
            <RevealItem key={s.label}>
              <div>
                <p
                  style={{
                    fontSize: 40,
                    fontWeight: 510,
                    letterSpacing: "-0.022em",
                    lineHeight: 1,
                    color: "var(--color-paper)",
                  }}
                >
                  <CountUp to={s.to} suffix={s.suffix} />
                </p>
                <p className="t-caption mt-3">{s.label}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}

/* ---------- Closing CTA --------------------------------------------------- */

export function CTABand() {
  return (
    <section id="cta" className="section" style={{ borderTop: "1px solid var(--hairline)" }}>
      <div className="container-cw">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          <div>
            <Reveal>
              <h2 className="t-heading max-w-[18ch]">
                Have something to build? Let&apos;s talk it through.
              </h2>
            </Reveal>
            <Reveal delay={0.06}>
              <p className="t-body mt-5 max-w-[46ch]" style={{ color: "var(--color-fog)" }}>
                Tell us what you need, your timeline, and your budget. We&apos;ll come
                back with a clear proposal — scope, cost, and delivery date.
              </p>
            </Reveal>
            <Reveal delay={0.12}>
              <div className="mt-8 flex flex-wrap items-center gap-5">
                <Magnetic>
                  <Link href="/contact" className="btn btn-acid">
                    Start a project
                  </Link>
                </Magnetic>
                <a
                  href={site.brand.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 transition-colors hover:text-[var(--color-paper)]"
                  style={{ fontSize: 14, color: "var(--color-mist)" }}
                >
                  Chat on WhatsApp
                  <IconArrowUpRight width={15} height={15} />
                </a>
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <DeployFrame />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
