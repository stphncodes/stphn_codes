import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Article } from "@/data/articles";
import { formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils";

export function ArticleCard({ article, className }: { article: Article; className?: string }) {
  return (
    <article className={cn("group relative flex h-full flex-col justify-between border-t border-ink-700 pt-6 [.surface-light_&]:border-bone-200", className)}>
      <div>
        <div className="flex items-center gap-3 font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-ink-400 [.surface-light_&]:text-ink-500">
          <span className="text-ember-400 [.surface-light_&]:text-ember-600">{article.category}</span>
          <span aria-hidden="true">·</span>
          <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
        </div>
        <h3 className="font-display mt-4 text-balance text-xl leading-snug text-bone-50 sm:text-2xl [.surface-light_&]:text-ink-900">
          <Link
            href={`/insights/${article.slug}`}
            className="after:absolute after:inset-0 after:content-[''] group-hover:text-ember-300 [.surface-light_&]:group-hover:text-ember-600 transition-colors"
          >
            {article.title}
          </Link>
        </h3>
        <p className="mt-3 text-pretty text-sm leading-relaxed text-ink-300 [.surface-light_&]:text-ink-500">{article.description}</p>
      </div>
      <div className="mt-6 flex items-center justify-between text-xs text-ink-400 [.surface-light_&]:text-ink-500">
        <span>{article.readingMinutes} min read</span>
        <ArrowUpRight
          aria-hidden="true"
          className="size-4 transition-transform duration-300 ease-out-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        />
      </div>
    </article>
  );
}
