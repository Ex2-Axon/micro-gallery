# Python Template Registrar — AI Instructions

This directory contains a local Python/Tkinter helper for registering verified templates in the root-level Next.js gallery. Follow these instructions when changing or using the tools.

## Files and responsibilities

- `template_registrar.py` contains `TemplateDetails`, validation, automatic ID selection, local registration, badge generation, and optional GitHub API commit/push helpers.
- `template_registrar_ui.py` provides the Tkinter form and calls the registrar functions.
- `../run_template_registrar.py` is the project-root launcher used by VS Code. There is no command-line interface in `template_registrar.py`; running that module directly does not register a template.
- `test_template_registrar.py` contains offline unit tests. Run from the repository root with `python3 -m unittest discover -s python-tools -p 'test_*.py'`.
- `README.md` is the Thai user guide. Keep it aligned with actual behavior and write instructions for people, not AI agents.
- `.env.example` contains placeholders only. `.env.local` is private local configuration and must never be read for documentation, printed, copied, included in diffs, or committed.

## Registration behavior

- Run commands from the repository root so paths resolve against the correct project.
- Supported kinds and defaults are:
  - `Vite`: `x-template-###`, 2,500 THB, no database.
  - `Next.js`: `x-template-next-###`, 3,500 THB, no database.
  - `Special (Vite + database)`: `x-template-special-###`, 5,000 THB, requires a verified database.
- `next_template_name(repo_root, framework)` chooses the next ID for that kind from `data/templates.json`.
- `register_template(repo_root, details, screenshot_path)` validates metadata, copies the screenshot to `public/screenshots/`, creates or reuses a framework badge shared by matching framework/version pairs in `public/badges/`, and appends the record to `data/templates.json`. Supported screenshot extensions are AVIF, WebP, PNG, JPG, and JPEG.
- Framework versions, languages, database products, source repositories, deployment platforms, deployed URLs, and descriptions must be verified from the template itself. Never guess or derive a template's stack from this gallery's dependencies.
- Language badges must have a matching local asset in `public/badges/`; the current registrar mapping supports CSS, HTML, Java, JavaScript, Python, and TypeScript. Special-template database badge filenames must match an existing SVG in `public/badges/` (currently `supabase.svg` and `neon.svg`). Fail clearly if required assets are missing; do not fall back to external badge services.
- The gallery only lists records in `data/templates.json`. Adding an image alone does not register a template.

## CLI and GitHub publishing limitations

- Do not describe `template_registrar.py` as a standalone CLI. For the UI, use `python3 run_template_registrar.py` from the repository root. For a no-UI workflow, call `next_template_name()` and `register_template()` from a Python script; document a concrete example in `README.md`.
- The current `commit_and_push()` implementation submits only `data/templates.json` and the selected screenshot. It does **not** submit the generated framework badge, so the UI's GitHub push option cannot publish a complete registration. Do not claim that this path deploys a working gallery entry; direct users to save locally and have an authorized maintainer review and publish all required files, or update and test the implementation before enabling that flow.
- If changing GitHub publishing, preserve its repository restriction to `Ex2-Axon/micro-gallery`, branch/metadata conflict checks, duplicate-screenshot protection, and explicit error reporting. Never expand the destination or weaken those checks without authorization.
- GitHub credentials belong only in the ignored `python-tools/.env.local`. Never put credentials in code, docs, commands, logs, tests, or chat. Do not print or inspect the local file.

## Change and validation rules

- Make focused changes and preserve existing local assets and user data. Never overwrite an existing screenshot or a conflicting shared framework badge.
- Update this guide and the Thai `README.md` when command names, workflow steps, supported languages/badges, output files, or publishing behavior changes.
- Add or update tests for registrar behavior. Run `python3 -m unittest discover -s python-tools -p 'test_*.py'` from the repository root and check Python syntax with `python3 -m py_compile python-tools/template_registrar.py python-tools/template_registrar_ui.py`.
- Do not report a GitHub push or deployment as successful unless the tool returns a commit SHA and the deployed URL has been checked.
