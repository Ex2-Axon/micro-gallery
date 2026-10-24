import type { Room } from "@/data/templates";

interface RoomCardProps {
  room: Room;
  hotelName: string;
}

export default function RoomCard({ room, hotelName }: RoomCardProps) {
  const formattedPrice = new Intl.NumberFormat("th-TH").format(room.pricePerNight);

  return (
    <div className="border border-gray-200 rounded-lg p-6 shadow-sm">
      {/* Room Type Icon Placeholder */}
      <div className="mb-4 h-20 w-full rounded bg-gray-100 flex items-center justify-center">
        <svg
          className="h-8 w-8 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 12l2-3m0 0l7-4 7 4M5 9v10a1 1 0 001 1h12a1 1 0 001-1V9m-9 11l4-4m-4 4l-4-4m9-5l-7-4-7 4"
          />
        </svg>
      </div>

      {/* Room Name */}
      <h3 className="mb-2 text-lg font-bold text-gray-900">{room.name}</h3>

      {/* Description */}
      <p className="mb-4 text-sm text-gray-600">{room.description}</p>

      {/* Amenities */}
      {room.amenities && room.amenities.length > 0 && (
        <div className="mb-4 flex flex-wrap gap-2">
          {room.amenities.map((amenity, index) => (
            <span
              key={index}
              className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-800"
            >
              {amenity}
            </span>
          ))}
        </div>
      )}

      {/* Price */}
      <div className="mb-4">
        <p className="text-lg font-semibold text-gray-900">
          {formattedPrice} {room.priceCurrency}
          <span className="text-sm font-normal text-gray-600"> / คืน</span>
        </p>
      </div>

      {/* Inquiry Button */}
      <a
        href="#contact"
        className="inline-block w-full rounded-lg bg-gray-900 px-4 py-2 text-center text-sm font-medium text-white transition-colors hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2"
      >
        Inquiry
      </a>
    </div>
  );
}
