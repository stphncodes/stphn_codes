import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/projects";
import { ProjectMockup } from "@/components/work/ProjectMockup";
import { Tag } from "@/components/ui/Tag";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  project: Project;
  className?: string;
  index?: string;
  /** Wide layout: mockup beside the text on large screens. */
  featured?: boolean;
}

export function ProjectCard({ project, className, index, featured }: ProjectCardProps) {
  return (
    <article className={cn("group relative flex flex-col", featured && "lg:grid lg:grid-cols-12 lg:items-center lg:gap-10", className)}>
      <Link href={`/work/${project.slug}`} className={cn("block overflow-hidden rounded-2xl border border-ink-700 bg-ink-850 p-3 transition-[border-color,transform] duration-500 ease-out-expo hover:-translate-y-1 hover:border-ink-500 [.surface-light_&]:border-bone-200 [.surface-light_&]:bg-white sm:p-4", featured && "lg:col-span-8")}>
        <ProjectMockup project={project} wide={featured} className="transition-transform duration-700 ease-out-expo group-hover:scale-[1.015]" />
      </Link>
      <div className={cn(featured && "lg:col-span-4")}>
      <div className={cn("mt-5 flex items-start justify-between gap-4", featured && "lg:mt-0")}>
        <div>
          <div className="flex items-center gap-3 font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-ink-400 [.surface-light_&]:text-ink-500">
            {index ? <span className="text-ember-400 [.surface-light_&]:text-ember-600">{index}</span> : null}
            <span>{project.category}</span>
            <span aria-hidden="true">·</span>
            <span>{project.year}</span>
          </div>
          <h3 className="font-display mt-2 text-2xl text-bone-50 [.surface-light_&]:text-ink-900">
            <Link href={`/work/${project.slug}`} className="transition-colors hover:text-ember-300 [.surface-light_&]:hover:text-ember-600">
              {project.name}
            </Link>
          </h3>
        </div>
        <Link
          href={`/work/${project.slug}`}
          aria-label={`View case study: ${project.name}`}
          className="flex size-11 shrink-0 items-center justify-center rounded-full border border-ink-700 text-ink-300 transition-colors hover:border-bone-50 hover:bg-bone-50 hover:text-ink-950 [.surface-light_&]:border-ink-200 [.surface-light_&]:text-ink-500 [.surface-light_&]:hover:bg-ink-900 [.surface-light_&]:hover:text-bone-50"
        >
          <ArrowUpRight aria-hidden="true" className="size-4" />
        </Link>
      </div>
      <p className="mt-3 text-pretty text-sm leading-relaxed text-ink-300 [.surface-light_&]:text-ink-500">{project.summary}</p>
      <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Technologies">
        {project.technologies.map((t) => (
          <li key={t}>
            <Tag>{t}</Tag>
          </li>
        ))}
      </ul>
      </div>
    </article>
  );
}
