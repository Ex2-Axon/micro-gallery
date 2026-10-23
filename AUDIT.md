# Micro-Gallery Audit

**วันที่ตรวจ:** 2026-10-23
**Repository:** `Micro-Gallery`
**วัตถุประสงค์:** ตรวจความพร้อมของแอปปัจจุบันเพื่อใช้เป็นฐานสำหรับแนวทางธุรกิจที่พักขนาดเล็กตาม `microtronic.biz/docs/2.Galley-Template.md`
**ขอบเขต:** อ่าน source, project guidance, package manifest, template data และรัน lint, type-check, production build
**ข้อจำกัด:** เป็นการตรวจ repository และ build ในเครื่อง ไม่ใช่การทดสอบ penetration, ตรวจ production deployment, ยืนยันสิทธิ์ทางกฎหมาย หรือสัมภาษณ์ตลาด

## สรุป

**ผล: ยังไม่พร้อมนำไปเสนอขายเป็นผลิตภัณฑ์เว็บไซต์ที่พักโดยตรง**
โค้ดปัจจุบันเป็นแคตตาล็อก Axon Template ทั่วไป ไม่ใช่เว็บไซต์สำหรับที่พักหรือระบบจอง จุดที่ต้องแก้ก่อนเริ่ม pilot ได้แก่ build gate จาก Next.js security advisory, ขอบเขตผลิตภัณฑ์ที่ยังไม่รองรับเนื้อหาที่พัก, ข้อความเทคโนโลยีที่ต้องยืนยัน และข้อกำหนดส่วนกลางด้าน cookie/legal/footer

## Findings

### MG-01 — Production build ถูกหยุดจากคำเตือนช่องโหว่ Next.js

- **ความสำคัญ:** สูง — เป็น release/build gate
- **หลักฐาน:** `package.json` กำหนด Next.js `16.4.0`; `pnpm build` compile และสร้าง static pages ได้ แต่จบด้วย `SecurityFatalError` แจ้งว่าเวอร์ชันได้รับผลจาก known security vulnerability และแนะนำให้อัปเกรด
- **ผลกระทบ:** การ build สำหรับ production ไม่จบเป็น success ณ เวลาตรวจ
- **แนวทาง:** ตรวจคำแนะนำอัปเกรดจาก Next.js และ lockfile; ทำใน branch/worktree แยกและรันทดสอบครบก่อน merge/deploy
- **หมายเหตุ:** รายงานนี้ไม่ระบุ CVE หรือผลกระทบเฉพาะที่ไม่ได้แสดงในผล build และไม่ได้รันคำสั่งอัปเกรด

#### สถานะการแก้ไข (2026-10-23)

- อัปเกรด `next` และ `eslint-config-next` จาก `16.4.0` เป็น `16.4.2` ใน branch `security/next-upgrade-20261023` ที่ worktree แยก
- ตั้งค่า `experimental.agentUpgrade` เป็น `security`
- `pnpm install --frozen-lockfile`, `pnpm lint`, `pnpm exec tsc --noEmit` และ `pnpm build` ผ่าน; build สร้าง route แบบ static/SSG ได้สำเร็จ
- Commit: `8085a2b` (`fix: upgrade Next.js 16.4.0 to 16.4.2 for security`)
- **ยังไม่ merge หรือ deploy**; ต้อง review และอนุมัติก่อนนำขึ้น branch หลัก
- ตรวจ GitHub PR ซ้ำไม่ได้ เพราะ `gh` CLI ยังไม่มี authentication ใน environment นี้

### MG-02 — แอปปัจจุบันยังเป็น template catalog ไม่ใช่ชุดเว็บไซต์ที่พัก

