import type { MetadataRoute } from "next";

/* `output: "export"` requires every route to declare itself static. */
export const dynamic = "force-static";

/* Canonical host is cworksug.com (see metadataBase in src/app/layout.tsx).
   The GitHub Pages copy at cworks26.github.io/cworks-site is the same app on a
   different host; every page emits a canonical pointing here so the two
   consolidate onto one.

   URLs carry the trailing slash because next.config sets `trailingSlash: true`
   — without it these would 301 on every hit and waste crawl budget. */

const BASE = "https://cworksug.com";

const ROUTES: {
  path: string;
  priority: number;
  freq: "daily" | "weekly" | "monthly";
}[] = [
  { path: "/", priority: 1, freq: "weekly" },
  { path: "/services/", priority: 0.9, freq: "monthly" },
  { path: "/work/", priority: 0.8, freq: "monthly" },
  { path: "/contact/", priority: 0.7, freq: "monthly" },
  { path: "/team/", priority: 0.5, freq: "monthly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return ROUTES.map(({ path, priority, freq }) => ({
    url: `${BASE}${path}`,
    lastModified,
    changeFrequency: freq,
    priority,
  }));
}
