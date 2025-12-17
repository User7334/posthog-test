import type posthog from "posthog-js";

export type PostHogInstance = typeof posthog | null;

declare global {
  interface Window {
    __phReady?: Promise<PostHogInstance>;
    __resolvePhReady?: (ph: PostHogInstance) => void;
  }
}

export function getPostHogReady(): Promise<PostHogInstance> {
  if (typeof window === "undefined") return Promise.resolve(null);

  if (!window.__phReady) {
    window.__phReady = new Promise<PostHogInstance>((resolve) => {
      window.__resolvePhReady = resolve;
    });
  }

  return window.__phReady;
}

export function resolvePostHogReady(ph: PostHogInstance) {
  if (typeof window === "undefined") return;
  window.__resolvePhReady?.(ph);
}
