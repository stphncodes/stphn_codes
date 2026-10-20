import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { ArticleCard } from "@/components/insights/ArticleCard";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { FinalCta } from "@/components/home/FinalCta";
import { sortedArticles } from "@/data/articles";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Insights",
  description:
    "Practical articles from StphnCodes Studio on choosing between websites and web applications, finding AI automation opportunities, planning mobile apps and scoping MVPs.",
  path: "/insights",
});

export default function InsightsPage() {
  return (
    <>
      <PageHero
        eyebrow="Insights"
        title="Practical notes on building digital products."
        description="Written for business owners and product leads who want to make better software decisions. No hype, no filler."
      />
      <Section labelledBy="articles-heading">
        <Container>
          <h2 id="articles-heading" className="sr-only">
            Articles
          </h2>
          <RevealGroup className="grid gap-x-8 gap-y-12 md:grid-cols-2">
            {sortedArticles.map((a) => (
              <RevealItem key={a.slug}>
                <ArticleCard article={a} />
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>
      <FinalCta title="Want advice specific to your situation?" text="A short conversation usually clears up more than an article can." cta="Get in touch" href="/contact" />
    </>
  );
}
