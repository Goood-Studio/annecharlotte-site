// Les blocs de contenu partagés entre plusieurs pages : offres, services,
// FAQ. Une seule source, réutilisée partout, et transformée en JSON-LD
// (FAQPage, Service) par les pages qui l'affichent.
//
// ⚠️ Les réponses de FAQ réécrites ici doivent être validées par
// Anne-Charlotte avant la bascule DNS (règle studio : validation science).

export const OFFRES = [
  {
    // « Petit effort, gros impact » (29/10/2026) : plus de « Premiers pas » ni de suivi à l'unité affiché.
    nom: 'Une consultation',
    prix: '80 €',
    unite: '1 séance, seul·e ou à deux',
    description:
      'On fait le point ensemble sur ton assiette et tout ce qu’il y a autour, et je te donne tes premières pistes pour t’aider, à lancer dès demain.',
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
    // 330 € = 6 séances en visio (le bilan + 5 suivis), depuis le 31/10/2026 on ne parle
    // plus de « 10 semaines ». On prend un problème et on le traite.
    // 31/10/2026 (cadre « Kit Offre » Scalezia) : la promesse en une phrase, puis
    // ce qu'elle reçoit, dans l'ordre où elle le vit. Le carnet entre les séances
    // et la relance à J+3 répondent aux deux freins : « je vais oublier » et « je vais lâcher ».
    nom: 'Accompagnement',
    prix: '330 €',
    unite: '6 séances, en visio',
    description:
      'Tu gardes ce que tu aimes, et on ajoute ce qui te manque, une petite chose à la fois. Entre les séances, ton carnet t’accompagne et je reste joignable.',
    // « Mot-clé : détail » : le mot-clé s'affiche en gras, pour lire la carte en diagonale.
    inclus: [
      'Le bilan : on fait le point ensemble, et tu repars avec ton premier changement',
      '5 séances de suivi : environ toutes les 2 semaines, on regarde ce qui va mieux et on ajoute la suite*',
      'Ton carnet : sur ton téléphone, mis à jour après chaque séance, avec tes exercices au choix',
      'Je reste joignable : un petit point 3 jours après, et un message dès que ça coince. On ajuste tout de suite',
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
    nom: 'Une consultation + un suivi',
    prix: '130 €',
    unite: '2 séances, sur 2 semaines',
    description:
      'On fait le point, tu repars avec tes premières pistes, et on se revoit 2 semaines plus tard pour voir ce qui a changé.',
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
  { quand: 'À ta 6e séance', quoi: 'Tu vois le chemin parcouru, et tu repars avec ton mode d’emploi' },
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
    r: 'Chez moi, une consultation est à 80 €, une consultation suivie d’un point deux semaines plus tard à 130 €, et l’accompagnement (6 séances en visio : le bilan puis 5 suivis, environ toutes les 2 semaines, avec ton carnet entre les séances) à 330 €. La plupart des mutuelles belges remboursent une partie des consultations diététiques.',
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

// Le parcours d'accompagnement, problème par problème (31/10/2026) : pourquoi un
// accompagnement plutôt qu'une consultation, et ce qui se passe séance après séance.
// Construit sur le plan de sa boussole (J0, J7, ~J21, ~J40, ~J60, fin) et ses pistes.
// Les durées sont indicatives : on avance à son rythme, un changement à la fois.
export const PARCOURS = {
  digestif: {
    titre: 'Ton ventre, phase par phase',
    sousTitre: 'Les troubles digestifs',
    pourquoi: [
      { t: 'Un ventre, ça se comprend en testant', d: 'Un rendez-vous donne des pistes. Savoir laquelle marche chez toi, ça demande d’essayer, d’observer, d’ajuster.' },
      { t: 'On ne retire rien sans le remettre', d: 'Si on met un aliment de côté un temps, on le réintroduit ensemble, famille par famille. Seule, c’est là qu’on reste bloquée.' },
      { t: 'Le ventre et la tête se parlent', d: 'Stress, fatigue, rythme des repas : on regarde tout ce qui tourne autour de ton assiette, pas seulement ce qu’il y a dedans.' },
    ],
    phases: [
      { quand: 'Le bilan', t: 'On comprend', d: 'Ton ventre, ce qui le réveille, ce qui doit d’abord être vu par ton médecin. Et ton premier geste : souvent le rythme des repas ou mâcher plus lentement.' },
      { quand: '2 semaines après', t: 'On regarde ce qui a changé', d: 'Ton carnet nous dit ce qui a aidé. On garde, on ajuste, ou on change de piste.' },
      { quand: 'Vers 1 mois', t: 'On cherche ton déclencheur', d: 'Si besoin, les FODMAP en douceur : on remplace 2 ou 3 aliments, pas toute ta cuisine, pendant 2 semaines.' },
      { quand: 'Vers 6 semaines', t: 'On réintroduit et on élargit', d: 'Famille par famille, pour garder le plus de variété possible. Et on s’occupe du stress qui tape sur le ventre.' },
      { quand: 'Vers 2 mois', t: 'On consolide', d: 'Ce qui marche devient une habitude, même les semaines chargées.' },
      { quand: 'La dernière séance', t: 'Ton mode d’emploi', d: 'Ce qui passe bien, tes déclencheurs, et quoi faire si ça revient. Tu repars autonome.' },
    ],
    garde: 'Sang dans les selles, perte de poids sans raison, symptômes qui réveillent la nuit : on en parle d’abord avec ton médecin. Je travaille en complément du suivi médical, jamais à sa place.',
  },
  sopk: {
    titre: 'Ton SOPK, ta porte d’entrée',
    sousTitre: 'SOPK',
    pourquoi: [
      { t: 'Il n’y a pas deux SOPK pareils', d: 'Fringales, cycles, peau, fatigue, projet bébé : ce qui te gêne, toi, n’est pas ce qui gêne ta voisine.' },
      { t: 'Pas de régime unique, c’est la règle', d: 'Les recommandations internationales de 2023 le disent : on construit avec toi, selon tes objectifs et ta vie.' },
      { t: 'On ajuste en avançant', d: 'Un changement à la fois, on regarde ce qu’il donne chez toi, et on garde ce qui marche.' },
    ],
    branchesTitre: 'Tu viens peut-être pour…',
    portes: ['Comprendre ton diagnostic', 'Tes fringales et ta fatigue', 'Ta peau, tes cheveux, tes cycles', 'Ton poids', 'Ton ventre', 'Un projet bébé', 'Juste aller mieux'],
    pareil: 'On part de ton histoire. À chaque séance, on regarde ensemble par où on commence, à ton rythme. Toujours avec la même idée : mange pour être libre.',
    garde: 'Le diagnostic est posé par ton médecin ou ton gynéco. On ne commence jamais par un complément, et tout projet bébé se discute avec eux.',
  },
  endo: {
    titre: 'Ton endométriose, ta porte d’entrée',
    sousTitre: 'Endométriose',
    pourquoi: [
      { t: 'Il n’y a pas deux endométrioses pareilles', d: 'Douleurs, ventre, fatigue, cycle : on part de ce qui pèse le plus pour toi.' },
      { t: 'Ton ventre peut avoir plusieurs histoires', d: 'Lié au cycle, intestin irritable, transit qui coince ou qui s’emballe : on cherche laquelle, avant de changer quoi que ce soit.' },
      { t: 'Pas de restriction inutile', d: 'Si tu as déjà beaucoup retiré, on remet d’abord. Manger varié nourrit ton microbiote, ton meilleur allié.' },
    ],
    branchesTitre: 'Tu viens peut-être pour…',
    portes: ['Tes douleurs', 'Ton ventre qui gonfle', 'Ton transit', 'Ta fatigue', 'Tout ce que tu as déjà supprimé', 'Ne plus te priver pour rien'],
    pareil: 'On part de ton histoire. À chaque séance, on regarde ensemble par où on commence, à ton rythme. Toujours avec la même idée : mange pour être libre.',
    garde: 'Je travaille avec ton gynéco, jamais à sa place. Sang dans les selles, perte de poids sans raison, douleur à la selle pendant les règles : on vérifie d’abord avec ton médecin, avant de changer ton alimentation.',
  },
} as const;

// L'exemple de carnet montré dans « À quoi ça ressemble, au quotidien », selon la page
// (31/10/2026) : gourmand sur l'accueil, ventre sur troubles digestifs, endo sur santé féminine.
// Exercices repris des familles du carnet de sa boussole.
export const EXEMPLES_CARNET = {
  general: {
    label: 'Mieux manger', prenom: 'Sophie',
    raison: 'Avoir de l’énergie pour mes enfants',
    piste: 'Le même repas, en mieux',
    exos: ['Tes pâtes bolo, deux fois plus de sauce que de pâtes', 'Ton biscuit, savouré à table et sans écran', 'Du fromage frais sous ta confiture'],
    lendemain: 'Tu commences ta première petite chose : tes pâtes bolo avec plus de sauce, ton biscuit savouré sans écran, du fromage frais sous ta confiture…',
  },
  digestif: {
    label: 'Ventre', prenom: 'Julie',
    raison: 'Ne plus avoir le ventre gonflé au bureau',
    piste: 'Les premiers gestes pour le ventre',
    exos: ['Des repas à heures régulières', 'Mâcher 10 fois tes 5 premières bouchées', 'Ton plat riche, version légère'],
    lendemain: 'Tu commences ta première petite chose : des repas à heures régulières, mâcher un peu plus, une balade après le souper…',
  },
  endo: {
    label: 'Endométriose', prenom: 'Emma',
    raison: 'Vivre mes règles sans être clouée au lit',
    piste: 'Méditerranéen, en ajoutant',
    exos: ['Changer d’huile : olive pour cuire, colza pour assaisonner', 'Des petits poissons gras deux fois par semaine', 'Le pot d’épices, un plat par jour'],
    lendemain: 'Tu commences ta première petite chose : une bonne huile, des sardines sur ta tartine, ton carnet par phase du cycle…',
  },
  sopk: {
    label: 'SOPK', prenom: 'Inès',
    raison: 'Me sentir bien dans mon corps, toute la journée',
    piste: 'On améliore ton équilibre',
    exos: ['L’image du sablier : qu’ajouter à mon repas ?', 'Tiens, j’ai bougé cette semaine', 'Une poignée de noix à 16 h'],
    lendemain: 'Tu commences ta première petite chose : regarder ton repas avec l’image du sablier, une poignée de noix à 16 h, un peu de mouvement…',
  },
  meno: {
    label: 'Ménopause', prenom: 'Nathalie',
    raison: 'Retrouver mes nuits',
    piste: 'Des soirées qui aident à dormir',
    exos: ['Souper un peu plus tôt', 'Un goûter vers 16-17 h', 'Tiens, j’ai des protéines au matin ?'],
    lendemain: 'Tu commences ta première petite chose : un goûter vers 16 h, un souper un peu plus tôt, des protéines au petit-déj…',
  },

} as const;
