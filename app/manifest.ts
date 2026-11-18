import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Just-DS — Free De-esser",
    short_name: "Just-DS",
    description: "Free de-esser VST3/AU: sibilance, clicks and breaths.",
    start_url: "/",
    display: "browser",
    background_color: "#121315",
    theme_color: "#1d1e22",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
