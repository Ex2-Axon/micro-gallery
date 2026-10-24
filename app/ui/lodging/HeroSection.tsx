import Image from "next/image";
import type { Template } from "@/data/templates";

interface HeroSectionProps {
  template: Template;
}

export default function HeroSection({ template }: HeroSectionProps) {
  const heroImage = template.heroImage || template.image;
  const heroImageUrl = heroImage || "/placeholder.jpg";

  return (
    <section id="home" className="relative w-full overflow-hidden">
      {/* Hero Container */}
      <div className="relative h-[40vh] sm:h-[50vh] md:h-[60vh] w-full">
        {/* Background Image */}
        <Image
          src={heroImageUrl}
          alt={`${template.name} hotel exterior`}
          fill
          priority
          sizes="(max-width: 1280px) 100vw, 1280px"
          className="object-cover object-center"
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Text Overlay - Centered */}
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
          <div className="text-center">
            {/* Hotel Name */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
              {template.name}
            </h1>

            {/* Tagline */}
            {template.tagline && (
              <p className="text-lg sm:text-xl md:text-2xl text-white mb-8 drop-shadow-md">
                {template.tagline}
              </p>
            )}

            {/* CTA Button */}
            <a
              href="#rooms"
              className="inline-block px-8 py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-900 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              View Rooms
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
