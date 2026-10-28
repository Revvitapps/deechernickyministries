// Boots the production build, screenshots every main route at phone and
// desktop sizes into .cache/screens/, and fails on horizontal overflow, a
// missing tab bar, or a broken offline fallback. Requires `npm run build`.
// Run with `npm run screens`.
import { spawn } from "node:child_process";
import { mkdir } from "node:fs/promises";
import { createRequire } from "node:module";

// Playwright is preinstalled globally in the build container; locally, `npm i -D playwright`.
const require = createRequire(import.meta.url);
const { chromium } = require("playwright");

const port = process.env.CHECK_PORT ?? "3998";
const base = `http://127.0.0.1:${port}`;
const routes = ["/", "/radio", "/give", "/events", "/events/shine-on", "/events/christmas", "/book", "/about", "/gallery", "/contact", "/prayer", "/today", "/audit"];
const viewports = { phone: { width: 390, height: 844 }, desktop: { width: 1440, height: 900 } };
const full = process.argv.includes("--full");

const server = spawn("node", ["node_modules/next/dist/bin/next", "start", "-p", port], { stdio: "ignore" });
const stop = () => server.kill("SIGTERM");
process.on("exit", stop);
for (let i = 0; i < 60; i++) {
  try { if ((await fetch(base + "/robots.txt")).ok) break; } catch {}
  await new Promise((r) => setTimeout(r, 500));
}

await mkdir(".cache/screens", { recursive: true });
const browser = await chromium.launch();
const problems = [];
for (const [label, viewport] of Object.entries(viewports)) {
  const context = await browser.newContext({ viewport, deviceScaleFactor: 1, reducedMotion: "reduce" });
  const page = await context.newPage();
  for (const route of routes) {
    await page.goto(base + route, { waitUntil: "networkidle" });
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 600) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 60)); }
      window.scrollTo(0, 0);
    });
    await page.waitForTimeout(300);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    if (overflow > 0) problems.push(`${label} ${route}: horizontal overflow ${overflow}px`);
    if (!(await page.locator("nav.tab-bar").isVisible())) problems.push(`${label} ${route}: tab bar missing`);
    const name = route === "/" ? "home" : route.slice(1).replaceAll("/", "-");
    await page.screenshot({ path: `.cache/screens/${label}-${name}.png`, fullPage: full || route === "/" });
  }
  await context.close();
}

// Offline: production SW installs, then the server dies and navigations fall back.
const context = await browser.newContext({ viewport: viewports.phone });
const page = await context.newPage();
await page.goto(base + "/", { waitUntil: "networkidle" });
await page.evaluate(() => navigator.serviceWorker.ready);
await page.reload({ waitUntil: "networkidle" });
await page.goto(base + "/gallery", { waitUntil: "networkidle" });
await context.setOffline(true);
await page.goto(base + "/today").catch(() => {});
const todayHtml = await page.content();
if (!todayHtml.includes("Daily Confessions")) problems.push("offline: /today did not load from cache: " + todayHtml.slice(0, 200));
await page.goto(base + "/book").catch(() => {});
if (!(await page.content()).includes("offline")) problems.push("offline: unvisited page did not get the offline page");
await page.screenshot({ path: ".cache/screens/phone-offline.png" });
await browser.close();
stop();

if (problems.length) {
  console.error("FAIL screens:\n" + problems.join("\n"));
  process.exit(1);
}
console.log(`PASS screens: ${routes.length} routes x 2 viewports, no overflow, tab bar on every screen, offline fallback works. See .cache/screens/.`);