- **ความสำคัญ:** สูง — ความเหมาะสมของผลิตภัณฑ์
- **หลักฐาน:** `app/page.tsx` ใช้ชื่อ Axon Template Gallery; `data/templates.json` มีรายการที่กำหนด 63 รายการ โดยส่วนใหญ่ใช้ชื่อ `x-template-*`; `data/templates.ts` รวมข้อมูล JSON กับการค้นพบภาพใน `public/`
- **ผลกระทบ:** ยังไม่มีเนื้อหาที่พักแบบมีโครงสร้าง เช่น ที่พัก ห้องพัก สิ่งอำนวยความสะดวก ที่ตั้ง หรือช่องทางติดต่อรายกิจการ
- **แนวทาง:** แยกข้อเสนอ “เว็บแคตตาล็อกเทมเพลต” กับ “บริการทำเว็บไซต์สำหรับที่พัก”; คัดเลือกและทดสอบ demo/เนื้อหาที่พักก่อนอ้างว่าเป็น lodging template

### MG-03 — ไม่มี workflow สอบถาม/จองหรือ backend สำหรับข้อมูลที่พัก

- **ความสำคัญ:** สูง — ต้องกำหนดขอบเขตบริการ
- **หลักฐาน:** repository ไม่มี app API, database หรือ authentication ตาม `README.md` และ project map; source ที่ตรวจไม่พบฟอร์มสอบถามจองหรือข้อมูล availability
- **ผลกระทบ:** การติดต่อหรือการจองยังไม่ใช่ความสามารถของแอปนี้; หน้า pricing และปุ่มสั่งซื้อไม่ใช่หลักฐานว่ามีระบบจองห้องพัก
- **แนวทาง:** รุ่นแรกควรกำหนดให้ชัดว่าจะเป็นเว็บนำเสนอที่พักพร้อมลิงก์โทร/LINE หรือจะรับคำขอจอง; อย่าเก็บข้อมูลผู้เข้าพักจนกว่าจะกำหนด privacy, consent, access, retention และ security แล้ว

### MG-04 — ข้อความ stack ของเทมเพลตยังไม่มีข้อมูลยืนยันรายรายการ

- **ความสำคัญ:** สูง — ความถูกต้องของข้อความขาย
- **หลักฐาน:** `app/template/[slug]/page.tsx` แสดงข้อความ “ความเร็วสูงด้วย Vite 8 และ Tailwind CSS 4”; `package.json` ของ repository กำหนด Next.js
- **ผลกระทบ:** ข้อความเดียวกันถูกแสดงกับทุกรายการ ทั้งที่ข้อมูลต้นทางไม่มี stack ราย template; ยังสรุปไม่ได้ว่า Vite 8 ถูกต้องสำหรับ demo ทุกตัวหรือไม่
- **แนวทาง:** ตรวจ stack ของ demo แต่ละรายการจาก source จริง แล้วแสดงข้อมูลราย template หรือเอาข้อความ Vite ออกเมื่อยืนยันไม่ได้

### MG-05 — ไม่มี Cookie Banner ตาม project guidance

- **ความสำคัญ:** ปานกลาง — ข้อกำหนดผลิตภัณฑ์/กฎหมายต้องทบทวน
- **หลักฐาน:** `AGENTS.md` กำหนด Cookie Banner แบบ fixed bottom พร้อม Settings, Reject All, Accept All และปิดได้; ค้นหาใน `app/` แล้วไม่พบ cookie banner หรือ consent controls
- **ผลกระทบ:** ไม่เป็นไปตามคำแนะนำใน repository
- **แนวทาง:** สำรวจ cookies/trackers ที่ใช้งานจริงและให้ผู้รับผิดชอบ privacy ยืนยันข้อความ/หมวด consent ก่อนทำ banner; ปุ่มต้องบันทึกตัวเลือกจริง ไม่ใช่เพียงซ่อน UI

### MG-06 — Footer และช่องทางกลางยังไม่ครบ/ไม่สอดคล้องกับ guidance

