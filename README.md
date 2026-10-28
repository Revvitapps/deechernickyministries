# Dee Chernicky Ministries: coming-soon page

The coming-soon landing page for Dee Chernicky Ministries (Destin, Florida), ported from Matthew's draft into Next.js so the January 1 site can grow from the same repo. One page: mission headline, Dee's portrait, "Our new home is coming soon", the radio show, book and Shine On, and the office contacts. Manifest, service worker and offline page are already in place for the app phase. Noindexed until launch (`SITE_INDEXING=on`).

Branches: `main` is this coming-soon page. `site-full` is the fuller one-page site (about, radio, events, give, prayer and contact forms, client audit). `pwa-full` is the multi-screen app (tab bar, Give orb, Ask helper, install prompt).

## Run

Node 20.9+.

```sh
npm install
npm run dev            # http://localhost:3000, and http://<LAN IP>:3000 on a phone
npm run build && npm run start
```

Checks:

```sh
npm run check          # typecheck + lint + service-worker check
npm run check:routes   # boots the build: the page, PWA files, robots, legacy redirects
npm run check:seo      # unique titles, descriptions, canonicals, noindex before launch
npm run check:a11y     # axe-core on every route + WCAG contrast of the brand tokens (needs Playwright)
npm run screens        # full-page screenshots at 390x844 and 1440x900, overflow + offline checks (needs Playwright)
```

## Environment

All optional; the app runs with none set. See `.env.example`.

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Origin for canonical URLs and share images. Defaults to the Vercel URL. |
| `SITE_INDEXING` | `on` opens `robots.txt` and page robots meta. Leave unset until launch. |
| `CLOUDFLARE_API_TOKEN` | For `scripts/cloudflare-dns.mjs` only. Never commit it. |

## Brand

Recovered 2026-10-28 into `docs/recovered/deechernickyministries-2026-10-28/` (Wayback captures of deechernickyministries.org, Oct–Nov 2019, plus `coming-soon.html`, Matthew's draft).

| Asset | Value | Source |
|---|---|---|
| Night (background) | `#141a2e`, `#1c2440` | Coming-soon draft |
| Ink / muted text | `#f6efe4` / `#c9bfae` | Coming-soon draft |
| Ember (fills, icons, buttons on dark) | `#e3a04f`, light `#f3c784` | Coming-soon draft; matches the 2019 site's gold buttons `#e4b26d` |
| Ember deep (text and buttons on paper) | `#8a5414` | Added: ember is 2.0:1 on paper, this is 5.5:1 |
| Old site palette (reference only) | `#f57241` orange, `#b31f28` red, `#e4b26d` gold, `#413659` purple | 2019 Vistaprint theme CSS |
| Display face | Cormorant Garamond 500/600 + italic | Coming-soon draft (2019 site: Carter One, Great Vibes, Lora) |
| Body face | Jost 300/400/500 | Coming-soon draft (2019 site: Nunito) |
| Mark | Flame inside an arch, `components/mark.tsx` | Drawn for the prototype: no logo was recovered. Echoes the arch portrait and ember glow of the draft. |
| Icons, OG image | `public/pwa/*`, `public/og-default.png`, `public/favicon.svg` | `npm run icons:make` |
| Photos | 40 in `public/photos/` (`data/photo-manifest.json`) | Decoded from the 2019 site's Vistaprint/Cimpress CDN captures; `npm run photos:prepare`. All appear to be real event photos (none look AI-generated); `cross-thorns` may be stock. Every Christmas-page image failed to recover. |
| Radio logo | `public/brand/life-issues-real-answers.jpg` | 2019 radio page |
| Videos | YouTube `sWu0MNOHAP0` (The Heart of Dee Chernicky Ministries), `m3DF1Ivxwqg` (Outreaches) | 2019 home and about pages; click-to-load |

## Content

Every word, the contacts and the portrait come from the draft and the recovered 2019 site. Nothing is stubbed: there are no forms or payments on this page.

## Verified

2026-10-28, production build, headless Chromium at 390x844 and 1440x900: typecheck, lint, build clean; `check:offline`, `check:routes`, `check:seo`, `check:a11y` pass; no horizontal overflow; offline fallback works.

## Launch, January 1 (needs Matthew's go-ahead)

1. Answers to the open questions in `CLAUDE.md`; fill the placeholders in `data/ministry.ts`.
2. Giving processor live on `/give`; `PIPELINE_WEBHOOK_URL` pointed at the office inbox or CRM.
3. Prototype URL: add `dee-chernicky.revvit.io` in Vercel, then `node scripts/cloudflare-dns.mjs` (dry run) and `--apply` for a DNS-only CNAME to `cname.vercel-dns.com`.
4. Client domain: add it in Vercel; at the DNS host set apex `A 76.76.21.21` and `www CNAME cname.vercel-dns.com` (DNS only); legacy paths already 301 (`/radio-show`, `/christmas-celebration`).
5. `SITE_INDEXING=on`, redeploy, submit `/sitemap.xml` in Search Console. Rollback: restore the old DNS records.
