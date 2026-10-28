import { notFound } from "next/navigation";
import { CalendarHeart, ExternalLink, History } from "lucide-react";
import { PageIntro } from "@/components/page-intro";
import { Photo } from "@/components/photo";
import { LeadForm } from "@/components/lead-form";
import { Fact } from "@/components/fact";
import { events, ministry } from "@/data/ministry";
import { pageMetadata } from "@/lib/seo";
import Link from "next/link";

const extraPhotos: Record<string, string[]> = {
  "shine-on": ["shine-on-teens", "friends-hug", "altar-prayer", "worship-singing", "shine-on-team", "mother-daughter"],
  christmas: ["prayer-embrace", "friends-group", "praise-hand", "friends-laugh"],
};

export function generateStaticParams() {
  return events.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: PageProps<"/events/[slug]">) {
  const { slug } = await params;
  return pageMetadata(slug === "christmas" ? "christmas" : "shine-on");
}

export default async function EventPage({ params }: PageProps<"/events/[slug]">) {
  const { slug } = await params;
  const event = events.find((e) => e.slug === slug);
  if (!event) notFound();
  const christmas = event.slug === "christmas";

  return (
    <>
      <PageIntro eyebrow={event.kicker} title={event.name} lede={event.summary} photo={event.slug === "shine-on" ? "dee-podium" : event.photo} alt="">
        <div className="btn-row">
          <a href="#seat" className="btn btn-primary">{event.cta}</a>
          <Link href={`/give?for=${event.slug}`} className="btn btn-ghost">Sponsor a guest</Link>
        </div>
      </PageIntro>

      <section className="section wrap split" style={{ alignItems: "start" }}>
        <ul className="facts">
          <li><CalendarHeart aria-hidden="true" /><span><strong>Next</strong><br /><Fact value={event.nextDate} /></span></li>
          {event.lastHeld.length ? (
            <li><History aria-hidden="true" /><span><strong>Last published</strong><br /><span className="muted">{event.lastHeld.join(" · ")}</span></span></li>
          ) : null}
          <li><ExternalLink aria-hidden="true" /><span><strong>Event site</strong><br /><a className="textlink" href={event.externalUrl} target="_blank" rel="noreferrer">{event.externalUrl.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")}</a></span></li>
        </ul>
        <div className="masonry" style={{ columns: "2 160px" }}>
          {extraPhotos[event.slug].map((p) => (
            <figure key={p}><Photo name={p} alt="" sizes="(max-width: 860px) 50vw, 25vw" /></figure>
          ))}
        </div>
      </section>

      <section id="seat" className="paper section">
        <div className="wrap split" style={{ alignItems: "start" }}>
          <div className="stack">
            <p className="eyebrow">{christmas ? "Complimentary seats" : "Be the first to know"}</p>
            <h2 className="h2">{christmas ? <>Save a seat at <em>the table</em>.</> : <>Save my seat for <em>Shine On</em>.</>}</h2>
            <p className="muted measure">
              {christmas
                ? "Seats were complimentary and went fast. Tell us how many, and whether you’re bringing guests from a shelter or a group."
                : "Registration opens when the date is set. Leave your name and you’ll hear first."}
            </p>
            <p className="muted small">Large groups can also reach {ministry.assistant.name} at <a className="textlink" href={`mailto:${ministry.assistant.email}`}>{ministry.assistant.email}</a>.</p>
          </div>
          <div className="panel">
            <LeadForm
              kind="event"
              source={`event-${event.slug}`}
              submitLabel={event.cta}
              detail={{ event: event.slug }}
              fields={[
                { type: "number", name: "seats", label: "How many seats?" },
                ...(christmas ? [{ type: "check" as const, name: "group", label: "I’m reserving for a shelter, church or group" }] : [{ type: "check" as const, name: "teen", label: "I’m bringing a teen" }]),
              ]}
              doneTitle="You’re on the list"
              doneBody={christmas ? "The office will confirm your seats once this year’s date and venue are set." : "You’ll hear first when Shine On registration opens."}
            />
          </div>
        </div>
      </section>
    </>
  );
}
