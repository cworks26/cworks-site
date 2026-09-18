import Link from "next/link";
import site from "@/content/site.json";
import {
  IconMail,
  IconPin,
  IconPhone,
  IconWhatsApp,
  IconLinkedIn,
  IconInstagram,
  IconArrowUpRight,
} from "./Icons";

export default function Footer() {
  const { brand, services } = site;
  const year = new Date().getFullYear();

  return (
    <footer className="snap-block flex min-h-[100svh] flex-col justify-between pb-10 pt-14" style={{ borderTop: "1px solid var(--hairline)" }}>
      <div className="container-cw">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-[10px]" style={{ color: "var(--color-paper)" }}>
                            <img src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/logo-mark-dark.png`} alt="" width={24} height={13} style={{ height: 13, width: "auto" }} />
              <span style={{ fontSize: 16, fontWeight: 510, letterSpacing: "-0.011em" }}>
                CWorks
              </span>
            </div>
            <p className="t-body-sm mt-4 max-w-[280px]">{brand.tagline}</p>
            <div className="mt-5 flex items-center gap-3">
              <a
                href={brand.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat on WhatsApp"
                style={{ color: "var(--color-fog)" }}
                className="transition-colors hover:text-[var(--color-mist)]"
              >
                <IconWhatsApp width={18} height={18} />
              </a>
              <a
                href={brand.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                style={{ color: "var(--color-fog)" }}
                className="transition-colors hover:text-[var(--color-mist)]"
              >
                <IconLinkedIn width={18} height={18} />
              </a>
              <a
                href={brand.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                style={{ color: "var(--color-fog)" }}
                className="transition-colors hover:text-[var(--color-mist)]"
              >
                <IconInstagram width={18} height={18} />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <p className="t-label mb-4" style={{ textTransform: "uppercase", letterSpacing: "0.08em" }}>
              Services
            </p>
            <ul className="flex flex-col gap-3">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services#${s.slug}`}
                    className="t-caption transition-colors hover:text-[var(--color-mist)]"
                  >
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <p className="t-label mb-4" style={{ textTransform: "uppercase", letterSpacing: "0.08em" }}>
              Company
            </p>
            <ul className="flex flex-col gap-3">
              <li>
                <Link href="/work" className="t-caption transition-colors hover:text-[var(--color-mist)]">
                  Work
                </Link>
              </li>
              <li>
                <Link href="/team" className="t-caption transition-colors hover:text-[var(--color-mist)]">
                  Team
                </Link>
              </li>
              <li>
                <Link href="/contact" className="t-caption transition-colors hover:text-[var(--color-mist)]">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/services" className="t-caption transition-colors hover:text-[var(--color-mist)]">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="t-label mb-4" style={{ textTransform: "uppercase", letterSpacing: "0.08em" }}>
              Get in touch
            </p>
            <ul className="flex flex-col gap-3">
              <li>
                <a
                  href={`mailto:${brand.email}`}
                  className="t-caption flex items-center gap-2 transition-colors hover:text-[var(--color-mist)]"
                >
                  <IconMail width={14} height={14} />
                  {brand.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${brand.phone.replace(/\s/g, "")}`}
                  className="t-caption flex items-center gap-2 transition-colors hover:text-[var(--color-mist)]"
                >
                  <IconPhone width={14} height={14} />
                  {brand.phone}
                </a>
              </li>
              <li>
                <span className="t-caption flex items-center gap-2">
                  <IconPin width={14} height={14} />
                  {brand.location}
                </span>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="t-caption mt-1 inline-flex items-center gap-[6px] transition-colors hover:text-[var(--color-mist)]"
                  style={{ color: "var(--color-mist)" }}
                >
                  Start a project
                  <IconArrowUpRight width={13} height={13} />
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Mega wordmark — the closing statement */}
        <div aria-hidden className="footer-wordmark" >
          <span className="footer-wordmark-text">CWorks</span>
        </div>

        <div className="rule my-12" />

        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <p className="t-label">
            © {year} {brand.legal} · {brand.domain}
          </p>
          <p className="t-label">
            Built in Kampala, Uganda 🇺🇬
          </p>
        </div>
      </div>
    </footer>
  );
}
