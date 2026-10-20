import type { CSSProperties } from "react";
import { Check, Search, SlidersHorizontal } from "lucide-react";
import type { Project } from "@/data/projects";
import { cn } from "@/lib/utils";

/**
 * Original interface compositions standing in for screenshots. Each variant is a
 * CSS layout inside a browser frame, coloured by the project's accent. No third-party
 * assets are hotlinked.
 */
interface ProjectMockupProps {
  project: Project;
  className?: string;
  priority?: boolean;
  /** Wider 16:10 frame for hero placements. */
  wide?: boolean;
}

export function ProjectMockup({ project, className, priority, wide }: ProjectMockupProps) {
  const { mockup } = project;
  const dark = mockup.tone === "dark";
  const style = { "--accent": mockup.accent } as CSSProperties;

  return (
    <div
      role="img"
      aria-label={`Illustrative interface composition for ${project.name}: ${mockup.heading}`}
      style={style}
      className={cn(
        "relative w-full overflow-hidden rounded-xl border",
        wide ? "aspect-[16/10]" : "aspect-[4/3]",
        dark ? "border-ink-600 bg-ink-800 text-bone-50" : "border-bone-300 bg-bone-50 text-ink-900",
        className,
      )}
      data-priority={priority ? "true" : undefined}
    >
      {/* Browser chrome */}
      <div className={cn("flex items-center gap-2 border-b px-3 py-2", dark ? "border-ink-600" : "border-bone-200")}>
        <span className={cn("size-2 rounded-full", dark ? "bg-ink-500" : "bg-bone-300")} />
        <span className={cn("size-2 rounded-full", dark ? "bg-ink-500" : "bg-bone-300")} />
        <span className={cn("ml-2 flex h-4 flex-1 items-center rounded-sm px-2 font-mono text-[0.5rem] tracking-wide", dark ? "bg-ink-700 text-ink-300" : "bg-bone-100 text-ink-500")}>
          {project.liveUrl.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")}
        </span>
      </div>

      {mockup.variant === "platform" && <PlatformLayout heading={mockup.heading} sub={mockup.sub} />}
      {mockup.variant === "marketplace" && <MarketplaceLayout heading={mockup.heading} sub={mockup.sub} />}
      {mockup.variant === "editorial" && <EditorialLayout heading={mockup.heading} sub={mockup.sub} />}
    </div>
  );
}

function PlatformLayout({ heading, sub }: { heading: string; sub: string }) {
  const rows = ["Work placement · 6 weeks", "Volunteering · Community", "Team project · Lead", "Mentoring · Peer support"];
  return (
    <div className="grid h-[calc(100%-2rem)] grid-cols-[28%_1fr]">
      <aside className="border-r border-bone-200 bg-paper p-3">
        <div className="mb-4 flex items-center gap-1.5">
          <span className="size-3 rounded-sm bg-[var(--accent)]" />
          <span className="h-1.5 w-12 rounded-full bg-ink-900/80" />
        </div>
        {[80, 55, 65, 50, 60].map((w, i) => (
          <div key={i} className={cn("mb-2 flex items-center gap-1.5 rounded-sm px-1.5 py-1", i === 1 && "bg-bone-100")}>
            <span className={cn("size-2 rounded-sm", i === 1 ? "bg-[var(--accent)]" : "bg-ink-200")} />
            <span className="h-1.5 rounded-full bg-ink-300" style={{ width: `${w}%` }} />
          </div>
        ))}
      </aside>
      <div className="p-3 sm:p-4">
        <div className="flex items-end justify-between">
          <div>
            <p className="font-display text-sm font-semibold leading-none sm:text-base">{heading}</p>
            <p className="mt-1 text-[0.5625rem] text-ink-500 sm:text-[0.625rem]">{sub}</p>
          </div>
          <span className="rounded-full bg-ink-900 px-2 py-0.5 font-mono text-[0.5rem] uppercase tracking-wider text-bone-50">
            Verified
          </span>
        </div>
        <div className="mt-3 grid grid-cols-3 gap-2">
          {["Skills", "Experiences", "Verified"].map((label, i) => (
            <div key={label} className="rounded-md border border-bone-200 bg-paper p-2">
              <p className="text-[0.5rem] uppercase tracking-wider text-ink-500">{label}</p>
              <div className="mt-1.5 h-1 w-full rounded-full bg-bone-200">
                <div className="h-1 rounded-full bg-[var(--accent)]" style={{ width: `${[72, 55, 88][i]}%` }} />
              </div>
            </div>
          ))}
        </div>
        <ul className="mt-3 space-y-1.5">
          {rows.map((r, i) => (
            <li key={r} className="flex items-center justify-between rounded-md border border-bone-200 bg-paper px-2 py-1.5 text-[0.5625rem] sm:text-[0.625rem]">
              <span className="truncate text-ink-900">{r}</span>
              {i < 3 ? (
                <span className="flex size-3.5 items-center justify-center rounded-full bg-[var(--accent)] text-white">
                  <Check className="size-2.5" strokeWidth={3} />
                </span>
              ) : (
                <span className="rounded-full border border-bone-300 px-1.5 text-[0.4375rem] uppercase tracking-wider text-ink-500">Pending</span>
              )}
            </li>
          ))}
        </ul>
        <div className="mt-3 grid grid-cols-2 gap-2">
          <div className="rounded-md border border-bone-200 bg-paper p-2">
            <p className="text-[0.5rem] uppercase tracking-wider text-ink-500">Activity</p>
            <div className="mt-2 flex h-8 items-end gap-1">
              {[40, 65, 30, 80, 55, 90, 70].map((h, i) => (
                <span key={i} className="flex-1 rounded-sm bg-[var(--accent)]" style={{ height: `${h}%`, opacity: 0.35 + i * 0.09 }} />
              ))}
            </div>
          </div>
          <div className="rounded-md border border-bone-200 bg-paper p-2">
            <p className="text-[0.5rem] uppercase tracking-wider text-ink-500">Next step</p>
            <div className="mt-2 h-1.5 w-[85%] rounded-full bg-ink-900/80" />
            <div className="mt-1 h-1.5 w-[60%] rounded-full bg-ink-300" />
            <div className="mt-2 inline-block rounded-full bg-ink-900 px-2 py-0.5 text-[0.4375rem] text-bone-50">Add experience</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MarketplaceLayout({ heading, sub }: { heading: string; sub: string }) {
  return (
    <div className="h-[calc(100%-2rem)] p-3 sm:p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-display text-sm font-semibold leading-none sm:text-base">{heading}</p>
          <p className="mt-1 text-[0.5625rem] text-ink-300 sm:text-[0.625rem]">{sub}</p>
        </div>
        <div className="flex gap-1.5">
          <span className="flex h-5 items-center gap-1 rounded-full border border-ink-600 px-2 text-[0.5rem] text-ink-300">
            <Search className="size-2.5" /> Search
          </span>
          <span className="flex h-5 items-center gap-1 rounded-full border border-ink-600 px-2 text-[0.5rem] text-ink-300">
            <SlidersHorizontal className="size-2.5" /> Filters
          </span>
        </div>
      </div>
      <div className="mt-2.5 flex gap-1.5">
        {["All", "Vehicles", "Parts", "Certified"].map((f, i) => (
          <span key={f} className={cn("rounded-full px-2 py-0.5 text-[0.5rem]", i === 1 ? "bg-[var(--accent)] text-white" : "bg-ink-700 text-ink-300")}>
            {f}
          </span>
        ))}
      </div>
      <div className="mt-3 grid grid-cols-3 gap-2">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="overflow-hidden rounded-md border border-ink-600 bg-ink-900">
            <div className="relative aspect-[16/9] bg-ink-700">
              {/* Abstract vehicle silhouette */}
              <svg viewBox="0 0 80 40" className="absolute inset-0 h-full w-full text-ink-500" fill="currentColor" aria-hidden="true">
                <path d="M10 28 L16 16 L34 14 L46 16 L56 24 L70 26 L70 32 L10 32 Z" opacity="0.9" />
                <circle cx="22" cy="32" r="4" className="text-ink-900" fill="currentColor" />
                <circle cx="58" cy="32" r="4" className="text-ink-900" fill="currentColor" />
              </svg>
              {(i === 0 || i === 4) && (
                <span className="absolute left-1 top-1 rounded-sm bg-[var(--accent)] px-1 py-0.5 text-[0.4375rem] font-semibold uppercase text-white">
                  Certified
                </span>
              )}
            </div>
            <div className="p-1.5">
              <div className="h-1.5 w-[80%] rounded-full bg-bone-50/80" />
              <div className="mt-1 h-1 w-[55%] rounded-full bg-ink-500" />
              <div className="mt-1.5 h-1.5 w-[40%] rounded-full bg-[var(--accent)]" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function EditorialLayout({ heading, sub }: { heading: string; sub: string }) {
  return (
    <div className="grid h-[calc(100%-2rem)] grid-cols-[1fr_38%]">
      <div className="flex flex-col justify-between p-3 sm:p-4">
        <div className="flex items-center justify-between">
          <span className="font-display text-[0.625rem] font-semibold">BLM</span>
          <div className="flex gap-2">
            {[0, 1, 2].map((i) => (
              <span key={i} className="h-1 w-5 rounded-full bg-ink-300" />
            ))}
          </div>
        </div>
        <div>
          <p className="font-display text-xl font-medium leading-[1] sm:text-2xl">{heading}</p>
          <p className="mt-1.5 max-w-[16ch] text-[0.5625rem] leading-snug text-ink-500 sm:text-[0.625rem]">{sub}</p>
          <div className="mt-2.5 flex gap-1.5">
            <span className="rounded-full bg-ink-900 px-2 py-0.5 text-[0.5rem] text-bone-50">Visit us</span>
            <span className="rounded-full border border-ink-300 px-2 py-0.5 text-[0.5rem] text-ink-900">Get in touch</span>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-1.5">
          {["Sun 10:30", "Wed 19:00", "Fri 18:30"].map((t) => (
            <div key={t} className="rounded-sm border border-bone-200 bg-paper p-1.5">
              <p className="text-[0.5rem] font-semibold text-ink-900">{t}</p>
              <div className="mt-1 h-1 w-[70%] rounded-full bg-ink-200" />
            </div>
          ))}
        </div>
      </div>
      <div className="relative m-2 overflow-hidden rounded-md bg-[var(--accent)]">
        <div className="absolute inset-0 bg-grid-faint opacity-60" />
        <div className="absolute bottom-2 left-2 right-2 rounded-sm bg-white/90 p-1.5">
          <div className="h-1.5 w-[80%] rounded-full bg-ink-900" />
          <div className="mt-1 h-1 w-[50%] rounded-full bg-ink-300" />
        </div>
        <svg viewBox="0 0 100 100" className="absolute -right-4 -top-4 size-24 text-white/30" fill="none" stroke="currentColor" aria-hidden="true">
          <circle cx="50" cy="50" r="40" />
          <circle cx="50" cy="50" r="28" />
          <circle cx="50" cy="50" r="16" />
        </svg>
      </div>
    </div>
  );
}
