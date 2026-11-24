import { createClient } from '@supabase/supabase-js'
import { NextResponse, type NextRequest } from 'next/server'

// Donne le numéro d'un prestataire, ou d'un propriétaire (son numéro WhatsApp, pour appeler
// ou écrire un SMS quand le voyageur n'a pas WhatsApp), seulement au clic sur « Afficher le numéro ».
// Le numéro n'est jamais écrit dans les pages, pour le protéger des robots.

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

export async function GET(request: NextRequest) {
  const entetes = { 'Cache-Control': 'no-store', 'X-Robots-Tag': 'noindex, nofollow' }
  const logement = request.nextUrl.searchParams.get('logement')
  if (logement) {
    const { data } = await supabase
      .from('vitrines')
      .select('whatsapp')
      .eq('id', logement)
      .in('statut', ['active', 'bientot_dispo'])
      .single()
    const numero = typeof data?.whatsapp === 'string' ? data.whatsapp.trim() : ''
    return NextResponse.json({ telephone: numero || null }, { status: numero ? 200 : 404, headers: entetes })
  }
  const id = request.nextUrl.searchParams.get('prestataire')
  if (!id) return NextResponse.json({ telephone: null }, { status: 400, headers: entetes })
  const { data } = await supabase
    .from('prestataires')
    .select('telephone')
    .eq('id', id)
    .eq('statut', 'active')
    .single()
  const telephone = typeof data?.telephone === 'string' ? data.telephone.trim() : ''
  return NextResponse.json({ telephone: telephone || null }, { status: telephone ? 200 : 404, headers: entetes })
}
