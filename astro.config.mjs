// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  site: 'https://namatanvay.github.io/portfolio',
  // Remove base for development - add it back when deploying
  // base: '/portfolio',

  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [react()],

  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp'
    }
  }
});