interface FacilityIconProps {
  facilityName: string;
}

const facilityEmojis: Record<string, string> = {
  "Wi-Fi ฟรี": "📶",
  "ที่จอดรถ": "🅿️",
  "อาหารเช้าแบบไทย-ตะวันตก": "🍳",
  "สวนส่วนตัว": "🌿",
  "ระเบียง/ชานพัก": "🏞️",
  "น้ำดื่มฟรี": "💧",
};

export default function FacilityIcon({ facilityName }: FacilityIconProps) {
  const emoji = facilityEmojis[facilityName] || "✨";

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="text-2xl">{emoji}</div>
      <p className="text-sm font-medium text-gray-700 text-center">
        {facilityName}
      </p>
    </div>
  );
}
