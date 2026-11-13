import { testimonials } from '@/content/testimonials';

import { Section } from './ui';

export function Testimonials() {
  if (testimonials.length === 0) return null;

  return (
    <Section
      id="testimonials"
      eyebrow="Recommendations"
      title="What people I have worked with say"
      className="border-t border-border"
    >
      <ul className="grid gap-5 md:grid-cols-2">
        {testimonials.map((t) => (
          <li key={`${t.name}-${t.company}`}>
            <figure className="flex h-full flex-col rounded-2xl border border-border bg-surface p-6">
              <blockquote className="flex-1 text-pretty text-fg">
                <p>“{t.quote}”</p>
              </blockquote>
              <figcaption className="mt-5 text-sm">
                <span className="font-semibold">{t.name}</span>
                <span className="text-muted">
                  , {t.role}, {t.company}
                </span>
                <span className="mt-1 block text-muted">{t.relationship}</span>
                {t.sourceUrl && (
                  <a
                    href={t.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 inline-block text-accent underline-offset-4 hover:underline"
                  >
                    Source
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                )}
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </Section>
  );
}
