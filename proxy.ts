import { NextResponse, type NextRequest } from "next/server";
import { LANG_COOKIE, pathFor, pickLang, type Lang } from "@/lib/i18n";

/* Link-preview crawlers (X, Facebook, Slack, KakaoTalk…) often don't follow redirects, so a shared
   "https://deesser.voltamix.studio" would show no card. They get the page itself at "/" instead. */
const PREVIEW_BOTS =
  /twitterbot|facebookexternalhit|facebot|meta-externalagent|slackbot|discordbot|linkedinbot|telegrambot|whatsapp|kakaotalk-scrap|pinterest|redditbot|skypeuripreview|embedly|iframely|vkshare|line-poker|applebot|bluesky|mastodon/i;

/** "/" → "/ko" or "/en": the visitor's saved choice, else the browser language. Query strings (utm…) are kept. */
export function proxy(request: NextRequest) {
  const ua = request.headers.get("user-agent") ?? "";
  const acceptLanguage = request.headers.get("accept-language");

  if (PREVIEW_BOTS.test(ua)) {
    const lang: Lang = /kakaotalk-scrap/i.test(ua) ? "ko" : pickLang(undefined, acceptLanguage);
    const response = NextResponse.rewrite(new URL(pathFor(lang) + request.nextUrl.search, request.url));
    response.headers.set("Vary", "User-Agent, Accept-Language");
    return response;
  }

  const lang = pickLang(request.cookies.get(LANG_COOKIE)?.value, acceptLanguage);
  const url = new URL(pathFor(lang) + request.nextUrl.search, request.url);
  const response = NextResponse.redirect(url, 307);
  response.headers.set("Vary", "Accept-Language, Cookie, User-Agent");
  response.headers.set("Cache-Control", "private, no-store");
  return response;
}

export const config = { matcher: "/" };
