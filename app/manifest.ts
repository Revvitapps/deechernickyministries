import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: "Dee Chernicky Ministries",
    short_name: "Dee Chernicky",
    description: "Ignite a fire for God's presence and His Word. Radio, daily confessions, prayer and giving.",
    start_url: "/?source=pwa",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    categories: ["lifestyle", "education"],
    background_color: "#141a2e",
    theme_color: "#141a2e",
    shortcuts: [
      { name: "Today's confession", short_name: "Today", url: "/today" },
      { name: "Send a prayer request", short_name: "Prayer", url: "/prayer" },
      { name: "Give", short_name: "Give", url: "/give" },
      { name: "Life Issues, Real Answers", short_name: "Radio", url: "/radio" },
    ],
    icons: [
      { src: "/pwa/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/pwa/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/pwa/icon-maskable-192.png", sizes: "192x192", type: "image/png", purpose: "maskable" },
      { src: "/pwa/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
