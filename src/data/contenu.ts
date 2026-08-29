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
      'Consultation individuelle (ou à deux) : on fait le point et tu repars avec un plan clair.',
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
      'Plan alimentaire personnalisé',
      'Remboursement mutuelle possible',
      'Canal direct de discussion',
      'Planificateur de recettes et analyses',
    ],
    ctaTexte: 'Solutionne ce tracas, enfin !',
    meilleurChoix: true,
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
      'Un plan alimentaire pensé pour ta vie réelle : tes besoins, ton rythme, tes goûts. Pas de régime punitif, une approche durable et bienveillante.',
  },
  {
    titre: 'Soutien et suivi',
    texte:
      'Tu n’avances pas seul·e : suivi régulier, conseils adaptés et un vrai soutien à chaque étape, à ton rythme.',
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
] as const;

// FAQ « diététicien·ne » : présente sur les pages villes, piliers et contact.
// Questions reprises du site actuel, réponses réécrites en langage accessible.
export const FAQ_DIET = [
  {
    q: 'Quel est le travail d’un diététicien ou d’une diététicienne ?',
    r: 'Un·e diététicien·ne est un·e professionnel·le de santé spécialisé·e en nutrition, avec un diplôme reconnu (bachelier en diététique en Belgique). Concrètement : on évalue tes besoins, on construit un plan alimentaire adapté à ta vie, et on t’accompagne pour les troubles digestifs, hormonaux ou métaboliques. En Belgique, le titre est protégé par la loi.',
  },
  {
    q: 'Quand consulter un diététicien ou une diététicienne ?',
    r: 'Dès que l’alimentation te pose question ou te pèse : maux de ventre qui reviennent, ballonnements, intestin irritable, SOPK, endométriose, fatigue, envie de mieux manger sans savoir par où commencer. Pas besoin d’attendre que ce soit « grave » : plus tôt on s’y met, plus vite tu vas mieux.',
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
