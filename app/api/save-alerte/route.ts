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

  const { ville } = await req.json()
  if (!ville) return NextResponse.json({ error: 'Ville requise' }, { status: 400 })

  await supabase.from('alertes').insert({ user_id: userId, ville })
  return NextResponse.json({ success: true })
}

export async function DELETE(req: Request) {
  const cookieStore = await cookies()
  const userId = cookieStore.get('loca_session')?.value
  if (!userId) return NextResponse.json({ error: 'Non connecté' }, { status: 401 })

  const { id } = await req.json()
  await supabase.from('alertes').delete().eq('id', id).eq('user_id', userId)
  return NextResponse.json({ success: true })
}