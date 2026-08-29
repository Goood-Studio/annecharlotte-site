# annecharlotte.be

Le site d'Anne-Charlotte Jalhay, diététicienne (troubles digestifs et santé
féminine). Sortie de Framer décidée le 29/08/2026 : site statique Astro,
hébergé gratuitement sur GitHub Pages, piloté par un CMS Notion.

## Pourquoi c'est fait comme ça

- **Mobile d'abord** : plus de 55 % du trafic est mobile. Tout se conçoit à
  l'écran téléphone, le desktop élargit.
- **Objectif n°1 : le RDV en ligne.** Le bouton « Prendre RDV en ligne »
  (cal.com premiers-pas-visio) est l'action principale de chaque page, avec
  une barre fixe en bas d'écran sur mobile.
- **Langage accessible** : public parfois peu digital. Mots simples, boutons
  qui disent ce qu'ils font, gros contrastes, grosses zones tactiles.
- **iso-URLs** : toutes les URLs du site Framer qui rankent sont conservées.
- **Le CMS est dans Notion** (« Site annecharlotte.be — CMS » dans le QG) :
  les pages villes se pilotent depuis la base « Villes — pages locales ».
  `scripts/sync-notion.mjs` régénère `src/data/villes.json`, et la CI le fait
  chaque nuit.
- **Un détecteur bloque le build** (`scripts/verifier.mjs`) : H1 unique,
  meta description, JSON-LD, lien RDV et bouton WhatsApp sur chaque page,
  chemins historiques présents, et pas deux pages villes trop semblables.
- **RGPD** : polices auto-hébergées, aucun tracker, aucun appel tiers.

## Commandes

```bash
npm install
npm run dev        # développement
npm run build      # build + détecteur
npm run sync       # resynchronise villes.json depuis Notion (NOTION_TOKEN requis)
```

Le token Notion vit dans Doppler (local) et dans le secret GitHub
`NOTION_TOKEN` (CI). Jamais dans le code.

## Déploiement

Chaque poussée sur `main` construit et publie via GitHub Pages (workflow
`publier.yml`), plus un build planifié chaque nuit pour suivre Notion.

- **Recette** (actuel) : https://goood-studio.github.io/annecharlotte-site/
- **Bascule domaine (phase 3)** : définir la variable de repo `AC_PROD=1`,
  ajouter le CNAME, puis pointer le DNS Infomaniak (⚠️ ne toucher QUE le
  CNAME www et les 2 A records : les mails d'AC sont sur la même zone).
