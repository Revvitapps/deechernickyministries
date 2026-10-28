import Link from "next/link";
import { Phone } from "lucide-react";
import { ministry } from "@/data/ministry";
import { Mark } from "./mark";
import { AskButton } from "./ask";

export function Header() {
  return (
    <header className="topbar">
      <Link href="/" className="wordmark" aria-label={`${ministry.name}, home`}>
        <Mark className="wordmark-mark" />
        <span>
          <b>Dee Chernicky</b>
          <small>Ministries</small>
        </span>
      </Link>
      <div className="topbar-actions">
        <a className="icon-btn" href={ministry.phone.href} aria-label={`Call the ministry office, ${ministry.phone.display}`}>
          <Phone aria-hidden="true" />
        </a>
        <AskButton />
      </div>
    </header>
  );
}
