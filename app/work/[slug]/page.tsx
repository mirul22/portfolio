import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { ReactNode } from 'react';

import { ArchDiagram } from '@/components/arch-diagram';
import { FinalCta } from '@/components/cta';
import { ArrowRight, ArrowUpRight } from '@/components/icons';
import { JsonLd } from '@/components/json-ld';
import { Badge, ButtonLink, Container } from '@/components/ui';
import { breadcrumbJsonLd, graph, pageMetadata, softwareApplicationJsonLd } from '@/lib/seo';
import { type CaseStudy, caseStudies, getCaseStudy } from '@/lib/work';

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return {};
  return pageMetadata({
    title: `${study.name}: ${study.tagline}`,
    description: study.outcome,
    path: `/work/${study.slug}`,
    type: 'article',
  });
}

function Paragraphs({ items }: { items: string[] }) {
  return (
    <div className="space-y-4">
      {items.map((t) => (
        <p key={t} className="text-pretty text-muted">
          {t}
        </p>
      ))}
    </div>
  );
}

function Block({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="reveal scroll-mt-24 border-t border-border py-10 first:border-t-0 first:pt-0"
    >
      <h2 id={`${id}-title`} className="mb-5 text-2xl font-semibold tracking-tight">
        {title}
      </h2>
      {children}
    </section>
  );
}

