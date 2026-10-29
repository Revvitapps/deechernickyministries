import { Photo } from "@/components/photo";
import { book, ministry } from "@/data/ministry";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("home");

/**
 * Coming-soon page for the January 1 launch, ported from Matthew's draft
 * (docs/recovered/deechernickyministries-2026-10-28/coming-soon.html). The
 * fuller one-page site is on the `site-full` branch, the app on `pwa-full`.
 * Matthew (2026-10-29): show only the book for now, not radio or gatherings.
 */

export default function ComingSoon() {
  return (
    <main id="main">
      <section className="hero">
        <div className="wrap">
          <div>
            <p className="eyebrow reveal d1">{ministry.name}</p>
            <h1 className="reveal d2">
              Ignite a fire for <em>God’s presence</em> and His Word.
            </h1>
            <p className="mission reveal d3">Every need, problem, desire and situation in your life will find its solution in the Word of God.</p>
            <p className="soon reveal d4">
              <i className="flame" aria-hidden="true" />
              Our new home is coming soon
            </p>
            <blockquote className="verse reveal d5">
              “I will seek the lost, and bring back what was driven away.”
              <cite>Ezekiel 34:16</cite>
            </blockquote>
          </div>
          <figure className="portrait reveal d3">
            <div className="halo" />
            <div className="arch">
              <Photo name="dee-portrait" alt="Dee Chernicky" fill priority sizes="(max-width: 860px) 300px, 380px" />
            </div>
            <figcaption className="name">Dee Chernicky</figcaption>
          </figure>
        </div>
      </section>

      <section className="book" aria-label="Dee's book">
        <div className="book-text">
          <span>While we get ready</span>
          <p className="book-lead">You can also find Dee’s book here</p>
          <h2>Activating the Promises of God</h2>
          <p>Unlocking the power of the Bible, used in prisons and outreach homes for women.</p>
        </div>
        <a className="cta" href={book.buyUrl} target="_blank" rel="noopener">
          Get it on Amazon
        </a>
      </section>

      <footer>
        <div className="brand">{ministry.name}</div>
        <div className="contact">
          <span>{ministry.mail.oneLine}</span>
          <a href={`mailto:${ministry.email}`}>{ministry.email}</a>
          <a href={ministry.phone.href}>{ministry.phone.display}</a>
        </div>
        <div>© {new Date().getFullYear()} {ministry.name}</div>
      </footer>
    </main>
  );
}
