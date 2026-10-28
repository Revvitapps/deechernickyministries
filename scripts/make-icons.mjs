// Builds the home-screen icons, favicon and default share image from the
// ministry mark (components/mark.tsx: a flame inside an arch). No logo was
// recovered from the old site, so the mark is drawn here as SVG and needs no
// installed fonts. Run with `npm run icons:make`.
import sharp from "sharp";
import { mkdir, writeFile } from "node:fs/promises";

const NIGHT = "#141a2e";
const mark = (stroke = "#f3c784") => `
  <path d="M4 46V20a16 16 0 0 1 32 0v26" fill="none" stroke="${stroke}" stroke-width="2.4" stroke-linecap="round"/>
  <path d="M20 14c4 6 9 9 9 17a9 9 0 0 1-18 0c0-4 2-6 4-8 0 3 1 5 3 6-1-6 0-10 2-15z" fill="#e3a04f"/>
  <path d="M20 28c2 2 4 4 4 7a4 4 0 0 1-8 0c0-2 1-3 2-4 0 1 1 2 2 2-1-2 0-3 0-5z" fill="${NIGHT}" opacity=".55"/>`;

// The mark is 40x48; `scale` is the share of the tile height it fills.
function tile(size, scale, { round = false } = {}) {
  const h = size * scale;
  const k = h / 48;
  const x = (size - 40 * k) / 2;
  const y = (size - h) / 2;
  return Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
    <defs><radialGradient id="g" cx="50%" cy="58%" r="55%"><stop offset="0" stop-color="#e3a04f" stop-opacity=".35"/><stop offset="1" stop-color="#e3a04f" stop-opacity="0"/></radialGradient></defs>
    <rect width="${size}" height="${size}" rx="${round ? size * 0.22 : 0}" fill="${NIGHT}"/>
    <rect width="${size}" height="${size}" fill="url(#g)"/>
    <g transform="translate(${x} ${y}) scale(${k})">${mark()}</g></svg>`);
}

await mkdir("public/pwa", { recursive: true });
const out = (size, scale, file, opts) => sharp(tile(size, scale, opts)).png().toFile(file);

await out(192, 0.62, "public/pwa/icon-192.png");
await out(512, 0.62, "public/pwa/icon-512.png");
await out(180, 0.6, "public/pwa/apple-touch-icon.png");
// Maskable: the mark stays inside the central 80% safe zone (here ~46% of the height).
await out(192, 0.46, "public/pwa/icon-maskable-192.png");
await out(512, 0.46, "public/pwa/icon-maskable-512.png");
await writeFile("public/favicon.svg", tile(64, 0.7, { round: true }));

// Share image 1200x630: arch-framed portrait of Dee, mark and the mission.
const portrait = await sharp("public/photos/dee-portrait.jpg").resize(380, 470, { fit: "cover", position: "top" }).toBuffer();
const archMask = Buffer.from(`<svg width="380" height="470"><path d="M0 470V190a190 190 0 0 1 380 0v280z" fill="#fff"/></svg>`);
const framed = await sharp(portrait).composite([{ input: archMask, blend: "dest-in" }]).png().toBuffer();
const og = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <defs><radialGradient id="g" cx="78%" cy="45%" r="50%"><stop offset="0" stop-color="#e3a04f" stop-opacity=".28"/><stop offset="1" stop-color="#e3a04f" stop-opacity="0"/></radialGradient></defs>
  <rect width="1200" height="630" fill="${NIGHT}"/><rect width="1200" height="630" fill="url(#g)"/>
  <g transform="translate(80 90) scale(1.6)">${mark()}</g>
  <text x="80" y="250" font-family="Georgia, serif" font-size="66" font-weight="600" fill="#f6efe4">Ignite a fire for</text>
  <text x="80" y="330" font-family="Georgia, serif" font-size="66" font-style="italic" fill="#f3c784">God’s presence</text>
  <text x="80" y="410" font-family="Georgia, serif" font-size="66" font-weight="600" fill="#f6efe4">and His Word.</text>
  <text x="80" y="520" font-family="sans-serif" font-size="22" letter-spacing="6" fill="#c9bfae">DEE CHERNICKY MINISTRIES · DESTIN, FLORIDA</text>
  <path d="M760 600V270a190 190 0 0 1 380 0v330" fill="none" stroke="#f3c784" stroke-opacity=".4" stroke-width="2"/>
</svg>`);
await sharp(og).composite([{ input: framed, left: 770, top: 120 }]).png().toFile("public/og-default.png");
console.log("Wrote PWA icons, favicon and public/og-default.png.");
