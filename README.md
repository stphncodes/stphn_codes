# StphnCodes Studio — website

Marketing site for StphnCodes Studio, a software development and AI agency. Built with Next.js (App Router), TypeScript, Tailwind CSS v4, Lucide icons and Motion.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run start      # serve the production build
npm run lint       # ESLint
npx tsc --noEmit   # type check
```

Node 20+ is required.

## Environment variables

Copy `.env.example` to `.env.local` and fill in what you need. Everything is optional for local development.

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Public URL of the deployed site. Drives canonical URLs, Open Graph tags, `sitemap.xml` and `robots.txt`. Falls back to `http://localhost:3000`. |
| `INQUIRY_TO_EMAIL` | Inbox that receives form submissions. Defaults to `stphncodes@gmail.com`. |
| `RESEND_API_KEY` | When set, form submissions are emailed through [Resend](https://resend.com). |
| `INQUIRY_FROM_EMAIL` | Sender address for Resend. Must use a domain verified in Resend. |
| `INQUIRY_WEBHOOK_URL` | Alternative to Resend: POST the submission as JSON to any webhook (Zapier, Make, n8n, your own endpoint). Used only when `RESEND_API_KEY` is unset. |

### How form delivery works

Both the contact form and the project inquiry form post to `src/app/api/inquiry/route.ts`. That route is the single integration boundary:

1. Validates the payload with `validateInquiry` from `src/lib/inquiry.ts` (the same function the client uses).
2. If `RESEND_API_KEY` is set, sends an email via Resend's REST API.
3. Otherwise, if `INQUIRY_WEBHOOK_URL` is set, forwards the JSON to the webhook.
4. Otherwise responds with `{ delivered: false, reason: "not_configured" }`.

In the last case the form tells the visitor that automatic delivery is not set up and offers a prefilled `mailto:` draft. The site never claims a message was delivered when it was not.

## Project structure

```
src/
  app/                  Routes (App Router). Each folder is a page; [slug] folders are static-param routes.
    api/inquiry/        Form delivery route handler
    opengraph-image.tsx Default Open Graph image (generated)
    sitemap.ts          XML sitemap
    robots.ts           robots.txt
  components/
    layout/             Header (nav, services menu, mobile drawer) and Footer
    ui/                 Buttons, headings, sections, FAQ, tags, page hero, logo…
    home/               Homepage sections and the hero visual
    services/           Service cards and per-service glyphs
    work/               Project cards and CSS interface mockups
    insights/           Article cards and body renderer
    forms/              Inquiry form and field components
    motion/             Reveal animations (respect prefers-reduced-motion)
  data/
    services.ts         Five services: copy, outcomes, deliverables, FAQs, related links
    projects.ts         Three case studies
    articles.ts         Insight articles as structured blocks
    process.ts          Six-stage process
    navigation.ts       Nav and footer link lists
  lib/
    site.ts             Site config: name, tagline, URL, email, social links
    seo.ts              Metadata builder and JSON-LD helpers
    inquiry.ts          Form types, validation and mailto fallback
    utils.ts            cn() and date formatting
```

## Updating content

- **Services**: edit `src/data/services.ts`. Adding a slug automatically adds the route, nav entry, footer link and sitemap entry.
- **Case studies**: edit `src/data/projects.ts`. Each project has a `mockup` block that selects one of three CSS compositions (`platform`, `marketplace`, `editorial`) and an accent colour. To use real screenshots, add images under `public/work/` and render them in `ProjectMockup` (or swap the component for `next/image`).
- **Articles**: edit `src/data/articles.ts`. Bodies are arrays of typed blocks (`p`, `h2`, `h3`, `ul`, `ol`, `quote`, `table`), rendered by `ArticleBody`.
- **Contact details and social links**: `src/lib/site.ts`. The social URLs there are placeholders based on the studio handle and should be verified before launch.
- **Design tokens**: colours, fonts, easing and keyframes live in `src/app/globals.css` under `@theme`.

## Light and dark themes

The site is dark by default with a light theme behind the sun/moon toggle in the header.

- The theme is an attribute on `<html>` (`data-theme="dark" | "light"`). `src/lib/theme.ts` holds the storage key, the default and the inline script that applies the saved choice before first paint, so there is no flash on reload.
- `src/components/ui/ThemeToggle.tsx` reads that attribute, flips it and saves the choice to `localStorage`.
- The light palette is defined in `src/app/globals.css` under `:root[data-theme="light"]`. It remaps the same `--color-ink-*`, `--color-bone-*` and `--color-ember-*` variables, so every existing utility class flips consistently and sections that are light-on-dark become dark-on-light. Add new colours there in both blocks.
- To follow the operating system preference instead of defaulting to dark, change `DEFAULT_THEME` logic in `src/lib/theme.ts` to read `matchMedia("(prefers-color-scheme: light)")`.

## Deploying

The site is a standard Next.js app and deploys to Vercel without configuration:

```bash
npx vercel          # preview
npx vercel --prod   # production
```

Set `NEXT_PUBLIC_SITE_URL` to the production domain and configure one of the form delivery options above in the Vercel project's environment variables. Any host that supports Next.js 16 (Node.js runtime) will also work.
