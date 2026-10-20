import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SectionHeader } from "@/components/ui/Heading";
import { ArrowLink } from "@/components/ui/Button";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { processSteps } from "@/data/process";

export function ProcessPreview() {
  return (
    <Section bordered labelledBy="process-heading">
      <Container>
        <Reveal>
          <SectionHeader
            id="process-heading"
            eyebrow={<Eyebrow>Process</Eyebrow>}
            title="A clear path from idea to launch."
            description="Six stages, each with a visible output. You always know where the project is and what comes next."
            action={<ArrowLink href="/process">How we work</ArrowLink>}
          />
        </Reveal>
        <RevealGroup as="ol" className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-ink-700 bg-ink-700 sm:grid-cols-2 lg:grid-cols-3">
          {processSteps.map((step) => (
            <RevealItem key={step.number} as="li" className="group relative bg-ink-900 p-6 transition-colors hover:bg-ink-850 sm:p-8">
              <div className="flex items-center justify-between">
                <span className="font-display text-4xl text-ink-600 transition-colors group-hover:text-ember-500">{step.number}</span>
                <span aria-hidden="true" className="size-1.5 bg-ink-600 transition-colors group-hover:bg-ember-500" />
              </div>
              <h3 className="font-display mt-8 text-xl text-bone-50">{step.title}</h3>
              <p className="mt-2 text-pretty text-sm leading-relaxed text-ink-300">{step.summary}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </Section>
  );
}
