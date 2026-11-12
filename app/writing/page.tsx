import { Rss } from '@/components/icons';
import { PostList } from '@/components/post-list';
import { Container, PageHeader } from '@/components/ui';
import { posts } from '@/content/writing/posts';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Writing',
  description:
    'Notes by Amirul Ikmal on building AI products, WhatsApp automation for small businesses, and shipping SaaS.',
  path: '/writing',
});

export default function WritingPage() {
  return (
    <>
      <PageHeader
        eyebrow="Writing"
        title="Notes from building."
        description="Lessons from shipping AI SaaS and WhatsApp-first tools. The first posts are being written now."
      />
      <Container className="py-16 sm:py-20">
        <h2 className="sr-only">Posts</h2>
        <PostList posts={posts} headingLevel="h3" />
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
