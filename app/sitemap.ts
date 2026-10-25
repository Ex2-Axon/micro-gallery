import type { MetadataRoute } from "next";
import { templates } from "../data/templates";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://gallery.microtronic.biz";

  const templateUrls = templates.map((template) => ({
    url: `${baseUrl}/template/${template.name}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    ...templateUrls,
  ];
}
