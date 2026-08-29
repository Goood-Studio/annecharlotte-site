// Synchronise le CMS Notion vers src/data/villes.json (et, en phase 2,
// la FAQ du chatbot). Seules les villes au statut « Publiée » ET dont les
// champs locaux sont remplis sortent dans le fichier : la règle
// anti-duplication commence ici.
//
// Usage : NOTION_TOKEN=... node scripts/sync-notion.mjs
//   - en local : doppler run -p gsv01 -c dev -- npm run sync
//   - en CI : secret GitHub NOTION_TOKEN
// Le token reste dans Doppler / GitHub Secrets, jamais dans le code (règle studio).

import { writeFileSync } from 'node:fs';

const TOKEN = process.env.NOTION_TOKEN;
const VILLES_DB = '8fde4b55-7c73-4e3e-9d74-dada5a450ca1';

if (!TOKEN) {
  console.error('NOTION_TOKEN manquant. Lance via doppler ou définis le secret CI.');
  process.exit(1);
}

async function requeteNotion(chemin, corps) {
  const reponse = await fetch(`https://api.notion.com/v1/${chemin}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      'Notion-Version': '2022-06-28',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(corps ?? {}),
  });
  if (!reponse.ok) throw new Error(`Notion ${chemin} : ${reponse.status} ${await reponse.text()}`);
  return reponse.json();
}

function texte(prop) {
  return (prop?.rich_text ?? prop?.title ?? []).map((t) => t.plain_text).join('').trim();
}

// La FAQ locale est saisie dans Notion au format « Q: ... R: ... », une paire par ligne.
function parseFaq(brut) {
  const paires = [];
  const morceaux = brut.split(/\bQ\s*:/).filter(Boolean);
  for (const morceau of morceaux) {
    const [q, r] = morceau.split(/\bR\s*:/);
    if (q && r) paires.push({ q: q.trim(), r: r.trim() });
  }
  return paires;
}

const lignes = [];
let curseur = undefined;
do {
  const page = await requeteNotion(`databases/${VILLES_DB}/query`, {
    start_cursor: curseur,
    page_size: 100,
  });
  lignes.push(...page.results);
  curseur = page.has_more ? page.next_cursor : undefined;
} while (curseur);

const villes = [];
const ignorées = [];

for (const ligne of lignes) {
  const p = ligne.properties;
  const ville = texte(p['Ville']);
  const statut = p['Statut']?.select?.name;
  if (statut !== 'Publiée') continue;

  const entree = {
    ville,
    slug: texte(p['Slug']),
    zone: p['Zone']?.select?.name ?? 'Autre',
    distanceMin: p['Distance cabinet (min)']?.number ?? null,
    cabinetSurPlace: ['Namur', 'Malonne'].includes(ville),
    introLocale: texte(p['Intro locale']),
    quartiers: texte(p['Quartiers / communes']),
    acces: texte(p['Accès & parking']),
    faqLocale: parseFaq(texte(p['FAQ locale'])),
    metaTitle: texte(p['Meta title']) || `Diététicienne à ${ville} | Anne-Charlotte Jalhay`,
    metaDescription: texte(p['Meta description']),
  };

  // Règle anti-duplication : publiée mais incomplète = ignorée, et on le dit.
  const manquants = ['introLocale', 'quartiers', 'acces', 'metaDescription']
    .filter((champ) => !entree[champ]);
  if (manquants.length || entree.faqLocale.length === 0) {
    ignorées.push(`${ville} (manque : ${[...manquants, ...(entree.faqLocale.length ? [] : ['faqLocale'])].join(', ')})`);
    continue;
  }
  villes.push(entree);
}

villes.sort((a, b) => (a.distanceMin ?? 99) - (b.distanceMin ?? 99));

writeFileSync(
  'src/data/villes.json',
  JSON.stringify(
    {
      _commentaire:
        'Généré par scripts/sync-notion.mjs depuis la base Notion « Villes — pages locales ». Ne pas éditer à la main.',
      villes,
    },
    null,
    2
  ) + '\n'
);

console.log(`✅ ${villes.length} villes publiées écrites dans src/data/villes.json.`);
if (ignorées.length) {
  console.log(`⚠️ ${ignorées.length} ville(s) au statut Publiée mais incomplète(s), ignorée(s) :`);
  for (const v of ignorées) console.log(' - ' + v);
}
