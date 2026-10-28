import manifest from "@/data/photo-manifest.json";

export type PhotoName = keyof typeof manifest;
export type PhotoAsset = { src: string; width: number; height: number };

export const photos = manifest as Record<PhotoName, PhotoAsset>;

export const photo = (name: string): PhotoAsset | undefined => photos[name as PhotoName];

/** Which recovered photo fills which slot. Swap here, not in the screens. */
export const slots = {
  homeHero: "dee-portrait",
  homeBand: "shine-on-ballroom",
  radio: "radio-studio-hosts",
  radioDee: "dee-headshot",
  radioValerie: "valerie-headshot",
  aboutHero: "dee-stage-praise",
  give: "outreach-prison-worship",
  book: "dee-podium",
  contact: "prayer-ministry",
} as const satisfies Record<string, PhotoName>;

/** Gallery order: people first, then the rooms. */
export const gallery: { name: PhotoName; alt: string }[] = [
  { name: "dee-worship", alt: "Dee Chernicky in worship at Shine On" },
  { name: "shine-on-teens", alt: "Teen girls at the Shine On conference" },
  { name: "altar-prayer", alt: "A woman kneeling in prayer at the altar while Dee prays" },
  { name: "outreach-prison-crowd", alt: "Women in a prison outreach service" },
  { name: "friends-hug", alt: "Two women embracing at Shine On" },
  { name: "worship-singing", alt: "A woman singing in worship" },
  { name: "shine-on-team", alt: "The Shine On team at the welcome table" },
  { name: "prayer-circle", alt: "Women praying together" },
  { name: "speaker-emerald-coast", alt: "A speaker at the Emerald Coast Convention Center" },
  { name: "mother-daughter", alt: "A mother and daughter at Shine On" },
  { name: "worship-shofar", alt: "Worship with a shofar" },
  { name: "stage-duo", alt: "Two women ministering on stage" },
  { name: "friends-group", alt: "Friends together at the conference" },
  { name: "outreach-prison-worship", alt: "Prison outreach worship" },
  { name: "speaker-book", alt: "A speaker holding her Bible" },
  { name: "praise-hand", alt: "A woman with her hand raised in praise" },
  { name: "worship-guitar", alt: "A worship leader with guitar" },
  { name: "friends-trio", alt: "Three women at Shine On" },
  { name: "speaker-pink", alt: "A speaker with a microphone" },
  { name: "worship-team", alt: "Dee with the worship team" },
  { name: "friends-seated", alt: "Two women seated together" },
  { name: "speaker-denim", alt: "A speaker sharing a testimony" },
  { name: "worship-solo", alt: "A woman leading a song" },
  { name: "vendor-table", alt: "A vendor table at the conference" },
  { name: "friends-laugh", alt: "Women laughing together" },
  { name: "speaker-podium", alt: "A speaker at the podium" },
  { name: "dee-with-guest", alt: "Dee Chernicky with a guest" },
  { name: "cross-thorns", alt: "A wooden cross with a crown of thorns" },
];
