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
  metadataBase: new URL("https://gallery.microtronic.biz"),
  title: {
    default: "Axon Template Gallery | แกลเลอรีตัวอย่างเว็บไซต์",
    template: "%s | Axon Template Gallery",
  },
  description:
    "เลือกดูเทมเพลตเว็บไซต์จาก Axon พร้อมภาพตัวอย่าง รายละเอียด และลิงก์เดโมของแต่ละรายการ ราคาเริ่มต้น 2,500 บาท",
  keywords: [
    "เทมเพลตเว็บไซต์",
    "เว็บไซต์สำเร็จรูป",
    "template html",
    "next.js template",
    "เว็บธุรกิจ",
    "landing page",
    "axon template",
    "microtronic",
  ],
  authors: [{ name: "Microtronic Co., Ltd." }],
  creator: "Microtronic Co., Ltd.",
  publisher: "Microtronic Co., Ltd.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "th_TH",
    url: "https://gallery.microtronic.biz",
    siteName: "Axon Template Gallery",
    title: "Axon Template Gallery | แกลเลอรีตัวอย่างเว็บไซต์",
    description:
      "เลือกดูเทมเพลตเว็บไซต์จาก Axon พร้อมภาพตัวอย่าง รายละเอียด และลิงก์เดโมของแต่ละรายการ",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Axon Template Gallery",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Axon Template Gallery | แกลเลอรีตัวอย่างเว็บไซต์",
    description:
      "เลือกดูเทมเพลตเว็บไซต์จาก Axon พร้อมภาพตัวอย่าง รายละเอียด และลิงก์เดโมของแต่ละรายการ",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
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
