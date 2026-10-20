import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { Ticker } from "@/components/ui/Ticker";
import { Reveal } from "@/components/motion/Reveal";

const pillars = [
  {
    title: "Thoughtful design",
    text: "Interfaces organised around the tasks people actually have, with structure before decoration.",
  },
  {
    title: "Software engineering",
    text: "Typed code, version control, tests where they matter and architecture chosen for the problem.",
  },
  {
    title: "Integrations",
    text: "Payments, email, CRMs, maps and internal tools connected through dependable APIs.",
  },
  {
    title: "Practical automation",
    text: "Workflows and AI agents that remove manual steps while keeping people in control.",
  },
];

const tickerItems = [
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind CSS",
  "Supabase",
  "PostgreSQL",
  "React Native",
  "Expo",
  "Node.js",
  "LLM APIs",
  "Vercel",
  "Resend",
];

export function Capabilities() {
  return (
    <Section tone="deep" labelledBy="capabilities-heading">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <Reveal>
              <Eyebrow>Capabilities</Eyebrow>
              <Heading id="capabilities-heading" className="mt-5">
                Design, engineering and automation, handled as one piece of work.
              </Heading>
              <p className="mt-6 max-w-md text-pretty text-lg leading-relaxed text-ink-300">
                Useful digital products come from combining a clear interface, sound engineering, the right
                integrations and automation where it genuinely saves effort. We handle all four together, so nothing
                falls between vendors.
              </p>
            </Reveal>
          </div>
          <div className="lg:col-span-7">
            <ol className="grid gap-px overflow-hidden rounded-2xl border border-ink-700 bg-ink-700 sm:grid-cols-2">
              {pillars.map((p, i) => (
                <Reveal key={p.title} as="li" delay={i * 0.06} className="bg-ink-900 p-6 sm:p-8">
                  <span className="font-mono text-xs text-ember-400">0{i + 1}</span>
                  <h3 className="font-display mt-4 text-xl text-bone-50">{p.title}</h3>
                  <p className="mt-2 text-pretty text-sm leading-relaxed text-ink-300">{p.text}</p>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </Container>
      <div className="mt-20">
        <Ticker items={tickerItems} />
      </div>
    </Section>
  );
}
