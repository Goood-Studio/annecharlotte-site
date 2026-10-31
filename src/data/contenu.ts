// Les blocs de contenu partagés entre plusieurs pages : offres, services,
// FAQ. Une seule source, réutilisée partout, et transformée en JSON-LD
// (FAQPage, Service) par les pages qui l'affichent.
//
// ⚠️ Les réponses de FAQ réécrites ici doivent être validées par
// Anne-Charlotte avant la bascule DNS (règle studio : validation science).

export const OFFRES = [
  {
    // « Petit effort, gros impact » (29/10/2026) : plus de « Premiers pas » ni de suivi à l'unité affiché.
    nom: 'Le bilan',
    prix: '80 €',
    unite: '1 séance, seul·e ou à deux',
    description:
      'On regarde ton assiette et tout ce qu’il y a autour. Je t’explique ce qui se passe chez toi, et tu repars avec le changement qui aura le plus d’impact, à lancer dès demain.',
    inclus: [
      'Ce qui se passe chez toi, expliqué simplement',
      'Ton premier changement, choisi ensemble',
      'Remboursement mutuelle possible',
    ],
    economie: '',
    ctaTexte: 'Je réserve mon bilan',
    meilleurChoix: false,
  },
  {
    // 330 € pour 10 semaines depuis le 23/10/2026 : une durée, plus un nombre
    // de séances. On prend un problème et on le traite.
    // 31/10/2026 (cadre « Kit Offre » Scalezia) : la promesse en une phrase, puis
    // ce qu'elle reçoit, dans l'ordre où elle le vit. Le carnet entre les séances
    // et la relance à J+3 répondent aux deux freins : « je vais oublier » et « je vais lâcher ».
    nom: 'Accompagnement',
    prix: '330 €',
    unite: '10 semaines, en visio',
    description:
      'Tu gardes ce que tu aimes, et on ajoute ce qui te manque, une petite chose à la fois. Entre les séances, ton carnet t’accompagne et je reste joignable.',
    // « Mot-clé : détail » : le mot-clé s'affiche en gras, pour lire la carte en diagonale.
    inclus: [
      'Le bilan : on comprend ce qui se passe chez toi, et tu repars avec ton premier changement',
      '5 séances en visio : environ toutes les 2 semaines, on regarde ce que ça a donné et on ajoute le suivant*',
      'Ton carnet : mis à jour après chaque séance, avec ton changement, 5 exercices au choix et ce qui t’aide',
      'Je reste joignable : un point à 3 jours, et un message dès que ça coince. On ajuste tout de suite, sans attendre la séance suivante',
      'Gooodeat : tes repas, qu’on regarde ensemble au rendez-vous',
      'Ton mode d’emploi : à la fin, ce qui marche pour toi et quoi faire si ça revient',
    ],
    economie: '',
    ctaTexte: 'Commencer l’accompagnement',
    meilleurChoix: true,
  },
  {
    nom: 'Pack tabac',
    prix: '390 €',
    unite: 'uniquement en visio',
    description:
      'Envie d’arrêter de fumer, mais la peur de grossir te freine ? On travaille les deux en même temps.',
    inclus: [
      'Accompagnement à l’arrêt par une tabacologue',
      'Stratégie pour éviter la prise de poids',
      'Suivi hebdomadaire jusqu’à 10 semaines*',
      'Remboursement mutuelle possible',
      'Canal direct de discussion',
    ],
    economie: '',
    ctaTexte: 'Arrêter, sans la peur de grossir',
    meilleurChoix: false,
  },
  {
    // Pour celles qui veulent « juste deux rendez-vous » : le bilan, puis une séance 2 semaines plus tard.
    nom: 'Bilan + une séance',
    prix: '130 €',
    unite: '2 séances, sur 2 semaines',
    description:
      'Le bilan, puis on se revoit pour regarder ensemble ce que ton premier changement a donné.',
    inclus: [],
    economie: '',
    ctaTexte: 'Je réserve les deux',
    meilleurChoix: false,
  },
] as const;

// Le rythme de l'accompagnement : quand elle voit les premiers effets.
export const PACK_RYTHME = [
  { quand: 'Le lendemain du bilan', quoi: 'Tu commences ta première petite chose : tes pâtes bolo avec plus de sauce, ton biscuit savouré sans écran, du fromage frais sous ta confiture…' },
  { quand: '3 jours après', quoi: 'Tu me dis en un clic comment ça se passe. Et si ça coince avant, tu m’écris : on ajuste tout de suite' },
  { quand: 'Toutes les 2 semaines', quoi: 'On regarde ce qui va mieux, et on ajoute la suivante' },
  { quand: 'Au bout de 10 semaines', quoi: 'Tu vois le chemin parcouru, et tu repars avec ton mode d’emploi' },
] as const;

