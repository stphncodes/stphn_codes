import { Plus } from "lucide-react";

interface FaqProps {
  items: { question: string; answer: string }[];
}

/** Native <details> accordion: keyboard accessible with zero client JavaScript. */
export function Faq({ items }: FaqProps) {
  return (
    <div className="divide-y divide-ink-700 border-y border-ink-700 [.surface-light_&]:divide-bone-200 [.surface-light_&]:border-bone-200">
      {items.map((item) => (
        <details key={item.question} className="group">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-left text-base font-medium text-bone-50 marker:hidden [&::-webkit-details-marker]:hidden sm:text-lg [.surface-light_&]:text-ink-900">
            {item.question}
            <Plus
              aria-hidden="true"
              className="size-5 shrink-0 text-ink-400 transition-transform duration-300 ease-out-expo group-open:rotate-45"
            />
          </summary>
          <p className="pb-6 pr-10 text-pretty leading-relaxed text-ink-300 [.surface-light_&]:text-ink-500">
            {item.answer}
          </p>
        </details>
      ))}
    </div>
  );
}
