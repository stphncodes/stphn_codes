import type { Metadata } from "next";
import { LegalPage } from "@/components/ui/LegalPage";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Terms of use",
  description: "Terms governing use of the StphnCodes Studio website and how project engagements are agreed.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Terms of use"
      description="Plain-language terms for using this website. Project work is governed by a separate written agreement."
      updated="2026-10-20"
      sections={[
        {
          title: "Using this website",
          paragraphs: [
            `This website is operated by ${siteConfig.name}. By using it you agree to these terms. The site provides information about our services and a way to contact us; it does not create a contract for services on its own.`,
          ],
        },
        {
          title: "Project engagements",
          paragraphs: [
            "Any software development, design, consulting or automation work is agreed in a separate written proposal or contract that sets out scope, timeline, fees, intellectual property and responsibilities. Where those documents conflict with these terms, the written agreement takes precedence.",
            "Estimates given in conversation or by email are indicative until confirmed in writing.",
          ],
        },
        {
          title: "Intellectual property",
          paragraphs: [
            "The content, design and code of this website belong to us unless otherwise stated. You may view and share links to it freely. You may not copy substantial parts of it for commercial use without permission.",
            "Portfolio work shown on this site belongs to the respective clients. Screenshots of their live sites are included for reference only and remain the property of those clients; project names and links are provided so you can visit the sites directly.",
          ],
        },
        {
          title: "Accuracy and no guarantees",
          paragraphs: [
            "We try to keep this site accurate and current, but it is provided as-is. Articles and insights are general information, not professional advice for your specific situation. Descriptions of technology, including AI capabilities, reflect our understanding at the time of writing and do not promise particular business outcomes.",
          ],
        },
        {
          title: "Links to other sites",
          paragraphs: ["Links to client websites and third-party resources are provided for convenience. We are not responsible for their content or practices."],
        },
        {
          title: "Liability",
          paragraphs: [
            "To the extent permitted by law, we are not liable for any loss arising from use of this website or reliance on its content. Nothing in these terms limits liability that cannot be limited by law.",
          ],
        },
        {
          title: "Governing law",
          paragraphs: ["These terms are governed by the laws of the Federal Republic of Nigeria. Project agreements may specify a different governing law."],
        },
        {
          title: "Contact",
          paragraphs: [`Questions about these terms can be sent to ${siteConfig.email}.`],
        },
      ]}
    />
  );
}
