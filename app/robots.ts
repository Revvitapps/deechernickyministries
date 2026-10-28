import type { MetadataRoute } from "next";
import { indexingEnabled } from "@/lib/seo";
import { siteUrl } from "@/lib/site";

// Closed to crawlers until SITE_INDEXING=on (see lib/seo.ts).
export default function robots(): MetadataRoute.Robots {
  if (!indexingEnabled()) return { rules: { userAgent: "*", disallow: "/" } };
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/api/", "/audit"] },
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
