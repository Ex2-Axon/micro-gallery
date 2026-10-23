import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import CookieNotice from "./ui/CookieNotice";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Axon Template Gallery | แกลเลอรีตัวอย่างเว็บไซต์",
  description:
    "เลือกดูเทมเพลตเว็บไซต์จาก Axon พร้อมภาพตัวอย่าง รายละเอียด และลิงก์เดโมของแต่ละรายการ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="th"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900">
        <a
          href="#main-content"
          className="sr-only z-[60] rounded-lg bg-white px-4 py-2 text-slate-900 focus-visible:not-sr-only focus-visible:fixed focus-visible:left-4 focus-visible:top-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900"
        >
          ข้ามไปยังเนื้อหาหลัก
        </a>
        {children}
        <CookieNotice />
      </body>
    </html>
  );
}
