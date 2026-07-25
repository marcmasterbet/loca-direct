import { MetadataRoute } from 'next'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const BASE_URL = 'https://www.loca-direct.fr'

const REGIONS_SLUGS = [
  'bretagne', 'nouvelle-aquitaine', 'occitanie', 'provence-alpes-cote-dazur',
  'auvergne-rhone-alpes', 'normandie', 'grand-est', 'pays-de-la-loire',
  'bourgogne-franche-comte', 'centre-val-de-loire', 'corse', 'hauts-de-france',
  'ile-de-france', 'guadeloupe', 'martinique', 'guyane', 'la-reunion', 'mayotte'
]

const ACTIVITES_SLUGS = [
  'conciergerie', 'menage', 'photographe', 'digital',
  'maintenance', 'jardinage', 'decoration', 'kits-accueil', 'autre'
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: `${BASE_URL}/logements`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${BASE_URL}/logements/chiens`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${BASE_URL}/prestataires`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${BASE_URL}/alternative-airbnb`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/inscription`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/connexion`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE_URL}/cgu`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE_URL}/mentions-legales`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE_URL}/politique-confidentialite`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE_URL}/cookies`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
  ]

  // Pages régions logements
  const regionsPages: MetadataRoute.Sitemap = REGIONS_SLUGS.map(slug => ({
    url: `${BASE_URL}/location-vacances/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  // Pages prestataires par activité + région (162 pages)
  const prestatairesRegionsPages: MetadataRoute.Sitemap = ACTIVITES_SLUGS.flatMap(activite =>
    REGIONS_SLUGS.map(region => ({
      url: `${BASE_URL}/prestataires/${activite}/${region}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }))
  )

  // Annonces dynamiques
  const { data: vitrines } = await supabase
    .from('vitrines')
    .select('id, created_at')
    .in('statut', ['active', 'deja_loue', 'bientot_dispo'])

  const vitrinesPages: MetadataRoute.Sitemap = (vitrines || []).map(v => ({
    url: `${BASE_URL}/vitrine/${v.id}`,
    lastModified: new Date(v.created_at),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  // Prestataires dynamiques
  const { data: prestataires } = await supabase
    .from('prestataires')
    .select('id, created_at')
    .eq('statut', 'active')

  const prestatairesPages: MetadataRoute.Sitemap = (prestataires || []).map(p => ({
    url: `${BASE_URL}/prestataires/${p.id}`,
    lastModified: new Date(p.created_at),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  return [
    ...staticPages,
    ...regionsPages,
    ...prestatairesRegionsPages,
    ...vitrinesPages,
    ...prestatairesPages,
  ]
}