import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading, SectionHeader } from "@/components/ui/Heading";
import { Faq } from "@/components/ui/Faq";
import { Reveal } from "@/components/motion/Reveal";
import { FinalCta } from "@/components/home/FinalCta";
import { JsonLd } from "@/components/ui/JsonLd";
import { processSteps } from "@/data/process";
import { buildMetadata, faqJsonLd } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Our development process",
  description:
    "How StphnCodes Studio takes a project from discovery through planning, design, development, testing and launch to ongoing improvement. Clear stages, visible outputs.",
  path: "/process",
});

const faqs = [
  {
    question: "How do you price projects?",
    answer:
      "After discovery we propose either a fixed price for a clearly defined scope or a milestone-based budget for work that will evolve. Either way you see the breakdown before anything starts, and scope changes are priced before they are built.",
  },
  {
    question: "How involved do I need to be?",
    answer:
      "Most of your time goes into discovery and reviews. Expect a kick-off session, short check-ins at each milestone and prompt feedback on previews. We keep meetings few and purposeful.",
  },
  {
    question: "Where does the code live?",
    answer:
      "In a repository you own, from the first commit. Hosting, domains and third-party services are set up in accounts under your control, with access documented at handover.",
  },
  {
    question: "What happens after launch?",
    answer:
      "You can take the product in-house, keep us on for maintenance and improvements, or something in between. We document the system so any of those options is realistic.",
  },
  {
    question: "Can you join a project that has already started?",
    answer:
      "Yes. We begin with a short review of the existing code and infrastructure, write up what we find and agree a plan from there. Rescue work is common and we approach it without judgement.",
  },
];

export default function ProcessPage() {
  return (
    <>
      <JsonLd data={faqJsonLd(faqs)} />
      <PageHero
        eyebrow="Our process"
        title="Six stages. Visible outputs. No surprises."
        description="Every project moves through the same deliberate sequence. The weight given to each stage depends on the work, but nothing is skipped."
      />

      <Section labelledBy="steps-heading">
        <Container>
          <h2 id="steps-heading" className="sr-only">
            Process stages
          </h2>
          <ol className="relative space-y-6">
            {processSteps.map((step, i) => (
              <Reveal key={step.number} as="li" delay={Math.min(i * 0.04, 0.2)}>
                <article className="grid gap-6 rounded-2xl border border-ink-700 bg-ink-850 p-6 sm:p-8 lg:grid-cols-12 lg:gap-8 lg:p-10">
                  <div className="lg:col-span-3">
                    <span className="font-display text-5xl text-ember-500 sm:text-6xl">{step.number}</span>
                    <h3 className="font-display mt-4 text-2xl text-bone-50 sm:text-3xl">{step.title}</h3>
                  </div>
                  <div className="lg:col-span-6">
                    <p className="text-lg leading-relaxed text-bone-50">{step.summary}</p>
                    <p className="mt-4 text-pretty leading-relaxed text-ink-300">{step.detail}</p>
                  </div>
                  <div className="lg:col-span-3">
                    <p className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-ink-400">You receive</p>
                    <ul className="mt-3 space-y-2">
                      {step.outputs.map((o) => (
                        <li key={o} className="flex items-start gap-2.5 text-sm text-ink-200">
                          <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 bg-ember-500" />
                          {o}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </Reveal>
            ))}
          </ol>
        </Container>
      </Section>

      <Section tone="light" labelledBy="rhythm-heading">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-5">
              <Reveal>
                <Eyebrow>Working rhythm</Eyebrow>
                <Heading id="rhythm-heading" className="mt-5">
                  What a week on a project looks like.
                </Heading>
              </Reveal>
            </div>
            <div className="lg:col-span-7">
              <dl className="divide-y divide-bone-200 border-y border-bone-200">
                {[
                  ["Preview links", "Every meaningful change is deployed to a preview URL you can open on any device. You never wait for a demo day."],
                  ["Written decisions", "Technical and scope decisions are recorded in plain language so there is one source of truth for what was agreed and why."],
                  ["Short check-ins", "A brief update at each milestone, plus asynchronous questions as they arise. Long status meetings are avoided."],
                  ["Clear scope changes", "New ideas are welcome. They are written down, estimated and scheduled rather than absorbed silently."],
                ].map(([title, text], i) => (
                  <Reveal key={title} delay={i * 0.05}>
                    <div className="grid gap-2 py-6 sm:grid-cols-12 sm:gap-6">
                      <dt className="font-display text-xl text-ink-900 sm:col-span-4">{title}</dt>
                      <dd className="text-pretty leading-relaxed text-ink-500 sm:col-span-8">{text}</dd>
                    </div>
                  </Reveal>
                ))}
              </dl>
            </div>
          </div>
        </Container>
      </Section>

      <Section labelledBy="faq-heading">
        <Container size="narrow">
          <Reveal>
            <SectionHeader id="faq-heading" eyebrow={<Eyebrow>Questions</Eyebrow>} title="Common questions about working together." />
          </Reveal>
          <Reveal className="mt-12">
            <Faq items={faqs} />
          </Reveal>
        </Container>
      </Section>

      <FinalCta title="Ready to start at stage one?" text="Discovery begins with a conversation about what you need." cta="Start a project" />
    </>
  );
}
