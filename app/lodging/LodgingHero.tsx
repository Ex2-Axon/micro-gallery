import Link from "next/link";

interface LodgingHeroProps {
  name: string;
  tagline: string;
}

export default function LodgingHero({ name, tagline }: LodgingHeroProps) {
  return (
    <section className="relative flex w-full items-center justify-center overflow-hidden bg-gradient-to-br from-emerald-50 via-green-50 to-stone-100 px-4 py-20 sm:py-32 lg:py-40">
      {/* Placeholder background pattern using CSS gradients */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-gradient-to-br from-green-300 to-emerald-400 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-gradient-to-tl from-yellow-100 to-amber-200 blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-3xl text-center">
        <p className="mb-4 inline-block rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">
          พักผ่อนท่ามกลางธรรมชาติ
        </p>

        <h1 className="mb-6 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
          {name}
        </h1>

        <p className="mb-8 text-lg leading-relaxed text-slate-700 sm:text-xl">
          {tagline}
        </p>

        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Link
            href="#rooms"
            className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-emerald-600 to-green-600 px-8 py-3 font-semibold text-white transition hover:from-emerald-700 hover:to-green-700 active:scale-95"
          >
            ดูห้องพัก
          </Link>
          <Link
            href="#contact"
            className="inline-flex items-center justify-center rounded-lg border-2 border-emerald-600 px-8 py-3 font-semibold text-emerald-600 transition hover:bg-emerald-50 active:scale-95"
          >
            สอบถามทันที
          </Link>
        </div>
      </div>
    </section>
  );
}
