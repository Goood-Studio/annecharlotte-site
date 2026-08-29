// robots.txt généré au build : le sitemap pointe toujours vers la bonne
// cible (recette ou domaine final), impossible de l'oublier à la bascule.
import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site }) => {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const racine = String(site ?? 'https://www.annecharlotte.be').replace(/\/$/, '') + base;
  const corps = [
    'User-agent: *',
    'Allow: /',
    '',
    `Sitemap: ${racine}/sitemap-index.xml`,
    '',
  ].join('\n');
  return new Response(corps, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
