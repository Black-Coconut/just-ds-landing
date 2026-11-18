import type { ReactNode } from "react";
import { barlow, barlowCondensed } from "@/lib/fonts";
import "../globals.css";

export { viewport } from "@/lib/seo";

/* Root layout for the English site at "/en". */
export default function EnglishRootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${barlowCondensed.variable} ${barlow.variable}`}>
      <body>{children}</body>
    </html>
  );
}
