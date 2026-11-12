/**
 * Flagship case studies. Every statement must be factual; unknowns are `todo` entries that render
 * as visible placeholders and are listed in the README "Owner TODOs" checklist.
 */

export type WorkSlug = 'certava' | 'kirabaki' | 'katalogku';

export interface ArchNode {
  label: string;
  detail?: string;
  todo?: boolean;
}

export interface Decision {
  choice: string;
  tradeoff: string;
}

export interface CaseStudy {
  slug: WorkSlug;
  name: string;
  url: string;
  tagline: string;
  /** One-line outcome shown at the top of the case study. */
  outcome: string;
  summary: string;
  role: string;
  timeline: string;
  status: string;
  category: string;
  /** schema.org SoftwareApplication applicationCategory */
  appCategory: string;
  stack: string[];
  problem: string[];
  constraints: string[];
  myRole: string[];
  approach: string[];
  architecture: ArchNode[];
  decisions: Decision[];
  /** Real metrics only. Empty slots render as placeholders. */
  results: { label: string; value?: string; todo: string }[];
  next: string[];
  screenshot: { src: string; alt: string; caption: string };
  todos: string[];
  audience: string;
  language: string;
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'certava',
    name: 'Certava',
    url: 'https://certava.ai',
    tagline: 'AI compliance platform',
    outcome: 'Turns manual compliance and gap-analysis work into AI-assisted workflows with audit-ready reports.',
    summary:
      'AI-powered B2B compliance and gap-analysis SaaS. Automates compliance workflows with Google Gemini and OpenAI: gap analysis against standards, AI-generated SOPs, an industry-aware risk register, document parsing and PDF/DOCX report generation.',
    role: 'Technical Co-Founder',
    timeline: '2024 – Present',
    status: 'Live',
    category: 'B2B SaaS · AI',
    appCategory: 'BusinessApplication',
    stack: [
      'Next.js 15',
      'React 19',
      'TypeScript',
      'MongoDB (Mongoose)',
      'Gemini & OpenAI',
      'Stripe',
      'Radix UI',
      'Tailwind CSS',
    ],
    problem: [
      'Compliance and gap analysis against standards is document-heavy, manual work: reading policies, mapping them to requirements, writing SOPs and keeping a risk register current.',
      'Teams need outputs they can hand to auditors and management, not just chat answers.',
    ],
    constraints: [
      'Outputs must be structured and exportable (PDF/DOCX), because compliance work ends in documents.',
      'Risk analysis has to reflect the customer’s industry, not generic boilerplate.',
      'B2B SaaS: subscription billing and multi-step workflows from day one.',
    ],
    myRole: [
      'Technical Co-Founder: product engineering across the stack, from data model to AI workflows to billing.',
      'Designed the AI pipelines for gap analysis, SOP generation and the risk register.',
    ],
    approach: [
      'A Next.js 15 / React 19 app with Radix UI components, backed by MongoDB through Mongoose.',
      'Uploaded documents are parsed, then analysed by Gemini and OpenAI models to produce gap analyses against a chosen standard, draft SOPs and risk-register entries.',
      'Results are generated as PDF and DOCX reports so they slot straight into existing compliance processes. Stripe handles subscriptions.',
    ],
    architecture: [
      { label: 'Browser', detail: 'Next.js 15 · React 19 · Radix UI' },
      { label: 'App & API routes', detail: 'TypeScript, auth, workflow orchestration' },
      { label: 'Document parsing', detail: 'Uploaded policies & evidence' },
      { label: 'LLM layer', detail: 'Google Gemini + OpenAI: gap analysis, SOPs, risk register' },
      { label: 'MongoDB', detail: 'Mongoose models for orgs, assessments, risks' },
      { label: 'Outputs', detail: 'PDF / DOCX reports · Stripe billing' },
    ],
    decisions: [
      {
        choice: 'Two model providers (Gemini and OpenAI) instead of one.',
        tradeoff:
          'More integration and prompt surface to maintain, in exchange for not being locked to a single vendor.',
      },
      {
        choice: 'Generate real PDF/DOCX deliverables rather than only in-app views.',
        tradeoff:
          'Extra rendering work and formatting edge cases, but the output fits how compliance teams already work.',
      },
      {
        choice: 'Document database (MongoDB) for assessments and generated content.',
        tradeoff: 'Flexible schemas for varied standards and AI output; relational reporting needs more care.',
      },
    ],
    results: [
      {
        label: 'Customers / organisations onboarded',
        todo: 'Add real customer count or pilot names (with permission).',
      },
      { label: 'Time saved per assessment', todo: 'Add a measured before/after time for a gap analysis.' },
      { label: 'Reports generated', todo: 'Add a real usage number.' },
    ],
    next: [
      'TODO(owner): describe what is next for Certava (certava.ai now positions itself as an “ISO Intelligence Platform”; align this case study with that messaging).',
    ],
    screenshot: {
      src: '/work/certava.jpg',
      alt: 'Certava landing page: “ISO Intelligence for Continuous Readiness” headline with Book a demo button.',
      caption: 'certava.ai landing page, captured November 2026.',
    },
    todos: [
      'Real results/metrics for Certava.',
      'Product (in-app) screenshots for Certava; currently only the public landing page.',
      'Certava “Next” section and positioning (site now says “ISO Intelligence Platform”).',
      'Confirm the decision rationale wording reflects your actual reasoning.',
    ],
    audience: 'Compliance, quality and risk teams',
    language: 'en',
  },
  {
    slug: 'kirabaki',
    name: 'Kirabaki',
    url: 'https://kirabaki.my',
    tagline: 'Malay WhatsApp bookkeeping bot',
    outcome:
      'Lets small Malaysian sellers record sales by sending a WhatsApp message in Malay, with no app to install.',
    summary:
      'Kirabaki is a Malay-language WhatsApp bot that helps small Malaysian sellers record their sales without learning bookkeeping software.',
    role: 'Builder',
    // TODO(owner): add Kirabaki start date and tech stack.
    timeline: 'TODO',
    status: 'Live',
    category: 'WhatsApp automation · SME',
    appCategory: 'FinanceApplication',
    stack: ['WhatsApp', 'TODO: add stack'],
    problem: [
      'Many small sellers in Malaysia run their business from WhatsApp but keep sales records on paper, or not at all.',
      'Accounting apps assume time, English and a new tool to learn.',
    ],
    constraints: [
      'Must work inside WhatsApp, where sellers already spend their day.',
      'Must understand everyday Malay, not form fields.',
      'Built for very small businesses, so it has to be simple and cheap to run.',
    ],
    myRole: ['TODO(owner): describe your role (solo build? team?) and what you owned.'],
    approach: [
      'Sellers message the Kirabaki bot on WhatsApp in Malay to record a sale.',
      'The bot turns the message into a structured sales record the seller can review later.',
      'TODO(owner): describe the message-parsing approach (rules, LLM, or both) and how records are stored and reported.',
    ],
    architecture: [
      { label: 'Seller on WhatsApp', detail: 'Sends a sale in everyday Malay' },
      // TODO(owner): name the WhatsApp API provider and database.
      { label: 'WhatsApp messaging API', detail: 'Provider to be documented', todo: true },
      { label: 'Kirabaki bot', detail: 'Parses the message into a sale record' },
      { label: 'Storage', detail: 'Database to be documented', todo: true },
      { label: 'kirabaki.my', detail: 'Product site' },
    ],
    decisions: [
      {
        choice: 'WhatsApp as the only interface, no separate app.',
        tradeoff:
          'Zero onboarding friction for sellers; the product is bound by WhatsApp platform rules and message formats.',
      },
      {
        choice: 'Malay-first language support.',
        tradeoff: 'Fits the target users; narrower market than an English-first product.',
      },
    ],
    results: [
      { label: 'Active sellers', todo: 'Add real active seller count.' },
      { label: 'Sales recorded', todo: 'Add real number of sales recorded.' },
      { label: 'Retention', todo: 'Add a real retention or weekly-usage figure.' },
    ],
    next: ['TODO(owner): roadmap for Kirabaki.'],
    screenshot: {
      src: '/work/kirabaki.jpg',
      alt: 'Kirabaki landing page in Malay showing a WhatsApp chat where a seller sends “masuk 120 kopi” and a recorded sale card.',
      caption: 'kirabaki.my landing page, captured November 2026.',
    },
    todos: [
      'Kirabaki timeline (start date).',
      'Kirabaki tech stack and architecture details (WhatsApp API provider, parsing approach, database).',
      'Your role on Kirabaki.',
      'Real results/metrics for Kirabaki.',
      'Kirabaki roadmap (“Next”).',
      'In-app/WhatsApp screenshots for Kirabaki.',
    ],
    audience: 'Small sellers in Malaysia',
    language: 'ms',
  },
  {
    slug: 'katalogku',
    name: 'KatalogKu',
    url: 'https://katalogku.my',
    tagline: 'Free catalog → WhatsApp orders',
    outcome: 'Gives Malaysian small sellers a free product catalog link that turns browsing into WhatsApp orders.',
    summary:
      'Free product catalog platform for Malaysian small sellers. Sellers get a custom link (e.g. katalogku.my/kedai-anda) to share on WhatsApp, Instagram or Facebook. Customers browse products and prices, then order via WhatsApp.',
    role: 'Builder',
    timeline: '2025',
    status: 'Live',
    category: 'Commerce · SME',
    appCategory: 'BusinessApplication',
    stack: ['Next.js 16', 'TypeScript', 'MongoDB', 'Tailwind CSS', 'Framer Motion', 'Cloudflare R2', 'Vercel'],
    problem: [
      'Small sellers share products as scattered photos and price lists across WhatsApp, Instagram and Facebook.',
      'Customers have to ask for prices one by one, and orders get lost in chat.',
    ],
    constraints: [
      'Free for sellers, so infrastructure has to stay cheap.',
      'Orders must land in WhatsApp, the channel sellers already use.',
      'Mobile-first: most sellers and buyers are on phones.',
    ],
    myRole: [
      'Built the product: seller dashboard, public catalog pages, cart and WhatsApp ordering, image uploads and reporting.',
      'TODO(owner): confirm whether this was a solo build.',
    ],
    approach: [
      'Each seller gets a shareable catalog at katalogku.my/<shop>, plus a QR code for offline sharing.',
      'Customers browse and add items to a cart, then send the order to the seller over WhatsApp.',
      'Sellers manage products in a JWT-authenticated dashboard; product images go to Cloudflare R2; sellers receive daily email reports.',
      'Next.js 16 on Vercel with MongoDB as the data store.',
    ],
    architecture: [
      { label: 'Buyer', detail: 'Opens katalogku.my/<shop> or scans a QR code' },
      { label: 'Next.js 16 on Vercel', detail: 'Catalog pages, cart, seller dashboard (JWT auth)' },
      { label: 'MongoDB', detail: 'Shops, products, orders' },
      { label: 'Cloudflare R2', detail: 'Product image uploads' },
      { label: 'WhatsApp', detail: 'Order message sent to the seller' },
      { label: 'Email', detail: 'Daily seller reports' },
    ],
    decisions: [
      {
        choice: 'Hand the order off to WhatsApp instead of building an on-site checkout.',
        tradeoff:
          'Matches how sellers already close sales and keeps the product free; no payment capture or order tracking on the platform.',
      },
      {
        choice: 'Cloudflare R2 for product images.',
        tradeoff:
          'Low storage and egress cost for an image-heavy free product; one more provider to manage alongside Vercel.',
      },
      {
        choice: 'One public link per seller (plus QR) as the main surface.',
        tradeoff: 'Easy to share anywhere; discovery depends on sellers promoting their own link.',
      },
    ],
    results: [
      { label: 'Sellers / catalogs created', todo: 'Add real number of shops created.' },
      { label: 'Orders sent to WhatsApp', todo: 'Add real order count.' },
      { label: 'Products listed', todo: 'Add real product count.' },
    ],
    next: ['TODO(owner): roadmap for KatalogKu.'],
    screenshot: {
      src: '/work/katalogku.jpg',
      alt: 'KatalogKu landing page in Malay: “Semua produk. Satu link. Pesan terus ke WhatsApp.” with an illustrated market street and a sample shop catalog.',
      caption: 'katalogku.my landing page, captured November 2026.',
    },
    todos: [
      'Real results/metrics for KatalogKu.',
      'Confirm KatalogKu was a solo build.',
      'KatalogKu roadmap (“Next”).',
      'Seller dashboard screenshots for KatalogKu.',
    ],
    audience: 'Small sellers in Malaysia',
    language: 'ms',
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}
