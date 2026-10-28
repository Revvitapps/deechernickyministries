import type { NextConfig } from "next";

// Every public path on the old Vistaprint site (deechernickyministries.org,
// also served as christmascelebrationdinner.org), recovered 2026-10-28.
// /about, /gallery and /contact keep their paths.
const legacyRedirects = [
  { source: "/radio-show", destination: "/radio" },
  { source: "/christmas-celebration", destination: "/events/christmas" },
  { source: "/shine-on-conference", destination: "/events/shine-on" },
  { source: "/home", destination: "/" },
];

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
    return legacyRedirects.map((r) => ({ ...r, permanent: true }));
  },
};

export default nextConfig;
