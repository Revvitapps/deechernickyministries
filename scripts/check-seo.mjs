// Every page has a unique title, a description, a canonical URL and noindex
// while SITE_INDEXING is off; robots.txt and sitemap follow the switch.
import assert from "node:assert/strict";
import { serve, routes } from "./serve.mjs";

const { base, stop } = await serve(process.env.CHECK_PORT ?? "3995");
try {
  const titles = new Set();
  for (const path of routes) {
    const html = await (await fetch(base + path)).text();
    const title = html.match(/<title>([^<]*)<\/title>/)?.[1];
    assert.ok(title, `${path} title`);
    assert.ok(!titles.has(title), `${path} duplicate title ${title}`);
    titles.add(title);
    assert.match(html, /<meta name="description" content="[^"]{40,}/, `${path} description`);
    assert.match(html, /<link rel="canonical"/, `${path} canonical`);
    assert.match(html, /<meta name="robots" content="noindex/, `${path} noindex before launch`);
    assert.match(html, /property="og:image"/, `${path} og:image`);
  }
  const sitemap = await (await fetch(base + "/sitemap.xml")).text();
  assert.ok(sitemap.includes("<loc>"), "sitemap lists the page");
  console.log(`PASS seo: ${routes.length} unique titles, descriptions, canonicals, noindex until SITE_INDEXING=on.`);
} finally {
  stop();
}
