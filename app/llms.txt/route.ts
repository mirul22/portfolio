import { clientWork } from '@/content/client-work';
import { publishedPosts } from '@/content/writing/posts';
import { about, experience, services } from '@/lib/portfolioData';
import { absoluteUrl, siteConfig } from '@/lib/site';
import { caseStudies } from '@/lib/work';

export const dynamic = 'force-static';

export function GET() {
  const lines = [
    `# ${siteConfig.name}`,
    '',
    `> ${siteConfig.description}`,
    '',
    `Full name: ${siteConfig.legalName}. Location: ${about.location}. ${about.availability}.`,
    `Contact: ${siteConfig.email} · Book a call: ${siteConfig.bookingUrl}`,
    `Profiles: ${siteConfig.socials.map((s) => `${s.label} ${s.href}`).join(' · ')}`,
    '',
    '## Products',
    '',
    ...caseStudies.map(
      (c) =>
        `- [${c.name}](${absoluteUrl(`/work/${c.slug}`)}): ${c.tagline}. ${c.outcome} Role: ${c.role}. Website: ${c.url}`
    ),
    '',
    '## Recent roles',
    '',
    ...experience.slice(0, 3).map((e) => `- ${e.title}, ${e.company} (${e.date})`),
    '',
    '## Earlier client work (with previous employers, before Vorto)',
    '',
    ...clientWork.flatMap((c) =>
      c.projects.map(
        (p) =>
          `- ${c.name}${c.description ? ` (${c.description})` : ''}: ${p.name}. ${p.scope}${p.duration ? ` ${p.duration}.` : ''} Stack: ${p.stack.join(', ')}.`
      )
    ),
    `- Details: ${absoluteUrl('/work#client-work')}`,
    '',
    '## What I do',
    '',
    ...services.map((s) => `- ${s.title}: ${s.description}`),
    '',
    '## Pages',
    '',
    `- [Work](${absoluteUrl('/work')}): case studies`,
    `- [About](${absoluteUrl('/about')}): bio, full experience, skills, education`,
    `- [Resume](${absoluteUrl('/resume')}): printable resume`,
    ...(publishedPosts.length
      ? [`- [Writing](${absoluteUrl('/writing')}): posts (RSS: ${absoluteUrl('/writing/rss.xml')})`]
      : []),
    `- [Contact](${absoluteUrl('/contact')})`,
    ...(publishedPosts.length
      ? [
          '',
          '## Writing',
          '',
          ...publishedPosts.map((p) => `- [${p.title}](${absoluteUrl(`/writing/${p.slug}`)}): ${p.description}`),
        ]
      : []),
    '',
  ];

  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
