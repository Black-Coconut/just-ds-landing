/* Send a GA4 event if Analytics is loaded; a no-op otherwise (no ID set, blocked by the browser, etc.). */

type Gtag = (command: "event", name: string, params?: Record<string, string | number>) => void;

export function track(name: string, params?: Record<string, string | number>) {
  if (typeof window === "undefined") return;
  const gtag = (window as unknown as { gtag?: Gtag }).gtag;
  if (typeof gtag === "function") gtag("event", name, params);
}
