import Link from "next/link";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * Wordmark: a stepped geometric mark (two offset blocks reading as an "S" path and a
 * cursor) beside the studio name. Rendered as inline SVG so it stays crisp at any size.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className={cn("size-7", className)} fill="none">
      <rect x="2" y="2" width="12" height="12" fill="currentColor" />
      <rect x="10" y="10" width="12" height="12" fill="currentColor" fillOpacity="0.55" />
      <rect x="18" y="18" width="12" height="12" fill="currentColor" />
      <rect x="23" y="4" width="5" height="5" className="fill-ember-500" />
    </svg>
  );
}

export function Logo({ className, onClick }: { className?: string; onClick?: () => void }) {
  return (
    <Link
      href="/"
      onClick={onClick}
      aria-label={`${siteConfig.name} home`}
      className={cn("group inline-flex items-center gap-2.5 text-bone-50 [.surface-light_&]:text-ink-900", className)}
    >
      <LogoMark className="transition-transform duration-500 ease-out-expo group-hover:rotate-90" />
      <span className="font-display text-[1.125rem] font-semibold tracking-tight">
        {siteConfig.shortName}
        <span className="ml-1.5 font-mono text-[0.625rem] font-medium uppercase tracking-[0.2em] text-ink-400">
          Studio
        </span>
      </span>
    </Link>
  );
}
