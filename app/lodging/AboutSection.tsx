interface AboutSectionProps {
  about: string;
  lodgeName: string;
}

export default function AboutSection({ about, lodgeName }: AboutSectionProps) {
  return (
    <section className="bg-white px-4 py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-4xl">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            เกี่ยวกับ {lodgeName}
          </h2>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-gray-50 to-slate-100 p-8 shadow-sm sm:p-12">
          <p className="text-lg leading-relaxed text-slate-700 sm:text-xl">
            {about}
          </p>

          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            <div className="text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-200 mx-auto">
                <span className="text-2xl">🌿</span>
              </div>
              <p className="mt-3 font-semibold text-slate-900">ธรรมชาติ</p>
              <p className="mt-1 text-sm text-slate-600">ท่ามกลางสภาพแวดล้อมธรรมชาติ</p>
            </div>

            <div className="text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-200 mx-auto">
                <span className="text-2xl">😌</span>
              </div>
              <p className="mt-3 font-semibold text-slate-900">สะดวกสบาย</p>
              <p className="mt-1 text-sm text-slate-600">สิ่งอำนวยความสะดวกครบครัน</p>
            </div>

            <div className="text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-200 mx-auto">
                <span className="text-2xl">🧘</span>
              </div>
              <p className="mt-3 font-semibold text-slate-900">ผ่อนคลาย</p>
              <p className="mt-1 text-sm text-slate-600">พักผ่อนให้สดชื่น</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
