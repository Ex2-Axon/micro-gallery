import FacilityIcon from "./FacilityIcon";

interface FacilitiesSectionProps {
  facilities: string[];
}

export default function FacilitiesSection({
  facilities,
}: FacilitiesSectionProps) {
  return (
    <section
      id="facilities"
      className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8"
    >
      <h2 className="mb-4 text-3xl font-bold text-gray-900">
        สิ่งอำนวยความสะดวก
      </h2>

      <p className="mb-8 max-w-2xl text-lg text-gray-600">
        ที่พักของเรามีสิ่งอำนวยความสะดวกครบครันเพื่อความสะดวกสบายของผู้เข้าพัก
      </p>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {facilities.map((facility, index) => (
          <FacilityIcon key={index} facilityName={facility} />
        ))}
      </div>
    </section>
  );
}
