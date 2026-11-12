import { ogContentType, ogSize, renderOg } from '@/lib/og';

export const alt = "Amirul Ikmal — Hi, I'm Amirul. I build AI products that ship.";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({
    eyebrow: 'Software engineer · Technical Co-Founder',
    title: "Hi, I'm Amirul. I build AI products that ship.",
    subtitle: 'Certava · Kirabaki · KatalogKu',
  });
}
