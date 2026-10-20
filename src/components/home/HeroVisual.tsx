import { Check, CornerDownRight } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Art-directed composition for the hero: a code panel feeding a shipped interface,
 * which feeds an agent run log. Pure CSS/SVG, server-rendered, CSS-only animation
 * that is neutralised by the global reduced-motion rule.
 */

const codeLines: { indent: number; parts: { w: number; tone: "kw" | "fn" | "str" | "plain" | "muted" }[] }[] = [
  { indent: 0, parts: [{ w: 14, tone: "kw" }, { w: 26, tone: "fn" }, { w: 10, tone: "plain" }] },
  { indent: 1, parts: [{ w: 18, tone: "kw" }, { w: 30, tone: "plain" }, { w: 22, tone: "str" }] },
  { indent: 1, parts: [{ w: 12, tone: "kw" }, { w: 36, tone: "fn" }] },
  { indent: 2, parts: [{ w: 28, tone: "plain" }, { w: 16, tone: "str" }] },
  { indent: 2, parts: [{ w: 20, tone: "muted" }] },
  { indent: 1, parts: [{ w: 8, tone: "plain" }] },
  { indent: 1, parts: [{ w: 16, tone: "kw" }, { w: 24, tone: "fn" }, { w: 14, tone: "plain" }] },
  { indent: 0, parts: [{ w: 6, tone: "plain" }] },
];

const toneClass: Record<string, string> = {
  kw: "bg-ember-500/80",
  fn: "bg-bone-50/70",
  str: "bg-ink-300/50",
  plain: "bg-ink-400/45",
  muted: "bg-ink-600",
};

const agentSteps = [
  { label: "Read inbound request", state: "done" },
  { label: "Look up customer record", state: "done" },
  { label: "Draft reply from knowledge base", state: "done" },
  { label: "Awaiting human approval", state: "active" },
] as const;

