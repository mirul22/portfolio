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
| Writing posts                                  | `content/writing/posts.ts` (metadata) and `content/writing/<slug>.mdx` (body) |
| Product screenshots                            | `public/work/*.jpg`                                                           |

Content rule: only publish facts. Unknowns are marked `TODO(owner)` in code and render as visible "Placeholder" cards. Run `rg "TODO\(owner\)"` to list them all.

## Owner TODOs

- [ ] Real metrics for Certava, Kirabaki and KatalogKu (`results[]` in `lib/work.ts`) and the home proof-strip "Sellers & users served" slot (`app/page.tsx`).
- [ ] Real, attributable testimonials (`app/page.tsx` testimonials section).
- [ ] PDF resume at `public/resume.pdf`, then set `resumePdf` in `lib/site.ts`.
- [ ] Kirabaki: start date, tech stack, WhatsApp API provider, parsing approach, database, your role, roadmap.
- [ ] KatalogKu: confirm solo build, roadmap, seller dashboard screenshots.
- [ ] Certava: roadmap, in-app screenshots, align copy with certava.ai's current "ISO Intelligence Platform" positioning; confirm the decision rationale wording.
- [ ] Confirm Vorto role is still current (`lib/portfolioData.ts`).
- [ ] soskod.com returns 403 / a redirect loop to crawlers; fix the site or keep it unlinked.
- [ ] FounderWorkflow: confirm your role and description.
- [ ] Finish the two draft posts in `content/writing/` and set `draft: false`.
