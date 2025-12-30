// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  // Configure for Cloudflare Pages
  // Update this URL after deployment to your actual Cloudflare Pages URL
  // site: 'https://your-portfolio.pages.dev',

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