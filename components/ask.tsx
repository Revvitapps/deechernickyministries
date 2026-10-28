"use client";
import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { MessageCircleQuestion, Phone, UserRound } from "lucide-react";
import { askNodes, type AskNode } from "@/lib/ask";
import { ministry } from "@/data/ministry";
import { Sheet } from "./sheet";

export const ASK_OPEN_EVENT = "dcm:ask-open";
export const openAsk = (node = "start") => window.dispatchEvent(new CustomEvent(ASK_OPEN_EVENT, { detail: node }));

export function AskButton({ className = "icon-btn", label = "Ask" }: { className?: string; label?: string }) {
  return (
    <button type="button" className={className} onClick={() => openAsk()} aria-haspopup="dialog" aria-label="Ask a question">
      <MessageCircleQuestion aria-hidden="true" />
      <span className="label-wide">{label}</span>
    </button>
  );
}

/** The Ask helper drawer. Scripted answers from lib/ask.ts; personal topics go to a person. */
export function AskDrawer() {
  const [open, setOpen] = useState(false);
  const [trail, setTrail] = useState<AskNode[]>([askNodes.start]);

  useEffect(() => {
    const onOpen = (e: Event) => {
      const id = (e as CustomEvent<string>).detail;
      setTrail(id && id !== "start" && askNodes[id] ? [askNodes.start, askNodes[id]] : [askNodes.start]);
      setOpen(true);
    };
    window.addEventListener(ASK_OPEN_EVENT, onOpen);
    return () => window.removeEventListener(ASK_OPEN_EVENT, onOpen);
  }, []);

  const close = useCallback(() => setOpen(false), []);
  if (!open) return null;
  const current = trail[trail.length - 1];

  return (
    <Sheet title="Ask" onClose={close}>
      <div className="ask-log" aria-live="polite">
        <div className="ask-bubble">How can we help? Pick a question; anything personal goes straight to a real person at the office.</div>
        {trail.slice(1).map((node) => (
          <div key={node.id} style={{ display: "grid", gap: 10 }}>
            <div className="ask-bubble me">{node.question}</div>
            {node.answer ? (
              <div className="ask-bubble">
                {node.human ? (
                  <div className="human-tag">
                    <UserRound size={14} aria-hidden="true" /> A person will help
                  </div>
                ) : null}
                <p>{node.answer}</p>
              </div>
            ) : null}
          </div>
        ))}
      </div>
      <div className="ask-options">
        {current.actions.map((a, i) => {
          if (a.kind === "next")
            return (
              <button key={a.to} type="button" onClick={() => setTrail((t) => [...t, askNodes[a.to]])}>
                {a.label}
              </button>
            );
          if (a.kind === "call")
            return (
              <a key="call" href={ministry.phone.href} className={i === 0 ? "primary" : undefined}>
                <Phone size={16} aria-hidden="true" /> {a.label}
              </a>
            );
          const external = !a.href.startsWith("/");
          return external ? (
            <a key={a.href} href={a.href} className={i === 0 ? "primary" : undefined} {...(a.href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}>
              {a.label}
            </a>
          ) : (
            <Link key={a.href} href={a.href} onClick={close} className={i === 0 ? "primary" : undefined}>
              {a.label}
            </Link>
          );
        })}
        {trail.length > 1 ? (
          <button type="button" onClick={() => setTrail([askNodes.start])}>
            Ask something else
          </button>
        ) : null}
      </div>
    </Sheet>
  );
}
