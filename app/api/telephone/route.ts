import { createClient } from '@supabase/supabase-js'
import { NextResponse, type NextRequest } from 'next/server'

// Donne le numéro d'un prestataire seulement quand on clique sur « Afficher le numéro ».
// Le numéro n'est jamais écrit dans les pages, pour le protéger des robots.

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

export async function GET(request: NextRequest) {
  const id = request.nextUrl.searchParams.get('prestataire')
  const entetes = { 'Cache-Control': 'no-store', 'X-Robots-Tag': 'noindex, nofollow' }
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
