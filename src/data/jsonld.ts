// Générateurs JSON-LD. Le socle du SEO local et du GEO : chaque page émet
// les schémas qui la décrivent, générés depuis les mêmes données que le HTML.
import { SITE } from './site';

export function faqJsonLd(items: ReadonlyArray<{ q: string; r: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.r },
    })),
  };
}

// Le cabinet comme entreprise locale de santé, spécialité diététique.
export function cabinetJsonLd(cabinet: (typeof SITE.cabinets)[number], site: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalBusiness',
    name: `${SITE.nom} — ${cabinet.nom}`,
    medicalSpecialty: 'https://schema.org/DietNutrition',
    url: site,
    telephone: SITE.telephone,
    email: SITE.email,
    priceRange: '80€-270€',
    address: {
      '@type': 'PostalAddress',
      streetAddress: cabinet.rue,
      postalCode: cabinet.codePostal,
      addressLocality: cabinet.ville,
      addressRegion: 'Namur',
      addressCountry: 'BE',
    },
    openingHours: 'Mo-Fr 08:30-17:00',
    founder: { '@id': site + '#anne-charlotte' },
  };
}

// Une page ville : le cabinet + la zone desservie.
export function villeJsonLd(ville: string, site: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalBusiness',
    name: `${SITE.nom} — consultations pour ${ville}`,
    medicalSpecialty: 'https://schema.org/DietNutrition',
    url: site,
    telephone: SITE.telephone,
    priceRange: '80€-270€',
    areaServed: { '@type': 'City', name: ville },
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE.cabinets[0].rue,
      postalCode: SITE.cabinets[0].codePostal,
      addressLocality: SITE.cabinets[0].ville,
      addressCountry: 'BE',
    },
    founder: { '@id': site + '#anne-charlotte' },
  };
}
