import type { Room } from "@/data/templates";
import RoomCard from "./RoomCard";

interface RoomsSectionProps {
  rooms: Room[];
  hotelName: string;
}

export default function RoomsSection({ rooms, hotelName }: RoomsSectionProps) {
  return (
    <section
      id="rooms"
      className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8"
    >
      <h2 className="mb-4 text-3xl font-bold text-gray-900">ประเภทห้องพัก</h2>

      <p className="mb-8 max-w-2xl text-lg text-gray-600">
        เราเสนอห้องพักในหลายประเภท เพื่อให้เหมาะกับความต้องการของแขก
      </p>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {rooms.map((room, index) => (
          <RoomCard key={index} room={room} hotelName={hotelName} />
        ))}
      </div>
    </section>
  );
}
