import { cookies } from 'next/headers'
import { createClient } from '@supabase/supabase-js'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import VitrineClient from './VitrineClient'

export const dynamic = 'force-dynamic'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

type Props = { params: Promise<{ id: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params

  const { data: vitrine } = await supabase
    .from('vitrines')
    .select('titre, ville, prix_nuit, description_courte, photos')
    .eq('id', id)
    .single()

  if (!vitrine) {
    return { title: 'Annonce introuvable' }
  }

  const title = `${vitrine.titre} — ${vitrine.ville}`
  const description =
    vitrine.description_courte ||
    `${vitrine.titre} à ${vitrine.ville}, à partir de ${vitrine.prix_nuit}€/nuit. Location directe sans commission sur LocaDirect.`

  return {
    title,
    description,
    openGraph: {
      title: `${title} | LocaDirect`,
      description,
      images: vitrine.photos?.[0] ? [vitrine.photos[0]] : undefined,
    },
  }
}

export default async function VitrinePage({ params }: Props) {
  const { id } = await params
  const cookieStore = await cookies()
  const isLoggedIn = !!cookieStore.get('loca_session')?.value

  const { data: vitrine, error } = await supabase
    .from('vitrines')
    .select('*')
    .eq('id', id)
    .in('statut', ['active', 'deja_loue', 'bientot_dispo'])
    .single()

  if (error || !vitrine) {
    notFound()
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

  return <VitrineClient vitrine={vitrine} isLoggedIn={isLoggedIn} />
}
