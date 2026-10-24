import Image from "next/image";

interface GalleryProps {
  images?: string[];
}

function GalleryPlaceholder({ index }: { index: number }) {
  const gradients = [
    "from-gray-300 via-gray-200 to-slate-100",
    "from-gray-200 via-gray-100 to-slate-50",
    "from-slate-200 via-gray-100 to-gray-50",
    "from-gray-300 via-slate-200 to-gray-100",
    "from-slate-300 via-gray-200 to-gray-50",
    "from-gray-400 via-gray-300 to-slate-200",
    "from-gray-300 via-gray-200 to-gray-100",
    "from-slate-400 via-gray-300 to-gray-200",
    "from-gray-300 via-slate-200 to-gray-100",
    "from-gray-400 via-gray-200 to-slate-100",
    "from-slate-300 via-gray-200 to-gray-100",
    "from-gray-400 via-slate-300 to-gray-200",
  ];

  const gradient = gradients[index % gradients.length];

  return (
    <div className={`relative aspect-video w-full bg-gradient-to-br ${gradient} overflow-hidden`}>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center opacity-40">
          <div className="text-4xl font-bold text-slate-700">🏞️</div>
          <p className="mt-2 text-sm text-slate-600">บรรยากาศที่พัก</p>
        </div>
      </div>
    </div>
  );
}

export default function Gallery({ images }: GalleryProps) {
  const imageCount = Math.max(images?.length || 8, 8);
  const displayImages = images || Array.from({ length: Math.min(imageCount, 12) }, (_, i) => `/gallery-${i + 1}`);

  return (
    <section className="bg-white px-4 py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            ภาพบรรยากาศ
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            บรรยากาศและสิ่งอำนวยความสะดวกของที่พักเรา
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {displayImages.map((image, index) => (
            <div
              key={index}
              className="group overflow-hidden rounded-xl border border-slate-200 shadow-sm transition hover:shadow-lg"
            >
              {image.startsWith("/") ? (
                <GalleryPlaceholder index={index} />
              ) : (
                <div className="relative aspect-video w-full bg-slate-200">
                  <Image
                    src={image}
                    alt={`บรรยากาศที่พัก ${index + 1}`}
                    fill
                    className="object-cover transition group-hover:scale-105"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