export function HeroVisual({ className }: { className?: string }) {
  return (
    <div className={cn("relative aspect-[5/4] w-full select-none sm:aspect-[6/5] lg:aspect-[5/4.4]", className)} aria-hidden="true">
      {/* Grid and crop marks */}
      <div className="bg-grid-faint absolute inset-0 rounded-2xl [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)]" />
      <CropMark className="left-0 top-0" />
      <CropMark className="right-0 top-0 rotate-90" />
      <CropMark className="bottom-0 right-0 rotate-180" />
      <CropMark className="bottom-0 left-0 -rotate-90" />

      {/* Connector lines */}
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 500 440" fill="none" preserveAspectRatio="none">
        <path
          d="M150 150 C 190 150, 190 215, 235 215"
          className="stroke-ember-500/70 motion-safe:animate-dash"
          strokeWidth="1.5"
          strokeDasharray="4 8"
        />
        <path
          d="M330 300 C 370 300, 370 330, 405 330"
          className="stroke-ember-500/70 motion-safe:animate-dash"
          strokeWidth="1.5"
          strokeDasharray="4 8"
        />
      </svg>

      {/* Panel 1: code */}
      <figure className="absolute left-[2%] top-[6%] w-[52%] rounded-xl border border-ink-700 bg-ink-850 shadow-panel">
        <div className="flex items-center gap-2 border-b border-ink-700 px-3 py-2">
          <span className="size-2 rounded-full bg-ink-600" />
          <span className="size-2 rounded-full bg-ink-600" />
          <span className="ml-2 h-2 w-16 rounded-full bg-ink-700" />
        </div>
        <div className="space-y-[7px] p-3.5">
          {codeLines.map((line, i) => (
            <div key={i} className="flex items-center gap-1.5" style={{ paddingLeft: `${line.indent * 12}px` }}>
              {line.parts.map((p, j) => (
                <span key={j} className={cn("h-[5px] rounded-sm", toneClass[p.tone])} style={{ width: `${p.w}%` }} />
              ))}
            </div>
          ))}
          <div className="flex items-center gap-1.5 pl-3">
            <span className="h-[5px] w-[22%] rounded-sm bg-bone-50/70" />
            <span className="h-3 w-[2px] bg-ember-400 motion-safe:animate-cursor" />
          </div>
        </div>
        <figcaption className="absolute -bottom-6 left-0 font-mono text-[0.625rem] uppercase tracking-[0.18em] text-ink-500">
          fig. 01 — build
        </figcaption>
      </figure>

      {/* Panel 2: shipped interface */}
      <figure className="absolute left-[30%] top-[34%] w-[56%] rounded-xl border border-ink-600 bg-bone-50 text-ink-900 shadow-panel">
        <div className="flex items-center justify-between border-b border-bone-200 px-3 py-2">
          <div className="flex items-center gap-1.5">
            <span className="size-3 bg-ink-900" />
            <span className="h-1.5 w-10 rounded-full bg-ink-900/70" />
          </div>
          <div className="flex gap-2">
            <span className="h-1.5 w-6 rounded-full bg-ink-300" />
            <span className="h-1.5 w-6 rounded-full bg-ink-300" />
            <span className="h-4 w-12 rounded-full bg-ink-900" />
          </div>
        </div>
        <div className="p-3.5">
          <div className="h-2.5 w-[70%] rounded-sm bg-ink-900" />
          <div className="mt-1.5 h-2.5 w-[48%] rounded-sm bg-ink-900" />
          <div className="mt-2.5 h-1.5 w-[80%] rounded-full bg-ink-300" />
          <div className="mt-1 h-1.5 w-[62%] rounded-full bg-ink-300" />
          <div className="mt-3.5 grid grid-cols-3 gap-2">
            {[0, 1, 2].map((i) => (
              <div key={i} className={cn("rounded-md border border-bone-200 p-2", i === 1 && "bg-ink-900 text-bone-50")}>
                <div className={cn("h-6 w-full rounded-sm", i === 1 ? "bg-ember-500" : "bg-bone-200")} />
                <div className={cn("mt-1.5 h-1.5 w-[75%] rounded-full", i === 1 ? "bg-bone-50/70" : "bg-ink-300")} />
                <div className={cn("mt-1 h-1.5 w-[50%] rounded-full", i === 1 ? "bg-bone-50/40" : "bg-ink-200")} />
              </div>
            ))}
          </div>
        </div>
        <figcaption className="absolute -bottom-6 left-0 font-mono text-[0.625rem] uppercase tracking-[0.18em] text-ink-500">
          fig. 02 — ship
        </figcaption>
      </figure>

      {/* Panel 3: agent run */}
      <figure className="absolute right-[0%] top-[66%] w-[46%] rounded-xl border border-ink-700 bg-ink-950 shadow-panel">
        <div className="flex items-center justify-between border-b border-ink-700 px-3 py-2">
          <span className="font-mono text-[0.5625rem] uppercase tracking-[0.18em] text-ink-400">agent · run 0412</span>
          <span className="flex items-center gap-1 font-mono text-[0.5625rem] uppercase tracking-[0.14em] text-ember-400">
            <span className="size-1.5 rounded-full bg-ember-500 motion-safe:animate-pulse-dot" />
            live
          </span>
        </div>
        <ul className="space-y-1.5 p-3">
          {agentSteps.map((step) => (
            <li key={step.label} className="flex items-center gap-2 text-[0.625rem] leading-tight sm:text-[0.6875rem]">
              {step.state === "done" ? (
                <span className="flex size-3.5 shrink-0 items-center justify-center rounded-full bg-ink-700 text-bone-50">
                  <Check className="size-2.5" strokeWidth={3} />
                </span>
              ) : (
                <span className="flex size-3.5 shrink-0 items-center justify-center">
                  <span className="size-2 rounded-full bg-ember-500 motion-safe:animate-pulse-dot" />
                </span>
              )}
              <span className={step.state === "done" ? "text-ink-300" : "text-bone-50"}>{step.label}</span>
            </li>
          ))}
          <li className="flex items-center gap-2 pl-5 pt-1 font-mono text-[0.5625rem] uppercase tracking-[0.12em] text-ink-500">
            <CornerDownRight className="size-3" /> review → send
          </li>
        </ul>
        <figcaption className="absolute -bottom-6 right-0 font-mono text-[0.625rem] uppercase tracking-[0.18em] text-ink-500">
          fig. 03 — automate
        </figcaption>
      </figure>
    </div>
  );
}

function CropMark({ className }: { className?: string }) {
  return (
    <svg className={cn("absolute size-4 text-ink-500", className)} viewBox="0 0 16 16" fill="none" stroke="currentColor">
      <path d="M0 6 H6 V0" strokeWidth="1" />
    </svg>
  );
}
