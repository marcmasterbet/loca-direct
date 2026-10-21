import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { getSessionUserId, isAdmin } from '@/lib/session'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

// Utilisé par les pages de modification : réservé au propriétaire (ou à l'admin).
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')
    if (!id) return NextResponse.json({ error: 'ID manquant' }, { status: 400 })

    const [userId, admin] = await Promise.all([getSessionUserId(), isAdmin()])
    if (!userId && !admin) return NextResponse.json({ error: 'Non connecté' }, { status: 401 })

    let query = supabase.from('prestataires').select('*').eq('id', id)
    if (!admin) query = query.eq('user_id', userId!)
    const { data: prestataire, error } = await query.single()

    if (error || !prestataire) {
      return NextResponse.json({ error: 'Prestataire introuvable' }, { status: 404 })
    }

    return NextResponse.json({ prestataire })
  } catch (e) {
    console.error('Erreur get-prestataire:', e)
    return NextResponse.json({ error: 'Une erreur est survenue' }, { status: 500 })
  }
}
