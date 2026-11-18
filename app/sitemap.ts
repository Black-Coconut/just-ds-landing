import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

/* English first. x-default is "/", which sends each visitor to their language (proxy.ts). */
export default function sitemap(): MetadataRoute.Sitemap {
  const languages = { en: `${SITE_URL}/en`, ko: `${SITE_URL}/ko`, "x-default": SITE_URL };
  const lastModified = new Date();
  return [
    { url: `${SITE_URL}/en`, lastModified, changeFrequency: "weekly", priority: 1, alternates: { languages } },
    { url: `${SITE_URL}/ko`, lastModified, changeFrequency: "weekly", priority: 0.9, alternates: { languages } },
    { url: `${SITE_URL}/llms.txt`, lastModified, changeFrequency: "weekly", priority: 0.5 },
  ];
}
