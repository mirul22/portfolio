import Link from 'next/link';
import type { ComponentProps, ReactNode } from 'react';

import { ArrowUpRight } from './icons';

export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

export function Container({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn('mx-auto w-full max-w-6xl px-5 sm:px-8', className)}>{children}</div>;
}

export function Section({
  id,
  eyebrow,
  title,
  description,
  action,
  children,
  className,
}: {
  id: string;
  eyebrow?: string;
  title: string;
  description?: ReactNode;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={cn('py-16 sm:py-24', className)}>
      <Container>
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            {eyebrow && <p className="mb-3 font-mono text-xs tracking-widest text-accent uppercase">{eyebrow}</p>}
            <h2 id={`${id}-title`} className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              {title}
            </h2>
            {description && <p className="mt-4 text-lg text-pretty text-muted">{description}</p>}
          </div>
          {action}
        </div>
        {children}
      </Container>
    </section>
  );
}

const buttonBase =
  'inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 text-sm font-medium transition-colors duration-200 motion-reduce:transition-none';

const buttonVariants = {
  primary: 'bg-accent text-accent-fg hover:bg-accent-strong',
  secondary: 'border border-border bg-surface text-fg hover:border-muted',
  ghost: 'text-fg hover:bg-surface-2',
} as const;

type ButtonVariant = keyof typeof buttonVariants;

export function ButtonLink({
  href,
  variant = 'primary',
  className,
  children,
  external,
  ...rest
}: {
  href: string;
  variant?: ButtonVariant;
  className?: string;
  children: ReactNode;
  external?: boolean;
} & Omit<ComponentProps<'a'>, 'href'>) {
  const classes = cn(buttonBase, buttonVariants[variant], className);
  if (external) {
    return (
      <a href={href} className={classes} target="_blank" rel="noopener noreferrer" {...rest}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={classes} {...rest}>
      {children}
    </Link>
  );
}

export function ExternalLink({
  href,
  children,
  className,
  showIcon = true,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  showIcon?: boolean;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'inline-flex items-center gap-1 font-medium text-accent underline-offset-4 hover:underline',
        className
      )}
    >
      {children}
      {showIcon && <ArrowUpRight className="size-3.5 print:hidden" />}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}

export function Badge({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border border-border bg-surface-2 px-2.5 py-0.5 font-mono text-xs text-muted',
        className
      )}
    >
      {children}
    </span>
  );
}

export function Card({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn('rounded-2xl border border-border bg-surface p-6', className)}>{children}</div>;
}

export function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: ReactNode;
}) {
  return (
    <header className="border-b border-border">
      <Container className="pt-16 pb-12 sm:pt-24 sm:pb-16">
        {eyebrow && <p className="mb-4 font-mono text-xs tracking-widest text-accent uppercase">{eyebrow}</p>}
        <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl">{title}</h1>
        {description && <p className="mt-5 max-w-2xl text-lg text-pretty text-muted">{description}</p>}
      </Container>
    </header>
  );
}
