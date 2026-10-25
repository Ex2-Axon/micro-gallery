"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import Link from "next/link";
import { PRICE_FORMATTER } from "../../data/config";
import type { Template } from "../../data/templates";

interface DailyTemplateHeroProps {
  templates: Template[];
}

const DAILY_SLIDE_COUNT = 5;
const SLIDE_INTERVAL = 6500;

function hashString(value: string): number {
  let hash = 2166136261;

  for (let index = 0; index < value.length; index += 1) {
    hash = Math.imul(hash ^ value.charCodeAt(index), 16777619);
  }

  return hash >>> 0;
}

function getDailyTemplates(templates: Template[]): Template[] {
  const today = new Date();
  const dateKey = getDateKey(today);

  return [...templates]
    .sort(
      (left, right) =>
        hashString(`${dateKey}-${left.name}`) -
          hashString(`${dateKey}-${right.name}`) ||
        left.name.localeCompare(right.name),
    )
    .slice(0, DAILY_SLIDE_COUNT);
}

function getDateKey(date: Date): string {
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
}

function subscribeToMotionPreference(onChange: () => void): () => void {
  const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  mediaQuery.addEventListener("change", onChange);

  return () => mediaQuery.removeEventListener("change", onChange);
}

function getMotionPreference(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export default function DailyTemplateHero({
  templates,
}: DailyTemplateHeroProps) {
  const [dailyTemplates, setDailyTemplates] = useState(() =>
    templates.slice(0, DAILY_SLIDE_COUNT),
  );
  const [activeIndex, setActiveIndex] = useState(0);
  const [motionOverride, setMotionOverride] = useState<boolean | null>(null);
  const prefersReducedMotion = useSyncExternalStore(
    subscribeToMotionPreference,
    getMotionPreference,
    () => false,
  );
  const isPaused = motionOverride ?? prefersReducedMotion;
  const activeTemplate = dailyTemplates[activeIndex];

  useEffect(() => {
    const updateDailyTemplates = () => {
      setDailyTemplates(getDailyTemplates(templates));
      setActiveIndex(0);
    };

    updateDailyTemplates();
    let currentDateKey = getDateKey(new Date());
    const dateCheck = window.setInterval(() => {
      const nextDateKey = getDateKey(new Date());
      if (nextDateKey !== currentDateKey) {
        currentDateKey = nextDateKey;
        updateDailyTemplates();
      }
    }, 60_000);

    return () => window.clearInterval(dateCheck);
  }, [templates]);

  useEffect(() => {
    if (isPaused || dailyTemplates.length < 2) {
      return;
    }

    const interval = window.setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % dailyTemplates.length);
    }, SLIDE_INTERVAL);

    return () => window.clearInterval(interval);
  }, [dailyTemplates.length, isPaused]);

  if (!activeTemplate) {
    return null;
  }

  const showPrevious = () => {
    setActiveIndex(
      (currentIndex) =>
        (currentIndex - 1 + dailyTemplates.length) % dailyTemplates.length,
    );
  };

  const showNext = () => {
    setActiveIndex((currentIndex) => (currentIndex + 1) % dailyTemplates.length);
  };

  return (
    <section
      aria-label="เทมเพลตเด่นประจำวัน"
      className="relative isolate min-h-[34rem] overflow-hidden rounded-[2rem] bg-gray-900 text-white shadow-xl sm:min-h-[30rem] lg:min-h-[34rem]"
    >
      <Image
        key={activeTemplate.name}
        src={activeTemplate.image}
        alt={`ภาพตัวอย่าง ${activeTemplate.name}`}
        fill
        priority={activeIndex === 0}
        sizes="(max-width: 768px) 100vw, 1280px"
        className="animate-hero-fade -z-20 object-cover object-center"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/85 via-black/55 to-black/10" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/65 via-transparent to-black/15" />

      <div className="relative flex min-h-[34rem] flex-col justify-between p-6 sm:min-h-[30rem] sm:p-10 lg:min-h-[34rem] lg:p-14">
        <div className="flex items-center justify-between gap-4">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-black/25 px-4 py-2 text-xs font-semibold tracking-wide text-white backdrop-blur-md sm:text-sm">
            <span aria-hidden="true" className="h-2 w-2 rounded-full bg-emerald-400" />
            คัดสรรใหม่ทุกวัน
          </span>
          <button
            type="button"
            onClick={() => setMotionOverride(!isPaused)}
            aria-label={isPaused ? "เล่นสไลด์อัตโนมัติ" : "หยุดสไลด์อัตโนมัติ"}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-black/25 text-white backdrop-blur-md transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            {isPaused ? (
              <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4 fill-current">
                <path d="M8 5.5v13l10-6.5z" />
              </svg>
            ) : (
              <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4 fill-current">
                <path d="M7 5h4v14H7zm6 0h4v14h-4z" />
              </svg>
            )}
          </button>
        </div>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-white/70 sm:text-sm">
              Today&apos;s featured template
            </p>
            <h2 className="mt-3 break-words text-3xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              {activeTemplate.name}
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-6 text-white/80 sm:text-base sm:leading-7">
              สำรวจภาพตัวอย่างและรายละเอียดเทมเพลต พร้อมเปิดดูเว็บไซต์เดโมจริง
              เพื่อค้นหาไอเดียที่เหมาะกับโปรเจกต์ของคุณ
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-white/20 bg-white/15 px-3 py-1.5 text-xs font-semibold backdrop-blur-sm">
                {activeTemplate.framework}
              </span>
              {activeTemplate.usesDatabase && (
                <span className="rounded-full border border-white/20 bg-white/15 px-3 py-1.5 text-xs font-semibold backdrop-blur-sm">
                  มีฐานข้อมูล
                </span>
              )}
              <span className="rounded-full border border-white/20 bg-white/15 px-3 py-1.5 text-xs font-semibold backdrop-blur-sm">
                เริ่มต้น {PRICE_FORMATTER.format(activeTemplate.salePrice)} บาท
              </span>
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href={`/template/${activeTemplate.name}`}
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-bold text-gray-900 transition hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900"
              >
                ดูรายละเอียด
                <span aria-hidden="true" className="ml-2">→</span>
              </Link>
              <a
                href={activeTemplate.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/35 bg-black/20 px-6 py-3 text-sm font-bold text-white backdrop-blur-sm transition hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                เปิดเว็บไซต์เดโม
                <span aria-hidden="true" className="ml-2">↗</span>
              </a>
            </div>
          </div>

          <div className="flex items-center justify-between gap-4 lg:flex-col lg:items-end">
            <div className="flex min-w-0 gap-2 overflow-x-auto pb-1">
              {dailyTemplates.map((template, index) => (
                <button
                  key={template.name}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  aria-label={`แสดง ${template.name}`}
                  aria-current={index === activeIndex ? "true" : undefined}
                  className={`relative h-14 w-20 shrink-0 overflow-hidden rounded-xl border-2 transition sm:h-16 sm:w-24 ${
                    index === activeIndex
                      ? "border-white opacity-100"
                      : "border-white/30 opacity-65 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={template.image}
                    alt=""
                    fill
                    sizes="96px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
            {dailyTemplates.length > 1 && (
              <div className="flex shrink-0 gap-2">
                <button
                  type="button"
                  onClick={showPrevious}
                  aria-label="ภาพก่อนหน้า"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-black/25 text-xl text-white backdrop-blur-md transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  <span aria-hidden="true">←</span>
                </button>
                <button
                  type="button"
                  onClick={showNext}
                  aria-label="ภาพถัดไป"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-black/25 text-xl text-white backdrop-blur-md transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  <span aria-hidden="true">→</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
