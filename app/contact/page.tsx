import { Calendar, Github, Linkedin, Mail } from '@/components/icons';
import { Container, PageHeader } from '@/components/ui';
import { about } from '@/lib/portfolioData';
import { pageMetadata } from '@/lib/seo';
import { siteConfig } from '@/lib/site';

export const metadata = pageMetadata({
  title: 'Contact',
  description: 'Email Amirul Ikmal or book a 30-minute call. Open to full-time and contract work, remote.',
  path: '/contact',
});

const [github, linkedin] = siteConfig.socials;

const channels = [
  {
    title: 'Book a call',
    description: '30 minutes on Calendly, for a role, a contract or a product idea.',
    href: siteConfig.bookingUrl,
    cta: 'Pick a time',
    icon: Calendar,
    external: true,
  },
  {
    title: 'Email',
    description: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
    cta: 'Send an email',
    icon: Mail,
    external: false,
  },
  ...(linkedin
    ? [
        {
          title: 'LinkedIn',
          description: `in/${linkedin.handle}`,
          href: linkedin.href,
          cta: 'Connect',
          icon: Linkedin,
          external: true,
        },
      ]
    : []),
  ...(github
    ? [
        {
          title: 'GitHub',
          description: `@${github.handle}`,
          href: github.href,
          cta: 'View code',
          icon: Github,
          external: true,
        },
      ]
    : []),
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Get in touch"
        description={`${about.availability}. I am based in ${about.location}. Email is the quickest way to reach me.`}
      />
      <Container className="py-16 sm:py-20">
        <h2 className="sr-only">Ways to reach me</h2>
        <ul className="grid gap-5 sm:grid-cols-2">
          {channels.map((c) => {
            const Icon = c.icon;
            return (
              <li key={c.title}>
                <a
                  href={c.href}
                  {...(c.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="group flex h-full flex-col rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-accent/60"
                >
                  <Icon className="size-6 text-accent" />
                  <span className="mt-4 text-xl font-semibold">{c.title}</span>
                  <span className="mt-1 [overflow-wrap:anywhere] text-muted">{c.description}</span>
                  <span className="mt-4 text-sm font-medium text-accent group-hover:underline">
                    {c.cta}
                    {c.external && <span className="sr-only"> (opens in a new tab)</span>}
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </Container>
    </>
  );
}
