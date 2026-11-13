import type { Metadata } from 'next';

import { publishedPosts } from '@/content/writing/posts';

import { absoluteUrl, siteConfig } from './site';
import type { CaseStudy } from './work';

export const rssAlternate =
  publishedPosts.length > 0
    ? { 'application/rss+xml': [{ url: '/writing/rss.xml', title: `${siteConfig.name}: writing` }] }
    : undefined;

export function pageMetadata({
  title,
  description,
  path,
  type = 'website',
  noindex = false,
}: {
  title: string;
  description: string;
  path: string;
  type?: 'website' | 'article' | 'profile';
  noindex?: boolean;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path, types: rssAlternate },
    openGraph: {
      type,
      url: path,
      title,
      description,
      siteName: siteConfig.name,
      locale: 'en_MY',
    },
    twitter: { card: 'summary_large_image', title, description },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
  };
}

const personId = `${siteConfig.url}/#person`;
const websiteId = `${siteConfig.url}/#website`;
const certavaId = 'https://certava.ai/#organization';

export function personJsonLd() {
  return {
    '@type': 'Person',
    '@id': personId,
    name: siteConfig.name,
    alternateName: siteConfig.legalName,
    url: siteConfig.url,
    image: absoluteUrl('/images/me.jpg'),
    email: `mailto:${siteConfig.email}`,
    jobTitle: ['Technical Co-Founder', 'Software Engineer'],
    description:
      'Software engineer in Malaysia who builds LLM products. Technical Co-Founder of Certava, an AI platform for ISO compliance. Builds Kirabaki, an LLM-driven WhatsApp bookkeeping bot, and KatalogKu for small sellers. Before Vorto, built systems for SKMM, JHEV, MARA, Kraftangan and the Myanmar passport and visa system with previous employers.',
    address: { '@type': 'PostalAddress', addressCountry: 'MY' },
    worksFor: [
      { '@type': 'Organization', '@id': certavaId, name: 'Certava', url: 'https://certava.ai' },
      { '@type': 'Organization', name: 'Vorto' },
    ],
    alumniOf: [
      { '@type': 'CollegeOrUniversity', name: 'Asia e University' },
      { '@type': 'CollegeOrUniversity', name: 'Universiti Teknologi MARA' },
    ],
    knowsAbout: [
      'LLM application development',
      'Agentic workflows and tool-calling',
      'Document understanding for ISO compliance',
      'WhatsApp bots',
      'TypeScript',
      'Next.js',
      'Go',
      'PHP',
      'C#',
      'Java',
    ],
    sameAs: siteConfig.socials.map((s) => s.href),
  };
}

export function websiteJsonLd() {
  return {
    '@type': 'WebSite',
    '@id': websiteId,
    url: siteConfig.url,
    name: siteConfig.name,
    description: siteConfig.description,
    inLanguage: 'en',
    author: { '@id': personId },
    publisher: { '@id': personId },
  };
}

export function softwareApplicationJsonLd(c: CaseStudy) {
  return {
    '@type': 'SoftwareApplication',
    '@id': `${c.url}/#software`,
    name: c.name,
    url: c.url,
    description: c.summary,
    applicationCategory: c.appCategory,
    operatingSystem: 'Web',
    inLanguage: c.language,
    audience: { '@type': 'Audience', audienceType: c.audience },
    creator: { '@id': personId },
    ...(c.slug === 'certava' ? { publisher: { '@id': certavaId } } : {}),
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function graph(...nodes: object[]) {
  return { '@context': 'https://schema.org', '@graph': nodes };
}
