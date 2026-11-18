"use client";

import { track } from "@/lib/track";

/** Download link that also records a GA4 "download_click" event with the platform and page language. */
export default function DownloadButton({ href, platform, lang, children }: { href: string; platform: string; lang: string; children: string }) {
  return (
    <a className="btn btn-gold" href={href} download onClick={() => track("download_click", { platform, page_lang: lang })}>
      {children}
    </a>
  );
}
