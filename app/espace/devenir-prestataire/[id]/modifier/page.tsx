import type { Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'
import EspaceShell from '@/components/espace/EspaceShell'
import FormulairePrestataire, { PRESTATAIRE_VIDE } from '@/components/espace/FormulairePrestataire'
import { getSessionUserId } from '@/lib/session'

export const dynamic = 'force-dynamic'
export const metadata: Metadata = { title: 'Modifier ma fiche', robots: { index: false, follow: false } }

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

const t = (v: unknown) => (v === null || v === undefined ? '' : String(v))

export default async function ModifierFichePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const userId = await getSessionUserId()
  if (!userId) redirect(`/connexion?redirect=/espace/devenir-prestataire/${id}/modifier`)

  const { data: p } = await supabase.from('prestataires').select('*').eq('id', id).eq('user_id', userId).maybeSingle()
  if (!p) notFound()

  const initial = {
    ...PRESTATAIRE_VIDE,
    nom: t(p.nom),
    prenom: t(p.prenom),
    siret: t(p.siret),
    adresse_siege: t(p.adresse_siege),
    ville: t(p.ville),
    code_postal: t(p.code_postal),
    activite: t(p.activite) || 'Conciergerie',
    description: t(p.description),
    telephone: t(p.telephone),
    whatsapp: t(p.whatsapp),
    site_web: t(p.site_web),
    tarif_horaire: t(p.tarif_horaire),
    sur_devis: !!p.sur_devis,
    flyer_url: t(p.flyer_url),
    photos: Array.isArray(p.photos) ? p.photos : [],
  }

  return (
    <EspaceShell titre="Modifier ma fiche" intro={[p.prenom, p.nom].filter(Boolean).join(' ') || undefined}>
      <FormulairePrestataire id={id} initial={initial} />
    </EspaceShell>
  )
}
