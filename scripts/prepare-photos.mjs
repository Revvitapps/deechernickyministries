// Copies the client's recovered photos (docs/recovered/.../images, decoded
// from Wayback captures of deechernickyministries.org) into public/photos
// under descriptive names and writes data/photo-manifest.json with each
// file's intrinsic size. next/image serves AVIF/WebP derivatives at runtime.
// Run with `npm run photos:prepare`.
import sharp from "sharp";
import { mkdir, writeFile } from "node:fs/promises";

const SRC = "docs/recovered/deechernickyministries-2026-10-28/images";
const OUT = "public/photos";

// recovered file -> public name. Low-resolution duplicates are left out.
const MAP = {
  "about-65fea2b551.jpg": "dee-portrait",
  "radio-show-cfcd6e60e7.jpg": "dee-headshot",
  "radio-show-efb48aada5.jpg": "valerie-headshot",
  "about-4418eb2d8b.jpg": "dee-worship",
  "about-5d78b897bb.jpg": "dee-stage-praise",
  "about-f6894faa2b.jpg": "dee-podium",
  "about-bc243dd0a5.jpg": "dee-with-guest",
  "home-daf8a89fa1.jpg": "radio-studio-dee",
  "radio-show-d64a69de64.jpg": "radio-studio-hosts",
  "about-935e90ee49.png": "prayer-embrace",
  "about-a4fb6a4f74.jpg": "shine-on-ballroom",
  "about-cddfd5878b.jpg": "outreach-prison-talk",
  "about-f6d03e05ac.jpg": "outreach-prison-worship",
  "home-2bdb920026.jpg": "outreach-prison-crowd",
  "about-f79fe2209d.jpg": "prayer-ministry",
  "home-fcf279a129.jpg": "shine-on-collage",
  "gallery-0de5a0ee18.jpg": "worship-guitar",
  "gallery-1d3083e45a.jpg": "speaker-emerald-coast",
  "gallery-2cbc51bbd2.jpg": "speaker-pink",
  "gallery-304eacfb1c.jpg": "speaker-book",
  "gallery-32781b94d0.jpg": "worship-shofar",
  "gallery-4848aa4578.jpg": "friends-hug",
  "gallery-5c424d4fec.jpg": "prayer-circle",
  "gallery-5e3607d71a.jpg": "speaker-denim",
  "gallery-63dc61fdcd.jpg": "shine-on-team",
  "gallery-6a5f15a67c.jpg": "friends-group",
  "gallery-719e791081.jpg": "stage-duo",
  "gallery-720ec23833.jpg": "mother-daughter",
  "gallery-7c1f25254f.jpg": "friends-seated",
  "gallery-7daf97f355.jpg": "vendor-table",
  "gallery-92baeb4f14.jpg": "shine-on-teens",
  "gallery-9666c8d4ac.jpg": "speaker-podium",
  "gallery-9893325072.jpg": "friends-trio",
  "gallery-b340525906.jpg": "altar-prayer",
  "gallery-b74ff26ecb.jpg": "praise-hand",
  "gallery-b964c2eb2c.jpg": "worship-singing",
  "gallery-c5ff40b391.jpg": "worship-team",
  "gallery-dec5c87294.jpg": "cross-thorns",
  "gallery-e73c4aa307.jpg": "friends-laugh",
  "gallery-ea4184b69f.jpg": "worship-solo",
};

await mkdir(OUT, { recursive: true });
const manifest = {};
for (const [file, name] of Object.entries(MAP)) {
  const out = `${OUT}/${name}.jpg`;
  const info = await sharp(`${SRC}/${file}`).flatten({ background: "#141a2e" }).jpeg({ quality: 86, mozjpeg: true }).toFile(out);
  manifest[name] = { src: `/photos/${name}.jpg`, width: info.width, height: info.height };
}
await writeFile("data/photo-manifest.json", JSON.stringify(manifest, null, 2) + "\n");
console.log(`Wrote ${Object.keys(manifest).length} photos to ${OUT} and data/photo-manifest.json`);
