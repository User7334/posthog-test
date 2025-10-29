import posthog from "posthog-js";

let initialized = false;

export function initPostHog(publicApiKey, host) {
  if (typeof window === "undefined" || initialized) return;

  posthog.init(publicApiKey, {
    api_host: host,
    capture_pageview: true,
    autocapture: true,
    persistence: 'localStorage',
    disable_session_recording: true,
  });

  window.posthog = posthog;
  initialized = true;
  console.log("PostHog initialized");
}

export function getPostHog() {
  return typeof window !== "undefined" ? window.posthog : null;
}
