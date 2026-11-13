import Link from 'next/link';

import type { PostMeta } from '@/content/writing/posts';

import { ArrowRight } from './icons';

export function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

export function PostList({ posts, headingLevel = 'h3' }: { posts: PostMeta[]; headingLevel?: 'h2' | 'h3' }) {
  const Heading = headingLevel;
  return (
    <ul className="divide-y divide-border rounded-2xl border border-border bg-surface">
      {posts.map((post) => (
        <li key={post.slug} className="group relative p-6 transition-colors hover:bg-surface-2 sm:p-8">
          <div className="flex flex-wrap items-center gap-2 text-sm text-muted">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
          </div>
          <Heading className="mt-2 text-xl font-semibold tracking-tight">
            <Link href={`/writing/${post.slug}`} className="after:absolute after:inset-0">
              {post.title}
            </Link>
          </Heading>
          <p className="mt-2 text-pretty text-muted">{post.description}</p>
          <ArrowRight
            aria-hidden="true"
            className="absolute top-8 right-6 hidden size-5 text-muted transition-transform group-hover:translate-x-1 group-hover:text-accent motion-reduce:transition-none sm:block"
          />
        </li>
      ))}
    </ul>
  );
}
