import { readdirSync } from "node:fs";
import { join } from "node:path";
import configuredTemplates from "./templates.json";

export interface Room {
  name: string;
  description: string;
  amenities: string[];
  pricePerNight: number;
  priceCurrency: "บาท";
}

export interface Facility {
  name: string;
  icon: "wifi" | "parking" | "ac" | "bathroom" | "hot-water" | "tv" | "elevator";
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

export interface Template {
  name: string;
  url: string;
  image: string;
  type?: "general" | "lodging";
  tagline?: string;
  about?: string;
  rooms?: Room[];
  facilities?: Facility[];
  location?: LodgingLocation;
  contact?: LodgingContact;
  gallery?: string[];
}

const supportedExtensions = new Set(["avif", "webp", "png", "jpg", "jpeg"]);
const extensionPriority = new Map(
  ["avif", "webp", "png", "jpg", "jpeg"].map((extension, index) => [
    extension,
    index,
  ]),
);
const publicDirectory = join(process.cwd(), "public");

const discoveredImages = readdirSync(publicDirectory)
  .map((filename) => {
    const match = /^(x-template-\d+)\.([^.]+)$/i.exec(filename);

    if (!match || !supportedExtensions.has(match[2].toLowerCase())) {
      return null;
    }

    return {
      filename,
      name: match[1].toLowerCase(),
      extension: match[2].toLowerCase(),
    };
  })
  .filter((image) => image !== null)
  .sort(
    (left, right) =>
      (extensionPriority.get(left.extension) ?? Number.MAX_SAFE_INTEGER) -
      (extensionPriority.get(right.extension) ?? Number.MAX_SAFE_INTEGER) ||
      left.filename.localeCompare(right.filename),
  );

const discoveredTemplates = new Map<string, Template>();

for (const image of discoveredImages) {
  if (!discoveredTemplates.has(image.name)) {
    discoveredTemplates.set(image.name, {
      name: image.name,
      url: `https://ex2-axon.github.io/${image.name}/`,
      image: `/${image.filename}`,
    });
  }
}

const configuredNames = new Set(configuredTemplates.map((template) => template.name));

export const templates: Template[] = [
  ...(configuredTemplates as Template[]),
  ...Array.from(discoveredTemplates.values()).filter(
    (template) => !configuredNames.has(template.name),
  ),
];
