import type { Template } from "@/data/templates";
import Footer from "../Footer";

interface LodgingFooterProps {
  template?: Template;
}

export default function LodgingFooter({ template }: LodgingFooterProps) {
  return (
    <footer>
      <Footer />
    </footer>
  );
}
