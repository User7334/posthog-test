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

export async function posthogReadyFull(): Promise<void> {
  if (typeof window === "undefined") return;
  const ph = (window as any).posthog;
  if (!ph) return;

  // Wenn Flags bereits geladen sind, direkt weiter
  if (ph.featureFlags?.isLoaded) return;

  // Ansonsten auf den Load warten (max. 500ms)
  await new Promise<void>((resolve) => {
    let settled = false;
    const timeout = setTimeout(() => {
      if (!settled) resolve();
    }, 500);
    ph.onFeatureFlags?.(() => {
      settled = true;
      clearTimeout(timeout);
      resolve();
    });
  });
}

export function getPosthog() {
  return (window as any).posthog;
}
