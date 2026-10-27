# Repository-specific guide: Axon Template Gallery

Read this section alongside the general guidance below. When instructions conflict with the actual repository setup, use `package.json`, `pnpm-lock.yaml`, and the current source as factual references; do not assume framework versions or files from generic examples.

## Application map

- This is a root-level Next.js App Router application. Routes are `app/page.tsx` (`/`), `app/pricing/page.tsx` (`/pricing`), and `app/template/[slug]/page.tsx` (`/template/[slug]`).
- `app/TemplateGallery.tsx` is the interactive client component for search and 12-item pagination. The route pages and root layout are server-rendered.
- `data/templates.ts` builds the gallery exclusively from explicit metadata in `data/templates.json`; image files in `public/` do not create gallery entries by themselves. `data/config.ts` holds shared pricing and external-link constants.
- The detail routes are statically generated from the configured template list. No database, authentication system, or application API is currently used.
- `next.config.ts` allows the `127.0.0.1` development origin; preserve this unless the local development setup changes and the pagination/image hydration issue is retested.

## Template content workflow

- Add each template explicitly to `data/templates.json`, including its name, demo URL, and screenshot path. The referenced image still needs to exist in `public/`; unlisted images are not shown in the gallery.
- Use these sale-price and database defaults when adding a template: `x-template-special-...` is 5,000 baht and uses a database; otherwise `x-template-next-...` is 3,500 baht with no database; other `x-template-...` entries are 2,500 baht with no database. Apply the special prefix rule before the general `x-template-...` rule. The category does not identify the database product; record its name only after verification.
- Before publishing a template, provide and verify its metadata: framework/technologies used (including framework version), programming languages, whether it uses a database and which one, source repository, deployment platform and deployed URL, sale price and currency, screenshot image, screenshot path in the project, and a brief description. Store screenshot images under `public/` and record their exact public path (for example, `/x-template-001.png`) in the template metadata. Do not infer or invent missing details; confirm them before publishing the template.
- Template metadata is loaded by the server-side data module during build/rendering, not by a live upload or background watcher. Rebuild/redeploy to publish new entries and generated detail routes.
- Keep the gallery page size at 12 unless the product requirement changes. Search is over the full template list, while pagination is applied to the filtered results.

## Template technology badges

- Every template card for a template offered for sale must show badges for its actual framework, programming languages, and database (if it uses one). Do not infer a template's stack from the gallery application's own dependencies.
- Store badge SVG assets inside `public/badges/` and reference them with `/badges/...` paths in template metadata. Never use an external badge service or CDN.
- Framework badges must visibly include the verified framework version. The registrar creates a template-specific local SVG from the framework mark; check the template's own package/configuration files before entering its version.
- Use a local language badge that matches each verified language. The registrar currently supports CSS, HTML, Java, JavaScript, Python, and TypeScript; add and verify the corresponding local asset before extending that list.
- Use locally stored Font Awesome brand SVGs when an icon is available; create and store a project-local SVG mark for requested brands that Font Awesome does not provide.
- Add a database badge only when the template actually uses a database, and use an existing local asset that identifies the verified database product. Do not show a database badge when there is no database.
- Keep each template's badge metadata with that template's explicit metadata, and render its badges consistently on the template cards.

## Dependency and validation policy

- Use `pnpm` for package operations. `package.json` declares dependency ranges; `pnpm-lock.yaml` records the exact resolved versions. Do not hardcode version claims in docs or source independently of these files.
- Keep `next` and `eslint-config-next` aligned. Check peer compatibility before major upgrades and run `pnpm lint`, `pnpm exec tsc --noEmit`, and `pnpm build` after dependency or application changes.
- Do not add dependencies unless the feature requires them. In particular, do not assume Framer Motion or Lucide React is installed; inspect the manifest first.
- Follow the global architecture and styling constraints below when writing new UI. Do not claim existing pages already implement global requirements (such as cookie consent or footer links) unless verified in the current source.

# AI AGENTS RULES & GUIDELINES FOR NEXT.JS 16

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

----------------------------------------------------------------------------------------

# FOR USER ONLY
<!-- BEGIN : USER-REQUEST -->
# Copy the prompt below EN Version for AI Assistant:

