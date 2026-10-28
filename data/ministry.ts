/**
 * Everything the prototype says about the ministry, in one typed file.
 *
 * Source: Wayback Machine captures of deechernickyministries.org (Vistaprint
 * Digital site, Oct–Nov 2019), recovered 2026-10-28 into
 * docs/recovered/deechernickyministries-2026-10-28/, plus Matthew's
 * coming-soon draft (coming-soon.html in the same folder).
 *
 * Nothing here is invented. Anything we could not recover is a visible
 * PLACEHOLDER and an open question in README.md. Dates from 2019 are labelled
 * as such until the ministry confirms the current schedule.
 */

export const PLACEHOLDER = (what: string) => `[PLACEHOLDER: ${what}]`;

export const ministry = {
  name: "Dee Chernicky Ministries",
  shortName: "Dee Chernicky",
  mission: "Ignite a fire for God's presence and His Word.",
  vision: "To see the body of Christ walk in the power of God's Word.",
  // Home page headline on the 2019 site.
  promise: "Every need, problem, desire and situation that will ever come up in your life will find its solution in the Word of God.",
  calling: { text: "I will seek the lost, and I will bring back the strayed.", ref: "Ezekiel 34:16" },
  anchorVerse: {
    text: "This Book of the Law shall not depart from your mouth, but you shall meditate on it day and night, so that you may be careful to do according to all that is written in it. For then you will make your way prosperous, and then you will have good success.",
    ref: "Joshua 1:8",
  },
  nonprofit: "Dee Chernicky Ministries is a non-profit 501(c)(3) organization.",
  phone: { display: "850-366-3550", href: "tel:+18503663550", label: "Ministry office" },
  // Coming-soon draft uses the Gmail address; the 2019 site used deechernicky@aol.com. Confirm.
  email: "deedeechernicky@gmail.com",
  legacyEmail: "deechernicky@aol.com",
  mail: { lines: ["P.O. Box 1014", "Destin, Florida 32540"], oneLine: "P.O. Box 1014, Destin, FL 32540" },
  assistant: { name: "Elisha Beplay", role: "Personal Assistant", email: "elishabeplay@gmail.com" },
  socials: [] as { label: string; url: string }[], // none linked on the 2019 site
  videos: {
    heart: { id: "sWu0MNOHAP0", title: "The Heart of Dee Chernicky Ministries", credit: "Photo: Mona Ponder" },
    outreach: { id: "m3DF1Ivxwqg", title: "Dee Chernicky Ministries Outreaches" },
  },
} as const;

export const dee = {
  name: "Dee Chernicky",
  title: "Licensed and Ordained Minister",
  bio: [
    "Dee is a wife, mother, author, weekly radio host and successful business entrepreneur.",
    "She is an ordained minister through Victory Christian Center and a graduate of Victory Bible Institute in Tulsa, Oklahoma. Dee is the founder and host of the annual Shine On Women's Conference and Life Issues, Real Answers, heard every Friday on WPSM 91.1 FM and wpsm.com in Destin, Florida.",
    "Her contagious passion inspires others to discover their destiny through the transforming Word of God.",
  ],
};

export const valerie = {
  name: "Valerie Peterson",
  title: "Licensed Mental Health Counselor",
  bio: "Valerie is a Licensed Mental Health Counselor in Florida, a Certified Clinical Mental Health Counselor and a National Board Certified Counselor. She holds a Bachelor's in Social Work from Ashland University and a Master's in Pastoral Psychology and Counseling from Ashland Theological Seminary, and is in private practice with Destin Counseling Center, where she works with the issues men and women face, marriage and family, and addictions.",
  url: "http://valeriepeterson.org/index.php/radio-show/",
};

export const book = {
  title: "Activating the Promises of God",
  author: "Dee Chernicky",
  pitch: "Dee teaches you how to unlock the power of the Bible and empower your life.",
  reach: "Used internationally and nationally, including in prisons and outreach homes for women.",
  price: PLACEHOLDER("book price"),
  buyUrl: null as string | null, // where the book is sold today is unknown
};

