// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import vercel from '@astrojs/vercel';

export default defineConfig({
  output: 'server',
  adapter: vercel({
    includeFiles: ["node_modules/posthog-node/**/*"], // <— wichtig
  }),
  vite: {
    plugins: [tailwindcss()]
  }
});