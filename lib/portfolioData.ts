/**
 * Single source of truth for Amirul Ikmal's portfolio content (originally sourced from LinkedIn).
 * Keep every entry factual. Anything not yet confirmed is marked `TODO(owner)`.
 */

export interface ExperienceItem {
  title: string;
  company: string;
  companyUrl?: string;
  place?: string;
  date: string;
  type?: string;
  bullets?: string[];
}

export interface EducationItem {
  school: string;
  degree: string;
  date: string;
  grade?: string;
  activities?: string;
}

export interface CertificationItem {
  title: string;
  issuer: string;
  date: string;
  credentialId?: string;
}

export interface SkillGroup {
  title: string;
  items: string[];
}

export interface Service {
  title: string;
  description: string;
}

export interface SideProject {
  title: string;
  description: string;
  technologies: string[];
  href: string;
  year?: string;
}

export const about = {
  name: 'Amirul Ikmal',
  location: 'Malaysia',
  availability: 'Open to full-time and contract work, remote',
  bio: [
    'I am a software engineer in Malaysia. I started in 2017 as a system programmer on the VIBES system for JHEV, and I have written production software every year since.',
    'Today I am Technical Co-Founder of Certava, an AI platform for ISO compliance, and a software engineer at Vorto, where I have made more than 2,100 code contributions since 2024 on a real-time logistics platform.',
    'Outside of that I build two products for small sellers in Malaysia who already do business on WhatsApp. Kirabaki is a WhatsApp bot in a pilot with KatalogKu sellers. An LLM turns Malay messages, receipt photos and voice notes into sales entries. KatalogKu is a free product catalog used by 162 Malaysian sellers, with 1,500+ products, 726 orders and RM18k+ in completed sales so far (Nov 2026).',
    'Most of my work is in Go, TypeScript and PHP. The AI work is the Certava clause mapping and gap reports, and Kirabaki parsing sales from WhatsApp. I care about reliability and getting the data right.',
  ],
};

export const services: Service[] = [
  {
    title: 'AI and LLM products',
    description:
      'Certava uses Gemini and OpenAI to map uploaded policies to ISO clauses and write gap reports, SOP drafts and risk register entries. Kirabaki uses an LLM to turn Malay WhatsApp messages, receipt photos and voice notes into sales entries.',
  },
  {
    title: 'Full-stack web apps',
    description:
      'Next.js and React on the front, Go or Node on the back, MongoDB or PostgreSQL for data. I also do the parts around it: auth, Stripe billing, email reports.',
  },
  {
    title: 'Hosting on Vercel and Cloudflare',
    description: 'KatalogKu runs on Vercel with product photos in Cloudflare R2. This site is fully static on Vercel.',
  },
  {
    title: 'WhatsApp tools for small sellers',
    description:
      'KatalogKu sends customer orders to the seller on WhatsApp. Kirabaki, in a pilot with KatalogKu sellers, turns Malay messages, receipt photos and voice notes into sales entries.',
  },
];

/** Older or niche offerings, shown on /about rather than the home page. */
export const otherServices: Service[] = [
  {
    title: 'Custom websites & web apps',
    description: 'Landing pages and full web apps in React, Next.js and Go.',
  },
  {
    title: 'Scripting & automation',
    description: 'Scripts, integrations, data pipelines and CLI tools for repetitive work.',
  },
];

