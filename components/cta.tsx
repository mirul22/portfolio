import { siteConfig } from '@/lib/site';

import { Calendar, Mail } from './icons';
import { ButtonLink, Container } from './ui';

export function FinalCta({ title = 'Hiring, or have a project in mind?' }: { title?: string }) {
  return (
    <section aria-labelledby="cta-title" className="py-16 sm:py-24">
      <Container>
        <div className="rounded-3xl border border-border bg-surface px-6 py-14 text-center sm:px-12">
          <h2
            id="cta-title"
            className="mx-auto max-w-2xl text-3xl font-semibold tracking-tight text-balance sm:text-4xl"
          >
            {title}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-pretty text-muted">
            I am open to full-time and contract work, remote. Email me, or book a 30-minute call.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <ButtonLink href={`mailto:${siteConfig.email}`}>
              <Mail className="size-4" />
              {siteConfig.email}
            </ButtonLink>
            <ButtonLink href={siteConfig.bookingUrl} external variant="secondary">
              <Calendar className="size-4" />
              Book a call
              <span className="sr-only"> (opens Calendly in a new tab)</span>
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
