export type ArticleBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "quote"; text: string }
  | { type: "table"; head: string[]; rows: string[][] };

export interface Article {
  slug: string;
  title: string;
  description: string;
  category: string;
  publishedAt: string;
  readingMinutes: number;
  /** Service slugs to link from the article footer. */
  relatedServices: string[];
  body: ArticleBlock[];
}

export const articles: Article[] = [
  {
    slug: "website-or-web-application",
    title: "Business website or custom web application? How to choose",
    description:
      "The two are often confused and priced very differently. Here is a practical way to decide which one your business actually needs, and when it needs both.",
    category: "Strategy",
    publishedAt: "2026-09-14",
    readingMinutes: 7,
    relatedServices: ["web-development", "web-applications"],
    body: [
      {
        type: "p",
        text: "Clients frequently ask for \"a website\" when they need an application, or ask for \"a platform\" when a well-built website would do. The difference matters because the two are planned, built and priced differently, and choosing wrong wastes months.",
      },
      { type: "h2", text: "The practical distinction" },
      {
        type: "p",
        text: "A website presents information and persuades: it explains what you do, shows proof, and asks visitors to take a next step such as calling, booking or buying. A web application lets people do work: they log in, create and manage records, collaborate, pay, or process something over time.",
      },
      {
        type: "p",
        text: "The technical consequences follow from that. Websites can be largely static, cached aggressively and served from a CDN. Applications need authentication, a database, permission rules, forms with validation, and ongoing maintenance as data and users accumulate.",
      },
      { type: "h2", text: "Five questions to ask" },
      {
        type: "ol",
        items: [
          "Do visitors need an account? If the answer is no, you are probably describing a website.",
          "Does the content change per person? Personal dashboards, order histories and saved items point to an application.",
          "Does anyone on your team need to manage records day to day? Inventory, bookings and members usually mean an admin panel, which is an application.",
          "Is the goal to inform and convert, or to operate? Marketing goals favour a website; operations favour an application.",
          "What happens if it goes down for an hour? If the business keeps running, a website is enough. If work stops, you are relying on an application and need to plan for reliability.",
        ],
      },
      { type: "h2", text: "When you need both" },
      {
        type: "p",
        text: "Many businesses end up with a public website and an application behind a login. A pre-owned vehicle marketplace, for example, has a public listing site for buyers and an admin application for the team managing inventory. The two can share a design system and a codebase while being planned as separate products with different priorities.",
      },
      {
        type: "p",
        text: "The common mistake is to start with the application because it feels more ambitious, then neglect the public-facing site that actually brings in customers. The usual better order is: website first, with a minimal admin tool if content needs regular updates, then an application once there is demand to justify it.",
      },
      { type: "h2", text: "Cost and timeline expectations" },
      {
        type: "table",
        head: ["", "Business website", "Web application"],
        rows: [
          ["Typical timeline", "Weeks", "Months, delivered in milestones"],
          ["Main cost driver", "Design and content", "Data model, auth, workflows and testing"],
          ["Ongoing needs", "Content updates, occasional changes", "Maintenance, monitoring, feature iteration"],
          ["Technical foundation", "Static or server-rendered pages", "Database, API, authentication, permissions"],
        ],
      },
      { type: "h2", text: "A simple rule" },
      {
        type: "quote",
        text: "If nobody logs in, build a website. If your team's work would stop without it, build an application. If you are not sure, build the website first and let demand make the case for more.",
      },
      {
        type: "p",
        text: "If you want a second opinion on your own situation, describe what you are trying to achieve and we will tell you honestly which one you need.",
      },
    ],
  },
  {
    slug: "finding-ai-automation-opportunities",
    title: "How to identify AI automation opportunities that are actually useful",
    description:
      "Most businesses have a handful of tasks where AI automation pays off quickly, and many more where it does not. A method for telling them apart before spending money.",
    category: "AI & automation",
    publishedAt: "2026-08-26",
    readingMinutes: 8,
    relatedServices: ["ai-automation", "ai-solutions"],
    body: [
      {
        type: "p",
        text: "The pressure to \"do something with AI\" leads many businesses to start with the technology and search for a problem. The approach that works is the reverse: start with the work people already do, and look for the specific pieces that a model handles well.",
      },
      { type: "h2", text: "What language models are good at" },
      {
        type: "p",
        text: "Current models are reliable at reading and writing text, extracting structured information from unstructured input, classifying and routing, summarising, and drafting first versions of routine communication. They are unreliable at arithmetic without tools, at tasks requiring up-to-date facts they were not given, and at anything where a confident wrong answer is costly.",
      },
      { type: "h2", text: "A four-step audit" },
      { type: "h3", text: "1. List repetitive tasks that involve text" },
      {
        type: "p",
        text: "Ask each team member which tasks they do weekly that involve reading, writing or copying information: answering similar emails, entering data from documents, categorising requests, writing summaries for someone else. Write them down with a rough time cost.",
      },
      { type: "h3", text: "2. Score each task on three criteria" },
      {
        type: "ul",
        items: [
          "Volume: How often does it happen? Ten times a day is interesting; once a month rarely justifies automation.",
          "Clarity: Can you describe the correct output precisely? If two people would disagree about what \"done\" looks like, a model will too.",
          "Cost of error: What happens if the output is wrong and nobody catches it? Low-stakes tasks can run unattended; high-stakes ones need a review step.",
        ],
      },
      { type: "h3", text: "3. Separate deterministic steps from judgement steps" },
      {
        type: "p",
        text: "Much of what looks like an \"AI\" opportunity is really a plain integration problem. Copying a form submission into a CRM needs an API call, not a model. Reserve the model for the steps that genuinely require reading or judgement over text, and automate everything else with ordinary code. This keeps costs down and behaviour predictable.",
      },
      { type: "h3", text: "4. Prototype with real examples" },
      {
        type: "p",
        text: "Collect twenty to fifty real examples of the task with the correct answer. Run a prototype against them and measure how often it is right. This takes days, not months, and tells you whether to proceed far better than any demo.",
      },
      { type: "h2", text: "Patterns that usually pay off" },
      {
        type: "ul",
        items: [
          "Triage: reading incoming messages and routing them to the right person or queue with a suggested priority.",
          "Extraction: pulling fields from invoices, CVs, applications or receipts into a structured record for review.",
          "Drafting: preparing first-draft replies, quotes or summaries that a person edits and sends.",
          "Knowledge retrieval: answering staff or customer questions from your own documents, with sources shown.",
        ],
      },
      { type: "h2", text: "Patterns that usually disappoint" },
      {
        type: "ul",
        items: [
          "A general chatbot on the homepage with no connection to your actual data or systems.",
          "Fully autonomous actions with financial or legal consequences and no review step.",
          "Automating a process that is broken. Automation makes a bad process faster, not better.",
        ],
      },
      { type: "h2", text: "Keeping people in control" },
      {
        type: "p",
        text: "Every automation we build has an answer to three questions: what happens when the model is unsure, how does a person see what the system did, and how is a mistake undone. Approval steps, audit logs and reversible actions are not overhead; they are what make the system trustworthy enough to rely on.",
      },
      {
        type: "p",
        text: "If you would like help running this audit on your own operations, we offer it as the first step of any automation engagement.",
      },
    ],
  },
  {
    slug: "before-building-a-mobile-app",
    title: "What to consider before building a mobile application",
    description:
      "Mobile apps are expensive to build and even more expensive to neglect. Questions to answer before committing, and the alternatives that are often good enough.",
    category: "Mobile",
    publishedAt: "2026-07-30",
    readingMinutes: 6,
    relatedServices: ["mobile-apps", "web-applications"],
    body: [
      {
        type: "p",
        text: "\"We need an app\" is one of the most common requests we hear, and one of the ones we most often talk clients out of, at least initially. A mobile app can be the right choice. It is rarely the right first choice.",
      },
      { type: "h2", text: "Do you need an app, or a good mobile experience?" },
      {
        type: "p",
        text: "Most users of most businesses need to find information, make a booking or a purchase, and occasionally check on something. A responsive website or web application does all of that on a phone without an install, an app store listing or a second codebase to maintain.",
      },
      {
        type: "p",
        text: "A native or cross-platform app earns its cost when you need push notifications, offline use, device hardware such as the camera or location in the background, or when the product is used daily and deserves a place on the home screen.",
      },
      { type: "h2", text: "Questions to answer first" },
      {
        type: "ol",
        items: [
          "What will people do in the app more than once a week? If you cannot name it, start with the web.",
          "Which device capabilities are essential rather than nice to have?",
          "Do you already have an API and authentication the app can use, or does the backend need to be built too?",
          "Who will handle app store accounts, review cycles, privacy declarations and release management?",
          "What is the plan for the app a year after launch, when operating systems and dependencies have moved on?",
        ],
      },
      { type: "h2", text: "The middle ground: progressive web apps" },
      {
        type: "p",
        text: "A progressive web app is a website that can be installed on the home screen, work partially offline and, on some platforms, send notifications. For many businesses it covers the most-wanted \"app\" behaviours without a separate codebase. It is worth evaluating before committing to native development.",
      },
      { type: "h2", text: "If you do build: cross-platform first" },
      {
        type: "p",
        text: "React Native with Expo lets one codebase target iOS and Android and share logic with a React web application. For a business whose web product already exists, this is usually the most economical route. Fully native development in Swift and Kotlin makes sense for performance-critical or platform-specific products, but it doubles the surface area to maintain.",
      },
      { type: "h2", text: "Budget for the life of the app, not the launch" },
      {
        type: "p",
        text: "An app that is not updated breaks. Operating system releases, store policy changes and dependency updates all require ongoing work. Plan for regular maintenance from the start and make sure the team or partner building the app will still be there to do it.",
      },
      {
        type: "p",
        text: "We are happy to help you work through these questions, including telling you if a mobile app is not the right investment yet.",
      },
    ],
  },
  {
    slug: "planning-a-software-mvp",
    title: "How to plan a software MVP that proves something",
    description:
      "A minimum viable product is a test, not a smaller version of the final product. How to define the test, cut scope honestly and build something you can learn from.",
    category: "Product",
    publishedAt: "2026-06-18",
    readingMinutes: 7,
    relatedServices: ["web-applications", "mobile-apps"],
    body: [
      {
        type: "p",
        text: "The word \"MVP\" is used to describe everything from a landing page to a six-month build. The useful definition is narrower: the smallest thing you can put in front of real users to learn whether your idea holds up.",
      },
      { type: "h2", text: "Start with the question, not the features" },
      {
        type: "p",
        text: "Write down the one thing you most need to find out. Will people pay for this? Will they come back? Can we deliver the service at this price? The MVP exists to answer that question, and every feature either serves the answer or is cut.",
      },
      { type: "h2", text: "Cutting scope honestly" },
      {
        type: "p",
        text: "Make three lists. First, what the product must do for the test to be meaningful. Second, what would be nice but can be handled manually behind the scenes for now. Third, what is explicitly out of scope for this version. Most first drafts put far too much in the first list.",
      },
      {
        type: "ul",
        items: [
          "Replace automation with manual work where volume is low. A founder processing orders by hand for a month is cheaper than building an order pipeline for a product nobody has bought yet.",
          "Use proven building blocks for auth, payments and email rather than custom implementations.",
          "Build one platform. If you are not sure whether web or mobile matters more, start with web; it is faster to iterate and does not need store approval.",
        ],
      },
      { type: "h2", text: "Choose a foundation you will not have to throw away" },
      {
        type: "p",
        text: "\"MVP\" should not mean \"disposable\". A clean data model, typed code and a sensible folder structure cost little extra at the start and save a rewrite if the idea works. The things to defer are polish and breadth, not basic engineering discipline.",
      },
      { type: "h2", text: "Define what you will measure" },
      {
        type: "p",
        text: "Before launch, decide what numbers would tell you the test passed or failed: sign-ups that complete a key action, repeat usage within a week, conversion from trial to paid. Instrument those from day one. An MVP without measurement is just a small product.",
      },
      { type: "h2", text: "A realistic timeline" },
      {
        type: "p",
        text: "A well-scoped MVP for a web product is typically a matter of weeks, delivered in milestones you can see on a preview URL. If a plan stretches to many months before anyone outside the team uses it, the scope is too large for a test.",
      },
      {
        type: "p",
        text: "If you are planning an MVP and want help defining the test and the scope, that conversation is where our engagements usually begin.",
      },
    ],
  },
];

export function getArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

export const sortedArticles = [...articles].sort(
  (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
);
