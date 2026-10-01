// La prochaine disponibilité, lue sur cal.com AU MOMENT DU BUILD (jamais
// depuis le navigateur des visiteurs : aucun appel tiers côté site).
// Le build de nuit (publier.yml, 4h30 UTC) la remet à jour chaque matin.
// Si cal.com ne répond pas, on renvoie null et la ligne ne s'affiche pas.

const CAL_SLOTS = 'https://api.cal.com/v2/slots';
const UTILISATEUR = 'anne-charlotte-diet';
const FUSEAU = 'Europe/Brussels';

const cache = new Map<string, Promise<string | null>>();

export function prochaineDispo(eventTypeSlug: string): Promise<string | null> {
  if (!cache.has(eventTypeSlug)) cache.set(eventTypeSlug, lire(eventTypeSlug));
  return cache.get(eventTypeSlug)!;
}

async function lire(eventTypeSlug: string): Promise<string | null> {
  const debut = new Date();
  const fin = new Date(debut.getTime() + 45 * 24 * 3600 * 1000);
  const params = new URLSearchParams({
    username: UTILISATEUR,
    eventTypeSlug,
    start: debut.toISOString(),
    end: fin.toISOString(),
    timeZone: FUSEAU,
  });
  try {
    const rep = await fetch(`${CAL_SLOTS}?${params}`, {
      headers: { 'cal-api-version': '2024-09-04' },
      signal: AbortSignal.timeout(8000),
    });
    if (!rep.ok) return null;
    const json = await rep.json();
    const premier = Object.values(json?.data ?? {})
      .flat()
      .map((s: any) => new Date(s.start))
      .filter((d) => !isNaN(+d))
      .sort((a, b) => +a - +b)[0];
    return premier ? formater(premier) : null;
  } catch {
    return null;
  }
}

// « mar. 6 oct. à 21h30 » (court : tient sur une ligne sur mobile)
function formater(d: Date): string {
  const jour = new Intl.DateTimeFormat('fr-BE', {
    timeZone: FUSEAU, weekday: 'short', day: 'numeric', month: 'short',
  }).format(d);
  const [h, m] = new Intl.DateTimeFormat('fr-BE', {
    timeZone: FUSEAU, hour: '2-digit', minute: '2-digit', hourCycle: 'h23',
  }).format(d).split(':');
  return `${jour} à ${Number(h)}h${m}`;
}
