import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SectionHeader } from "@/components/ui/Heading";
import { ArrowLink } from "@/components/ui/Button";
import { ProjectCard } from "@/components/work/ProjectCard";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { projects } from "@/data/projects";

export function SelectedWork() {
  return (
    <Section id="work" tone="light" labelledBy="work-heading">
      <div className="bg-grid-faint-light absolute inset-0 [mask-image:linear-gradient(to_bottom,transparent,black_30%,black_70%,transparent)]" aria-hidden="true" />
      <Container className="relative">
        <Reveal>
          <SectionHeader
            id="work-heading"
            eyebrow={<Eyebrow>Selected work</Eyebrow>}
            title="Work that solves real problems."
            description="Three recent projects across platforms, marketplaces and community websites. Each one shipped to production."
            action={<ArrowLink href="/work">All case studies</ArrowLink>}
          />
        </Reveal>
        <RevealGroup className="mt-14 grid gap-10 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {projects.map((p, i) => (
            <RevealItem key={p.slug} as="div" className={i === 0 ? "md:col-span-2 lg:col-span-1" : ""}>
              <ProjectCard project={p} index={`0${i + 1}`} />
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </Section>
  );
}
