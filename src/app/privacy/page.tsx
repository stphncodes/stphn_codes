import type { Metadata } from "next";
import { LegalPage } from "@/components/ui/LegalPage";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Privacy policy",
  description: "How StphnCodes Studio collects, uses and protects the information you share through this website.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Privacy policy"
      description="We collect as little as we can, use it only to respond to you and do not sell or share it with advertisers."
      updated="2026-10-20"
      sections={[
        {
          title: "Who we are",
          paragraphs: [
            `${siteConfig.name} ("we", "us") is a software development and AI agency operated by ${siteConfig.founder.name}. You can contact us about this policy at ${siteConfig.email}.`,
          ],
        },
        {
          title: "Information we collect",
          paragraphs: ["We collect information only when you choose to give it to us:"],
          items: [
            "Contact and project inquiry forms: your name, email address and, optionally, your company, the service you are interested in, a budget range, a timeline and the description you write.",
            "Email correspondence: anything you include when you email us directly.",
            "Technical data: our hosting provider may record standard server logs (such as IP address, browser type and pages requested) for security and reliability. We do not use these logs to identify individuals.",
          ],
        },
        {
          title: "How we use it",
          items: [
            "To reply to your message or inquiry and discuss potential work.",
            "To prepare proposals and, if we work together, to deliver the agreed services.",
            "To keep records required for accounting and legal purposes.",
          ],
          paragraphs: ["We do not use your information for advertising, and we do not sell it to anyone."],
        },
        {
          title: "Where your data goes",
          paragraphs: [
            "Form submissions are delivered to our email inbox. Depending on how the site is configured, delivery may pass through an email delivery service or an automation webhook, which processes the message only to deliver it. If no delivery service is configured, the form opens a draft in your own email application and nothing is stored by this website.",
            "The website is hosted by a cloud provider that may store server logs in data centres outside your country. We choose providers with appropriate security and contractual safeguards.",
          ],
        },
        {
          title: "Cookies and analytics",
          paragraphs: [
            "This website does not set tracking cookies and does not currently use third-party analytics. If we add privacy-respecting analytics in future we will update this policy before doing so.",
          ],
        },
        {
          title: "How long we keep it",
          paragraphs: [
            "We keep inquiry correspondence for as long as needed to respond and, where it leads to work, for the duration of the engagement plus any period required by law. You can ask us to delete your correspondence at any time.",
          ],
        },
        {
          title: "Your rights",
          paragraphs: [
            "Depending on where you live you may have the right to access, correct, delete or restrict the use of your personal data, and to object to its processing. To exercise any of these rights, email us and we will respond within a reasonable time. Nigerian residents have rights under the Nigeria Data Protection Act; residents of the UK and EU have rights under the UK GDPR and GDPR respectively.",
          ],
        },
        {
          title: "Changes to this policy",
          paragraphs: ["We may update this policy as the website or our services change. The date at the top shows when it was last revised."],
        },
      ]}
    />
  );
}
