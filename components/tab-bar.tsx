"use client";
import { useCallback, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, CalendarHeart, Flame, HandHeart, Home, Images, Mail, Menu, MessageCircleQuestion, Phone, Radio, Sunrise, UserRound, ClipboardList } from "lucide-react";
import { ministry } from "@/data/ministry";
import { Sheet } from "./sheet";
import { openAsk } from "./ask";

/**
 * App tab bar on every screen size. Giving, the ministry's lifeline, is the
 * raised ember orb in the centre. "More" opens a sheet with everything else.
 */
export function TabBar() {
  const pathname = usePathname();
  const [more, setMore] = useState(false);
  const close = useCallback(() => setMore(false), []);
  const active = (href: string) => (href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/"));

  const tab = (href: string, label: string, icon: React.ReactNode) => (
    <Link href={href} className="tab" aria-current={active(href) ? "page" : undefined}>
      {icon}
      <span>{label}</span>
    </Link>
  );

  return (
    <>
      <nav className="tab-bar" aria-label="Main">
        {tab("/", "Home", <Home aria-hidden="true" />)}
        {tab("/radio", "Radio", <Radio aria-hidden="true" />)}
        <Link href="/give" className="tab tab-orb" aria-current={active("/give") ? "page" : undefined}>
          <span className="orb">
            <Flame aria-hidden="true" />
          </span>
          <span>Give</span>
        </Link>
        {tab("/events", "Events", <CalendarHeart aria-hidden="true" />)}
        <button type="button" className="tab" onClick={() => setMore(true)} aria-expanded={more} aria-haspopup="dialog">
          <Menu aria-hidden="true" />
          <span>More</span>
        </button>
      </nav>
      {more ? (
        <Sheet title="More" onClose={close}>
          <ul className="menu">
            <li><Link href="/today" onClick={close}><Sunrise aria-hidden="true" />Today’s confession</Link></li>
            <li><Link href="/prayer" onClick={close}><HandHeart aria-hidden="true" />Prayer request</Link></li>
            <li><Link href="/about" onClick={close}><UserRound aria-hidden="true" />About Dee</Link></li>
            <li><Link href="/book" onClick={close}><BookOpen aria-hidden="true" />The book</Link></li>
            <li><Link href="/gallery" onClick={close}><Images aria-hidden="true" />Gallery</Link></li>
            <li><Link href="/contact" onClick={close}><Mail aria-hidden="true" />Contact</Link></li>
            <li><button type="button" onClick={() => { close(); openAsk(); }}><MessageCircleQuestion aria-hidden="true" />Ask a question</button></li>
            <li><Link href="/audit" onClick={close}><ClipboardList aria-hidden="true" />Website review</Link></li>
          </ul>
          <div className="menu-contact">
            <a className="btn btn-ghost" href={ministry.phone.href}><Phone size={18} aria-hidden="true" /> Call the office, {ministry.phone.display}</a>
          </div>
        </Sheet>
      ) : null}
    </>
  );
}
