import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SectionHeader } from "@/components/ui/Heading";
import { ArrowLink } from "@/components/ui/Button";
import { ArticleCard } from "@/components/insights/ArticleCard";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { sortedArticles } from "@/data/articles";

export function InsightsPreview() {
  const recent = sortedArticles.slice(0, 3);
  return (
    <Section bordered labelledBy="insights-heading">
      <Container>
        <Reveal>
          <SectionHeader
            id="insights-heading"
            eyebrow={<Eyebrow>Insights</Eyebrow>}
            title="Notes on building useful software."
            description="Practical writing on choosing, planning and shipping digital products and AI systems."
            action={<ArrowLink href="/insights">All articles</ArrowLink>}
          />
        </Reveal>
        <RevealGroup className="mt-14 grid gap-8 md:grid-cols-3">
          {recent.map((a) => (
            <RevealItem key={a.slug}>
              <ArticleCard article={a} />
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </Section>
  );
}
