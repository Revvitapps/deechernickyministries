// Points the prototype subdomain dee-chernicky.revvit.io at Vercel via the
// Cloudflare API. Usage: CLOUDFLARE_API_TOKEN=... node scripts/cloudflare-dns.mjs [--apply]
// The token needs Zone -> DNS -> Edit on revvit.io. Never commit it.
// Without --apply it only prints the current records for the name and the plan.
// The record must stay DNS only (grey cloud): proxying breaks Vercel's SSL.
const token = process.env.CLOUDFLARE_API_TOKEN;
if (!token) {
  console.error("CLOUDFLARE_API_TOKEN is not set");
  process.exit(2);
}
const ZONE_NAME = "revvit.io";
const HOST = `${process.env.SUBDOMAIN ?? "dee-chernicky"}.${ZONE_NAME}`;
const apply = process.argv.includes("--apply");
const api = async (path, init = {}) => {
  const res = await fetch("https://api.cloudflare.com/client/v4" + path, {
    ...init,
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json", ...(init.headers ?? {}) },
  });
  const body = await res.json();
  if (!body.success) throw new Error(`${path}: ${JSON.stringify(body.errors)}`);
  return body.result;
};

const zones = await api(`/zones?name=${ZONE_NAME}`);
if (!zones.length) throw new Error(`Zone ${ZONE_NAME} not found for this token`);
const zone = zones[0];
console.log(`Zone ${zone.name} (${zone.id}) status=${zone.status}`);

const records = (await api(`/zones/${zone.id}/dns_records?per_page=500`)).filter((r) => r.name === HOST);
console.log(`\nCurrent records for ${HOST}:`);
if (!records.length) console.log("  none");
for (const r of records) console.log(`  ${r.type.padEnd(6)} ${r.name} -> ${r.content}  proxied=${r.proxied}`);

const wanted = { type: "CNAME", name: HOST, content: "cname.vercel-dns.com", proxied: false, ttl: 1, comment: "Vercel (dee-chernicky prototype)" };
const keep = records.find((r) => r.type === "CNAME" && r.content === wanted.content && r.proxied === false);
const plan = [
  ...records.filter((r) => r !== keep && ["A", "AAAA", "CNAME"].includes(r.type)).map((r) => ({ op: "delete", r })),
  ...(keep ? [] : [{ op: "create", w: wanted }]),
];

console.log("\nPlan:");
if (!plan.length) console.log("  nothing to change");
for (const p of plan) console.log(p.op === "delete" ? `  delete ${p.r.type} ${p.r.name} -> ${p.r.content}` : `  create CNAME ${HOST} -> cname.vercel-dns.com (DNS only)`);

if (!apply) {
  console.log("\nDry run. Re-run with --apply to make these changes.");
  process.exit(0);
}
for (const p of plan) {
  if (p.op === "delete") await api(`/zones/${zone.id}/dns_records/${p.r.id}`, { method: "DELETE" });
  else await api(`/zones/${zone.id}/dns_records`, { method: "POST", body: JSON.stringify(p.w) });
  console.log(p.op === "delete" ? `deleted ${p.r.type} ${p.r.name}` : `created CNAME ${HOST}`);
}
console.log("Done.");
