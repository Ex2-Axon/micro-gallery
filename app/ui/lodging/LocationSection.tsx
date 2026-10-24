import type { LodgingLocation } from "@/data/templates";

interface LocationSectionProps {
  location: LodgingLocation;
}

export default function LocationSection({ location }: LocationSectionProps) {
  return (
    <section
      id="location"
      className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8"
    >
      <h2 className="mb-8 text-3xl font-bold text-gray-900">
        ที่ตั้งและเส้นทาง
      </h2>

      <div className="mx-auto max-w-3xl rounded-lg border border-gray-200 bg-white p-6">
        <div className="mb-6">
          <h3 className="mb-2 font-bold text-gray-900">ที่อยู่</h3>
          <p className="text-gray-700">{location.address}</p>
        </div>

        {location.directions && (
          <div className="mb-6">
            <h3 className="mb-2 font-bold text-gray-900">เส้นทาง</h3>
            <p className="whitespace-pre-wrap text-gray-700">
              {location.directions}
            </p>
          </div>
        )}

        <a
          href={location.googleMapsUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-lg bg-gray-900 px-6 py-3 text-white font-medium transition-colors hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
          เปิดใน Google Maps
        </a>
      </div>
    </section>
  );
}
