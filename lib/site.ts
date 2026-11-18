export const SITE_URL = "https://deesser.voltamix.studio";
export const VERSION = "0.7.4";

/* ============================================================
   DOWNLOAD LINKS — fill these in when the builds are ready.
   Empty string = the button renders as a disabled "coming soon".
   ============================================================ */
export const DOWNLOADS = {
  windows: "", // e.g. "https://github.com/<org>/<repo>/releases/download/v0.7.4/Just-DS-0.7.4-Windows-x64.zip"
  mac: "",     // e.g. "https://github.com/<org>/<repo>/releases/download/v0.7.4/Just-DS-0.7.4-macOS.pkg"
} as const;

export type Platform = keyof typeof DOWNLOADS;
