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
  // Depuis le 30/09/2026, les boutons « Prendre RDV » d'une première
  // consultation passent d'abord par le miroir (/bilan/), qui mène ensuite
  // à cal.com. Les liens cal.com directs (cal*) ne servent qu'à /bilan/.
  rdvVisio: u('/bilan/'),
  rdvMalonne: u('/bilan/'),
  rdvNamur: u('/bilan/'),
  calVisio: 'https://cal.com/anne-charlotte-diet/premiers-pas-visio',
  calMalonne: 'https://cal.com/anne-charlotte-diet/premiers-pas-malonne',
  calNamur: 'https://cal.com/anne-charlotte-diet/premiers-pas-namur',
  // Le pack passe aussi par le miroir : /bilan/ met alors le pack en premier.
  rdvPack: u('/bilan/') + '?formule=pack',
  calPack: 'https://cal.com/anne-charlotte-diet/pack-visio',

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
  whatsappChaine: 'https://whatsapp.com/channel/0029VazQG6jGJP8QTAedeo2V',
  whatsappChaineNom: 'La minute MieuxManger',

  // Captation des guides : URL du webhook (n8n) qui reçoit
  // {guide, prenom, email, telephone, consentement}. Tant que c'est vide,
  // le formulaire bascule sur WhatsApp (message prérempli).
  captureEndpoint: 'https://n8n.gooodstudio.com/webhook/annecharlotte-guides',

  // Questionnaire pré-consultation (/bilan) : URL du relais Netlify qui
  // écrit dans la base Notion « Pré-consultations ». Tant que c'est vide,
  // le questionnaire s'affiche mais ne peut pas être envoyé.
  bilanEndpoint: '',

  // Cabinets de consultation (adresses publiques, nécessaires au SEO local).
  cabinets: [
    {
      nom: 'Cabinet de Malonne',
      rue: 'Rue Chapelle Lessire 54',
      codePostal: '5020',
      ville: 'Malonne',
      rdv: u('/bilan/'),
    },
    {
      nom: 'Cabinet de Namur',
      rue: 'Rue Martine Bourtonbourt 2',
      codePostal: '5000',
      ville: 'Namur',
      rdv: u('/bilan/'),
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