```
> **Role & Objective:**
> You are a Senior Front-end Developer. Your task is to generate complete, production-ready, clean, and well-structured website UI code based on the provided Context.
> **Technical Stack & Version Constraints:**
> You must strictly adhere to the following technical constraints and decline using outdated versions or methods:
> * **Framework:** Use the version declared in `package.json` and resolved by `pnpm-lock.yaml`.
> * **Architecture:** Must use the **App Router** structure. **DO NOT use the legacy `src/` directory** or `src/pages/`. All files must reside directly within the root `app/` directory (e.g., `app/page.tsx`, `app/layout.tsx`).
> * **Language:** TypeScript (`.tsx`). Ensure strict typing and **avoid using `any**`.
> * **Styling:** Use the Tailwind CSS version declared in `package.json` and write utilities for that version.
> * **Typography & Fonts:** **DO NOT use external fonts from a CDN.** If custom fonts are needed, they must be downloaded/imported locally or managed via `next/font/google`.
> * **Animation:** Prefer CSS or browser APIs already available; add an animation dependency only for a concrete requirement.
> * **Icons:** Reuse existing project assets or installed packages; do not add an icon dependency without a concrete need.
> 
> * **Package Manager:** Use pnpm exclusively for any dependency installation (e.g., `pnpm add framer-motion lucide-react`). Do not use npm or yarn.
> 
> **Global Component Requirement:**
> * Every time you generate this page, you **MUST automatically include a "Cookie Banner" (Cookie Notice)** fixed at the bottom of the viewport (`position: fixed; bottom: 0;`).
> * The Cookie Banner must include: Privacy notice text, a 'Cookies Settings' button, a 'Reject All' button, and an 'Accept All' button. Include a simple state/logic to dismiss the banner when an action is clicked.
> * This is a project UI requirement, not a claim of GDPR/PDPA compliance. Confirm the actual storage and trackers before describing consent categories. Any optional tracker must stay disabled until the privacy owner approves the notice and the user's saved choice gates its loading.
> 
> 
> **UI/UX & Code Quality:**
> * Fully responsive design using a Mobile-First approach (looks seamless on Mobile, Tablet, and Desktop).
> * Properly segregate Server Components and Client Components (`"use client"`) according to Next.js 16 architecture.
> * Provide clean, self-contained code or clearly separated component structures.
> * **Theming & Styling Standards (Tailwind CSS v4):**
>   * **No Hardcoded Colors:** DO NOT use arbitrary colors (e.g., `bg-[#ffffff]`, `text-[#121212]`) in components.
>   * **Single Source of Truth:** All colors and tokens must be defined in `app/globals.css` using `@theme` and custom CSS variables.
>   * **Semantic Utilities:** Use tailwind utility classes corresponding to theme colors (`bg-primary`, `bg-background`, `text-foreground`, etc.).
> 
> 
> ---
> 
> 
> **Prompt Context (The UI content/requirements you want the AI to build):**
> [Insert your specific website content, page requirements, or wireframe descriptions here. For example: A landing page for a SaaS platform containing a Hero section, Feature grid, and Pricing table.]
```

---

# 📝 ก๊อปปี้ข้อความส่วนนี้ไปสั่ง AI TH V

[ใส่รายละเอียด หรือเนื้อหาของหน้าเว็บที่คุณต้องการให้ AI สร้าง ตรงนี้ได้เลยครับ เช่น: หน้า Landing Page สำหรับขายคอร์สออนไลน์ มีส่วน Hero, Features, และ Pricing]

```
**Role & Objective:**
คุณคือผู้เชี่ยวชาญด้าน Front-end Developer ระดับ Senior ให้คุณช่วยสร้างหน้า UI ใหม่ตามรายละเอียด Context ที่กำหนดให้ด้านล่าง โดยต้องเขียนโค้ดที่มีความสมบูรณ์แบบ (Production-ready) สะอาด และเป็นระเบียบ

**Technical Stack & Version Constraints:**
คุณต้องปฏิเสธการใช้เวอร์ชันเก่า และเขียนโค้ดภายใต้เงื่อนไขทางเทคนิคเหล่านี้อย่างเคร่งครัด:
* **Framework:** ใช้เวอร์ชันที่ระบุใน `package.json` และเวอร์ชันที่ resolve ไว้ใน `pnpm-lock.yaml`
* **Architecture:** ใช้โครงสร้าง **App Router** เท่านั้น (ห้ามใช้โครงสร้างโฟลเดอร์เก่าอย่าง `src/pages` หรือ `pages/` และ**ห้ามสร้างโฟลเดอร์ `src/**` ให้ใช้ Root App Router โดยตรง)
* **Language:** TypeScript (`.tsx`) ระบุ Type ให้ชัดเจน ห้ามใช้ `any`
* **Styling:** ใช้ Tailwind CSS ตามเวอร์ชันใน `package.json` และเขียน Utility Classes ให้ตรงกับเวอร์ชันนั้น
* **Typography & Fonts:** **ห้ามใช้ Font จาก CDN เด็ดขาด** หากมีการใช้ Custom Font ให้เขียนโค้ดในลักษณะของการ Import/Download เข้ามาในโครงการผ่าน `next/font/google` หรือ Local Font เท่านั้น
* **Animation:** ใช้ CSS หรือ browser APIs ที่มีอยู่ก่อน เพิ่ม dependency เมื่อมีความต้องการเฉพาะที่ชัดเจน
* **Icons:** ใช้ assets หรือ packages ที่มีอยู่แล้ว ไม่เพิ่ม icon dependency หากไม่มีความจำเป็นที่ยืนยันได้

* **Package Manager:** ใช้ pnpm เป็นหลักเท่านั้น (หากมีการแนะนำคำสั่ง Terminal หรือขั้นตอนการติดตั้ง Dependency เช่น การติดตั้ง framer-motion หรือ lucide-react ต้องใช้คำสั่ง pnpm add ห้ามใช้ npm หรือ yarn เด็ดขาด)

**Global Component Requirement:**
* ทุกครั้งที่เจเนอเรตหน้าเพจนี้ คุณต้องใส่โครงสร้าง **Cookie Banner (Cookie Notice)** ไว้ที่ส่วนล่างสุดของหน้าจอเสมอ (Fixed Bottom) ซึ่งประกอบไปด้วย ข้อความแจ้งเตือนความเป็นส่วนตัว, ปุ่ม 'Cookies Settings', ปุ่ม 'Reject All', และปุ่ม 'Accept All' พร้อมใส่ Logic การกดปิดแบนเนอร์เบื้องต้นด้วย

**UI/UX & Code Quality:**
* รองรับ Responsive Design (Mobile First) แสดงผลสมบูรณ์แบบทั้งบนสมาร์ตโฟน แท็บเล็ต และเดสก์ท็อป
* แยก Client Component (`"use client"`) และ Server Component อย่างเหมาะสมตามสถาปัตยกรรมของ Next.js 16
* เขียนโค้ดรวมมาในไฟล์ที่พร้อมใช้งาน หรือแยก Component ย่อยให้ชัดเจนเข้าใจง่าย
* **มาตรฐานการกำหนด Theme และ CSS (Tailwind CSS v4):**
  * **ห้ามใช้สี Hardcoded/Arbitrary:** ห้ามเขียนค่าสีเองใน Class เช่น `bg-[#ffffff]` หรือ `text-[#121212]` หรือระบุ Hex/RGB ใน Code โดยตรง
  * **จุดรวมศูนย์กลางของ Theme (Single Source of Truth):** กำหนดสีหลัก สีรอง สีพื้นหลัง และสีข้อความทั้งหมดผ่านไฟล์ `app/globals.css` โดยใช้ `@theme` และ CSS Variables
  * **เรียกใช้ผ่าน Semantic Class:** ใช้ Class สำเร็จรูปที่ดึงจาก Theme เสมอ (เช่น `bg-primary`, `bg-background`, `text-foreground`) เพื่อให้แก้ไขสีที่ globals.css ที่เดียวแล้วมีผลทั้งระบบ

**Prompt Context (รายละเอียดหน้า UI ที่ต้องการให้สร้าง):**
[ใส่รายละเอียด หรือเนื้อหาของหน้าเว็บที่คุณต้องการให้ AI สร้าง ตรงนี้ได้เลยครับ เช่น: หน้า Landing Page สำหรับขายคอร์สออนไลน์ มีส่วน Hero, Features, และ Pricing]
```
---

<!-- MIDDLEWARE-USER-RULES TH -->
# Next.js Architecture Rule: ห้ามใช้ Middleware และใช้ Proxy เท่านั้น

ไม่อนุญาตให้ใช้ไฟล์ `middleware.ts` หรือ `middleware.js` ในโปรเจ็กต์โดยเด็ดขาด การทำ Request Interception, การ Rewrite/Redirect เส้นทาง (Route), หรือการจัดการ Header/Cookie ให้เปลี่ยนไปใช้ไฟล์ `proxy.ts` (ตามมาตรฐาน Next.js) หรือใช้ฟีเจอร์ Rewrites ภายใน `next.config.js` แทน

## กฎที่ต้องปฏิบัติอย่างเคร่งครัด:
1. **ห้ามสร้างหรือใช้ไฟล์ middleware.ts/js** หากพบโค้ดเดิม ให้ทำการ Refactor เป็น Proxy ทันที
2. **ใช้ไฟล์ proxy.ts แทน** สำหรับการดักจับ Request และจัดการ Headers, Cookies หรือการ Redirect
3. **หลีกเลี่ยงการทำ Authentication ใน Proxy** การตรวจสอบสิทธิ์ (Auth) ควรทำที่ระดับ Data Access Layer หรือภายใน Server Components/Route Handlers โดยตรง แทนการทำที่ขอบเขตของเครือข่าย เพื่อป้องกันปัญหาความล่าช้า (Latency)
4. **ใช้ next.config.js สำหรับ static redirects** หากเป็นเพียงแค่ Redirect/Rewrite แบบคงที่ ให้ใช้ฟังก์ชัน `redirects` หรือ `rewrites` ใน `next.config.js` เท่านั้น เพื่อประสิทธิภาพสูงสุด
5. **อย่าสร้างไฟล์/แก้ไขเอง** หรือ สร้างอะไรเองโดยไม่ได้สั่ง

---
