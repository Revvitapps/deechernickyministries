"use client";
import { useSyncExternalStore } from "react";
import { Share2 } from "lucide-react";
import { confessionFor, confessions } from "@/data/confessions";

const noop = () => () => {};
// Server render uses the first confession; the client swaps in today's (local date).
const useTodayIndex = () => useSyncExternalStore(noop, () => confessionFor(new Date()).index, () => 0);

export function TodaysConfession() {
  const index = useTodayIndex();
  const c = confessions[index];
  const share = async () => {
    const text = `“${c.text}” ${c.ref}`;
    try {
      if (navigator.share) await navigator.share({ title: "Today’s confession", text, url: location.origin + "/#today" });
      else await navigator.clipboard.writeText(text);
    } catch {}
  };
  return (
    <section className="confession" aria-labelledby="confession-title">
      <p className="eyebrow" id="confession-title">Today’s confession</p>
      <blockquote>
        {c.text}
        <cite>{c.ref}</cite>
      </blockquote>
      <div className="btn-row">
        <button type="button" className="btn btn-ghost" onClick={share}>
          <Share2 size={18} aria-hidden="true" /> Share it
        </button>
      </div>
      <p className="small muted" style={{ marginTop: 18 }}>From Dee’s Daily Confessions. Say it out loud. A new one every day.</p>
    </section>
  );
}
