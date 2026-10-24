import type { Template } from "@/data/templates";
import Header from "./Header";
import HeroSection from "./HeroSection";
import Footer from "../Footer";

interface LodgingLayoutProps {
  template: Template;
  children?: React.ReactNode;
}

export default function LodgingLayout({ template, children }: LodgingLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900">
      <Header hotelName={template.name} />
      
      <main id="main-content" className="flex-1">
        <HeroSection template={template} />
        
        {/* Placeholder for sections - will be imported as needed */}
        {children}
      </main>
      
      <Footer />
    </div>
  );
}
