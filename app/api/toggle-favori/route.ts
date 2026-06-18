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

  const { vitrineId } = await req.json()

  const { data: existing } = await supabase
    .from('favoris')
    .select('id')
    .eq('user_id', userId)
    .eq('vitrine_id', vitrineId)
    .single()

  if (existing) {
    await supabase.from('favoris').delete().eq('id', existing.id)
    return NextResponse.json({ success: true, action: 'removed' })
  } else {
    await supabase.from('favoris').insert({ user_id: userId, vitrine_id: vitrineId })
    return NextResponse.json({ success: true, action: 'added' })
  }
}