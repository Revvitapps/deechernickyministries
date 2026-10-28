import { PageIntro } from "@/components/page-intro";
import { LeadForm } from "@/components/lead-form";
import { ministry } from "@/data/ministry";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("prayer");

export default function PrayerPage() {
  return (
    <>
      <PageIntro action eyebrow="Prayer request" title={<>You don’t carry it <em>alone</em>.</>} lede="Tell us what you need. The ministry team prays over every request." photo="prayer-ministry" alt="Women praying together" />
      <section className="paper section">
        <div className="wrap split" style={{ alignItems: "start" }}>
          <div className="panel">
            <LeadForm
              kind="prayer"
              source="prayer"
              contact="optional"
              submitLabel="Send my request"
              fields={[
                { type: "textarea", name: "note", label: "What can we pray for?", required: true },
                { type: "chips", name: "privacy", label: "Who may see it?", options: ["Prayer team only", "Dee only"] },
                { type: "check", name: "followUp", label: "I’d like someone to reach out to me" },
              ]}
              doneTitle="We’re praying with you"
              doneBody="Your request has been received. If you asked for a call, the office will reach out."
            />
          </div>
          <div className="stack">
            <blockquote className="verse" style={{ fontFamily: "var(--font-display)", fontSize: "1.3rem", lineHeight: 1.4, marginTop: 0 }}>
              “Just as Jesus spoke to the wind, I say, ‘Peace, be still.’”
              <cite>Mark 4:39 · from Dee’s Daily Confessions</cite>
            </blockquote>
            <p className="muted small">Need to talk now? Call the office at <a className="textlink" href={ministry.phone.href}>{ministry.phone.display}</a>. If you are in danger or thinking of harming yourself, call or text <a className="textlink" href="tel:988">988</a> or call 911.</p>
          </div>
        </div>
      </section>
    </>
  );
}
