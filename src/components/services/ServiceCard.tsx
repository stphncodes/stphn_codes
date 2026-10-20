import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Service } from "@/data/services";
import { ServiceGlyph } from "@/components/services/ServiceGlyph";
import { cn } from "@/lib/utils";

export function ServiceCard({ service, className, featured }: { service: Service; className?: string; featured?: boolean }) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className={cn(
        "group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-ink-700 bg-ink-850 p-6 transition-[border-color,transform,background-color] duration-500 ease-out-expo hover:-translate-y-1 hover:border-ink-500 hover:bg-ink-800 sm:p-7",
        "[.surface-light_&]:border-bone-200 [.surface-light_&]:bg-paper [.surface-light_&]:hover:border-ink-300",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <span className="font-mono text-xs text-ember-400 [.surface-light_&]:text-ember-600">{service.index}</span>
        <ArrowUpRight
          aria-hidden="true"
          className="size-5 text-ink-500 transition-[transform,color] duration-300 ease-out-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-bone-50 [.surface-light_&]:group-hover:text-ink-900"
        />
      </div>
      <div className={cn("my-8 w-full", featured ? "max-w-xs" : "max-w-[11rem]")}>
        <ServiceGlyph slug={service.slug} />
      </div>
      <div>
        <h3 className="font-display text-xl text-bone-50 sm:text-2xl [.surface-light_&]:text-ink-900">{service.name}</h3>
        <p className="mt-3 text-pretty text-sm leading-relaxed text-ink-300 [.surface-light_&]:text-ink-500">
          {service.summary}
        </p>
      </div>
    </Link>
  );
}
