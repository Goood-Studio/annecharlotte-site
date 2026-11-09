// Les guides (lead magnets) tels que le site les sert (09/11/2026).
// Plus de formulaire : chaque guide se télécharge directement, sous l'article
// qui l'explique. Un guide « Publié » dans Notion n'apparaît que si son PDF
// est bien dans public/guides/pdf/<slug>.pdf : jamais de bouton vers un
// fichier absent.
import { existsSync, statSync } from 'node:fs';
import guidesData from './guides.json';
import articlesData from './articles.json';
import { u } from './site';

export type Guide = (typeof guidesData.guides)[number];
type Article = (typeof articlesData.articles)[number] & { guide?: string | null };

const cheminPdf = (slug: string) => 'public/guides/pdf/' + slug + '.pdf';

export const guidesPublies: Guide[] = guidesData.guides.filter((g) => {
  if (g.statut !== 'Publié' || !g.slug) return false;
  if (existsSync(cheminPdf(g.slug))) return true;
  console.warn(`⚠️  Guide « ${g.titre} » publié dans Notion mais ${cheminPdf(g.slug)} est absent : il reste caché.`);
  return false;
});

export const guideParSlug = (slug?: string | null) => (slug ? guidesPublies.find((g) => g.slug === slug) : undefined);

// L'article qui explique ce guide (relation « Guide » dans la base Articles).
export const articleDuGuide = (slug: string) =>
  (articlesData.articles as Article[]).find((a) => a.guide === slug);

// Le guide d'un article : le sien d'abord, sinon un guide du même pilier.
export function guideDeLArticle(article: Article) {
  const sien = guideParSlug(article.guide);
  if (sien) return { guide: sien, sien: true };
  const voisin = article.pilier ? guidesPublies.find((g) => g.pilier === article.pilier) : undefined;
  return voisin ? { guide: voisin, sien: false } : undefined;
}

export const lienPdf = (slug: string) => u('/guides/pdf/' + slug + '.pdf');

export function poidsPdf(slug: string) {
  try {
    const octets = statSync(cheminPdf(slug)).size;
    return octets < 1e6 ? Math.round(octets / 1e3) + ' Ko' : (octets / 1e6).toFixed(1).replace('.', ',') + ' Mo';
  } catch {
    return '';
  }
}
