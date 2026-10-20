import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SectionHeader } from "@/components/ui/Heading";
import { ArrowLink } from "@/components/ui/Button";
import { ServiceCard } from "@/components/services/ServiceCard";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { services } from "@/data/services";

export function ServicesOverview() {
  return (
    <Section id="services" bordered labelledBy="services-heading">
      <Container>
        <Reveal>
          <SectionHeader
            id="services-heading"
            eyebrow={<Eyebrow>What we build</Eyebrow>}
            title="Five ways we help businesses ship."
            description="Each engagement starts with the problem, not the technology. These are the shapes most of our work takes."
            action={<ArrowLink href="/services">All services</ArrowLink>}
          />
        </Reveal>
        <RevealGroup className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-6" as="div">
          {services.map((s, i) => (
            <RevealItem key={s.slug} className={i < 2 ? "lg:col-span-3" : "lg:col-span-2"}>
              <ServiceCard service={s} featured={i < 2} />
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </Section>
  );
}
