# Dee Chernicky Ministries: one-page site (launching January 1)

A one-page landing site for Dee Chernicky Ministries (Destin, Florida), to launch January 1, built by Revvit in Next.js with the PWA groundwork (manifest, service worker, offline page) already in place for the app phase later. It keeps Dee's words, photos and voice from the old Vistaprint site (last captured 2019) and Matthew's coming-soon draft, and lets a visitor pray, pledge a gift, save an event seat or message the office without leaving the page. Preview only until launch: noindexed, no payments, form submissions go to a webhook when one is set. The earlier multi-screen PWA build is kept on the `pwa-full` branch.

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
npm run check:routes   # boots the build: both routes, every section anchor, PWA files, legacy redirects, pipeline API
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
| `PIPELINE_WEBHOOK_URL` | Where `/api/pipeline` forwards every prayer request, pledge, seat and message (Zapier, Make, CRM, Slack workflow). |
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

## The page

One route, `/`, in this order. The sticky header links to each section and keeps a **Give** button in view.

| Section | Content |
|---|---|
| `#top` | Mission headline, Dee's promise line, prayer and radio buttons, Ezekiel 34:16 |
| `#today` | Today's confession: one of Dee's 14 Daily Confessions, rotating by date, with Share |
| `#about` | Dee's bio, mission and vision |
| `#outreach` | Prison and shelter outreach: video and photos |
| `#radio` | Life Issues, Real Answers: time, station, live venue, archive, both hosts |
| `#events` | Shine On and the Christmas Celebration Dinner, with one "save my seat" form |
| `#book` | Activating the Promises of God |
| `#give` | Give by mail, 501(c)(3) note, pledge form |
| `#prayer` | Prayer request form |
| `#contact` | Office, email, assistant, mailing address, message form |

`/audit` is the client review (`content/AUDIT.md`), noindexed and not linked from the page. Old site paths 301 to their sections (`/radio-show` to `/#radio`, and so on).

## Real vs. stubbed

- **Real:** all copy, names, phone, mailing address, assistant, verses, Daily Confessions, radio details, 2019 event details, photos and videos, all recovered from the client's own pages.
- **Placeholder (visible in the UI):** next Shine On and Christmas dates, book price and cover, online giving processor. Radio schedule and live venue are labelled "as published in 2019".
- **Sample (labelled):** giving amount chips, the 2019 radio line-up.
- **Stubbed:** no payment processing. The Ask helper, tab bar and install banner from the app build are not on this page; they live on `pwa-full`. Every form calls `upsertContact()` (`lib/pipeline.ts`): a copy on the device plus `POST /api/pipeline`, which forwards to `PIPELINE_WEBHOOK_URL` or just logs. No email is sent.

## Verified

2026-10-28, production build, headless Chromium at 390x844 and 1440x900: typecheck, lint, build clean; `check:offline`, `check:routes`, `check:seo`, `check:a11y` (0 serious/critical axe issues) pass; no horizontal overflow; offline fallback works with the network cut. Lighthouse mobile on `/` (warm runs): Performance 89 to 96, Accessibility 100, Best Practices 96 (SEO is low by design while noindexed).

## Launch, January 1 (needs Matthew's go-ahead)

1. Answers to the open questions in `CLAUDE.md`; fill the placeholders in `data/ministry.ts`.
2. Giving processor live on `/give`; `PIPELINE_WEBHOOK_URL` pointed at the office inbox or CRM.
3. Prototype URL: add `dee-chernicky.revvit.io` in Vercel, then `node scripts/cloudflare-dns.mjs` (dry run) and `--apply` for a DNS-only CNAME to `cname.vercel-dns.com`.
4. Client domain: add it in Vercel; at the DNS host set apex `A 76.76.21.21` and `www CNAME cname.vercel-dns.com` (DNS only); legacy paths already 301 (`/radio-show`, `/christmas-celebration`).
5. `SITE_INDEXING=on`, redeploy, submit `/sitemap.xml` in Search Console. Rollback: restore the old DNS records.
