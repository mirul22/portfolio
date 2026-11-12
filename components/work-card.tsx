import Image from 'next/image';
import Link from 'next/link';

import type { CaseStudy } from '@/lib/work';

import { ArrowRight } from './icons';
import { Badge, cn } from './ui';

export function WorkCard({
  study,
  size = 'md',
  headingLevel = 'h3',
  eager = false,
}: {
  study: CaseStudy;
  size?: 'lg' | 'md';
  headingLevel?: 'h2' | 'h3';
  eager?: boolean;
}) {
  const Heading = headingLevel;
  const large = size === 'lg';
  return (
    <article
      className={cn(
        'reveal group relative flex flex-col overflow-hidden rounded-3xl border border-border bg-surface transition-colors duration-300 hover:border-accent/60 motion-reduce:transition-none',
        large && 'md:col-span-2 md:row-span-2'
      )}
    >
      <div className="flex flex-col gap-3 p-6 sm:p-8">
        <div className="flex flex-wrap items-center gap-2">
          <Badge>{study.category}</Badge>
          <Badge>{study.role}</Badge>
        </div>
        <Heading className={cn('font-semibold tracking-tight', large ? 'text-3xl sm:text-4xl' : 'text-2xl')}>
          <Link href={`/work/${study.slug}`} className="after:absolute after:inset-0 focus-visible:outline-none">
            {study.name}
            <span className="text-muted"> — {study.tagline}</span>
          </Link>
        </Heading>
        <p className={cn('text-pretty text-muted', large && 'text-lg')}>{study.outcome}</p>
        <p className="mt-1 inline-flex items-center gap-1.5 text-sm font-medium text-accent">
          Read case study
          <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none" />
        </p>
      </div>
      <div
        className={cn(
          'relative mt-auto px-6 sm:px-8',
          large ? 'aspect-[16/10] md:aspect-auto md:min-h-72 md:flex-1' : 'aspect-[16/9]'
        )}
      >
        <div className="relative size-full overflow-hidden rounded-t-xl border border-b-0 border-border">
          <Image
            src={study.screenshot.src}
            alt={study.screenshot.alt}
            fill
            loading={eager ? 'eager' : 'lazy'}
            sizes={
              large
                ? '(min-width: 1152px) 720px, (min-width: 768px) 66vw, 100vw'
                : '(min-width: 1152px) 360px, (min-width: 768px) 33vw, 100vw'
            }
            className="object-cover object-left-top transition-transform duration-500 group-hover:scale-[1.02] motion-reduce:transition-none"
          />
        </div>
      </div>
      {/* Group-focus ring for the stretched link. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-3xl ring-ring group-has-[a:focus-visible]:ring-2"
      />
    </article>
  );
}
