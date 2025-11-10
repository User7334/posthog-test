// src/scripts/posthog.ts
let initPromise: Promise<void> | null = null;

export function initPosthog(publicKey: string, host = "https://app.posthog.com") {
  if (typeof window === "undefined") return;
  if ((window as any).posthog) return initPromise ?? Promise.resolve();

  if (!initPromise) {
    initPromise = import("posthog-js").then(({ default: ph }) => {
      if ((window as any).posthog) return;

      ph.init(publicKey, {
        api_host: host,
        persistence: "localStorage",
        capture_pageview: true,
        disable_session_recording: true,
      });

      (window as any).posthog = ph;
    });
  }

  return initPromise;
}

export function posthogReady(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if ((window as any).posthog) return Promise.resolve();
  return initPromise ?? Promise.resolve();
}

export function getPosthog() {
  return (window as any).posthog;
}
