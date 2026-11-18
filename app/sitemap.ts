import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  // x-default is "/", which sends each visitor to their language (proxy.ts)
  const languages = { ko: `${SITE_URL}/ko`, en: `${SITE_URL}/en`, "x-default": SITE_URL };
  const lastModified = new Date();
  return [
    { url: `${SITE_URL}/ko`, lastModified, changeFrequency: "monthly", priority: 1, alternates: { languages } },
    { url: `${SITE_URL}/en`, lastModified, changeFrequency: "monthly", priority: 0.9, alternates: { languages } },
  ];
}
