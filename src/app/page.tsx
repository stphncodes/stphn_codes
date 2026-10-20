import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { ServicesOverview } from "@/components/home/ServicesOverview";
import { SelectedWork } from "@/components/home/SelectedWork";
import { Capabilities } from "@/components/home/Capabilities";
import { ProcessPreview } from "@/components/home/ProcessPreview";
import { WhyUs } from "@/components/home/WhyUs";
import { InsightsPreview } from "@/components/home/InsightsPreview";
import { FinalCta } from "@/components/home/FinalCta";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  ...buildMetadata({
    title: `${siteConfig.name} — Software development & AI agency`,
    description: siteConfig.description,
    path: "/",
  }),
  title: { absolute: `${siteConfig.name} — Software development & AI agency` },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesOverview />
      <SelectedWork />
      <Capabilities />
      <ProcessPreview />
      <WhyUs />
      <InsightsPreview />
      <FinalCta />
    </>
  );
}
