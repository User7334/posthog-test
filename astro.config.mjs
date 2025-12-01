// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import vercel from '@astrojs/vercel';

// Validate required environment variables at build time
if (!process.env.PUBLIC_POSTHOG_KEY) {
  throw new Error('❌ PUBLIC_POSTHOG_KEY is not set. Please add it to .env.local or Vercel Environment Variables.');
}
if (!process.env.PUBLIC_POSTHOG_HOST) {
  throw new Error('❌ PUBLIC_POSTHOG_HOST is not set. Please add it to .env.local or Vercel Environment Variables.');
}

export default defineConfig({
  // Use server output so the Vercel adapter produces a `.vercel/output` Build Output API
  // (needed when deploying server-rendered or edge functions with the Vercel adapter)
  output: 'server',
  adapter: vercel(),
  vite: {
    plugins: [tailwindcss()]
  }
});
