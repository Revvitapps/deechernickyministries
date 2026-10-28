import { CalendarClock, Coffee, ExternalLink, Radio as RadioIcon, Archive } from "lucide-react";
import Image from "next/image";
import { PageIntro } from "@/components/page-intro";
import { Photo } from "@/components/photo";
import { LeadForm } from "@/components/lead-form";
import { dee, radio, valerie } from "@/data/ministry";
import { slots } from "@/lib/photos";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("radio");

export default function RadioPage() {
  return (
    <>
      <PageIntro eyebrow="On the radio" title={radio.name} lede={radio.tagline} photo={slots.radioDee} alt="Dee Chernicky">
        <div className="btn-row">
          <a href={radio.station.url} className="btn btn-primary" target="_blank" rel="noreferrer">
            <RadioIcon size={18} aria-hidden="true" /> Listen on {radio.station.name}
          </a>
          <a href="#remind" className="btn btn-ghost">Remind me Fridays</a>
        </div>
      </PageIntro>

      <section className="section wrap split">
        <div className="stack">
          <ul className="facts">
            <li><CalendarClock aria-hidden="true" /><span><strong>{radio.when}</strong><br /><span className="muted">{radio.station.name}, {radio.station.city}, and wpsm.com</span></span></li>
            <li><Coffee aria-hidden="true" /><span><strong>{radio.live.note} at {radio.live.venue}</strong><br /><span className="muted">{radio.live.address}</span></span></li>
            <li><Archive aria-hidden="true" /><span><strong>Past shows</strong><br /><a className="textlink" href={radio.archiveUrl} target="_blank" rel="noreferrer">Show archive on Valerie’s site <ExternalLink size={12} aria-hidden="true" /></a></span></li>
          </ul>
          <p className="sample">Schedule as published in {radio.asOf}. Confirming it’s current.</p>
        </div>
        <div className="split-media" style={{ aspectRatio: "auto", background: "#fff", padding: "clamp(20px, 4vw, 40px)" }}>
          <Image src="/brand/life-issues-real-answers.jpg" alt={`${radio.name} logo`} width={1100} height={424} style={{ width: "100%", height: "auto" }} />
        </div>
      </section>

      <section className="section dusk">
        <div className="wrap">
          <p className="eyebrow">Your hosts</p>
          <h2 className="h2" style={{ margin: "14px 0 28px" }}>A minister and a counselor, <em>at the same table</em>.</h2>
          <div className="people">
            {[{ p: dee, photo: slots.radioDee, body: dee.bio[1] }, { p: valerie, photo: slots.radioValerie, body: valerie.bio }].map(({ p, photo, body }) => (
              <article className="person" key={p.name}>
                <div className="person-photo"><Photo name={photo} alt={p.name} fill sizes="96px" /></div>
                <div className="stack" style={{ display: "grid", gap: 8 }}>
                  <b>{p.name}</b>
                  <span className="pill" style={{ fontSize: "0.74rem" }}>{p.title}</span>
                  <p className="muted small">{body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section wrap">
        <p className="eyebrow">The format</p>
        <h2 className="h2" style={{ margin: "14px 0 8px" }}>Each week, a real issue and a guest</h2>
        <p className="sample" style={{ marginBottom: 20 }}>Sample: the 2019 line-up from the old site</p>
        <ul className="facts">
          {radio.sampleEpisodes.map((e) => (
            <li key={e.date}>
              <CalendarClock aria-hidden="true" />
              <span><strong>{e.topic ?? "Live show"}</strong><br /><span className="muted small">{e.date} · Guest co-host: {e.guest}</span></span>
            </li>
          ))}
        </ul>
      </section>

      <section id="remind" className="paper section">
        <div className="wrap split" style={{ alignItems: "start" }}>
          <div className="stack">
            <p className="eyebrow">Never miss a Friday</p>
            <h2 className="h2">Get a reminder, or <em>ask a question</em> on air.</h2>
            <p className="muted measure">Tell us what you’re facing. Dee and Valerie choose each week’s topic from real life.</p>
          </div>
          <div className="panel">
            <LeadForm
              kind="radio"
              source="radio"
              submitLabel="Sign me up"
              fields={[
                { type: "textarea", name: "note", label: "A question or topic for the show (optional)" },
                { type: "check", name: "reminder", label: "Text or email me a reminder before each show", defaultChecked: true },
              ]}
              doneTitle="You’re on the list"
              doneBody="We’ll remind you before Friday’s show. Questions go to Dee and Valerie."
            />
          </div>
        </div>
      </section>
    </>
  );
}
