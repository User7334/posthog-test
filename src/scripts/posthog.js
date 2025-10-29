// src/scripts/posthog.js
import posthog from "posthog-js";

let initialized = false;

export function initPostHog(publicApiKey, host) {
  // Wenn kein Browser (SSR) → abbrechen
  if (typeof window === "undefined") return null;

  // Wenn schon initialisiert → return vorhandene Instanz
  if (initialized && window.posthog) return window.posthog;

  // Wenn PostHog bereits auf window gesetzt wurde → übernehmen
  if (window.posthog) {
    initialized = true;
    return window.posthog;
  }

  // Jetzt initialisieren
  posthog.init("phc_LWkJmAO7mxFzH6dXQxgZHsK7wJ7qn1RD6AAwvr7Okgm", {
    api_host: "https://us.i.posthog.com",
    capture_pageview: true,
    autocapture: true,
    persistence: 'localStorage',
    disable_session_recording: true,
  });

  window.posthog = posthog;
  initialized = true;
  console.info("[PostHog] initialized:", host);

  return posthog;
}

export function getPostHog() {
  if (typeof window === "undefined") return null;
  return window.posthog || null;
}

// 🔹 Hier kommt der globale Loader hinzu
if (typeof window !== "undefined") {
  window.initPostHog = initPostHog;
}
