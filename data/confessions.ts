/**
 * "Daily Confessions" from the 2019 radio-show page, word for word. The app
 * shows one per day (rotating by date) and keeps them all offline.
 */
export type Confession = { text: string; ref: string };

export const confessions: Confession[] = [
  { text: "I set the course of my life with my words.", ref: "James 3:2-5 & Proverbs 18:21" },
  { text: "God is on my side; therefore, I declare that I cannot be defeated.", ref: "Romans 8:37" },
  { text: "I am the head and not the tail. I have insight. I have wisdom. I have ideas and divine strategies. I have authority over all the works of the devil.", ref: "Deuteronomy 8:18, 28:13; James 1:5-8; Luke 10:19" },
  { text: "My family and those connected to us are protected from disaster, disease, divorce, division, adultery, poverty, false accusations, foolish decisions and all accidents, calamities and mishaps.", ref: "Psalm 91" },
  { text: "I speak God's promises over my life so that my faith is strengthened to possess all of God's promises.", ref: "Romans 4:17-23" },
  { text: "The memory of the upright is blessed. I have a powerful memory!", ref: "Proverbs 10:7" },
  { text: "I have a sound mind. I think the right thoughts, say the right words, and make the right decisions in every situation I face.", ref: "2 Timothy 1:7" },
  { text: "I expect to have powerful, divine appointments today to heal the sick, raise the dead, prophesy life, lead people to Christ, bring deliverance, and to release signs and wonders. I am blessed to be a blessing.", ref: "Book of Acts" },
  { text: "I expect that today will be the best day of my life spiritually, emotionally, relationally, and financially in Jesus' Name.", ref: "Romans 15:13" },
  { text: "All attacks that were headed my way are diverted right now through angelic protection in Jesus' Name.", ref: "Psalm 91" },
  { text: "Just as Jesus spoke to the wind, I say, \"Peace, be still\" to my spirit, soul, body, marriage, relationships, family and finances.", ref: "Mark 4:39" },
  { text: "I speak to every mountain of discouragement, stress, depression and lack, and say, \"Be cast into the sea; you have no place and no power over me\" in Jesus' Name.", ref: "Mark 11:22-24" },
  { text: "I declare that I serve a mighty God, who today will do exceedingly and abundantly above and beyond all that I can ask or think. You are a good God, and I eagerly anticipate Your goodness to flow in my life today.", ref: "Ephesians 3:20" },
  { text: "I am healed, whole, restored, and I receive double for any trouble that I have walked through.", ref: "Job 42:10" },
];

/** Same confession all day for everyone, in the visitor's local date. */
export function confessionFor(date: Date): { index: number; confession: Confession } {
  const day = Math.floor(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) / 86_400_000);
  const index = ((day % confessions.length) + confessions.length) % confessions.length;
  return { index, confession: confessions[index] };
}
