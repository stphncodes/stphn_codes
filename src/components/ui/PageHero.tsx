import type { ReactNode } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";

interface Crumb {
  label: string;
  href: string;
}

interface PageHeroProps {
  eyebrow: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  crumbs?: Crumb[];
  aside?: ReactNode;
  children?: ReactNode;
  className?: string;
  /** Shrinks the title for long headlines such as article titles. */
  compact?: boolean;
}

export function PageHero({ eyebrow, title, description, crumbs, aside, children, className, compact }: PageHeroProps) {
  return (
    <section className={cn("relative overflow-hidden border-b border-ink-700", className)}>
      <div className="bg-grid-faint absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent_90%)]" aria-hidden="true" />
      <Container className="relative pb-16 pt-12 sm:pb-20 sm:pt-16 lg:pb-24 lg:pt-20">
        {crumbs && crumbs.length > 0 ? (
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex flex-wrap items-center gap-1.5 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-ink-400">
              {crumbs.map((c, i) => (
                <li key={c.href} className="flex items-center gap-1.5">
                  {i > 0 ? <ChevronRight aria-hidden="true" className="size-3 text-ink-600" /> : null}
                  <Link href={c.href} className="transition-colors hover:text-bone-50">
                    {c.label}
                  </Link>
                </li>
              ))}
            </ol>
          </nav>
        ) : null}
        <div className={cn("grid gap-10", aside ? "lg:grid-cols-12 lg:items-end" : "")}>
          <div className={cn(aside ? "lg:col-span-8" : "")}>
            <Reveal>
              <Eyebrow>{eyebrow}</Eyebrow>
            </Reveal>
            <Reveal delay={0.05}>
              <h1
                className={cn(
                  "font-display mt-6 max-w-4xl text-balance text-bone-50",
                  compact
                    ? "text-3xl leading-[1.08] sm:text-5xl lg:text-[3.5rem]"
                    : "text-4xl leading-[1.02] sm:text-6xl lg:text-7xl",
                )}
              >
                {title}
              </h1>
            </Reveal>
            {description ? (
              <Reveal delay={0.1}>
                <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-ink-300 sm:text-xl">{description}</p>
              </Reveal>
            ) : null}
            {children ? <Reveal delay={0.15}>{children}</Reveal> : null}
          </div>
          {aside ? (
            <Reveal delay={0.15} className="lg:col-span-4">
              {aside}
            </Reveal>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
