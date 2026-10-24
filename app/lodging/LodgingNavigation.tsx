"use client";

import Link from "next/link";
import { useState } from "react";

interface LodgingNavigationProps {
  lodgeName: string;
}

export default function LodgingNavigation({ lodgeName }: LodgingNavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { label: "หน้าแรก", href: "#" },
    { label: "ห้องพัก", href: "#rooms" },
    { label: "สิ่งอำนวยความสะดวก", href: "#facilities" },
    { label: "ที่ตั้ง", href: "#location" },
    { label: "ติดต่อ", href: "#contact" },
  ];

  const handleNavClick = (href: string) => {
    setIsMenuOpen(false);
    if (href !== "#") {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        {/* Logo/Name */}
        <Link
          href="#"
          className="flex items-center gap-2 text-xl font-bold tracking-tight text-emerald-600 transition hover:text-emerald-700"
        >
          <span className="text-2xl">🏡</span>
          <span className="hidden sm:inline">{lodgeName}</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className="text-sm font-medium text-slate-700 transition hover:text-emerald-600"
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Desktop CTA Button */}
        <div className="hidden md:flex gap-3">
          <button
            onClick={() => handleNavClick("#contact")}
            className="rounded-lg bg-emerald-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700 active:scale-95"
          >
            สอบถาม
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-3">
          <button
            onClick={() => handleNavClick("#contact")}
            className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700"
          >
            สอบถาม
          </button>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="rounded-lg p-2 text-slate-700 hover:bg-slate-100"
            aria-label="เมนู"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="border-t border-slate-200 bg-white md:hidden">
          <div className="space-y-1 px-4 py-3">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="block w-full px-3 py-2 text-left text-sm font-medium text-slate-700 hover:bg-emerald-50 hover:text-emerald-600 rounded-lg transition"
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
