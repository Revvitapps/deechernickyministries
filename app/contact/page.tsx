import { Mail, MapPin, Phone, UserRound } from "lucide-react";
import { PageIntro } from "@/components/page-intro";
import { LeadForm } from "@/components/lead-form";
import { ministry } from "@/data/ministry";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("contact");

const topics = ["A question", "Speaking or booking", "Media or radio", "Volunteering", "Something else"];

export default async function ContactPage({ searchParams }: { searchParams: Promise<{ topic?: string }> }) {
  const { topic } = await searchParams;
  const defaultTopic = topic === "speaking" ? topics[1] : topics[0];
  return (
    <>
      <PageIntro eyebrow="Contact" title={<>Reach the <em>office</em>.</>} lede="A real person answers. Call, write, or send a message here." />
      <section className="section wrap split" style={{ alignItems: "start", paddingTop: 0 }}>
        <ul className="facts">
          <li><Phone aria-hidden="true" /><span><strong>{ministry.phone.label}</strong><br /><a className="textlink" href={ministry.phone.href}>{ministry.phone.display}</a></span></li>
          <li><Mail aria-hidden="true" /><span><strong>Email</strong><br /><a className="textlink" href={`mailto:${ministry.email}`}>{ministry.email}</a></span></li>
          <li><UserRound aria-hidden="true" /><span><strong>{ministry.assistant.name}</strong><br /><span className="muted">{ministry.assistant.role}. Speaking, booking and large groups: </span><a className="textlink" href={`mailto:${ministry.assistant.email}`}>{ministry.assistant.email}</a></span></li>
          <li><MapPin aria-hidden="true" /><span><strong>Mail</strong><br /><span className="muted">{ministry.name}<br />{ministry.mail.lines.join(", ")}</span></span></li>
        </ul>
        <div className="panel">
          <LeadForm
            kind="message"
            source="contact"
            submitLabel="Send message"
            fields={[
              { type: "select", name: "topic", label: "What’s it about?", options: topics, defaultValue: defaultTopic },
              { type: "textarea", name: "note", label: "Message", required: true },
            ]}
            doneTitle="Message sent"
            doneBody="Thank you. The office will get back to you."
          />
        </div>
      </section>
    </>
  );
}
