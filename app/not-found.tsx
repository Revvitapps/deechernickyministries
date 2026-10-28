import Link from "next/link";

export default function NotFound() {
  return (
    <main className="hero" style={{ minHeight: "70vh" }}>
      <div style={{ maxWidth: 1120, margin: "0 auto", width: "100%" }}>
        <p className="eyebrow">Page not found</p>
        <h1>Our new home is <em>coming soon</em>.</h1>
        <p className="soon"><Link href="/" style={{ textDecoration: "none" }}>Go to the home page</Link></p>
      </div>
    </main>
  );
}
