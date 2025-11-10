import posthog from "posthog-js";

const POSTHOG_KEY = "phc_KOcWjzbh56k1BfKTHlPJD0PGavdy7gMd7qVME4syB40"; // <- dein API-Key
const POSTHOG_HOST = "https://us.posthog.com"; // oder EU: "https://eu.posthog.com"

// Prüfen, ob wir im Browser sind
if (typeof window !== "undefined") {
  posthog.init(POSTHOG_KEY, {
    api_host: POSTHOG_HOST,
    autocapture: true,
    persistence: "localStorage", // optional: cookies|localStorage|memory
  });

  // Optional: für globalen Zugriff
  (window as any).posthog = posthog;
}

export default posthog;
