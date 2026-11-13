import { ClientWorkFull } from '@/components/client-work';
import { FinalCta } from '@/components/cta';
import { JsonLd } from '@/components/json-ld';
import { Badge, Card, Container, ExternalLink, PageHeader } from '@/components/ui';
import { WorkCard } from '@/components/work-card';
import { clientHighlights, clientWork } from '@/content/client-work';
import { sideProjects } from '@/lib/portfolioData';
import { breadcrumbJsonLd, graph, pageMetadata } from '@/lib/seo';
import { absoluteUrl, siteConfig } from '@/lib/site';
import { caseStudies } from '@/lib/work';

const description =
  'Case studies for Certava, Kirabaki and KatalogKu, plus earlier client work for SKMM, JHEV, MARA, Kraftangan and the Myanmar passport and visa system.';

export const metadata = pageMetadata({ title: 'Work', description, path: '/work' });

export default function WorkPage() {
  return (
    <>
      <PageHeader
        eyebrow="Work"
        title="Products I work on"
        description="Case studies for my three products, then the government and corporate systems I shipped as a software engineer before Vorto."
      />
      <Container className="py-16 sm:py-20">
        <h2 className="sr-only">Case studies</h2>
        <div className="grid gap-5 md:grid-cols-3 md:grid-rows-2">
          {caseStudies.map((study, i) => (
            <WorkCard key={study.slug} study={study} size={i === 0 ? 'lg' : 'md'} eager={i === 0} showOutcome />
          ))}
        </div>

        <section id="client-work" aria-labelledby="client-work-title" className="mt-20 scroll-mt-24">
          <h2 id="client-work-title" className="text-2xl font-semibold tracking-tight">
            Earlier client work
          </h2>
          <p className="mt-3 max-w-2xl text-pretty text-muted">
            Before Vorto I worked as a software engineer with previous employers, building systems for government
            agencies in Malaysia and Myanmar and for a corporate travel client.
          </p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {clientHighlights.map((h) => (
              <li key={h}>
                <Badge>{h}</Badge>
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <ClientWorkFull />
          </div>
        </section>

        <h2 className="mt-20 text-2xl font-semibold tracking-tight">More work</h2>
        <ul className="mt-6 grid gap-5 md:grid-cols-2">
          {sideProjects.map((p) => (
            <li key={p.title}>
              <Card className="h-full">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-lg font-semibold">{p.title}</h3>
                  {p.year && <span className="font-mono text-sm text-muted">{p.year}</span>}
                </div>
                <p className="mt-2 text-muted">{p.description}</p>
                <ul className="mt-4 flex flex-wrap gap-2" aria-label="Technologies">
                  {p.technologies.map((t) => (
                    <li key={t}>
                      <Badge>{t}</Badge>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-sm">
                  <ExternalLink href={p.href}>{p.href.replace(/^https?:\/\//, '')}</ExternalLink>
                </p>
              </Card>
            </li>
          ))}
        </ul>
      </Container>
      <FinalCta />
      <JsonLd
        data={graph(
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Work', path: '/work' },
          ]),
          {
            '@type': 'ItemList',
            itemListElement: caseStudies.map((c, i) => ({
              '@type': 'ListItem',
              position: i + 1,
              url: absoluteUrl(`/work/${c.slug}`),
              name: c.name,
            })),
          },
          {
            '@type': 'ItemList',
            name: 'Earlier client work',
            itemListElement: clientWork
              .flatMap((client) => client.projects.map((p) => ({ client, p })))
              .map(({ client, p }, i) => ({
                '@type': 'ListItem',
                position: i + 1,
                item: {
                  '@type': 'CreativeWork',
                  name: p.name,
                  description: `${p.scope} Client: ${client.description ? `${client.name} (${client.description})` : client.name}.`,
                  keywords: p.stack.join(', '),
                  creator: { '@id': `${siteConfig.url}/#person` },
                },
              })),
          }
        )}
      />
    </>
  );
}
