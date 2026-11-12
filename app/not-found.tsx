import type { Metadata } from 'next';
import Link from 'next/link';

import { ButtonLink, Container } from '@/components/ui';
import { caseStudies } from '@/lib/work';

export const metadata: Metadata = {
  title: 'Page not found',
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col justify-center py-20">
      <p className="font-mono text-sm text-accent">404</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">This page didn’t ship.</h1>
      <p className="mt-4 max-w-xl text-lg text-muted">
        The link may be old or mistyped. Here are some places that do exist:
      </p>
      <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
        {caseStudies.map((c) => (
          <li key={c.slug}>
            <Link href={`/work/${c.slug}`} className="inline-flex min-h-11 items-center text-accent hover:underline">
              {c.name}
            </Link>
          </li>
        ))}
        <li>
          <Link href="/writing" className="inline-flex min-h-11 items-center text-accent hover:underline">
            Writing
          </Link>
        </li>
      </ul>
      <div className="mt-8">
        <ButtonLink href="/">Back to home</ButtonLink>
      </div>
    </Container>
  );
}
