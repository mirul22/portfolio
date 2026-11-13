'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useId, useState } from 'react';

import { publishedPosts } from '@/content/writing/posts';

import { Close, Menu } from './icons';
import { cn } from './ui';

const NAV_ITEMS = [
  { href: '/work', label: 'Work' },
  { href: '/about', label: 'About' },
  ...(publishedPosts.length > 0 ? [{ href: '/writing', label: 'Writing' }] : []),
  { href: '/contact', label: 'Contact' },
];

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const menuId = useId();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <>
      <nav aria-label="Primary" className="hidden md:block">
        <ul className="flex items-center gap-1">
          {NAV_ITEMS.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={active ? 'page' : undefined}
                  className={cn(
                    'inline-flex min-h-11 items-center rounded-full px-4 text-sm transition-colors motion-reduce:transition-none',
                    active ? 'bg-surface-2 text-fg' : 'text-muted hover:text-fg'
                  )}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <button
        type="button"
        className="inline-flex size-11 items-center justify-center rounded-full text-fg hover:bg-surface-2 md:hidden"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((v) => !v)}
      >
        {open ? <Close className="size-5" /> : <Menu className="size-5" />}
        <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
      </button>

      <nav
        id={menuId}
        aria-label="Mobile"
        hidden={!open}
        className="absolute inset-x-0 top-full border-b border-border bg-bg md:hidden"
      >
        <ul className="mx-auto flex max-w-6xl flex-col px-5 py-3 sm:px-8">
          {NAV_ITEMS.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={active ? 'page' : undefined}
                  onClick={() => setOpen(false)}
                  className={cn(
                    'flex min-h-12 items-center rounded-lg px-3 text-base',
                    active ? 'bg-surface-2 text-fg' : 'text-muted hover:text-fg'
                  )}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
