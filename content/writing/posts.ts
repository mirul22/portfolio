export interface PostMeta {
  slug: string;
  title: string;
  description: string;
  /** ISO date (YYYY-MM-DD). */
  date: string;
  tags: string[];
  /** Drafts are not rendered anywhere: no page, no listing, no sitemap or RSS entry. */
  draft: boolean;
}

// TODO(owner): finish these outlines, set real publish dates and flip `draft` to false.
export const posts: PostMeta[] = [
  {
    slug: 'malay-whatsapp-bookkeeping-bot',
    title: 'Building a Malay WhatsApp bookkeeping bot for small sellers',
    description:
      'Outline: why Kirabaki lives inside WhatsApp, how it understands everyday Malay, and what small sellers taught me.',
    date: '2026-11-12',
    tags: ['Kirabaki', 'WhatsApp', 'SME'],
    draft: true,
  },
  {
    slug: 'shipping-an-ai-compliance-platform',
    title: 'Shipping an AI compliance platform as a technical co-founder',
    description:
      'Outline: building Certava’s AI workflows for gap analysis, SOPs and risk registers, and turning LLM output into audit-ready documents.',
    date: '2026-11-12',
    tags: ['Certava', 'AI', 'LLM'],
    draft: true,
  },
];

export const publishedPosts = posts.filter((p) => !p.draft);

export function getPost(slug: string): PostMeta | undefined {
  return publishedPosts.find((p) => p.slug === slug);
}
