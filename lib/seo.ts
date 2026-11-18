import type { Metadata, Viewport } from "next";
import type { Dict } from "./content";
import { SITE_URL } from "./site";

export const viewport: Viewport = {
  themeColor: "#1d1e22",
  colorScheme: "dark",
};

export function buildMetadata(t: Dict): Metadata {
  return {
    metadataBase: new URL(SITE_URL),
    title: t.meta.title,
    description: t.meta.description,
    applicationName: "Just-DS",
    authors: [{ name: "Volta", url: "https://voltamix.studio" }],
    keywords: t.meta.keywords,
    category: "music software",
    alternates: {
      canonical: t.path,
      languages: { en: "/en", ko: "/ko", "x-default": "/" },
      types: { "text/plain": "/llms.txt" },
    },
    openGraph: {
      type: "website",
      siteName: "Just-DS by Volta",
      url: t.path,
      title: t.meta.ogTitle,
      description: t.meta.ogDescription,
      locale: t.meta.ogLocale,
      alternateLocale: [t.meta.ogLocaleAlt],
      images: [{ url: t.meta.ogImage, width: 1200, height: 630, alt: t.meta.ogImageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: t.meta.ogTitle,
      description: t.meta.ogDescription,
      images: [t.meta.ogImage],
    },
    robots: { index: true, follow: true, "max-image-preview": "large" },
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "48x48" },
        { url: "/icon.svg", type: "image/svg+xml" },
      ],
      apple: "/apple-touch-icon.png",
    },
    manifest: "/manifest.webmanifest",
  };
}
