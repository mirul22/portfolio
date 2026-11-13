import Link from 'next/link';

import { SiteNav } from './site-nav';
import { ThemeToggle } from './theme-toggle';

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-bg print:hidden">
      <div className="relative mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
        <Link href="/" className="inline-flex min-h-11 items-center font-semibold tracking-tight">
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
