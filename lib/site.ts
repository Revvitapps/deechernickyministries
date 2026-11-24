/**
 * The site's one canonical origin. Canonical tags, og:url, og:image, the
 * Organization JSON-LD url, robots.txt and the sitemap all build from this.
 * NEXT_PUBLIC_SITE_URL can override it (e.g. for a staging domain); otherwise
 * every environment points at the production custom domain.
 */
export const CANONICAL_SITE_URL = "https://www.deechernickyministries.org";

const configured = process.env.NEXT_PUBLIC_SITE_URL || CANONICAL_SITE_URL;

export const siteUrl = configured.replace(/\/$/, "");
