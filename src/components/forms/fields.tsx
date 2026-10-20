import type { InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const control =
  "w-full rounded-xl border bg-ink-900 px-4 text-base text-bone-50 placeholder:text-ink-500 transition-colors focus:border-ember-400 focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-400/40";

interface FieldShellProps {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  optional?: boolean;
  children: React.ReactNode;
}

export function FieldShell({ id, label, hint, error, optional, children }: FieldShellProps) {
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <label htmlFor={id} className="text-sm font-medium text-bone-50">
          {label}
        </label>
        {optional ? <span className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-ink-500">Optional</span> : null}
      </div>
      {hint ? (
        <p id={`${id}-hint`} className="mt-1 text-xs text-ink-400">
          {hint}
        </p>
      ) : null}
      <div className="mt-2">{children}</div>
      {error ? (
        <p id={`${id}-error`} role="alert" className="mt-2 text-sm text-ember-300">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function describedBy(id: string, hint?: string, error?: string) {
  const ids = [hint ? `${id}-hint` : null, error ? `${id}-error` : null].filter(Boolean);
  return ids.length ? ids.join(" ") : undefined;
}

type TextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  optional?: boolean;
};

export function TextField({ id, label, hint, error, optional, className, ...rest }: TextFieldProps) {
  return (
    <FieldShell id={id} label={label} hint={hint} error={error} optional={optional}>
      <input
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, hint, error)}
        className={cn(control, "h-12", error ? "border-ember-500" : "border-ink-600", className)}
        {...rest}
      />
    </FieldShell>
  );
}

type TextAreaFieldProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  optional?: boolean;
};

export function TextAreaField({ id, label, hint, error, optional, className, ...rest }: TextAreaFieldProps) {
  return (
    <FieldShell id={id} label={label} hint={hint} error={error} optional={optional}>
      <textarea
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, hint, error)}
        className={cn(control, "min-h-40 resize-y py-3 leading-relaxed", error ? "border-ember-500" : "border-ink-600", className)}
        {...rest}
      />
    </FieldShell>
  );
}

type SelectFieldProps = SelectHTMLAttributes<HTMLSelectElement> & {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  optional?: boolean;
  options: readonly { value: string; label: string }[];
  placeholder?: string;
};

export function SelectField({ id, label, hint, error, optional, options, placeholder, className, ...rest }: SelectFieldProps) {
  return (
    <FieldShell id={id} label={label} hint={hint} error={error} optional={optional}>
      <div className="relative">
        <select
          id={id}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy(id, hint, error)}
          className={cn(control, "h-12 appearance-none pr-10", error ? "border-ember-500" : "border-ink-600", className)}
          {...rest}
        >
          {placeholder ? (
            <option value="" disabled>
              {placeholder}
            </option>
          ) : null}
          {options.map((o) => (
            <option key={o.value || "none"} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <svg aria-hidden="true" viewBox="0 0 16 16" className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-ink-400" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M4 6l4 4 4-4" />
        </svg>
      </div>
    </FieldShell>
  );
}
