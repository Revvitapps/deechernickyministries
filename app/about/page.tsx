import Link from "next/link";
import { PageIntro } from "@/components/page-intro";
import { Photo } from "@/components/photo";
import { Video } from "@/components/video";
import { dee, ministry, outreach } from "@/data/ministry";
import { slots } from "@/lib/photos";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("about");

export default function AboutPage() {
  return (
    <>
      <PageIntro eyebrow={dee.title} title={dee.name} lede={dee.bio[0]} photo="dee-portrait" alt="Dee Chernicky" />

      <section className="section wrap split">
        <div className="stack">
          {dee.bio.slice(1).map((p) => <p key={p} className="measure">{p}</p>)}
          <p className="measure">In her book <Link className="textlink" href="/book">Activating the Promises of God</Link>, Dee teaches you how to unlock the power of the Bible and empower your life.</p>
        </div>
        <div className="split-media tall">
          <Photo name={slots.aboutHero} alt="Dee Chernicky with her hand raised in praise on stage" fill sizes="(max-width: 860px) 100vw, 50vw" />
        </div>
      </section>

      <section className="paper section">
        <div className="wrap" style={{ display: "grid", gap: 40, gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))" }}>
          <div className="stack">
            <p className="eyebrow">Mission</p>
            <h2 className="h2">{ministry.mission}</h2>
          </div>
          <div className="stack">
            <p className="eyebrow">Vision</p>
            <h2 className="h2">{ministry.vision}</h2>
          </div>
          <blockquote className="verse" style={{ gridColumn: "1 / -1", fontFamily: "var(--font-display)", fontSize: "1.25rem", lineHeight: 1.45, maxWidth: "60ch" }}>
            “{ministry.anchorVerse.text}”
            <cite>{ministry.anchorVerse.ref}</cite>
          </blockquote>
        </div>
      </section>

      <section className="section wrap">
        <p className="eyebrow">{outreach.title}</p>
        <h2 className="h2" style={{ margin: "14px 0 10px" }}>Here’s what we’ve been <em>working on</em></h2>
        <p className="muted measure" style={{ marginBottom: 28 }}>{outreach.summary}</p>
        <Video id={ministry.videos.outreach.id} title={ministry.videos.outreach.title} poster="outreach-prison-crowd" />
        <div className="btn-row" style={{ marginTop: 28 }}>
          <Link href="/give?for=outreach" className="btn btn-primary">Give to the outreach</Link>
          <Link href="/contact?topic=speaking" className="btn btn-ghost">Invite Dee to speak</Link>
        </div>
      </section>
    </>
  );
}
