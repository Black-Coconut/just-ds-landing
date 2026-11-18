import type { Dict } from "@/lib/content";
import { DOWNLOADS, SITE_URL, VERSION } from "@/lib/site";

/** schema.org graph for search engines and AI answer engines:
    the plugin (free offer, features, keywords), publisher, website, this page, and every Q&A shown on the page. */
export default function JsonLd({ t }: { t: Dict }) {
  const pageUrl = SITE_URL + t.path;
  const downloads = Object.values(DOWNLOADS).filter(Boolean);
  const modified = new Date().toISOString().slice(0, 10); // build date

  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "@id": `${SITE_URL}/#app`,
        name: "Just-DS",
        alternateName: ["Just-DS free de-esser", "Just-DS by Volta"],
        description: t.schema.description,
        applicationCategory: "MultimediaApplication",
        applicationSubCategory: "De-esser audio plug-in (VST3, AU)",
        operatingSystem: "Windows (64-bit), macOS 11+",
        softwareRequirements: "A 64-bit DAW that hosts VST3 or AU plug-ins",
        softwareVersion: VERSION,
        inLanguage: ["en", "ko"],
        isAccessibleForFree: true,
        keywords: t.meta.keywords.join(", "),
        url: pageUrl,
        image: SITE_URL + t.meta.ogImage,
        screenshot: SITE_URL + t.hero.img,
        ...(downloads.length ? { downloadUrl: downloads } : {}),
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
          availability: downloads.length ? "https://schema.org/InStock" : "https://schema.org/PreOrder",
        },
        featureList: t.schema.featureList,
        publisher: { "@id": `${SITE_URL}/#org` },
        author: { "@id": `${SITE_URL}/#org` },
      },
      { "@type": "Organization", "@id": `${SITE_URL}/#org`, name: "Volta", url: "https://voltamix.studio" },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: "Just-DS",
        inLanguage: ["en", "ko"],
        publisher: { "@id": `${SITE_URL}/#org` },
      },
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#page`,
        url: pageUrl,
        name: t.schema.pageName,
        description: t.meta.description,
        inLanguage: t.lang,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${SITE_URL}/#app` },
        primaryImageOfPage: SITE_URL + t.meta.ogImage,
        dateModified: modified,
      },
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
        inLanguage: t.lang,
        mainEntity: [...t.guide.items, ...t.faq.items].map((f) => ({
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
