import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "inverse";
type Size = "sm" | "md" | "lg";

const base =
  "group inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium transition-[background-color,color,border-color,transform] duration-300 ease-out-expo disabled:cursor-not-allowed disabled:opacity-60 active:scale-[0.98]";

const variants: Record<Variant, string> = {
  primary:
    "bg-ember-500 text-ink-950 hover:bg-ember-400 [.surface-light_&]:bg-ink-900 [.surface-light_&]:text-bone-50 [.surface-light_&]:hover:bg-ink-700",
  secondary:
    "border border-ink-600 bg-transparent text-bone-50 hover:border-bone-50 hover:bg-bone-50 hover:text-ink-950 [.surface-light_&]:border-ink-300 [.surface-light_&]:text-ink-900 [.surface-light_&]:hover:bg-ink-900 [.surface-light_&]:hover:text-bone-50 [.surface-light_&]:hover:border-ink-900",
  ghost:
    "text-bone-50 hover:text-ember-300 [.surface-light_&]:text-ink-900 [.surface-light_&]:hover:text-ember-600",
  inverse:
    "bg-bone-50 text-ink-950 hover:bg-paper",
};

const sizes: Record<Size, string> = {
  sm: "h-10 px-4 text-sm",
  md: "h-12 px-6 text-[0.9375rem]",
  lg: "h-14 px-7 text-base",
};

type IconKind = "arrow" | "external" | "none";

interface CommonProps {
  variant?: Variant;
  size?: Size;
  icon?: IconKind;
  className?: string;
  children: ReactNode;
}

type LinkProps = CommonProps & { href: string; external?: boolean };
type NativeProps = CommonProps & ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

function Icon({ kind }: { kind: IconKind }) {
  if (kind === "none") return null;
  const I = kind === "external" ? ArrowUpRight : ArrowRight;
  return (
    <I
      aria-hidden="true"
      className={cn(
        "size-4 shrink-0 transition-transform duration-300 ease-out-expo",
        kind === "external" ? "group-hover:-translate-y-0.5 group-hover:translate-x-0.5" : "group-hover:translate-x-0.5",
      )}
    />
  );
}

export function Button(props: LinkProps | NativeProps) {
  const { variant = "primary", size = "md", icon = "arrow", className, children } = props;
  const classes = cn(base, variants[variant], sizes[size], className);

  if ("href" in props && typeof props.href === "string") {
    const { href, external } = props;
    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
          {children}
          <Icon kind={icon === "arrow" ? "external" : icon} />
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {children}
        <Icon kind={icon} />
      </Link>
    );
  }

  const { variant: _v, size: _s, icon: _i, className: _c, children: _ch, ...rest } = props as NativeProps;
  return (
    <button type="button" {...rest} className={classes}>
      {children}
      <Icon kind={icon} />
    </button>
  );
}

/** Inline text link with an animated arrow, for "Read more" style links. */
export function ArrowLink({
  href,
  children,
  className,
  external,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  external?: boolean;
}) {
  const classes = cn(
    "group inline-flex items-center gap-1.5 text-sm font-medium text-bone-50 transition-colors hover:text-ember-300 [.surface-light_&]:text-ink-900 [.surface-light_&]:hover:text-ember-600",
    className,
  );
  const I = external ? ArrowUpRight : ArrowRight;
  const inner = (
    <>
      <span className="underline decoration-ink-600 decoration-1 underline-offset-[0.35em] transition-colors group-hover:decoration-ember-400 [.surface-light_&]:decoration-ink-300">
        {children}
      </span>
      <I
        aria-hidden="true"
        className={cn(
          "size-4 transition-transform duration-300 ease-out-expo",
          external ? "group-hover:-translate-y-0.5 group-hover:translate-x-0.5" : "group-hover:translate-x-1",
        )}
      />
    </>
  );
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className={classes}>
      {inner}
    </Link>
  );
}
