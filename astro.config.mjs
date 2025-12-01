// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import vercel from '@astrojs/vercel';

export default defineConfig({
  // Use server output so the Vercel adapter produces a `.vercel/output` Build Output API
  // (needed when deploying server-rendered or edge functions with the Vercel adapter)
  output: 'static',
  adapter: vercel(),
  vite: {
    plugins: [tailwindcss()]
  }
});
