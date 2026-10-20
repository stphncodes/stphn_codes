import { cn } from "@/lib/utils";

interface TickerProps {
  items: string[];
  className?: string;
  tone?: "dark" | "light";
}

/** Horizontal CSS ticker. Content is duplicated once for a seamless loop; the copy is hidden from AT. */
export function Ticker({ items, className, tone = "dark" }: TickerProps) {
  const row = (ariaHidden: boolean) => (
    <ul
      aria-hidden={ariaHidden || undefined}
      className="flex shrink-0 items-center gap-10 pr-10 font-display text-xl sm:text-2xl"
    >
      {items.map((item, i) => (
        <li key={`${item}-${i}`} className="flex items-center gap-10 whitespace-nowrap">
          <span>{item}</span>
          <span aria-hidden="true" className={cn("size-1.5 rounded-full", tone === "dark" ? "bg-ember-500" : "bg-ember-600")} />
        </li>
      ))}
    </ul>
  );
  return (
    <div
      className={cn(
        "mask-fade-x flex overflow-hidden border-y py-5",
        tone === "dark" ? "border-ink-700 text-bone-50" : "border-bone-200 text-ink-900",
        className,
      )}
    >
      <div className="flex w-max motion-safe:animate-ticker">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
