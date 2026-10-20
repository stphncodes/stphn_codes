import { NextResponse } from "next/server";
import { budgetOptions, labelFor, serviceOptions, timelineOptions, validateInquiry } from "@/lib/inquiry";
import type { InquiryPayload, InquiryResponse } from "@/lib/inquiry";
import { siteConfig } from "@/lib/site";

/**
 * Integration boundary for form submissions.
 *
 * Delivery is chosen from environment variables, in order:
 *   1. RESEND_API_KEY        → send an email through Resend's REST API
 *   2. INQUIRY_WEBHOOK_URL   → POST the JSON payload to a webhook
 *   3. neither               → respond { delivered: false, reason: "not_configured" }
 *                              and let the client offer a prefilled email draft.
 *
 * The response is always honest about whether the message was delivered.
 */

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] ?? c);
}

function renderEmail(p: InquiryPayload): { subject: string; text: string; html: string } {
  const rows: [string, string | undefined][] = [
    ["Name", p.name],
    ["Email", p.email],
    ["Company", p.company],
    ["Service", p.service ? labelFor(serviceOptions, p.service) : undefined],
    ["Budget", p.budget ? labelFor(budgetOptions, p.budget) : undefined],
    ["Timeline", p.timeline ? labelFor(timelineOptions, p.timeline) : undefined],
  ];
  const present = rows.filter((r): r is [string, string] => Boolean(r[1]));
  const subject =
    p.kind === "project"
      ? `Project inquiry: ${labelFor(serviceOptions, p.service) || "New project"} — ${p.name}`
      : `Contact message from ${p.name}`;
  const text = [...present.map(([k, v]) => `${k}: ${v}`), "", p.message].join("\n");
  const html = `<table>${present
    .map(([k, v]) => `<tr><td style="padding:4px 12px 4px 0"><strong>${escapeHtml(k)}</strong></td><td>${escapeHtml(v)}</td></tr>`)
    .join("")}</table><p style="white-space:pre-wrap">${escapeHtml(p.message)}</p>`;
  return { subject, text, html };
}

async function sendViaResend(apiKey: string, p: InquiryPayload): Promise<boolean> {
  const to = process.env.INQUIRY_TO_EMAIL ?? siteConfig.email;
  const from = process.env.INQUIRY_FROM_EMAIL ?? `${siteConfig.name} <onboarding@resend.dev>`;
  const { subject, text, html } = renderEmail(p);
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from, to: [to], reply_to: p.email, subject, text, html }),
  });
  if (!res.ok) {
    console.error("[inquiry] Resend responded", res.status, await res.text().catch(() => ""));
  }
  return res.ok;
}

async function sendViaWebhook(url: string, p: InquiryPayload): Promise<boolean> {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...p, receivedAt: new Date().toISOString(), site: siteConfig.url }),
  });
  if (!res.ok) console.error("[inquiry] Webhook responded", res.status);
  return res.ok;
}

export async function POST(request: Request) {
  let body: Partial<InquiryPayload>;
  try {
    body = (await request.json()) as Partial<InquiryPayload>;
  } catch {
    return NextResponse.json<InquiryResponse>({ delivered: false, reason: "validation" }, { status: 400 });
  }

  const payload: InquiryPayload = {
    kind: body.kind === "contact" ? "contact" : "project",
    name: String(body.name ?? "").trim(),
    email: String(body.email ?? "").trim(),
    company: body.company ? String(body.company).trim() : undefined,
    service: body.service ? String(body.service) : undefined,
    message: String(body.message ?? "").trim(),
    budget: body.budget ? String(body.budget) : undefined,
    timeline: body.timeline ? String(body.timeline) : undefined,
    website: body.website ? String(body.website) : undefined,
  };

  const errors = validateInquiry(payload);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json<InquiryResponse>({ delivered: false, reason: "validation", errors }, { status: 422 });
  }

  const resendKey = process.env.RESEND_API_KEY;
  const webhookUrl = process.env.INQUIRY_WEBHOOK_URL;

  try {
    if (resendKey) {
      const ok = await sendViaResend(resendKey, payload);
      return NextResponse.json<InquiryResponse>(ok ? { delivered: true } : { delivered: false, reason: "delivery_failed" }, { status: ok ? 200 : 502 });
    }
    if (webhookUrl) {
      const ok = await sendViaWebhook(webhookUrl, payload);
      return NextResponse.json<InquiryResponse>(ok ? { delivered: true } : { delivered: false, reason: "delivery_failed" }, { status: ok ? 200 : 502 });
    }
  } catch (error) {
    console.error("[inquiry] Delivery error", error);
    return NextResponse.json<InquiryResponse>({ delivered: false, reason: "delivery_failed" }, { status: 502 });
  }

  // No delivery service configured. The client shows a prefilled email fallback.
  return NextResponse.json<InquiryResponse>({ delivered: false, reason: "not_configured" }, { status: 200 });
}
