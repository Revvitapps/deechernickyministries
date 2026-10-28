@AGENTS.md

# Dee Chernicky Ministries PWA

## 0. Status and decisions (living: update this first)

- **2026-10-28** Matthew: this is a **single-page landing page to be ready for January 1**, not a multi-screen app yet. Everything is now one page at `/` with section anchors; the multi-screen PWA (tab bar, Give orb, Ask helper, install prompt, per-topic routes) is saved on the `pwa-full` branch for the app phase. Manifest, service worker and offline page stay on main.

- **2026-10-28** Built from the Wayback recovery of deechernickyministries.org (2019) and Matthew's coming-soon draft (`docs/recovered/deechernickyministries-2026-10-28/`). The draft's palette and fonts (night navy, ember gold, Cormorant Garamond + Jost) are the brand, not the 2019 Vistaprint theme.
- **2026-10-28** Business model: a 501(c)(3) ministry, so **Give** is the header button (it was the centre tab in the app build). No processor chosen, so `/give` takes pledges into the lead pipeline; nothing is charged.
- **2026-10-28** Email shown is `deedeechernicky@gmail.com` (from the draft). The 2019 site used `deechernicky@aol.com`. Confirm.
- **2026-10-28** The Daily Confessions are the reason to install: one per day near the top of the page.
- **2026-10-28** No logo existed; `components/mark.tsx` (flame in an arch) is a prototype mark.
- Repo, Vercel project and `dee-chernicky.revvit.io` DNS: pending (repo must be created by Matthew; DNS needs his go-ahead).

## Open questions for the client

1. Giving processor (Stripe, Tithe.ly, PayPal Giving Fund?) and whether to offer monthly giving.
2. Which email to show, and who receives prayer requests, pledges and seat requests.
3. Is Life Issues, Real Answers still on WPSM 91.1 FM, Fridays 11:00–11:30 AM, live at Just Love Coffee Cafe?
4. Next Shine On and Christmas Celebration Dinner dates and venues.
5. Where the book is sold, its price, and a cover image.
6. Who controls deechernickyministries.org, christmascelebrationdinner.org and shineonconference.org.
7. Newer photos; social media links.

## Brief

Revvit `/revvit-pwa` build, scoped down by Matthew to a one-page site for January 1: a prototype of the client's new live site, in their brand and voice, as an installable Next.js 16 PWA that makes them say "I need this" within 10 seconds on a phone. Never invent copy, prices, dates or photos: missing facts are visible placeholders (`components/fact.tsx`) and questions above. Data lives in `data/ministry.ts` and `data/confessions.ts`; every terminal action goes through `upsertContact()` in `lib/pipeline.ts`. Shell (service worker, install prompt, tab bar, indexing switch, checks) is ported from `Revvitapps/knothis-storefront`. Stays noindexed until launch is approved. No DNS change, domain cutover, payments or messages to the client without Matthew's explicit go-ahead. No secrets in git.
