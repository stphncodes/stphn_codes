import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/motion/Reveal";
import { InquiryForm } from "@/components/forms/InquiryForm";
import { serviceOptions } from "@/lib/inquiry";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Start a project",
  description:
    "Tell StphnCodes Studio about your website, web application, mobile app or AI project. Share the goal, budget and timeline and get a considered reply within two working days.",
  path: "/start-project",
});

const expectations = [
  { title: "A reply within two working days", text: "With initial questions, a view on fit and, where possible, a rough range." },
  { title: "A discovery conversation", text: "A call or email thread to understand the problem properly before any proposal." },
  { title: "A written proposal", text: "Scope, approach, milestones and cost, in plain language you can share internally." },
];

async function PrefilledForm({ searchParams }: { searchParams: PageProps<"/start-project">["searchParams"] }) {
  const params = await searchParams;
  const raw = Array.isArray(params.service) ? params.service[0] : params.service;
  const defaultService = serviceOptions.some((o) => o.value === raw) ? raw : undefined;
  return <InquiryForm kind="project" defaultService={defaultService} />;
}

export default function StartProjectPage(props: PageProps<"/start-project">) {
  return (
    <>
      <PageHero
        eyebrow="Start a project"
        title="Tell us what you want to build."
        description="A few details are enough to begin. The more context you give, the more useful our first reply will be."
      />
      <Section>
        <Container>
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-12">
            <div className="order-2 lg:order-1 lg:col-span-4">
              <Reveal>
                <Eyebrow>What happens next</Eyebrow>
                <ol className="mt-6 space-y-6">
                  {expectations.map((item, i) => (
                    <li key={item.title} className="flex gap-4">
                      <span className="font-display text-2xl text-ember-500">0{i + 1}</span>
                      <div>
                        <h2 className="font-display text-lg text-bone-50">{item.title}</h2>
                        <p className="mt-1 text-sm leading-relaxed text-ink-300">{item.text}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </Reveal>
              <Reveal delay={0.1}>
                <div className="mt-10 rounded-2xl border border-ink-700 p-6">
                  <p className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-ink-400">Prefer email?</p>
                  <a href={`mailto:${siteConfig.email}`} className="mt-2 inline-block font-display text-lg text-bone-50 underline decoration-ink-600 underline-offset-[0.3em] transition-colors hover:decoration-ember-400">
                    {siteConfig.email}
                  </a>
                  <p className="mt-3 text-sm leading-relaxed text-ink-400">
                    Include what you are building, who it is for and any deadline. We will take it from there.
                  </p>
                </div>
              </Reveal>
            </div>
            <div className="order-1 lg:order-2 lg:col-span-8">
              <Reveal delay={0.05}>
                <div className="rounded-3xl border border-ink-700 bg-ink-850 p-6 sm:p-8 lg:p-10">
                  <Heading level={2} size="md">
                    Project inquiry
                  </Heading>
                  <p className="mt-2 text-sm text-ink-400">Fields marked optional can be left blank.</p>
                  <div className="mt-8">
                    <Suspense fallback={<InquiryForm kind="project" />}>
                      <PrefilledForm searchParams={props.searchParams} />
                    </Suspense>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
