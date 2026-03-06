/**
 * Single source of truth for Amirul Ikmal's portfolio content (from LinkedIn).
 * Used by Experience, Skills, Hero, Education, Certifications, AI chat, and Terminal.
 */

export interface ExperienceItem {
  title: string;
  company: string;
  place: string;
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
  skills?: string[];
}

export interface CertificationItem {
  title: string;
  issuer: string;
  date: string;
  credentialId?: string;
  skills?: string[];
}

export interface SkillItem {
  name: string;
  href: string;
  iconKey: string; // maps to Skills Icons
}

export interface SocialLink {
  label: string;
  href: string;
  icon: 'github' | 'linkedin';
}

export interface ProjectItem {
  title: string;
  description: string;
  technologies: string[];
  href?: string;
  github?: string;
  year?: string;
}

export interface PortfolioData {
  about: {
    name: string;
    headline: string;
    title: string; // for hero "Hi, I'm X"
    descriptions: string[];
    email: string;
    location: string;
    socials: SocialLink[];
    soskodHref: string;
    /** e.g. "Open to full-time & contract • Remote" — shown in Hero */
    availability?: string;
    /** Optional: link to PDF resume for Download CV button */
    resumeHref?: string;
    /** One line to signal continuous learning, e.g. "Currently exploring: agents, RAG, evals" */
    currentlyExploring?: string;
    /** Optional: "What people say" quote for trust */
    testimonial?: { quote: string; author: string; roleOrContext?: string };
    /** Optional: Calendly or similar "Book a call" URL */
    calendlyHref?: string;
  };
  experience: ExperienceItem[];
  projects: ProjectItem[];
  education: EducationItem[];
  certifications: CertificationItem[];
  skills: SkillItem[];
}

