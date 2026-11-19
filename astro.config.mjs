import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  site: 'https://scriptum.minimmon.cat',
  integrations: [tailwind()],
  server: {
    port: 4321
  }
});

