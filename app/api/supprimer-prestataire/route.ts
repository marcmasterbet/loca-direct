import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { getSessionUserId } from '@/lib/session'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: Request) {
  const userId = await getSessionUserId()
  if (!userId) return NextResponse.json({ error: 'Non connecté' }, { status: 401 })

  const { id } = await req.json()

  const { data: prestataire } = await supabase
    .from('prestataires')
    .select('user_id')
    .eq('id', id)
    .eq('user_id', userId)
    .single()

  if (!prestataire) return NextResponse.json({ error: 'Non autorisé' }, { status: 403 })

  await supabase.from('prestataires').delete().eq('id', id)

  return NextResponse.json({ success: true })
}