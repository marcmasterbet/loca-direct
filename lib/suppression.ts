import { createClient } from '@supabase/supabase-js'

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

/**
 * Supprime une annonce et ce qui y est rattaché (visites comptées, favoris des voyageurs).
 * Sans ça, la base refuse la suppression dès que l'annonce a reçu une visite.
 */
export async function supprimerVitrine(id: string): Promise<{ error: unknown }> {
  for (const table of ['page_views_vitrines', 'favoris']) {
    const { error } = await supabase.from(table).delete().eq('vitrine_id', id)
    if (error) console.error(`Suppression ${table} :`, error)
  }
  const { error } = await supabase.from('vitrines').delete().eq('id', id)
  return { error }
}

/** Supprime une fiche prestataire et les favoris qui la visent. */
export async function supprimerPrestataire(id: string): Promise<{ error: unknown }> {
  const { error: e } = await supabase.from('favoris_prestataires').delete().eq('prestataire_id', id)
  if (e) console.error('Suppression favoris_prestataires :', e)
  const { error } = await supabase.from('prestataires').delete().eq('id', id)
  return { error }
}
