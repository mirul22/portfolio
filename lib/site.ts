export const siteConfig = {
  // The live deployment currently redirects the apex domain to www; set NEXT_PUBLIC_SITE_URL to
  // whichever host Vercel treats as primary so canonical URLs match the final URL.
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://amirulikmal.com').replace(/\/$/, ''),
  name: 'Amirul Ikmal',
  legalName: 'Muhammad Amirul Ikmal Bin Mohd Ridzwan',
  title: 'Amirul Ikmal, software engineer in Malaysia',
  description:
    'I am Amirul Ikmal, a software engineer in Malaysia. I co-founded Certava, an ISO compliance platform, work at Vorto, and build Kirabaki and KatalogKu for small sellers.',
  locale: 'en',
  country: 'Malaysia',
  email: 'amirulikmal.biz@gmail.com',
  bookingUrl: 'https://calendly.com/amirulikmal-biz/30min',
  // TODO(owner): add a PDF resume at /public/resume.pdf and set this to '/resume.pdf'.
  resumePdf: undefined as string | undefined,
  sourceUrl: 'https://github.com/mirul22/portfolio',
  socials: [
    { label: 'GitHub', href: 'https://github.com/mirul22', handle: 'mirul22' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/amirulikmal/', handle: 'amirulikmal' },
  ],
} as const;

export function absoluteUrl(path = '/'): string {
  return `${siteConfig.url}${path === '/' ? '' : path}`;
}
