import { ministry } from "@/data/ministry";
import { sections } from "./header";

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
        <p style={{ color: "var(--ink)", marginBottom: 6 }}>On this page</p>
        <ul>
          {sections.map((s) => <li key={s.id}><a href={`#${s.id}`}>{s.label}</a></li>)}
          <li><a href="#give">Give</a></li>
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
