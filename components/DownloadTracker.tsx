"use client";

import { useEffect } from "react";
import { track } from "@/lib/track";

/**
 * GA4 events for the path to the download section (the download itself is DownloadButton's "download_click"):
 * - "download_cta_click" { cta_location }: a link marked data-cta="…" was clicked (header, hero, nav, final)
 * - "download_section_view": #download came into view, once per page load
 * Renders nothing; Landing stays a server component and only marks its links with data-cta.
 */
export default function DownloadTracker({ lang }: { lang: string }) {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.("a[data-cta]");
      if (a) track("download_cta_click", { cta_location: a.getAttribute("data-cta") ?? "", page_lang: lang });
    };
    document.addEventListener("click", onClick);

    const section = document.getElementById("download");
    let io: IntersectionObserver | undefined;
    if (section && "IntersectionObserver" in window) {
      io = new IntersectionObserver(
        (entries) => {
          if (entries.some((x) => x.isIntersecting)) {
            track("download_section_view", { page_lang: lang });
            io?.disconnect();
          }
        },
        // fires once the section's top passes 60% of the viewport (a ratio threshold would never hit on tall mobile layouts)
        { rootMargin: "0px 0px -40% 0px" },
      );
      io.observe(section);
    }

    return () => {
      document.removeEventListener("click", onClick);
      io?.disconnect();
    };
  }, [lang]);

  return null;
}
