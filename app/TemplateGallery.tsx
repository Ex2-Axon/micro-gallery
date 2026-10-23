"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { PRICE, PRICE_FORMATTER } from "../data/config";
import type { Template } from "../data/templates";

interface TemplateGalleryProps {
  initialTemplates: Template[];
}

const PAGE_SIZE = 12;

export default function TemplateGallery({ initialTemplates }: TemplateGalleryProps) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const sortedTemplates = useMemo(() => {
    return [...initialTemplates].reverse();
  }, [initialTemplates]);

  const filteredTemplates = useMemo(() => {
    return sortedTemplates.filter((template) =>
      template.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, sortedTemplates]);
  const pageCount = Math.ceil(filteredTemplates.length / PAGE_SIZE);
  const currentPage = Math.min(page, Math.max(pageCount, 1));
  const visibleTemplates = filteredTemplates.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );
  const firstPageNumber = Math.max(1, Math.min(currentPage - 2, pageCount - 4));
  const pageNumbers = Array.from(
    { length: Math.min(pageCount, 5) },
    (_, index) => firstPageNumber + index,
  );

  return (
    <div className="space-y-8">
      {/* Search & Filter Bar */}
      <div className="sticky top-4 z-10 flex flex-col gap-4 rounded-[2rem] border border-slate-200 bg-white/80 p-4 shadow-sm backdrop-blur-xl sm:flex-row sm:items-center sm:p-6">
        <div className="relative flex-1">
          <svg
            aria-hidden="true"
            className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <label htmlFor="template-search" className="sr-only">
            ค้นหาชื่อเทมเพลต
          </label>
          <input
            id="template-search"
            name="search"
            type="search"
            autoComplete="off"
            placeholder="ค้นหาชื่อเทมเพลต…"
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
              setPage(1);
            }}
            className="w-full rounded-2xl border-none bg-slate-100 py-3 pl-12 pr-4 text-sm font-medium text-slate-900 placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900"
          />
        </div>
        <div aria-live="polite" className="flex items-center gap-2 px-2 text-sm font-medium text-slate-500">
          <span>พบ {filteredTemplates.length} รายการ</span>
        </div>
      </div>

      {/* Gallery Grid */}
      <section aria-label="รายการเทมเพลต" className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filteredTemplates.length > 0 ? (
          visibleTemplates.map((template) => (
            <Link
              key={template.name}
              href={`/template/${template.name}`}
              className="group overflow-hidden rounded-[2rem] border border-slate-200 bg-white transition hover:-translate-y-1 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2"
            >
              <div className="relative h-48 bg-slate-100">
                {template.image ? (
                  <Image
                    src={template.image}
                    alt={template.name}
                    fill
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition duration-500 group-hover:scale-110"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-slate-400">
                    ไม่มีรูปตัวอย่าง
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              </div>
              <div className="space-y-3 p-6">
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-400 font-bold">Template</p>
                  <h2 className="mt-2 text-2xl font-bold text-slate-900">{template.name}</h2>
                </div>
                <p className="text-sm leading-6 text-slate-600 line-clamp-2">
                  คลิกเพื่อดูรายละเอียดและลิงก์เดโมของเทมเพลตนี้
                </p>
                <div className="flex items-center justify-between pt-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">ราคา</span>
                  <span className="text-lg font-bold text-slate-900">{PRICE_FORMATTER.format(PRICE)} ฿</span>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center py-20 text-center">
            <div className="rounded-full bg-slate-100 p-6">
              <svg className="h-12 w-12 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="mt-4 text-lg font-semibold text-slate-900">ไม่พบเทมเพลตที่คุณค้นหา</h3>
            <p className="mt-2 text-slate-500">ลองใช้คำค้นหาอื่นดูอีกครั้งครับ</p>
          </div>
        )}
      </section>

      {pageCount > 1 && (
        <nav
          aria-label="Pagination"
          className="flex flex-wrap items-center justify-center gap-2"
        >
          <button
            type="button"
            onClick={() => setPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 disabled:cursor-not-allowed disabled:opacity-50"
          >
            ก่อนหน้า
          </button>
          {pageNumbers.map((pageNumber) => (
            <button
              key={pageNumber}
              type="button"
              onClick={() => setPage(pageNumber)}
              aria-current={currentPage === pageNumber ? "page" : undefined}
              aria-label={`หน้า ${pageNumber}`}
              className={`h-10 min-w-10 rounded-xl border px-3 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 ${
                currentPage === pageNumber
                  ? "border-slate-900 bg-slate-900 text-white"
                  : "border-slate-200 bg-white text-slate-700 hover:bg-slate-100"
              }`}
            >
              {pageNumber}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setPage(currentPage + 1)}
            disabled={currentPage === pageCount}
            className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 disabled:cursor-not-allowed disabled:opacity-50"
          >
            ถัดไป
          </button>
        </nav>
      )}
    </div>
  );
}