/** Sections with no real content are left out entirely, including from the table of contents. */
function buildSections(study: CaseStudy): { id: string; title: string; body: ReactNode }[] {
  const sections: { id: string; title: string; body: ReactNode | null }[] = [
    { id: 'problem', title: 'The problem', body: study.problem.length ? <Paragraphs items={study.problem} /> : null },
    {
      id: 'constraints',
      title: 'Constraints',
      body: study.constraints.length ? (
        <ul className="list-disc space-y-2 pl-5 text-muted">
          {study.constraints.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
      ) : null,
    },
    { id: 'role', title: 'My role', body: study.myRole.length ? <Paragraphs items={study.myRole} /> : null },
    {
      id: 'approach',
      title: 'How it works',
      body: study.approach.length ? (
        <>
          <Paragraphs items={study.approach} />
          {study.architecture.length > 1 && (
            <div className="mt-8">
              <ArchDiagram nodes={study.architecture} title={`How ${study.name} fits together`} />
            </div>
          )}
        </>
      ) : null,
    },
    {
      id: 'decisions',
      title: 'Decisions and trade-offs',
      body: study.decisions.length ? (
        <ul className="grid gap-4">
          {study.decisions.map((d) => (
            <li key={d.choice} className="rounded-2xl border border-border bg-surface p-5">
              <p className="font-medium">{d.choice}</p>
              <p className="mt-2 text-sm text-muted">
                <span className="font-medium text-fg">Trade-off: </span>
                {d.tradeoff}
              </p>
            </li>
          ))}
        </ul>
      ) : null,
    },
    {
      id: 'results',
      title: 'Results',
      body: study.results.length ? (
        <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {study.results.map((r) => (
            <li key={r.label} className="rounded-2xl border border-border bg-surface p-5">
              <p className="text-3xl font-semibold text-accent">{r.value}</p>
              <p className="mt-1 text-sm text-muted">{r.label}</p>
            </li>
          ))}
        </ul>
      ) : null,
    },
    { id: 'next', title: 'What is next', body: study.next.length ? <Paragraphs items={study.next} /> : null },
  ];
  return sections.filter((s): s is { id: string; title: string; body: ReactNode } => s.body !== null);
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  const index = caseStudies.findIndex((c) => c.slug === study.slug);
  const nextStudy = caseStudies[(index + 1) % caseStudies.length];
  const host = study.url.replace(/^https?:\/\//, '');
  const sections = buildSections(study);

  const facts: { label: string; value: ReactNode }[] = [
    { label: 'Role', value: study.role },
    ...(study.timeline ? [{ label: 'Timeline', value: study.timeline }] : []),
    { label: 'Status', value: study.status },
    {
      label: 'Website',
      value: (
        <a
          href={study.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-accent hover:underline"
        >
          {host}
          <ArrowUpRight className="size-3.5" />
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      ),
    },
  ];

  return (
    <article>
      <header className="border-b border-border">
        <Container className="pt-12 pb-12 sm:pt-20 sm:pb-16">
          <nav aria-label="Breadcrumb" className="mb-8 text-sm text-muted">
            <ol className="flex items-center gap-2">
              <li>
                <Link href="/work" className="hover:text-fg">
                  Work
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-fg">
                {study.name}
              </li>
            </ol>
          </nav>
          <p className="font-mono text-xs tracking-widest text-accent uppercase">{study.tagline}</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-balance sm:text-6xl">{study.name}</h1>
          <p className="mt-5 max-w-3xl text-xl text-pretty sm:text-2xl">{study.outcome}</p>
          {study.impact && <p className="mt-3 max-w-3xl text-lg text-pretty text-muted">{study.impact}</p>}

          <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-4">
            {facts.map((f) => (
              <div key={f.label}>
                <dt className="text-xs tracking-wider text-muted uppercase">{f.label}</dt>
                <dd className="mt-1 font-medium">{f.value}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-6">
            <p className="text-xs tracking-wider text-muted uppercase">Built with</p>
            <ul className="mt-2 flex flex-wrap gap-2">
              {study.stack.map((s) => (
                <li key={s}>
                  <Badge>{s}</Badge>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={study.url} external>
              Visit {host}
              <ArrowUpRight className="size-4" />
              <span className="sr-only"> (opens in a new tab)</span>
            </ButtonLink>
            <ButtonLink href="/work" variant="secondary">
              All case studies
            </ButtonLink>
          </div>
        </Container>
      </header>

      <Container className="py-12 sm:py-16">
        <figure className="overflow-hidden rounded-2xl border border-border bg-surface">
          <div className="relative aspect-[16/10]">
            <Image
              src={study.screenshot.src}
              alt={study.screenshot.alt}
              fill
              loading="eager"
              fetchPriority="high"
              sizes="(min-width: 1152px) 1088px, 100vw"
              className="object-cover object-top"
            />
          </div>
          <figcaption className="border-t border-border px-5 py-3 text-sm text-muted">
            {study.screenshot.caption}
          </figcaption>
        </figure>
      </Container>

      <Container className="grid gap-12 pb-8 lg:grid-cols-[1fr_16rem]">
        <div className="min-w-0">
          {sections.map((s) => (
            <Block key={s.id} id={s.id} title={s.title}>
              {s.body}
            </Block>
          ))}
        </div>

        <aside className="hidden lg:block">
          <nav aria-label="On this page" className="sticky top-24 text-sm">
            <p className="mb-3 font-mono text-xs tracking-widest text-muted uppercase">On this page</p>
            <ul className="space-y-1 border-l border-border">
              {sections.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="-ml-px block border-l border-transparent py-1 pl-4 text-muted hover:border-accent hover:text-fg"
                  >
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
      </Container>

      {nextStudy && nextStudy.slug !== study.slug && (
        <Container className="pb-4">
          <Link
            href={`/work/${nextStudy.slug}`}
            className="group flex items-center justify-between gap-4 rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-accent/60"
          >
            <span>
              <span className="block text-sm text-muted">Next case study</span>
              <span className="mt-1 block text-xl font-semibold">{nextStudy.name}</span>
              <span className="mt-0.5 block text-muted">{nextStudy.tagline}</span>
            </span>
            <ArrowRight className="size-5 text-accent transition-transform group-hover:translate-x-1 motion-reduce:transition-none" />
          </Link>
        </Container>
      )}

      <FinalCta />
      <JsonLd
        data={graph(
          softwareApplicationJsonLd(study),
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Work', path: '/work' },
            { name: study.name, path: `/work/${study.slug}` },
          ])
        )}
      />
    </article>
  );
}
