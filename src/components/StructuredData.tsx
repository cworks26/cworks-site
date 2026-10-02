import site from "@/content/site.json";

/* Organization + Service structured data.

   Everything is read from site.json — the same source the page copy comes from —
   so the markup cannot drift from what the team actually edits. Nothing here is
   invented: no ratings, no review counts, no aggregateRating, no opening hours.
   Those would be unverified claims, and fabricated review markup is a manual
   -action risk rather than a ranking win.

   Offer prices use each service's FIRST tier, which is exactly the "from UGX …"
   figure rendered on the homepage, so the markup agrees with the visible page. */

const BASE = `https://${site.brand.domain}`;

/** "UGX 350,000" -> 350000 */
const parsePrice = (price: string): number =>
  Number(price.replace(/[^\d]/g, "")) || 0;

const socials = Object.values(site.brand.socials ?? {}).filter(
  (u): u is string => typeof u === "string" && u.length > 0
);

const Organization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${BASE}/#organization`,
  name: site.brand.name,
  legalName: site.brand.legal,
  url: BASE,
  logo: `${BASE}/logo-mark.png`,
  image: `${BASE}/logo-mark.png`,
  description: site.brand.tagline,
  email: site.brand.email,
  telephone: site.brand.phone.replace(/\s/g, ""),
  address: {
    "@type": "PostalAddress",
    addressLocality: "Kampala",
    addressCountry: "UG",
  },
  areaServed: { "@type": "Country", name: "Uganda" },
  knowsLanguage: ["en"],
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: site.brand.phone.replace(/\s/g, ""),
      contactType: "customer service",
      areaServed: "UG",
      availableLanguage: ["en"],
    },
  ],
  sameAs: socials,
};

const Services = site.services.map((s) => {
  const entry = s.pricing[0];
  return {
    "@type": "Service",
    "@id": `${BASE}/services/#${s.slug}`,
    name: s.name,
    description: s.short,
    serviceType: s.name,
    provider: { "@id": `${BASE}/#organization` },
    areaServed: { "@type": "Country", name: "Uganda" },
    url: `${BASE}/services/#${s.slug}`,
    offers: {
      "@type": "Offer",
      name: entry.tier,
      description: entry.desc,
      price: parsePrice(entry.price),
      priceCurrency: "UGX",
      availability: "https://schema.org/InStock",
      url: `${BASE}/services/#${s.slug}`,
    },
  };
});

const WebSite = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${BASE}/#website`,
  url: BASE,
  name: site.brand.name,
  publisher: { "@id": `${BASE}/#organization` },
  inLanguage: "en-UG",
};

export default function StructuredData() {
  const graph = [Organization, WebSite, ...Services];
  return (
    <script
      type="application/ld+json"
      // Static, developer-authored JSON assembled from our own content file —
      // no user input reaches this string.
      dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@graph": graph }) }}
    />
  );
}
