import { Phone } from "lucide-react";
import { ministry } from "@/data/ministry";
import { Mark } from "./mark";

export const sections = [
  { id: "about", label: "About Dee" },
  { id: "radio", label: "Radio" },
  { id: "events", label: "Events" },
  { id: "book", label: "Book" },
  { id: "prayer", label: "Prayer" },
  { id: "contact", label: "Contact" },
];

/** Sticky header for the one-page site: wordmark, section links, call and Give. */
export function Header() {
  return (
    <header className="topbar">
      <div className="topbar-row">
        <a href="#top" className="wordmark" aria-label={ministry.name}>
          <Mark className="wordmark-mark" />
          <span>
            <b>Dee Chernicky</b>
            <small>Ministries</small>
          </span>
        </a>
        <nav className="anchors anchors-wide" aria-label="Sections">
          {sections.map((s) => <a key={s.id} href={`#${s.id}`}>{s.label}</a>)}
        </nav>
        <div className="topbar-actions">
          <a className="icon-btn" href={ministry.phone.href} aria-label={`Call the ministry office, ${ministry.phone.display}`}>
            <Phone aria-hidden="true" />
          </a>
          <a className="btn btn-primary btn-sm" href="#give">Give</a>
        </div>
      </div>
      <nav className="anchors anchors-strip" aria-label="Sections">
        {sections.map((s) => <a key={s.id} href={`#${s.id}`}>{s.label}</a>)}
      </nav>
    </header>
  );
}
