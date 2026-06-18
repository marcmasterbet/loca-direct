import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: Request) {
  const cookieStore = await cookies()
  const isAdmin = cookieStore.get('admin_session')?.value
  if (!isAdmin) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

  const { id, statut, motif_refus } = await req.json()

  const updateData: any = { statut, updated_at: new Date().toISOString() }
  if (motif_refus) updateData.motif_refus = motif_refus

  const { error } = await supabase
    .from('vitrines')
    .update(updateData)
    .eq('id', id)

  if (error) {
    console.error('Erreur update vitrine:', error)
    return NextResponse.json({ error: 'Erreur' }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}