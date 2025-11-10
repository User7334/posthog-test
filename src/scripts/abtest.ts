// src/scripts/abtest.ts
import { initPosthog, posthogReadyFull, getPosthog } from "./posthog";

async function runABTests() {
  const tests = document.querySelectorAll<HTMLElement>("[data-abtest]");
  console.log("ABTEST.TS");
  if (!tests.length) return;

  for (const el of tests) {
    const flagKey = el.dataset.id!;
    const key = el.dataset.key!;
    const host = el.dataset.host!;
    const weight = parseFloat(el.dataset.weight || "0.5");

    await initPosthog(key, host);
    await posthogReadyFull();

    const ph = getPosthog();
    let variant = ph?.getFeatureFlag?.(flagKey);

    if (variant !== "A" && variant !== "B") {
      variant = Math.random() < weight ? "A" : "B";
    }

    const a = el.querySelector('[data-variant="A"]');
    const b = el.querySelector('[data-variant="B"]');
    if (variant === "A") {
        console.log("Variant A selected");
        a?.removeAttribute("hidden");
        b?.setAttribute("hidden", "");
    } else {
        console.log("Variant B selected");
        b?.removeAttribute("hidden");
        a?.setAttribute("hidden", "");
    }

    el.dataset.variant = variant;
    ph?.capture?.("abtest_variant_assigned", {
      id: flagKey,
      variant,
      page: location.pathname,
      timestamp: new Date().toISOString(),
    });

    const trackables = el.querySelectorAll<HTMLElement>("[data-track]");
    trackables.forEach((btn) => {
      btn.addEventListener("click", () => {
        ph?.capture?.("button_clicked", {
          id: flagKey,
          variant,
          page: location.pathname,
          timestamp: new Date().toISOString(),
          element: btn.dataset.track || "unknown",
        });
      });
    });
  }
}

document.addEventListener("DOMContentLoaded", runABTests);
