import type { MetadataRoute } from "next";
import { absoluteUrl, pages } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return Object.entries(pages)
    .filter(([key]) => key !== "audit")
    .map(([, p]) => ({ url: absoluteUrl(p.path), changeFrequency: "weekly", priority: p.priority }));
}
