import { TodaysConfession } from "@/components/confession";
import { confessions } from "@/data/confessions";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("today");

export default function TodayPage() {
  return (
    <>
      <section className="wrap" style={{ paddingTop: 24, paddingBottom: 56 }}>
        <TodaysConfession full />
      </section>
      <section className="paper section">
        <div className="wrap">
          <p className="eyebrow">Daily Confessions</p>
          <h1 className="h2" style={{ margin: "14px 0 8px" }}>I set the course of my life <em>with my words</em>.</h1>
          <p className="muted measure" style={{ marginBottom: 28 }}>All {confessions.length} of Dee’s confessions, saved on your phone so they work offline.</p>
          <ol className="facts" style={{ listStyle: "none" }}>
            {confessions.map((c, i) => (
              <li key={i}>
                <span className="serif" style={{ fontSize: "1.2rem", color: "var(--ember-deep)" }}>{i + 1}</span>
                <span>{c.text}<br /><span className="small" style={{ letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--ember-deep)" }}>{c.ref}</span></span>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
