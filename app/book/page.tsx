import { BookOpen, Globe2, Lock } from "lucide-react";
import { PageIntro } from "@/components/page-intro";
import { LeadForm } from "@/components/lead-form";
import { Fact } from "@/components/fact";
import { book } from "@/data/ministry";
import { slots } from "@/lib/photos";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("book");

export default function BookPage() {
  return (
    <>
      <PageIntro eyebrow={`The book by ${book.author}`} title={book.title} lede={book.pitch} photo={slots.book} alt="Dee Chernicky preaching at Shine On">
        <a href="#copy" className="btn btn-primary"><BookOpen size={18} aria-hidden="true" /> Request a copy</a>
      </PageIntro>
      <section className="section wrap">
        <ul className="facts" style={{ maxWidth: 760 }}>
          <li><Globe2 aria-hidden="true" /><span><strong>Where it goes</strong><br /><span className="muted">{book.reach}</span></span></li>
          <li><Lock aria-hidden="true" /><span><strong>Price</strong><br /><Fact value={book.price} /></span></li>
          <li><BookOpen aria-hidden="true" /><span><strong>Cover</strong><br /><Fact value="[PLACEHOLDER: book cover image]" /></span></li>
        </ul>
      </section>
      <section id="copy" className="paper section">
        <div className="wrap split" style={{ alignItems: "start" }}>
          <div className="stack">
            <p className="eyebrow">Get the book</p>
            <h2 className="h2">For you, or for a <em>prison or shelter</em>.</h2>
            <p className="muted measure">Ask for a copy for yourself, or request copies for a ministry, a women’s home or a prison library.</p>
          </div>
          <div className="panel">
            <LeadForm
              kind="book"
              source="book"
              submitLabel="Request the book"
              fields={[
                { type: "chips", name: "for", label: "Who is it for?", options: ["Me", "A gift", "A prison or shelter"] },
                { type: "number", name: "copies", label: "Copies" },
                { type: "textarea", name: "note", label: "Anything we should know? (optional)" },
              ]}
              doneTitle="Request received"
              doneBody="The office will be in touch about getting the book to you."
            />
          </div>
        </div>
      </section>
    </>
  );
}
