import type { LucideIcon } from "lucide-react";
import { Bot, Globe, LayoutDashboard, Smartphone, Sparkles } from "lucide-react";

export type ServiceSlug =
  | "web-development"
  | "web-applications"
  | "mobile-apps"
  | "ai-solutions"
  | "ai-automation";

export interface ServiceFaq {
  question: string;
  answer: string;
}

export interface Service {
  slug: ServiceSlug;
  /** Short name used in navigation and cards. */
  name: string;
  /** Headline used on the service page hero. */
  headline: string;
  /** One-sentence description for cards and metadata. */
  summary: string;
  /** Very short line for menus. */
  tagline: string;
  /** Longer intro paragraph for the service page. */
  intro: string;
  icon: LucideIcon;
  /** Index number shown on cards, e.g. "01". */
  index: string;
  outcomes: { title: string; description: string }[];
  deliverables: string[];
  process: { title: string; description: string }[];
  technologies: string[];
  faqs: ServiceFaq[];
  /** Slugs of related portfolio projects. */
  relatedWork: string[];
  /** Slugs of related insight articles. */
  relatedInsights: string[];
}

export const services: Service[] = [
  {
    slug: "web-development",
    tagline: "Business sites, landing pages and e-commerce",
    name: "Website development",
    index: "01",
    headline: "Websites that load fast, read clearly and earn trust.",
    summary:
      "Business websites, landing pages and e-commerce experiences built for performance, accessibility and search from the first commit.",
    intro:
      "Your website is usually the first thing a prospective customer checks. We build sites that make a strong first impression and keep working after the launch party: fast on slow connections, readable on small screens, easy to update and structured so search engines can understand them.",
    icon: Globe,
    outcomes: [
      {
        title: "A credible first impression",
        description:
          "Clear structure, confident typography and purposeful visuals that make your offer easy to understand in seconds.",
      },
      {
        title: "Performance on real networks",
        description:
          "Optimised images, minimal JavaScript and server rendering so pages stay quick on mobile data, not just office Wi-Fi.",
      },
      {
        title: "Search foundations in place",
        description:
          "Semantic markup, metadata, sitemaps and structured data set up correctly so you are not retrofitting SEO later.",
      },
      {
        title: "Easy to keep current",
        description:
          "Content is organised so updates are straightforward, whether through a CMS or well-structured code.",
      },
    ],
    deliverables: [
      "Marketing and business websites",
      "Landing pages for campaigns and launches",
      "E-commerce storefronts and checkout flows",
      "Responsive layouts across phone, tablet and desktop",
      "Accessibility review against WCAG guidance",
      "Technical SEO: metadata, sitemap, robots, structured data",
      "Analytics and form integrations",
      "Deployment, domain and hosting setup",
    ],
    process: [
      { title: "Content and structure first", description: "We map pages, messages and calls to action before visual design, so the site is built around what visitors need to know." },
      { title: "Design in context", description: "Layouts are designed responsively from the start, with real content rather than placeholder text." },
      { title: "Build for speed", description: "Next.js or a static build, optimised assets and careful use of client-side JavaScript." },
      { title: "Launch with a checklist", description: "Performance, accessibility, metadata and forms are verified before the domain goes live." },
    ],
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Vite", "Headless CMS", "Vercel"],
    faqs: [
      {
        question: "Do you build with WordPress or a page builder?",
        answer:
          "We build with modern frameworks such as Next.js and Vite. If you need non-technical editing, we connect a headless CMS so you can update content without touching code. We are happy to discuss whether that is the right fit for your situation.",
      },
      {
        question: "How long does a business website take?",
        answer:
          "A focused marketing site is typically a few weeks from kick-off to launch, depending on how quickly content and feedback arrive. Larger sites with e-commerce or many page types take longer. We give a realistic estimate after discovery.",
      },
      {
        question: "Will I own the website?",
        answer:
          "Yes. The source code lives in a repository you control, the domain is registered in your name and hosting accounts are set up under your ownership.",
      },
      {
        question: "Can you redesign an existing site?",
        answer:
          "Yes. We review what is working, what is not and what content can be reused, then plan a rebuild that keeps the URLs and search visibility you already have.",
      },
    ],
    relatedWork: ["bible-living-manchester", "toyota-preowned-vehicles"],
    relatedInsights: ["website-or-web-application"],
  },
  {
    slug: "web-applications",
    tagline: "Dashboards, portals, marketplaces and SaaS",
    name: "Web application development",
    index: "02",
    headline: "Custom web applications built around how your business actually works.",
    summary:
      "Dashboards, portals, marketplaces and SaaS MVPs with authentication, databases, APIs and the custom workflows off-the-shelf tools cannot handle.",
    intro:
      "When spreadsheets, generic SaaS tools and manual processes stop fitting, a custom web application pays for itself. We design and build applications with proper authentication, well-modelled data, clean APIs and interfaces that make day-to-day tasks faster for the people who use them.",
    icon: LayoutDashboard,
    outcomes: [
      {
        title: "Workflows that match reality",
        description:
          "Screens, permissions and automations shaped by how your team operates, not by a generic template.",
      },
      {
        title: "Reliable data foundations",
        description:
          "A relational schema designed for your domain, with access rules enforced at the database level where possible.",
      },
      {
        title: "Secure access",
        description:
          "Authentication, role-based permissions and session handling built on proven providers rather than hand-rolled.",
      },
      {
        title: "Room to grow",
        description:
          "A codebase organised so new features, integrations and team members can be added without a rewrite.",
      },
    ],
    deliverables: [
      "Admin dashboards and internal tools",
      "Customer and partner portals",
      "Marketplaces and listing platforms",
      "SaaS minimum viable products",
      "Authentication and role-based access",
      "Database design and integration",
      "REST and typed API layers",
      "Third-party integrations: payments, email, maps, analytics",
    ],
    process: [
      { title: "Model the domain", description: "We work out the entities, relationships and permissions before writing UI, because data shape drives everything else." },
      { title: "Prioritise ruthlessly", description: "An MVP ships with the few features that prove the idea. Everything else is a documented backlog, not scope." },
      { title: "Build in vertical slices", description: "Each increment goes from database to screen and lands on a preview URL you can try." },
      { title: "Harden before launch", description: "Access rules, input validation, error states and performance are tested with realistic data." },
    ],
    technologies: ["Next.js", "React", "TypeScript", "Supabase", "PostgreSQL", "TanStack", "Tailwind CSS", "Node.js"],
    faqs: [
      {
        question: "What is the difference between a website and a web application?",
        answer:
          "A website presents information; a web application lets people do things: log in, manage records, process orders, collaborate. Applications need authentication, a database and more careful engineering. We wrote an article on how to decide between the two.",
      },
      {
        question: "Which backend do you use?",
        answer:
          "We frequently use Supabase, which provides PostgreSQL, authentication, storage and row-level security, paired with Next.js. Where a project needs something different we choose on fit and explain the trade-offs.",
      },
      {
        question: "Can you work with an existing application?",
        answer:
          "Yes. We can extend, refactor or stabilise an existing codebase. We start by reading the code and documenting what we find so decisions are grounded in the actual state of the project.",
      },
      {
        question: "How do you handle data security?",
        answer:
          "Access rules are enforced on the server and in the database, secrets stay in environment variables, inputs are validated and dependencies are kept current. We will be honest about the limits of any approach rather than promise absolute security.",
      },
    ],
    relatedWork: ["future-inspired", "toyota-preowned-vehicles"],
    relatedInsights: ["website-or-web-application", "planning-a-software-mvp"],
  },
  {
    slug: "mobile-apps",
    tagline: "Cross-platform apps with React Native and Expo",
    name: "Mobile app development",
    index: "03",
    headline: "Mobile applications that share one codebase with your web product.",
    summary:
      "Cross-platform iOS and Android apps built with React Native and Expo, sharing logic, APIs and design language with your web application.",
    intro:
      "For most businesses the right mobile strategy is a cross-platform app that reuses the APIs, data and design decisions already made for the web. We build with React Native and Expo where that fits, which keeps one team, one language and one backend behind both products. Where a native-only feature is essential, we say so up front.",
    icon: Smartphone,
    outcomes: [
      {
        title: "One codebase, two platforms",
        description:
          "React Native and Expo let iOS and Android share most code, reducing cost and keeping features in sync.",
      },
      {
        title: "Shared backend and logic",
        description:
          "The same authentication, database and API layer as your web application, so data stays consistent.",
      },
      {
        title: "Native capabilities where needed",
        description:
          "Camera, push notifications, offline storage and device APIs through well-maintained Expo modules.",
      },
      {
        title: "A realistic release path",
        description:
          "App Store and Play Store preparation, over-the-air updates and a plan for ongoing releases.",
      },
    ],
    deliverables: [
      "Cross-platform iOS and Android apps",
      "Companion apps for existing web products",
      "Authentication and secure session handling",
      "Offline-aware data and synchronisation",
      "Push notifications and deep linking",
      "App store submission support",
      "Over-the-air update configuration",
    ],
    process: [
      { title: "Validate the need", description: "We check whether a mobile app, a responsive web app or a progressive web app is the right investment before committing." },
      { title: "Reuse what exists", description: "APIs, design tokens and business logic from your web product are shared wherever practical." },
      { title: "Build with Expo", description: "Development builds go to your device early so feedback comes from real usage." },
      { title: "Prepare for the stores", description: "Icons, screenshots, privacy details and review requirements are handled before submission." },
    ],
    technologies: ["React Native", "Expo", "TypeScript", "Supabase", "EAS Build", "React Navigation"],
    faqs: [
      {
        question: "Should I build a mobile app or a responsive website?",
        answer:
          "If your users mainly need information or occasional transactions, a well-built responsive website or progressive web app is usually enough. A native app makes sense when you need push notifications, offline use, device hardware or a persistent presence on the home screen. We help you decide honestly.",
      },
      {
        question: "Do you build fully native Swift or Kotlin apps?",
        answer:
          "Our focus is cross-platform development with React Native and Expo. If a project genuinely needs a fully native implementation we will say so and can help you plan for it.",
      },
      {
        question: "How much mobile experience does the studio have?",
        answer:
          "Our core strength is production web applications. Mobile work builds on the same React, TypeScript and backend skills, and we scope mobile projects conservatively and transparently rather than over-promising.",
      },
    ],
    relatedWork: [],
    relatedInsights: ["before-building-a-mobile-app", "planning-a-software-mvp"],
  },
  {
    slug: "ai-solutions",
    tagline: "Assistants, document processing and AI features",
    name: "AI-powered applications",
    index: "04",
    headline: "AI features that solve a specific problem inside your product.",
    summary:
      "AI integrations, document processing, knowledge assistants and custom AI-enabled software built on current language models with sensible guardrails.",
    intro:
      "The useful part of AI is rarely a chatbot bolted onto a homepage. It is the search that understands your documents, the form that reads an invoice, the assistant that answers from your own knowledge base. We build AI features into real software, with clear boundaries about what the model decides and what a person confirms.",
    icon: Sparkles,
    outcomes: [
      {
        title: "Features grounded in your data",
        description:
          "Retrieval over your documents and records so answers cite real sources instead of guessing.",
      },
      {
        title: "Less manual processing",
        description:
          "Extract structured data from documents, emails and forms, then route it into your existing systems.",
      },
      {
        title: "Transparent behaviour",
        description:
          "Confidence indicators, source links and review steps so users understand and can correct the output.",
      },
      {
        title: "Controlled cost",
        description:
          "Model selection, caching and prompt design chosen with running costs in mind from the start.",
      },
    ],
    deliverables: [
      "AI integrations in web and mobile applications",
      "Knowledge assistants over internal documents",
      "Document and form data extraction",
      "Search and recommendation features",
      "Content generation and summarisation tools",
      "Evaluation sets to measure output quality",
      "Usage monitoring and cost controls",
    ],
    process: [
      { title: "Find the real use case", description: "We look for repetitive, text-heavy or judgement-light tasks where a model adds obvious value." },
      { title: "Prototype quickly", description: "A thin prototype with real data shows whether the idea works before investing in polish." },
      { title: "Evaluate honestly", description: "We build a small test set and measure accuracy, not vibes, before shipping to users." },
      { title: "Ship with guardrails", description: "Human review where the stakes are high, logging for every call and clear fallbacks when the model is unsure." },
    ],
    technologies: ["Claude and other LLM APIs", "Vercel AI SDK", "Next.js", "TypeScript", "Vector search", "Supabase"],
    faqs: [
      {
        question: "Which AI models do you use?",
        answer:
          "We choose per project. Current large language models from providers such as Anthropic and others are accessed through their APIs, and we design the integration so the model can be swapped as the landscape changes.",
      },
      {
        question: "Is my data used to train models?",
        answer:
          "We use API providers whose terms exclude customer data from training, and we keep sensitive data out of prompts where it is not needed. We will walk you through exactly what is sent and where.",
      },
      {
        question: "Can AI features be accurate enough for business use?",
        answer:
          "Often, yes, when the task is well-defined and the output is grounded in your own data. We measure accuracy on a test set before launch and add human review for anything with real consequences. We do not promise perfect results.",
      },
    ],
    relatedWork: [],
    relatedInsights: ["finding-ai-automation-opportunities"],
  },
  {
    slug: "ai-automation",
    tagline: "Workflows, integrations and AI agents",
    name: "AI agents & automation",
    index: "05",
    headline: "Automate the work that should never have been manual.",
    summary:
      "Workflow automation, API integrations, task orchestration and AI agents with human oversight and robust error handling.",
    intro:
      "Most businesses run on small, repeated tasks: copying data between tools, chasing approvals, drafting the same emails, reconciling records. We design automations and, where it makes sense, AI agents that take on this work, while keeping people in control of anything that matters.",
    icon: Bot,
    outcomes: [
      {
        title: "Hours returned to your team",
        description:
          "Repetitive, rules-based tasks run on their own so people can focus on judgement and relationships.",
      },
      {
        title: "Systems that talk to each other",
        description:
          "CRM, email, spreadsheets, payment providers and internal tools connected through reliable integrations.",
      },
      {
        title: "Oversight by design",
        description:
          "Approval steps, audit logs and clear notifications so you always know what an automation did and why.",
      },
      {
        title: "Graceful failure",
        description:
          "Retries, alerts and manual fallbacks so a failed step never silently loses a customer or an order.",
      },
    ],
    deliverables: [
      "Business workflow automation",
      "API integrations between your tools",
      "AI agents for triage, drafting and data entry",
      "Scheduled and event-driven task orchestration",
      "Approval and review steps for sensitive actions",
      "Monitoring, logging and alerting",
      "Documentation your team can maintain",
    ],
    process: [
      { title: "Map the workflow", description: "We document each step, who does it, what tools are involved and where it breaks today." },
      { title: "Automate the boring parts first", description: "Deterministic steps are automated with plain code. AI is added only where judgement over text or data is required." },
      { title: "Add oversight", description: "Every action with consequences gets a review step or a reversible path." },
      { title: "Monitor and refine", description: "Logs and alerts show what ran, what failed and what needs attention, so the system improves over time." },
    ],
    technologies: ["TypeScript", "Node.js", "Serverless functions", "Queues and schedulers", "LLM APIs", "Webhooks", "Zapier and Make where appropriate"],
    faqs: [
      {
        question: "What is an AI agent, practically speaking?",
        answer:
          "A program that uses a language model to decide which steps to take toward a goal, such as reading an incoming email, looking up the customer, drafting a reply and asking a person to approve it. We build agents with narrow scopes and explicit permissions.",
      },
      {
        question: "What happens when an automation fails?",
        answer:
          "Failures are expected and planned for. Steps retry where safe, errors raise alerts, and anything that cannot be completed automatically is routed to a person with the context they need.",
      },
      {
        question: "Can you work with tools like Zapier or Make?",
        answer:
          "Yes. For simple integrations those tools are often the fastest route. For complex logic, high volume or sensitive data we write custom code. We recommend whichever is right for the job.",
      },
    ],
    relatedWork: [],
    relatedInsights: ["finding-ai-automation-opportunities"],
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
