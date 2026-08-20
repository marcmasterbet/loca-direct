import { MetadataRoute } from 'next'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const BASE_URL = 'https://www.loca-direct.fr'

const REGIONS_SLUGS: Record<string, string> = {
  'auvergne-rhone-alpes': 'Auvergne-Rhône-Alpes',
  'bourgogne-franche-comte': 'Bourgogne-Franche-Comté',
  'bretagne': 'Bretagne',
  'centre-val-de-loire': 'Centre-Val de Loire',
  'corse': 'Corse',
  'grand-est': 'Grand Est',
  'hauts-de-france': 'Hauts-de-France',
  'ile-de-france': 'Île-de-France',
  'normandie': 'Normandie',
  'nouvelle-aquitaine': 'Nouvelle-Aquitaine',
  'occitanie': 'Occitanie',
  'pays-de-la-loire': 'Pays de la Loire',
  'provence-alpes-cote-dazur': "Provence-Alpes-Côte d'Azur",
  'guadeloupe': 'Guadeloupe',
  'martinique': 'Martinique',
  'guyane': 'Guyane',
  'la-reunion': 'La Réunion',
  'mayotte': 'Mayotte',
}

const ACTIVITES_SLUGS = [
  'conciergerie',
  'menage',
  'photographe',
  'digital',
  'maintenance',
  'jardinage',
  'decoration',
  'kits-accueil',
  'autre',
]

function slugify(value: string) {
  return decodeURIComponent(value)
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function getRegionSlug(regionName: string) {
  return Object.entries(REGIONS_SLUGS).find(
    ([, name]) => name === regionName
  )?.[0]
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()

  // Pages statiques
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${BASE_URL}/logements`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/logements/chiens`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/prestataires`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/alternative-airbnb`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/inscription`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/connexion`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/cgu`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/mentions-legales`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/politique-confidentialite`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/cookies`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]

  // Pages régions logements
  const regionsPages: MetadataRoute.Sitemap =
    Object.keys(REGIONS_SLUGS).map(regionSlug => ({
      url: `${BASE_URL}/location-vacances/${regionSlug}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }))

  // Pages prestataires activité + région
  const prestatairesRegionsPages: MetadataRoute.Sitemap =
    ACTIVITES_SLUGS.flatMap(activite =>
      Object.keys(REGIONS_SLUGS).map(regionSlug => ({
        url: `${BASE_URL}/prestataires/${activite}/${regionSlug}`,
        lastModified: now,
        changeFrequency: 'weekly' as const,
        priority: 0.7,
      }))
    )

  // Logements
  const { data: vitrines, error: vitrinesError } = await supabase
    .from('vitrines')
    .select('id, ville, region, created_at')
    .in('statut', [
      'active',
      'deja_loue',
      'bientot_dispo',
    ])

  if (vitrinesError) {
    console.error('Erreur sitemap vitrines :', vitrinesError)
  }

  // Fiches logements
  const vitrinesPages: MetadataRoute.Sitemap =
    (vitrines || []).map(vitrine => ({
      url: `${BASE_URL}/vitrine/${vitrine.id}`,
      lastModified: vitrine.created_at
        ? new Date(vitrine.created_at)
        : now,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }))

  // Pages villes
  const villesMap = new Map<
    string,
    {
      regionSlug: string
      villeSlug: string
      lastModified: Date
    }
  >()

  for (const vitrine of vitrines || []) {
    if (!vitrine.ville || !vitrine.region) continue

    const regionSlug = getRegionSlug(vitrine.region)
    if (!regionSlug) continue

    const villeSlug = slugify(vitrine.ville)
    if (!villeSlug) continue

    const key = `${regionSlug}/${villeSlug}`

    const lastModified = vitrine.created_at
      ? new Date(vitrine.created_at)
      : now

    const existing = villesMap.get(key)

    if (
      !existing ||
      lastModified.getTime() > existing.lastModified.getTime()
    ) {
      villesMap.set(key, {
        regionSlug,
        villeSlug,
        lastModified,
      })
    }
  }

  const villesPages: MetadataRoute.Sitemap =
    Array.from(villesMap.values()).map(ville => ({
      url:
        `${BASE_URL}/location-vacances/` +
        `${ville.regionSlug}/${ville.villeSlug}`,
      lastModified: ville.lastModified,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    }))

  // Prestataires dynamiques
  const { data: prestataires, error: prestatairesError } =
    await supabase
      .from('prestataires')
      .select('id, created_at')
      .eq('statut', 'active')

  if (prestatairesError) {
    console.error(
      'Erreur sitemap prestataires :',
      prestatairesError
    )
  }

  const prestatairesPages: MetadataRoute.Sitemap =
    (prestataires || []).map(prestataire => ({
      url: `${BASE_URL}/prestataires/${prestataire.id}`,
      lastModified: prestataire.created_at
        ? new Date(prestataire.created_at)
        : now,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }))

  return [
    ...staticPages,
    ...regionsPages,
    ...villesPages,
    ...prestatairesRegionsPages,
    ...vitrinesPages,
    ...prestatairesPages,
  ]
}
