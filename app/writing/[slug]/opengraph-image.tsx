import { getPost, publishedPosts } from '@/content/writing/posts';
import { ogContentType, ogSize, renderOg } from '@/lib/og';

export const alt = 'Post by Amirul Ikmal';
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return publishedPosts.map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  return renderOg({ eyebrow: 'Writing', title: post?.title ?? 'Writing', subtitle: post?.tags.join(' · ') });
}
