import type { NextConfig } from "next";

// Every public path on the old Vistaprint site (deechernickyministries.org,
// also served as christmascelebrationdinner.org), recovered 2026-10-28,
// lands on the coming-soon page until the full site launches.
const legacyRedirects = [
  { source: "/home", destination: "/" },
  { source: "/about", destination: "/" },
  { source: "/radio-show", destination: "/" },
  { source: "/contact", destination: "/" },
  { source: "/gallery", destination: "/" },
  { source: "/christmas-celebration", destination: "/" },
  { source: "/shine-on-conference", destination: "/" },
];

// The project's production *.vercel.app alias must not serve a duplicate copy
// of the site: it 308s to the canonical www domain, same path and query.
// Other preview *.vercel.app hosts are left alone.
const CANONICAL_ORIGIN = "https://www.deechernickyministries.org";
const aliasHosts = ["deechernickyministries.vercel.app"];

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
];

const immutable = { key: "Cache-Control", value: "public, max-age=31536000, immutable" };

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Phones on the same Wi-Fi can open `npm run dev` by LAN IP.
  allowedDevOrigins: ["192.168.*.*", "10.*.*.*", "172.16.*.*", "*.local"],
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      { source: "/photos/:path*", headers: [immutable] },
      { source: "/brand/:path*", headers: [immutable] },
      { source: "/pwa/:path*", headers: [immutable] },
      { source: "/sw.js", headers: [{ key: "Cache-Control", value: "no-cache" }] },
    ];
  },
  async redirects() {
    const toCanonical = aliasHosts.map((host) => ({
      source: "/:path*",
      has: [{ type: "host" as const, value: host }],
      destination: `${CANONICAL_ORIGIN}/:path*`,
      permanent: true,
    }));
    return [...toCanonical, ...legacyRedirects.map((r) => ({ ...r, permanent: true }))];
  },
};

export default nextConfig;
