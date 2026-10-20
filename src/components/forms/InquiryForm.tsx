"use client";

import { useId, useState, type FormEvent } from "react";
import { CheckCircle2, Loader2, Mail, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SelectField, TextAreaField, TextField } from "@/components/forms/fields";
import {
  budgetOptions,
  buildMailtoHref,
  serviceOptions,
  timelineOptions,
  validateInquiry,
  type InquiryErrors,
  type InquiryPayload,
  type InquiryResponse,
} from "@/lib/inquiry";
import { siteConfig } from "@/lib/site";

type Status =
  | { state: "idle" }
  | { state: "submitting" }
  | { state: "delivered" }
  | { state: "fallback"; href: string }
  | { state: "error"; href: string };

interface InquiryFormProps {
  kind: "project" | "contact";
  /** Preselects the service field, e.g. when arriving from a service page. */
  defaultService?: string;
}

const emptyValues = (kind: InquiryFormProps["kind"], defaultService?: string): InquiryPayload => ({
  kind,
  name: "",
  email: "",
  company: "",
  service: defaultService ?? "",
  message: "",
  budget: "",
  timeline: "",
  website: "",
});

export function InquiryForm({ kind, defaultService }: InquiryFormProps) {
  const idPrefix = useId();
  const [values, setValues] = useState<InquiryPayload>(() => emptyValues(kind, defaultService));
  const [errors, setErrors] = useState<InquiryErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof InquiryPayload, boolean>>>({});
  const [status, setStatus] = useState<Status>({ state: "idle" });
  const isProject = kind === "project";

  const field = (name: keyof InquiryPayload) => `${idPrefix}-${name}`;

  function update<K extends keyof InquiryPayload>(name: K, value: InquiryPayload[K]) {
    const next = { ...values, [name]: value };
    setValues(next);
    if (touched[name]) setErrors(validateInquiry(next));
  }

  function blur(name: keyof InquiryPayload) {
    setTouched((t) => ({ ...t, [name]: true }));
    setErrors(validateInquiry(values));
  }

  function visible(name: keyof InquiryPayload) {
    return touched[name] ? errors[name] : undefined;
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const nextErrors = validateInquiry(values);
    setErrors(nextErrors);
    setTouched({ name: true, email: true, service: true, message: true, company: true });
    if (Object.keys(nextErrors).length > 0) {
      const first = Object.keys(nextErrors)[0] as keyof InquiryPayload;
      document.getElementById(field(first))?.focus();
      return;
    }

    setStatus({ state: "submitting" });
    const href = buildMailtoHref(values);
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = (await res.json()) as InquiryResponse;
      if (data.delivered) {
        setStatus({ state: "delivered" });
        return;
      }
      if (data.reason === "validation" && data.errors) {
        setErrors(data.errors);
        setStatus({ state: "idle" });
        return;
      }
      setStatus(data.reason === "not_configured" ? { state: "fallback", href } : { state: "error", href });
    } catch {
      setStatus({ state: "error", href });
    }
  }

  function reset() {
    setValues(emptyValues(kind, defaultService));
    setErrors({});
    setTouched({});
    setStatus({ state: "idle" });
  }

  if (status.state === "delivered") {
    return (
      <div role="status" className="rounded-2xl border border-ink-700 bg-ink-850 p-8 sm:p-10">
        <CheckCircle2 aria-hidden="true" className="size-8 text-ember-400" />
        <h3 className="font-display mt-5 text-2xl text-bone-50">Thanks, {values.name.split(" ")[0]}. Your message is on its way.</h3>
        <p className="mt-3 text-pretty leading-relaxed text-ink-300">
          We have received your {isProject ? "project inquiry" : "message"} and will reply to {values.email} within two
          working days.
        </p>
        <button type="button" onClick={reset} className="mt-6 inline-flex items-center gap-2 text-sm text-ink-300 underline underline-offset-4 hover:text-bone-50">
          <RotateCcw aria-hidden="true" className="size-4" /> Send another
        </button>
      </div>
    );
  }

  if (status.state === "fallback" || status.state === "error") {
    const isError = status.state === "error";
    return (
      <div role="status" className="rounded-2xl border border-ink-700 bg-ink-850 p-8 sm:p-10">
        <Mail aria-hidden="true" className="size-8 text-ember-400" />
        <h3 className="font-display mt-5 text-2xl text-bone-50">
          {isError ? "We could not send that automatically." : "Finish sending from your email app."}
        </h3>
        <p className="mt-3 text-pretty leading-relaxed text-ink-300">
          {isError
            ? "Something went wrong on our side. Nothing was lost: your message is ready as an email draft."
            : "Automatic delivery is not set up on this site yet, so your message has not been sent. Open a prefilled email draft and press send, or copy the address below."}
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Button href={status.href} icon="external" external>
            Open email draft
          </Button>
          <span className="text-sm text-ink-300">
            or email <a href={`mailto:${siteConfig.email}`} className="text-bone-50 underline underline-offset-4">{siteConfig.email}</a>
          </span>
        </div>
        <button type="button" onClick={() => setStatus({ state: "idle" })} className="mt-6 inline-flex items-center gap-2 text-sm text-ink-300 underline underline-offset-4 hover:text-bone-50">
          <RotateCcw aria-hidden="true" className="size-4" /> Back to the form
        </button>
      </div>
    );
  }

  const submitting = status.state === "submitting";

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-6" aria-busy={submitting}>
      <div className="grid gap-6 sm:grid-cols-2">
        <TextField
          id={field("name")}
          name="name"
          label="Name"
          autoComplete="name"
          value={values.name}
          onChange={(e) => update("name", e.target.value)}
          onBlur={() => blur("name")}
          error={visible("name")}
          required
        />
        <TextField
          id={field("email")}
          name="email"
          type="email"
          label="Email"
          autoComplete="email"
          inputMode="email"
          value={values.email}
          onChange={(e) => update("email", e.target.value)}
          onBlur={() => blur("email")}
          error={visible("email")}
          required
        />
      </div>

      {isProject ? (
        <div className="grid gap-6 sm:grid-cols-2">
          <TextField
            id={field("company")}
            name="company"
            label="Company or organisation"
            autoComplete="organization"
            optional
            value={values.company ?? ""}
            onChange={(e) => update("company", e.target.value)}
            onBlur={() => blur("company")}
            error={visible("company")}
          />
          <SelectField
            id={field("service")}
            name="service"
            label="Service required"
            options={serviceOptions}
            placeholder="Choose a service"
            value={values.service ?? ""}
            onChange={(e) => update("service", e.target.value)}
            onBlur={() => blur("service")}
            error={visible("service")}
            required
          />
        </div>
      ) : null}

      <TextAreaField
        id={field("message")}
        name="message"
        label={isProject ? "Project description" : "Message"}
        hint={
          isProject
            ? "What are you trying to achieve, who is it for, and what exists today? Links are welcome."
            : "How can we help?"
        }
        value={values.message}
        onChange={(e) => update("message", e.target.value)}
        onBlur={() => blur("message")}
        error={visible("message")}
        required
      />

      {isProject ? (
        <div className="grid gap-6 sm:grid-cols-2">
          <SelectField
            id={field("budget")}
            name="budget"
            label="Budget range"
            optional
            options={budgetOptions}
            value={values.budget ?? ""}
            onChange={(e) => update("budget", e.target.value)}
          />
          <SelectField
            id={field("timeline")}
            name="timeline"
            label="Desired timeline"
            optional
            options={timelineOptions}
            value={values.timeline ?? ""}
            onChange={(e) => update("timeline", e.target.value)}
          />
        </div>
      ) : null}

      {/* Honeypot: hidden from people, filled only by naive bots. */}
      <div className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor={field("website")}>Website</label>
        <input id={field("website")} name="website" tabIndex={-1} autoComplete="off" value={values.website ?? ""} onChange={(e) => update("website", e.target.value)} />
      </div>

      <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs leading-relaxed text-ink-400">
          We use your details only to reply to you. See our{" "}
          <a href="/privacy" className="underline underline-offset-4 hover:text-bone-50">
            privacy policy
          </a>
          .
        </p>
        <Button type="submit" size="lg" disabled={submitting} icon={submitting ? "none" : "arrow"} className="sm:min-w-56">
          {submitting ? (
            <>
              <Loader2 aria-hidden="true" className="size-4 animate-spin" /> Sending…
            </>
          ) : isProject ? (
            "Send project inquiry"
          ) : (
            "Send message"
          )}
        </Button>
      </div>
    </form>
  );
}
