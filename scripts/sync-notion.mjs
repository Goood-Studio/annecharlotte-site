// Synchronise le CMS Notion vers src/data/ : villes, articles et guides.
// Seul le contenu au bon statut ET complet sort dans les fichiers : la
// règle anti-duplication et la validation commencent ici.
//
// Usage : NOTION_TOKEN=... node scripts/sync-notion.mjs
//   - en local : doppler run -p gsv00-goood-studio -c dev -- npm run sync
//   - en CI : secret GitHub NOTION_TOKEN
// Le token reste dans Doppler / GitHub Secrets, jamais dans le code (règle studio).

import { writeFileSync } from 'node:fs';

const TOKEN = process.env.NOTION_TOKEN;
const VILLES_DB = 'f502a218-6a01-485b-a16c-2bb40a2f7983';
const ARTICLES_DB = '23f665c1-a07a-4f4d-aa4b-0d137e8d267f';
const GUIDES_DB = '5defdb51-6534-48be-8b85-8afa11be2d60';

if (!TOKEN) {
  console.error('NOTION_TOKEN manquant. Lance via doppler ou définis le secret CI.');
  process.exit(1);
}

async function requeteNotion(chemin, corps, methode = 'POST') {
  const reponse = await fetch(`https://api.notion.com/v1/${chemin}`, {
    method: methode,
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      'Notion-Version': '2022-06-28',
      'Content-Type': 'application/json',
    },
    body: methode === 'GET' ? undefined : JSON.stringify(corps ?? {}),
  });
  if (!reponse.ok) throw new Error(`Notion ${chemin} : ${reponse.status} ${await reponse.text()}`);
  return reponse.json();
}

async function toutesLesLignes(db) {
  const lignes = [];
  let curseur;
  do {
    const page = await requeteNotion(`databases/${db}/query`, { start_cursor: curseur, page_size: 100 });
    lignes.push(...page.results);
    curseur = page.has_more ? page.next_cursor : undefined;
  } while (curseur);
  return lignes;
}

function texte(prop) {
  return (prop?.rich_text ?? prop?.title ?? []).map((t) => t.plain_text).join('').trim();
}

const echapper = (s) =>
  s.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');

// Rich text Notion → HTML inline (gras, italique, liens).
function inline(richText) {
  return (richText ?? [])
    .map((t) => {
      let html = echapper(t.plain_text);
      if (t.annotations?.bold) html = `<strong>${html}</strong>`;
      if (t.annotations?.italic) html = `<em>${html}</em>`;
      if (t.href) html = `<a href="${t.href}">${html}</a>`;
      return html;
    })
    .join('');
}

