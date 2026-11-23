import { createClient } from '@supabase/supabase-js'
import type { Metadata } from 'next'
import { Suspense } from 'react'
import LogementsClient, { type Logement } from './LogementsClient'
import { getSessionUserId } from '@/lib/session'
import { SITE_URL, STATUTS_VISIBLES } from '@/lib/seo'
import SiteHeader from '@/components/site/SiteHeader'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: { absolute: 'Locations de vacances entre particuliers en France' },
  description:
    'Toutes les locations de vacances entre particuliers sur LocaDirect : maisons, appartements, gîtes. Sans commission, vous écrivez directement au propriétaire.',
  alternates: { canonical: `${SITE_URL}/logements` },
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export default async function LogementsPage() {
  const isLoggedIn = !!(await getSessionUserId())

  const { data } = await supabase
    .from('vitrines')
    .select('id, titre, ville, pays, region, type_logement, prix_nuit, capacite, nb_chambres, statut, photos, equipements, created_at')
    .in('statut', STATUTS_VISIBLES)
    .order('created_at', { ascending: false })

  // Le site présente la France : les annonces hors de France restent en ligne
  // à leur adresse, mais ne sont plus listées.
  const logements = ((data || []) as Logement[]).filter(v => !v.pays || v.pays === 'France')

  return (
    <div className="bg-white text-ink">
      <SiteHeader isLoggedIn={isLoggedIn} current="logements" />
      <Suspense>
        <LogementsClient logements={logements} />
      </Suspense>
    </div>
  )
}
