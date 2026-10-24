import Link from "next/link";
import type { Room } from "../../data/templates";

interface RoomTypesProps {
  rooms: Room[];
}

export default function RoomTypes({ rooms }: RoomTypesProps) {
  return (
    <section id="rooms" className="bg-white px-4 py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            ประเภทห้องพัก
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            เลือกห้องที่เหมาะกับคุณ
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {rooms.map((room, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-slate-100 shadow-sm transition hover:shadow-lg"
            >
              {/* Room image placeholder */}
              <div className="relative h-48 w-full bg-gradient-to-br from-emerald-200 via-green-100 to-stone-100">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-emerald-600 opacity-30">
                      🛏️
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-bold text-slate-900">{room.name}</h3>

                <p className="mt-2 text-sm text-slate-600 line-clamp-2">
                  {room.description}
                </p>

                {/* Amenities list */}
                <div className="mt-6 space-y-2">
                  <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                    สิ่งอำนวยความสะดวก
                  </p>
                  <ul className="space-y-1 text-sm text-slate-700">
                    {room.amenities.slice(0, 4).map((amenity, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                        {amenity}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Price */}
                <div className="mt-6 border-t border-slate-200 pt-6">
                  <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                    ราคาเริ่มต้น
                  </p>
                  <div className="mt-2 flex items-baseline gap-1">
                    <span className="text-2xl font-bold text-slate-900">
                      {room.pricePerNight.toLocaleString("th-TH")}
                    </span>
                    <span className="text-sm text-slate-600">บาท/คืน</span>
                  </div>
                </div>

                {/* CTA Button */}
                <Link
                  href="#contact"
                  className="mt-6 flex w-full items-center justify-center rounded-lg bg-emerald-600 px-4 py-3 font-semibold text-white transition hover:bg-emerald-700 active:scale-95"
                >
                  สอบถามห้องนี้
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
