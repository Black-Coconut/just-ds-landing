export const SITE_URL = "https://deesser.voltamix.studio";
export const VERSION = "1.1.1";

/* Social sharing (X, Facebook, KakaoTalk…). */
export const X_HANDLE = ""; // e.g. "@voltamix" — adds twitter:site / twitter:creator when set
export const OG_VERSION = "2"; // bump after changing public/og/*.png so X / Kakao / Facebook fetch the new image

/* ============================================================
   DOWNLOAD LINKS — fill these in when the builds are ready.
   Empty string = the button renders as a disabled "coming soon".
   ============================================================ */
export const DOWNLOADS = {
  windows: "/downloads/Just-DS-1.1.1-Windows-Setup.exe", // public/downloads/ (Inno Setup installer, VST3)
  mac: "/downloads/Just-DS-1.1.1-macOS.pkg", // public/downloads/ (notarized pkg from the plug-in repo's dist/)
} as const;

export type Platform = keyof typeof DOWNLOADS;
