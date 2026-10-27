# Gallery Project Rules

These rules describe the current `gallery` application and how to make compatible changes.

## Source of truth

- `package.json` declares the dependency ranges and scripts.
- `pnpm-lock.yaml` is the source of exact resolved dependency versions.
- Do not copy version numbers into project guidance. When upgrading, keep `next` and `eslint-config-next` aligned, check peer compatibility, and run the project validation commands.

## Application structure

- Use the existing root-level Next.js App Router structure under `app/`; do not introduce `src/` or legacy `pages/` routing.
- Use `proxy.ts` only when dynamic request interception is required; use Next.js configuration for static redirects/rewrites. Do not add `middleware.ts` or `middleware.js`.
- Keep template metadata in `data/templates.json`, shared configuration in `data/config.ts`, and the metadata normalization logic in `data/templates.ts`.
- Every gallery item must have an explicit entry in `data/templates.json`. Images in `public/`, including numbered `x-template-<number>.<extension>` files, are not added automatically.
- Template badges must use local SVGs under `public/badges/` and `/badges/...` metadata paths; do not use badge-generation services or CDNs. Framework badge images must show the version verified from the template source. The registrar creates or reuses a shared framework SVG per framework and version, and currently supports local badges for CSS, HTML, Java, JavaScript, Python, TypeScript, Supabase, and Neon.
- The Tkinter registrar in `python-tools/template_registrar_ui.py` collects verified template metadata, writes an explicit entry to `data/templates.json`, and copies screenshots to `public/screenshots/`. The registrar can optionally commit and push only the metadata and selected screenshot to `Ex2-Axon/micro-gallery`.
- Keep registrar secrets in `python-tools/.env.local` only. The root `.gitignore` excludes environment secrets and Python caches while allowing the placeholder-only `python-tools/.env.example`; `.vercelignore` excludes the local registrar scripts and VS Code settings from Vercel deployments. The Python tools remain in GitHub for local staff use and are not website assets.
- Keep gallery pagination at 12 items per page unless the product requirement changes. Template detail routes are generated from the configured template list.

## Dependency and change policy

- Use `pnpm` for installs and dependency updates.
- Avoid adding dependencies without a concrete need. Verify the current manifest instead of assuming packages mentioned in generic instructions are installed.
- Validate application/dependency changes with `pnpm lint`, `pnpm exec tsc --noEmit`, `pnpm test`, and `pnpm build`.
