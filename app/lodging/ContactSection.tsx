import Link from "next/link";
import type { LodgingContact } from "../../data/templates";

interface ContactSectionProps {
  contact: LodgingContact;
}

export default function ContactSection({ contact }: ContactSectionProps) {
  return (
    <section id="contact" className="bg-gradient-to-b from-emerald-50 to-green-50 px-4 py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            ติดต่อเรา
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            มีคำถามหรือต้องการสอบถามเพิ่มเติม?
          </p>
        </div>

        <div className="mx-auto max-w-2xl">
          <div className="space-y-8">
            {/* Phone section */}
            <div className="rounded-2xl border border-emerald-200 bg-white p-8 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-emerald-100">
                  <span className="text-2xl">📞</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-slate-900">โทรศัพท์</h3>
                  <p className="mt-2 text-slate-600">{contact.phone}</p>
                  <Link
                    href={`tel:${contact.phone}`}
                    className="mt-4 inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-6 py-3 font-semibold text-white transition hover:bg-emerald-700 active:scale-95"
                  >
                    <span>โทรเลย</span>
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>

            {/* LINE section */}
            <div className="rounded-2xl border border-emerald-200 bg-white p-8 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-emerald-100">
                  <span className="text-2xl">💬</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-slate-900">LINE</h3>
                  <p className="mt-2 text-slate-600">@{contact.lineId}</p>
                  <Link
                    href={contact.lineUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 inline-flex items-center gap-2 rounded-lg bg-green-500 px-6 py-3 font-semibold text-white transition hover:bg-green-600 active:scale-95"
                  >
                    <span>แอด LINE</span>
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6">
              <p className="text-sm leading-relaxed text-amber-900">
                <span className="font-semibold">⚠️ หมายเหตุ:</span> ไม่ใช่ระบบจองออนไลน์ สามารถสอบถามได้ทางโทรศัพท์หรือ LINE เท่านั้น
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
