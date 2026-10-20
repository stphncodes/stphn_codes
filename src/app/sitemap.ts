import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";
import { services } from "@/data/services";
import { projects } from "@/data/projects";
import { articles } from "@/data/articles";

const lastModified = new Date("2026-10-20");

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), lastModified, changeFrequency: "monthly", priority: 1 },
    { url: absoluteUrl("/services"), lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: absoluteUrl("/work"), lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: absoluteUrl("/about"), lastModified, changeFrequency: "yearly", priority: 0.7 },
    { url: absoluteUrl("/process"), lastModified, changeFrequency: "yearly", priority: 0.7 },
    { url: absoluteUrl("/insights"), lastModified, changeFrequency: "weekly", priority: 0.8 },
    { url: absoluteUrl("/contact"), lastModified, changeFrequency: "yearly", priority: 0.6 },
    { url: absoluteUrl("/start-project"), lastModified, changeFrequency: "yearly", priority: 0.8 },
    { url: absoluteUrl("/privacy"), lastModified, changeFrequency: "yearly", priority: 0.2 },
    { url: absoluteUrl("/terms"), lastModified, changeFrequency: "yearly", priority: 0.2 },
  ];

  return [
    ...staticRoutes,
    ...services.map((s) => ({ url: absoluteUrl(`/services/${s.slug}`), lastModified, changeFrequency: "monthly" as const, priority: 0.8 })),
    ...projects.map((p) => ({ url: absoluteUrl(`/work/${p.slug}`), lastModified, changeFrequency: "yearly" as const, priority: 0.7 })),
    ...articles.map((a) => ({ url: absoluteUrl(`/insights/${a.slug}`), lastModified: new Date(a.publishedAt), changeFrequency: "yearly" as const, priority: 0.6 })),
  ];
}
