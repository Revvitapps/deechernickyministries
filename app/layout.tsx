import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Pwa } from "@/components/pwa";
import { TabBar } from "@/components/tab-bar";
import { InstallPrompt } from "@/components/install-prompt";
import { AskDrawer } from "@/components/ask";
import { ministry } from "@/data/ministry";
import { siteUrl } from "@/lib/site";
import { indexingEnabled, pages, siteJsonLd } from "@/lib/seo";

// Faces from the coming-soon draft. The 2019 Vistaprint theme used Carter One, Great Vibes and Lora.
const display = Cormorant_Garamond({ subsets: ["latin"], weight: ["500", "600"], style: ["normal", "italic"], variable: "--font-display", display: "swap" });
const body = Jost({ subsets: ["latin"], weight: ["300", "400", "500"], variable: "--font-body", display: "swap" });

export const viewport: Viewport = {
  themeColor: "#141a2e",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: pages.home.title, template: `%s | ${ministry.name}` },
  description: pages.home.description,
  applicationName: ministry.name,
  appleWebApp: { capable: true, statusBarStyle: "black-translucent", title: ministry.shortName },
  other: { "apple-mobile-web-app-capable": "yes" },
  formatDetection: { telephone: true },
  robots: indexingEnabled() ? { index: true, follow: true } : { index: false, follow: false },
  icons: { icon: [{ url: "/pwa/icon-192.png", sizes: "192x192" }, { url: "/favicon.svg", type: "image/svg+xml" }], apple: "/pwa/apple-touch-icon.png" },
  manifest: "/manifest.webmanifest",
  openGraph: { siteName: ministry.name, type: "website", images: [{ url: "/og-default.png", width: 1200, height: 630, alt: ministry.name }] },
  twitter: { card: "summary_large_image", images: ["/og-default.png"] },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>
        <a href="#main" className="skip-link">Skip to content</a>
        <Pwa />
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <TabBar />
        <InstallPrompt />
        <AskDrawer />
        <Analytics />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd()) }} />
      </body>
    </html>
  );
}
