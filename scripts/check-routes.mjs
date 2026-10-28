// Boots the build and checks the coming-soon page, the PWA files, robots and
// every legacy redirect. Run with `npm run check:routes` after `npm run build`.
import assert from "node:assert/strict";
import { serve } from "./serve.mjs";

const { base, stop } = await serve();
try {
  const html = await (await fetch(base + "/")).text();
  for (const needle of ["Ignite a fire for", "Our new home is coming soon", "850-366-3550", "P.O. Box 1014"]) assert.ok(html.includes(needle), `home contains ${needle}`);

  for (const [path, needle] of [["/manifest.webmanifest", '"Dee Chernicky Ministries"'], ["/offline.html", "offline"], ["/sw.js", "dcm-static"], ["/pwa/icon-512.png", ""], ["/og-default.png", ""]]) {
    const res = await fetch(base + path);
    assert.equal(res.status, 200, path);
    if (needle) assert.ok((await res.text()).includes(needle), `${path} contains ${needle}`);
  }
  assert.match(await (await fetch(base + "/robots.txt")).text(), /Disallow: \//, "preview stays unindexed");

  const legacy = ["/home", "/about", "/radio-show", "/contact", "/gallery", "/christmas-celebration", "/shine-on-conference"];
  for (const from of legacy) {
    const res = await fetch(base + from, { redirect: "manual" });
    assert.equal(res.status, 308, `${from} permanent redirect`);
    assert.equal(new URL(res.headers.get("location"), base).pathname, "/", `${from} target`);
  }
  assert.equal((await fetch(base + "/nope")).status, 404);
  console.log(`PASS routes: coming-soon page, PWA files, robots, ${legacy.length} legacy redirects, 404.`);
} finally {
  stop();
}
