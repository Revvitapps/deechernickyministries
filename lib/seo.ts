import type { Metadata } from "next";
import { ministry } from "@/data/ministry";
import { siteUrl } from "@/lib/site";

/**
 * SITE_INDEXING=on is the launch switch for robots.txt and every page's robots
 * meta. Until then the prototype is noindex everywhere.
 */
export const indexingEnabled = () => process.env.SITE_INDEXING === "on";

export const absoluteUrl = (path: string) => siteUrl + (path.startsWith("/") ? path : `/${path}`);

export type PageKey = "home";

type PageSeo = { path: string; title: string; description: string; priority: number };

export const pages: Record<PageKey, PageSeo> = {
  home: { path: "/", title: `${ministry.name} | Destin, Florida`, description: "Dee Chernicky Ministries, Destin, Florida. Ignite a fire for God's presence and His Word. Our new home is coming soon.", priority: 1 },
};

export function pageMetadata(key: PageKey): Metadata {
  const p = pages[key];
  const home = key === "home";
  const image = { url: "/og-default.png", width: 1200, height: 630, alt: ministry.name };
  const index = indexingEnabled();
  return {
    title: home ? { absolute: p.title } : p.title,
    description: p.description,
    alternates: { canonical: p.path },
    robots: index ? { index: true, follow: true } : { index: false, follow: false },
    openGraph: { siteName: ministry.name, type: "website", url: p.path, title: home ? p.title : `${p.title} | ${ministry.name}`, description: p.description, locale: "en_US", images: [image] },
    twitter: { card: "summary_large_image", title: p.title, description: p.description, images: [image.url] },
  };
}

export function siteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "NGO",
    "@id": `${siteUrl}/#organization`,
    name: ministry.name,
    url: siteUrl,
    description: ministry.mission,
    telephone: "+1-850-366-3550",
    email: ministry.email,
    nonprofitStatus: "Nonprofit501c3",
    founder: { "@type": "Person", name: "Dee Chernicky" },
    address: { "@type": "PostalAddress", postOfficeBoxNumber: "1014", addressLocality: "Destin", addressRegion: "FL", postalCode: "32540", addressCountry: "US" },
  };
}
