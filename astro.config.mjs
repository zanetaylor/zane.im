import { defineConfig } from 'astro/config'; // import preact from '@astrojs/preact';

import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import tailwind from "@astrojs/tailwind";
import svelte from "@astrojs/svelte";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// https://astro.build/config
export default defineConfig({
  site: 'https://zane.im',
  redirects: {
    '/cv': '/resume'
  },
  markdown: {
    shikiConfig: {
      theme: 'github-dark'
    }
  },
  vite: {
    resolve: {
      alias: {
        '$': path.resolve(__dirname, './src')
      }
    }
  },
  integrations: [tailwind(), svelte()]
});