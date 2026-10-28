// Boots the build and requests both routes, checks every section anchor the
// header links to exists, the PWA files, every legacy redirect and the lead
// pipeline. Run with `npm run check:routes` after `npm run build`.
import assert from "node:assert/strict";
import { serve, routes, sections } from "./serve.mjs";

const { base, stop } = await serve();
try {
  const linked = new Set();
  for (const path of routes) {
    const res = await fetch(base + path);
    assert.equal(res.status, 200, `${path} status`);
    const html = await res.text();
    assert.ok(html.includes("Dee Chernicky"), `${path} brand`);
    assert.ok(html.includes('class="topbar"'), `${path} header`);
    if (path === "/") for (const id of sections) assert.ok(html.includes(`id="${id}"`), `section #${id}`);
    for (const [, id] of html.matchAll(/href="\/?#([a-z-]+)"/g)) assert.ok(html.includes(`id="${id}"`) || path !== "/", `anchor #${id} has a section`);
    for (const [, href] of html.matchAll(/href="(\/[^"#?]*)/g)) if (!href.startsWith("/_next") && !/\.(png|svg|webmanifest|jpg)$/.test(href)) linked.add(href);
  }
  // Nav crawl: every internal link on any page (tab bar, footer, cards) resolves.
  for (const href of linked) assert.equal((await fetch(base + href)).status, 200, `linked ${href}`);

  for (const [path, needle] of [["/manifest.webmanifest", '"Dee Chernicky Ministries"'], ["/offline.html", "offline"], ["/sw.js", "dcm-static"], ["/pwa/icon-512.png", ""], ["/pwa/icon-maskable-512.png", ""], ["/og-default.png", ""]]) {
    const res = await fetch(base + path);
    assert.equal(res.status, 200, path);
    if (needle) assert.ok((await res.text()).includes(needle), `${path} contains ${needle}`);
  }
  assert.match(await (await fetch(base + "/robots.txt")).text(), /Disallow: \//, "preview stays unindexed");

  const legacy = [["/about", "#about"], ["/radio-show", "#radio"], ["/contact", "#contact"], ["/gallery", "#outreach"], ["/christmas-celebration", "#events"], ["/shine-on-conference", "#events"], ["/home", ""]];
  for (const [from, hash] of legacy) {
    const res = await fetch(base + from, { redirect: "manual" });
    assert.equal(res.status, 308, `${from} permanent redirect`);
    const to = new URL(res.headers.get("location"), base);
    assert.equal(to.pathname + to.hash, "/" + hash, `${from} target`);
  }
  assert.equal((await fetch(base + "/radio")).status, 404);

  const post = (body) => fetch(base + "/api/pipeline", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(body) });
  const ok = await post({ id: "t1", kind: "prayer", name: "Test Person", note: "Check", source: "check", createdAt: new Date().toISOString() });
  assert.equal(ok.status, 200);
  assert.equal((await post({ kind: "give", name: "T" })).status, 422);
  assert.equal((await post({ kind: "nope", name: "Test" })).status, 400);

  console.log(`PASS routes: ${routes.length} pages, ${sections.length} sections, ${linked.size} linked paths, PWA files, ${legacy.length} legacy redirects, 404, pipeline validation.`);
} finally {
  stop();
}
