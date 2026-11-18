"use client";

import { useEffect, useState } from "react";
import type { Dict, Lang } from "@/lib/content";
import { LANG_COOKIE } from "@/lib/i18n";
import { LangLink } from "./LangSwitch";

const KEY = "jds-lang-hint";

/** Suggests the other language when someone lands on a page that isn't theirs (e.g. a shared /en link).
    Never redirects: both URLs stay crawlable. Hidden once the visitor has picked a language. */
export default function LangHint({ pageLang, t }: { pageLang: Lang; t: Dict["hint"] }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (document.cookie.split("; ").some((c) => c.startsWith(`${LANG_COOKIE}=`))) return;
    try { if (window.localStorage.getItem(KEY) === "off") return; } catch { /* storage blocked */ }
    const first = (navigator.languages?.[0] ?? navigator.language ?? "").slice(0, 2).toLowerCase();
    if (!first) return;
    if ((pageLang === "ko" && first !== "ko") || (pageLang === "en" && first === "ko")) setShow(true);
  }, [pageLang]);

  if (!show) return null;
  return (
    <div className="lang-hint" lang={t.lang}>
      <span>
        {t.text} <LangLink lang={t.lang} current={pageLang}>{t.link}</LangLink>
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
