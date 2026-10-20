import { MessageSquareText, Wrench, GitBranch, Eye, Target } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";

const reasons = [
  {
    icon: MessageSquareText,
    title: "Direct communication",
    text: "You talk to the person building your product. No account managers relaying messages, no surprises at handover.",
  },
  {
    icon: Wrench,
    title: "Practical engineering",
    text: "Proven tools chosen for the job. We will tell you when a simpler option is good enough.",
  },
  {
    icon: GitBranch,
    title: "Maintainable code",
    text: "Typed, documented and organised so you or another team can pick it up later without a rewrite.",
  },
  {
    icon: Eye,
    title: "Transparent collaboration",
    text: "Preview links, written decisions and progress you can see. Scope changes are discussed, not buried.",
  },
  {
    icon: Target,
    title: "Built around real needs",
    text: "Every feature traces back to a business reason. If it does not, we question whether it belongs.",
  },
];

export function WhyUs() {
  return (
    <Section tone="light" labelledBy="why-heading">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <Reveal>
              <Eyebrow>Why work with us</Eyebrow>
              <Heading id="why-heading" className="mt-5">
                A partner, not another vendor.
              </Heading>
              <p className="mt-6 max-w-md text-pretty text-lg leading-relaxed text-ink-500">
                StphnCodes Studio is founder-led and hands-on. That means fewer layers between you and the work, and
                decisions made by someone who understands both the business goal and the code.
              </p>
              <div className="mt-8">
                <Button href="/about" variant="secondary">
                  About the studio
                </Button>
              </div>
            </Reveal>
          </div>
          <ul className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
            {reasons.map((r, i) => {
              const Icon = r.icon;
              return (
                <Reveal key={r.title} as="li" delay={i * 0.05} className={i === reasons.length - 1 ? "sm:col-span-2" : ""}>
                  <div className="flex h-full gap-4 rounded-2xl border border-bone-200 bg-white p-6">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-ink-900 text-bone-50">
                      <Icon aria-hidden="true" className="size-4.5" />
                    </span>
                    <div>
                      <h3 className="font-display text-lg text-ink-900">{r.title}</h3>
                      <p className="mt-1.5 text-pretty text-sm leading-relaxed text-ink-500">{r.text}</p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </Container>
    </Section>
  );
}
