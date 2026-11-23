import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'
import EspaceClient, { type Onglet } from './EspaceClient'
import { getSessionUserId, publicUser } from '@/lib/session'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Mon espace',
  robots: { index: false, follow: false },
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const ONGLETS: Onglet[] = ['annonces', 'favoris', 'compte']

/** Anciens noms d'onglets (liens dans les e-mails et favoris des navigateurs) */
const ANCIENS: Record<string, Onglet> = {
  'mes-annonces': 'annonces',
  publier: 'annonces',
  profil: 'compte',
}

export default async function EspacePage({ searchParams }: { searchParams: Promise<{ tab?: string }> }) {
  const userId = await getSessionUserId()
  if (!userId) redirect('/connexion?redirect=/espace')

  const { tab } = await searchParams
  // L'ancien onglet « Rechercher » est remplacé par la page des logements
  if (tab === 'rechercher') redirect('/logements')

  const { data: user } = await supabase.from('directloca_users').select('*').eq('id', userId).single()
  if (!user) redirect('/connexion?redirect=/espace')

  const [{ data: vitrines }, { data: prestataires }, { data: favoris }, { data: favorisPrestataires }, { data: alertes }] =
    await Promise.all([
      supabase.from('vitrines').select('*').eq('user_id', userId).order('created_at', { ascending: false }),
      supabase.from('prestataires').select('*').eq('user_id', userId).order('created_at', { ascending: false }),
      supabase.from('favoris').select('*, vitrines(*)').eq('user_id', userId).order('created_at', { ascending: false }),
      supabase
        .from('favoris_prestataires')
        .select('*, prestataires(*)')
        .eq('user_id', userId)
        .order('created_at', { ascending: false }),
      supabase.from('alertes').select('*').eq('user_id', userId).order('created_at', { ascending: false }),
    ])

  const demande = tab ? (ANCIENS[tab] ?? (ONGLETS as string[]).find(o => o === tab)) : undefined
  // Un compte voyageur sans annonce arrive directement sur ses favoris
  const sansAnnonce = !vitrines?.length && !prestataires?.length
  const onglet: Onglet =
    (demande as Onglet | undefined) ?? (sansAnnonce && (favoris?.length || alertes?.length) ? 'favoris' : 'annonces')

  return (
    <EspaceClient
      ongletInitial={onglet}
      user={publicUser(user)}
      vitrines={vitrines || []}
      prestataires={prestataires || []}
      favoris={favoris || []}
      favorisPrestataires={favorisPrestataires || []}
      alertes={alertes || []}
    />
  )
}
