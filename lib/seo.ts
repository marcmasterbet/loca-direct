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

/**
 * Titre pour Google : 60 caractères au plus, coupé proprement entre deux mots.
 * Le nom du site n'est ajouté que s'il reste la place (Google l'affiche déjà au-dessus).
 */
export function titreGoogle(texte: string, max = 60): string {
  const propre = texte.replace(/\s+/g, ' ').trim()
  const avecMarque = `${propre} | LocaDirect`
  if (avecMarque.length <= max) return avecMarque
  if (propre.length <= max) return propre
  const coupe = propre.slice(0, max + 1)
  const dernierEspace = coupe.lastIndexOf(' ')
  return sansPetitMotFinal(coupe.slice(0, dernierEspace > max / 2 ? dernierEspace : max))
}

const PETITS_MOTS = /\s+(à|a|au|aux|de|du|des|d'|la|le|les|l'|en|et|avec|pour|sur|un|une)$/i

function sansPetitMotFinal(t: string): string {
  let r = t.replace(/[\s,;:–-]+$/, '')
  while (PETITS_MOTS.test(r)) r = r.replace(PETITS_MOTS, '').replace(/[\s,;:–-]+$/, '')
  return r
}

/** Titre Google d'une annonce : le nom de la ville est toujours gardé en entier. */
export function titreAnnonce(titre: string, ville: string | null, max = 60): string {
  const propre = titre.replace(/\s+/g, ' ').trim()
  if (!ville) return titreGoogle(propre, max)
  const fin = ` à ${ville.trim()}`
  const complet = `${propre}${fin}`
  if (`${complet} | LocaDirect`.length <= max) return `${complet} | LocaDirect`
  if (complet.length <= max) return complet
  const place = max - fin.length
  if (place < 15) return titreGoogle(complet, max)
  return `${titreGoogle(propre, place).replace(/ \| LocaDirect$/, '')}${fin}`
}
