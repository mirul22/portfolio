import Link from 'next/link';

import { SiteNav } from './site-nav';
import { ThemeToggle } from './theme-toggle';

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-bg/80 backdrop-blur-md supports-[backdrop-filter]:bg-bg/70 print:hidden">
      <div className="relative mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
        <Link href="/" className="group inline-flex min-h-11 items-center gap-2.5 font-semibold tracking-tight">
          <span
            aria-hidden="true"
            className="inline-flex size-8 items-center justify-center rounded-lg bg-accent font-mono text-sm text-accent-fg"
          >
            AI
          </span>
          <span>Amirul Ikmal</span>
        </Link>
        <div className="flex items-center gap-1">
          <SiteNav />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
