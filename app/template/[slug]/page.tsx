import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { templates } from "../../../data/templates";
import { PRICE, PRIVACY_POLICY_URL, COMPANY_URL, COMPANY_NAME, PAYMENT_URL } from "../../../data/config";

export function generateStaticParams() {
  return templates.map((template) => ({ slug: template.name }));
}

export default async function TemplatePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const template = templates.find((item) => item.name === slug);

  if (!template) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <main className="mx-auto flex min-h-screen max-w-7xl flex-col px-4 py-8 sm:px-6 lg:px-8">
        {/* Navigation Bar */}
        <div className="mb-6 flex items-center justify-between rounded-3xl border border-slate-200 bg-white/80 p-4 shadow-sm backdrop-blur-md sm:p-6">
          <Link
            href="/"
            className="group flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-slate-900"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:-translate-x-1"><path d="m15 18-6-6 6-6"/></svg>
            กลับสู่หน้าหลัก
          </Link>
          <div className="flex gap-3">
            <a
              href={template?.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-slate-900 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 active:scale-95"
            >
              ดูตัวอย่างเว็บจริง
            </a>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-12">
          {/* Main Content Area */}
          <div className="space-y-8 lg:col-span-8">
            <div className="overflow-hidden rounded-[2.5rem] border border-slate-200 bg-white shadow-sm transition-all hover:shadow-md">
              <div className="p-1">
                {template?.image ? (
                  <div className="relative aspect-video w-full overflow-hidden rounded-[2.25rem]">
                    <Image
                      src={template.image}
                      alt={template.name}
                      fill
                      priority
                      className="object-cover object-top"
                    />
                  </div>
                ) : (
                  <div className="flex aspect-video w-full items-center justify-center rounded-[2.25rem] bg-slate-100 text-slate-400">
                    ไม่มีรูปตัวอย่าง
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar Area */}
          <div className="space-y-6 lg:col-span-4">
            <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Template ID</p>
              <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
                {template?.name}
              </h1>
              
              <div className="mt-8 space-y-6">
                <div className="rounded-2xl bg-slate-50 p-6">
                  <p className="text-sm font-medium text-slate-500">ราคาเริ่มต้น</p>
                  <div className="mt-1 flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-slate-900">{PRICE.toLocaleString()}</span>
                    <span className="text-lg font-medium text-slate-500">บาท</span>
                  </div>
                  <Link href="/pricing" className="mt-2 block text-xs font-medium text-slate-500 hover:text-slate-900 underline">
                    ดูรายละเอียดแพ็กเกจและข้อตกลง →
                  </Link>
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">รายละเอียด</h3>
                  <ul className="space-y-3 text-sm text-slate-600">
                    <li className="flex gap-3">
                      <svg className="h-5 w-5 shrink-0 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg>
                      ดีไซน์ทันสมัย รองรับมือถือ (Mobile First)
                    </li>
                    <li className="flex gap-3">
                      <svg className="h-5 w-5 shrink-0 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg>
                      ความเร็วสูงด้วย Vite 8 และ Tailwind CSS 4
                    </li>
                    <li className="flex gap-3">
                      <svg className="h-5 w-5 shrink-0 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg>
                      ปรับแต่งได้ง่ายตามต้องการ
                    </li>
                  </ul>
                </div>

                <div className="pt-4">
                  <p className="text-xs font-bold uppercase tracking-[0.15em] text-slate-400">Demo URL</p>
                  <a
                    href={template?.url}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-2 block truncate text-sm font-medium text-sky-600 hover:text-sky-500 hover:underline"
                  >
                    {template?.url}
                  </a>
                </div>

                <a
                  href={PAYMENT_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 flex w-full items-center justify-center rounded-2xl bg-slate-900 py-4 text-base font-bold text-white transition hover:bg-slate-800 active:scale-[0.98]"
                >
                  สั่งซื้อเทมเพลตนี้
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer className="border-t border-slate-200 bg-white py-10 text-center text-sm text-slate-600">
        <div className="mx-auto max-w-7xl px-4 flex flex-col items-center gap-4">
          <p className="flex items-center gap-2 font-medium">
            <span>🌐</span>
            <span className="uppercase tracking-wider">Official Website</span>
            <span>⭐</span>
            <a href={COMPANY_URL} target="_blank" rel="noreferrer" className="text-slate-900 underline decoration-slate-300 underline-offset-4 hover:decoration-slate-900">
              {COMPANY_URL}
            </a>
          </p>
          <div className="space-y-1">
            <p>© {new Date().getFullYear()} {COMPANY_NAME}</p>
            <div className="mt-2 flex justify-center gap-4">
              <a href={PRIVACY_POLICY_URL} target="_blank" rel="noreferrer" className="text-slate-500 hover:text-slate-900">
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
