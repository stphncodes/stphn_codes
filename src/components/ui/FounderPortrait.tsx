import Image from "next/image";
import portrait from "../../../public/founder-stephen-james.jpg";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * Framed founder portrait. The source is a 2:3 studio shot on a dark backdrop;
 * it is cropped to 4:5 and anchored high so the face sits on the upper third.
 */
export function FounderPortrait({ className, priority }: { className?: string; priority?: boolean }) {
  return (
    <figure className={cn("relative", className)}>
      <div className="relative overflow-hidden rounded-2xl border border-ink-700 bg-ink-850">
        <div className="relative aspect-[4/5]">
          <Image
            src={portrait}
            alt={`${siteConfig.founder.name}, founder of ${siteConfig.name}, smiling in a dark green sweater against a dark studio backdrop.`}
            fill
            sizes="(min-width: 1024px) 40vw, (min-width: 640px) 70vw, 100vw"
            priority={priority}
            placeholder="blur"
            className="object-cover object-[50%_18%] transition-transform duration-700 ease-out-expo hover:scale-[1.02]"
          />
          {/* Soft vignette so the frame edge reads cleanly against the page */}
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(18,18,17,0.9)_0%,rgba(18,18,17,0.1)_35%,transparent_60%)]" aria-hidden="true" />
          <div className="bg-grid-faint pointer-events-none absolute inset-0 opacity-40 [mask-image:linear-gradient(to_bottom,black,transparent_40%)]" aria-hidden="true" />
        </div>
        <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 sm:p-6">
          <div>
            <p className="font-display text-xl text-bone-50 sm:text-2xl">{siteConfig.founder.name}</p>
            <p className="mt-1 font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-ink-300">{siteConfig.founder.role}</p>
          </div>
          <span aria-hidden="true" className="mb-1.5 size-2.5 shrink-0 bg-ember-500" />
        </figcaption>
      </div>
      {/* Offset plate behind the frame for depth */}
      <div aria-hidden="true" className="absolute -bottom-3 -right-3 -z-10 h-full w-full rounded-2xl border border-ink-700" />
    </figure>
  );
}
