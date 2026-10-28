"use client";
import { useState } from "react";
import { Check } from "lucide-react";
import { upsertContact, validateLead, type LeadKind } from "@/lib/pipeline";
import { ministry } from "@/data/ministry";

type Extra =
  | { type: "textarea"; name: string; label: string; required?: boolean; placeholder?: string }
  | { type: "text"; name: string; label: string; required?: boolean }
  | { type: "number"; name: string; label: string; min?: number }
  | { type: "select"; name: string; label: string; options: string[]; defaultValue?: string }
  | { type: "chips"; name: string; label: string; options: string[]; defaultValue?: string }
  | { type: "check"; name: string; label: string; defaultChecked?: boolean };

/**
 * Every terminal action in the app is one of these. It validates, calls
 * upsertContact() (device copy + /api/pipeline) and confirms in place.
 */
export function LeadForm({
  kind,
  source,
  submitLabel,
  fields = [],
  contact = "email-or-phone",
  doneTitle,
  doneBody,
  detail = {},
}: {
  kind: LeadKind;
  source: string;
  submitLabel: string;
  fields?: Extra[];
  contact?: "email-or-phone" | "optional";
  doneTitle: string;
  doneBody: string;
  detail?: Record<string, string>;
}) {
  const [state, setState] = useState<"idle" | "sending" | "done">("idle");
  const [error, setError] = useState<string | null>(null);
  const [delivered, setDelivered] = useState(true);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const extra: Record<string, string | boolean> = { ...detail };
    for (const f of fields) {
      if (f.type === "check") extra[f.name] = form.get(f.name) === "on";
      else if (f.name !== "note") extra[f.name] = String(form.get(f.name) ?? "");
    }
    const input = {
      kind,
      source,
      name: String(form.get("name") ?? "").trim(),
      email: String(form.get("email") ?? "").trim() || undefined,
      phone: String(form.get("phone") ?? "").trim() || undefined,
      note: String(form.get("note") ?? "").trim() || undefined,
      detail: extra,
    };
    const problem = validateLead(input);
    const missing = fields.find((f) => (f.type === "textarea" || f.type === "text") && f.required && !String(form.get(f.name) ?? "").trim());
    if (problem || missing) {
      setError(problem ?? `Please fill in “${missing!.label}”.`);
      return;
    }
    setError(null);
    setState("sending");
    const result = await upsertContact(input);
    setDelivered(result.delivered);
    setState("done");
  }

  if (state === "done") {
    return (
      <div className="done" role="status">
        <p className="h3" style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <Check aria-hidden="true" /> {doneTitle}
        </p>
        <p>{doneBody}</p>
        {!delivered ? (
          <p className="small muted">
            We couldn’t reach the office from here, so it’s saved on this phone. To be sure it arrives, call {ministry.phone.display}.
          </p>
        ) : null}
      </div>
    );
  }

  return (
    <form className="form" onSubmit={onSubmit} noValidate>
      {fields.map((f) => {
        const id = `${source}-${f.name}`;
        switch (f.type) {
          case "textarea":
            return (
              <div className="field" key={f.name}>
                <label htmlFor={id}>{f.label}</label>
                <textarea id={id} name={f.name} placeholder={f.placeholder} />
              </div>
            );
          case "text":
            return (
              <div className="field" key={f.name}>
                <label htmlFor={id}>{f.label}</label>
                <input id={id} name={f.name} />
              </div>
            );
          case "number":
            return (
              <div className="field" key={f.name}>
                <label htmlFor={id}>{f.label}</label>
                <input id={id} name={f.name} type="number" inputMode="numeric" min={f.min ?? 1} defaultValue={1} />
              </div>
            );
          case "select":
            return (
              <div className="field" key={f.name}>
                <label htmlFor={id}>{f.label}</label>
                <select id={id} name={f.name} defaultValue={f.defaultValue}>
                  {f.options.map((o) => <option key={o}>{o}</option>)}
                </select>
              </div>
            );
          case "chips":
            return (
              <fieldset className="field" key={f.name} style={{ border: 0, padding: 0, margin: 0 }}>
                <legend>{f.label}</legend>
                <div className="chips">
                  {f.options.map((o, i) => (
                    <label className="chip" key={o}>
                      <input type="radio" name={f.name} value={o} defaultChecked={f.defaultValue ? f.defaultValue === o : i === 0} />
                      <span>{o}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
            );
          case "check":
            return (
              <label className="check" key={f.name}>
                <input type="checkbox" name={f.name} defaultChecked={f.defaultChecked} />
                <span>{f.label}</span>
              </label>
            );
        }
      })}
      <div className="field">
        <label htmlFor={`${source}-name`}>Your name</label>
        <input id={`${source}-name`} name="name" autoComplete="name" required />
      </div>
      <div className="field-row">
        <div className="field">
          <label htmlFor={`${source}-email`}>Email{contact === "optional" ? " (optional)" : ""}</label>
          <input id={`${source}-email`} name="email" type="email" autoComplete="email" inputMode="email" />
        </div>
        <div className="field">
          <label htmlFor={`${source}-phone`}>Phone{contact === "optional" ? " (optional)" : ""}</label>
          <input id={`${source}-phone`} name="phone" type="tel" autoComplete="tel" inputMode="tel" />
        </div>
      </div>
      {error ? <p className="form-error" role="alert">{error}</p> : null}
      <div>
        <button type="submit" className="btn btn-primary" disabled={state === "sending"}>
          {state === "sending" ? "Sending…" : submitLabel}
        </button>
      </div>
    </form>
  );
}
