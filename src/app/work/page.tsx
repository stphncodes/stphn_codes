import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { ProjectCard } from "@/components/work/ProjectCard";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { FinalCta } from "@/components/home/FinalCta";
import { projects } from "@/data/projects";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Work",
  description:
    "Case studies from StphnCodes Studio: Future Inspired, Toyota Nigeria Pre-Owned Cars and Bible Living Manchester. Platforms, marketplaces and websites in production.",
  path: "/work",
});

export default function WorkPage() {
  return (
    <>
      <PageHero
        eyebrow="Work"
        title="Shipped products, described honestly."
        description="Three projects now in production. Each case study explains the need, the solution, the stack and exactly what Stephen contributed."
      />
      <Section labelledBy="projects-heading">
        <Container>
          <h2 id="projects-heading" className="sr-only">
            Case studies
          </h2>
          <RevealGroup className="grid gap-12 md:grid-cols-2 lg:gap-x-8 lg:gap-y-16">
            {projects.map((p, i) => (
              <RevealItem key={p.slug} className={i === 0 ? "md:col-span-2" : ""}>
                <ProjectCard project={p} index={`0${i + 1}`} featured={i === 0} />
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>
      <FinalCta title="Have a similar project in mind?" text="Tell us what you are building and which of these is closest to it." cta="Start a project" />
    </>
  );
}
