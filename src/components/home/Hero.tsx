import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/motion/Reveal";
import { HeroVisual } from "@/components/home/HeroVisual";
import { siteConfig } from "@/lib/site";

export function Hero() {
  return (
    <section className="relative overflow-hidden" aria-labelledby="hero-heading">
      <div className="bg-grid-faint absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" aria-hidden="true" />
      <Container className="relative grid gap-14 pb-20 pt-14 sm:pt-20 lg:grid-cols-12 lg:items-center lg:gap-10 lg:pb-28 lg:pt-24">
        <div className="lg:col-span-7">
          <Reveal>
            <Eyebrow>{siteConfig.tagline}</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h1
              id="hero-heading"
              className="font-display mt-6 max-w-[14ch] text-balance text-[2.75rem] leading-[0.98] text-bone-50 sm:text-6xl lg:text-[4.5rem] xl:text-[5.25rem]"
            >
              We engineer digital experiences that move businesses{" "}
              <span className="text-ember-400">forward.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-7 max-w-xl text-pretty text-lg leading-relaxed text-ink-300 sm:text-xl">
              From high-performing websites to custom software and AI-powered systems, we turn ambitious ideas into
              useful products.
            </p>
          </Reveal>
          <Reveal delay={0.18}>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Button href="/start-project" size="lg">
                Start a project
              </Button>
              <Button href="/work" size="lg" variant="secondary">
                Explore our work
              </Button>
            </div>
          </Reveal>
          <Reveal delay={0.24}>
            <dl className="mt-12 grid max-w-xl grid-cols-1 gap-x-8 gap-y-4 border-t border-ink-700 pt-6 text-sm xs:grid-cols-3">
              <div>
                <dt className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-ink-500">Based in</dt>
                <dd className="mt-1 text-bone-50">Nigeria, working worldwide</dd>
              </div>
              <div>
                <dt className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-ink-500">Focus</dt>
                <dd className="mt-1 text-bone-50">Web, mobile, AI &amp; automation</dd>
              </div>
              <div>
                <dt className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-ink-500">Model</dt>
                <dd className="mt-1 text-bone-50">Founder-led, hands-on</dd>
              </div>
            </dl>
          </Reveal>
        </div>
        <div className="lg:col-span-5">
          <Reveal delay={0.2} y={28}>
            <HeroVisual className="mx-auto max-w-lg lg:max-w-none" />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