- **ความสำคัญ:** ปานกลาง
- **หลักฐาน:** footers ใน `app/page.tsx`, `app/pricing/page.tsx` และ `app/template/[slug]/page.tsx` มี Privacy Policy และ official website แต่ไม่มีข้อความ `Powered by Microtronic © 2026 Microtronic Co., Ltd.`; ไม่พบ Terms of Service หรือ social/contact links ครบตาม `AGENTS.md`; หน้าแรกไม่มี Payment link ที่ navbar/hero; `data/config.ts` ใช้ Discord URL ต่างจาก URL ใน `AGENTS.md`
- **ผลกระทบ:** ข้อมูลตามนโยบายเว็บไม่สม่ำเสมอและช่องทางติดต่อ/ชำระเงินอาจชี้ไปคนละที่
- **แนวทาง:** ยืนยัน URL ทางการ แล้วทำ shared footer และ shared link constants; เพิ่ม Terms และช่องทางที่อนุมัติ โดยหลีกเลี่ยงการแสดงช่องทางที่ยังไม่ยืนยัน

### MG-07 — ภาษาเอกสาร HTML และ metadata ยังไม่ตรงกับเนื้อหาไทย/ตลาดที่พัก

- **ความสำคัญ:** ปานกลาง
- **หลักฐาน:** `app/layout.tsx` กำหนด `lang="en"` แต่ข้อความหลักบนหน้าเป็นภาษาไทย; metadata เป็นชื่อและคำอธิบายทั่วไปของ Axon Template Gallery; หน้า detail ไม่มี metadata เฉพาะรายการ
- **ผลกระทบ:** ข้อมูลภาษาและผลค้นหาไม่สื่อบริบทของหน้าหรือที่พักรายแห่งอย่างเหมาะสม
- **แนวทาง:** กำหนดภาษาให้ตรงเนื้อหาจริง และสร้าง metadata รายหน้าจากข้อมูลที่พักที่เจ้าของอนุมัติ; ห้ามรับรองอันดับ SEO

### MG-08 — คำสั่ง agent มีเวอร์ชันตายตัวที่ไม่ตรงกับ manifest

- **ความสำคัญ:** ปานกลาง — เสี่ยงให้ผู้พัฒนาติดตั้ง dependency โดยไม่จำเป็น
- **หลักฐาน:** `AGENTS.md` ยกตัวอย่าง Next.js `16.2.7`, Framer Motion `^12.40.0`, Lucide React `^1.17.0`; `package.json` ปัจจุบันใช้ Next.js `16.4.0` และไม่มี Framer Motion/Lucide React; `GALLERY_RULES.md` ระบุให้ manifest/lockfile เป็นแหล่งจริงและหลีกเลี่ยง dependency ที่ไม่จำเป็น
- **ผลกระทบ:** คำแนะนำขัดแย้งกันและอาจชักนำให้อัปเกรด/เพิ่มแพ็กเกจโดยไม่มีความจำเป็น
- **แนวทาง:** ทำให้คำแนะนำทั่วไปยึด package manifest/lockfile และลบ version pin ที่ไม่ใช่ข้อกำหนดจริง

### MG-09 — Search field ไม่มี accessible label และการ์ดภายในเปิดแท็บใหม่

- **ความสำคัญ:** ต่ำ
- **หลักฐาน:** `app/TemplateGallery.tsx` มี input ที่ใช้ placeholder อย่างเดียว และ Link ภายในไปหน้า detail กำหนด `target="_blank"`
- **ผลกระทบ:** ผู้ใช้ screen reader อาจไม่พบชื่อช่องค้นหา และพฤติกรรมเปิดแท็บใหม่อาจไม่คาดคิด
- **แนวทาง:** เพิ่ม label ที่เข้าถึงได้และเปิดเส้นทางภายในในแท็บเดิม เว้นแต่มี requirement ระบุเป็นอย่างอื่น

### MG-10 — ไม่มี test script เฉพาะใน package manifest

- **ความสำคัญ:** ต่ำถึงปานกลาง
- **หลักฐาน:** `package.json` มี `lint`, `build`, `start`, `dev` แต่ไม่มี `test`; มี Playwright เป็น dev dependency แต่ไม่พบชุดทดสอบที่ผูกกับ script
- **ผลกระทบ:** ไม่มี automated regression test ที่เรียกด้วยคำสั่งมาตรฐานของโครงการ
- **แนวทาง:** เพิ่ม smoke/e2e checks สำหรับ route หลัก, search, pagination และรายละเอียดเทมเพลต หลังกำหนดเกณฑ์และสภาพแวดล้อมทดสอบ

