import Link from "next/link";
import { ministry } from "@/data/ministry";

export function Footer() {
  return (
    <footer className="footer">
      <div>
        <b className="serif">{ministry.name}</b>
        <p>{ministry.mission}</p>
        <p className="small" style={{ marginTop: 10 }}>{ministry.nonprofit}</p>
      </div>
      <div>
        <p style={{ color: "var(--ink)", marginBottom: 6 }}>Reach the office</p>
        <ul>
          <li><a href={ministry.phone.href}>{ministry.phone.display}</a></li>
          <li><a href={`mailto:${ministry.email}`}>{ministry.email}</a></li>
          <li>{ministry.mail.oneLine}</li>
        </ul>
      </div>
      <div>
        <p style={{ color: "var(--ink)", marginBottom: 6 }}>Explore</p>
        <ul>
          <li><Link href="/radio">Radio</Link></li>
          <li><Link href="/events">Events</Link></li>
          <li><Link href="/about">About Dee</Link></li>
          <li><Link href="/gallery">Gallery</Link></li>
          <li><Link href="/prayer">Prayer request</Link></li>
        </ul>
      </div>
      <div className="credit">
        <span>© {new Date().getFullYear()} {ministry.name}</span>
        <span>
          Concept prototype by <a href="https://revvit.io">Revvit</a>
        </span>
      </div>
    </footer>
  );
}
