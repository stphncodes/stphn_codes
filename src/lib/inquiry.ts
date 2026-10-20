/**
 * Shared types and validation for the project inquiry and contact forms.
 * Used on the client (instant feedback) and on the server (authoritative check).
 */
import { siteConfig } from "@/lib/site";

export const serviceOptions = [
  { value: "web-development", label: "Website development" },
  { value: "web-applications", label: "Web application development" },
  { value: "mobile-apps", label: "Mobile app development" },
  { value: "ai-solutions", label: "AI-powered application" },
  { value: "ai-automation", label: "AI agents and automation" },
  { value: "not-sure", label: "Not sure yet" },
] as const;

export const budgetOptions = [
  { value: "", label: "Prefer not to say" },
  { value: "under-1k", label: "Under $1,000" },
  { value: "1k-5k", label: "$1,000 – $5,000" },
  { value: "5k-15k", label: "$5,000 – $15,000" },
  { value: "15k-plus", label: "$15,000+" },
] as const;

export const timelineOptions = [
  { value: "", label: "Flexible" },
  { value: "asap", label: "As soon as possible" },
  { value: "1-3-months", label: "Within 1–3 months" },
  { value: "3-6-months", label: "Within 3–6 months" },
  { value: "exploring", label: "Just exploring" },
] as const;

export interface InquiryPayload {
  kind: "project" | "contact";
  name: string;
  email: string;
  company?: string;
  service?: string;
  message: string;
  budget?: string;
  timeline?: string;
  /** Honeypot. Must be empty. */
  website?: string;
}

export type InquiryErrors = Partial<Record<keyof InquiryPayload, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateInquiry(input: InquiryPayload): InquiryErrors {
  const errors: InquiryErrors = {};
  const name = input.name?.trim() ?? "";
  const email = input.email?.trim() ?? "";
  const message = input.message?.trim() ?? "";

  if (name.length < 2) errors.name = "Please enter your name.";
  if (name.length > 120) errors.name = "Name is too long.";
  if (!EMAIL_RE.test(email)) errors.email = "Enter a valid email address so we can reply.";
  if (input.kind === "project" && !input.service) errors.service = "Choose the service closest to what you need.";
  if (message.length < 20) errors.message = "Tell us a little more. Twenty characters is enough to start.";
  if (message.length > 5000) errors.message = "Please keep the description under 5,000 characters.";
  if (input.company && input.company.length > 160) errors.company = "Company name is too long.";
  if (input.website) errors.website = "Spam check failed.";
  return errors;
}

export function labelFor(options: readonly { value: string; label: string }[], value?: string): string {
  return options.find((o) => o.value === value)?.label ?? value ?? "";
}

/** Builds a prefilled mailto: link as the no-backend fallback. */
export function buildMailtoHref(payload: InquiryPayload): string {
  const subject =
    payload.kind === "project"
      ? `Project inquiry: ${labelFor(serviceOptions, payload.service) || "New project"} — ${payload.name}`
      : `Message from ${payload.name}`;

  const lines = [
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    payload.company ? `Company: ${payload.company}` : null,
    payload.service ? `Service: ${labelFor(serviceOptions, payload.service)}` : null,
    payload.budget ? `Budget: ${labelFor(budgetOptions, payload.budget)}` : null,
    payload.timeline ? `Timeline: ${labelFor(timelineOptions, payload.timeline)}` : null,
    "",
    payload.message,
  ].filter((l): l is string => l !== null);

  return `mailto:${siteConfig.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`;
}

export type InquiryResponse =
  | { delivered: true }
  | { delivered: false; reason: "not_configured" | "validation" | "delivery_failed"; errors?: InquiryErrors };