## ผลการตรวจคำสั่ง

| คำสั่ง | ผล |
|---|---|
| `pnpm lint` | ผ่าน (ตรวจซ้ำ 2026-10-24 หลังปรับโค้ด) |
| `pnpm exec tsc --noEmit` | ผ่าน (ตรวจซ้ำ 2026-10-24 หลังปรับโค้ด) |
| `pnpm build` | ผ่านบน Next.js `16.4.2`; สร้าง route แบบ static/SSG สำเร็จ (2026-10-24) |
| `pnpm test` | ผ่าน Playwright smoke tests 6 รายการ: search/detail, pagination, payment/contact/legal links และ cookie preference (2026-10-24) |

## สถานะหลังปรับปรุง (2026-10-24)

| Finding | สถานะใน main worktree |
|---|---|
| MG-01 | ใช้ Next.js และ eslint-config-next `16.4.2` พร้อม `experimental.agentUpgrade: "security"`; lint, type-check และ build ผ่าน แต่ยังไม่ deploy |
| MG-02–MG-03 | ยังเป็น Axon template catalog; ยังไม่มี product discovery, ขอบเขตบริการที่พัก หรือระบบจอง |
| MG-04 | เอาคำอ้าง Vite/Tailwind แบบเหมารวมออกจากหน้า detail; เจ้าของยืนยันราคา 2,500 บาทสำหรับซื้อไปพัฒนาต่อเองและไม่มีบริการหลังการขาย จึงลบ tier/claim 0 และ 5,000 บาทที่ยังไม่ยืนยัน; demo URL, license และสิทธิ์ใช้ภาพยังต้องตรวจ |
| MG-05 | เพิ่ม cookie notice ที่จดจำ Accept/Reject/Dismiss ใน versioned localStorage; source ปัจจุบันไม่มี analytics/advertising tracker. ยังไม่ใช่การรับรองทางกฎหมาย และต้องทบทวนก่อนเพิ่ม tracker |
| MG-06 | ใช้ shared footer และค่าลิงก์ตาม `AGENTS.md`; เพิ่ม Privacy, Terms, Payment, social/contact, Powered by และ official website |
| MG-07 | เปลี่ยนเอกสารเป็นภาษาไทยและเพิ่ม metadata ราย template จากชื่อ/ลิงก์เดโมที่มีในข้อมูล |
| MG-08 | แก้ version pin ของ Next/Tailwind/Framer Motion/Lucide ในตัวอย่าง agent ให้ยึด manifest/lockfile และไม่เพิ่ม dependency โดยไม่มีเหตุผล |
| MG-09 | เพิ่ม label ให้ search, เปิด detail ในแท็บเดิม, live result count และ focus states |
| MG-10 | เพิ่ม `pnpm test` พร้อม Playwright smoke tests 6 รายการ |

การปรับปรุงข้างต้นเป็นการแก้ source ใน worktree เท่านั้น ไม่ใช่การอนุมัติขาย/เปิด pilot และไม่ยืนยันราคา ใบอนุญาต ความถูกต้องของลิงก์เดโม หรือข้อกฎหมาย

## ข้อเสนอการจัดลำดับ

1. **MG-01 remediation ผ่าน build ใน main worktree แล้ว**; review และอนุมัติก่อน deploy
2. ตัดสินใจ product scope และผ่าน market discovery ก่อนรับ pilot (MG-02, MG-03)
3. ยืนยันข้อความขายและช่องทางกฎหมาย/ติดต่อ (MG-04 ถึง MG-08)
4. ปรับ accessibility และเพิ่ม regression checks (MG-09, MG-10)

รายละเอียดงาน เกณฑ์รับมอบ และ dependency อยู่ใน [IMPROVEMENT-PLAN.md](./IMPROVEMENT-PLAN.md)
