interface FacilitiesProps {
  facilities: string[];
}

function FacilityIcon({ name }: { name: string }) {
  const iconMap: Record<string, string> = {
    "Wi-Fi ฟรี": "📶",
    "ที่จอดรถ": "🅿️",
    "แอร์": "❄️",
    "ห้องน้ำ": "🚿",
    "อาหารเช้า": "🍳",
    "ระเบียง": "🏞️",
    "น้ำดื่มฟรี": "💧",
    "สวนส่วนตัว": "🌿",
    "ทีวี": "📺",
    "ลิฟต์": "🛗",
  };

  return (
    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-100 to-green-100">
      <span className="text-xl">{iconMap[name] || "✨"}</span>
    </div>
  );
}

export default function Facilities({ facilities }: FacilitiesProps) {
  return (
    <section id="facilities" className="bg-gradient-to-b from-slate-50 to-white px-4 py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            สิ่งอำนวยความสะดวก
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            ที่พักของเรามอบสิ่งอำนวยความสะดวกครบครัน
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {facilities.map((facility, index) => (
            <div
              key={index}
              className="flex items-start gap-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md"
            >
              <FacilityIcon name={facility} />
              <div className="flex-1">
                <h3 className="font-semibold text-slate-900">{facility}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
