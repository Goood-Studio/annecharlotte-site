// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { readFileSync } from 'node:fs';

// Deux cibles : la recette sur GitHub Pages (par défaut) et le domaine final.
// À la bascule DNS (phase 3), on passe AC_PROD=1 dans le workflow et rien d'autre.
const prod = process.env.AC_PROD === '1';

// Les pages relais (anciennes URLs Framer) sont servies mais jamais dans le
// sitemap : elles portent un noindex et une redirection.
const relais = Object.keys(
  JSON.parse(readFileSync(new URL('./src/data/redirections.json', import.meta.url), 'utf-8')).articles
);

export default defineConfig({
  site: prod ? 'https://www.annecharlotte.be' : 'https://goood-studio.github.io',
  base: prod ? '/' : '/annecharlotte-site',
  integrations: [
    sitemap({
      filter: (page) =>
        !page.includes('/404') &&
        !page.includes('sant%C3%A9-feminine') &&
        !page.includes('santé-feminine') &&
        !relais.some((slug) => page.includes('/articles/' + slug + '/')),
    }),
  ],
  build: { format: 'directory' },
});
