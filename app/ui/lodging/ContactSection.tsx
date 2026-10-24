'use client';

import type { LodgingContact } from "@/data/templates";

interface ContactSectionProps {
  contact: LodgingContact;
}

export default function ContactSection({ contact }: ContactSectionProps) {
  return (
    <section
      id="contact"
      className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8"
    >
      <h2 className="mb-8 text-3xl font-bold text-gray-900">
        ติดต่อเรา
      </h2>

      <div className="mx-auto max-w-2xl rounded-lg border border-gray-200 bg-gray-50 p-8">
        <div className="mb-8">
          <p className="mb-2 text-lg text-gray-900">
            {contact.phone}
          </p>
          <p className="text-gray-600">
            สอบถามได้ทาง
          </p>
        </div>

        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:gap-4">
          <a
            href={`tel:${contact.phone}`}
            className="flex-1 rounded-lg bg-black px-8 py-4 text-center font-semibold text-white transition-colors hover:bg-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
          >
            โทรเลย
          </a>
          <a
            href={contact.lineUrl}
            target="_blank"
            rel="noreferrer"
            className="flex-1 rounded-lg bg-gray-200 px-8 py-4 text-center font-semibold text-black transition-colors hover:bg-gray-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2"
          >
            แอด LINE
          </a>
        </div>

        <p className="text-sm text-gray-600">
          <span className="font-semibold">หมายเหตุ:</span> ไม่ใช่ระบบจองออนไลน์ สามารถสอบถามได้ทางโทรศัพท์หรือ LINE เท่านั้น
        </p>
      </div>
    </section>
  );
}
