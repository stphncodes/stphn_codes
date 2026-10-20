import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { siteConfig } from "@/lib/site";

interface FinalCtaProps {
  title?: string;
  text?: string;
  cta?: string;
  href?: string;
}

export function FinalCta({
  title = "Have an idea worth building?",
  text = "Let's turn your next digital idea into something useful.",
  cta = "Tell us about your project",
  href = "/start-project",
}: FinalCtaProps) {
  return (
    <section className="relative overflow-hidden border-t border-ink-700 bg-ink-950 py-24 sm:py-32" aria-labelledby="final-cta-heading">
      <div className="bg-dots absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" aria-hidden="true" />
      <Container className="relative">
        <Reveal className="mx-auto max-w-3xl text-center">
          <h2 id="final-cta-heading" className="font-display text-balance text-4xl leading-[1.02] text-bone-50 sm:text-5xl lg:text-6xl">
            {title}
          </h2>
          <p className="mt-6 text-pretty text-lg text-ink-300 sm:text-xl">{text}</p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href={href} size="lg">
              {cta}
            </Button>
            <a
              href={`mailto:${siteConfig.email}`}
              className="text-sm text-ink-300 underline decoration-ink-600 underline-offset-[0.35em] transition-colors hover:text-bone-50 hover:decoration-ember-400"
            >
              or email {siteConfig.email}
            </a>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
