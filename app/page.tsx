import Link from "next/link";
import { templates } from "../data/templates";
import { PAYMENT_URL, PRICE, PRICE_FORMATTER } from "../data/config";
import Footer from "./ui/Footer";
import TemplateGallery from "./TemplateGallery";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <main id="main-content" className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-10 rounded-[2rem] border border-slate-200 bg-white/95 p-8 shadow-sm shadow-slate-200/50 backdrop-blur-xl">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-slate-500 font-bold">Axon Template Gallery</p>
              <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
                เลือกเทมเพลตที่ใช่สำหรับธุรกิจของคุณ
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
                คลิกเพื่อเปิดหน้ารายละเอียดและลิงก์เดโมของแต่ละเทมเพลต ดูราคาและเงื่อนไขการซื้อที่หน้า{" "}
                <Link href="/pricing" className="font-semibold text-slate-900 underline decoration-slate-300 underline-offset-4 hover:decoration-slate-900">
                  ข้อตกลงและราคา
                </Link>
              </p>
            </div>
            <div className="flex flex-col items-end gap-2">
              <a
                href={PAYMENT_URL}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-600 transition hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900"
              >
                Micro Donate &amp; Payment
              </a>
              <div className="rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white">
                เริ่มต้น: {PRICE_FORMATTER.format(PRICE)} บาท
              </div>
              <Link href="/pricing" className="text-xs font-medium text-slate-500 hover:text-slate-900">
                ดูแพ็กเกจทั้งหมด →
              </Link>
            </div>
          </div>
        </div>
        
        <section className="mb-8 grid gap-4 sm:grid-cols-2">
          <a
            href="https://ex2-axon.github.io/x-template-html000/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Download HTML5 Free Template"
            className="transform rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition hover:scale-[1.02] hover:shadow-md"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold text-slate-900">HTML5 Free Template — ดาวน์โหลดฟรี</h3>
                <p className="mt-2 text-sm text-slate-600">
                  เลือกและดาวน์โหลด HTML5 template ที่ออกแบบมาให้โหลดเร็ว รองรับมือถือ และปรับแต่งง่าย เหมาะสำหรับโปรเจคเริ่มต้น
                  — ใช้เป็นฐานสำหรับเว็บไซต์ธุรกิจ, พอร์ตโฟลิโอ หรือหน้า Landing Page.
                </p>
                <p className="mt-3 text-xs font-medium text-slate-500">SEO keywords: HTML5 template, free download, responsive, fast</p>
              </div>
              <div className="ml-4 flex-shrink-0 text-sm text-slate-400">Free ↗</div>
            </div>
          </a>

          <a
            href="https://x-template-next16-000.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View Next.js Template Demo"
            className="transform rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition hover:scale-[1.02] hover:shadow-md"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold text-slate-900">Next.js Template Showcase — ดูผลงานและ Deploy</h3>
                <p className="mt-2 text-sm text-slate-600">
                  ดูตัวอย่างเทมเพลต Next.js (App Router, TypeScript, Tailwind) พร้อมคู่มือการ Deploy ขึ้น Vercel — เหมาะสำหรับโปรเจคที่ต้องการความทันสมัยและ SEO-friendly.
                </p>
                <p className="mt-3 text-xs font-medium text-slate-500">SEO keywords: Next.js template, App Router, deploy Vercel, TypeScript, Tailwind</p>
              </div>
              <div className="ml-4 flex shrink-0 text-sm text-slate-400">Demo ↗</div>
            </div>
          </a>
        </section>

        <TemplateGallery initialTemplates={templates} />
      </main>

      <Footer />
    </div>
  );
}
