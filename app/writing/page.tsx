import { Rss } from '@/components/icons';
import { PostList } from '@/components/post-list';
import { Container, PageHeader } from '@/components/ui';
import { notFound } from 'next/navigation';

import { publishedPosts } from '@/content/writing/posts';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Writing',
  description: 'Posts by Amirul Ikmal about building Certava, Kirabaki and KatalogKu.',
  path: '/writing',
});

export default function WritingPage() {
  if (publishedPosts.length === 0) notFound();
  return (
    <>
      <PageHeader
        eyebrow="Writing"
        title="Writing"
        description="Posts about building Certava, Kirabaki and KatalogKu."
      />
      <Container className="py-16 sm:py-20">
        <h2 className="sr-only">Posts</h2>
        <PostList posts={publishedPosts} headingLevel="h3" />
        <p className="mt-8 text-sm text-muted">
          <a href="/writing/rss.xml" className="inline-flex min-h-11 items-center gap-2 hover:text-fg">
            <Rss className="size-4" />
            Subscribe via RSS
          </a>
        </p>
      </Container>
    </>
  );
}
