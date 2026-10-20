import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SectionHeader } from "@/components/ui/Heading";
import { ServiceCard } from "@/components/services/ServiceCard";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { FinalCta } from "@/components/home/FinalCta";
import { ArrowLink } from "@/components/ui/Button";
import { services } from "@/data/services";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Services",
  description:
    "Website development, web applications, mobile apps, AI-powered applications and AI automation from StphnCodes Studio. Scoped honestly, built to last.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Everything from a fast website to an AI agent that works your inbox."
        description="Five services that cover the full journey from a first web presence to intelligent systems. Most clients start with one and grow into the others."
      />

      <Section labelledBy="list-heading">
        <Container>
          <h2 id="list-heading" className="sr-only">
            All services
          </h2>
          <RevealGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
            {services.map((s, i) => (
              <RevealItem key={s.slug} className={i < 2 ? "lg:col-span-3" : "lg:col-span-2"}>
                <ServiceCard service={s} featured={i < 2} />
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      <Section tone="light" labelledBy="fit-heading">
        <Container>
          <Reveal>
            <SectionHeader
              id="fit-heading"
              eyebrow={<Eyebrow>Which one do you need?</Eyebrow>}
              title="Not sure where your project fits?"
              description="A rough guide. If you are between two, start the conversation and we will help you decide."
            />
          </Reveal>
          <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-bone-200 bg-bone-200 md:grid-cols-2">
            {[
              ["You need to be found and trusted online", "Website development", "/services/web-development"],
              ["Your team runs on spreadsheets and manual steps", "Web application development", "/services/web-applications"],
              ["Your customers need you on their home screen", "Mobile app development", "/services/mobile-apps"],
              ["You have documents and data people cannot search", "AI-powered applications", "/services/ai-solutions"],
              ["The same tasks repeat every day across tools", "AI agents and automation", "/services/ai-automation"],
              ["You are not sure yet", "Start with discovery", "/start-project"],
            ].map(([situation, service, href], i) => (
              <Reveal key={href} delay={i * 0.04} className="bg-bone-50 p-6 sm:p-8">
                <p className="text-lg text-ink-900">{situation}</p>
                <div className="mt-4">
                  <ArrowLink href={href}>{service}</ArrowLink>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <FinalCta />
    </>
  );
}
