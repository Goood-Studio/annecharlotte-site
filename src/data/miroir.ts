// Le miroir avant réservation (/bilan) : les phrases dans les mots des
// patientes, tirées des transcripts de consultation (reformulées, jamais
// citées) et validées par Anne-Charlotte le 30/09/2026.
// `menager` : une phrase de restriction ou de peur de grossir. Si la personne
// s'y reconnaît « tout à fait », on ne lui demande pas de photos de ses repas.

export type Phrase = { texte: string; menager?: boolean };

export const MOTIFS: [id: string, label: string][] = [
  ['sii', 'Mon ventre, ma digestion'],
  ['endo', 'Mon endométriose'],
  ['smop', 'Mon SOPK / SMOP'],
  ['meno', 'Ma périménopause, ma ménopause'],
  ['poids', 'Mon poids, mes habitudes'],
  ['autre', 'Autre chose'],
];

export const PHRASES: Record<string, Phrase[]> = {
  sii: [
    { texte: 'Le soir, j’ai l’air enceinte de plusieurs mois.' },
    { texte: 'Le matin ça va, et le soir je ne ferme plus mon pantalon.' },
    { texte: 'J’ai mal au ventre, et je ne sais jamais ce qui l’a déclenché.' },
    { texte: 'Je repère toujours où sont les toilettes avant de sortir.' },
    { texte: 'J’ai supprimé plein d’aliments, et ça n’a rien changé.', menager: true },
    { texte: 'On m’a dit que tout était normal, mais moi j’ai toujours mal.' },
  ],
  endo: [
    { texte: 'J’ai mis longtemps à être crue quand je parlais de ma douleur.' },
    { texte: 'Je ne sais plus si c’est mon ventre ou mes règles qui me fait mal.' },
    { texte: 'On m’a retiré tellement d’aliments que je ne sais plus quoi manger.', menager: true },
    { texte: 'Pendant mes règles, je n’ai plus d’énergie pour rien.' },
    { texte: 'Mon ventre gonfle au fil de la journée et je me cache.' },
    { texte: 'Quand j’ai mal, j’ai une envie de sucre que je ne contrôle pas.' },
  ],
  smop: [
    { texte: 'Avant mes règles, je me jette sur le sucré ou le salé.' },
    { texte: 'Mon ventre a changé et je ne comprends pas pourquoi.' },
    { texte: 'Je suis fatiguée dès le réveil.' },
    { texte: 'Mon cycle fait un peu ce qu’il veut.' },
    { texte: 'Je mange plutôt peu, et pourtant ça ne bouge pas.' },
    { texte: 'Depuis que j’ai changé de pilule, mon corps n’est plus le même.' },
  ],
  meno: [
    { texte: 'Je ne reconnais plus mon corps.' },
    { texte: 'Mon ventre s’est installé, alors que je mange pareil.' },
    { texte: 'On me dit « c’est la ménopause », mais personne ne me dit quoi faire.' },
    { texte: 'Je ne sais plus si c’est du gras ou du gonflement.' },
    { texte: 'Je me prive de plein de choses, et ça ne bouge pas.', menager: true },
    { texte: 'Je m’occupe de tout le monde, sauf de moi.' },
  ],
  poids: [
    { texte: 'J’ai tout essayé, et ça revient toujours.' },
    { texte: 'Une mauvaise journée, et je vide le frigo.' },
    { texte: 'Quand je mange, je pense déjà que je vais grossir.', menager: true },
    { texte: 'Le soir, une fois tout le monde couché, je craque.' },
    { texte: 'Je ne sais plus si j’ai faim ou juste envie.' },
    { texte: 'J’ai fini mon assiette avant de l’avoir vue passer.' },
  ],
  autre: [
    { texte: 'Je suis fatiguée tout le temps, même après une nuit.' },
    { texte: 'J’ai l’impression d’avoir déjà tout essayé.' },
    { texte: 'Je n’ai jamais un moment rien que pour moi.' },
    { texte: 'On m’a souvent dit que c’était dans ma tête, ou juste le stress.' },
    { texte: 'J’ai reçu tellement de conseils que je ne sais plus qui croire.' },
    { texte: 'Je voudrais juste me sentir bien dans mon corps, sans me priver.' },
  ],
};

// Combien de phrases montrer : 6 pour un motif, 4 + 4 pour deux, 3 par
// motif au-delà (3 motifs maximum). « Autre » ne sert que s'il est seul.
export function phrasesPour(motifs: string[]): Phrase[] {
  const choisis = motifs.filter((m) => m !== 'autre');
  const liste = choisis.length ? choisis.slice(0, 3) : ['autre'];
  const parMotif = liste.length === 1 ? 6 : liste.length === 2 ? 4 : 3;
  return liste.flatMap((m) => PHRASES[m].slice(0, parMotif));
}
