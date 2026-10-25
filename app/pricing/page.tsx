import Link from "next/link";
import type { Metadata } from "next";
import {
  CONTACT_EMAIL,
  DISCORD_URL,
  PAYMENT_URL,
  PRICE_FORMATTER,
  PRICE,
  TEMPLATE_PRICES,
} from "../../data/config";
import Footer from "../ui/Footer";

export const metadata: Metadata = {
  title: "ราคาเทมเพลต",
  description: `ซื้อเทมเพลตในราคา ${PRICE_FORMATTER.format(PRICE)} บาทเพื่อนำไปพัฒนาต่อด้วยตนเอง ไม่มีบริการซัพพอร์ตหรือบริการหลังการขาย | Axon Template Gallery`,
  alternates: {
    canonical: "/pricing",
  },
  openGraph: {
    type: "website",
    locale: "th_TH",
    url: "https://gallery.microtronic.biz/pricing",
    siteName: "Axon Template Gallery",
    title: "ราคาเทมเพลต | Axon Template Gallery",
    description: `ซื้อเทมเพลตในราคา ${PRICE_FORMATTER.format(PRICE)} บาทเพื่อนำไปพัฒนาต่อด้วยตนเอง ไม่มีบริการซัพพอร์ตหรือบริการหลังการขาย`,
  },
  twitter: {
    card: "summary_large_image",
    title: "ราคาเทมเพลต | Axon Template Gallery",
    description: `ซื้อเทมเพลตในราคา ${PRICE_FORMATTER.format(PRICE)} บาทเพื่อนำไปพัฒนาต่อด้วยตนเอง ไม่มีบริการซัพพอร์ตหรือบริการหลังการขาย`,
  },
};

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gray-50 text-text-primary">
      <main id="main-content" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-text-secondary transition hover:text-text-primary"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            กลับสู่หน้าหลัก
          </Link>
          <h1 className="mt-6 text-4xl font-bold tracking-tight text-text-primary sm:text-5xl">
            ราคาเทมเพลต
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-text-secondary">
            ซื้อเทมเพลตเพื่อนำไปพัฒนาต่อด้วยตนเอง ไม่มีบริการซัพพอร์ตหรือบริการหลังการขาย
          </p>
        </div>

        <article className="mx-auto mt-16 flex w-full max-w-xl flex-col rounded-[2.5rem] border border-border bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-text-primary">ราคาเริ่มต้นตามประเภทเทมเพลต</h2>
          <dl className="mt-6 space-y-4">
            <div className="flex items-center justify-between gap-4 border-b border-border pb-4">
              <dt className="text-sm font-medium text-text-secondary">Vite · ไม่มีฐานข้อมูล</dt>
              <dd className="text-xl font-bold text-text-primary">{PRICE_FORMATTER.format(TEMPLATE_PRICES.vite)} บาท</dd>
            </div>
            <div className="flex items-center justify-between gap-4 border-b border-border pb-4">
              <dt className="text-sm font-medium text-text-secondary">Next.js · ไม่มีฐานข้อมูล</dt>
              <dd className="text-xl font-bold text-text-primary">{PRICE_FORMATTER.format(TEMPLATE_PRICES.next)} บาท</dd>
            </div>
            <div className="flex items-center justify-between gap-4">
              <dt className="text-sm font-medium text-text-secondary">Special · มีฐานข้อมูล</dt>
              <dd className="text-xl font-bold text-text-primary">{PRICE_FORMATTER.format(TEMPLATE_PRICES.special)} บาท</dd>
            </div>
          </dl>
          <ul className="mt-6 flex-1 space-y-3 text-sm leading-6 text-text-secondary">
            <li>ซื้อไปพัฒนาต่อด้วยตนเอง</li>
            <li>ไม่มีบริการซัพพอร์ตหรือบริการหลังการขาย</li>
            <li>โปรดตรวจสอบใบอนุญาตและเงื่อนไขของเทมเพลตแต่ละรายการก่อนใช้งาน</li>
          </ul>
          <a
            href={PAYMENT_URL}
            target="_blank"
            rel="noreferrer"
            className="mt-8 flex w-full items-center justify-center rounded-2xl bg-text-primary py-4 text-base font-bold text-white transition hover:bg-gray-800 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-text-primary focus-visible:ring-offset-2"
          >
            ไปที่หน้าชำระเงิน
          </a>
        </article>

        <div className="mt-16 rounded-[2.5rem] bg-slate-900 p-8 text-center text-white sm:p-12">
          <h2 className="text-2xl font-bold sm:text-3xl">สอบถามก่อนชำระเงิน</h2>
          <p className="mt-4 text-slate-400">
            หากต้องการยืนยันรายละเอียดเทมเพลตหรือเงื่อนไขการซื้อ โปรดติดต่อก่อนชำระเงิน
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href={DISCORD_URL}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-white px-8 py-3 text-sm font-bold text-slate-900 transition hover:bg-slate-100"
            >
              ติดต่อผ่าน Discord
            </a>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="rounded-full border border-slate-700 px-8 py-3 text-sm font-bold text-white transition hover:bg-slate-800"
            >
              ส่งอีเมลหาเรา
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
