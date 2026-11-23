// Régions de France métropolitaine : nom tel qu'enregistré dans la base,
// adresse de la page région, et place sur la carte en tuiles de l'accueil.

export type RegionTile = {
  slug: string
  nom: string
  court: string
  col: number
  row: number
}

export const REGIONS_METRO: RegionTile[] = [
  { slug: 'hauts-de-france', nom: 'Hauts-de-France', court: 'Hauts-de-France', col: 4, row: 1 },
  { slug: 'bretagne', nom: 'Bretagne', court: 'Bretagne', col: 1, row: 2 },
  { slug: 'normandie', nom: 'Normandie', court: 'Normandie', col: 3, row: 2 },
  { slug: 'ile-de-france', nom: 'Île-de-France', court: 'Île-de-France', col: 4, row: 2 },
  { slug: 'grand-est', nom: 'Grand Est', court: 'Grand Est', col: 5, row: 2 },
  { slug: 'pays-de-la-loire', nom: 'Pays de la Loire', court: 'Pays de la Loire', col: 2, row: 3 },
  { slug: 'centre-val-de-loire', nom: 'Centre-Val de Loire', court: 'Centre', col: 3, row: 3 },
  { slug: 'bourgogne-franche-comte', nom: 'Bourgogne-Franche-Comté', court: 'Bourgogne', col: 4, row: 3 },
  { slug: 'nouvelle-aquitaine', nom: 'Nouvelle-Aquitaine', court: 'Nouvelle-Aquitaine', col: 2, row: 4 },
  { slug: 'auvergne-rhone-alpes', nom: 'Auvergne-Rhône-Alpes', court: 'Auvergne-Rhône-Alpes', col: 4, row: 4 },
  { slug: 'occitanie', nom: 'Occitanie', court: 'Occitanie', col: 3, row: 5 },
  { slug: 'provence-alpes-cote-dazur', nom: "Provence-Alpes-Côte d'Azur", court: 'Provence', col: 5, row: 5 },
  { slug: 'corse', nom: 'Corse', court: 'Corse', col: 6, row: 6 },
]

/** Le logement accepte-t-il les chiens de plus de 10 kg ? */
export function accepteGrandChien(equipements: unknown): boolean {
  return Array.isArray(equipements) && equipements.includes('chien_10kg')
}

/** Adresse lisible d'un nom : « Saint-Jean-de-Monts » → « saint-jean-de-monts ». */
export function slugifier(value: string) {
  return value
    .trim()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

/** Page région d'un nom de région tel qu'enregistré dans la base. */
export function slugRegion(nom: string | null | undefined): string | null {
  if (!nom) return null
  return REGIONS_METRO.find(r => r.nom === nom)?.slug ?? null
}

/** Toutes les pages région existantes (métropole et outre-mer), slug → nom en base */
export const REGIONS_SLUGS: Record<string, string> = {
  ...Object.fromEntries(REGIONS_METRO.map(r => [r.slug, r.nom])),
  guadeloupe: 'Guadeloupe',
  martinique: 'Martinique',
  guyane: 'Guyane',
  'la-reunion': 'La Réunion',
  mayotte: 'Mayotte',
}

export type Statistiques = {
  total: number
  disponibles: number
  chiens: number
  prixMin: number | null
  prixMedian: number | null
  villes: { nom: string; slug: string; nombre: number }[]
}

/** Chiffres réels d'une liste d'annonces, pour les textes des pages */
export function statistiques(
  liste: { ville?: string | null; prix_nuit?: number | null; statut?: string | null; equipements?: unknown }[]
): Statistiques {
  const prix = liste
    .map(v => Number(v.prix_nuit))
    .filter(n => Number.isFinite(n) && n > 0)
    .sort((a, b) => a - b)
  const villes = new Map<string, { nom: string; slug: string; nombre: number }>()
  for (const v of liste) {
    const nom = v.ville?.trim()
    if (!nom) continue
    const slug = slugifier(nom)
    const ex = villes.get(slug)
    if (ex) ex.nombre += 1
    else villes.set(slug, { nom, slug, nombre: 1 })
  }
  return {
    total: liste.length,
    disponibles: liste.filter(v => v.statut === 'active').length,
    chiens: liste.filter(v => accepteGrandChien(v.equipements)).length,
    prixMin: prix.length ? Math.round(prix[0]) : null,
    prixMedian: prix.length ? Math.round(prix[Math.floor(prix.length / 2)]) : null,
    villes: [...villes.values()].sort((a, b) => b.nombre - a.nombre || a.nom.localeCompare(b.nom, 'fr')),
  }
}
