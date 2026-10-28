import Image from "next/image";
import { Archive, BookOpen, CalendarClock, CalendarHeart, Coffee, ExternalLink, History, Landmark, Mail, MapPin, Phone, Radio, ShieldCheck, UserRound } from "lucide-react";
import { Photo } from "@/components/photo";
import { Video } from "@/components/video";
import { Fact } from "@/components/fact";
import { LeadForm } from "@/components/lead-form";
import { TodaysConfession } from "@/components/confession";
import { book, dee, events, giving, ministry, outreach, radio, valerie } from "@/data/ministry";
import { slots } from "@/lib/photos";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("home");

/**
 * The whole site on one page, for the January 1 launch. Each section has an
 * id the header links to; old site paths redirect to these anchors
 * (next.config.ts). The multi-screen PWA lives on the `pwa-full` branch.
 */
export default function Home() {
  return (
    <>
      {/* ---------- hero ---------- */}
      <section id="top" className="hero" aria-labelledby="hero-title">
        <div className="wrap hero-grid">
          <div>
            <p className="eyebrow rise">{ministry.name}<span className="hide-sm">&nbsp;· Destin, Florida</span></p>
            <h1 id="hero-title" className="h1 rise rise-2">
              Ignite a fire for <em>God’s presence</em> and His Word.
            </h1>
            <p className="lede rise rise-3">{ministry.promise}</p>
            <div className="btn-row rise rise-3">
              <a href="#prayer" className="btn btn-primary">Send a prayer request</a>
              <a href="#radio" className="btn btn-ghost"><Radio size={18} aria-hidden="true" /> Fridays on 91.1 FM</a>
            </div>
            <blockquote className="verse rise rise-3">
              “{ministry.calling.text}”
              <cite>{ministry.calling.ref}</cite>
            </blockquote>
          </div>
          <figure className="portrait rise rise-2">
            <div className="halo" />
            <div className="arch">
              <Photo name={slots.homeHero} alt="Dee Chernicky" fill priority sizes="(max-width: 860px) 58vw, 400px" />
            </div>
            <figcaption className="nameplate">Dee Chernicky</figcaption>
          </figure>
        </div>
      </section>

      {/* ---------- today's confession ---------- */}
      <section id="today" className="wrap" style={{ paddingBottom: "clamp(56px, 9vw, 120px)" }}>
        <TodaysConfession />
      </section>

      {/* ---------- about ---------- */}
      <section id="about" className="paper section" aria-labelledby="about-title">
        <div className="wrap split">
          <div className="stack">
            <p className="eyebrow">{dee.title}</p>
            <h2 id="about-title" className="h2">Meet <em>Dee</em></h2>
            {dee.bio.map((p) => <p key={p} className="measure">{p}</p>)}
            <div className="mv">
              <div><span className="eyebrow">Mission</span><p className="serif">{ministry.mission}</p></div>
              <div><span className="eyebrow">Vision</span><p className="serif">{ministry.vision}</p></div>
            </div>
          </div>
          <div className="split-media tall">
            <Photo name={slots.aboutHero} alt="Dee Chernicky with her hand raised in praise on stage" fill sizes="(max-width: 860px) 100vw, 50vw" />
          </div>
        </div>
      </section>

      {/* ---------- outreach ---------- */}
      <section id="outreach" className="section dusk" aria-labelledby="outreach-title">
        <div className="wrap">
          <p className="eyebrow">{outreach.title}</p>
          <h2 id="outreach-title" className="h2" style={{ margin: "14px 0 10px" }}>
            Seeking the lost, bringing back <em>the strayed</em>.
          </h2>
          <p className="muted measure" style={{ marginBottom: 28 }}>{outreach.summary}</p>
          <Video id={ministry.videos.outreach.id} title={ministry.videos.outreach.title} poster="outreach-prison-crowd" />
          <div className="strip">
            {["outreach-prison-worship", "altar-prayer", "shine-on-teens", "friends-hug", "worship-singing", "prayer-circle"].map((p) => (
              <figure key={p}><Photo name={p} alt="" fill sizes="(max-width: 700px) 45vw, 16vw" /></figure>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- radio ---------- */}
      <section id="radio" className="section wrap" aria-labelledby="radio-title">
        <div className="split">
          <div className="split-media">
            <Photo name={slots.radio} alt="Dee Chernicky and Valerie Peterson in the WPSM studio" fill sizes="(max-width: 860px) 100vw, 50vw" />
          </div>
          <div className="stack">
            <p className="eyebrow">On the radio</p>
            <h2 id="radio-title" className="h2">{radio.name}</h2>
            <p className="lede">{radio.tagline}</p>
            <ul className="facts">
              <li><CalendarClock aria-hidden="true" /><span><strong>{radio.when}</strong><br /><span className="muted">{radio.station.name}, {radio.station.city}, and wpsm.com</span></span></li>
              <li><Coffee aria-hidden="true" /><span><strong>{radio.live.note} at {radio.live.venue}</strong><br /><span className="muted">{radio.live.address}</span></span></li>
              <li><Archive aria-hidden="true" /><span><strong>Past shows</strong><br /><a className="textlink" href={radio.archiveUrl} target="_blank" rel="noreferrer">Show archive <ExternalLink size={12} aria-hidden="true" /></a></span></li>
            </ul>
            <p className="sample">Schedule as published in {radio.asOf}. Confirming it’s current.</p>
            <div className="btn-row">
              <a href={radio.station.url} className="btn btn-primary" target="_blank" rel="noreferrer"><Radio size={18} aria-hidden="true" /> Listen on {radio.station.name}</a>
            </div>
          </div>
        </div>
        <div className="people" style={{ marginTop: 48 }}>
          {[{ p: dee, photo: slots.radioDee, body: dee.bio[0] }, { p: valerie, photo: slots.radioValerie, body: valerie.bio }].map(({ p, photo, body }) => (
            <article className="person" key={p.name}>
              <div className="person-photo"><Photo name={photo} alt={p.name} fill sizes="96px" /></div>
              <div style={{ display: "grid", gap: 8 }}>
                <b>{p.name}</b>
                <span className="pill" style={{ fontSize: "0.74rem" }}>{p.title}</span>
                <p className="muted small">{body}</p>
              </div>
            </article>
          ))}
        </div>
        <div className="radio-logo">
          <Image src="/brand/life-issues-real-answers.jpg" alt={`${radio.name} logo`} width={1100} height={424} sizes="320px" />
        </div>
      </section>

      {/* ---------- events ---------- */}
      <section id="events" className="section dusk" aria-labelledby="events-title">
        <div className="wrap">
          <p className="eyebrow">Gather with us</p>
          <h2 id="events-title" className="h2" style={{ margin: "14px 0 28px" }}>Events</h2>
          <div className="cards">
            {events.map((e) => (
              <article key={e.slug} className="card">
                <div className="card-media"><Photo name={e.slug === "shine-on" ? "shine-on-ballroom" : e.photo} alt="" fill sizes="(max-width: 700px) 100vw, 50vw" /></div>
                <div className="card-body">
                  <span className="kicker">{e.kicker}</span>
                  <h3 className="h3">{e.name}</h3>
                  <p className="muted small">{e.summary}</p>
                  <span className="pill"><CalendarHeart size={14} aria-hidden="true" /> Next: <Fact value={e.nextDate} /></span>
                  {e.lastHeld.length ? <p className="small muted"><History size={14} aria-hidden="true" style={{ verticalAlign: "-2px" }} /> Last published: {e.lastHeld.join(" · ")}</p> : null}
                </div>
              </article>
            ))}
          </div>
          <div className="panel" style={{ marginTop: 24, maxWidth: 720 }}>
            <h3 className="h3" style={{ marginBottom: 6 }}>Hear first when dates are set</h3>
            <p className="muted small" style={{ marginBottom: 18 }}>Christmas seats are complimentary and go fast. Groups and shelters can also reach {ministry.assistant.name} at <a className="textlink" href={`mailto:${ministry.assistant.email}`}>{ministry.assistant.email}</a>.</p>
            <LeadForm
              kind="event"
              source="events"
              submitLabel="Save my seat"
              fields={[
                { type: "chips", name: "event", label: "Which event?", options: events.map((e) => e.name) },
                { type: "number", name: "seats", label: "How many seats?" },
              ]}
              doneTitle="You’re on the list"
              doneBody="You’ll hear first when dates and registration open."
            />
          </div>
        </div>
      </section>

      {/* ---------- book ---------- */}
      <section id="book" className="section wrap" aria-labelledby="book-title">
        <div className="split">
          <div className="stack">
            <p className="eyebrow">The book by {book.author}</p>
            <h2 id="book-title" className="h2">{book.title}</h2>
            <p className="lede">{book.pitch}</p>
            <p className="muted measure">{book.reach}</p>
            <ul className="facts">
              <li><BookOpen aria-hidden="true" /><span><strong>Price and where to buy</strong><br /><Fact value={book.price} /></span></li>
            </ul>
            <div className="btn-row">
              <a href="#contact" className="btn btn-ghost">Ask about copies for a prison or shelter</a>
            </div>
          </div>
          <div className="split-media tall">
            <Photo name="dee-podium" alt="Dee Chernicky preaching at Shine On" fill sizes="(max-width: 860px) 100vw, 50vw" />
          </div>
        </div>
      </section>

      {/* ---------- give ---------- */}
      <section id="give" className="paper section" aria-labelledby="give-title">
        <div className="wrap split" style={{ alignItems: "start" }}>
          <div className="stack">
            <p className="eyebrow">Partner with Dee</p>
            <h2 id="give-title" className="h2">Keep the <em>fire</em> burning.</h2>
            <p className="muted measure">Your gift carries the Word into prisons and shelters, onto the radio every Friday, and into a room full of women at Shine On.</p>
            <ul className="facts">
              <li><Mail aria-hidden="true" /><span><strong>Give by mail</strong><br />Checks payable to {giving.payableTo}<br />{giving.mailTo.lines.join(", ")}</span></li>
              <li><ShieldCheck aria-hidden="true" /><span><strong>Tax-deductible</strong><br />{ministry.nonprofit}</span></li>
              <li><Landmark aria-hidden="true" /><span><strong>Give online</strong><br /><Fact value={giving.onlineNote} /></span></li>
            </ul>
          </div>
          <div className="panel">
            <h3 className="h3" style={{ marginBottom: 6 }}>Make a pledge</h3>
            <p className="muted small" style={{ marginBottom: 18 }}>Until online giving is switched on, your pledge reaches the office, who will follow up with how to give.</p>
            <LeadForm
              kind="give"
              source="give"
              submitLabel="Send my pledge"
              fields={[
                { type: "chips", name: "amount", label: "Amount (sample amounts)", options: [...giving.sampleAmounts.map((a) => `$${a}`), "Other"] },
                { type: "chips", name: "frequency", label: "How often", options: ["Once", "Monthly"] },
                { type: "select", name: "designation", label: "Where it goes", options: giving.designations },
              ]}
              doneTitle="Thank you for partnering with Dee"
              doneBody="The office will reach out with how to complete your gift and a receipt for your records."
            />
          </div>
        </div>
      </section>

      {/* ---------- prayer ---------- */}
      <section id="prayer" className="section wrap" aria-labelledby="prayer-title">
        <div className="split" style={{ alignItems: "start" }}>
          <div className="stack">
            <p className="eyebrow">Prayer request</p>
            <h2 id="prayer-title" className="h2">You don’t carry it <em>alone</em>.</h2>
            <p className="lede">Tell us what you need. The ministry team prays over every request.</p>
            <p className="muted small">Need to talk now? Call the office at <a className="textlink" href={ministry.phone.href}>{ministry.phone.display}</a>. If you are in danger or thinking of harming yourself, call or text <a className="textlink" href="tel:988">988</a> or call 911.</p>
          </div>
          <div className="panel">
            <LeadForm
              kind="prayer"
              source="prayer"
              contact="optional"
              submitLabel="Send my request"
              fields={[
                { type: "textarea", name: "note", label: "What can we pray for?", required: true },
                { type: "check", name: "followUp", label: "I’d like someone to reach out to me" },
              ]}
              doneTitle="We’re praying with you"
              doneBody="Your request has been received. If you asked for a call, the office will reach out."
            />
          </div>
        </div>
      </section>

      {/* ---------- contact ---------- */}
      <section id="contact" className="section dusk" aria-labelledby="contact-title">
        <div className="wrap split" style={{ alignItems: "start" }}>
          <div className="stack">
            <p className="eyebrow">Contact</p>
            <h2 id="contact-title" className="h2">Reach the <em>office</em>.</h2>
            <ul className="facts">
              <li><Phone aria-hidden="true" /><span><strong>{ministry.phone.label}</strong><br /><a className="textlink" href={ministry.phone.href}>{ministry.phone.display}</a></span></li>
              <li><Mail aria-hidden="true" /><span><strong>Email</strong><br /><a className="textlink" href={`mailto:${ministry.email}`}>{ministry.email}</a></span></li>
              <li><UserRound aria-hidden="true" /><span><strong>{ministry.assistant.name}</strong><br /><span className="muted">{ministry.assistant.role}. Speaking and booking: </span><a className="textlink" href={`mailto:${ministry.assistant.email}`}>{ministry.assistant.email}</a></span></li>
              <li><MapPin aria-hidden="true" /><span><strong>Mail</strong><br /><span className="muted">{ministry.mail.lines.join(", ")}</span></span></li>
            </ul>
          </div>
          <div className="panel">
            <LeadForm
              kind="message"
              source="contact"
              submitLabel="Send message"
              fields={[
                { type: "select", name: "topic", label: "What’s it about?", options: ["A question", "Invite Dee to speak", "Books for a prison or shelter", "Media or radio", "Something else"] },
                { type: "textarea", name: "note", label: "Message", required: true },
              ]}
              doneTitle="Message sent"
              doneBody="Thank you. The office will get back to you."
            />
          </div>
        </div>
      </section>

      <section className="paper section" aria-label="Scripture">
        <div className="wrap">
          <blockquote className="verse" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.2rem, 2.4vw, 1.6rem)", lineHeight: 1.45, maxWidth: "52ch", marginTop: 0 }}>
            “{ministry.anchorVerse.text}”
            <cite>{ministry.anchorVerse.ref}</cite>
          </blockquote>
        </div>
      </section>
    </>
  );
}
