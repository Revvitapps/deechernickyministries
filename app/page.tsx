import Link from "next/link";
import { ArrowUpRight, BookOpen, CalendarHeart, HandHeart, Mic, Radio, Sunrise, Users, Flame } from "lucide-react";
import { Photo } from "@/components/photo";
import { Video } from "@/components/video";
import { Fact } from "@/components/fact";
import { TodaysConfession } from "@/components/confession";
import { book, events, ministry, outreach, radio } from "@/data/ministry";
import { slots } from "@/lib/photos";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("home");

/** The one question. Each answer lands on a concrete outcome, not a brochure page. */
const needs = [
  { href: "/prayer", icon: HandHeart, title: "Someone to pray with me", body: "Send a request. The ministry team prays over every one." },
  { href: "/today", icon: Sunrise, title: "A word for today", body: "Today’s confession from Scripture, ready to say out loud." },
  { href: "/radio", icon: Radio, title: "Real answers to life’s issues", body: `${radio.when.replace(", ", " ")} on ${radio.station.name}.` },
  { href: "/events/shine-on", icon: Users, title: "A gathering of women of faith", body: "The Shine On Women’s & Teen Conference." },
  { href: "/give?for=outreach", icon: Flame, title: "To help women in prisons and shelters", body: "Fund the outreach. Every gift supports the Word going in." },
  { href: "/book", icon: BookOpen, title: "Dee’s book", body: `${book.title}.` },
  { href: "/contact?topic=speaking", icon: Mic, title: "Dee to speak at my church", body: "Send a booking request to Dee’s assistant." },
];

export default function Home() {
  return (
    <>
      <section className="hero" aria-labelledby="hero-title">
        <div className="wrap hero-grid">
          <div>
            <p className="eyebrow rise">{ministry.name}<span className="hide-sm">&nbsp;· Destin, Florida</span></p>
            <h1 id="hero-title" className="h1 rise rise-2">
              Ignite a fire for <em>God’s presence</em> and His Word.
            </h1>
            <p className="lede rise rise-3">{ministry.promise}</p>
            <div className="btn-row rise rise-3">
              <a href="#need" className="btn btn-primary">What do you need today?</a>
              <Link href="/radio" className="btn btn-ghost"><Radio size={18} aria-hidden="true" /> Fridays on 91.1 FM</Link>
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

      <section id="need" className="paper section" aria-labelledby="need-title" style={{ scrollMarginTop: 0 }}>
        <div className="wrap">
          <p className="eyebrow">Start here</p>
          <h2 id="need-title" className="h2" style={{ marginTop: 14 }}>
            What do you <em>need</em>?
          </h2>
          <div className="need-grid">
            {needs.map(({ href, icon: Icon, title, body }) => (
              <Link key={href} href={href} className="need">
                <Icon className="need-icon" aria-hidden="true" />
                <b>{title}</b>
                <span>{body}</span>
                <ArrowUpRight className="arrow" aria-hidden="true" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section wrap">
        <TodaysConfession />
      </section>

      <section className="section dusk" aria-labelledby="outreach-title">
        <div className="wrap split flip">
          <div className="stack">
            <p className="eyebrow">{outreach.title}</p>
            <h2 id="outreach-title" className="h2">
              “I will seek the lost, and bring back <em>the strayed</em>.”
            </h2>
            <p className="muted measure">{outreach.summary}</p>
            <p className="muted measure">{book.reach.replace("Used", `${book.title} is used`)}</p>
            <div className="btn-row">
              <Link href="/give?for=outreach" className="btn btn-primary">Give to the outreach</Link>
              <Link href="/about" className="btn btn-ghost">Watch the outreach</Link>
            </div>
          </div>
          <div className="split-media">
            <Photo name={outreach.photos[0]} alt="Dee Chernicky ministering to women in a prison outreach" fill sizes="(max-width: 860px) 100vw, 50vw" />
          </div>
        </div>
      </section>

      <section className="section wrap" aria-labelledby="radio-title">
        <div className="split">
          <div className="split-media">
            <Photo name={slots.radio} alt="Dee Chernicky and Valerie Peterson in the WPSM studio" fill sizes="(max-width: 860px) 100vw, 50vw" />
          </div>
          <div className="stack">
            <p className="eyebrow">On the radio</p>
            <h2 id="radio-title" className="h2">{radio.name}</h2>
            <p className="lede">{radio.tagline}</p>
            <p className="muted">
              {radio.hosts}. {radio.when} on {radio.station.name} and wpsm.com.
            </p>
            <div className="btn-row">
              <Link href="/radio" className="btn btn-primary">Listen and get reminders</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section dusk" aria-labelledby="events-title">
        <div className="wrap">
          <p className="eyebrow">Gather with us</p>
          <h2 id="events-title" className="h2" style={{ margin: "14px 0 28px" }}>Events</h2>
          <div className="cards">
            {events.map((e) => (
              <Link key={e.slug} href={`/events/${e.slug}`} className="card">
                <div className="card-media">
                  <Photo name={e.photo} alt="" fill sizes="(max-width: 700px) 100vw, 50vw" />
                </div>
                <div className="card-body">
                  <span className="kicker">{e.kicker}</span>
                  <h3 className="h3">{e.name}</h3>
                  <p className="muted small">{e.summary}</p>
                  <span className="pill"><CalendarHeart size={14} aria-hidden="true" /> <Fact value={e.nextDate} /></span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section wrap" aria-labelledby="heart-title">
        <p className="eyebrow">Watch</p>
        <h2 id="heart-title" className="h2" style={{ margin: "14px 0 28px" }}>The heart of the ministry</h2>
        <Video id={ministry.videos.heart.id} title={ministry.videos.heart.title} poster={slots.homeBand} />
      </section>

      <section className="paper section" aria-labelledby="give-title">
        <div className="wrap split">
          <div className="stack">
            <p className="eyebrow">Partner with Dee</p>
            <h2 id="give-title" className="h2">Keep the <em>fire</em> burning.</h2>
            <p className="muted measure">
              Your gift carries the Word into prisons and shelters, onto the radio every Friday, and into a room full of women at Shine On. {ministry.nonprofit}
            </p>
            <div className="btn-row">
              <Link href="/give" className="btn btn-primary">Give</Link>
              <Link href="/prayer" className="btn btn-ghost">Send a prayer request</Link>
            </div>
          </div>
          <blockquote className="verse" style={{ fontFamily: "var(--font-display)", fontSize: "1.3rem", lineHeight: 1.4 }}>
            “{ministry.anchorVerse.text}”
            <cite>{ministry.anchorVerse.ref}</cite>
          </blockquote>
        </div>
      </section>
    </>
  );
}
