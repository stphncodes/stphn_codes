import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading, SectionHeader } from "@/components/ui/Heading";
import { Faq } from "@/components/ui/Faq";
import { Tag } from "@/components/ui/Tag";
import { Button, ArrowLink } from "@/components/ui/Button";
import { JsonLd } from "@/components/ui/JsonLd";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { ServiceGlyph } from "@/components/services/ServiceGlyph";
import { ProjectCard } from "@/components/work/ProjectCard";
import { ArticleCard } from "@/components/insights/ArticleCard";
import { FinalCta } from "@/components/home/FinalCta";
import { services, getService } from "@/data/services";
import { getProject } from "@/data/projects";
import { getArticle } from "@/data/articles";
import { breadcrumbJsonLd, buildMetadata, faqJsonLd, serviceJsonLd } from "@/lib/seo";

/** Only slugs from generateStaticParams exist; anything else is a 404 from static output. */
export const ensureStatic = "navigation";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata(props: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const service = getService(slug);
  if (!service) return {};
  return buildMetadata({
    title: service.name,
    description: service.summary,
    path: `/services/${service.slug}`,
  });
}

export default async function ServicePage(props: PageProps<"/services/[slug]">) {
  const { slug } = await props.params;
  const service = getService(slug);
  if (!service) notFound();

  const relatedWork = service.relatedWork.map(getProject).filter((p) => p !== undefined);
  const relatedInsights = service.relatedInsights.map(getArticle).filter((a) => a !== undefined);
  const otherServices = services.filter((s) => s.slug !== service.slug);
  const path = `/services/${service.slug}`;

  return (
    <>
      <JsonLd
        data={[
          serviceJsonLd({ name: service.name, description: service.summary, path }),
          faqJsonLd(service.faqs),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
            { name: service.name, path },
          ]),
        ]}
      />
      <PageHero
        eyebrow={`Service ${service.index}`}
        title={service.headline}
        description={service.intro}
        crumbs={[
          { label: "Services", href: "/services" },
          { label: service.name, href: path },
        ]}
        aside={
          <div className="rounded-2xl border border-ink-700 bg-ink-850 p-6">
            <ServiceGlyph slug={service.slug} className="max-w-[16rem]" />
            <p className="mt-5 font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-ink-400">Typical stack</p>
            <ul className="mt-3 flex flex-wrap gap-1.5">
              {service.technologies.map((t) => (
                <li key={t}>
                  <Tag>{t}</Tag>
                </li>
              ))}
            </ul>
          </div>
        }
      >
        <div className="mt-8 flex flex-wrap gap-3">
          <Button href="/start-project">Discuss this service</Button>
          <Button href="/work" variant="secondary">
            See related work
          </Button>
        </div>
      </PageHero>

      {/* Outcomes */}
      <Section labelledBy="outcomes-heading">
        <Container>
          <Reveal>
            <SectionHeader id="outcomes-heading" eyebrow={<Eyebrow>Business outcomes</Eyebrow>} title="What this work should achieve for you." />
          </Reveal>
          <RevealGroup as="ul" className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-ink-700 bg-ink-700 sm:grid-cols-2">
            {service.outcomes.map((o, i) => (
              <RevealItem key={o.title} as="li" className="bg-ink-900 p-6 sm:p-8">
                <span className="font-mono text-xs text-ember-400">0{i + 1}</span>
                <h3 className="font-display mt-4 text-xl text-bone-50 sm:text-2xl">{o.title}</h3>
                <p className="mt-3 text-pretty leading-relaxed text-ink-300">{o.description}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      {/* Deliverables + process */}
      <Section tone="light" labelledBy="deliverables-heading">
        <Container>
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-5">
              <Reveal>
                <Eyebrow>Deliverables</Eyebrow>
                <Heading id="deliverables-heading" className="mt-5">
                  What we build and hand over.
                </Heading>
              </Reveal>
              <Reveal delay={0.05}>
                <ul className="mt-8 grid gap-3">
                  {service.deliverables.map((d) => (
                    <li key={d} className="flex items-start gap-3 text-ink-900">
                      <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-ink-900 text-bone-50">
                        <Check aria-hidden="true" className="size-3" strokeWidth={3} />
                      </span>
                      {d}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
            <div className="lg:col-span-7">
              <Reveal>
                <Eyebrow>Approach</Eyebrow>
                <Heading level={3} className="mt-5" size="md">
                  How a {service.name.toLowerCase()} engagement runs.
                </Heading>
              </Reveal>
              <ol className="mt-8 space-y-px overflow-hidden rounded-2xl border border-bone-200 bg-bone-200">
                {service.process.map((step, i) => (
                  <Reveal key={step.title} as="li" delay={i * 0.05} className="grid gap-3 bg-paper p-6 sm:grid-cols-12 sm:gap-6">
                    <span className="font-display text-2xl text-ember-600 sm:col-span-2">0{i + 1}</span>
                    <div className="sm:col-span-10">
                      <h4 className="font-display text-lg text-ink-900">{step.title}</h4>
                      <p className="mt-1.5 text-pretty text-sm leading-relaxed text-ink-500">{step.description}</p>
                    </div>
                  </Reveal>
                ))}
              </ol>
              <p className="mt-6 text-sm text-ink-500">
                This follows our{" "}
                <ArrowLink href="/process" className="text-sm">
                  six-stage process
                </ArrowLink>
                , weighted for this kind of work.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Related work */}
      {relatedWork.length > 0 ? (
        <Section labelledBy="related-work-heading">
          <Container>
            <Reveal>
              <SectionHeader
                id="related-work-heading"
                eyebrow={<Eyebrow>Related work</Eyebrow>}
                title="Projects that used this capability."
                action={<ArrowLink href="/work">All case studies</ArrowLink>}
              />
            </Reveal>
            <RevealGroup className="mt-12 grid gap-10 md:grid-cols-2 lg:gap-8">
              {relatedWork.map((p) => (
                <RevealItem key={p.slug}>
                  <ProjectCard project={p} />
                </RevealItem>
              ))}
            </RevealGroup>
          </Container>
        </Section>
      ) : (
        <Section labelledBy="related-work-heading">
          <Container>
            <Reveal className="rounded-2xl border border-dashed border-ink-600 p-8 sm:p-10">
              <Eyebrow>Related work</Eyebrow>
              <h2 id="related-work-heading" className="font-display mt-4 text-2xl text-bone-50">
                Case studies for this service are coming.
              </h2>
              <p className="mt-3 max-w-2xl text-pretty leading-relaxed text-ink-300">
                Our published case studies currently cover websites and web applications. This service builds on the
                same engineering foundation. We are happy to walk you through relevant experience in a conversation.
              </p>
              <div className="mt-6">
                <ArrowLink href="/work">See our published work</ArrowLink>
              </div>
            </Reveal>
          </Container>
        </Section>
      )}

      {/* FAQ */}
      <Section bordered labelledBy="faq-heading">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-4">
              <Reveal>
                <Eyebrow>FAQ</Eyebrow>
                <Heading id="faq-heading" className="mt-5">
                  Questions we hear about {service.name.toLowerCase()}.
                </Heading>
              </Reveal>
            </div>
            <Reveal className="lg:col-span-8">
              <Faq items={service.faqs} />
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Related insights + other services */}
      <Section tone="deep" bordered labelledBy="more-heading">
        <Container>
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-7">
              <Reveal>
                <SectionHeader id="more-heading" eyebrow={<Eyebrow>Further reading</Eyebrow>} title="Related insights." size="md" />
              </Reveal>
              <div className="mt-8 grid gap-6 sm:grid-cols-2">
                {relatedInsights.map((a) => (
                  <Reveal key={a.slug}>
                    <ArticleCard article={a} />
                  </Reveal>
                ))}
              </div>
            </div>
            <div className="lg:col-span-5">
              <Reveal>
                <Eyebrow>Other services</Eyebrow>
                <ul className="mt-5 divide-y divide-ink-700 border-y border-ink-700">
                  {otherServices.map((s) => (
                    <li key={s.slug}>
                      <ArrowLink href={`/services/${s.slug}`} className="w-full justify-between py-4 text-base">
                        {s.name}
                      </ArrowLink>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      <FinalCta title={`Need ${service.name.toLowerCase()}?`} text="Describe the problem and we will come back with an honest recommendation and a realistic estimate." cta="Start a project" />
    </>
  );
}
