import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')

  if (!id) {
    return NextResponse.json({ error: 'ID manquant' }, { status: 400 })
  }

  const { data: vitrine, error } = await supabase
    .from('vitrines')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !vitrine) {
    return NextResponse.json({ error: 'Annonce introuvable' }, { status: 404 })
  }

  return NextResponse.json({ vitrine })
}