import Image from "next/image";

interface GalleryGridProps {
  gallery: string[];
}

export default function GalleryGrid({ gallery }: GalleryGridProps) {
  // Show placeholder grid if gallery is empty
  if (!gallery || gallery.length === 0) {
    return (
      <section
        id="gallery"
        className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8"
      >
        <h2 className="mb-8 text-3xl font-bold text-gray-900">ภาพบรรยากาศ</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="aspect-square rounded-lg bg-gray-200"
            />
          ))}
        </div>
        <p className="mt-6 text-center text-gray-600">
          ไม่มีรูปภาพในแกลเลอรี่
        </p>
      </section>
    );
  }

  return (
    <section
      id="gallery"
      className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8"
    >
      <h2 className="mb-8 text-3xl font-bold text-gray-900">ภาพบรรยากาศ</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {gallery.map((imagePath, index) => (
          <div key={index} className="aspect-square overflow-hidden rounded-lg">
            <Image
              src={imagePath}
              alt={`${index + 1} - ภาพบรรยากาศของที่พัก`}
              width={300}
              height={300}
              sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
              className="h-full w-full object-cover"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
