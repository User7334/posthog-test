// Lightweight ESM shim for PostHog (client-side)
// This file lives in /public so the browser can import it as /scripts/posthog.js
// It lazy-loads posthog-js from a CDN and exposes initPostHog/getPostHog helpers.

let _ph = null;
async function ensureLib() {
  if (_ph) return _ph;
  // Import the ESM build of posthog-js from unpkg. Adjust version if needed.
  const mod = await import('https://unpkg.com/posthog-js@1.281.0/dist/posthog.esm.js');
  // module default export is the PostHog object
  _ph = mod.default || mod.posthog || mod;
  return _ph;
}

export async function initPostHog(publicApiKey, host) {
  if (typeof window === 'undefined') return;
  try {
    const ph = await ensureLib();
    if (!ph) throw new Error('Failed to load PostHog library');
    ph.init(publicApiKey, {
      api_host: host,
      capture_pageview: true,
      autocapture: true,
      persistence: 'localStorage',
      disable_session_recording: true,
    });
    window.posthog = ph;
    console.log('PostHog initialized (public/scripts/posthog.js)');
  } catch (err) {
    console.error('Failed to initialize PostHog', err);
  }
}

export function getPostHog() {
  return typeof window !== 'undefined' ? window.posthog || _ph : null;
}
