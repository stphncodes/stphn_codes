import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ArrowLink } from "@/components/ui/Button";
import { JsonLd } from "@/components/ui/JsonLd";
import { Reveal } from "@/components/motion/Reveal";
import { ArticleBody } from "@/components/insights/ArticleBody";
import { ArticleCard } from "@/components/insights/ArticleCard";
import { FinalCta } from "@/components/home/FinalCta";
import { articles, getArticle, sortedArticles } from "@/data/articles";
import { getService } from "@/data/services";
import { articleJsonLd, breadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import { formatDate } from "@/lib/utils";

/** Only slugs from generateStaticParams exist; anything else is a 404 from static output. */
export const ensureStatic = "navigation";

/**
 * The page body awaits `params`, so the App Shell cannot include its content and a client
 * navigation waits for the (fully static, prerendered) route payload instead of showing a
 * skeleton. Opt out of instant-navigation validation rather than add a Suspense fallback.
 */
export const instant = false;

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata(props: PageProps<"/insights/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const article = getArticle(slug);
  if (!article) return {};
  return buildMetadata({
    title: article.title,
    description: article.description,
    path: `/insights/${article.slug}`,
    type: "article",
    publishedTime: article.publishedAt,
  });
}

export default async function ArticlePage(props: PageProps<"/insights/[slug]">) {
  const { slug } = await props.params;
  const article = getArticle(slug);
  if (!article) notFound();

  const path = `/insights/${article.slug}`;
  const related = article.relatedServices.map(getService).filter((s) => s !== undefined);
  const more = sortedArticles.filter((a) => a.slug !== article.slug).slice(0, 2);

  return (
    <>
      <JsonLd
        data={[
          articleJsonLd({ title: article.title, description: article.description, path, publishedAt: article.publishedAt }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Insights", path: "/insights" },
            { name: article.title, path },
          ]),
        ]}
      />
      <PageHero
        compact
        eyebrow={article.category}
        title={article.title}
        description={article.description}
        crumbs={[
          { label: "Insights", href: "/insights" },
          { label: article.title, href: path },
        ]}
      >
        <dl className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-sm text-ink-300">
          <div>
            <dt className="sr-only">Author</dt>
            <dd>{siteConfig.founder.name}</dd>
          </div>
          <div>
            <dt className="sr-only">Published</dt>
            <dd>
              <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
            </dd>
          </div>
          <div>
            <dt className="sr-only">Reading time</dt>
            <dd>{article.readingMinutes} min read</dd>
          </div>
        </dl>
      </PageHero>

      <Section className="pt-12 sm:pt-16">
        <Container>
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-8">
            <article className="lg:col-span-8">
              <Reveal>
                <ArticleBody blocks={article.body} />
              </Reveal>
            </article>
            <aside className="lg:col-span-4">
              <div className="space-y-8 lg:sticky lg:top-[calc(var(--header-height)+2rem)]">
                {related.length > 0 ? (
                  <div className="rounded-2xl border border-ink-700 bg-ink-850 p-6">
                    <Eyebrow>Related services</Eyebrow>
                    <ul className="mt-4 divide-y divide-ink-700">
                      {related.map((s) => (
                        <li key={s.slug}>
                          <ArrowLink href={`/services/${s.slug}`} className="w-full justify-between py-3">
                            {s.name}
                          </ArrowLink>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
                <div className="rounded-2xl border border-ink-700 p-6">
                  <p className="font-display text-xl text-bone-50">Talk this through?</p>
                  <p className="mt-2 text-sm leading-relaxed text-ink-300">
                    We are happy to apply this thinking to your project in a short, no-obligation conversation.
                  </p>
                  <div className="mt-4">
                    <ArrowLink href="/contact">Get in touch</ArrowLink>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </Section>

      <Section tone="light" labelledBy="more-heading">
        <Container>
          <div className="flex items-end justify-between gap-6">
            <h2 id="more-heading" className="font-display text-3xl text-ink-900">
              More insights
            </h2>
            <Link href="/insights" className="text-sm font-medium text-ink-900 underline decoration-ink-300 underline-offset-[0.35em] hover:decoration-ember-600">
              All articles
            </Link>
          </div>
          <div className="mt-10 grid gap-8 md:grid-cols-2">
            {more.map((a) => (
              <ArticleCard key={a.slug} article={a} />
            ))}
          </div>
        </Container>
      </Section>

      <FinalCta />
    </>
  );
}
