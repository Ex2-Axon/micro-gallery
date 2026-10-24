import type { Template } from "../../data/templates";
import LodgingNavigation from "./LodgingNavigation";
import LodgingHero from "./LodgingHero";
import Gallery from "./Gallery";
import AboutSection from "./AboutSection";
import RoomTypes from "./RoomTypes";
import Facilities from "./Facilities";
import LocationSection from "./LocationSection";
import ContactSection from "./ContactSection";
import Footer from "../ui/Footer";

interface LodgingLayoutProps {
  template: Template;
}

export default function LodgingLayout({ template }: LodgingLayoutProps) {
  // Guard against missing required fields
  if (
    !template.name ||
    !template.tagline ||
    !template.rooms ||
    !template.facilities ||
    !template.location ||
    !template.contact ||
    !template.about
  ) {
    return (
      <div className="min-h-screen bg-red-50 px-4 py-8 text-center text-red-900">
        <h1 className="text-2xl font-bold">ข้อมูลที่พักไม่ครบถ้วน</h1>
        <p className="mt-2">กรุณาตรวจสอบข้อมูลเทมเพลต</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <LodgingNavigation lodgeName={template.name} />

      <main id="main-content" className="flex flex-col">
        <LodgingHero name={template.name} tagline={template.tagline} />

        <Gallery images={template.gallery} />

        <AboutSection about={template.about} lodgeName={template.name} />

        <RoomTypes rooms={template.rooms} />

        <Facilities facilities={template.facilities} />

        <LocationSection location={template.location} />

        <ContactSection contact={template.contact} />
      </main>

      <Footer />
    </div>
  );
}
