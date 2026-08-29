// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Deux cibles : la recette sur GitHub Pages (par défaut) et le domaine final.
// À la bascule DNS (phase 3), on passe AC_PROD=1 dans le workflow et rien d'autre.
const prod = process.env.AC_PROD === '1';

export default defineConfig({
  site: prod ? 'https://www.annecharlotte.be' : 'https://goood-studio.github.io',
  base: prod ? '/' : '/annecharlotte-site',
  integrations: [sitemap()],
  build: { format: 'directory' },
});
