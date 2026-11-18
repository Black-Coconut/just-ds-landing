/* Language routing shared by proxy.ts (server) and the language toggle (client). */

export const LANGS = ["ko", "en"] as const;
export type Lang = (typeof LANGS)[number];

export const DEFAULT_LANG: Lang = "en"; // for browsers that ask for neither Korean nor English
export const LANG_COOKIE = "jds-lang"; // set only when the visitor picks a language themselves
export const LANG_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

export const pathFor = (lang: Lang) => `/${lang}`;

const isLang = (v: string | undefined | null): v is Lang => !!v && (LANGS as readonly string[]).includes(v);

/** Visitor's own choice first, then the browser's preferred languages in q order. */
export function pickLang(cookie: string | undefined, acceptLanguage: string | null): Lang {
  if (isLang(cookie)) return cookie;
  const ranked = (acceptLanguage ?? "")
    .split(",")
    .map((part, i) => {
      const [tag, ...params] = part.trim().toLowerCase().split(";");
      const q = params.map((p) => p.trim()).find((p) => p.startsWith("q="));
      return { base: tag.split("-")[0], q: q ? Number(q.slice(2)) || 0 : 1, i };
    })
    .filter((x) => x.base && x.q > 0)
    .sort((a, b) => b.q - a.q || a.i - b.i);
  for (const { base } of ranked) if (isLang(base)) return base;
  return DEFAULT_LANG;
}
