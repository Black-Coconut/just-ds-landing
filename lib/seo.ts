import type { Metadata, Viewport } from "next";
import type { Dict } from "./content";
import { OG_VERSION, SITE_URL, X_HANDLE } from "./site";

export const viewport: Viewport = {
  themeColor: "#1d1e22",
  colorScheme: "dark",
};

export function buildMetadata(t: Dict): Metadata {
  // absolute, versioned image URL: some preview crawlers ignore metadataBase, and the version busts their caches
  const image = {
    url: `${SITE_URL}${t.meta.ogImage}?v=${OG_VERSION}`,
    secureUrl: `${SITE_URL}${t.meta.ogImage}?v=${OG_VERSION}`,
    type: "image/png",
    width: 1200,
    height: 630,
    alt: t.meta.ogImageAlt,
  };
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
      url: `${SITE_URL}${t.path}`,
      title: t.meta.ogTitle,
      description: t.meta.ogDescription,
      locale: t.meta.ogLocale,
      alternateLocale: [t.meta.ogLocaleAlt],
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: t.meta.ogTitle,
      description: t.meta.ogDescription,
      images: [{ url: image.url, alt: image.alt, width: image.width, height: image.height }],
      ...(X_HANDLE ? { site: X_HANDLE, creator: X_HANDLE } : {}),
    },
    robots: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
    },
    appleWebApp: { title: "Just-DS", statusBarStyle: "black-translucent" },
    formatDetection: { telephone: false, email: false, address: false },
    other: { "msapplication-TileColor": "#1d1e22" },
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
