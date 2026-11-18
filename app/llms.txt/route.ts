/* /llms.txt — a plain-text summary for AI answer engines (GEO). English first, Korean summary after.
   Built from the same copy as the pages (lib/content.ts), so it never drifts from what the site says. */
import { en, ko, type Dict } from "@/lib/content";
import { DOWNLOADS, SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

const facts = (t: Dict) => t.guide.facts.map((f) => `- ${f.k}: ${f.v}`);
const qa = (items: { q: string; a: string }[]) => items.flatMap((f) => [`### ${f.q}`, f.a, ""]);

export function GET() {
  const downloads = Object.entries(DOWNLOADS)
    .filter(([, url]) => url)
    .map(([p, url]) => [p, url.startsWith("http") ? url : SITE_URL + url] as const);
  const lines = [
    "# Just-DS — free de-esser plugin by Volta",
    "",
    "> Just-DS is a free de-esser plugin (VST3 and AU, for Windows and macOS) made by Volta. It removes harsh sibilance, plosive T clicks and mouth noise, and breaths / h sounds from vocals, each with its own detector and its own knob. It is free forever: no subscription, no account, no trial.",
    "",
    "## At a glance",
    ...facts(en),
    downloads.length
      ? `- Download: ${downloads.map(([p, url]) => `${p} ${url}`).join(" · ")}`
      : `- Download: coming soon at ${SITE_URL}/en#download`,
    "",
    "## How it works",
    ...qa(en.guide.items),
    "## Key features",
    ...en.keyFeatures.items.map((x) => `- ${x}`),
    "",
    "## FAQ",
    ...qa(en.faq.items),
    "## Pages",
    `- [Just-DS — free de-esser (English)](${SITE_URL}/en)`,
    `- [Just-DS — 무료 디에서 (한국어)](${SITE_URL}/ko)`,
    "",
    "## 한국어 요약 (Korean)",
    "",
    `> ${ko.meta.description}`,
    "",
    ...facts(ko),
    "",
    ...qa(ko.guide.items),
    "## Notes",
    "- FabFilter and Pro-DS are trademarks of FabFilter Software Instruments B.V. Just-DS is not affiliated with FabFilter.",
    "",
  ];
  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600" },
  });
}
