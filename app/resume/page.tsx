import { Download } from '@/components/icons';
import { PrintButton } from '@/components/print-button';
import { Container, ExternalLink } from '@/components/ui';
import { clientStack, clientWork } from '@/content/client-work';
import { about, certifications, education, experience, skillGroups } from '@/lib/portfolioData';
import { pageMetadata } from '@/lib/seo';
import { siteConfig } from '@/lib/site';
import { caseStudies } from '@/lib/work';

export const metadata = pageMetadata({
  title: 'Resume',
  description:
    'Resume of Amirul Ikmal, a software engineer in Malaysia since 2017 and Technical Co-Founder of Certava.',
  path: '/resume',
});

export default function ResumePage() {
  return (
    <Container className="max-w-3xl py-12 sm:py-16 print:max-w-none print:px-0 print:py-0">
      <div className="mb-10 flex flex-col gap-4 rounded-2xl border border-border bg-surface p-5 sm:flex-row sm:items-center sm:justify-between print:hidden">
        <p className="text-sm text-muted">The same resume as an A4 PDF.</p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <a
            href={siteConfig.resumePdf.href}
            download={siteConfig.resumePdf.filename}
            type="application/pdf"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-accent px-5 text-sm font-medium text-accent-fg transition-colors hover:bg-accent-strong motion-reduce:transition-none"
          >
            <Download className="size-4" />
            Download resume (PDF)
          </a>
          <PrintButton />
        </div>
      </div>

      <header className="border-b border-border pb-6">
        <h1 className="text-4xl font-semibold tracking-tight">{siteConfig.name}</h1>
        <p className="mt-1 text-sm text-muted">{siteConfig.legalName}</p>
        <p className="mt-3 text-lg">Software engineer building LLM products. Technical Co-Founder of Certava.</p>
        <p className="mt-2 text-sm text-muted">
          {about.location} · {about.availability} ·{' '}
          <a href={`mailto:${siteConfig.email}`} className="underline-offset-4 hover:underline">
            {siteConfig.email}
          </a>{' '}
          ·{' '}
          <a href={siteConfig.url} className="underline-offset-4 hover:underline">
            {siteConfig.url.replace(/^https?:\/\//, '')}
          </a>
        </p>
      </header>

      <section aria-labelledby="r-summary" className="py-6">
        <h2 id="r-summary" className="text-sm font-semibold tracking-widest text-accent uppercase">
          Summary
        </h2>
        <p className="mt-3 text-muted">{about.bio[0]}</p>
      </section>

      <section aria-labelledby="r-skills" className="border-t border-border py-6">
        <h2 id="r-skills" className="text-sm font-semibold tracking-widest text-accent uppercase">
          Skills
        </h2>
        <dl className="mt-3 space-y-2 text-sm">
          {skillGroups.map((g) => (
            <div key={g.title}>
              <dt className="font-medium">{g.title}</dt>
              <dd className="text-muted">{g.items.join('; ')}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section aria-labelledby="r-products" className="border-t border-border py-6">
        <h2 id="r-products" className="text-sm font-semibold tracking-widest text-accent uppercase">
          Products
        </h2>
        <ul className="mt-3 space-y-3">
          {caseStudies.map((c) => (
            <li key={c.slug}>
              <p className="font-medium">
                {c.name}: {c.tagline}{' '}
                <span className="text-sm font-normal text-muted">
                  · <ExternalLink href={c.url}>{c.url.replace(/^https?:\/\//, '')}</ExternalLink>
                </span>
              </p>
              <p className="text-sm text-muted">{c.outcome}</p>
              {c.impact && <p className="text-sm text-muted">{c.impact}</p>}
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="r-exp" className="border-t border-border py-6">
        <h2 id="r-exp" className="text-sm font-semibold tracking-widest text-accent uppercase">
          Experience
        </h2>
        <ul className="mt-3 space-y-5">
          {experience.map((e) => (
            <li key={`${e.company}-${e.date}`} className="break-inside-avoid">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:gap-4">
                <p className="font-medium">
                  {e.title}, {e.company}
                  {e.type ? ` (${e.type})` : ''}
                </p>
                <p className="shrink-0 font-mono text-sm text-muted">{e.date}</p>
              </div>
              {e.bullets && (
                <ul className="mt-1 list-disc space-y-1 pl-5 text-sm text-muted">
                  {e.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="r-clients" className="border-t border-border py-6">
        <h2 id="r-clients" className="text-sm font-semibold tracking-widest text-accent uppercase">
          Earlier client work
        </h2>
        <p className="mt-3 text-sm text-muted">Shipped with previous employers before Vorto.</p>
        <ul className="mt-3 space-y-3">
          {clientWork.map((c) => (
            <li key={c.id} className="break-inside-avoid text-sm">
              <p className="font-medium">
                {c.name}
                <span className="font-normal text-muted"> ({clientStack(c).join(', ')})</span>
              </p>
              <p className="text-muted">{c.projects.map((p) => p.name).join('; ')}</p>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="r-edu" className="border-t border-border py-6">
        <h2 id="r-edu" className="text-sm font-semibold tracking-widest text-accent uppercase">
          Education & certifications
        </h2>
        <ul className="mt-3 space-y-2 text-sm">
          {education.map((e) => (
            <li key={e.school}>
              <span className="font-medium">{e.school}</span>, {e.degree} ({e.date}
              {e.grade && `, CGPA ${e.grade}`})
            </li>
          ))}
        </ul>
        <ul className="mt-3 space-y-1 text-sm text-muted">
          {certifications.map((c) => (
            <li key={c.title}>
              {c.title}, {c.issuer}, {c.date}
            </li>
          ))}
        </ul>
      </section>
    </Container>
  );
}
