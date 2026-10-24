import Link from "next/link";
import type { LodgingLocation } from "../../data/templates";

interface LocationSectionProps {
  location: LodgingLocation;
}

export default function LocationSection({ location }: LocationSectionProps) {
  return (
    <section id="location" className="bg-gradient-to-b from-slate-50 to-white px-4 py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Map placeholder */}
          <div className="flex items-center justify-center rounded-2xl border border-slate-200 bg-gradient-to-br from-blue-100 via-cyan-50 to-emerald-50 p-8 shadow-sm">
            <div className="text-center">
              <div className="text-6xl">🗺️</div>
              <p className="mt-4 text-slate-600">แผนที่ทำเลที่ตั้ง</p>
              <p className="mt-2 text-sm text-slate-500">ดูบน Google Maps</p>
            </div>
          </div>

          {/* Location info */}
          <div className="flex flex-col justify-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              ที่ตั้ง
            </h2>

            <div className="mt-8 space-y-6">
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                  ที่อยู่
                </p>
                <p className="mt-2 text-lg text-slate-900">{location.address}</p>
              </div>

              {location.directions && (
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                    คำแนะนำการเดินทาง
                  </p>
                  <p className="mt-2 text-base leading-relaxed text-slate-700">
                    {location.directions}
                  </p>
                </div>
              )}

              <div className="pt-4">
                <Link
                  href={location.googleMapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 active:scale-95"
                >
                  <span>ดูบนแผนที่</span>
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
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
