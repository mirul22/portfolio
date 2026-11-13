import { ogContentType, ogSize, renderOg } from '@/lib/og';

export const alt = 'Amirul Ikmal, software engineer in Malaysia';
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({
    eyebrow: 'Software engineer',
    title: "Hi, I'm Amirul. I'm a software engineer in Malaysia.",
    subtitle: 'Technical Co-Founder of Certava. I also build Kirabaki and KatalogKu.',
  });
}
