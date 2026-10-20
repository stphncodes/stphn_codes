import type { ServiceSlug } from "@/data/services";
import { cn } from "@/lib/utils";

/**
 * Small abstract line drawings, one per service. Geometric, monochrome with a
 * single ember detail, so cards stay consistent without stock imagery.
 */
export function ServiceGlyph({ slug, className }: { slug: ServiceSlug; className?: string }) {
  const common = {
    viewBox: "0 0 120 80",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.25,
    className: cn("h-auto w-full text-ink-400 [.surface-light_&]:text-ink-500", className),
    "aria-hidden": true as const,
  };

  switch (slug) {
    case "web-development":
      return (
        <svg {...common}>
          <rect x="8" y="10" width="104" height="62" rx="3" />
          <path d="M8 22 H112" />
          <circle cx="16" cy="16" r="1.5" fill="currentColor" stroke="none" />
          <circle cx="22" cy="16" r="1.5" fill="currentColor" stroke="none" />
          <rect x="18" y="32" width="44" height="6" fill="currentColor" stroke="none" opacity="0.9" />
          <rect x="18" y="42" width="30" height="3" fill="currentColor" stroke="none" opacity="0.5" />
          <rect x="18" y="54" width="22" height="8" rx="4" className="fill-ember-500" stroke="none" />
          <rect x="74" y="32" width="28" height="30" rx="2" />
        </svg>
      );
    case "web-applications":
      return (
        <svg {...common}>
          <rect x="8" y="8" width="104" height="64" rx="3" />
          <path d="M34 8 V72" />
          <rect x="14" y="16" width="14" height="3" fill="currentColor" stroke="none" opacity="0.8" />
          <rect x="14" y="24" width="14" height="3" fill="currentColor" stroke="none" opacity="0.4" />
          <rect x="14" y="32" width="14" height="3" fill="currentColor" stroke="none" opacity="0.4" />
          <rect x="42" y="16" width="28" height="20" rx="2" />
          <rect x="76" y="16" width="28" height="20" rx="2" />
          <path d="M46 30 L52 24 L58 28 L66 20" className="stroke-ember-500" strokeWidth="1.5" />
          <rect x="42" y="42" width="62" height="22" rx="2" />
          <path d="M42 50 H104 M42 57 H104" opacity="0.5" />
        </svg>
      );
    case "mobile-apps":
      return (
        <svg {...common}>
          <rect x="40" y="4" width="40" height="72" rx="6" />
          <path d="M52 8 H68" strokeWidth="2" />
          <rect x="46" y="18" width="28" height="18" rx="2" className="fill-ember-500/90" stroke="none" />
          <rect x="46" y="42" width="28" height="3" fill="currentColor" stroke="none" opacity="0.8" />
          <rect x="46" y="49" width="18" height="3" fill="currentColor" stroke="none" opacity="0.4" />
          <rect x="46" y="58" width="12" height="12" rx="2" />
          <rect x="62" y="58" width="12" height="12" rx="2" />
          <path d="M12 30 H30 M14 40 H30 M18 50 H30" opacity="0.5" />
          <path d="M90 30 H108 M90 40 H106 M90 50 H102" opacity="0.5" />
        </svg>
      );
    case "ai-solutions":
      return (
        <svg {...common}>
          <circle cx="60" cy="40" r="10" className="fill-ember-500" stroke="none" />
          <circle cx="20" cy="18" r="5" />
          <circle cx="20" cy="62" r="5" />
          <circle cx="100" cy="18" r="5" />
          <circle cx="100" cy="62" r="5" />
          <circle cx="60" cy="10" r="4" />
          <circle cx="60" cy="70" r="4" />
          <path d="M25 20 L51 36 M25 60 L51 44 M95 20 L69 36 M95 60 L69 44 M60 14 V30 M60 50 V66" opacity="0.7" />
        </svg>
      );
    case "ai-automation":
      return (
        <svg {...common}>
          <rect x="6" y="30" width="22" height="20" rx="2" />
          <rect x="49" y="30" width="22" height="20" rx="2" className="fill-ember-500/90" stroke="none" />
          <rect x="92" y="12" width="22" height="20" rx="2" />
          <rect x="92" y="48" width="22" height="20" rx="2" />
          <path d="M28 40 H49" strokeDasharray="3 3" />
          <path d="M71 40 C 82 40, 82 22, 92 22" strokeDasharray="3 3" />
          <path d="M71 40 C 82 40, 82 58, 92 58" strokeDasharray="3 3" />
          <path d="M98 58 L102 62 L108 54" strokeWidth="1.5" />
          <circle cx="103" cy="22" r="3" fill="currentColor" stroke="none" opacity="0.6" />
        </svg>
      );
  }
}
