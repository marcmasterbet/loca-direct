import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { isAdmin } from '@/lib/session'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: Request) {
  if (!(await isAdmin())) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

  const { id } = await req.json()
  if (!id || typeof id !== 'string') return NextResponse.json({ error: 'ID manquant' }, { status: 400 })

  const { error } = await supabase.from('prestataires').delete().eq('id', id)
  if (error) {
    console.error('Erreur suppression admin prestataire:', error)
    return NextResponse.json({ error: 'Une erreur est survenue' }, { status: 500 })
  }
  return NextResponse.json({ success: true })
}
