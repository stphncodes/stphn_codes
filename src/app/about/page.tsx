import type { Metadata } from "next";
import Link from "next/link";
import { Compass, Code2, ShieldCheck, Layers, Sparkles } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading, SectionHeader } from "@/components/ui/Heading";
import { Button, ArrowLink } from "@/components/ui/Button";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { FinalCta } from "@/components/home/FinalCta";
import { LogoMark } from "@/components/ui/Logo";
import { FounderPortrait } from "@/components/ui/FounderPortrait";
import { services } from "@/data/services";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "About the studio",
  description:
    "StphnCodes Studio is a founder-led software development and AI agency in Nigeria. Learn about our philosophy, engineering principles and direction in practical AI.",
  path: "/about",
});

const principles = [
  {
    icon: Compass,
    title: "Understand before building",
    text: "We ask what problem the software solves and for whom. Code written without that answer tends to get rewritten.",
  },
  {
    icon: Code2,
    title: "Simple over clever",
    text: "Readable, typed, boring code beats ingenious code. It is easier to test, hand over and change in a year.",
  },
  {
    icon: ShieldCheck,
    title: "Correct by design",
    text: "Validation at boundaries, permissions enforced close to the data, secrets in configuration, errors handled visibly.",
  },
  {
    icon: Layers,
    title: "Ship in increments",
    text: "Work lands on a preview URL early and often. Feedback on real software is worth more than any document.",
  },
  {
    icon: Sparkles,
    title: "Automate deliberately",
    text: "Automation and AI are applied where they remove real effort, with people kept in control of what matters.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About the studio"
        title="A small studio with a clear point of view on software."
        description="StphnCodes Studio builds websites, applications and intelligent systems for businesses in Nigeria and internationally. Founder-led, hands-on and honest about what works."
        aside={
          <div className="rounded-2xl border border-ink-700 bg-ink-850 p-6">
            <LogoMark className="size-9" />
            <p className="mt-5 font-display text-2xl text-bone-50">{siteConfig.tagline}</p>
            <p className="mt-3 text-sm leading-relaxed text-ink-300">
              Software that is built well, then made smarter where it counts.
            </p>
          </div>
        }
      />

      {/* Studio introduction with founder portrait */}
      <Section labelledBy="intro-heading">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <Reveal y={28}>
                <FounderPortrait className="mx-auto max-w-md lg:max-w-none" priority />
              </Reveal>
            </div>
            <div className="space-y-6 text-pretty text-lg leading-relaxed text-ink-300 lg:col-span-7 lg:pt-4">
              <Reveal>
                <Eyebrow>The studio</Eyebrow>
                <Heading id="intro-heading" className="mt-5">
                  Founded by an engineer who still writes the code.
                </Heading>
              </Reveal>
              <Reveal>
                <p>
                  StphnCodes Studio was started by {siteConfig.founder.name}, a software engineer and full-stack web
                  developer based in Nigeria. His work spans production web applications, responsive interfaces,
                  backend integrations, authentication, database-driven functionality and deployment.
                </p>
              </Reveal>
              <Reveal delay={0.05}>
                <p>
                  The studio exists to give businesses access to that kind of engineering without the overhead of a
                  large agency. Projects are scoped honestly, built carefully and delivered by the person you speak to.
                  Where a project needs more hands, we collaborate with trusted developers and say so clearly.
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <p>
                  We work with startups, small and medium-sized businesses and established companies, in Nigeria and
                  with clients abroad. Recent work includes a skills-verification platform, a pre-owned vehicle
                  marketplace and a community website, all now in production.
                </p>
              </Reveal>
              <Reveal delay={0.15}>
                <ArrowLink href="/work">See the case studies</ArrowLink>
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      {/* Mission and approach */}
      <Section tone="light" labelledBy="mission-heading">
        <Container>
          <Reveal>
            <SectionHeader
              id="mission-heading"
              eyebrow={<Eyebrow>Mission and approach</Eyebrow>}
              title="Make software that earns its place in a business."
              description="Every product we build should either bring in customers, save effort or make better decisions possible. If it does none of those, we would rather not build it."
            />
          </Reveal>
          <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-bone-200 bg-bone-200 md:grid-cols-3">
            {[
              {
                title: "Problem first",
                text: "We start from the business outcome and work back to the simplest system that achieves it.",
              },
              {
                title: "Right-sized technology",
                text: "A static site, a web app or an AI agent, chosen on fit. We explain the trade-offs in plain language.",
              },
              {
                title: "Built to last",
                text: "Maintainable code, documentation and a handover you can actually use, whoever maintains it next.",
              },
            ].map((item, i) => (
              <Reveal key={item.title} delay={i * 0.06} className="bg-bone-50 p-8">
                <span className="font-mono text-xs text-ember-600">0{i + 1}</span>
                <h3 className="font-display mt-4 text-2xl text-ink-900">{item.title}</h3>
                <p className="mt-3 text-pretty leading-relaxed text-ink-500">{item.text}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Engineering principles */}
      <Section labelledBy="principles-heading">
        <Container>
          <Reveal>
            <SectionHeader
              id="principles-heading"
              eyebrow={<Eyebrow>Engineering principles</Eyebrow>}
              title="How we keep quality high without ceremony."
            />
          </Reveal>
          <RevealGroup as="ul" className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {principles.map((p) => {
              const Icon = p.icon;
              return (
                <RevealItem key={p.title} as="li" className="rounded-2xl border border-ink-700 bg-ink-850 p-6 sm:p-7">
                  <span className="flex size-10 items-center justify-center rounded-lg border border-ink-700 bg-ink-900 text-ember-400">
                    <Icon aria-hidden="true" className="size-4.5" />
                  </span>
                  <h3 className="font-display mt-6 text-xl text-bone-50">{p.title}</h3>
                  <p className="mt-2 text-pretty text-sm leading-relaxed text-ink-300">{p.text}</p>
                </RevealItem>
              );
            })}
            <RevealItem as="li" className="flex flex-col justify-between rounded-2xl border border-dashed border-ink-600 p-6 sm:p-7">
              <p className="font-display text-xl text-bone-50">Want the detail?</p>
              <p className="mt-2 text-sm leading-relaxed text-ink-300">
                Our process page walks through each stage of an engagement and what you receive at the end of it.
              </p>
              <div className="mt-6">
                <ArrowLink href="/process">Read about our process</ArrowLink>
              </div>
            </RevealItem>
          </RevealGroup>
        </Container>
      </Section>

      {/* Current capabilities */}
      <Section tone="deep" bordered labelledBy="capabilities-heading">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-5">
              <Reveal>
                <Eyebrow>Current capabilities</Eyebrow>
                <Heading id="capabilities-heading" className="mt-5">
                  What we can take on today.
                </Heading>
                <p className="mt-6 max-w-md text-pretty text-lg leading-relaxed text-ink-300">
                  Our strongest ground is production web development with React, Next.js, TypeScript and Supabase.
                  Mobile and AI work build on that same foundation.
                </p>
              </Reveal>
            </div>
            <ul className="divide-y divide-ink-700 border-y border-ink-700 lg:col-span-7">
              {services.map((s) => {
                const Icon = s.icon;
                return (
                  <Reveal key={s.slug} as="li">
                    <Link
                      href={`/services/${s.slug}`}
                      className="group flex items-center gap-5 py-5 transition-colors hover:text-ember-300"
                    >
                      <span className="font-mono text-xs text-ember-400">{s.index}</span>
                      <Icon aria-hidden="true" className="size-5 text-ink-400 transition-colors group-hover:text-ember-400" />
                      <span className="flex-1">
                        <span className="block font-display text-xl text-bone-50 transition-colors group-hover:text-ember-300">{s.name}</span>
                        <span className="mt-1 block text-sm text-ink-400">{s.summary}</span>
                      </span>
                    </Link>
                  </Reveal>
                );
              })}
            </ul>
          </div>
        </Container>
      </Section>

      {/* Future direction */}
      <Section labelledBy="future-heading">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-5">
              <Reveal>
                <Eyebrow>Where we are heading</Eyebrow>
                <Heading id="future-heading" className="mt-5">
                  From code to intelligence, carefully.
                </Heading>
              </Reveal>
            </div>
            <div className="space-y-6 text-pretty text-lg leading-relaxed text-ink-300 lg:col-span-7">
              <Reveal>
                <p>
                  Language models have made a new class of software practical: assistants that answer from your own
                  documents, systems that read and route incoming work, agents that draft and prepare tasks for a person
                  to approve. We are building this capability into the studio deliberately, on top of the engineering
                  discipline that makes any software trustworthy.
                </p>
              </Reveal>
              <Reveal delay={0.05}>
                <p>
                  Our interest is practical, not speculative. We look for the narrow, repetitive, text-heavy work inside
                  a business where a model clearly helps, measure whether it does, and keep humans in the loop wherever
                  the stakes are real.
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <div className="flex flex-wrap gap-3 pt-2">
                  <Button href="/services/ai-solutions" variant="secondary">
                    AI-powered applications
                  </Button>
                  <Button href="/services/ai-automation" variant="secondary">
                    AI agents and automation
                  </Button>
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      <FinalCta title="Want to talk through a project?" text="Tell us what you are trying to achieve and we will give you an honest view of how to get there." />
    </>
  );
}
