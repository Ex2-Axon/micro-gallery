# Axon Template Gallery

A Next.js App Router site for browsing template previews, viewing individual template details, and checking the template price.

## Stack and requirements

The package manifest and lockfile are the authoritative sources for installed and resolved versions. Use `pnpm` for dependency management. The current app uses Next.js 16, React 19, TypeScript, and Tailwind CSS 4. Review `package.json` before changing versions; keep `next` and `eslint-config-next` aligned, and validate major upgrades with the checks below.

The app currently has no authentication, database, or API-backed content. Template entries and image assets are local to the repository.

## Routes and rendering

- `/` renders the gallery and its search and pagination controls.
- `/pricing` renders the pricing tiers and contact links.
- `/template/[slug]` renders a template detail page. `generateStaticParams()` uses the combined template list to pre-render detail routes.

`app/page.tsx` and the detail/pricing pages are Server Components. `app/TemplateGallery.tsx` is a Client Component because search and pagination use local state.

## How template data and images work

`data/templates.ts` discovers numbered images directly in `public/` whose filenames match `x-template-<number>.<extension>`. Supported extensions are AVIF, WebP, PNG, JPG, and JPEG, in that preference order. The module infers each discovered entry's demo URL as `https://ex2-axon.github.io/<name>/`.

`data/templates.json` contains configured entries, including custom/special filenames and metadata. Configured entries take precedence over automatically discovered entries with the same name. Add custom image paths, display names, or demo URLs here; the referenced image must also exist in `public/`.

Discovery runs when the server/build loads the data module, not through a file-watching upload service. After adding an image or changing metadata, restart the development server if necessary and rebuild/redeploy to include the change in generated pages. The gallery filters the full list, shows 12 items per page, and lazy-loads gallery thumbnails.

Pricing and shared external links are defined in `data/config.ts`.

## Project map

- `app/page.tsx` — gallery home page and footer
- `app/TemplateGallery.tsx` — client-side search, pagination, and thumbnail grid
- `app/template/[slug]/page.tsx` — statically generated template details
- `app/pricing/page.tsx` — pricing and contact information
- `app/layout.tsx` — root layout, metadata, and locally bundled Next font setup
- `app/ui/CookieNotice.tsx` — browser-storage preference notice and controls
- `app/ui/Footer.tsx` — shared legal, social, contact, and company links
- `app/globals.css` — Tailwind CSS import and global styling
- `data/templates.ts` — automatic image discovery and data merge
- `data/templates.json` — explicit template entries
- `data/config.ts` — pricing and shared link constants
- `public/` — gallery images and other static assets
- `next.config.ts` — Next.js configuration, including the loopback dev origin

## Development

```bash
pnpm install
pnpm dev
```

Open `http://localhost:3000`.

```bash
pnpm lint
pnpm exec tsc --noEmit
pnpm test
pnpm build
pnpm start
```

`pnpm test` builds the app, then runs the Playwright smoke suite against a local production server on port `3184`. The cookie notice stores only the user's notice preference in versioned `localStorage`; it does not enable optional trackers.

## Related project guidance

See [AGENTS.md](./AGENTS.md) for repository-specific instructions and [GALLERY_RULES.md](./GALLERY_RULES.md) for project structure and dependency policy.
