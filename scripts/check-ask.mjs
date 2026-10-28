// Every Ask helper branch is reachable, every "next" points at a real node,
// every internal link is a real route, and personal topics reach a person.
// Run with `npm run check:ask` (bundles lib/ask.ts with esbuild from next).
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { build } from "esbuild";

const out = await build({ entryPoints: ["lib/ask.ts"], bundle: true, write: false, format: "esm", platform: "node", alias: { "@": "." } });
const { askNodes } = await import("data:text/javascript;base64," + Buffer.from(out.outputFiles[0].text).toString("base64"));

const seen = new Set();
const walk = (id) => {
  if (seen.has(id)) return;
  assert.ok(askNodes[id], `node ${id} exists`);
  seen.add(id);
  for (const a of askNodes[id].actions) if (a.kind === "next") walk(a.to);
};
walk("start");
assert.equal(seen.size, Object.keys(askNodes).length, "every node reachable from start");

const routeExists = (href) => {
  const path = href.split("?")[0];
  if (path === "/") return existsSync("app/page.tsx");
  const parts = path.split("/").filter(Boolean);
  if (existsSync(`app/${parts.join("/")}/page.tsx`)) return true;
  // One dynamic segment at the end, e.g. /events/[slug].
  return existsSync(`app/${[...parts.slice(0, -1), "[slug]"].join("/")}/page.tsx`);
};
for (const node of Object.values(askNodes)) {
  for (const a of node.actions) if (a.kind === "link" && a.href.startsWith("/")) assert.ok(routeExists(a.href), `${node.id}: ${a.href} is a route`);
}
for (const id of ["prayer", "tax", "hard", "speak"]) {
  assert.ok(askNodes[id].human, `${id} routes to a person`);
  assert.ok(askNodes[id].actions.some((a) => a.kind === "call" || a.href?.startsWith("/prayer") || a.href?.startsWith("/contact")), `${id} offers a human channel`);
}
console.log(`PASS ask: ${seen.size} nodes reachable, links resolve, personal topics go to a person.`);
