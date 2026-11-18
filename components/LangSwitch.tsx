"use client";

import type { MouseEvent, ReactNode } from "react";
import { LANG_COOKIE, LANG_COOKIE_MAX_AGE, pathFor, type Lang } from "@/lib/i18n";
import { track } from "@/lib/track";

/** Remember an explicit choice so "/" sends this visitor to the same language next time. */
export function rememberLang(lang: Lang) {
  document.cookie = `${LANG_COOKIE}=${lang}; path=/; max-age=${LANG_COOKIE_MAX_AGE}; samesite=lax`;
}

/** Plain link to the other language (works without JS); with JS it also keeps the current #section. */
function switchTo(e: MouseEvent<HTMLAnchorElement>, lang: Lang, current: Lang) {
  rememberLang(lang);
  if (lang !== current) track("language_switch", { from: current, to: lang });
  if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return; // let new-tab clicks through
  e.preventDefault();
  if (lang !== current) window.location.assign(pathFor(lang) + window.location.hash);
}

const NAMES: Record<Lang, string> = { ko: "한국어", en: "English" };

/** KO | EN segmented toggle for the header, styled like the plugin's switches. */
export default function LangSwitch({ current, aria }: { current: Lang; aria: string }) {
  return (
    <div className="lang-toggle" role="group" aria-label={aria}>
      {(["ko", "en"] as const).map((lang) => (
        <a
          key={lang}
          href={pathFor(lang)}
          hrefLang={lang}
          lang={lang}
          title={NAMES[lang]}
          aria-current={lang === current ? "page" : undefined}
          onClick={(e) => switchTo(e, lang, current)}
        >
          {lang.toUpperCase()}
        </a>
      ))}
    </div>
  );
}

/** Inline link to another language (footer, hint). */
export function LangLink({ lang, current, children }: { lang: Lang; current: Lang; children: ReactNode }) {
  return (
    <a href={pathFor(lang)} hrefLang={lang} lang={lang} onClick={(e) => switchTo(e, lang, current)}>
      {children}
    </a>
  );
}
