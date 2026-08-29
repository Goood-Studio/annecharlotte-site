// Le détecteur : le build échoue si une page sort sans son SEO ou si deux
// pages villes se ressemblent trop (le drame du site Framer : 96 % de
// contenu commun entre villes). Lancé par `npm run build` et par la CI.
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const DIST = 'dist';
const erreurs = [];

function pagesHtml(dossier) {
  const resultats = [];
  for (const nom of readdirSync(dossier)) {
    const chemin = join(dossier, nom);
    if (statSync(chemin).isDirectory()) resultats.push(...pagesHtml(chemin));
    else if (nom.endsWith('.html')) resultats.push(chemin);
  }
  return resultats;
}

const pages = pagesHtml(DIST);
if (pages.length < 10) erreurs.push(`Seulement ${pages.length} pages HTML générées : build suspect.`);

// Les pages relais et la 404 échappent aux règles de contenu.
const exemptes = (chemin) => chemin.includes('404') || chemin.includes('santé-feminine');

const textesVilles = {};

for (const chemin of pages) {
  const html = readFileSync(chemin, 'utf-8');
  const nom = chemin.replace(DIST + '/', '');

  if (html.includes('undefined') && !exemptes(chemin)) {
    // Un « undefined » rendu dans la page = une donnée manquante passée inaperçue.
    const visible = html.replace(/<script[\s\S]*?<\/script>/g, '');
    if (/>[^<]*undefined[^<]*</.test(visible)) erreurs.push(`${nom} : « undefined » visible dans la page.`);
  }

  if (exemptes(chemin)) continue;

  const h1 = html.match(/<h1[\s>]/g) ?? [];
  if (h1.length !== 1) erreurs.push(`${nom} : ${h1.length} balise(s) <h1>, il en faut exactement 1.`);

  const desc = html.match(/<meta name="description" content="([^"]*)"/);
  if (!desc || desc[1].length < 50) erreurs.push(`${nom} : meta description absente ou trop courte.`);

  if (!html.includes('rel="canonical"')) erreurs.push(`${nom} : canonique absent.`);
  if (!html.includes('application/ld+json')) erreurs.push(`${nom} : aucun JSON-LD.`);
  if (!html.includes('cal.com/anne-charlotte-diet')) erreurs.push(`${nom} : aucun lien de prise de RDV cal.com.`);
  if (!html.includes('wa.me/32472629195')) erreurs.push(`${nom} : bouton WhatsApp absent.`);

  const ville = nom.match(/^dieteticienne-([a-z-]+)\/index\.html$/);
  if (ville) {
    const texte = html
      .replace(/<script[\s\S]*?<\/script>/g, ' ')
      .replace(/<style[\s\S]*?<\/style>/g, ' ')
      .replace(/<[^>]+>/g, ' ')
      .toLowerCase();
    textesVilles[ville[1]] = new Set(texte.match(/[a-zà-ÿ]{4,}/g) ?? []);
  }
}

// Anti-duplication : deux pages villes ne peuvent pas partager plus de 92 %
// de leur vocabulaire (structure commune admise, champs locaux obligatoires).
const villes = Object.keys(textesVilles);
for (let i = 0; i < villes.length; i++) {
  for (let j = i + 1; j < villes.length; j++) {
    const a = textesVilles[villes[i]];
    const b = textesVilles[villes[j]];
    const commun = [...a].filter((mot) => b.has(mot)).length;
    const jaccard = commun / (a.size + b.size - commun);
    if (jaccard > 0.92) {
      erreurs.push(
        `Pages villes trop semblables : ${villes[i]} vs ${villes[j]} (${Math.round(jaccard * 100)} % de vocabulaire commun). Remplis les champs locaux dans Notion.`
      );
    }
  }
}

// Les fichiers d'infrastructure SEO.
for (const fichier of ['sitemap-index.xml', 'robots.txt', 'llms.txt', '404.html']) {
  if (!existsSync(join(DIST, fichier))) erreurs.push(`${fichier} manquant dans dist/.`);
}

// Les chemins historiques du site Framer doivent tous exister (iso-URLs).
const cheminsHistoriques = [
  'index.html',
  'parcours/index.html',
  'troubles-digestifs/index.html',
  'sante-feminine/index.html',
  'mieux-manger/index.html',
  'contact/index.html',
  'dieteticienne-namur/index.html',
  'dieteticienne-salzinnes/index.html',
  'dieteticienne-bouge/index.html',
  'dieteticienne-saint-servais/index.html',
  'dieteticienne-jambes/index.html',
  'dieteticienne-gembloux/index.html',
  'dieteticienne-malonne/index.html',
  'technique/politique-confidentialite/index.html',
  'technique/conditions-generales-utilisation/index.html',
];
for (const chemin of cheminsHistoriques) {
  if (!existsSync(join(DIST, chemin))) erreurs.push(`Chemin historique manquant : ${chemin}`);
}

if (erreurs.length) {
  console.error(`\n❌ Détecteur : ${erreurs.length} problème(s), le build est refusé.\n`);
  for (const e of erreurs) console.error(' - ' + e);
  process.exit(1);
}
console.log(`✅ Détecteur : ${pages.length} pages vérifiées, tout est vert.`);
