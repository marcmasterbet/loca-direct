import { MetadataRoute } from 'next'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const BASE_URL = 'https://www.loca-direct.fr'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: `${BASE_URL}/prestataires`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${BASE_URL}/alternative-airbnb`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/inscription`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/connexion`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE_URL}/cgu`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE_URL}/mentions-legales`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE_URL}/politique-confidentialite`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE_URL}/cookies`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
  ]

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

  return [...staticPages, ...vitrinesPages, ...prestatairesPages]
}