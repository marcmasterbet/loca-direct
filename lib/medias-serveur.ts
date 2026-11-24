import { lireVideo, lireVisite3d } from './medias'

/** Champs vidéo / visite 3D à enregistrer, seulement s'ils sont envoyés par le formulaire */
export function champsMedias(data: Record<string, unknown>): Record<string, string | null> {
  const out: Record<string, string | null> = {}
  if ('video_url' in data) out.video_url = lireVideo(String(data.video_url || '')) ? String(data.video_url).trim() : null
  if ('visite_3d_url' in data) out.visite_3d_url = lireVisite3d(String(data.visite_3d_url || '')) ? String(data.visite_3d_url).trim() : null
  return out
}

/** Vrai si l'erreur Supabase signale une colonne absente (migration pas encore passée) */
export function colonneAbsente(error: { code?: string; message?: string } | null): boolean {
  if (!error) return false
  return error.code === '42703' || error.code === 'PGRST204' || /column .* does not exist|Could not find the .* column/i.test(error.message || '')
}
