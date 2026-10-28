// Boots the build and requests every route, the PWA files, every legacy
// redirect, every link in the tab bar / More sheet / footer, and the lead
// pipeline. Run with `npm run check:routes` after `npm run build`.
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { serve, routes } from "./serve.mjs";

const { base, stop } = await serve();
try {
  const linked = new Set();
  for (const path of routes) {
    const res = await fetch(base + path);
    assert.equal(res.status, 200, `${path} status`);
    const html = await res.text();
    assert.ok(html.includes("Dee Chernicky"), `${path} brand`);
    assert.ok(html.includes('class="tab-bar"'), `${path} tab bar`);
    for (const [, href] of html.matchAll(/href="(\/[^"#?]*)/g)) if (!href.startsWith("/_next") && !/\.(png|svg|webmanifest|jpg)$/.test(href)) linked.add(href);
  }
  // Nav crawl: every internal link on any page (tab bar, footer, cards) resolves.
  for (const href of linked) assert.equal((await fetch(base + href)).status, 200, `linked ${href}`);
  // More sheet links (rendered on open) come from the component source.
  for (const [, href] of readFileSync("components/tab-bar.tsx", "utf8").matchAll(/href="(\/[^"]*)"/g)) assert.equal((await fetch(base + href)).status, 200, `more sheet ${href}`);

  for (const [path, needle] of [["/manifest.webmanifest", '"Dee Chernicky Ministries"'], ["/offline.html", "offline"], ["/sw.js", "dcm-static"], ["/pwa/icon-512.png", ""], ["/pwa/icon-maskable-512.png", ""], ["/og-default.png", ""]]) {
    const res = await fetch(base + path);
    assert.equal(res.status, 200, path);
    if (needle) assert.ok((await res.text()).includes(needle), `${path} contains ${needle}`);
  }
  assert.match(await (await fetch(base + "/robots.txt")).text(), /Disallow: \//, "preview stays unindexed");

  for (const [from, to] of [["/radio-show", "/radio"], ["/christmas-celebration", "/events/christmas"], ["/shine-on-conference", "/events/shine-on"]]) {
    const res = await fetch(base + from, { redirect: "manual" });
    assert.equal(res.status, 308, `${from} permanent redirect`);
    assert.equal(new URL(res.headers.get("location"), base).pathname, to);
  }
  assert.equal((await fetch(base + "/events/nope")).status, 404);

  const post = (body) => fetch(base + "/api/pipeline", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(body) });
  const ok = await post({ id: "t1", kind: "prayer", name: "Test Person", note: "Check", source: "check", createdAt: new Date().toISOString() });
  assert.equal(ok.status, 200);
  assert.equal((await post({ kind: "give", name: "T" })).status, 422);
  assert.equal((await post({ kind: "nope", name: "Test" })).status, 400);

  console.log(`PASS routes: ${routes.length} pages, ${linked.size} linked paths, PWA files, 3 legacy redirects, 404, pipeline validation.`);
} finally {
  stop();
}
