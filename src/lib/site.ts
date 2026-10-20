/**
 * Single source of truth for site-wide configuration.
 * The production URL is read from NEXT_PUBLIC_SITE_URL so the app never
 * assumes a domain has been purchased.
 */
export const siteConfig = {
  name: "StphnCodes Studio",
  shortName: "StphnCodes",
  tagline: "From Code to Intelligence.",
  description:
    "StphnCodes Studio is a software development and AI agency building high-performing websites, web and mobile applications, AI-powered products and business automation for companies in Nigeria and internationally.",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, ""),
  email: "stphncodes@gmail.com",
  location: "Nigeria · working with clients worldwide",
  founder: {
    name: "Stephen James",
    role: "Founder & Software Engineer",
  },
  social: [
    { label: "GitHub", href: "https://github.com/stphncodes" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/stphncodes" },
    { label: "X", href: "https://x.com/stphncodes" },
  ],
} as const;

export function absoluteUrl(path = "/"): string {
  return `${siteConfig.url}${path.startsWith("/") ? path : `/${path}`}`;
}
