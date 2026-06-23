import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')
    if (!id) return NextResponse.json({ error: 'ID manquant' }, { status: 400 })

    const { data: prestataire, error } = await supabase
      .from('prestataires')
      .select('*')
      .eq('id', id)
      .single()

    if (error || !prestataire) {
      return NextResponse.json({ error: 'Prestataire introuvable' }, { status: 404 })
    }

    return NextResponse.json({ prestataire })
  } catch (e) {
    console.error('Erreur get-prestataire:', e)
    return NextResponse.json({ error: 'Une erreur est survenue' }, { status: 500 })
  }
}