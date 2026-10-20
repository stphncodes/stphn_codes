import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Level = 1 | 2 | 3;

interface HeadingProps {
  level?: Level;
  children: ReactNode;
  className?: string;
  size?: "display" | "xl" | "lg" | "md" | "sm";
  id?: string;
}

const sizes: Record<NonNullable<HeadingProps["size"]>, string> = {
  display: "text-[2.75rem] leading-[0.98] sm:text-6xl lg:text-[5.25rem] xl:text-[6rem]",
  xl: "text-4xl leading-[1.02] sm:text-5xl lg:text-6xl",
  lg: "text-3xl leading-[1.08] sm:text-4xl lg:text-5xl",
  md: "text-2xl leading-[1.15] sm:text-3xl",
  sm: "text-xl leading-[1.2] sm:text-2xl",
};

export function Heading({ level = 2, children, className, size = "lg", id }: HeadingProps) {
  const Tag = `h${level}` as const;
  return (
    <Tag id={id} className={cn("font-display text-balance text-bone-50 [.surface-light_&]:text-ink-900", sizes[size], className)}>
      {children}
    </Tag>
  );
}

interface SectionHeaderProps {
  eyebrow?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
  id?: string;
  level?: Level;
  size?: HeadingProps["size"];
  action?: ReactNode;
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  className,
  id,
  level = 2,
  size = "lg",
  action,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between",
        align === "center" && "items-center text-center lg:flex-col lg:items-center",
        className,
      )}
    >
      <div className={cn("max-w-2xl", align === "center" && "mx-auto")}>
        {eyebrow ? <div className="mb-5">{eyebrow}</div> : null}
        <Heading level={level} size={size} id={id}>
          {title}
        </Heading>
        {description ? (
          <p className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-ink-300 sm:text-lg [.surface-light_&]:text-ink-500">
            {description}
          </p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