// Ce qu'elle se dit peut-être avant de commencer, et ce qui se passe vraiment.
// Dit à la patiente, dans ses mots (31/10/2026 : moins « vente », plus gourmand).
export const PACK_FREINS = [
  { frein: '« Je vais devoir me priver »', reponse: 'Non. Tu gardes ton chocolat, tes pâtes, ton fromage. On ajoute ce qui manque, on ne retire pas ce que tu aimes.' },
  { frein: '« Je n’ai pas le temps »', reponse: 'Tes pâtes bolo avec plus de sauce, ça ne prend pas une minute de plus. Une seule petite chose à la fois, celle qui rentre dans ta semaine.' },
  { frein: '« Je vais oublier ce qu’on s’est dit »', reponse: 'Tout est dans ton carnet, avec tes mots, sur ton téléphone.' },
  { frein: '« Et si ça ne va pas ? »', reponse: 'Tu m’écris, je reste joignable entre les séances. On ajuste tout de suite, sans attendre que tu te démotives. Ce n’est jamais un échec.' },
] as const;

// Ce qu'on peut changer : rend concret « le changement qui a le plus d'impact ».
// 31/10/2026 : des exemples concrets et gourmands, tirés de ses tests de consultation
// (bolo, « le dernier qui finit gagne », biscuit sans écran, mi-assiette) et de ses idées (fromage frais, noisette).
export const EXEMPLES_CHANGEMENT = [
  'Tes pâtes bolo, avec deux fois plus de sauce que de pâtes',
  '« Le dernier qui finit gagne un point », à table en famille',
  'Ton biscuit, savouré à table et sans écran',
  'Du fromage frais entre ta tartine et la confiture',
  'Beurre de noisette et vrais copeaux de chocolat sur ta tartine',
  'À mi-assiette, tes couverts posés 5 minutes',
] as const;

export const SERVICES = [
  {
    titre: 'Premier bilan',
    texte:
      'On fait le point ensemble sur ta santé, tes habitudes et tes objectifs. À la fin, tu repars avec une stratégie claire, personnalisée et tenable.',
  },
  {
    titre: 'Objectif personnalisé',
    texte:
      'Zéro plan alimentaire, zéro tout-fait. On part de ton besoin et de ta vie réelle, et on construit ensemble des pistes de solutions pour y répondre vraiment. Mon objectif, c’est que tu deviennes autonome, avec une vraie réponse et une vraie solution.',
  },
  {
    titre: 'Soutien et suivi',
    texte:
      'Tu n’avances pas seul·e : suivi régulier, conseils adaptés et un vrai soutien à chaque étape, à ton rythme. Un contact reste possible même entre les rendez-vous, pour éviter le sentiment de « ça ne marche pas », « j’ai toujours mal », « pff… ». Ce que je vise, c’est un ajustement continu : moins de douleurs, plus d’énergie, et se sentir mieux dans son corps.',
  },
  {
    titre: 'Éducation alimentaire',
    texte:
      'Tu apprends à comprendre ton corps et à faire des choix éclairés, pour devenir autonome et garder de bonnes habitudes sur le long terme.',
  },
  {
    titre: 'Atelier cuisine',
    texte:
      'Des recettes savoureuses et des compétences concrètes en cuisine, pour allier plaisir et équilibre dans l’assiette au quotidien.',
  },
  {
    titre: 'Roue des émotions',
    texte:
      'Un outil simple pour mettre des mots sur ce que tu ressens, mieux décoder tes sensations alimentaires et avancer vers un équilibre global.',
  },
  {
    titre: 'Et mon poids ?',
    texte:
      'Je n’ai pas de balance au cabinet, et c’est aussi pour ça que la visio est tout aussi simple. Un chiffre seul ne veut rien dire : on ne se définit pas par un nombre trop haut ou trop bas. On est une personne, avec des besoins, des ressentis, une image de soi qui peut être altérée pour énormément de raisons. Mon objectif, c’est que tu te sentes mieux dans ton corps, au quotidien.',
  },
] as const;

