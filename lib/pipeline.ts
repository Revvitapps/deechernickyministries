/**
 * One lead pipeline for every terminal action in the app: prayer requests,
 * giving pledges, event seats, book requests and messages to the office.
 *
 * upsertContact() keeps a copy on the device (so "My requests" works offline)
 * and POSTs to /api/pipeline, which forwards to PIPELINE_WEBHOOK_URL when set.
 * Going live means pointing that webhook at the ministry's CRM or inbox; the
 * screens do not change.
 */

export type LeadKind = "prayer" | "give" | "event" | "book" | "message" | "radio";

export type Lead = {
  id: string;
  kind: LeadKind;
  name: string;
  email?: string;
  phone?: string;
  note?: string;
  detail?: Record<string, string | number | boolean>;
  source: string;
  createdAt: string;
};

export type LeadInput = Omit<Lead, "id" | "createdAt">;

const KEY = "dcm:leads";

export function readLeads(): Lead[] {
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? "[]") as Lead[];
  } catch {
    return [];
  }
}

export function validateLead(input: Partial<LeadInput>): string | null {
  if (!input.kind) return "Missing request type.";
  if (!input.name || input.name.trim().length < 2) return "Please add your name.";
  const email = input.email?.trim();
  const phone = input.phone?.trim();
  if (!email && !phone && input.kind !== "prayer") return "Add an email or phone so the office can reply.";
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "That email doesn't look right.";
  return null;
}

export async function upsertContact(input: LeadInput): Promise<{ lead: Lead; delivered: boolean }> {
  const lead: Lead = {
    ...input,
    id: typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : String(Date.now()),
    createdAt: new Date().toISOString(),
  };
  try {
    const leads = readLeads().filter((l) => !(l.kind === lead.kind && l.email && l.email === lead.email && l.detail?.event === lead.detail?.event));
    localStorage.setItem(KEY, JSON.stringify([lead, ...leads].slice(0, 50)));
  } catch {}
  let delivered = false;
  try {
    const res = await fetch("/api/pipeline", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(lead),
    });
    delivered = res.ok;
  } catch {}
  return { lead, delivered };
}
