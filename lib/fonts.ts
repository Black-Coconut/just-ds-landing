import { Barlow, Barlow_Condensed, Noto_Sans_KR } from "next/font/google";

export const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--f-display",
  display: "swap",
});

export const barlow = Barlow({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--f-body",
  display: "swap",
});

// Korean glyphs come as unicode-range chunks; only the ones a page uses are downloaded.
export const notoSansKr = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--f-kr",
  display: "swap",
  preload: false,
});
