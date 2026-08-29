// Les constantes du site. Une seule source de vérité pour les liens et
// coordonnées : si un numéro ou un lien cal.com change, il change ici.

export const SITE = {
  nom: 'Anne-Charlotte Diététicienne',
  prenom: 'Anne-Charlotte',
  nomComplet: 'Anne-Charlotte Jalhay',
  slogan: 'Retrouve du plaisir à manger, sans culpabilité',
  email: 'bonjour@annecharlotte.be',

  telephone: '+32 472 62 91 95',
  telephoneLien: 'tel:+32472629195',
  whatsapp: 'https://wa.me/32472629195',
  whatsappMessage:
    'https://wa.me/32472629195?text=' +
    encodeURIComponent('Bonjour, je suis sur votre site et j’ai une question : '),

  // Prise de RDV : l'objectif n°1 du site est le RDV en ligne.
  rdvVisio: 'https://cal.com/anne-charlotte-diet/premiers-pas-visio',
  rdvMalonne: 'https://cal.com/anne-charlotte-diet/premiers-pas-malonne',
  rdvNamur: 'https://cal.com/anne-charlotte-diet/premiers-pas-namur',
  rdvPack: 'https://cal.com/anne-charlotte-diet/pack-visio',

  // Stats confirmées par Valentin le 29/08/2026.
  statsPatients: '+1 500',
  statsDiet: '+250',

  gooodeat: 'https://www.gooodeat.com',
  vroooz: 'https://www.vroooz.com',
  nutriciens: 'https://www.nutriciens.com',
  instagram: 'https://www.instagram.com/annecharlotte.diet/',
  linkedin: 'https://www.linkedin.com/in/annecharlottejalhay/',

  // La chaîne WhatsApp d'Anne-Charlotte : coller ici le lien d'invitation
  // (whatsapp.com/channel/…) dès que la chaîne est créée. Tant que c'est
  // vide, les blocs « chaîne » ne s'affichent pas.
  whatsappChaine: '',

  // Captation des guides : URL du webhook (n8n) qui reçoit
  // {guide, prenom, email, telephone, consentement}. Tant que c'est vide,
  // le formulaire bascule sur WhatsApp (message prérempli).
  captureEndpoint: '',

  // Cabinets de consultation (adresses publiques, nécessaires au SEO local).
  cabinets: [
    {
      nom: 'Cabinet de Malonne',
      rue: 'Rue Chapelle Lessire 54',
      codePostal: '5020',
      ville: 'Malonne',
      rdv: 'https://cal.com/anne-charlotte-diet/premiers-pas-malonne',
    },
    {
      nom: 'Cabinet de Namur',
      rue: 'Rue Martine Bourtonbourt 2',
      codePostal: '5000',
      ville: 'Namur',
      rdv: 'https://cal.com/anne-charlotte-diet/premiers-pas-namur',
    },
  ],

  horaires: 'Lundi à vendredi, 8h30 à 17h00',
};

// Préfixe toutes les URLs internes avec la base de déploiement
// (recette GitHub Pages = /annecharlotte-site/, domaine final = /).
export function u(chemin: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  if (chemin === '/') return base + '/';
  return base + chemin;
}
