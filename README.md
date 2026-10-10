# Gallery

Next.js 16 + App Router project for a gallery-style template showcase.

## Overview

This repository contains a modern Next.js application using:

- `next` v16.2.7
- `react` v19.2.4
- `tailwindcss` v4
- TypeScript
- `@tailwindcss/postcss`

The app is organized with the App Router under `app/` and includes reusable page templates for the gallery and pricing views.

## Recommended Workflow

Use `pnpm` for all local development and dependency management.

### Install dependencies

```bash
pnpm install
```

### Run the app locally

```bash
pnpm dev
```

Open `http://localhost:3000` in your browser.

### Build for production

```bash
pnpm build
```

### Start production server

```bash
pnpm start
```

### Run linting

```bash
pnpm lint
```

## Project Structure

- `app/` - App Router pages and layouts
- `app/page.tsx` - Main gallery landing page
- `app/layout.tsx` - App layout and metadata wrapper
- `app/globals.css` - Global styles and Tailwind theme tokens
- `app/pricing/page.tsx` - Pricing page
- `app/template/[slug]/page.tsx` - Template detail pages
- `app/TemplateGallery.tsx` - Shared gallery component
- `data/` - Template content and configuration data
- `public/` - Static assets

## Notes

- This project uses Tailwind CSS v4 and should define theme colors in `app/globals.css` using `@theme`.
- The application follows App Router conventions and avoids legacy `pages/` routing.
- `package.json` is configured for pnpm usage.

## Adding templates

The gallery automatically discovers new images in `public/` when their filename
matches `x-template-<number>.<extension>`, where the extension is `avif`, `webp`,
`png`, `jpg`, or `jpeg`. For example, adding `public/x-template-054.webp` creates
the `x-template-054` gallery item and its detail page at the next build. The demo
URL is inferred as `https://ex2-axon.github.io/x-template-054/`.

The gallery prefers AVIF, then WebP, PNG, JPG, and JPEG when multiple image
formats exist for the same numbered template. New files are discovered during
the build, so deploy again after adding an image.

For a custom display name, demo URL, or special template filename, add the entry
to `data/templates.json`. Entries there override the automatically inferred
image and metadata. The gallery shows 12 templates per page, searches across the
full list, and lazily loads the images on the current page.

## Gallery Rules

See [GALLERY_RULES.md](./GALLERY_RULES.md) for baseline structure, naming conventions, and version rules.

## Useful links

- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS v4](https://tailwindcss.com/docs)
- [pnpm](https://pnpm.io)

## License

This project is private by default. Update the license section when you choose a license.
