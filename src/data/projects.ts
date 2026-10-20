export type ProjectSlug = "future-inspired" | "toyota-preowned-vehicles" | "bible-living-manchester";

/** Controls which CSS interface composition is rendered for the project. */
export type MockupVariant = "platform" | "marketplace" | "editorial";

export interface Project {
  slug: ProjectSlug;
  name: string;
  client: string;
  /** Short category label, e.g. "Platform". */
  category: string;
  year: string;
  summary: string;
  liveUrl: string;
  technologies: string[];
  /** Service slugs this project demonstrates. */
  services: string[];
  mockup: {
    variant: MockupVariant;
    /** Accent used in the composed visual. */
    accent: string;
    /** Surface tone for the composed visual. */
    tone: "light" | "dark";
    /** Short text rendered inside the mock browser for context. */
    heading: string;
    sub: string;
  };
  overview: string[];
  need: string[];
  solution: string[];
  contribution: {
    headline: string;
    items: string[];
    collaboration?: string;
  };
  outcome: string[];
}

export const projects: Project[] = [
  {
    slug: "future-inspired",
    name: "Future Inspired",
    client: "Future Inspired",
    category: "Platform",
    year: "2025",
    summary:
      "A platform helping young people gain real-world experience and build a verified Skills Passport, with dashboards, authentication and a database-driven workflow.",
    liveUrl: "https://www.futureinspired.org/",
    technologies: ["Next.js", "Tailwind CSS", "Supabase"],
    services: ["web-applications", "web-development"],
    mockup: {
      variant: "platform",
      accent: "#2f8f6f",
      tone: "light",
      heading: "Skills Passport",
      sub: "Verified experience, one profile",
    },
    overview: [
      "Future Inspired helps young people gain real-world experience and record it in a verified Skills Passport: a profile of skills and experiences that can be shown to employers, educators and programmes.",
      "The platform needed to serve more than one kind of user. Young people manage their own passport, while the organisation needs to review, verify and administer what is recorded. That meant authentication, role-aware dashboards and a data model that could grow.",
    ],
    need: [
      "Experience gained through placements, volunteering and projects is often invisible or unverifiable. Future Inspired wanted a structured way to capture it and give it credibility.",
      "The product had to work well on phones, since many of its users would reach it on mobile, and it had to be straightforward to administer without a dedicated technical team.",
    ],
    solution: [
      "The platform was built with Next.js and the App Router for the application shell, with Tailwind CSS for a consistent, responsive design system across public pages and authenticated dashboards.",
      "Supabase provides PostgreSQL, authentication and storage. Access rules are enforced close to the data so that each user only sees and edits what they are entitled to.",
      "Dashboards were designed around the main tasks for each role: recording experience, reviewing and verifying entries, and keeping a passport up to date.",
    ],
    contribution: {
      headline: "Designed and developed independently by Stephen James.",
      items: [
        "Application architecture with Next.js and TypeScript",
        "Responsive interface and component system in Tailwind CSS",
        "Authentication and session handling with Supabase",
        "Database schema, queries and access rules",
        "User and admin dashboards",
        "Deployment and production configuration",
      ],
    },
    outcome: [
      "The platform is live at futureinspired.org, with authenticated dashboards and a working Skills Passport flow built on a maintainable Next.js and Supabase foundation.",
    ],
  },
  {
    slug: "toyota-preowned-vehicles",
    name: "Toyota Nigeria Pre-Owned Cars",
    client: "Toyota Nigeria Pre-Owned Vehicles",
    category: "Marketplace",
    year: "2025",
    summary:
      "A pre-owned automotive marketplace for vehicles and spare parts, with listing interfaces, an admin panel and database-connected functionality.",
    liveUrl: "https://www.toyotapreownedvehicles.com/",
    technologies: ["React", "TanStack", "Tailwind CSS", "Supabase"],
    services: ["web-applications", "web-development"],
    mockup: {
      variant: "marketplace",
      accent: "#d8341f",
      tone: "dark",
      heading: "Certified pre-owned",
      sub: "Vehicles and genuine parts",
    },
    overview: [
      "A marketplace for pre-owned Toyota vehicles and spare parts in Nigeria. Buyers browse and filter listings; the business manages inventory, enquiries and content through an admin panel.",
      "The project was delivered in collaboration with another developer. Stephen's work centred on the frontend interfaces, the admin panel, the landing page and the functionality connected to the database.",
    ],
    need: [
      "Buying a used vehicle involves a lot of comparison. Listings needed clear specifications, strong imagery and filtering that works quickly on a phone.",
      "Inventory changes constantly. The team needed an admin panel that made adding, editing and removing vehicles and parts a routine task rather than a developer request.",
    ],
    solution: [
      "The frontend is a React application with TanStack for routing and data handling, giving fast client-side navigation between listings and detail pages, with Tailwind CSS for the responsive layout.",
      "Supabase stores vehicles, parts and related records, and powers the admin panel's create, update and delete operations.",
      "The landing page was designed to move visitors into the listings quickly, with featured inventory and clear paths for both vehicles and spare parts.",
    ],
    contribution: {
      headline: "Delivered in collaboration with another developer.",
      items: [
        "Frontend interfaces for listings and detail views",
        "Admin panel for managing vehicles and spare parts",
        "Landing page design and implementation",
        "Database-connected functionality with Supabase",
        "Responsive layout and component work in Tailwind CSS",
      ],
      collaboration:
        "Stephen worked alongside a second developer on this project. The contributions listed are his; other parts of the system were built collaboratively or by his collaborator.",
    },
    outcome: [
      "The marketplace is live at toyotapreownedvehicles.com with browseable vehicle and parts listings and an admin panel for day-to-day inventory management.",
    ],
  },
  {
    slug: "bible-living-manchester",
    name: "Bible Living Manchester",
    client: "Bible Living Manchester",
    category: "Website",
    year: "2025",
    summary:
      "A community website independently designed and developed from implementation through deployment, with responsive layouts and email functionality.",
    liveUrl: "https://www.biblelivingmanchester.org/",
    technologies: ["Vite.js", "Tailwind CSS", "Resend"],
    services: ["web-development"],
    mockup: {
      variant: "editorial",
      accent: "#b8862b",
      tone: "light",
      heading: "Welcome home",
      sub: "Gatherings, teaching and community in Manchester",
    },
    overview: [
      "Bible Living Manchester needed a welcoming, easy-to-navigate website for a community in Manchester: information about gatherings, teaching and how to get in touch.",
      "The site was designed and developed end to end by Stephen, from first implementation to production deployment.",
    ],
    need: [
      "Visitors needed to find times, locations and contact details without hunting. The design had to feel warm and personal rather than corporate.",
      "The community needed a dependable way for people to reach them from the site, which meant working contact forms with email delivery rather than a bare mailto link.",
    ],
    solution: [
      "A fast, lightweight site built with Vite.js and Tailwind CSS, with responsive layouts that work on the phones most visitors will use.",
      "Contact and enquiry forms send email through Resend, with validation and clear success and error states so no message is lost silently.",
      "The site was deployed to production with the domain, hosting and email sending configured and documented.",
    ],
    contribution: {
      headline: "Independently designed, developed and deployed by Stephen James.",
      items: [
        "Information architecture and visual design",
        "Responsive implementation with Vite.js and Tailwind CSS",
        "Email functionality with Resend",
        "Form validation and submission states",
        "Production deployment and domain setup",
      ],
    },
    outcome: [
      "The website is live at biblelivingmanchester.org with working email-backed contact functionality and a responsive design across devices.",
    ],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
