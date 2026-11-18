import type { ReactNode } from "react";
import { barlow, barlowCondensed, notoSansKr } from "@/lib/fonts";
import "../globals.css";

export { viewport } from "@/lib/seo";

/* Root layout for the Korean site at "/". Each language is its own root layout so <html lang> is right. */
export default function KoreanRootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko" className={`${barlowCondensed.variable} ${barlow.variable} ${notoSansKr.variable}`}>
      <body>{children}</body>
    </html>
  );
}
