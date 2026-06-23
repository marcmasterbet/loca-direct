import { createClient } from '@supabase/supabase-js'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import PrestataireDetailClient from './PrestataireDetailClient'

export const dynamic = 'force-dynamic'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

type Props = { params: Promise<{ id: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params

  const { data: p } = await supabase
    .from('prestataires')
    .select('nom, prenom, activite, ville, description, flyer_url')
    .eq('id', id)
    .single()

  if (!p) {
    return { title: 'Prestataire introuvable' }
  }

  const title = `${p.activite} — ${p.prenom} ${p.nom} à ${p.ville}`
  const description =
    p.description ||
    `${p.activite} à ${p.ville}. Contactez ${p.prenom} ${p.nom} directement via l'annuaire des prestataires LocaDirect.`

  return {
    title,
    description,
    openGraph: {
      title: `${title} | LocaDirect`,
      description,
      images: p.flyer_url ? [p.flyer_url] : undefined,
    },
  }
}

export default async function PrestataireDetailPage({ params }: Props) {
  const { id } = await params

  const { data: p } = await supabase
    .from('prestataires')
    .select('*')
    .eq('id', id)
    .eq('statut', 'active')
    .single()

  if (!p) notFound()

  await supabase
    .from('prestataires')
    .update({ nb_vues: (p.nb_vues || 0) + 1 })
    .eq('id', id)

  return <PrestataireDetailClient prestataire={p} />
}
