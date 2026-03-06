import 'styles/index.scss';

import { Layout } from 'components';
import { portfolioData } from 'lib';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { appWithTranslation } from 'next-i18next';
import { DefaultSeo } from 'next-seo';
import { ThemeProvider } from 'next-themes';

import SEO from '../next-seo.config';

const PERSON_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: portfolioData.about.name,
  url: SEO.canonical,
  jobTitle: 'Software Engineer',
  description: portfolioData.about.headline,
  email: portfolioData.about.email,
  address: { '@type': 'PostalAddress', addressCountry: 'MY' },
  sameAs: portfolioData.about.socials.map((s) => s.href),
  worksFor: { '@type': 'Organization', name: 'Vorto' },
};

const keywords = [
  'Amirul',
  'Amirul Ikmal',
  'Muhammad Amirul Ikmal Bin Mohd Ridzwan',
  'Malaysia',
  'Software Developer',
  'Software Engineer',
  'AI Engineer',
  'Fullstack',
  'Go',
  'TypeScript',
  'React',
  'Next.js',
  'AI workflow',
  'LAM',
  'Language-Action Models',
  'automation',
  'SaaS',
  'Vorto',
  'Soskod',
  'Remote',
  'Open to work',
  'UI UX',
  'Web Development',
  'Backend Development',
  'Asia e University',
  'UiTM',
  'experience',
];

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <DefaultSeo {...SEO} />
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="keywords" content={keywords.join(', ')} />
        <link rel="shortcut icon" href="/favicon.ico" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(PERSON_JSON_LD) }} />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}

export default appWithTranslation(MyApp);
