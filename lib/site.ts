export const SITE_URL = "https://deesser.voltamix.studio";
export const VERSION = "1.1.0";

/* ============================================================
   DOWNLOAD LINKS — fill these in when the builds are ready.
   Empty string = the button renders as a disabled "coming soon".
   ============================================================ */
export const DOWNLOADS = {
  windows: "/downloads/Just-DS-1.1.0-Windows-Setup.exe", // public/downloads/ (Inno Setup installer, VST3)
  mac: "/downloads/Just-DS-1.1.0-macOS.pkg", // public/downloads/ (notarized pkg from the plug-in repo's dist/)
} as const;

export type Platform = keyof typeof DOWNLOADS;
