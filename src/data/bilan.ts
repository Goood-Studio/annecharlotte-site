// Le questionnaire pré-consultation (/bilan) : les roues et la grille de
// végétaux. Les 4 roues de profil sont reprises à l'identique de
// « La Roue ACJ » (acj-bilan/roue-acj.html). La roue « Poids et habitudes »
// est nouvelle : ses listes de détail sont à valider par Anne-Charlotte.

export type Zone = 'corps' | 'energie' | 'tete';
export type Axe = [id: string, label: string, zone: Zone];

// Détail des symptômes (deuxième roue), par axe.
export const DETAILS: Record<string, string[]> = {
  ballonnements: ['Ventre gonflé en fin de journée', 'Gaz', 'Rots et renvois', 'Gargouillis', 'Gonflement juste après les repas'],
  douleurs: ['Crampes', 'Douleur après les repas', 'Douleur liée aux selles', 'Gêne au quotidien'],
  transit: ['Constipation', 'Diarrhée', 'Urgences', 'Évacuation incomplète', 'Selles qui changent d’un jour à l’autre'],
  fatigue: ['Fatigue au réveil', 'Coup de barre après les repas', 'Fatigue en fin de journée', 'Brouillard mental'],
  sommeil: ['Difficulté à m’endormir', 'Réveils la nuit', 'Réveil pas reposée', 'Nuits trop courtes'],
  stress: ['Ruminations', 'Tension dans le corps', 'Irritabilité', 'Me sentir débordée', 'Manger sous le coup du stress'],
  humeur: ['Tristesse', 'Perte d’envie', 'Pleurs faciles', 'Moral qui suit le cycle'],
  relation: ['Culpabilité après avoir mangé', 'Peur de certains aliments', 'Pertes de contrôle', 'Envie de me restreindre', 'Pensées envahissantes sur la nourriture'],
  regles: ['Intensité de la douleur', 'Nombre de jours douloureux', 'Douleur dans le dos ou les jambes', 'Douleur en allant à selle pendant les règles', 'Recours aux antidouleurs'],
  pelvien: ['Douleur pelvienne hors règles', 'Douleur pendant les rapports', 'Douleur à l’ovulation', 'Douleur en urinant'],
  endobelly: ['Ventre gonflé avant et pendant les règles', 'Transit perturbé pendant les règles', 'Nausées', 'Douleurs digestives'],
  cycle: ['Cycles de plus de 35 jours', 'Règles imprévisibles', 'Absence de règles', 'Syndrome prémenstruel'],
  peau: ['Acné', 'Pilosité', 'Chute de cheveux', 'Peau grasse'],
  sucre: ['Fringales l’après-midi', 'Grignotage le soir', 'Coup de barre après les repas', 'Envies avant les règles'],
  sucreMeno: ['Fringales l’après-midi', 'Grignotage le soir', 'Coup de barre après les repas', 'Envie de sucré quand je suis fatiguée'],
  image: ['Insatisfaction de mon corps', 'Culpabilité après avoir mangé', 'Pertes de contrôle', 'Envie de me restreindre', 'Me peser souvent'],
  bouffees: ['Bouffées dans la journée', 'Sueurs la nuit', 'Intensité des bouffées', 'Gêne au travail ou en public'],
  ventre: ['Ventre gonflé', 'Prise de poids sur le ventre', 'Vêtements qui serrent', 'Rétention d’eau'],
  digestion: ['Ballonnements', 'Constipation', 'Reflux', 'Aliments moins bien tolérés qu’avant'],
  // Roue « Poids et habitudes » (nouvelle, à valider).
  rythme: ['Sauter le petit-déjeuner', 'Sauter le repas de midi', 'Manger tard le soir', 'Horaires qui changent tous les jours'],
  fringales: ['Fringales l’après-midi', 'Grignotage le soir', 'Grignoter en cuisinant', 'Envie de sucré après le repas'],
  vite: ['Manger en moins de 10 minutes', 'Manger devant un écran', 'Manger debout ou en marchant', 'Ne plus me souvenir du repas'],
  faim: ['Ne pas sentir la faim', 'Avoir faim peu après le repas', 'Ne pas sentir quand j’ai assez mangé', 'Finir l’assiette même sans faim'],
  emotions: ['Manger quand je suis stressée', 'Manger quand je suis triste ou seule', 'Manger pour me récompenser', 'Manger quand je m’ennuie'],
};

