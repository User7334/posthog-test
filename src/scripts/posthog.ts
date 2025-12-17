import posthog from "posthog-js";
import { resolvePostHogReady } from "./ready.ts";

const TIMEOUT_MS = 2500;

function bootstrap() {
  try {
    posthog.init('phc_KOcWjzbh56k1BfKTHlPJD0PGavdy7gMd7qVME4syB40', {
      api_host: 'https://us.i.posthog.com',
      persistence: "localStorage",
      autocapture: false,
      capture_pageview: false,
    });

    let done = false;

    const timeout = setTimeout(() => {
      if (!done) resolvePostHogReady(null);
    }, TIMEOUT_MS);

    posthog.onFeatureFlags(() => {
      if (done) return;
      done = true;
      clearTimeout(timeout);
      resolvePostHogReady(posthog);
    });
  } catch {
    resolvePostHogReady(null);
  }
}

if (typeof window !== "undefined") {
  bootstrap();
}
