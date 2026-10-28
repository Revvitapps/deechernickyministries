/**
 * Public origin used for absolute URLs in metadata and structured data.
 * Resolution order: NEXT_PUBLIC_SITE_URL (set this once a domain is decided),
 * then Vercel's production URL, then the current deployment URL, then localhost.
 */
const configured =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL && `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`) ||
  (process.env.VERCEL_URL && `https://${process.env.VERCEL_URL}`) ||
  "http://localhost:3000";

export const siteUrl = configured.replace(/\/$/, "");
