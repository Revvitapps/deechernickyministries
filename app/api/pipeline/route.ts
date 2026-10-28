import { NextResponse } from "next/server";
import { validateLead, type Lead } from "@/lib/pipeline";

const KINDS = new Set(["prayer", "give", "event", "book", "message", "radio"]);

/**
 * Receives every lead from upsertContact(). Forwards to PIPELINE_WEBHOOK_URL
 * when set (Zapier, Make, a CRM, a Slack workflow). Without it the request is
 * accepted and logged, so the prototype runs with no configuration.
 */
export async function POST(request: Request) {
  let lead: Lead;
  try {
    lead = (await request.json()) as Lead;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }
  if (!KINDS.has(lead.kind)) return NextResponse.json({ ok: false, error: "Unknown kind" }, { status: 400 });
  const problem = validateLead(lead);
  if (problem) return NextResponse.json({ ok: false, error: problem }, { status: 422 });

  const clean = {
    id: String(lead.id).slice(0, 64),
    kind: lead.kind,
    name: String(lead.name).slice(0, 120),
    email: lead.email?.slice(0, 200),
    phone: lead.phone?.slice(0, 40),
    note: lead.note?.slice(0, 4000),
    detail: lead.detail,
    source: String(lead.source).slice(0, 60),
    createdAt: lead.createdAt,
    receivedAt: new Date().toISOString(),
  };

  const webhook = process.env.PIPELINE_WEBHOOK_URL;
  if (!webhook) {
    console.info("[pipeline] (no webhook set)", clean.kind, clean.source, clean.id);
    return NextResponse.json({ ok: true, forwarded: false });
  }
  try {
    const res = await fetch(webhook, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(clean) });
    return NextResponse.json({ ok: res.ok, forwarded: res.ok }, { status: res.ok ? 200 : 502 });
  } catch {
    return NextResponse.json({ ok: false, forwarded: false }, { status: 502 });
  }
}
