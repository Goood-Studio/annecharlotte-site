// Les avis de patient·es, recopiés à la main (aucun widget, aucun appel
// tiers) depuis la fiche Google « Anne-Charlotte Jalhay Diététicienne Namur »
// et depuis le mur testimonial.to/sans-chichi (seulement les avis patient·es,
// pas ceux des formations Nutriciens). Relevé du 01/10/2026.
// Affichés avec le prénom et l'initiale. Seules les fautes de frappe sont
// corrigées, jamais le fond.

export const AVIS_GOOGLE = {
  note: '5,0',
  nombre: 9,
  lien: 'https://search.google.com/local/reviews?placeid=ChIJ54jqi_KbwUcRWBS6TtPoWMQ',
};

export type Avis = { nom: string; source: 'Google' | 'Testimonial'; texte: string };

// L'ordre compte : les premiers répondent aux doutes les plus fréquents
// (le ventre, la visio quand on travaille, l'argent qu'on a peur de perdre).
export const AVIS: Avis[] = [
  {
    nom: 'Chantal W.',
    source: 'Google',
    texte:
      'Suite à une maladie grave en plus de problèmes digestifs, je n’arrivais plus à m’alimenter correctement. Grâce à elle, j’ai retrouvé la forme et le plaisir de manger sans être malade.',
  },
  {
    nom: 'Oriana',
    source: 'Testimonial',
    texte:
      'J’ai fortement apprécié les rendez-vous en visio qui vont à l’essentiel : pas de perte de temps en trajets et beaucoup plus simple niveau organisation, même quand on travaille.',
  },
  {
    nom: 'Dominique',
    source: 'Testimonial',
    texte:
      'Anne-Charlotte m’a guidée pour tester ma tolérance à certaines catégories d’aliments. Maintenant, je peux manger sereinement en évitant les maux de ventre.',
  },
  {
    nom: 'Karine Y.',
    source: 'Google',
    texte:
      'Contact chaleureux et efficace, des conseils qui m’ont permis d’avancer, et l’honnêteté de m’avoir dit « ok, plus nécessaire de programmer d’autres rendez-vous ».',
  },
  {
    nom: 'Maurine',
    source: 'Testimonial',
    texte:
      'J’espérais comprendre pourquoi je ne maigrissais pas. J’ai finalement appris à me connaître, à connaître mes sensations, et à manger sans culpabiliser.',
  },
  {
    nom: 'Alexandra',
    source: 'Testimonial',
    texte:
      'Je suis venue pour arrêter de fumer. J’ai pu arrêter à mon rythme, étape par étape, et l’ambiance bienveillante m’a permis de croire en moi.',
  },
];