// Blocs Notion (profondeur 1) → HTML propre. Les listes sont regroupées.
async function contenuHtml(pageId) {
  const blocs = [];
  let curseur;
  do {
    const page = await requeteNotion(
      `blocks/${pageId}/children?page_size=100${curseur ? `&start_cursor=${curseur}` : ''}`,
      null,
      'GET'
    );
    blocs.push(...page.results);
    curseur = page.has_more ? page.next_cursor : undefined;
  } while (curseur);

  const morceaux = [];
  let liste = null; // { tag: 'ul'|'ol', items: [] }
  const fermerListe = () => {
    if (liste) {
      morceaux.push(`<${liste.tag}>` + liste.items.map((i) => `<li>${i}</li>`).join('') + `</${liste.tag}>`);
      liste = null;
    }
  };

  for (const bloc of blocs) {
    const type = bloc.type;
    if (type === 'bulleted_list_item' || type === 'numbered_list_item') {
      const tag = type === 'bulleted_list_item' ? 'ul' : 'ol';
      if (!liste || liste.tag !== tag) { fermerListe(); liste = { tag, items: [] }; }
      liste.items.push(inline(bloc[type].rich_text));
      continue;
    }
    fermerListe();
    if (type === 'paragraph') {
      const html = inline(bloc.paragraph.rich_text);
      if (html) morceaux.push(`<p>${html}</p>`);
    } else if (type === 'heading_2') {
      morceaux.push(`<h2>${inline(bloc.heading_2.rich_text)}</h2>`);
    } else if (type === 'heading_3') {
      morceaux.push(`<h3>${inline(bloc.heading_3.rich_text)}</h3>`);
    } else if (type === 'quote') {
      morceaux.push(`<blockquote><p>${inline(bloc.quote.rich_text)}</p></blockquote>`);
    }
    // Les autres types (images, embeds…) sont ignorés volontairement :
    // le blog reste léger et prévisible.
  }
  fermerListe();
  return morceaux.join('\n');
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

/* ---------- VILLES ---------- */
const villes = [];
const villesIgnorees = [];
for (const ligne of await toutesLesLignes(VILLES_DB)) {
  const p = ligne.properties;
  const ville = texte(p['Ville']);
  if (p['Statut']?.select?.name !== 'Publiée') continue;

  const entree = {
    ville,
    slug: texte(p['Slug']),
    zone: p['Zone']?.select?.name ?? 'Autre',
    distanceMin: p['Distance cabinet (min)']?.number ?? null,
    consultation: (p['Consultation']?.multi_select ?? []).map((o) => o.name),
    cabinetSurPlace: ['Namur', 'Malonne'].includes(ville),
    introLocale: texte(p['Intro locale']),
    quartiers: texte(p['Quartiers / communes']),
    acces: texte(p['Accès & parking']),
    faqLocale: parseFaq(texte(p['FAQ locale'])),
    metaTitle: texte(p['Meta title']) || `Diététicienne à ${ville} | Anne-Charlotte Jalhay`,
    metaDescription: texte(p['Meta description']),
  };

  const manquants = ['introLocale', 'quartiers', 'acces', 'metaDescription'].filter((c) => !entree[c]);
  if (manquants.length || entree.faqLocale.length === 0) {
    villesIgnorees.push(`${ville} (manque : ${[...manquants, ...(entree.faqLocale.length ? [] : ['faqLocale'])].join(', ')})`);
    continue;
  }
  villes.push(entree);
}
villes.sort((a, b) => (a.distanceMin ?? 99) - (b.distanceMin ?? 99));

/* ---------- ARTICLES ---------- */
const articles = [];
for (const ligne of await toutesLesLignes(ARTICLES_DB)) {
  const p = ligne.properties;
  if (p['Statut']?.select?.name !== 'Publié') continue;
  const slug = texte(p['Slug']);
  const titre = texte(p['Titre']);
  if (!slug || !titre) continue;
  articles.push({
    titre,
    slug,
    pilier: p['Pilier']?.select?.name ?? null,
    questionCible: texte(p['Question cible']),
    metaTitle: texte(p['Meta title']) || `${titre} | Anne-Charlotte Diététicienne`,
    metaDescription: texte(p['Meta description']),
    publieLe: p['Publié le']?.date?.start ?? null,
    misAJour: ligne.last_edited_time?.slice(0, 10) ?? null,
    html: await contenuHtml(ligne.id),
  });
}
articles.sort((a, b) => (b.publieLe ?? '').localeCompare(a.publieLe ?? '') || a.titre.localeCompare(b.titre));

/* ---------- GUIDES ---------- */
const guides = [];
for (const ligne of await toutesLesLignes(GUIDES_DB)) {
  const p = ligne.properties;
  const statut = p['Statut']?.select?.name;
  if (statut !== 'Publié' && statut !== 'En préparation') continue;
  guides.push({
    titre: texte(p['Titre']),
    slug: texte(p['Slug']),
    statut,
    pilier: p['Pilier']?.select?.name ?? null,
    accroche: texte(p['Accroche']),
    contenuListe: texte(p['Ce que tu reçois']).split(';').map((s) => s.trim()).filter(Boolean),
    metaDescription: texte(p['Meta description']),
    html: statut === 'Publié' ? await contenuHtml(ligne.id) : '',
  });
}

/* ---------- ÉCRITURE ---------- */
const entete = (source) =>
  `Généré par scripts/sync-notion.mjs depuis la base Notion « ${source} ». Ne pas éditer à la main.`;

writeFileSync('src/data/villes.json', JSON.stringify({ _commentaire: entete('Villes — pages locales'), villes }, null, 2) + '\n');
writeFileSync('src/data/articles.json', JSON.stringify({ _commentaire: entete('Articles — blog'), articles }, null, 2) + '\n');
writeFileSync('src/data/guides.json', JSON.stringify({ _commentaire: entete('Guides — lead magnets'), guides }, null, 2) + '\n');

console.log(`✅ ${villes.length} villes, ${articles.length} articles, ${guides.length} guides écrits dans src/data/.`);
if (villesIgnorees.length) {
  console.log(`⚠️ ${villesIgnorees.length} ville(s) au statut Publiée mais incomplète(s), ignorée(s) :`);
  for (const v of villesIgnorees) console.log(' - ' + v);
}
