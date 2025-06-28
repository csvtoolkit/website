// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), mdx()],
  site: 'https://csvtoolkit.org',
  build: {
    inlineStylesheets: 'auto',
    assets: '_astro'
  },
  vite: {
    build: {
      cssCodeSplit: true,
      minify: 'terser',
      rollupOptions: {
        output: {
          manualChunks: (id) => {
            // Separate vendor chunks for better caching
            if (id.includes('node_modules')) {
              return 'vendor';
            }
            // Keep search separate for lazy loading
            if (id.includes('pagefind')) {
              return 'search';
            }
          },
          assetFileNames: (assetInfo) => {
            if (!assetInfo.name) return '_astro/[name].[hash][extname]';
            const info = assetInfo.name.split('.');
            const ext = info[info.length - 1];
            if (/\.(css)$/.test(assetInfo.name)) {
              return `_astro/[name].[hash].${ext}`;
            }
            return `_astro/[name].[hash].${ext}`;
          }
        }
      }
    }
  },
  compressHTML: true
});
