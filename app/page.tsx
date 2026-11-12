import type { Metadata } from 'next';
import Link from 'next/link';

import { FinalCta } from '@/components/cta';
import { ExperienceTimeline } from '@/components/experience-timeline';
import { ArrowRight, Calendar, FileText } from '@/components/icons';
import { PostList } from '@/components/post-list';
import { ButtonLink, Card, Container, Placeholder, Section } from '@/components/ui';
import { WorkCard } from '@/components/work-card';
import { posts } from '@/content/writing/posts';
import { about, experience, services } from '@/lib/portfolioData';
import { rssAlternate } from '@/lib/seo';
import { siteConfig } from '@/lib/site';
import { caseStudies } from '@/lib/work';

export const metadata: Metadata = {
  title: { absolute: siteConfig.title },
  alternates: { canonical: '/', types: rssAlternate },
};

const proof = [
  { value: '3', label: 'Live products', detail: 'Certava, Kirabaki, KatalogKu' },
  { value: '70+', label: 'Production features', detail: 'Shipped at Vorto for a real-time logistics SaaS' },
  { value: '2017', label: 'Shipping software since', detail: 'Government, SaaS, startups, own products' },
];

export default function HomePage() {
  const [certava, kirabaki, katalogku] = caseStudies;
  return (
    <>
      <section aria-labelledby="hero-title" className="relative overflow-hidden border-b border-border">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 grid-bg" />
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 glow" />
        <Container className="relative pt-20 pb-16 sm:pt-28 sm:pb-24">
          <Link
            href="/work/certava"
            className="inline-flex min-h-9 items-center gap-2 rounded-full border border-border bg-surface/80 px-3 text-sm text-muted transition-colors hover:text-fg"
          >
            <span aria-hidden="true" className="size-2 rounded-full bg-accent" />
            Technical Co-Founder at Certava
            <ArrowRight className="size-3.5" />
          </Link>
          <h1
            id="hero-title"
            className="mt-6 max-w-4xl text-[2.5rem] leading-[1.05] font-semibold tracking-tight text-balance sm:text-6xl lg:text-7xl"
          >
            Hi, I&apos;m Amirul. <span className="text-accent">I build AI products that ship.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-pretty text-muted sm:text-xl">
            Technical Co-Founder of <strong className="font-medium text-fg">Certava</strong>, an AI compliance platform,
            and software engineer at <strong className="font-medium text-fg">Vorto</strong>. I also build{' '}
            <strong className="font-medium text-fg">Kirabaki</strong> and{' '}
            <strong className="font-medium text-fg">KatalogKu</strong>, WhatsApp-first tools for Malaysian small
            sellers.
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
            {about.location} · {about.availability}
          </p>
        </Container>
      </section>

      <section aria-label="Proof" className="border-b border-border">
        <Container className="py-10">
          <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border lg:grid-cols-4">
            {proof.map((item) => (
              <div key={item.label} className="flex flex-col bg-bg p-5 sm:p-6">
                <dt className="order-2 mt-1 text-sm font-medium">{item.label}</dt>
                <dd className="order-1 text-3xl font-semibold tracking-tight text-accent sm:text-4xl">{item.value}</dd>
                <dd className="order-3 mt-1 text-sm text-muted">{item.detail}</dd>
              </div>
            ))}
            {/* TODO(owner): replace with a real, verifiable metric (e.g. sellers using Kirabaki/KatalogKu). */}
            <div data-todo="owner" className="flex flex-col bg-bg p-5 sm:p-6">
              <dt className="order-2 mt-1 text-sm font-medium">Sellers & users served</dt>
              <dd className="order-1 text-3xl font-semibold tracking-tight text-muted sm:text-4xl">TBA</dd>
              <dd className="order-3 mt-1 text-sm text-muted">Real number coming soon</dd>
            </div>
          </dl>
        </Container>
      </section>

      <Section
        id="work"
        eyebrow="Selected work"
        title="Products I have built and shipped"
        description="One AI SaaS for compliance teams and two WhatsApp-first tools for Malaysian small sellers."
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

      <Section
        id="services"
        eyebrow="What I do"
        title="From LLM prototype to production product"
        className="border-t border-border"
      >
        <ul className="grid gap-5 sm:grid-cols-2">
          {services.map((s, i) => (
            <li key={s.title} className="reveal">
              <Card className="h-full">
                <p aria-hidden="true" className="font-mono text-sm text-accent">
                  0{i + 1}
                </p>
                <h3 className="mt-3 text-xl font-semibold tracking-tight">{s.title}</h3>
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
        id="writing"
        eyebrow="Writing"
        title="Notes from building"
        className="border-t border-border"
        action={
          <Link
            href="/writing"
            className="inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-accent hover:underline"
          >
            All writing <ArrowRight className="size-4" />
          </Link>
        }
      >
        <PostList posts={posts.slice(0, 3)} />
      </Section>

      <Section
        id="testimonials"
        eyebrow="Testimonials"
        title="What people say"
        description="Real quotes from clients and colleagues will appear here."
        className="border-t border-border"
      >
        {/* TODO(owner): replace with real, attributable testimonials (name, role, permission to publish). */}
        <ul className="grid gap-5 md:grid-cols-3">
          {[
            'Testimonial from a client or co-founder',
            'Testimonial from an engineering lead',
            'Testimonial from a seller using Kirabaki or KatalogKu',
          ].map((label) => (
            <li key={label}>
              <Placeholder label={label} hint="Quote, name, role and company to be added." className="h-full" />
            </li>
          ))}
        </ul>
      </Section>

      <FinalCta />
    </>
  );
}
