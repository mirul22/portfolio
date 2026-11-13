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

export interface Skill {
  name: string;
  group: 'Languages' | 'Frameworks' | 'Data' | 'Platform & tools';
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
  currentlyExploring: 'AI agents, RAG and evaluation pipelines.',
  bio: [
    'I am a software engineer in Malaysia. I started in 2017 as a system programmer on the VIBES system for JHEV, and I have written production software every year since.',
    'Today I am Technical Co-Founder of Certava, an ISO compliance platform, and a software engineer at Vorto, where I have shipped more than 70 features on a real-time logistics platform and work on AI workflow automation and LAM (Language-Action Models).',
    'Outside of that I build two products for small sellers in Malaysia who already do business on WhatsApp. Kirabaki is a bot that records sales in Malay. KatalogKu is a free product catalog that sends orders to WhatsApp.',
    'Most of my work is in Go, TypeScript and PHP. I spend a lot of time on backend services, and I care about reliability and getting the data right.',
  ],
};

export const services: Service[] = [
  {
    title: 'AI workflows and LLM features',
    description:
      'At Vorto I work on AI workflow automation and LAM. At Certava I use Gemini and OpenAI for gap analysis, SOP drafts and risk registers, and turn the output into PDF and DOCX reports.',
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
      'KatalogKu sends customer orders to the seller on WhatsApp. Kirabaki lets sellers record sales by texting a bot in Malay.',
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
  {
    title: 'FiveM & RedM development',
    description:
      'Server-side Lua and JS resources for FiveM (GTA V) and RedM (Red Dead Redemption 2) multiplayer servers.',
  },
];

export const experience: ExperienceItem[] = [
  {
    title: 'Technical Co-Founder',
    company: 'Certava',
    companyUrl: 'https://certava.ai',
    date: '2024 – Present',
    bullets: [
      'Co-founded an ISO compliance and gap analysis platform. I handle the engineering.',
      'Built the Gemini and OpenAI workflows for gap analysis, SOP drafts and risk registers, plus PDF and DOCX reports and Stripe billing.',
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
      'Shipped 70+ production features on a real-time logistics SaaS platform.',
      'Designed backend microservices to make the system more resilient and keep data consistent.',
      'Work on AI workflow automation and LAM.',
      'Work with other teams on continuous deployment.',
    ],
  },
  {
    // TODO(owner): soskod.com currently answers 403 / redirect loop to crawlers; add companyUrl back once it serves a page.
    title: 'Business Owner',
    company: 'Soskod Solution',
    place: 'Kuala Lumpur, Malaysia',
    date: 'Jan 2022 – Present',
    bullets: [
      'Build web and mobile apps for clients in Go, React and Node.js.',
      'Scope and design the architecture for consulting projects.',
    ],
  },
  {
    title: 'Senior Software Developer',
    company: 'C Speed Network Technology Sdn Bhd',
    place: 'Kuala Lumpur, Malaysia · Hybrid',
    date: 'Jan 2023 – May 2024',
    type: 'Full-time',
    bullets: [
      'Shipped production features for network and software products.',
      'Worked with other teams on design and delivery.',
    ],
  },
  {
    title: 'Programmer',
    company: 'Akal Aspirasi Sdn Bhd',
    place: 'Greater Kuala Lumpur',
    date: 'Aug 2019 – Jan 2023',
    type: 'Full-time',
    bullets: [
      'Completed: Portal Kempen Tabung Pahlawan, Portal Pengemaskinian Maklumat Veteran, Usahawan JHEV mobile apps.',
      'Led the team building Mycraftshoppe, an online shopping platform (web portal and mobile apps).',
      'Worked on new technology for the revamp of Veteran Integrated Benefits (VIBES) at JHEV.',
    ],
  },
  {
    title: 'Software Engineer',
    company: 'Dharihaz Technologies Sdn Bhd',
    place: 'Shah Alam, Selangor',
    date: 'Dec 2018 – Jul 2019',
    type: 'Full-time',
    bullets: ['Built and maintained software for client projects.', 'Web and backend work in an agile team.'],
  },
  {
    title: 'Analyst Programmer',
    company: 'EQ Soft Sdn. Bhd',
    place: 'Petaling Jaya',
    date: 'Jun 2018 – Nov 2018',
    type: 'Full-time',
    bullets: ['Analysis and development of in-house software.', 'Delivery and documentation for business systems.'],
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
  {
    title: 'MERN Stack Front To Back: Full Stack React, Redux & Node.js',
    issuer: 'Udemy',
    date: 'Mar 2019',
    credentialId: 'UC-IGPEU5YN',
  },
  { title: 'Mastering React', issuer: 'Code With Mosh', date: 'Feb 2019', credentialId: 'cert_bzq60519' },
  {
    title: 'The Complete JavaScript Course 2019: Build Real Projects!',
    issuer: 'Udemy',
    date: 'Feb 2019',
    credentialId: 'UC-LFAS5785',
  },
  { title: 'The Web Developer Bootcamp', issuer: 'Udemy', date: 'May 2018', credentialId: 'UC-F6S1EQ4J' },
];

export const skills: Skill[] = [
  { name: 'Go', group: 'Languages' },
  { name: 'TypeScript', group: 'Languages' },
  { name: 'PHP', group: 'Languages' },
  { name: 'Next.js', group: 'Frameworks' },
  { name: 'React', group: 'Frameworks' },
  { name: 'Node.js', group: 'Frameworks' },
  { name: 'Laravel', group: 'Frameworks' },
  { name: 'Tailwind CSS', group: 'Frameworks' },
  { name: 'PostgreSQL', group: 'Data' },
  { name: 'MongoDB', group: 'Data' },
  { name: 'MySQL', group: 'Data' },
  { name: 'Prisma', group: 'Data' },
  { name: 'Firebase', group: 'Data' },
  { name: 'Vercel', group: 'Platform & tools' },
  { name: 'Cloudflare R2', group: 'Platform & tools' },
  { name: 'Gemini & OpenAI APIs', group: 'Platform & tools' },
  { name: 'Stripe', group: 'Platform & tools' },
  { name: 'Vite', group: 'Platform & tools' },
  { name: 'Figma', group: 'Platform & tools' },
  { name: 'Postman', group: 'Platform & tools' },
];
