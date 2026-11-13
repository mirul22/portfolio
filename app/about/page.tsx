import Image from 'next/image';

import { FinalCta } from '@/components/cta';
import { ExperienceTimeline } from '@/components/experience-timeline';
import { FileText } from '@/components/icons';
import { JsonLd } from '@/components/json-ld';
import { Badge, ButtonLink, Card, Container, PageHeader, Section } from '@/components/ui';
import { about, certifications, education, experience, otherServices, skills } from '@/lib/portfolioData';
import { breadcrumbJsonLd, graph, pageMetadata } from '@/lib/seo';
import { siteConfig } from '@/lib/site';

export const metadata = pageMetadata({
  title: 'About',
  description:
    'About Amirul Ikmal: software engineer in Malaysia since 2017, Technical Co-Founder of Certava, builder of Kirabaki and KatalogKu. Work history, skills and education.',
  path: '/about',
  type: 'profile',
});

const skillGroups = ['Languages', 'Frameworks', 'Data', 'Platform & tools'] as const;

export default function AboutPage() {
  return (
    <>
      <PageHeader eyebrow="About" title="About me" />

      <Container className="grid gap-12 py-16 sm:py-20 lg:grid-cols-[1fr_20rem]">
        <div className="space-y-5 text-lg text-pretty text-muted">
          {about.bio.map((p) => (
            <p key={p}>{p}</p>
          ))}
          <p>
            <span className="font-medium text-fg">What I am learning now:</span> {about.currentlyExploring}
          </p>
          <div className="flex flex-col gap-3 pt-2 sm:flex-row">
            <ButtonLink href="/resume">
              <FileText className="size-4" />
              View resume
            </ButtonLink>
            <ButtonLink href="/contact" variant="secondary">
              Get in touch
            </ButtonLink>
          </div>
        </div>
        <div className="mx-auto w-full max-w-xs lg:mx-0">
          <div className="relative aspect-square overflow-hidden rounded-3xl border border-border">
            <Image
              src="/images/me.jpg"
              alt="Portrait of Amirul Ikmal smiling, wearing glasses and a white shirt."
              fill
              sizes="(min-width: 1024px) 320px, 80vw"
              className="object-cover"
              loading="eager"
            />
          </div>
          <p className="mt-3 text-center text-sm text-muted lg:text-left">
            {siteConfig.legalName} · {about.location}
          </p>
        </div>
      </Container>

      <Section id="experience" eyebrow="Experience" title="Where I have worked" className="border-t border-border">
        <div className="max-w-3xl">
          <ExperienceTimeline items={experience} />
        </div>
      </Section>

      <Section id="skills" eyebrow="Skills" title="What I use" className="border-t border-border">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {skillGroups.map((group) => (
            <Card key={group}>
              <h3 className="font-semibold">{group}</h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {skills
                  .filter((s) => s.group === group)
                  .map((s) => (
                    <li key={s.name}>
                      <Badge>{s.name}</Badge>
                    </li>
                  ))}
              </ul>
            </Card>
          ))}
        </div>
      </Section>

      <Section
        id="also"
        eyebrow="Also"
        title="Other work I take on"
        description="Smaller jobs I still do for clients."
        className="border-t border-border"
      >
        <ul className="grid gap-5 md:grid-cols-3">
          {otherServices.map((s) => (
            <li key={s.title}>
              <Card className="h-full">
                <h3 className="font-semibold">{s.title}</h3>
                <p className="mt-2 text-muted">{s.description}</p>
              </Card>
            </li>
          ))}
        </ul>
      </Section>

      <Section
        id="education"
        eyebrow="Education"
        title="Education and certifications"
        className="border-t border-border"
      >
        <div className="grid gap-10 lg:grid-cols-2">
          <ul className="space-y-5">
            {education.map((e) => (
              <li key={e.school}>
                <Card>
                  <h3 className="font-semibold">{e.school}</h3>
                  <p className="mt-1 text-muted">{e.degree}</p>
                  <p className="mt-2 font-mono text-sm text-muted">
                    {e.date}
                    {e.grade && ` · CGPA ${e.grade}`}
                  </p>
                  {e.activities && <p className="mt-2 text-sm text-muted">{e.activities}</p>}
                </Card>
              </li>
            ))}
          </ul>
          <ul className="divide-y divide-border rounded-2xl border border-border bg-surface">
            {certifications.map((c) => (
              <li
                key={c.title}
                className="flex flex-col gap-1 p-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4"
              >
                <span className="font-medium">{c.title}</span>
                <span className="shrink-0 text-sm text-muted">
                  {c.issuer} · {c.date}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <FinalCta />
      <JsonLd
        data={graph(
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'About', path: '/about' },
          ]),
          { '@type': 'ProfilePage', mainEntity: { '@id': `${siteConfig.url}/#person` } }
        )}
      />
    </>
  );
}
