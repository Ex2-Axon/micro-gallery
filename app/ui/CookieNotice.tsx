"use client";

import { useState, useSyncExternalStore } from "react";

const STORAGE_KEY = "micro-gallery-cookie-choice-v1";
const CHOICE_CHANGED_EVENT = "micro-gallery-cookie-choice-change";
type CookieChoice = "accepted" | "rejected" | "dismissed";
type ConsentStatus = CookieChoice | "unset" | "unavailable" | "loading";

let cachedChoice: ConsentStatus | undefined;

function isCookieChoice(value: string | null): value is CookieChoice {
  return value === "accepted" || value === "rejected" || value === "dismissed";
}

function getChoiceSnapshot(): ConsentStatus {
  if (cachedChoice) {
    return cachedChoice;
  }

  try {
    const storedChoice = window.localStorage.getItem(STORAGE_KEY);
    cachedChoice = isCookieChoice(storedChoice) ? storedChoice : "unset";
  } catch {
    cachedChoice = "unavailable";
  }

  return cachedChoice;
}

function getServerSnapshot(): ConsentStatus {
  return "loading";
}

function subscribeToChoice(callback: () => void) {
  const notify = () => {
    cachedChoice = undefined;
    callback();
  };
  window.addEventListener("storage", notify);
  window.addEventListener(CHOICE_CHANGED_EVENT, notify);

  return () => {
    window.removeEventListener("storage", notify);
    window.removeEventListener(CHOICE_CHANGED_EVENT, notify);
  };
}

export default function CookieNotice() {
  const status = useSyncExternalStore(
    subscribeToChoice,
    getChoiceSnapshot,
    getServerSnapshot,
  );
  const [reopenSettings, setReopenSettings] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [storageError, setStorageError] = useState("");
  const isOpen =
    status === "unset" || status === "unavailable" || reopenSettings;
  const choice = isCookieChoice(status) ? status : null;

  function saveChoice(nextChoice: CookieChoice) {
    try {
      window.localStorage.setItem(STORAGE_KEY, nextChoice);
      cachedChoice = nextChoice;
      window.dispatchEvent(new Event(CHOICE_CHANGED_EVENT));
      setReopenSettings(false);
      setSettingsOpen(false);
      setStorageError("");
    } catch (error) {
      console.error("Unable to save cookie notice preference.", error);
      setStorageError("บันทึกตัวเลือกไม่สำเร็จ กรุณาเปิดใช้พื้นที่จัดเก็บของเบราว์เซอร์แล้วลองอีกครั้ง");
    }
  }

  if (status === "loading") {
    return null;
  }

  if (!isOpen) {
    return (
      <button
        type="button"
        onClick={() => {
          setReopenSettings(true);
          setSettingsOpen(true);
        }}
        className="fixed bottom-3 right-3 z-40 rounded-full border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-700 shadow-lg hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900"
      >
        Cookies Settings
      </button>
    );
  }

  return (
    <aside
      aria-labelledby="cookie-notice-title"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-white p-4 text-slate-900 shadow-2xl sm:p-5"
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0 flex-1">
          <h2 id="cookie-notice-title" className="pr-10 text-base font-semibold">
            Cookies &amp; browser storage
          </h2>
          <p className="mt-1 max-w-3xl text-sm leading-6 text-slate-600">
            เราใช้ localStorage เพื่อจดจำตัวเลือกนี้ โค้ดปัจจุบันของเว็บไซต์ไม่มีเครื่องมือ analytics หรือโฆษณาที่ตั้งค่า optional cookies
          </p>

          <div
            id="cookie-settings-panel"
            hidden={!settingsOpen}
            className="mt-3 rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm leading-6 text-slate-700"
          >
            <p className="font-medium">การตั้งค่าปัจจุบัน</p>
            <p>
              เว็บไซต์นี้บันทึกเฉพาะตัวเลือกการแจ้งเตือนไว้ในเบราว์เซอร์ และไม่มีหมวด analytics หรือ advertising ให้เปิดใช้งานในขณะนี้
              {choice ? ` ตัวเลือกที่บันทึกไว้: ${choice}.` : ""}
            </p>
          </div>

          {(storageError || status === "unavailable") && (
            <p role="alert" className="mt-2 text-sm font-medium text-red-700">
              {storageError || "อ่านค่าการตั้งค่าไม่ได้ กรุณาลองใหม่อีกครั้ง"}
            </p>
          )}
        </div>

        <button
          type="button"
          aria-label="ปิดการแจ้งเตือน Cookies"
          onClick={() => saveChoice("dismissed")}
          className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full text-xl text-slate-500 hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 sm:right-5 sm:top-5"
        >
          <span aria-hidden="true">×</span>
        </button>

        <div className="flex shrink-0 flex-wrap gap-2 sm:pt-8">
          <button
            type="button"
            aria-controls="cookie-settings-panel"
            aria-expanded={settingsOpen}
            onClick={() => setSettingsOpen((open) => !open)}
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900"
          >
            Cookies Settings
          </button>
          <button
            type="button"
            aria-pressed={choice === "rejected"}
            onClick={() => saveChoice("rejected")}
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900"
          >
            Reject All
          </button>
          <button
            type="button"
            aria-pressed={choice === "accepted"}
            onClick={() => saveChoice("accepted")}
            className="rounded-lg bg-slate-900 px-3 py-2 text-sm font-semibold text-white hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2"
          >
            Accept All
          </button>
        </div>
      </div>
    </aside>
  );
}