export const portfolioData: PortfolioData = {
  about: {
    name: 'Amirul Ikmal',
    headline: 'Software Engineer | AI Engineer | Fullstack (Go, PHP, JS/TS) | SaaS & System Architecture | Remote',
    title: "Hi, I'm Amirul!",
    descriptions: [
      'I build AI-powered systems and scalable software. At Vorto I ship production AI workflow automation and LAM (Language-Action Models), and have delivered 70+ features for real-time logistics SaaS.',
      'My strengths: designing and implementing AI workflows, architecting resilient backend microservices (Go, Node), and partnering with cross-functional teams for continuous deployment. I care deeply about system reliability and data integrity.',
      'With 8+ years of full-stack experience since 2017, I work across Go, TypeScript/React, Next.js, and modern tooling. I keep pushing into AI and automation because that’s where the biggest impact is.',
      'I’m focused on building software that scales—and on the road ahead, I want to help build the next generation of AI-driven products for millions of users.',
    ],
    email: 'amirulikmal.biz@gmail.com',
    location: 'Malaysia',
    socials: [
      { label: 'GitHub', href: 'https://github.com/mirul22', icon: 'github' },
      { label: 'LinkedIn', href: 'https://www.linkedin.com/in/amirulikmal/', icon: 'linkedin' },
    ],
    soskodHref: 'http://soskod.com/',
    availability: 'Open to full-time & contract • Remote',
    resumeHref: undefined, // add e.g. '/resume.pdf' or external URL when you have one
    currentlyExploring: 'Currently exploring: AI agents, RAG, and evaluation pipelines.',
    testimonial: {
      quote: 'Amirul delivers clean, maintainable code and communicates clearly with stakeholders.',
      author: '— Team lead',
      roleOrContext: 'Former colleague',
    },
    calendlyHref: 'https://calendly.com/amirulikmal-biz/30min',
  },
  experience: [
    {
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
      title: 'Business Owner',
      company: 'Soskod Solution',
      place: 'Kuala Lumpur, Malaysia',
      date: 'Jan 2022 – Present',
      type: 'Full-time',
      bullets: [
        'Delivering web and mobile solutions for clients across Go, React, and Node.js.',
        'Leading technical scope and architecture for consultancy projects.',
      ],
    },
    {
      title: 'Senior Software Developer',
      company: 'C Speed Network Technology Sdn Bhd',
      place: 'Federal Territory of Kuala Lumpur, Malaysia · Hybrid',
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
        'Managing a team developing an online shopping platform (Mycraftshoppe – web portal and mobile apps).',
        'Working on new technology for revamp of Veteran Integrated Benefits (VIBES) at JHEV.',
      ],
    },
    {
      title: 'Software Engineer',
      company: 'Dharihaz Technologies Sdn Bhd',
      place: 'i-SoVo @ i-City, Shah Alam, Selangor',
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
      place: 'Empire Damansara, Petaling Jaya',
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
      place: 'Plaza Azalea, Shah Alam',
      date: 'May 2017 – May 2018',
      type: 'Full-time',
      bullets: [
        'Working with JHEV on Application and Hardware Maintenance for Veteran Integrated Benefits (VIBES) System.',
      ],
    },
  ],
  projects: [
    {
      title: 'This portfolio',
      description:
        'Cursor-style IDE UI with resizable panels, AI Q&A about my profile, action log, and interactive terminal. Built to showcase full-stack and UI skills.',
      technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind', 'Framer Motion'],
      href: 'https://amirulikmal.com',
      year: '2025',
    },
    {
      title: 'KatalogKu.my',
      description:
        'Free product catalog platform for Malaysian small sellers. Sellers get a custom link (e.g. katalogku.my/kedai-anda) to share on WhatsApp/Instagram/Facebook. Customers browse products and prices, then order via WhatsApp. Features: JWT auth, dashboard, cart, daily email reports, image uploads (R2), QR code sharing.',
      technologies: ['Next.js 16', 'TypeScript', 'MongoDB', 'Tailwind CSS', 'Framer Motion', 'Vercel'],
      href: 'https://katalogku.my',
      year: '2025',
    },
    {
      title: 'Certava.ai',
      description:
        'AI-powered B2B compliance and gap analysis SaaS. Automates compliance workflows with Google Gemini and OpenAI: gap analysis against standards, AI-generated SOPs, risk register with industry-specific AI, document parsing, and PDF/DOCX report generation. Stripe, Radix UI, Mongoose.',
      technologies: ['Next.js 15', 'React 19', 'TypeScript', 'MongoDB', 'Gemini & OpenAI', 'Stripe', 'Tailwind'],
      href: 'https://certava.ai',
      year: '2024 – Present',
    },
    {
      title: 'Kirabaki.com',
      description: 'Web product and branding project. Built and maintained as part of Soskod Solution.',
      technologies: ['Next.js', 'React', 'TypeScript'],
      href: 'https://kirabaki.com',
      year: '—',
    },
    {
      title: 'FounderWorkflow.com',
      description:
        'Workflow and productivity platform for founders and small teams. Helps structure tasks, roles, and processes.',
      technologies: ['Next.js', 'React', 'TypeScript'],
      href: 'https://founderworkflow.com',
      year: '—',
    },
  ],
  education: [
    {
      school: 'Asia e University',
      degree:
        'Bachelor of Information & Communication Technology (Hons) in Software Engineering, Information Technology',
      date: 'Oct 2019 – Oct 2022',
      grade: '3.65',
      skills: ['Node.js', 'HTML5'],
    },
    {
      school: 'Universiti Teknologi MARA',
      degree: 'Diploma Science Computer, Computer Science',
      date: '2014 – 2017',
      activities: 'Represented the Department of Science Computer in football tournament (Unikop 2015).',
      skills: ['HTML5'],
    },
  ],
  certifications: [
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
      skills: ['HTML5'],
    },
    {
      title: 'Mastering React',
      issuer: 'Code With Mosh',
      date: 'Feb 2019',
      credentialId: 'cert_bzq60519',
      skills: ['HTML5'],
    },
    {
      title: 'The Web Developer Bootcamp',
      issuer: 'Udemy',
      date: 'May 2018',
      credentialId: 'UC-F6S1EQ4J',
      skills: ['HTML5'],
    },
    {
      title: 'The Complete JavaScript Course 2019: Build Real Projects!',
      issuer: 'Udemy',
      date: 'Feb 2019',
      credentialId: 'UC-LFAS5785',
      skills: ['HTML5'],
    },
  ],
  skills: [
    { name: 'Go', href: 'https://go.dev/', iconKey: 'go' },
    { name: 'NextJS', href: 'https://nextjs.org/', iconKey: 'next' },
    { name: 'React', href: 'https://reactjs.org/', iconKey: 'react' },
    { name: 'TypeScript', href: 'https://www.typescriptlang.org/', iconKey: 'ts' },
    { name: 'Tailwind', href: 'https://tailwindcss.com/', iconKey: 'tailwind' },
    { name: 'NodeJS', href: 'https://nodejs.org/en', iconKey: 'node' },
    { name: 'PHP', href: 'https://www.php.net/', iconKey: 'php' },
    { name: 'Prisma', href: 'https://www.prisma.io/', iconKey: 'prisma' },
    { name: 'PostgreSQL', href: 'https://www.postgresql.org/', iconKey: 'postgres' },
    { name: 'MongoDB', href: 'https://www.mongodb.com/', iconKey: 'mongo' },
    { name: 'MySQL', href: 'https://www.mysql.com/', iconKey: 'mysql' },
    { name: 'Firebase', href: 'https://firebase.google.com/', iconKey: 'firebase' },
    { name: 'Vite', href: 'https://vitejs.dev/', iconKey: 'vite' },
    { name: 'Laravel', href: 'https://laravel.com/', iconKey: 'laravel' },
    { name: 'Figma', href: 'https://www.figma.com/', iconKey: 'figma' },
    { name: 'Postman', href: 'https://www.postman.com/', iconKey: 'postman' },
  ],
};

/** Flattened text for AI chat keyword search */
export function getPortfolioKnowledgeText(): string {
  const d = portfolioData;
  const expParts: string[] = [];
  d.experience.forEach((e) => {
    expParts.push(e.title, e.company, e.place, e.date);
    (e.bullets || []).forEach((b) => expParts.push(b));
  });
  const eduParts: string[] = [];
  d.education.forEach((ed) => {
    eduParts.push(ed.school, ed.degree, ed.date, ed.grade || '');
  });
  const certParts: string[] = [];
  d.certifications.forEach((c) => {
    certParts.push(c.title, c.issuer, c.date);
  });
  const projectParts: string[] = [];
  d.projects.forEach((p) => {
    projectParts.push(p.title, p.description, ...p.technologies);
  });
  const testimonialParts: string[] = [];
  if (d.about.testimonial) {
    testimonialParts.push(
      d.about.testimonial.quote,
      d.about.testimonial.author,
      d.about.testimonial.roleOrContext || ''
    );
  }
  const parts: string[] = [
    d.about.name,
    d.about.headline,
    ...d.about.descriptions,
    d.about.email,
    d.about.location,
    d.about.availability || '',
    d.about.currentlyExploring || '',
    d.about.calendlyHref || '',
    ...testimonialParts,
    ...expParts,
    ...projectParts,
    ...eduParts,
    ...certParts,
    ...d.skills.map((s) => s.name),
  ];
  return parts.join(' ').toLowerCase();
}
