import type { Dict } from "@/lib/content";
import { SITE_URL, VERSION } from "@/lib/site";

/** schema.org graph: the plugin (free offer), its publisher, this page, and the FAQ. */
export default function JsonLd({ t }: { t: Dict }) {
  const pageUrl = SITE_URL + t.path;
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "@id": `${SITE_URL}/#app`,
        name: "Just-DS",
        alternateName: "Just-DS De-esser",
        description: t.schema.description,
        applicationCategory: "MultimediaApplication",
        applicationSubCategory: "Audio plug-in (VST3, AU)",
        operatingSystem: "Windows (64-bit), macOS 11+",
        softwareVersion: VERSION,
        inLanguage: ["ko", "en"],
        isAccessibleForFree: true,
        url: pageUrl,
        image: SITE_URL + t.meta.ogImage,
        screenshot: SITE_URL + t.hero.img,
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD", availability: "https://schema.org/InStock" },
        featureList: t.schema.featureList,
        publisher: { "@id": `${SITE_URL}/#org` },
      },
      { "@type": "Organization", "@id": `${SITE_URL}/#org`, name: "Volta", url: "https://voltamix.studio" },
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#page`,
        url: pageUrl,
        name: t.schema.pageName,
        inLanguage: t.lang,
        about: { "@id": `${SITE_URL}/#app` },
      },
      {
        "@type": "FAQPage",
        mainEntity: t.faq.items.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };
  return (
    <script
      type="application/ld+json"
      // JSON from our own static copy; escape "<" so a string can never close the tag
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
