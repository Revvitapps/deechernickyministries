import type { Metadata } from "next";
import { ministry } from "@/data/ministry";
import { siteUrl } from "@/lib/site";

/**
 * SITE_INDEXING=on is the launch switch for robots.txt and every page's robots
 * meta. Until then the prototype is noindex everywhere.
 */
export const indexingEnabled = () => process.env.SITE_INDEXING === "on";

export const absoluteUrl = (path: string) => siteUrl + (path.startsWith("/") ? path : `/${path}`);

export type PageKey =
  | "home" | "radio" | "give" | "events" | "shine-on" | "christmas" | "book"
  | "about" | "gallery" | "contact" | "prayer" | "today" | "audit";

type PageSeo = { path: string; title: string; description: string; priority: number };

export const pages: Record<PageKey, PageSeo> = {
  home: { path: "/", title: `${ministry.name} | Destin, Florida`, description: "Dee Chernicky Ministries, Destin, Florida: Life Issues, Real Answers radio, the Shine On Women's Conference, prison and shelter outreach, and the Word for every need.", priority: 1 },
  radio: { path: "/radio", title: "Life Issues, Real Answers radio", description: "Life Issues, Real Answers with Dee Chernicky and counselor Valerie Peterson: solving life's issues with the power of God's Word, Fridays on WPSM 91.1 FM.", priority: 0.9 },
  give: { path: "/give", title: "Give", description: "Support Dee Chernicky Ministries, a 501(c)(3) non-profit, and its prison, shelter, radio and conference outreach.", priority: 0.9 },
  events: { path: "/events", title: "Events", description: "The Shine On Women's & Teen Conference and the Christmas Celebration Dinner honoring women from area shelters.", priority: 0.8 },
  "shine-on": { path: "/events/shine-on", title: "Shine On Women's & Teen Conference", description: "Dee Chernicky's annual Shine On Women's & Teen Conference: worship, teaching and prayer to discover your destiny through the Word of God.", priority: 0.8 },
  christmas: { path: "/events/christmas", title: "Christmas Celebration Dinner", description: "A complimentary Christmas dinner honoring women from area shelters, hosted by Dee Chernicky and Valerie Peterson in Destin, Florida.", priority: 0.8 },
  book: { path: "/book", title: "Activating the Promises of God", description: "Dee Chernicky's book Activating the Promises of God, used in prisons and outreach homes for women.", priority: 0.7 },
  about: { path: "/about", title: "About Dee", description: "Dee Chernicky is an ordained minister, author, radio host and founder of the Shine On Women's Conference in Destin, Florida.", priority: 0.7 },
  gallery: { path: "/gallery", title: "Gallery", description: "Photos from Shine On, prison outreach and the ministry of Dee Chernicky.", priority: 0.4 },
  contact: { path: "/contact", title: "Contact", description: `Reach the Dee Chernicky Ministries office at ${ministry.phone.display}, P.O. Box 1014, Destin, Florida 32540.`, priority: 0.6 },
  prayer: { path: "/prayer", title: "Prayer request", description: "Send a prayer request to Dee Chernicky Ministries.", priority: 0.6 },
  today: { path: "/today", title: "Today's confession", description: "A daily confession from God's Word, from Dee Chernicky's Daily Confessions.", priority: 0.5 },
  audit: { path: "/audit", title: "Website review", description: "What the old site lost and what the new app changes.", priority: 0 },
};

export function pageMetadata(key: PageKey): Metadata {
  const p = pages[key];
  const home = key === "home";
  const image = { url: "/og-default.png", width: 1200, height: 630, alt: ministry.name };
  const index = indexingEnabled() && key !== "audit";
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
