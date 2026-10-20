import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Tag({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex h-7 items-center rounded-full border border-ink-600 px-2.5 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-ink-300",
        "[.surface-light_&]:border-ink-200 [.surface-light_&]:text-ink-500",
        className,
      )}
    >
      {children}
    </span>
  );
}
