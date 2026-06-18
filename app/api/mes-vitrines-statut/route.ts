import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: Request) {
  const cookieStore = await cookies()
  const userId = cookieStore.get('loca_session')?.value
  if (!userId) return NextResponse.json({ error: 'Non connecté' }, { status: 401 })

  const { id, statut } = await req.json()

  if (!['active', 'deja_loue'].includes(statut)) {
    return NextResponse.json({ error: 'Statut non autorisé' }, { status: 400 })
  }

  // Vérifie que la vitrine appartient bien à cet utilisateur
  const { data: vitrine } = await supabase
    .from('vitrines')
    .select('user_id')
    .eq('id', id)
    .single()

  if (!vitrine || vitrine.user_id !== userId) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 403 })
  }

  await supabase
    .from('vitrines')
    .update({ statut, updated_at: new Date().toISOString() })
    .eq('id', id)

  return NextResponse.json({ success: true })
}