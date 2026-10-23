import {
  COMPANY_URL,
  CONTACT_EMAIL,
  DISCORD_URL,
  FACEBOOK_URL,
  GITHUB_URL,
  LINE_URL,
  PRIVACY_POLICY_URL,
  TERMS_OF_SERVICE_URL,
} from "../../data/config";

function SocialIcon({ type }: { type: "facebook" | "github" | "chat" | "email" }) {
  if (type === "facebook") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
        <path d="M13.4 21v-8h2.7l.4-3h-3.1V8.1c0-.9.3-1.5 1.6-1.5h1.7V3.9c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3V10H7.2v3h2.8v8h3.4Z" />
      </svg>
    );
  }

  if (type === "github") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
        <path d="M4 5.5A1.5 1.5 0 0 1 5.5 4h13A1.5 1.5 0 0 1 20 5.5v13a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 18.5v-13Zm3 2v9h2v-3h2v3h2v-3h2v3h2v-9h-2v4h-2v-4h-2v4H9v-4H7Z" />
      </svg>
    );
  }

  if (type === "email") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M4 6h16v12H4z" />
        <path d="m4 7 8 6 8-6" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M20 11.5a7.5 7.5 0 0 1-7.5 7.5H6l-2 2v-5.5A7.5 7.5 0 1 1 20 11.5Z" />
    </svg>
  );
}

const socialLinks = [
  { label: "Facebook", href: FACEBOOK_URL, icon: "facebook" },
  { label: "GitHub", href: GITHUB_URL, icon: "github" },
  { label: "Discord", href: DISCORD_URL, icon: "chat" },
  { label: "LINE", href: LINE_URL, icon: "chat" },
] as const;

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white px-4 py-8 text-sm text-slate-600 sm:py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-5 text-center">
        <nav aria-label="ข้อมูลทางกฎหมาย" className="flex flex-wrap justify-center gap-x-5 gap-y-2">
          <a
            href={PRIVACY_POLICY_URL}
            target="_blank"
            rel="noreferrer"
            className="underline decoration-slate-300 underline-offset-4 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900"
          >
            Privacy Policy
          </a>
          <a
            href={TERMS_OF_SERVICE_URL}
            target="_blank"
            rel="noreferrer"
            className="underline decoration-slate-300 underline-offset-4 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900"
          >
            Terms of Service
          </a>
        </nav>

        <nav aria-label="ช่องทางติดต่อและโซเชียลมีเดีย" className="flex flex-wrap justify-center gap-x-5 gap-y-3">
          {socialLinks.map(({ label, href, icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              className="inline-flex items-center gap-2 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900"
            >
              <SocialIcon type={icon} />
              <span>{label}</span>
            </a>
          ))}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="inline-flex items-center gap-2 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900"
          >
            <SocialIcon type="email" />
            <span>Email</span>
          </a>
        </nav>

        <p>Powered by Microtronic © 2026 Microtronic Co., Ltd.</p>
        <a
          href={COMPANY_URL}
          target="_blank"
          rel="noreferrer"
          className="font-medium text-slate-900 underline decoration-slate-300 underline-offset-4 hover:decoration-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900"
        >
          Official Website: {COMPANY_URL}
        </a>
      </div>
    </footer>
  );
}
