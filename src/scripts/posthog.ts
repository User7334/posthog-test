// src/scripts/posthog.ts
import posthog from "posthog-js";

export function initPosthog(publicKey: string, host: string) {
  if (typeof window === "undefined") {
    return;
  }
  if ((window as any).posthog) {
    return;
  }
  posthog.init(publicKey, {
    api_host: host,
    persistence: "localStorage",    // localStorage wie gewünscht
    capture_pageview: true,
    autocapture: true,
  });
  (window as any).posthog = posthog;
  console.log("✅ PostHog initialisiert", publicKey, host);
}
