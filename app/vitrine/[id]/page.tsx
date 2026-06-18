import { cookies } from 'next/headers'
import { createClient } from '@supabase/supabase-js'
import VitrineClient from './VitrineClient'
import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export default async function VitrinePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const cookieStore = await cookies()
  const userId = cookieStore.get('loca_session')?.value

  if (!userId) {
    redirect(`/inscription?redirect=/vitrine/${id}`)
  }

  const { data: vitrine, error } = await supabase
    .from('vitrines')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !vitrine) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: '-apple-system, sans-serif', padding: 20 }}>
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize: 48, marginBottom: 16 }}>❌</p>
          <p style={{ fontSize: 16, fontWeight: 700, color: '#1F2937' }}>Cette annonce n'existe pas ou plus.</p>
        </div>
      </div>
    )
  }

  // Incrémente le compteur de vues (sans bloquer l'affichage)
  supabase
    .from('vitrines')
    .update({ nb_vues: (vitrine.nb_vues || 0) + 1 })
    .eq('id', id)
    .then(() => {})

  supabase
    .from('page_views_vitrines')
    .insert({ vitrine_id: id })
    .then(() => {})

  return <VitrineClient vitrine={vitrine} />
}