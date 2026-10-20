import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionProps {
  id?: string;
  className?: string;
  children: ReactNode;
  /** Light sections invert the palette for contrast. */
  tone?: "dark" | "light" | "deep";
  /** Adds a top border to separate from the previous section. */
  bordered?: boolean;
  labelledBy?: string;
}

export function Section({ id, className, children, tone = "dark", bordered, labelledBy }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn(
        "relative py-20 sm:py-24 lg:py-32",
        tone === "light" && "surface-light",
        tone === "deep" && "bg-ink-950",
        bordered && (tone === "light" ? "border-t border-bone-200" : "border-t border-ink-700"),
        className,
      )}
    >
      {children}
    </section>
  );
}
