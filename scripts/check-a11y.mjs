// axe-core on every route at phone size, plus WCAG contrast for every brand
// text/background pair in app/globals.css. Run after `npm run build`.
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { serve, routes } from "./serve.mjs";

const require = createRequire(import.meta.url);

// --- token contrast ---
const css = readFileSync("app/globals.css", "utf8");
const token = (name) => css.match(new RegExp(`--${name}:\\s*(#[0-9a-fA-F]{6})`))[1];
const lum = (hex) => {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255).map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((m, n) => n - m); return (x + 0.05) / (y + 0.05); };
const pairs = [["ink", "night"], ["muted", "night"], ["muted", "night-2"], ["ember", "night"], ["ember-2", "night"], ["ember-2", "night-2"], ["night", "ember"], ["paper-ink", "paper"], ["paper-muted", "paper"], ["ember-deep", "paper"], ["paper", "ember-deep"], ["night", "ink"]];
const rows = pairs.map(([fg, bg]) => { const r = ratio(token(fg), token(bg)); assert.ok(r >= 4.5, `${fg} on ${bg} is ${r.toFixed(2)}:1`); return `${fg}/${bg} ${r.toFixed(1)}`; });

// --- axe ---
let chromium;
try { ({ chromium } = require("playwright")); } catch { console.log("SKIP axe: playwright not installed (contrast passed: " + rows.join(", ") + ")"); process.exit(0); }
const axeSource = readFileSync(require.resolve("axe-core/axe.min.js"), "utf8");
const { base, stop } = await serve(process.env.CHECK_PORT ?? "3996");
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
const failures = [];
try {
  for (const path of routes) {
    await page.goto(base + path, { waitUntil: "networkidle" });
    await page.addScriptTag({ content: axeSource });
    const result = await page.evaluate(() => window.axe.run(document, { runOnly: ["wcag2a", "wcag2aa", "wcag21aa", "best-practice"] }));
    for (const v of result.violations.filter((v) => ["serious", "critical"].includes(v.impact))) failures.push(`${path}: ${v.id} (${v.nodes.length}) ${v.nodes[0]?.target}`);
  }
} finally {
  await browser.close();
  stop();
}
if (failures.length) { console.error("FAIL a11y:\n" + failures.join("\n")); process.exit(1); }
console.log(`PASS a11y: ${routes.length} routes clean of serious/critical axe issues; contrast ${rows.join(", ")}.`);
