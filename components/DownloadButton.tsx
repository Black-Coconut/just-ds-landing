"use client";

import { track } from "@/lib/track";
import { VERSION } from "@/lib/site";

/** Download link that also records a GA4 "download_click" event (platform, version, file name, page language). */
export default function DownloadButton({ href, platform, lang, children }: { href: string; platform: string; lang: string; children: string }) {
  const onClick = () =>
    track("download_click", { platform, version: VERSION, file_name: href.split("/").pop() ?? href, page_lang: lang });
  return (
    <a className="btn btn-gold" href={href} download onClick={onClick}>
      {children}
    </a>
  );
}
