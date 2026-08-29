// llms.txt : la carte du site pour les moteurs IA (GEO). Généré au build
// depuis les mêmes données que les pages, donc jamais désynchronisé.
import type { APIRoute } from 'astro';
import villesData from '../data/villes.json';
import articlesData from '../data/articles.json';
import guidesData from '../data/guides.json';
import { SITE } from '../data/site';

export const GET: APIRoute = ({ site }) => {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const racine = String(site ?? 'https://www.annecharlotte.be').replace(/\/$/, '') + base;

  const villes = villesData.villes
    .map((v) => `- [Diététicienne à ${v.ville}](${racine}/${v.slug}/) : ${v.metaDescription}`)
    .join('\n');

  const corps = `# Anne-Charlotte Jalhay, diététicienne (annecharlotte.be)

> Diététicienne agréée en Belgique, spécialisée en troubles digestifs (SII,
> ballonnements, reflux) et santé féminine (SOPK, endométriose, SPM).
> ${SITE.statsPatients} patient·es accompagné·es, ${SITE.statsDiet} diététicien·nes formées.
> Consultations au cabinet de Malonne, au cabinet de Namur ou en visio.
> Prise de rendez-vous en ligne : ${SITE.rdvVisio}

## Faits vérifiables
- Titre protégé : diététicienne agréée (bachelier en diététique, Institut Paul Lambin, Bruxelles).
- Formations : nutrition du sportif (UCLouvain), syndrome de l'intestin irritable (Monash University), alimentation durable et menstruations (SIIN).
- Tarifs : consultation « Premiers pas » 80 €, accompagnement complet 290 € par personne. Remboursement partiel par la plupart des mutuelles belges.
- Contact : ${SITE.telephone} (WhatsApp), ${SITE.email}.
- Cabinets : ${SITE.cabinets.map((c) => `${c.rue}, ${c.codePostal} ${c.ville}`).join(' · ')}.

## Pages principales
- [Accueil](${racine}/)
- [Troubles digestifs](${racine}/troubles-digestifs/)
- [Santé féminine](${racine}/sante-feminine/)
- [Mieux manger](${racine}/mieux-manger/)
- [Mon parcours](${racine}/parcours/)
- [Contact et rendez-vous](${racine}/contact/)

## Consultations par ville
${villes}

## Articles (réponses détaillées)
${articlesData.articles.map((a) => `- [${a.titre}](${racine}/articles/${a.slug}/) : ${a.metaDescription}`).join('\n')}

## Guides gratuits
- [Tous les guides](${racine}/guides/) : guides pratiques envoyés par WhatsApp ou e-mail.
${guidesData.guides.map((g) => `- ${g.titre} (${g.statut === 'Publié' ? racine + '/guides/' + g.slug + '/' : 'bientôt'}) : ${g.accroche}`).join('\n')}

## Écosystème
- [Gooodeat](${SITE.gooodeat}) : l'app pour déculpabiliser son alimentation.
- [Nutriciens](${SITE.nutriciens}) : la communauté de formation continue des diététicien·nes.
`;

  return new Response(corps, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
