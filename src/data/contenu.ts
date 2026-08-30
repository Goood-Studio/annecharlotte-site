// Les blocs de contenu partagés entre plusieurs pages : offres, services,
// FAQ. Une seule source, réutilisée partout, et transformée en JSON-LD
// (FAQPage, Service) par les pages qui l'affichent.
//
// ⚠️ Les réponses de FAQ réécrites ici doivent être validées par
// Anne-Charlotte avant la bascule DNS (règle studio : validation science).

export const OFFRES = [
  {
    nom: 'Premiers pas',
    prix: '80 €',
    unite: 'la consultation',
    description:
      'Consultation individuelle (ou à deux) : on fait le point et tu repars avec des ajustements concrets, adaptés à ta vie.',
    inclus: [
      'Bilan initial complet',
      'Remboursement mutuelle possible',
      'Canal direct de discussion',
      'Planificateur de recettes et analyses',
    ],
    ctaTexte: 'Commence ici',
    meilleurChoix: false,
  },
  {
    nom: 'Pack tout compris',
    prix: '290 €',
    unite: 'par personne, avec un objectif',
    description:
      'On prend un problème ou un objectif, et on solutionne la situation ensemble.',
    inclus: [
      'Suivi hebdomadaire jusqu’à 10 semaines*',
      'Des améliorations construites pour ta vie réelle',
      'Remboursement mutuelle possible',
      'Canal direct de discussion',
      'Planificateur de recettes et analyses',
    ],
    ctaTexte: 'Solutionne ce tracas, enfin !',
    meilleurChoix: true,
  },
  {
    nom: 'Pack tabac',
    prix: '290 €',
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
    ctaTexte: 'Arrêter, sans la peur de grossir',
    meilleurChoix: false,
  },
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
      'Une semaine avant la consultation, je te contacte via WhatsApp. Selon ton besoin, je vais peut-être te demander de prendre tes repas en photo, et quand on se voit, on les regarde ensemble, sans jugement, à partir de ton propre point de départ. Ça permet d’avoir une vision claire d’où peuvent venir les symptômes, ou de comment se compose ton assiette, sans être dans la récitation ! Aucun jugement, au contraire : on y verra déjà tout le positif 🙂',
  },
  {
    titre: 'La première rencontre',
    texte:
      '« Comment puis-je vous aider ? » On prend le temps ensemble de comprendre ton besoin. On a la base de tes repas, on regarde autour de l’assiette pour une vue complète, et on définit ensemble nos premiers ajustements. En visio, tu peux facilement aller chercher dans tes armoires un produit qui te pose question.',
  },
  {
    titre: 'Entre les rendez-vous',
    texte:
      'Tu m’écris sur WhatsApp quand ça t’arrange. Toutes mes conversations patient·es sont en silencieux : une photo de ton assiette à 21h30 ne me dérange jamais, ça ne sonne pas chez moi. C’est pensé pour que nos échanges restent simples, sans que tu aies à te demander si c’est le bon moment.',
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
    r: 'Chez moi, la consultation « Premiers pas » est à 80 €, et l’accompagnement complet à 290 € par personne. La plupart des mutuelles belges remboursent une partie des consultations diététiques.',
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
