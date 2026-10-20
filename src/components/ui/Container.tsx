import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ContainerProps {
  as?: ElementType;
  className?: string;
  children: ReactNode;
  size?: "default" | "narrow" | "wide";
}

export function Container({ as: Tag = "div", className, children, size = "default" }: ContainerProps) {
  return (
    <Tag
      className={cn(
        "mx-auto w-full px-5 sm:px-8 lg:px-12",
        size === "default" && "max-w-7xl",
        size === "narrow" && "max-w-3xl",
        size === "wide" && "max-w-[96rem]",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
