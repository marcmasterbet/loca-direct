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
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/['’]/g, '-')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function getRegionSlug(regionName: string) {
  return Object.entries(REGIONS_SLUGS).find(
    ([, name]) => name === regionName
  )?.[0]
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {

  /*
   * PAGES STATIQUES
   */

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${BASE_URL}/logements`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/logements/chiens`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/prestataires`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/alternative-airbnb`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/inscription`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/connexion`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/cgu`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/mentions-legales`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/politique-confidentialite`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/cookies`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]

  /*
   * PAGES RÉGIONS
   */

  const regionsPages: MetadataRoute.Sitemap =
    Object.keys(REGIONS_SLUGS).map(slug => ({
      url: `${BASE_URL}/location-vacances/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }))

  /*
   * PAGES PRESTATAIRES
   * activité + région
   */

  const prestatairesRegionsPages: MetadataRoute.Sitemap =
    ACTIVITES_SLUGS.flatMap(activite =>
      Object.keys(REGIONS_SLUGS).map(region => ({
        url: `${BASE_URL}/prestataires/${activite}/${region}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
      }))
    )

  /*
   * RÉCUPÉRATION DES LOGEMENTS
   *
   * On récupère maintenant :
   * id
   * ville
   * région
   * created_at
   *
   * Cela permet de générer à la fois :
   * - les fiches logements
   * - les pages SEO villes
   */

  const { data: vitrines } = await supabase
    .from('vitrines')
    .select('id, ville, region, created_at')
    .in('statut', [
      'active',
      'deja_loue',
      'bientot_dispo',
    ])

  /*
   * FICHES LOGEMENTS
   */

  const vitrinesPages: MetadataRoute.Sitemap =
    (vitrines || []).map(v => ({
      url: `${BASE_URL}/vitrine/${v.id}`,
      lastModified: v.created_at
        ? new Date(v.created_at)
        : new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }))

  /*
   * PAGES VILLES SEO
   *
   * Exemple :
   *
   * /location-vacances/
   * provence-alpes-cote-dazur/
   * cannes
   */

  const villesMap = new Map<
    string,
    {
      regionSlug: string
      villeSlug: string
      lastModified: Date
    }
  >()

  for (const vitrine of vitrines || []) {

    if (!vitrine.ville || !vitrine.region) {
      continue
    }

    const regionSlug =
      getRegionSlug(vitrine.region)

    if (!regionSlug) {
      continue
    }

    const villeSlug =
      slugify(vitrine.ville)

    if (!villeSlug) {
      continue
    }

    const key =
      `${regionSlug}/${villeSlug}`

    const date = vitrine.created_at
      ? new Date(vitrine.created_at)
      : new Date()

    const existing =
      villesMap.get(key)

    /*
     * Si plusieurs logements existent
     * dans la même ville, on ne crée
     * qu'une seule URL.
     *
     * On conserve la date la plus récente.
     */

    if (
      !existing ||
      date.getTime() >
        existing.lastModified.getTime()
    ) {
      villesMap.set(key, {
        regionSlug,
        villeSlug,
        lastModified: date,
      })
    }
  }

  const villesPages: MetadataRoute.Sitemap =
    Array.from(villesMap.values()).map(ville => ({
      url:
        `${BASE_URL}/location-vacances/` +
        `${ville.regionSlug}/` +
        `${ville.villeSlug}`,

      lastModified: ville.lastModified,

      changeFrequency: 'weekly' as const,

      priority: 0.85,
    }))

  /*
   * PRESTATAIRES DYNAMIQUES
   */

  const { data: prestataires } = await supabase
    .from('prestataires')
    .select('id, created_at')
    .eq('statut', 'active')

  const prestatairesPages: MetadataRoute.Sitemap =
    (prestataires || []).map(p => ({
      url: `${BASE_URL}/prestataires/${p.id}`,
      lastModified: p.created_at
        ? new Date(p.created_at)
        : new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }))

  /*
   * SITEMAP FINAL
   */

  return [
    ...staticPages,
    ...regionsPages,
    ...villesPages,
    ...prestatairesRegionsPages,
    ...vitrinesPages,
    ...prestatairesPages,
  ]
}
