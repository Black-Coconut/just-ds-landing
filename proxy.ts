import { NextResponse, type NextRequest } from "next/server";
import { LANG_COOKIE, pathFor, pickLang } from "@/lib/i18n";

/** "/" → "/ko" or "/en": the visitor's saved choice, else the browser language. Query strings (utm…) are kept. */
export function proxy(request: NextRequest) {
  const lang = pickLang(request.cookies.get(LANG_COOKIE)?.value, request.headers.get("accept-language"));
  const url = new URL(pathFor(lang) + request.nextUrl.search, request.url);
  const response = NextResponse.redirect(url, 307);
  response.headers.set("Vary", "Accept-Language, Cookie");
  response.headers.set("Cache-Control", "private, no-store");
  return response;
}

export const config = { matcher: "/" };
