import { FinalCta } from '@/components/cta';
import { JsonLd } from '@/components/json-ld';
import { Badge, Card, Container, ExternalLink, PageHeader } from '@/components/ui';
import { WorkCard } from '@/components/work-card';
import { sideProjects } from '@/lib/portfolioData';
import { breadcrumbJsonLd, graph, pageMetadata } from '@/lib/seo';
import { absoluteUrl } from '@/lib/site';
import { caseStudies } from '@/lib/work';

const description =
  'Case studies for Certava, an ISO compliance platform I co-founded, and Kirabaki and KatalogKu, two WhatsApp tools I build for small sellers in Malaysia.';

export const metadata = pageMetadata({ title: 'Work', description, path: '/work' });

export default function WorkPage() {
  return (
    <>
      <PageHeader
        eyebrow="Work"
        title="Products I work on"
        description="For each one: what it does, who uses it, how it is built and the trade-offs behind it."
      />
      <Container className="py-16 sm:py-20">
        <h2 className="sr-only">Case studies</h2>
        <div className="grid gap-5 md:grid-cols-3 md:grid-rows-2">
          {caseStudies.map((study, i) => (
            <WorkCard key={study.slug} study={study} size={i === 0 ? 'lg' : 'md'} eager={i === 0} showOutcome />
          ))}
        </div>

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
          }
        )}
      />
    </>
  );
}
