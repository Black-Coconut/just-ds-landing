"use client";

import { useEffect, useState } from "react";
import type { Dict, Lang } from "@/lib/content";

const KEY = "jds-lang-hint";

/** Suggests the other language. Never auto-redirects, so both URLs stay crawlable. */
export default function LangHint({ pageLang, t }: { pageLang: Lang; t: Dict["hint"] }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    try { if (window.localStorage.getItem(KEY) === "off") return; } catch { /* storage blocked */ }
    const first = (navigator.languages?.[0] ?? navigator.language ?? "").slice(0, 2).toLowerCase();
    if (!first) return;
    if ((pageLang === "ko" && first !== "ko") || (pageLang === "en" && first === "ko")) setShow(true);
  }, [pageLang]);

  if (!show) return null;
  return (
    <div className="lang-hint" lang={t.lang}>
      <span>
        {t.text} <a href={t.href} hrefLang={t.lang}>{t.link}</a>
      </span>
      <button
        type="button"
        aria-label={t.close}
        onClick={() => {
          setShow(false);
          try { window.localStorage.setItem(KEY, "off"); } catch { /* storage blocked */ }
        }}
      >
        ×
      </button>
    </div>
  );
}
