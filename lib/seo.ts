import { createClient } from '@supabase/supabase-js'

/**
 * Règles d'indexation Google (voir la stratégie SEO).
 * Une page ville ou région de logements n'est indexée qu'à partir de
 * MIN_ANNONCES_INDEX annonces ; en dessous elle reste visible pour les
 * visiteurs mais en « noindex, follow » et hors du sitemap.
 */
export const SITE_URL = 'https://www.loca-direct.fr'
export const MIN_ANNONCES_INDEX = 3
export const MIN_PRESTATAIRES_INDEX = 1

export const STATUTS_VISIBLES = ['active', 'deja_loue', 'bientot_dispo']

export const NOINDEX = { index: false, follow: true } as const

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

/** Nombre d'annonces visibles dans une région. */
export async function countVitrinesRegion(regionName: string): Promise<number> {
  const { count } = await supabase
    .from('vitrines')
    .select('id', { count: 'exact', head: true })
    .in('statut', STATUTS_VISIBLES)
    .eq('region', regionName)
  return count ?? 0
}

/** Nombre de prestataires actifs pour un métier dans une région. */
export async function countPrestatairesRegion(activite: string, regionName: string): Promise<number> {
  const { count } = await supabase
    .from('prestataires')
    .select('id', { count: 'exact', head: true })
    .eq('statut', 'active')
    .eq('activite', activite)
    .eq('region', regionName)
  return count ?? 0
}
