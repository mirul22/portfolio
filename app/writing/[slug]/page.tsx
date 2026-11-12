import type { ComponentType } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { ArrowRight } from '@/components/icons';
import { JsonLd } from '@/components/json-ld';
import { formatDate } from '@/components/post-list';
import { Badge, Container } from '@/components/ui';
import { getPost, posts } from '@/content/writing/posts';
import { breadcrumbJsonLd, graph, pageMetadata } from '@/lib/seo';
import { absoluteUrl, siteConfig } from '@/lib/site';

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return pageMetadata({
    title: post.title,
    description: post.description,
    path: `/writing/${post.slug}`,
    type: 'article',
    noindex: post.draft,
  });
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const { default: Content } = (await import(`@/content/writing/${post.slug}.mdx`)) as { default: ComponentType };

  return (
    <article>
      <header className="border-b border-border glow">
        <Container className="max-w-3xl pt-12 pb-10 sm:pt-20">
          <Link href="/writing" className="inline-flex min-h-11 items-center gap-1.5 text-sm text-muted hover:text-fg">
            <ArrowRight className="size-4 rotate-180" />
            All writing
          </Link>
          <div className="mt-6 flex flex-wrap items-center gap-2 text-sm text-muted">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            {post.draft && <Badge>Draft outline</Badge>}
            {post.tags.map((t) => (
              <Badge key={t}>{t}</Badge>
            ))}
          </div>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-balance sm:text-5xl">{post.title}</h1>
          <p className="mt-4 text-lg text-pretty text-muted">{post.description}</p>
        </Container>
      </header>
      <Container className="max-w-3xl py-12">
        <div className="prose">
          <Content />
        </div>
      </Container>
      <JsonLd
        data={graph(
          {
            '@type': 'BlogPosting',
            headline: post.title,
            description: post.description,
            datePublished: post.date,
            url: absoluteUrl(`/writing/${post.slug}`),
            author: { '@type': 'Person', '@id': `${siteConfig.url}/#person`, name: siteConfig.name },
            keywords: post.tags.join(', '),
          },
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Writing', path: '/writing' },
            { name: post.title, path: `/writing/${post.slug}` },
          ])
        )}
      />
    </article>
  );
}
