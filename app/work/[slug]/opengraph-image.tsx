import { ogContentType, ogSize, renderOg } from '@/lib/og';
import { caseStudies, getCaseStudy } from '@/lib/work';

export const alt = 'Amirul Ikmal case study';
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  return renderOg({
    eyebrow: 'Case study',
    title: study ? `${study.name}: ${study.tagline}` : 'Case study',
    subtitle: study?.outcome,
  });
}