export const radio = {
  name: "Life Issues, Real Answers",
  tagline: "Solving life's issues with the power of God's Word.",
  hosts: "Dee Chernicky & Valerie Peterson",
  when: "Fridays, 11:00 to 11:30 AM",
  station: { name: "WPSM 91.1 FM", city: "Destin", url: "https://www.wpsm.com", slogan: "The Positive Choice" },
  live: { venue: "Just Love Coffee Cafe", address: "985 Highway 98, Destin, FL", note: "Join us live" },
  archiveUrl: "http://valeriepeterson.org/index.php/radio-show/",
  asOf: "2019",
  // The 2019 'Upcoming shows' list, kept as a sample of the format.
  sampleEpisodes: [
    { date: "Nov 8, 2019", topic: "Resolving Conflict in Business & Life", guest: "Mona Ponder" },
    { date: "Nov 15, 2019", topic: "Overcoming Loneliness", guest: "Pastor Barry Carpenter, Destin United Methodist Church" },
    { date: "Nov 22, 2019", topic: "Making a Difference", guest: "Lori Joyner, Destin Harvest House" },
    { date: "Dec 6, 2019", topic: null, guest: "Pastors Dave & Scarlett Horton" },
    { date: "Dec 13, 2019", topic: null, guest: "Pastor John Skiles, Impact Life Church" },
  ],
};

export type MinistryEvent = {
  slug: "shine-on" | "christmas";
  name: string;
  kicker: string;
  summary: string;
  nextDate: string;
  lastHeld: string[];
  externalUrl: string;
  photo: string;
  cta: string;
};

export const events: MinistryEvent[] = [
  {
    slug: "shine-on",
    name: "Shine On Women's & Teen Conference",
    kicker: "Annual conference",
    summary: "Dee's annual gathering for women and teens: worship, teaching and prayer to discover your destiny through the transforming Word of God.",
    nextDate: PLACEHOLDER("next Shine On date and venue"),
    lastHeld: [],
    externalUrl: "http://www.shineonconference.org/",
    photo: "shine-on-ballroom",
    cta: "Save my seat",
  },
  {
    slug: "christmas",
    name: "Christmas Celebration Dinner",
    kicker: "Every December",
    summary: "A complimentary Christmas dinner hosted by Dee Chernicky & Valerie Peterson. Guests of honor: women from our area shelters. A love offering is taken for DC Outreach Ministries.",
    nextDate: PLACEHOLDER("2026 dinner date and venue"),
    lastHeld: [
      "9th annual: Monday, December 9, 2019",
      "Embassy Suites by Hilton, Destin, Florida",
      "6:00 to 9:00 PM, doors open 5:30 PM",
      "Complimentary tickets; large groups email the office",
    ],
    externalUrl: "https://christmascelebrationdinner.org",
    photo: "prayer-circle",
    cta: "Reserve a seat",
  },
];

export const outreach = {
  title: "Outreach",
  summary: "Dee takes the Word into prisons and outreach homes for women, and every Christmas the ministry honors women from area shelters.",
  photos: ["outreach-prison-crowd", "outreach-prison-worship", "outreach-prison-talk"],
};

export const giving = {
  // Only the mailing address is known. Online giving is not set up on any recovered page.
  mailTo: ministry.mail,
  payableTo: ministry.name,
  online: null as string | null,
  onlineNote: PLACEHOLDER("online giving processor (Stripe, Tithe.ly, PayPal Giving Fund?)"),
  designations: ["Where it's needed most", "Prison & shelter outreach", "Christmas Celebration Dinner", "Shine On Conference", "Radio ministry"],
  // UI suggestions only, not ministry figures.
  sampleAmounts: [25, 50, 100, 250],
};
