import type { Metadata } from 'next';
import Link from 'next/link';

import { FinalCta } from '@/components/cta';
import { ClientWorkCompact } from '@/components/client-work';
import { ExperienceTimeline } from '@/components/experience-timeline';
import { ArrowRight, Calendar, FileText } from '@/components/icons';
import { PostList } from '@/components/post-list';
import { Testimonials } from '@/components/testimonials';
import { ButtonLink, Card, Container, Section } from '@/components/ui';
import { WorkCard } from '@/components/work-card';
import { publishedPosts } from '@/content/writing/posts';
import { about, experience, services } from '@/lib/portfolioData';
import { rssAlternate } from '@/lib/seo';
import { siteConfig } from '@/lib/site';
import { caseStudies } from '@/lib/work';

export const metadata: Metadata = {
  title: { absolute: siteConfig.title },
  alternates: { canonical: '/', types: rssAlternate },
};

// Only numbers that can be traced to lib/portfolioData.ts, lib/work.ts and content/client-work.ts.
const proof = [
  // 17 client projects before Vorto (content/client-work.ts) + Certava, Kirabaki, KatalogKu + the Vorto platform = 21.
  {
    value: '20+',
    label: 'Projects shipped, 3 of them my own',
    detail: 'Government and corporate systems, plus Certava, Kirabaki and KatalogKu',
  },
  // github.com/Amirul-Vorto contribution graph incl. private: 686 (2024, from ~June) + 1,050 (2025) + 423 (2026 to Nov) = 2,159.
  { value: '2,100+', label: 'Code contributions at Vorto since 2024', detail: 'From my work GitHub account' },
  { value: '2017', label: 'Writing software since', detail: 'First job: the VIBES system for JHEV' },
];

export default function HomePage() {
  const [certava, kirabaki, katalogku] = caseStudies;
  return (
    <>
      <section aria-labelledby="hero-title" className="border-b border-border">
        <Container className="pt-20 pb-16 sm:pt-28 sm:pb-24">
          <Link
            href="/work/certava"
            className="inline-flex min-h-9 items-center gap-2 rounded-full border border-border bg-surface px-3 text-sm text-muted transition-colors hover:text-fg"
          >
            Technical Co-Founder at Certava
            <ArrowRight className="size-3.5" />
          </Link>
          <h1
            id="hero-title"
            className="mt-6 max-w-3xl text-[2.5rem] leading-[1.05] font-semibold tracking-tight text-balance sm:text-6xl"
          >
            Hi, I&apos;m Amirul. I&apos;m a software engineer in Malaysia.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-pretty text-muted sm:text-xl">
            I co-founded <strong className="font-medium text-fg">Certava</strong>, an AI platform for ISO compliance,
            and I work as a software engineer at <strong className="font-medium text-fg">Vorto</strong>. In my own time
            I build <strong className="font-medium text-fg">Kirabaki</strong>, a WhatsApp bot that uses an LLM to record
            sales from Malay messages, receipt photos and voice notes, and{' '}
            <strong className="font-medium text-fg">KatalogKu</strong>, a free online catalog that sends orders to
            WhatsApp.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/work">
              See my work
              <ArrowRight className="size-4" />
            </ButtonLink>
            <ButtonLink href={siteConfig.bookingUrl} external variant="secondary">
              <Calendar className="size-4" />
              Book a call
              <span className="sr-only"> (opens Calendly in a new tab)</span>
            </ButtonLink>
            <ButtonLink href="/resume" variant="ghost">
              <FileText className="size-4" />
              Resume
            </ButtonLink>
          </div>
          <p className="mt-8 text-sm text-muted">
            Based in {about.location}. {about.availability}.
          </p>
        </Container>
      </section>

      <section aria-label="In numbers" className="border-b border-border">
        <Container className="py-10">
          <dl className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-3">
            {proof.map((item) => (
              <div key={item.label} className="flex flex-col bg-bg p-5 sm:p-6">
                <dt className="order-2 mt-1 text-sm font-medium">{item.label}</dt>
                <dd className="order-1 text-3xl font-semibold tracking-tight text-accent sm:text-4xl">{item.value}</dd>
                <dd className="order-3 mt-1 text-sm text-muted">{item.detail}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      <Section
        id="work"
        eyebrow="Work"
        title="What I am building"
        description="Certava is the company I co-founded. Kirabaki and KatalogKu are my products for small sellers in Malaysia."
        action={
          <Link
            href="/work"
            className="inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-accent hover:underline"
          >
            All work <ArrowRight className="size-4" />
          </Link>
        }
      >
        {certava && kirabaki && katalogku && (
          <div className="grid gap-5 md:grid-cols-3 md:grid-rows-2">
            <WorkCard study={certava} size="lg" />
            <WorkCard study={kirabaki} />
            <WorkCard study={katalogku} />
          </div>
        )}
      </Section>

      <Section id="services" eyebrow="What I do" title="The kind of work I take on" className="border-t border-border">
        <ul className="grid gap-5 sm:grid-cols-2">
          {services.map((s) => (
            <li key={s.title} className="reveal">
              <Card className="h-full">
                <h3 className="text-xl font-semibold tracking-tight">{s.title}</h3>
                <p className="mt-2 text-pretty text-muted">{s.description}</p>
              </Card>
            </li>
          ))}
        </ul>
      </Section>

      <Section
        id="experience"
        eyebrow="Experience"
        title="Recent roles"
        className="border-t border-border"
        action={
          <Link
            href="/about#experience"
            className="inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-accent hover:underline"
          >
            Full history <ArrowRight className="size-4" />
          </Link>
        }
      >
        <div className="max-w-3xl">
          <ExperienceTimeline items={experience.slice(0, 4)} showBullets={false} />
        </div>
      </Section>

      <Section
        id="client-work"
        eyebrow="Before Vorto"
        title="Earlier client work"
        description="Systems I built with previous employers for government agencies in Malaysia and Myanmar, and for a corporate travel client."
        className="border-t border-border"
        action={
          <Link
            href="/work#client-work"
            className="inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-accent hover:underline"
          >
            Project details <ArrowRight className="size-4" />
          </Link>
        }
      >
        <ClientWorkCompact />
      </Section>

      {publishedPosts.length > 0 && (
        <Section
          id="writing"
          eyebrow="Writing"
          title="Latest posts"
          className="border-t border-border"
          action={
            <Link
              href="/writing"
              className="inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-accent hover:underline"
            >
              All posts <ArrowRight className="size-4" />
            </Link>
          }
        >
          <PostList posts={publishedPosts.slice(0, 3)} />
        </Section>
      )}

      <Testimonials />

      <FinalCta />
    </>
  );
}
