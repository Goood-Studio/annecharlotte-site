// Un schéma ou un dessin tiré du guide PDF, dans l'article qui l'explique
// (09/11/2026, « avec parcimonie » : un seul par article, et seulement quand le
// guide en a un qui aide à comprendre). Les images vivent dans
// public/img/articles/<slug>.jpg ; le texte reste dans Notion, intact.
//
// Placement :
//   section    → à la fin de la section dont le titre (h2) contient ce texte ;
//   paragraphe → juste après le paragraphe qui contient ce texte ;
//   debut      → avant le premier titre de l'article.
// Si le repère n'existe plus (titre réécrit dans Notion), l'image se place
// avant « Ce que tu trouves dans le guide », sinon à la fin de l'article.

export interface Illustration {
  alt: string;
  legende: string;
  largeur: number;
  hauteur: number;
  section?: string;
  paragraphe?: string;
  debut?: boolean;
}

export const ILLUSTRATIONS: Record<string, Illustration> = {
  'alimentation-et-sommeil': {
    section: 'Ton sommeil commence au petit-déjeuner',
    alt: 'Les quatre moments de la journée qui préparent la nuit : le matin, 16 h, le souper et la nuit, avec un dessin pour chacun',
    legende: 'La chaîne du sommeil, du petit-déj à la nuit. Extrait du guide « Mieux dormir ».',
    largeur: 1400, hauteur: 535,
  },
  'arreter-fumer-sans-grossir': {
    paragraphe: 'courbe de la dopamine',
    alt: 'Courbe de la dopamine en quatre temps : au début ça monte, puis la base descend, la cigarette ne fait plus que ramener à la ligne, et quand on arrête, un creux de quelques semaines avant de rejoindre la ligne',
    legende: 'Au début ça monte, puis ton cerveau baisse sa base. Quand tu arrêtes : un creux de quelques semaines, puis tu rejoins ta ligne. Un schéma pour comprendre, pas une mesure.',
    largeur: 1400, hauteur: 703,
  },
  'ballonnements-apres-repas': {
    section: 'viennent les ballonnements',
    alt: 'Quatre silhouettes à 8 h, 12 h, 16 h et 21 h : le ventre gonfle au fil de la journée',
    legende: '8 h, 12 h, 16 h, 21 h : très souvent, ton ventre sature au fil de la journée. Extrait du guide « Ton ventre gonfle le soir ? ».',
    largeur: 1400, hauteur: 420,
  },
  'constipation-tous-les-3-jours': {
    paragraphe: 'Bristol',
    alt: "L'échelle de Bristol, du type 1 au type 7 : billes dures, boudin grumeleux, boudin craquelé, lisse et souple, morceaux mous, en bouillie, liquide",
    legende: "L'échelle de Bristol : on vise le 3 et le 4.",
    largeur: 1400, hauteur: 855,
  },
  'epuisee-ou-perimenopause': {
    section: 'Pourquoi manger moins ne marche pas',
    alt: 'Une femme au centre, entourée des neuf freins qui expliquent pourquoi manger moins ne marche pas, dessin au crayon',
    legende: 'Les neuf freins, autour de toi. Extrait du guide « Épuisée, ou déjà la périménopause ? ».',
    largeur: 1000, hauteur: 746,
  },
  'fetes-sans-culpabiliser': {
    section: '355 autres jours',
    alt: '10 jours de fête par an, et 355 jours de vie de tous les jours',
    legende: 'Ce qui compte vraiment. Extrait du guide « Les fêtes, sans culpabiliser ».',
    largeur: 1400, hauteur: 406,
  },
  'idees-repas-petit-dej-lunch-box': {
    section: 'Le petit déj, on le compose comment',
    alt: "Le petit déj en quatre colonnes, avec des photos d'aliments : une protéine, un fruit ou un légume, un gras, une « céréale »",
    legende: 'Un truc dans chaque colonne, et c’est un petit déj. Le guide en propose plus, et la même chose pour la lunch box.',
    largeur: 1400, hauteur: 864,
  },
  'maman-qui-s-oublie': {
    paragraphe: 'tu remplis ta jauge',
    alt: 'La jauge : le boulot, les enfants, la maison et la charge mentale prennent presque toute la place ; en dessous, une jauge vide à colorier',
    legende: 'La jauge à colorier avant de commencer le défi, puis au jour 7.',
    largeur: 1400, hauteur: 614,
  },
  'manger-equilibre-sans-temps': {
    section: "L'assiette en trois zones",
    alt: "L'assiette en 3 zones : la moitié de légumes, un quart de protéine, un quart de féculent, et un gras",
    legende: "L'assiette en 3 zones. Extrait du guide « La méthode assiette pour les débordé·es ».",
    largeur: 1400, hauteur: 844,
  },
  'sortir-des-regimes': {
    section: 'ce manège',
    alt: 'Le manège des régimes : commencer un régime, manger moins, avoir faim, craquer, perdre confiance, reprendre du poids, et la sortie',
    legende: 'Le problème, c’est le manège. Pas toi.',
    largeur: 1400, hauteur: 1014,
  },
  'soupers-rapides-famille': {
    section: 'un seul souper pour tout le monde',
    alt: 'Une maman qui mange à table avec ses deux enfants, chacun son assiette, dessin au crayon',
    legende: 'Un seul souper, chacun son assiette, toi aussi.',
    largeur: 1000, hauteur: 746,
  },
  'spm-leviers-alimentaires': {
    debut: true,
    alt: 'Les quatre saisons du cycle : phase menstruelle, phase folliculaire, ovulation, phase lutéale',
    legende: 'Les 4 saisons de ton cycle, repères pour un cycle de 28 jours. Extrait du guide « Les 4 saisons de ton cycle ».',
    largeur: 1400, hauteur: 1131,
  },
  'trop-de-gaz-ca-sent-mauvais': {
    section: 'ou tu ne manges plus',
    alt: "Le cercle : la peur des gaz, tu sautes le repas, grosse faim, tu manges vite et beaucoup, plus d'air et plus de charge d'un coup, donc plus de gaz",
    legende: 'Sauter un repas pour être tranquille, c’est souvent ce qui relance le cercle.',
    largeur: 1400, hauteur: 919,
  },
};

