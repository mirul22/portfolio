import type { MetadataRoute } from 'next';

import { publishedPosts } from '@/content/writing/posts';
import { absoluteUrl } from '@/lib/site';
import { caseStudies } from '@/lib/work';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: { path: string; priority: number }[] = [
    { path: '/', priority: 1 },
    { path: '/work', priority: 0.9 },
    { path: '/about', priority: 0.8 },
    { path: '/writing', priority: 0.7 },
    { path: '/contact', priority: 0.6 },
    { path: '/resume', priority: 0.5 },
  ];

  return [
    ...staticRoutes.map((r) => ({
      url: absoluteUrl(r.path),
      changeFrequency: 'monthly' as const,
      priority: r.priority,
    })),
    ...caseStudies.map((c) => ({
      url: absoluteUrl(`/work/${c.slug}`),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    ...publishedPosts.map((p) => ({ url: absoluteUrl(`/writing/${p.slug}`), lastModified: p.date, priority: 0.6 })),
  ];
}
