import { createClient } from '@supabase/supabase-js'
import type { Metadata } from 'next'
import { Suspense } from 'react'
import LogementsClient, { type Logement } from './LogementsClient'
import { getSessionUserId } from '@/lib/session'
import { SITE_URL, STATUTS_VISIBLES } from '@/lib/seo'
import Link from 'next/link'
import SiteHeader from '@/components/site/SiteHeader'
import FilAriane from '@/components/pages/FilAriane'
import BandeauProprietaires from '@/components/pages/BandeauProprietaires'
import { REGIONS_METRO } from '@/lib/france'

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
      <main id="contenu" className="mx-auto flex max-w-[1280px] flex-col gap-10 px-5 pb-20 sm:px-8">
        <FilAriane etapes={[{ nom: 'Logements' }]} />
        <header className="-mt-4 flex flex-col gap-3">
          <h1 className="text-balance text-[34px] font-bold leading-[1.08] tracking-[-0.04em] sm:text-5xl">
            Locations de vacances en France
          </h1>
          <p className="max-w-[640px] text-lg leading-relaxed text-ink-soft">
            {logements.length} maisons et appartements loués par leurs propriétaires. Vous leur écrivez directement,
            sans commission.
          </p>
        </header>

        <Suspense>
          <LogementsClient logements={logements} />
        </Suspense>

        {/* Liens vers les pages région, utiles aux visiteurs et à Google */}
        <nav aria-labelledby="regions-titre" className="flex flex-col gap-4 border-t border-line pt-10">
          <h2 id="regions-titre" className="text-balance text-2xl font-bold tracking-[-0.02em]">
            Locations de vacances par région
          </h2>
          <ul className="flex flex-wrap gap-2">
            {REGIONS_METRO.map(r => (
              <li key={r.slug}>
                <Link
                  href={`/location-vacances/${r.slug}`}
                  className="flex min-h-[44px] items-center rounded-full bg-surface px-4 text-sm font-semibold text-ink no-underline hover:bg-brand-soft hover:text-brand-strong"
                >
                  Location de vacances en {r.nom}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <BandeauProprietaires
          href={isLoggedIn ? '/espace/ma-vitrine' : '/inscription'}
          titre="Vous louez un logement de vacances ?"
          texte="Publiez votre annonce gratuitement. Les voyageurs vous écrivent directement sur WhatsApp et vous gardez 100 % de vos loyers."
        />
      </main>
    </div>
  )
}
