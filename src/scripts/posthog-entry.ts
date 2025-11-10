if (typeof window !== "undefined") {
  console.log("🔥 posthog-entry.ts running in browser");

  // Dynamische Imports nur im Browser
  Promise.all([import("./posthog"), import("./abtest")]).then(
    ([{ initPosthog }]) => {
      const key =
        import.meta.env.PUBLIC_POSTHOG_KEY ||
        "phc_KOcWjzbh56k1BfKTHlPJD0PGavdy7gMd7qVME4syB40";
      const host =
        import.meta.env.PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com";

      console.log("🚀 Initializing PostHog...");
      initPosthog(key, host);
    }
  );
}
