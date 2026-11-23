import type { Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'
import EspaceShell from '@/components/espace/EspaceShell'
import FormulaireLogement from '@/components/espace/FormulaireLogement'
import { depuisVitrine } from '@/lib/formulaire-logement'
import { getSessionUserId } from '@/lib/session'

export const dynamic = 'force-dynamic'
export const metadata: Metadata = { title: 'Modifier mon annonce', robots: { index: false, follow: false } }

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

export default async function ModifierLogementPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const userId = await getSessionUserId()
  if (!userId) redirect(`/connexion?redirect=/espace/ma-vitrine/${id}/modifier`)

  const { data: vitrine } = await supabase.from('vitrines').select('*').eq('id', id).eq('user_id', userId).maybeSingle()
  if (!vitrine) notFound()

  return (
    <EspaceShell titre="Modifier mon annonce" intro={vitrine.titre || undefined}>
      <FormulaireLogement id={id} initial={depuisVitrine(vitrine)} />
    </EspaceShell>
  )
}
