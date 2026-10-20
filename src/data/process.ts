export interface ProcessStep {
  number: string;
  title: string;
  summary: string;
  detail: string;
  outputs: string[];
}

export const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Discovery",
    summary: "Understand the business problem before touching a design tool or an editor.",
    detail:
      "We start with a conversation about what you are trying to achieve, who the product is for, what already exists and what constraints apply. If there is an existing codebase, we read it. If there are workflows, we map them.",
    outputs: ["Written problem statement", "Scope and assumptions", "Rough effort and cost range"],
  },
  {
    number: "02",
    title: "Planning",
    summary: "Turn the problem into a clear scope, a sensible architecture and a realistic timeline.",
    detail:
      "We decide what to build first, what can wait and what should not be built at all. Technology choices are made on fit, not fashion, and we write them down so everyone knows why.",
    outputs: ["Feature list with priorities", "Architecture and stack decisions", "Milestone plan"],
  },
  {
    number: "03",
    title: "Design",
    summary: "Design interfaces around real tasks, with structure before decoration.",
    detail:
      "Layouts, content hierarchy and interaction patterns are worked out in the open. For smaller projects we design directly in code; for larger ones we produce wireframes and visual designs for review first.",
    outputs: ["Wireframes or design files", "Component inventory", "Content structure"],
  },
  {
    number: "04",
    title: "Development",
    summary: "Build in short, visible increments with maintainable, typed code.",
    detail:
      "Work lands on a preview URL you can open at any time. We use TypeScript, version control and reusable components as a matter of course, and keep secrets, configuration and data handling tidy from day one.",
    outputs: ["Preview deployments", "Source code in your repository", "Progress notes each milestone"],
  },
  {
    number: "05",
    title: "Testing & launch",
    summary: "Check behaviour, performance and accessibility, then ship deliberately.",
    detail:
      "Before launch we test on real devices, review loading performance, verify forms and integrations, and prepare metadata and analytics. Launch day has a checklist, not guesswork.",
    outputs: ["Launch checklist", "Production deployment", "Handover documentation"],
  },
  {
    number: "06",
    title: "Ongoing improvement",
    summary: "Software is never finished. We stay available for iteration and support.",
    detail:
      "After launch we can monitor, maintain and extend the product. Improvements are driven by how people actually use it rather than by a backlog written before anyone had seen it.",
    outputs: ["Maintenance and support options", "Iteration roadmap", "Dependency and security updates"],
  },
];
