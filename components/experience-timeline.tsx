import type { ExperienceItem } from '@/lib/portfolioData';

import { ExternalLink } from './ui';

export function ExperienceTimeline({ items, showBullets = true }: { items: ExperienceItem[]; showBullets?: boolean }) {
  return (
    <ol className="relative border-l border-border">
      {items.map((item) => (
        <li key={`${item.company}-${item.date}`} className="reveal relative pb-10 pl-6 last:pb-0 sm:pl-8">
          <span
            aria-hidden="true"
            className="absolute top-1.5 -left-[5px] size-2.5 rounded-full bg-accent ring-4 ring-bg"
          />
          <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
            <h3 className="text-lg font-semibold">
              {item.title}
              <span className="text-muted">
                {' · '}
                {item.companyUrl ? <ExternalLink href={item.companyUrl}>{item.company}</ExternalLink> : item.company}
              </span>
            </h3>
            <p className="shrink-0 font-mono text-sm text-muted">{item.date}</p>
          </div>
          {(item.type || item.place) && (
            <p className="mt-1 text-sm text-muted">{[item.type, item.place].filter(Boolean).join(' · ')}</p>
          )}
          {showBullets && item.bullets && (
            <ul className="mt-3 list-disc space-y-1.5 pl-5 text-muted marker:text-border">
              {item.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ol>
  );
}
