import type { Metadata } from "next";
import site from "@/content/site.json";
import PageHead from "@/components/PageHead";
import ContactForm from "@/components/ContactForm";
import { Reveal, RevealGroup, RevealItem } from "@/components/Motion";
import {
  IconMail,
  IconPhone,
  IconWhatsApp,
  IconPin,
  IconClock,
  IconArrowUpRight,
  IconLinkedIn,
  IconInstagram,
} from "@/components/Icons";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Start a project with CWorks — email, WhatsApp, or phone. Based in Kampala, Uganda.",
};

export default function ContactPage() {
  const { brand } = site;

  const channels = [
    {
      icon: IconMail,
      label: "Email",
      value: brand.email,
      href: `mailto:${brand.email}`,
    },
    {
      icon: IconWhatsApp,
      label: "WhatsApp",
      value: brand.phone,
      href: brand.whatsapp,
    },
    {
      icon: IconPhone,
      label: "Phone",
      value: brand.phone,
      href: `tel:${brand.phone.replace(/\s/g, "")}`,
    },
    {
      icon: IconPin,
      label: "Based in",
      value: brand.location,
      href: undefined,
    },
  ];

  return (
    <>
      <PageHead
        beams
        eyebrow="Contact"
        title="Tell us what you're building."
        body="Send us the rough version — what you need, your timeline, and your budget. We'll come back with a clear proposal: scope, cost, and delivery date."
      />

      <section className="section" style={{ borderTop: "1px solid var(--hairline)" }}>
        <div className="container-cw">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.15fr_0.85fr]">
            {/* Form */}
            <Reveal>
              <ContactForm />
            </Reveal>

            {/* Direct channels */}
            <Reveal delay={0.08}>
              <div className="flex flex-col">
                <p
                  className="t-label mb-6"
                  
                >
                  Or reach us directly
                </p>

                <RevealGroup className="flex flex-col">
                  {channels.map((c) => (
                    <RevealItem key={c.label}>
                      {c.href ? (
                        <a
                          href={c.href}
                          target={c.href.startsWith("http") ? "_blank" : undefined}
                          rel="noopener noreferrer"
                          className="group flex items-center gap-4 py-5"
                          style={{ borderTop: "1px solid var(--hairline)" }}
                        >
                          <span style={{ color: "var(--color-fog)" }}>
                            <c.icon width={18} height={18} />
                          </span>
                          <span className="flex-1">
                            <span className="t-label block">{c.label}</span>
                            <span
                              className="mt-1 block transition-colors group-hover:text-[var(--color-paper)]"
                              style={{ fontSize: 15, color: "var(--color-mist)" }}
                            >
                              {c.value}
                            </span>
                          </span>
                          <span
                            className="transition-transform duration-200 group-hover:translate-x-1"
                            style={{ color: "var(--color-ash)" }}
                          >
                            <IconArrowUpRight width={15} height={15} />
                          </span>
                        </a>
                      ) : (
                        <div
                          className="flex items-center gap-4 py-5"
                          style={{ borderTop: "1px solid var(--hairline)" }}
                        >
                          <span style={{ color: "var(--color-fog)" }}>
                            <c.icon width={18} height={18} />
                          </span>
                          <span className="flex-1">
                            <span className="t-label block">{c.label}</span>
                            <span
                              className="mt-1 block"
                              style={{ fontSize: 15, color: "var(--color-mist)" }}
                            >
                              {c.value}
                            </span>
                          </span>
                        </div>
                      )}
                    </RevealItem>
                  ))}
                </RevealGroup>

                {/* Hours */}
                <div className="py-5" style={{ borderTop: "1px solid var(--hairline)" }}>
                  <div className="flex items-center gap-4">
                    <span style={{ color: "var(--color-fog)" }}>
                      <IconClock width={18} height={18} />
                    </span>
                    <span className="flex-1">
                      <span className="t-label block">Working hours</span>
                      <span
                        className="mt-1 block"
                        style={{ fontSize: 15, color: "var(--color-mist)" }}
                      >
                        Mon – Fri, 9:00 – 18:00 EAT
                      </span>
                    </span>
                  </div>
                </div>
                <div className="rule" />

                {/* Socials */}
                <p
                  className="t-label mt-8 mb-4"
                  
                >
                  Follow the work
                </p>
                <div className="flex items-center gap-4">
                  <a
                    href={brand.socials.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-[var(--color-paper)]"
                    style={{ color: "var(--color-fog)" }}
                    aria-label="Instagram"
                  >
                    <IconInstagram width={18} height={18} />
                  </a>
                  <a
                    href={brand.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-[var(--color-paper)]"
                    style={{ color: "var(--color-fog)" }}
                    aria-label="LinkedIn"
                  >
                    <IconLinkedIn width={18} height={18} />
                  </a>
                  <a
                    href={brand.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-[var(--color-paper)]"
                    style={{ color: "var(--color-fog)" }}
                    aria-label="WhatsApp"
                  >
                    <IconWhatsApp width={18} height={18} />
                  </a>
                </div>

                {/* Reassurance panel */}
                <div className="panel mt-8 p-6">
                  <p style={{ fontSize: 15, fontWeight: 510, color: "var(--color-paper)" }}>
                    What happens next
                  </p>
                  <ol className="mt-4 flex flex-col gap-3">
                    {[
                      "We read your brief and reply within one working day.",
                      "We book a short discovery call — in person or virtual.",
                      "You get a written proposal: scope, cost, and timeline.",
                    ].map((s, i) => (
                      <li key={s} className="flex gap-3">
                        <span className="t-mono shrink-0" style={{ color: "var(--color-acid)" }}>
                          0{i + 1}
                        </span>
                        <span className="t-body-sm">{s}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
