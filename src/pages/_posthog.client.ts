// src/pages/_posthog.client.ts
import { initPosthog } from "../scripts/posthog";
import "../scripts/abtest";

if (typeof window !== "undefined") {
  console.log("🔥 _posthog.client.ts loaded");
  const key = import.meta.env.PUBLIC_POSTHOG_KEY || "phc_KOcWjzbh56k1BfKTHlPJD0PGavdy7gMd7qVME4syB40";
  const host = import.meta.env.PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com";
  initPosthog(key, host);
}
