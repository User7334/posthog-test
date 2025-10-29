// src/scripts/posthog-loader.js
import posthog from "posthog-js";

let initialized = false;

export function initPostHog(apiKey, apiHost) {
  if (typeof window === "undefined") return null;

  // falls schon vorhanden → einfach zurückgeben
  if (initialized && window.posthog) return window.posthog;

  // Initialisierung
  posthog.init(apiKey, {
    api_host: apiHost,
    capture_pageview: true,
    autocapture: true,
    persistence: "localStorage",
    disable_session_recording: true,
  });

  window.posthog = posthog;
  initialized = true;

  console.log("[PostHog] initialized:", apiHost);
  return posthog;
}

export function getPostHog() {
  if (typeof window === "undefined") return null;
  return window.posthog || null;
}
