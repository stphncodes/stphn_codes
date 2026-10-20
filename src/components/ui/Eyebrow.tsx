import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface EyebrowProps {
  children: ReactNode;
  className?: string;
  /** Optional numeric index rendered before the label, e.g. "03". */
  index?: string;
  as?: "span" | "p" | "div";
}

/** Small mono label used above headings and inside cards. */
export function Eyebrow({ children, className, index, as: Tag = "p" }: EyebrowProps) {
  return (
    <Tag
      className={cn(
        "inline-flex items-center gap-2.5 font-mono text-[0.6875rem] font-medium uppercase tracking-[0.18em]",
        "text-ink-400 [.surface-light_&]:text-ink-500",
        className,
      )}
    >
      <span aria-hidden="true" className="inline-block size-1.5 bg-ember-500" />
      {index ? <span className="text-ember-400 [.surface-light_&]:text-ember-600">{index}</span> : null}
      {children}
    </Tag>
  );
}