// Le déroulé d'un accompagnement, raconté par Anne-Charlotte. Affiché sur
// l'accueil et sur la page parcours.
export const DEROULE = [
  {
    titre: 'Avant la consultation',
    texte:
      'Avant de choisir ton créneau, tu remplis un petit questionnaire (3 minutes), et je lis tes réponses avant qu’on se voie. Selon ton besoin, je vais peut-être te demander de prendre tes repas en photo, et quand on se voit, on les regarde ensemble, sans jugement, à partir de ton propre point de départ. Ça permet d’avoir une vision claire d’où peuvent venir les symptômes, ou de comment se compose ton assiette, sans être dans la récitation ! Aucun jugement, au contraire : on y verra déjà tout le positif 🙂',
  },
  {
    titre: 'La première rencontre',
    texte:
      '« Comment puis-je vous aider ? » On prend le temps ensemble de comprendre ton besoin. On a la base de tes repas, on regarde autour de l’assiette pour une vue complète, et on définit ensemble nos premiers ajustements. En visio, tu peux facilement aller chercher dans tes armoires un produit qui te pose question.',
  },
  {
    titre: 'Entre les rendez-vous',
    texte:
      'Après chaque séance, tu reçois ton carnet sur WhatsApp : ce qu’on s’est dit, ton changement (tu choisis l’exercice qui te parle parmi 5), pourquoi tu le fais, et quoi faire si ça dérape. Trois jours plus tard, tu me dis en un clic comment ça se passe, et si ça coince avant, tu m’écris : on ajuste tout de suite, sans attendre le rendez-vous. Tes repas, tu les notes sur Gooodeat quand ça t’arrange : une photo de ton assiette à 21h30, un ventre qui gonfle après le souper. Au rendez-vous suivant, on ne repart pas de zéro et on ne compte pas sur ta mémoire.',
  },
] as const;

// FAQ « diététicien·ne » : présente sur les pages villes, piliers et contact.
// Questions reprises du site actuel, réponses réécrites en langage accessible.
export const FAQ_DIET = [
  {
    q: 'Quel est le travail d’un diététicien ou d’une diététicienne ?',
    r: 'Un·e diététicien·ne est un·e professionnel·le de santé spécialisé·e en nutrition, avec un diplôme reconnu (bachelier en diététique en Belgique). Concrètement : on évalue tes besoins, on construit à partir de ta vie réelle des améliorations concrètes dans ton quotidien, et on t’accompagne pour les troubles digestifs, hormonaux ou métaboliques. En Belgique, le titre est protégé par la loi.',
  },
  {
    q: 'Quand consulter un diététicien ou une diététicienne ?',
    r: 'Dès que l’alimentation te pose question ou te pèse : maux de ventre qui reviennent, ballonnements, intestin irritable, SOMP (SOPK), endométriose, fatigue, envie de mieux manger sans savoir par où commencer. Pas besoin d’attendre que ce soit « grave » : plus tôt on s’y met, plus vite tu vas mieux.',
  },
  {
    q: 'Combien coûte une consultation ?',
    r: 'Chez moi, le bilan est à 80 €, le bilan avec une séance deux semaines plus tard à 130 €, et l’accompagnement (10 semaines en visio, une séance toutes les 2 semaines environ, avec ton carnet entre les séances) à 330 €. Ce que tu as déjà fait compte : après le bilan, il reste 250 € pour l’accompagnement. La plupart des mutuelles belges remboursent une partie des consultations diététiques.',
  },
  {
    q: 'Est-ce remboursé par la mutuelle ?',
    r: 'Oui, en partie : la plupart des mutuelles belges ont un forfait « diététique ». Le montant dépend de ta mutuelle. Si tu ne sais pas ce que la tienne couvre, pose-moi la question, je t’aide à y voir clair.',
  },
  {
    q: 'Quelle est la différence entre diététicien·ne et nutritionniste ?',
    r: 'En Belgique, « diététicien·ne » est un titre protégé : il garantit un diplôme reconnu et une pratique encadrée. « Nutritionniste » n’est pas un titre protégé : n’importe qui peut s’appeler ainsi. Je suis diététicienne agréée, et je travaille sur base des preuves scientifiques.',
  },
  {
    q: 'Pourquoi choisir Anne-Charlotte ?',
    r: 'Parce que tu seras écouté·e, pas jugé·e. Je suis spécialisée en troubles digestifs et santé féminine, je me forme en continu (plus de 3 heures par semaine) et j’ai accompagné plus de 1 500 patient·es. Et on travaille toujours à ton rythme, avec le sourire.',
  },
  {
    q: 'Faut-il une prescription du médecin ?',
    r: 'Non, tu peux prendre rendez-vous directement, en ligne ou par téléphone. Certaines mutuelles demandent une prescription pour le remboursement : on en parle au premier rendez-vous si besoin.',
  },
] as const;

export const TEMOIGNAGE_SECTION_TODO =
  'Les témoignages du site Framer sont dans un carrousel non exporté : à récupérer avec Anne-Charlotte avant la bascule.';
