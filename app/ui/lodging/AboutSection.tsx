interface AboutSectionProps {
  about: string;
}

export default function AboutSection({ about }: AboutSectionProps) {
  return (
    <section
      id="about"
      className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8"
    >
      <h2 className="mb-8 text-3xl font-bold text-gray-900">เกี่ยวกับเรา</h2>

      <div className="mx-auto max-w-3xl rounded-xl bg-gray-50 p-8">
        <p className="whitespace-pre-wrap text-lg leading-relaxed text-gray-700">
          {about}
        </p>
      </div>
    </section>
  );
}