export const experience: ExperienceItem[] = [
  {
    title: 'Technical Co-Founder',
    company: 'Certava',
    companyUrl: 'https://certava.ai',
    date: '2024 – Present',
    bullets: [
      'Co-founded an ISO compliance and gap analysis platform. I handle the engineering. Secured about RM100k in Cradle Fund funding.',
      'Built Gemini and OpenAI workflows that map uploaded policies to ISO clauses, draft SOPs and risk register entries, and export PDF and DOCX reports. Stripe handles billing.',
    ],
  },
  {
    // TODO(owner): confirm this role is still current.
    title: 'Software Engineer',
    company: 'Vorto',
    place: 'Denver, Colorado, United States · Remote',
    date: 'Jun 2024 – Present',
    type: 'Full-time',
    bullets: [
      'Made 2,100+ code contributions since 2024 on a real-time logistics SaaS platform.',
      'Designed backend microservices to make the system more resilient and keep data consistent.',
      'Work with other teams on continuous deployment.',
    ],
  },
  {
    // TODO(owner): soskod.com currently answers 403 / redirect loop to crawlers; add companyUrl back once it serves a page.
    title: 'Business Owner',
    company: 'Soskod Solution',
    place: 'Kuala Lumpur, Malaysia',
    date: 'Jan 2022 – Present',
    type: 'Part-time',
    bullets: ['Part-time consulting business. I build web and mobile apps for clients in Go, React and Node.js.'],
  },
  {
    title: 'Senior Software Developer',
    company: 'C Speed Network Technology Sdn Bhd',
    place: 'Kuala Lumpur, Malaysia · Hybrid',
    date: 'Jan 2023 – May 2024',
    type: 'Full-time',
    // No project-level detail in the repo for this role. Leave the bullets off rather than write a generic line.
  },
  {
    title: 'Programmer',
    company: 'Akal Aspirasi Sdn Bhd',
    place: 'Greater Kuala Lumpur',
    date: 'Aug 2019 – Jan 2023',
    type: 'Full-time',
    bullets: [
      'Built Portal Kempen Tabung Pahlawan 2019, a campaign portal with online payment through MPAY and a CMS (ASP.NET, C#).',
      'Built the veteran information update portal (Portal Pengemaskinian Maklumat Veteran), with user and role-scoped access (ASP.NET, C#).',
      'Built Usahawan JHEV, an e-marketplace portal plus Android and iOS apps (PHP Laravel, Java, Swift).',
      'Led the team building MyCraftShoppe, an e-marketplace portal and mobile app (PHP Laravel, React Native).',
      'Worked on the VIBES 2.0 rebuild at JHEV, a web portal and mobile app (C#, ASP.NET).',
    ],
  },
  {
    title: 'Software Engineer',
    company: 'Dharihaz Technologies Sdn Bhd',
    place: 'Shah Alam, Selangor',
    date: 'Dec 2018 – Jul 2019',
    type: 'Full-time',
    // No project-level detail in the repo for this role. Leave the bullets off rather than write a generic line.
  },
  {
    title: 'Analyst Programmer',
    company: 'EQ Soft Sdn. Bhd',
    place: 'Petaling Jaya',
    date: 'Jun 2018 – Nov 2018',
    type: 'Full-time',
    // No project-level detail in the repo for this role. Leave the bullets off rather than write a generic line.
  },
  {
    title: 'System Programmer',
    company: 'NRM Technology Sdn Bhd',
    place: 'Shah Alam',
    date: 'May 2017 – May 2018',
    type: 'Full-time',
    bullets: ['Application and hardware maintenance with JHEV for the Veteran Integrated Benefits (VIBES) system.'],
  },
];

export const sideProjects: SideProject[] = [
  {
    // TODO(owner): confirm your role on FounderWorkflow and update the description to match the live site.
    title: 'FounderWorkflow',
    description: 'A workflow tool for founders and small teams to organise tasks, roles and processes.',
    technologies: ['Next.js', 'React', 'TypeScript'],
    href: 'https://founderworkflow.com',
  },
  {
    title: 'amirulikmal.com',
    description: 'This site. Static Next.js App Router pages, generated OG images, JSON-LD and llms.txt.',
    technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'MDX'],
    href: 'https://github.com/mirul22/portfolio',
    year: '2026',
  },
];

export const education: EducationItem[] = [
  {
    school: 'Asia e University',
    degree: 'Bachelor of Information & Communication Technology (Hons) in Software Engineering',
    date: 'Oct 2019 – Oct 2022',
    grade: '3.65',
  },
  {
    school: 'Universiti Teknologi MARA',
    degree: 'Diploma in Computer Science',
    date: '2014 – 2017',
    activities: 'Represented the Department of Computer Science in a football tournament (Unikop 2015).',
  },
];

export const certifications: CertificationItem[] = [
  {
    title: 'Build Wireframes and Low-Fidelity Prototypes',
    issuer: 'Google',
    date: 'Dec 2021',
    credentialId: 'ZC8E8WUQRLHF',
  },
  {
    title: 'Start the UX Design Process: Empathize, Define, and Ideate',
    issuer: 'Google',
    date: 'Dec 2021',
    credentialId: 'QFWF4M2Z28RZ',
  },
  {
    title: 'Foundations of User Experience (UX) Design',
    issuer: 'Google',
    date: 'Nov 2021',
    credentialId: '8B8FTHR5MVYK',
  },
  { title: 'Mastering React', issuer: 'Code With Mosh', date: 'Feb 2019', credentialId: 'cert_bzq60519' },
];

// Ordered by what I lead with. Only list things I have used in real work (see lib/work.ts and content/client-work.ts).
export const skillGroups: SkillGroup[] = [
  {
    title: 'AI and LLM products',
    items: [
      'Gemini and OpenAI clause mapping and gap reports (Certava)',
      'LLM parsing of Malay WhatsApp messages, receipt photos and voice notes into sales entries (Kirabaki)',
    ],
  },
  {
    title: 'Product engineering',
    items: [
      'TypeScript',
      'Next.js and React',
      'Node.js',
      'Go',
      'PHP and Laravel',
      'C# and ASP.NET',
      'Java',
      'Mobile: React Native, Swift, Java (Android)',
    ],
  },
  {
    title: 'Platform and data',
    items: ['Cloudflare R2', 'Vercel', 'PostgreSQL', 'MySQL', 'SQL Server', 'MongoDB', 'Stripe', 'CI/CD'],
  },
];