export const PROFILS: Record<string, { nom: string; axes: Axe[] }> = {
  sii: {
    nom: 'SII / ventre',
    axes: [
      ['ballonnements', 'Ballonnements', 'corps'], ['douleurs', 'Douleurs au ventre', 'corps'], ['transit', 'Transit perturbé', 'corps'],
      ['fatigue', 'Fatigue', 'energie'], ['sommeil', 'Sommeil perturbé', 'energie'],
      ['stress', 'Stress et anxiété', 'tete'], ['humeur', 'Moral bas', 'tete'], ['relation', 'Relation tendue à la nourriture', 'tete'],
    ],
  },
  endo: {
    nom: 'Endométriose',
    axes: [
      ['regles', 'Douleurs de règles', 'corps'], ['pelvien', 'Douleurs hors règles', 'corps'], ['endobelly', 'Ventre et digestion', 'corps'],
      ['fatigue', 'Fatigue', 'energie'], ['sommeil', 'Sommeil perturbé', 'energie'],
      ['stress', 'Stress et anxiété', 'tete'], ['humeur', 'Moral bas', 'tete'], ['relation', 'Relation tendue à la nourriture', 'tete'],
    ],
  },
  smop: {
    nom: 'SMOP / SOPK',
    axes: [
      ['cycle', 'Cycle irrégulier', 'corps'], ['peau', 'Peau et cheveux', 'corps'], ['sucre', 'Fringales et envies de sucre', 'corps'],
      ['fatigue', 'Fatigue', 'energie'], ['sommeil', 'Sommeil perturbé', 'energie'],
      ['stress', 'Stress et anxiété', 'tete'], ['humeur', 'Moral bas', 'tete'], ['image', 'Image du corps et nourriture', 'tete'],
    ],
  },
  meno: {
    nom: 'Périménopause / ménopause',
    axes: [
      ['bouffees', 'Bouffées de chaleur', 'corps'], ['ventre', 'Ventre et silhouette qui changent', 'corps'], ['digestion', 'Digestion', 'corps'],
      ['fatigue', 'Fatigue', 'energie'], ['sommeil', 'Sommeil perturbé', 'energie'],
      ['humeur', 'Humeur et irritabilité', 'tete'], ['stress', 'Stress et anxiété', 'tete'], ['sucreMeno', 'Envies de sucre', 'tete'],
    ],
  },
  poids: {
    nom: 'Poids et habitudes',
    axes: [
      ['rythme', 'Rythme des repas', 'corps'], ['fringales', 'Fringales et grignotage', 'corps'], ['vite', 'Manger vite ou distraite', 'corps'],
      ['faim', 'Faim et satiété floues', 'energie'], ['sommeil', 'Sommeil', 'energie'],
      ['emotions', 'Manger sous le coup des émotions', 'tete'], ['stress', 'Stress', 'tete'], ['relation', 'Relation à la nourriture', 'tete'],
    ],
  },
};

// « Autre » affiche la roue Habitudes.
export const ROUE_DU_MOTIF: Record<string, string> = {
  sii: 'sii', endo: 'endo', smop: 'smop', meno: 'meno', poids: 'poids', autre: 'poids',
};

export const MOTIFS: [id: string, label: string][] = [
  ['sii', 'SII / ventre'],
  ['endo', 'Endométriose'],
  ['smop', 'SMOP / SOPK'],
  ['meno', 'Périménopause / ménopause'],
  ['poids', 'Poids et habitudes'],
  ['autre', 'Autre'],
];

// Environ 50 végétaux courants en Belgique, par famille. On compte les
// plantes, pas les calories : chaque plante différente de la semaine = 1.
export const VEGETAUX: [famille: string, plantes: string[]][] = [
  ['Légumes', ['Carotte', 'Courgette', 'Tomate', 'Poivron', 'Concombre', 'Salade', 'Épinard', 'Brocoli', 'Chou-fleur', 'Chou', 'Poireau', 'Oignon', 'Ail', 'Champignon', 'Haricot vert', 'Potiron / butternut', 'Betterave', 'Céleri', 'Chicon', 'Petits pois', 'Aubergine', 'Radis']],
  ['Fruits', ['Pomme', 'Poire', 'Banane', 'Orange / mandarine', 'Citron', 'Kiwi', 'Fraise', 'Framboise', 'Myrtille', 'Raisin', 'Avocat', 'Fruits secs']],
  ['Légumineuses', ['Lentilles', 'Pois chiches', 'Haricots rouges ou blancs', 'Tofu / soja']],
  ['Céréales et féculents', ['Avoine', 'Riz complet', 'Pain complet', 'Quinoa', 'Sarrasin', 'Pomme de terre', 'Patate douce', 'Maïs']],
  ['Noix et graines', ['Noix', 'Amandes', 'Noisettes', 'Graines de lin ou de chia', 'Graines de courge ou de tournesol', 'Sésame']],
  ['Herbes et épices', ['Persil', 'Basilic', 'Ciboulette', 'Curcuma', 'Gingembre', 'Cannelle']],
];
