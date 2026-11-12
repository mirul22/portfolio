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
  availability: 'Open to full-time & contract • Remote',
  currentlyExploring: 'AI agents, RAG, and evaluation pipelines.',
  bio: [
    'I build AI-powered systems and scalable software. At Vorto I ship production AI workflow automation and LAM (Language-Action Models), and have delivered 70+ features for a real-time logistics SaaS platform.',
    'As Technical Co-Founder of Certava, I lead engineering on an AI compliance platform. On the side I build products for Malaysian small sellers: Kirabaki, a Malay-language WhatsApp bot for recording sales, and KatalogKu, a free product catalog that turns into WhatsApp orders.',
    'My strengths: designing and implementing AI workflows, architecting resilient backend services (Go, Node), and partnering with cross-functional teams for continuous deployment. I care deeply about system reliability and data integrity.',
    'I have been shipping software professionally since 2017, across Go, TypeScript/React, Next.js, PHP and modern tooling. I keep pushing into AI and automation because that is where the biggest impact is.',
  ],
};

export const services: Service[] = [
  {
    title: 'AI agents & LLM apps',
    description:
      'Production AI workflows, agents, RAG and document pipelines using Gemini, OpenAI and Language-Action Models, from proof of concept to monitored production.',
  },
  {
    title: 'Full-stack product engineering',
    description:
      'End-to-end SaaS: Next.js and React front ends, Go and Node backends, MongoDB/PostgreSQL, auth, billing with Stripe, and the boring reliability work that keeps it up.',
  },
  {
    title: 'Cloud on Vercel & Cloudflare',
    description:
      'Fast, cheap-to-run deployments on Vercel and Cloudflare (R2 object storage), with CI/CD, security headers and performance budgets baked in.',
  },
  {
    title: 'WhatsApp automation for SMEs',
    description:
      'WhatsApp-first tools for Malaysian small businesses, where customers already are: catalog-to-order flows and Malay-language bookkeeping bots.',
  },
];

/** Older or niche offerings, shown on /about rather than the home page. */
export const otherServices: Service[] = [
  {
    title: 'Custom websites & web apps',
    description: 'Landing pages to full-stack web applications on modern stacks (React, Next.js, Go).',
  },
  {
    title: 'Scripting & automation',
    description: 'Automation, integrations, data pipelines and CLI tools tailored to a workflow.',
  },
  {
    title: 'FiveM & RedM development',
    description:
      'Custom resources and server-side Lua/JS systems for FiveM (GTA V) and RedM (Red Dead Redemption 2) multiplayer servers.',
  },
];

export const experience: ExperienceItem[] = [
  {
    title: 'Technical Co-Founder',
    company: 'Certava',
    companyUrl: 'https://certava.ai',
    date: '2024 – Present',
    bullets: [
      'Co-founded and lead engineering for an AI compliance and gap-analysis SaaS.',
      'Built AI workflows on Google Gemini and OpenAI for gap analysis, SOP generation and risk registers, plus PDF/DOCX reporting and Stripe billing.',
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
      'Spearheaded delivery of 70+ production features for a real-time logistics SaaS platform.',
      'Architected scalable backend microservices improving system resilience and data integrity.',
      'Work on building AI workflow automation and LAM.',
      'Partnered with cross-functional teams for continuous deployments.',
    ],
  },
  {
    // TODO(owner): soskod.com currently answers 403 / redirect loop to crawlers; add companyUrl back once it serves a page.
    title: 'Business Owner',
    company: 'Soskod Solution',
    place: 'Kuala Lumpur, Malaysia',
    date: 'Jan 2022 – Present',
    bullets: [
      'Delivering web and mobile solutions for clients across Go, React, and Node.js.',
      'Leading technical scope and architecture for consultancy projects.',
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
      'Collaborated with cross-functional teams on design and delivery.',
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
      'Managed a team developing an online shopping platform (Mycraftshoppe – web portal and mobile apps).',
      'Worked on new technology for the revamp of Veteran Integrated Benefits (VIBES) at JHEV.',
    ],
  },
  {
    title: 'Software Engineer',
    company: 'Dharihaz Technologies Sdn Bhd',
    place: 'Shah Alam, Selangor',
    date: 'Dec 2018 – Jul 2019',
    type: 'Full-time',
    bullets: [
      'Developed and maintained software solutions for client projects.',
      'Worked with web and backend technologies in an agile setup.',
    ],
  },
  {
    title: 'Analyst Programmer',
    company: 'EQ Soft Sdn. Bhd',
    place: 'Petaling Jaya',
    date: 'Jun 2018 – Nov 2018',
    type: 'Full-time',
    bullets: [
      'Contributed to analysis and development of in-house software.',
      'Supported delivery and documentation for business systems.',
    ],
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
    description:
      'Workflow and productivity platform for founders and small teams. Helps structure tasks, roles, and processes.',
    technologies: ['Next.js', 'React', 'TypeScript'],
    href: 'https://founderworkflow.com',
  },
  {
    title: 'amirulikmal.com',
    description:
      'This site. Statically generated Next.js App Router, MDX writing, dynamic OG images, JSON-LD and llms.txt.',
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
