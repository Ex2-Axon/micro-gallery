# Gallery Project Rules

These rules describe the current `gallery` application and how to make compatible changes.

## Source of truth

- `package.json` declares the dependency ranges and scripts.
- `pnpm-lock.yaml` is the source of exact resolved dependency versions.
- Do not copy version numbers into project guidance. When upgrading, keep `next` and `eslint-config-next` aligned, check peer compatibility, and run the project validation commands.

## Application structure

- Use the existing root-level Next.js App Router structure under `app/`; do not introduce `src/` or legacy `pages/` routing.
- Use `proxy.ts` only when dynamic request interception is required; use Next.js configuration for static redirects/rewrites. Do not add `middleware.ts` or `middleware.js`.
- Keep template metadata in `data/templates.json`, shared configuration in `data/config.ts`, and the image-discovery/data-merge logic in `data/templates.ts`.
- Numbered images named `x-template-<number>.<extension>` in `public/` are discovered automatically. Custom filenames and metadata need explicit entries in `data/templates.json`.
- Keep gallery pagination at 12 items per page unless the product requirement changes. Template detail routes are generated from the combined template list.

## Dependency and change policy

- Use `pnpm` for installs and dependency updates.
- Avoid adding dependencies without a concrete need. Verify the current manifest instead of assuming packages mentioned in generic instructions are installed.
- Validate application/dependency changes with `pnpm lint`, `pnpm exec tsc --noEmit`, and `pnpm build`.
