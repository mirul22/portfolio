/**
 * Flagship case studies. Only publish facts. Anything unknown stays out of the data (and out of the
 * page) and is tracked as a `TODO(owner)` comment instead. Empty arrays hide their section.
 */

export type WorkSlug = 'certava' | 'kirabaki' | 'katalogku';

export interface ArchNode {
  label: string;
  detail?: string;
}

export interface Decision {
  choice: string;
  tradeoff: string;
}

export interface CaseStudy {
  slug: WorkSlug;
  name: string;
  url: string;
  /** Short plain description, shown under the name. */
  tagline: string;
  /** One or two sentences on what the product does for its users. */
  outcome: string;
  summary: string;
  role: string;
  timeline?: string;
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
  /** Real, verifiable metrics only. */
  results: { label: string; value: string }[];
  next: string[];
  screenshot: { src: string; alt: string; caption: string };
  audience: string;
  language: string;
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'certava',
    name: 'Certava',
    url: 'https://certava.ai',
    tagline: 'AI platform for ISO compliance',
    outcome:
      'Certava shows quality teams where they stand on ISO 9001, 14001 and 45001: which clauses, risks, controls and evidence are covered, weak or missing.',
    summary:
      'Certava is an AI platform for ISO intelligence and compliance. It runs gap analysis against ISO standards, drafts SOPs, keeps a risk register and produces PDF and DOCX reports, using Google Gemini and OpenAI.',
    role: 'Technical Co-Founder',
    timeline: '2024 to now',
    status: 'Live',
    category: 'B2B SaaS',
    appCategory: 'BusinessApplication',
    stack: [
      'Next.js 15',
      'React 19',
      'TypeScript',
      'MongoDB (Mongoose)',
      'Gemini',
      'OpenAI',
      'Stripe',
      'Radix UI',
      'Tailwind CSS',
    ],
    problem: [
      'ISO work is mostly documents. Someone has to read the policies, match them to each clause, write SOPs and keep the risk register current, usually in spreadsheets and folders.',
      'Management and auditors need a clear answer to one question: are we ready, and if not, where are the gaps?',
    ],
    constraints: [
      'The output has to be a document people can hand over, so PDF and DOCX export was needed from the start.',
      'Risk entries need to fit the customer’s industry. Generic text is no use to a quality team.',
      'It is a B2B product, so subscriptions and billing had to work on day one.',
    ],
    myRole: [
      'I am the technical co-founder. I work across the whole product: the data model, the AI workflows, the reports and billing.',
      'I designed the pipelines that do the gap analysis, draft SOPs and fill the risk register.',
    ],
    approach: [
      'The app is Next.js 15 and React 19 with Radix UI, on top of MongoDB through Mongoose.',
      'Customers upload their documents. Certava parses them, then Gemini and OpenAI models compare them against the chosen ISO standard, draft SOPs and suggest risk register entries.',
      'Results come out as PDF and DOCX reports. Stripe handles subscriptions.',
    ],
    architecture: [
      { label: 'Browser', detail: 'Next.js 15, React 19, Radix UI' },
      { label: 'App and API routes', detail: 'TypeScript, auth, workflow steps' },
      { label: 'Document parsing', detail: 'Uploaded policies and evidence' },
      { label: 'LLM calls', detail: 'Gemini and OpenAI: gap analysis, SOPs, risks' },
      { label: 'MongoDB', detail: 'Organisations, assessments, risks' },
      { label: 'Output', detail: 'PDF and DOCX reports, Stripe billing' },
    ],
    // TODO(owner): confirm these read as your actual reasoning.
    decisions: [
      {
        choice: 'Two model providers, Gemini and OpenAI, instead of one.',
        tradeoff: 'More prompts and integrations to maintain, but no lock-in to a single vendor.',
      },
      {
        choice: 'Real PDF and DOCX files instead of only screens in the app.',
        tradeoff: 'Formatting takes extra work, but the output fits how ISO teams already share documents.',
      },
      {
        choice: 'MongoDB for assessments and generated content.',
        tradeoff: 'Flexible for different standards and AI output. Cross-assessment reporting needs more care.',
      },
    ],
    // TODO(owner): add real, verifiable results (customers, time saved per assessment, reports generated).
    results: [],
    // TODO(owner): add what is next for Certava.
    next: [],
    screenshot: {
      src: '/work/certava.jpg',
      alt: 'Certava landing page with the headline “ISO Intelligence for Continuous Readiness” and a Book a demo button.',
      caption: 'certava.ai, November 2026.',
    },
    audience: 'Quality, compliance and risk teams',
    language: 'en',
  },
  {
    slug: 'kirabaki',
    name: 'Kirabaki',
    url: 'https://kirabaki.my',
    tagline: 'Bookkeeping bot on WhatsApp, in Malay',
    outcome:
      'Small sellers record their sales and expenses by sending Kirabaki a WhatsApp message in Malay, like “masuk 120 kopi”. It saves the record and works out the day’s profit.',
    summary:
      'Kirabaki is a WhatsApp bot that does simple bookkeeping in Malay for small sellers in Malaysia. Sellers type a message, snap a receipt or send a voice note, and an LLM turns it into a sale or expense record.',
    role: 'Builder',
    // TODO(owner): add start date (timeline), tech stack and your role details.
    status: 'Live, free during the pilot',
    category: 'WhatsApp bot',
    appCategory: 'FinanceApplication',
    stack: ['WhatsApp', 'LLM'],
    problem: [
      'Plenty of small sellers in Malaysia run the whole business from WhatsApp. Sales get written in a notebook, or not at all, so they don’t know their profit for the day.',
      'Accounting apps mean installing something new, filling in forms, and usually reading English.',
    ],
    constraints: [
      'It has to work inside WhatsApp, where sellers already spend the day.',
      'It has to understand everyday Malay, not form fields.',
      'Sellers should not need to install an app or create an account somewhere else.',
    ],
    myRole: [],
    // TODO(owner): add which model/provider does the parsing and where records are stored.
    approach: [
      'A seller sends Kirabaki a message such as “masuk 120 kopi”.',
      'An LLM reads the message and works out the item and amount. Kirabaki saves it as a sale and confirms with a tick in the chat.',
      'Receipt photos and voice notes go through the same parsing. Sellers can ask for the day’s profit at any time.',
    ],
    architecture: [
      { label: 'Seller on WhatsApp', detail: 'Text, receipt photo or voice note, in Malay' },
      { label: 'LLM parsing', detail: 'Turns the message, photo or voice note into a record' },
      { label: 'Kirabaki bot', detail: 'Saves the sale or expense' },
      { label: 'Reply in WhatsApp', detail: 'Confirmation and today’s profit' },
    ],
    decisions: [
      {
        choice: 'WhatsApp is the only interface. There is no separate app.',
        tradeoff:
          'Nothing new for sellers to learn, but the product has to live within WhatsApp’s rules and message formats.',
      },
      {
        choice: 'Malay first.',
        tradeoff: 'It fits the people it is for. The market is smaller than an English-first product.',
      },
    ],
    // TODO(owner): add real results (active sellers, sales recorded, weekly usage).
    results: [],
    // TODO(owner): add roadmap.
    next: [],
    screenshot: {
      src: '/work/kirabaki.jpg',
      alt: 'Kirabaki landing page in Malay. A WhatsApp chat shows a seller sending “masuk 120 kopi” and a card recording a RM120 sale.',
      caption: 'kirabaki.my, November 2026.',
    },
    audience: 'Small sellers in Malaysia',
    language: 'ms',
  },
  {
    slug: 'katalogku',
    name: 'KatalogKu',
    url: 'https://katalogku.my',
    tagline: 'Free online catalog with WhatsApp ordering',
    outcome:
      'Sellers put their products on one free link, like katalogku.my/kedai-anda. Customers pick items and send the order straight to the seller on WhatsApp.',
    summary:
      'KatalogKu is a free product catalog for small sellers in Malaysia. Each seller gets a shareable link for WhatsApp, Instagram and Facebook. Customers browse products and prices, then order over WhatsApp.',
    role: 'Builder',
    timeline: '2025',
    status: 'Live',
    category: 'Online catalog',
    appCategory: 'BusinessApplication',
    stack: ['Next.js 16', 'TypeScript', 'MongoDB', 'Tailwind CSS', 'Framer Motion', 'Cloudflare R2', 'Vercel'],
    problem: [
      'Small sellers post product photos and price lists across WhatsApp, Instagram and Facebook.',
      'Customers have to ask for prices one by one, and orders get lost in long chats.',
    ],
    constraints: [
      'It is free for sellers: no monthly fee and no commission, so running costs have to stay low.',
      'Orders go to WhatsApp, because that is where sellers already close sales.',
      'Most sellers and buyers are on their phones.',
    ],
    myRole: [
      'I built the seller dashboard, the public catalog pages, the cart and WhatsApp ordering, image uploads and the daily email reports.',
    ],
    approach: [
      'Every seller gets a catalog at katalogku.my/<shop> and a QR code for printing or sharing offline.',
      'Customers add items to a cart and send the order to the seller on WhatsApp. They don’t need an account.',
      'Sellers log in to a dashboard (JWT auth) to manage products. Photos go to Cloudflare R2, and sellers get a daily email report.',
      'It runs on Next.js 16 on Vercel, with MongoDB for data.',
    ],
    architecture: [
      { label: 'Customer', detail: 'Opens katalogku.my/<shop> or scans the QR code' },
      { label: 'Next.js 16 on Vercel', detail: 'Catalog pages, cart, seller dashboard' },
      { label: 'MongoDB', detail: 'Shops, products, orders' },
      { label: 'Cloudflare R2', detail: 'Product photos' },
      { label: 'WhatsApp', detail: 'Order message to the seller' },
      { label: 'Email', detail: 'Daily report to the seller' },
    ],
    decisions: [
      {
        choice: 'Send the order to WhatsApp instead of building a checkout.',
        tradeoff:
          'Matches how sellers already close sales and keeps it free. There is no payment or order tracking on the platform.',
      },
      {
        choice: 'Cloudflare R2 for product photos.',
        tradeoff:
          'Cheap storage and egress for an image-heavy free product, at the cost of one more provider next to Vercel.',
      },
      {
        choice: 'One public link per seller, plus a QR code.',
        tradeoff: 'Easy to share anywhere, but sellers have to promote their own link.',
      },
    ],
    // TODO(owner): add real results (shops created, orders sent, products listed) and confirm whether it was a solo build.
    results: [],
    // TODO(owner): add roadmap.
    next: [],
    screenshot: {
      src: '/work/katalogku.jpg',
      alt: 'KatalogKu landing page in Malay: “Semua produk. Satu link. Pesan terus ke WhatsApp.” next to an illustrated market street and a sample shop catalog.',
      caption: 'katalogku.my, November 2026.',
    },
    audience: 'Small sellers in Malaysia',
    language: 'ms',
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}
