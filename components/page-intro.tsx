import { Photo } from "./photo";

/** Inner-page header: eyebrow, serif title, lede, optional arch photo. `action` pages (give, prayer) drop the photo on phones so the form is near the top. */
export function PageIntro({ eyebrow, title, lede, photo, alt, children, action }: { action?: boolean; eyebrow: string; title: React.ReactNode; lede?: React.ReactNode; photo?: string; alt?: string; children?: React.ReactNode }) {
  return (
    <section className={`hero intro${action ? " intro-action" : ""}`} style={{ minHeight: 0 }}>
      <div className="wrap hero-grid">
        <div>
          <p className="eyebrow rise">{eyebrow}</p>
          <h1 className="h1 rise rise-2" style={{ fontSize: "clamp(2.4rem, 6vw, 4.4rem)" }}>{title}</h1>
          {lede ? <p className="lede rise rise-3">{lede}</p> : null}
          {children ? <div className="rise rise-3" style={{ marginTop: 28 }}>{children}</div> : null}
        </div>
        {photo ? (
          <figure className="portrait rise rise-2" style={{ width: "min(100%, 340px)" }}>
            <div className="halo" />
            <div className="arch">
              <Photo name={photo} alt={alt ?? ""} fill priority sizes="340px" />
            </div>
          </figure>
        ) : null}
      </div>
    </section>
  );
}
