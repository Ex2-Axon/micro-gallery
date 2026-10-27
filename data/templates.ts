import { TEMPLATE_PRICES } from "./config";
import configuredTemplates from "./templates.json";

export interface Room {
  name: string;
  description: string;
  amenities: string[];
  pricePerNight: number;
  priceCurrency: "บาท";
}

export interface LodgingLocation {
  address: string;
  directions?: string;
  googleMapsUrl: string;
}

export interface LodgingContact {
  phone: string;
  lineId: string;
  lineUrl: string;
}

export interface TemplateBadge {
  label: string;
  url: string;
}

export interface Template {
  name: string;
  url: string;
  image: string;
  framework: "Next.js" | "Vite";
  frameworkVersion?: string;
  languages?: string[];
  technologies?: string[];
  database?: string;
  sourceRepository?: string;
  deploymentPlatform?: string;
  deployedUrl?: string;
  badges?: TemplateBadge[];
  salePrice: number;
  salePriceCurrency?: "THB";
  usesDatabase: boolean;
  type?: "general" | "lodging";
  tagline?: string;
  about?: string;
  rooms?: Room[];
  facilities?: string[];
  location?: LodgingLocation;
  contact?: LodgingContact;
  gallery?: string[];
}

function getTemplateDefaults(
  name: string,
): Pick<Template, "framework" | "salePrice" | "usesDatabase"> {
  if (name.startsWith("x-template-special-")) {
    return {
      framework: "Vite",
      salePrice: TEMPLATE_PRICES.special,
      usesDatabase: true,
    };
  }

  if (name.startsWith("x-template-next-")) {
    return {
      framework: "Next.js",
      salePrice: TEMPLATE_PRICES.next,
      usesDatabase: false,
    };
  }

  return {
    framework: "Vite",
    salePrice: TEMPLATE_PRICES.vite,
    usesDatabase: false,
  };
}

export const templates: Template[] = (
  configuredTemplates as Omit<
    Template,
    "framework" | "salePrice" | "usesDatabase"
  >[]
).map((template) => ({
  ...template,
  ...getTemplateDefaults(template.name),
}));
