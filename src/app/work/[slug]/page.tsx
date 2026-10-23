import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, Check } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { Tag } from "@/components/ui/Tag";
import { Button, ArrowLink } from "@/components/ui/Button";
import { JsonLd } from "@/components/ui/JsonLd";
import { Reveal } from "@/components/motion/Reveal";
import { ProjectMockup } from "@/components/work/ProjectMockup";
import { FinalCta } from "@/components/home/FinalCta";
import { projects, getProject } from "@/data/projects";
import { getService } from "@/data/services";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

/** Only slugs from generateStaticParams exist; anything else is a 404 from static output. */
export const ensureStatic = "navigation";

/**
 * The page body awaits `params`, so the App Shell cannot include its content and a client
 * navigation waits for the (fully static, prerendered) route payload instead of showing a
 * skeleton. Opt out of instant-navigation validation rather than add a Suspense fallback.
 */
export const instant = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const project = getProject(slug);
  if (!project) return {};
  return buildMetadata({
    title: `${project.name} case study`,
    description: project.summary,
    path: `/work/${project.slug}`,
  });
}

function Block({ eyebrow, title, children, id }: { eyebrow: string; title: string; children: React.ReactNode; id: string }) {
  return (
    <div className="grid gap-6 border-t border-ink-700 py-12 lg:grid-cols-12 lg:gap-8 lg:py-16">
      <div className="lg:col-span-4">
        <Reveal>
          <Eyebrow>{eyebrow}</Eyebrow>
          <Heading id={id} size="md" className="mt-4">
            {title}
          </Heading>
        </Reveal>
      </div>
      <div className="lg:col-span-8">{children}</div>
    </div>
  );
}

export default async function ProjectPage(props: PageProps<"/work/[slug]">) {
  const { slug } = await props.params;
  const project = getProject(slug);
  if (!project) notFound();

  const path = `/work/${project.slug}`;
  const index = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(index + 1) % projects.length];
  const relatedServices = project.services.map(getService).filter((s) => s !== undefined);
  const host = project.liveUrl.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Work", path: "/work" },
          { name: project.name, path },
        ])}
      />
      <PageHero
        eyebrow={`${project.category} · ${project.year}`}
        title={project.name}
        description={project.summary}
        crumbs={[
          { label: "Work", href: "/work" },
          { label: project.name, href: path },
        ]}
      >
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Button href={project.liveUrl} external>
            Visit {host}
          </Button>
          <Button href="/start-project" variant="secondary">
            Discuss a similar project
          </Button>
        </div>
      </PageHero>

      <Section className="pt-12 sm:pt-16 lg:pt-20">
        <Container>
          <Reveal>
            <div className="rounded-3xl border border-ink-700 bg-ink-850 p-4 sm:p-8 lg:p-12">
              <ProjectMockup project={project} priority wide className="mx-auto max-w-4xl shadow-panel" />
            </div>
            <p className="mt-4 text-center font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-ink-500">
              Original interface composition. See the live site for actual screens.
            </p>
          </Reveal>

          <dl className="mt-14 grid gap-8 border-y border-ink-700 py-8 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <dt className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-ink-400">Client</dt>
              <dd className="mt-2 text-bone-50">{project.client}</dd>
            </div>
            <div>
              <dt className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-ink-400">Type</dt>
              <dd className="mt-2 text-bone-50">{project.category}</dd>
            </div>
            <div>
              <dt className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-ink-400">Services</dt>
              <dd className="mt-2 flex flex-wrap gap-x-3 gap-y-1">
                {relatedServices.map((s) => (
                  <Link key={s.slug} href={`/services/${s.slug}`} className="text-bone-50 underline decoration-ink-600 underline-offset-[0.3em] transition-colors hover:decoration-ember-400">
                    {s.name}
                  </Link>
                ))}
              </dd>
            </div>
            <div>
              <dt className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-ink-400">Technology</dt>
              <dd className="mt-2 flex flex-wrap gap-1.5">
                {project.technologies.map((t) => (
                  <Tag key={t}>{t}</Tag>
                ))}
              </dd>
            </div>
          </dl>

          <div className="mt-4">
            <Block eyebrow="Overview" title="The project" id="overview-heading">
              <div className="space-y-5 text-pretty text-lg leading-relaxed text-ink-300">
                {project.overview.map((p) => (
                  <Reveal key={p}>
                    <p>{p}</p>
                  </Reveal>
                ))}
              </div>
            </Block>

            <Block eyebrow="The need" title="What had to be solved" id="need-heading">
              <div className="space-y-5 text-pretty text-lg leading-relaxed text-ink-300">
                {project.need.map((p) => (
                  <Reveal key={p}>
                    <p>{p}</p>
                  </Reveal>
                ))}
              </div>
            </Block>

            <Block eyebrow="Solution" title="What was built" id="solution-heading">
              <div className="space-y-5 text-pretty text-lg leading-relaxed text-ink-300">
                {project.solution.map((p) => (
                  <Reveal key={p}>
                    <p>{p}</p>
                  </Reveal>
                ))}
              </div>
            </Block>

            <Block eyebrow="Contribution" title="Stephen's role" id="contribution-heading">
              <Reveal>
                <div className="rounded-2xl border border-ink-700 bg-ink-850 p-6 sm:p-8">
                  <p className="font-display text-xl text-bone-50 sm:text-2xl">{project.contribution.headline}</p>
                  <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                    {project.contribution.items.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-ink-200">
                        <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-ember-500 text-ink-950">
                          <Check aria-hidden="true" className="size-3" strokeWidth={3} />
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                  {project.contribution.collaboration ? (
                    <p className="mt-6 border-t border-ink-700 pt-5 text-sm leading-relaxed text-ink-400">
                      {project.contribution.collaboration}
                    </p>
                  ) : null}
                </div>
              </Reveal>
            </Block>

            <Block eyebrow="Outcome" title="Where it stands" id="outcome-heading">
              <div className="space-y-5 text-pretty text-lg leading-relaxed text-ink-300">
                {project.outcome.map((p) => (
                  <Reveal key={p}>
                    <p>{p}</p>
                  </Reveal>
                ))}
                <Reveal>
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 font-display text-2xl text-bone-50 transition-colors hover:text-ember-300"
                  >
                    {host}
                    <ArrowUpRight aria-hidden="true" className="size-5 transition-transform duration-300 ease-out-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                </Reveal>
              </div>
            </Block>
          </div>
        </Container>
      </Section>

      <Section tone="light" labelledBy="next-heading">
        <Container>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <Eyebrow>Next case study</Eyebrow>
              <h2 id="next-heading" className="font-display mt-4 text-3xl text-ink-900 sm:text-4xl">
                <Link href={`/work/${next.slug}`} className="transition-colors hover:text-ember-600">
                  {next.name}
                </Link>
              </h2>
              <p className="mt-3 max-w-xl text-pretty text-ink-500">{next.summary}</p>
            </div>
            <ArrowLink href={`/work/${next.slug}`}>Read the case study</ArrowLink>
          </div>
        </Container>
      </Section>

      <FinalCta title="Building something like this?" text="Tell us about your project and we will share what we learned on this one." cta="Discuss a similar project" />
    </>
  );
}
