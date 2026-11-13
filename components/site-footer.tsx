import Link from 'next/link';

import { publishedPosts } from '@/content/writing/posts';
import { siteConfig } from '@/lib/site';

import { Github, Linkedin, Mail, Rss } from './icons';
import { Container } from './ui';

const hasWriting = publishedPosts.length > 0;

const footerLinks = [
  { href: '/work', label: 'Work' },
  { href: '/about', label: 'About' },
  ...(hasWriting ? [{ href: '/writing', label: 'Writing' }] : []),
  { href: '/contact', label: 'Contact' },
  { href: '/resume', label: 'Resume' },
];

export function SiteFooter() {
  const [github, linkedin] = siteConfig.socials;
  return (
    <footer className="border-t border-border print:hidden">
      <Container className="flex flex-col gap-8 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-semibold">{siteConfig.name}</p>
          <p className="mt-1 text-sm text-muted">Software engineer in {siteConfig.country}. Co-founder of Certava.</p>
        </div>
        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
            {footerLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="inline-flex min-h-11 items-center text-muted hover:text-fg sm:min-h-0">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <ul className="flex items-center gap-1" aria-label="Social links">
          <li>
            <a
              href={`mailto:${siteConfig.email}`}
              className="inline-flex size-11 items-center justify-center rounded-full text-muted hover:bg-surface-2 hover:text-fg"
            >
              <Mail className="size-5" />
              <span className="sr-only">Email</span>
            </a>
          </li>
          {github && (
            <li>
              <a
                href={github.href}
                target="_blank"
                rel="noopener noreferrer me"
                className="inline-flex size-11 items-center justify-center rounded-full text-muted hover:bg-surface-2 hover:text-fg"
              >
                <Github className="size-5" />
                <span className="sr-only">GitHub (opens in a new tab)</span>
              </a>
            </li>
          )}
          {linkedin && (
            <li>
              <a
                href={linkedin.href}
                target="_blank"
                rel="noopener noreferrer me"
                className="inline-flex size-11 items-center justify-center rounded-full text-muted hover:bg-surface-2 hover:text-fg"
              >
                <Linkedin className="size-5" />
                <span className="sr-only">LinkedIn (opens in a new tab)</span>
              </a>
            </li>
          )}
          {hasWriting && (
            <li>
              <a
                href="/writing/rss.xml"
                className="inline-flex size-11 items-center justify-center rounded-full text-muted hover:bg-surface-2 hover:text-fg"
              >
                <Rss className="size-5" />
                <span className="sr-only">RSS feed</span>
              </a>
            </li>
          )}
        </ul>
      </Container>
      <Container className="pb-10 text-xs text-muted">
        <p>
          © {new Date().getFullYear()} {siteConfig.legalName}.{' '}
          <a
            href={siteConfig.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="underline-offset-4 hover:underline"
          >
            Source on GitHub
          </a>
          .
        </p>
      </Container>
    </footer>
  );
}
