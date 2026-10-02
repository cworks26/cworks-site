import type { MetadataRoute } from "next";

/* `output: "export"` requires every route to declare itself static. */
export const dynamic = "force-static";

/* Before this file existed, /robots.txt 404'd and served the HTML error page —
   i.e. every crawler was handed a document instead of crawl rules, and no
   sitemap pointer existed anywhere. */

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: "https://cworksug.com/sitemap.xml",
    host: "https://cworksug.com",
  };
}
