import type { Metadata } from "next";
import { ArrowUpRight, Clock, Mail, MapPin } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { InquiryForm } from "@/components/forms/InquiryForm";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Contact",
  description: `Get in touch with StphnCodes Studio. Email ${siteConfig.email} or send a message. We reply within two working days.`,
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Say hello. We read everything."
        description="Questions, introductions, a second opinion on a quote: send a message and you will hear back from Stephen directly."
      />
      <Section>
        <Container>
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-5">
              <Reveal>
                <Eyebrow>Details</Eyebrow>
                <ul className="mt-6 space-y-6">
                  <li className="flex gap-4">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-ink-700 bg-ink-850 text-ember-400">
                      <Mail aria-hidden="true" className="size-4" />
                    </span>
                    <div>
                      <p className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-ink-400">Email</p>
                      <a href={`mailto:${siteConfig.email}`} className="mt-1 inline-flex items-center gap-1 font-display text-xl text-bone-50 underline decoration-ink-600 underline-offset-[0.3em] transition-colors hover:decoration-ember-400">
                        {siteConfig.email}
                        <ArrowUpRight aria-hidden="true" className="size-4 text-ink-400" />
                      </a>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-ink-700 bg-ink-850 text-ember-400">
                      <Clock aria-hidden="true" className="size-4" />
                    </span>
                    <div>
                      <p className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-ink-400">Response time</p>
                      <p className="mt-1 text-bone-50">Within two working days</p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-ink-700 bg-ink-850 text-ember-400">
                      <MapPin aria-hidden="true" className="size-4" />
                    </span>
                    <div>
                      <p className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-ink-400">Location</p>
                      <p className="mt-1 text-bone-50">{siteConfig.location}</p>
                      <p className="mt-1 text-sm text-ink-400">Remote-first. Calls scheduled across time zones.</p>
                    </div>
                  </li>
                </ul>
              </Reveal>
              <Reveal delay={0.1}>
                <div className="mt-12 rounded-2xl border border-ink-700 bg-ink-850 p-6">
                  <Heading level={2} size="sm">
                    Have a project in mind?
                  </Heading>
                  <p className="mt-2 text-sm leading-relaxed text-ink-300">
                    The project inquiry form asks a few more questions so we can come back with a useful first reply.
                  </p>
                  <div className="mt-5">
                    <Button href="/start-project" size="sm" variant="secondary">
                      Start a project
                    </Button>
                  </div>
                </div>
              </Reveal>
              <Reveal delay={0.15}>
                <div className="mt-8">
                  <p className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-ink-400">Elsewhere</p>
                  <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
                    {siteConfig.social.map((s) => (
                      <li key={s.href}>
                        <a href={s.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm text-ink-300 transition-colors hover:text-bone-50">
                          {s.label}
                          <ArrowUpRight aria-hidden="true" className="size-3.5" />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </div>
            <div className="lg:col-span-7">
              <Reveal delay={0.1}>
                <div className="rounded-3xl border border-ink-700 bg-ink-850 p-6 sm:p-8 lg:p-10">
                  <Heading level={2} size="md">
                    Send a message
                  </Heading>
                  <div className="mt-8">
                    <InquiryForm kind="contact" />
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
