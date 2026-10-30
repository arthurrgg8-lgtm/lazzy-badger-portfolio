import type { MetadataRoute } from "next";
import { profile } from "@/lib/profile";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://anuditk.vercel.app";
  const lastModified = new Date();

  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: "weekly",
      priority: 1.0
    },
    {
      url: `${baseUrl}/llms.txt`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9
    },
    {
      url: `${baseUrl}/assets/AnuditCV.pdf`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8
    }
  ];

  const certRoutes: MetadataRoute.Sitemap = profile.certifications_detail.map((cert) => ({
    url: `${baseUrl}${cert.file}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.6
  }));

  return [...routes, ...certRoutes];
}
