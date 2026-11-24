import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { getSessionUserId, isAdmin } from '@/lib/session'
import { BUCKET_VIDEOS, TAILLE_MAX_VIDEO, TYPES_VIDEO } from '@/lib/medias'

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

/**
 * Donne une adresse d'envoi à usage unique : le navigateur envoie la vidéo directement
 * au stockage Supabase (une vidéo dépasse la taille qu'accepte le serveur du site).
 */
export async function POST(req: Request) {
  try {
    const userId = (await getSessionUserId()) ?? ((await isAdmin()) ? 'admin' : null)
    if (!userId) return NextResponse.json({ error: 'Non connecté' }, { status: 401 })

    const { type, taille } = (await req.json()) as { type?: string; taille?: number }
    const ext = type ? TYPES_VIDEO[type] : undefined
    if (!ext) return NextResponse.json({ error: 'Format non pris en charge (MP4, MOV ou WEBM)' }, { status: 400 })
    if (!taille || taille > TAILLE_MAX_VIDEO) {
      return NextResponse.json({ error: 'Vidéo trop lourde (100 Mo maximum)' }, { status: 400 })
    }

    const chemin = `${userId}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
    const { data, error } = await supabase.storage.from(BUCKET_VIDEOS).createSignedUploadUrl(chemin)
    if (error || !data) {
      console.error('Erreur URL envoi vidéo:', error)
      return NextResponse.json({ error: 'L’envoi de vidéos n’est pas encore disponible' }, { status: 503 })
    }
    const { data: pub } = supabase.storage.from(BUCKET_VIDEOS).getPublicUrl(chemin)
    return NextResponse.json({ envoi: data.signedUrl, url: pub.publicUrl })
  } catch (e) {
    console.error('Erreur upload-video:', e)
    return NextResponse.json({ error: 'Une erreur est survenue' }, { status: 500 })
  }
}
