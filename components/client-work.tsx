import { clientStack, clientWork } from '@/content/client-work';

import { Badge } from './ui';

/** Full list grouped by client, used on /work. */
export function ClientWorkFull() {
  return (
    <div className="grid gap-5">
      {clientWork.map((client) => (
        <section
          key={client.id}
          aria-labelledby={`client-${client.id}`}
          className="reveal rounded-2xl border border-border bg-surface p-6"
        >
          <h3 id={`client-${client.id}`} className="text-lg font-semibold">
            {client.name}
          </h3>
          {client.description && <p className="text-sm text-muted">{client.description}</p>}
          <ul className="mt-4 divide-y divide-border">
            {client.projects.map((p) => (
              <li
                key={p.name}
                className="flex flex-col gap-2 py-3 first:pt-0 last:pb-0 sm:flex-row sm:justify-between sm:gap-6"
              >
                <div>
                  <p className="font-medium">{p.name}</p>
                  <p className="text-sm text-muted">
                    {p.scope}
                    {p.duration && ` ${p.duration}.`}
                  </p>
                </div>
                <ul className="flex shrink-0 flex-wrap gap-1.5 sm:max-w-[45%] sm:justify-end" aria-label="Stack">
                  {p.stack.map((s) => (
                    <li key={s}>
                      <Badge>{s}</Badge>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}

/** One card per client, used on the home and about pages. */
export function ClientWorkCompact({ headingLevel = 'h3' }: { headingLevel?: 'h3' | 'h4' }) {
  const Heading = headingLevel;
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {clientWork.map((client) => (
        <li key={client.id} className="reveal flex flex-col rounded-2xl border border-border bg-surface p-5">
          <Heading className="font-semibold">{client.name}</Heading>
          {client.description && <p className="text-sm text-muted">{client.description}</p>}
          <p className="mt-3 text-sm text-pretty">{client.projects.map((p) => p.name).join(', ')}</p>
          <p className="mt-auto pt-3 font-mono text-xs text-muted">{clientStack(client).join(' · ')}</p>
        </li>
      ))}
    </ul>
  );
}
