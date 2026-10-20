import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

interface LegalSection {
  title: string;
  paragraphs?: string[];
  items?: string[];
}

interface LegalPageProps {
  eyebrow: string;
  title: string;
  description: string;
  updated: string;
  sections: LegalSection[];
}

export function LegalPage({ eyebrow, title, description, updated, sections }: LegalPageProps) {
  return (
    <>
      <PageHero compact eyebrow={eyebrow} title={title} description={description}>
        <p className="mt-6 font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-ink-400">
          Last updated <time dateTime={updated}>{updated}</time>
        </p>
      </PageHero>
      <Section>
        <Container size="narrow">
          <div className="prose-studio">
            {sections.map((s) => (
              <section key={s.title}>
                <h2>{s.title}</h2>
                {s.paragraphs?.map((p) => (
                  <p key={p}>{p}</p>
                ))}
                {s.items ? (
                  <ul>
                    {s.items.map((i) => (
                      <li key={i}>{i}</li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
