import Image, { type StaticImageData } from "next/image";
import type { Project, ProjectSlug } from "@/data/projects";
import { cn } from "@/lib/utils";
import futureInspired from "@/assets/work/future-inspired.jpg";
import toyotaPreownedVehicles from "@/assets/work/toyota-preowned-vehicles.jpg";
import bibleLivingManchester from "@/assets/work/bible-living-manchester.jpg";

/** Homepage captures of the live sites at 1440×900, taken October 2026. */
const screenshots: Record<ProjectSlug, StaticImageData> = {
  "future-inspired": futureInspired,
  "toyota-preowned-vehicles": toyotaPreownedVehicles,
  "bible-living-manchester": bibleLivingManchester,
};

interface ProjectScreenshotProps {
  project: Project;
  className?: string;
  priority?: boolean;
  /** Wider 16:10 frame for hero placements; cards use 4:3 and crop from the top. */
  wide?: boolean;
  sizes?: string;
}

/** Live-site screenshot inside a minimal browser frame showing the project's domain. */
export function ProjectScreenshot({ project, className, priority, wide, sizes }: ProjectScreenshotProps) {
  const host = project.liveUrl.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");

  return (
    <figure
      className={cn(
        "relative w-full overflow-hidden rounded-xl border border-ink-600 bg-ink-800 [.surface-light_&]:border-bone-300 [.surface-light_&]:bg-bone-100",
        className,
      )}
    >
      {/* Browser chrome */}
      <div className="flex items-center gap-2 border-b border-ink-600 px-3 py-2 [.surface-light_&]:border-bone-200" aria-hidden="true">
        <span className="size-2 rounded-full bg-ink-500 [.surface-light_&]:bg-bone-300" />
        <span className="size-2 rounded-full bg-ink-500 [.surface-light_&]:bg-bone-300" />
        <span className="ml-2 flex h-4 flex-1 items-center rounded-sm bg-ink-700 px-2 font-mono text-[0.5rem] tracking-wide text-ink-300 [.surface-light_&]:bg-bone-50 [.surface-light_&]:text-ink-500">
          {host}
        </span>
      </div>
      <div className={cn("relative", wide ? "aspect-[16/10]" : "aspect-[4/3]")}>
        <Image
          src={screenshots[project.slug]}
          alt={`Homepage of ${project.name} at ${host}.`}
          fill
          sizes={sizes ?? (wide ? "(min-width: 1024px) 56rem, 100vw" : "(min-width: 768px) 50vw, 100vw")}
          priority={priority}
          placeholder="blur"
          className="object-cover object-top"
        />
      </div>
    </figure>
  );
}