const echapper = (s: string) =>
  s.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
const texte = (html: string) => html.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&');

// Ajoute l'illustration de l'article dans son HTML (venu de Notion).
export function avecIllustration(slug: string, html: string, src: string): string {
  const ill = ILLUSTRATIONS[slug];
  if (!ill) return html;
  const figure =
    `<figure class="article-visuel"><a href="${src}" target="_blank" rel="noopener" aria-label="Agrandir l’image">` +
    `<img src="${src}" alt="${echapper(ill.alt)}" width="${ill.largeur}" height="${ill.hauteur}" loading="lazy" decoding="async"></a>` +
    `<figcaption>${echapper(ill.legende)}</figcaption></figure>`;

  const titres = [...html.matchAll(/<h2>([\s\S]*?)<\/h2>/g)];
  let position = -1;
  if (ill.debut) {
    position = titres[0]?.index ?? 0;
  } else if (ill.section) {
    const i = titres.findIndex((t) => texte(t[1]).includes(ill.section!));
    if (i >= 0) position = titres[i + 1]?.index ?? html.length;
  } else if (ill.paragraphe) {
    for (const p of html.matchAll(/<p>([\s\S]*?)<\/p>/g)) {
      if (texte(p[1]).includes(ill.paragraphe)) { position = p.index! + p[0].length; break; }
    }
  }
  if (position < 0) {
    const fin = titres.find((t) => texte(t[1]).startsWith('Ce que tu trouves'));
    position = fin?.index ?? html.length;
  }
  return html.slice(0, position) + '\n' + figure + '\n' + html.slice(position);
}
