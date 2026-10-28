import { Mail, ShieldCheck, Landmark } from "lucide-react";
import { PageIntro } from "@/components/page-intro";
import { LeadForm } from "@/components/lead-form";
import { Fact } from "@/components/fact";
import { giving, ministry } from "@/data/ministry";
import { slots } from "@/lib/photos";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("give");

const designationFor: Record<string, string> = {
  outreach: "Prison & shelter outreach",
  christmas: "Christmas Celebration Dinner",
  "shine-on": "Shine On Conference",
  radio: "Radio ministry",
};

export default async function GivePage({ searchParams }: { searchParams: Promise<{ for?: string }> }) {
  const { for: target } = await searchParams;
  const designation = (target && designationFor[target]) || giving.designations[0];
  return (
    <>
      <PageIntro action
        eyebrow="Give"
        title={<>Keep the <em>fire</em> burning.</>}
        lede="Every gift carries God’s Word into prisons, shelters, the radio and a room full of women."
        photo={slots.give}
        alt="Women worshipping at a prison outreach"
      />

      <section className="paper section">
        <div className="wrap split" style={{ alignItems: "start" }}>
          <div className="panel">
            <p className="eyebrow">Make a pledge</p>
            <h2 className="h3" style={{ margin: "12px 0 6px" }}>Tell us what you’d like to give</h2>
            <p className="muted small" style={{ marginBottom: 18 }}>
              Online card giving switches on here once the ministry picks a processor: <Fact value={giving.onlineNote} />. Until then your pledge reaches the office, who will follow up with how to give.
            </p>
            <LeadForm
              kind="give"
              source="give"
              submitLabel="Send my pledge"
              detail={{ designation }}
              fields={[
                { type: "chips", name: "amount", label: "Amount (sample amounts)", options: [...giving.sampleAmounts.map((a) => `$${a}`), "Other"] },
                { type: "chips", name: "frequency", label: "How often", options: ["Once", "Monthly"] },
                { type: "select", name: "designation", label: "Where it goes", options: giving.designations, defaultValue: designation },
                { type: "textarea", name: "note", label: "A note or prayer request (optional)" },
              ]}
              doneTitle="Thank you for partnering with Dee"
              doneBody="The office will reach out with how to complete your gift and a receipt for your records."
            />
          </div>
          <div className="stack">
            <ul className="facts">
              <li><Mail aria-hidden="true" /><span><strong>Give by mail</strong><br />Checks payable to {giving.payableTo}<br />{giving.mailTo.lines.join(", ")}</span></li>
              <li><ShieldCheck aria-hidden="true" /><span><strong>Tax-deductible</strong><br />{ministry.nonprofit}</span></li>
              <li><Landmark aria-hidden="true" /><span><strong>Questions about a gift?</strong><br />Call the office at <a className="textlink" href={ministry.phone.href}>{ministry.phone.display}</a></span></li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
