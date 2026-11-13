# amirulikmal.com

Personal site of **Amirul Ikmal**: software engineer, Technical Co-Founder of [Certava](https://certava.ai), builder of [Kirabaki](https://kirabaki.my) and [KatalogKu](https://katalogku.my).

## Stack

- Next.js 16 App Router, React 19, strict TypeScript. Every route is statically generated.
- Tailwind CSS 4, `next/font` (Geist), `next/image`, `next-themes` (dark by default, light toggle).
- MDX for `/writing` via `@next/mdx`.
- Metadata routes: dynamic OG/Twitter images (`next/og`), `robots.txt`, `sitemap.xml`, `manifest.webmanifest`, icons, RSS (`/writing/rss.xml`) and `/llms.txt`.
- JSON-LD: `Person`, `WebSite`, `SoftwareApplication` per product, `BreadcrumbList`, `BlogPosting`, `ProfilePage`.
- Security headers (CSP, HSTS, X-Content-Type-Options, Referrer-Policy, Permissions-Policy, X-Frame-Options, COOP) in `next.config.ts`.

## Develop

```sh
nvm use          # Node 22
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
npm run lint
npm run typecheck
```

Optional env var: `NEXT_PUBLIC_SITE_URL` (defaults to `https://amirulikmal.com`). Set it to the host Vercel serves as primary so canonical URLs, the sitemap and OG URLs match.

## Editing content

| What                                           | Where                                                                         |
| ---------------------------------------------- | ----------------------------------------------------------------------------- |
| Name, email, booking link, socials, resume PDF | `lib/site.ts`                                                                 |
| Bio, services, experience, education, skills   | `lib/portfolioData.ts`                                                        |
| Case studies (Certava, Kirabaki, KatalogKu)    | `lib/work.ts`                                                                 |
| Testimonials                                   | `content/testimonials.ts`                                                     |
| Earlier client work                            | `content/client-work.ts`                                                      |
| Writing posts                                  | `content/writing/posts.ts` (metadata) and `content/writing/<slug>.mdx` (body) |
| Product screenshots                            | `public/work/*.jpg`                                                           |

Content rules:

- Only publish facts. Nothing unconfirmed is rendered. Unknowns are tracked as `TODO(owner)` code comments only; run `rg "TODO\(owner\)"` to list them.
- Empty data hides its UI. An empty `testimonials` array hides the testimonials section. Empty `results`, `next` or `myRole` arrays hide those case-study sections. A missing `timeline` hides the timeline fact.
- Writing is hidden everywhere (nav, footer, home, sitemap, RSS link, llms.txt) until at least one post has `draft: false`. Draft posts have no route.
- Testimonials must be exact quotes (for example from LinkedIn recommendations) with name, role, company and relationship. Never paraphrase.
- Plain first-person copy. No em dashes and no marketing filler.

## Owner TODOs

- [ ] Real metrics for Certava, Kirabaki and KatalogKu (`results` in `lib/work.ts`). The Results section appears once you add them.
- [ ] Real LinkedIn recommendations in `content/testimonials.ts`.
- [ ] PDF resume at `public/resume.pdf`, then set `resumePdf` in `lib/site.ts`.
- [ ] Kirabaki: start date, which LLM/provider does the parsing, where records are stored, your role, roadmap.
- [ ] KatalogKu: confirm solo build, roadmap.
- [ ] Certava: roadmap; confirm the decision and trade-off wording.
- [ ] Confirm the Vorto role is still current (`lib/portfolioData.ts`).
- [ ] soskod.com returns 403 to crawlers; fix the site, then add `companyUrl` back.
- [ ] FounderWorkflow: confirm your role and description.
- [ ] Finish the two draft posts in `content/writing/` and set `draft: false` to turn on the Writing section.
