import Link from "next/link";
import { CalendarHeart } from "lucide-react";
import { PageIntro } from "@/components/page-intro";
import { Photo } from "@/components/photo";
import { Fact } from "@/components/fact";
import { events } from "@/data/ministry";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("events");

export default function EventsPage() {
  return (
    <>
      <PageIntro eyebrow="Gather with us" title={<>Rooms full of <em>women of faith</em>.</>} lede="The annual Shine On conference, and a Christmas table for women from our area shelters." />
      <section className="wrap" style={{ paddingBottom: 96 }}>
        <div className="cards">
          {events.map((e) => (
            <Link key={e.slug} href={`/events/${e.slug}`} className="card">
              <div className="card-media"><Photo name={e.photo} alt="" fill sizes="(max-width: 700px) 100vw, 50vw" /></div>
              <div className="card-body">
                <span className="kicker">{e.kicker}</span>
                <h2 className="h3">{e.name}</h2>
                <p className="muted small">{e.summary}</p>
                <span className="pill"><CalendarHeart size={14} aria-hidden="true" /> <Fact value={e.nextDate} /></span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
