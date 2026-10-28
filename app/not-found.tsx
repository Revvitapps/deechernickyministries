import Link from "next/link";

export default function NotFound() {
  return (
    <section className="hero" style={{ minHeight: "60dvh" }}>
      <div className="wrap">
        <p className="eyebrow">Page not found</p>
        <h1 className="h1" style={{ margin: "18px 0" }}>This page has <em>moved</em>.</h1>
        <p className="lede measure">The ministry has a new home. Everything from the old site is here.</p>
        <div className="btn-row" style={{ marginTop: 28 }}>
          <Link href="/" className="btn btn-primary">Go home</Link>
          <Link href="/#prayer" className="btn btn-ghost">Send a prayer request</Link>
        </div>
      </div>
    </section>
  );
}
