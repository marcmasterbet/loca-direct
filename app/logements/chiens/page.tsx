import { createClient } from '@supabase/supabase-js'
import type { Metadata } from 'next'
import Link from 'next/link'
import { Suspense } from 'react'
import { getSessionUserId } from '@/lib/session'
import { SITE_URL, STATUTS_VISIBLES } from '@/lib/seo'
import { REGIONS_METRO, statistiques } from '@/lib/france'
import SiteHeader from '@/components/site/SiteHeader'
import FilAriane from '@/components/pages/FilAriane'
import Faq from '@/components/pages/Faq'
import Chiffres from '@/components/pages/Chiffres'
import BandeauProprietaires from '@/components/pages/BandeauProprietaires'
import LogementsClient, { type Logement } from '@/app/logements/LogementsClient'

export const dynamic = 'force-dynamic'

const TITRE = 'Location vacances avec chien : logements chien accepté'
const DESCRIPTION =
  'Maisons, gîtes et appartements de vacances où votre chien est le bienvenu, même s’il fait plus de 10 kg. Loués par les propriétaires, sans commission.'

export const metadata: Metadata = {
  title: { absolute: TITRE },
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/logements/chiens` },
  openGraph: { title: TITRE, description: DESCRIPTION, url: `${SITE_URL}/logements/chiens` },
}

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

export default async function ChiensPage() {
  const isLoggedIn = !!(await getSessionUserId())

  const { data } = await supabase
    .from('vitrines')
    .select('id, titre, ville, pays, region, type_logement, prix_nuit, capacite, nb_chambres, statut, photos, equipements, created_at')
    .in('statut', STATUTS_VISIBLES)
    .filter('equipements', 'cs', '["chien_10kg"]')
    .order('created_at', { ascending: false })

  const logements = ((data || []) as Logement[]).filter(v => !v.pays || v.pays === 'France')
  const s = statistiques(logements)
  const parRegion = REGIONS_METRO.map(r => ({ ...r, nombre: logements.filter(v => v.region === r.nom).length })).filter(
    r => r.nombre > 0
  )

  const questions = [
    {
      q: 'Les grands chiens sont-ils acceptés dans ces logements ?',
      r: 'Oui. Tous les logements de cette page acceptent les chiens de plus de 10 kg : c’est le propriétaire qui l’indique dans son annonce. Précisez tout de même la race, la taille et l’âge de votre chien dans votre premier message.',
    },
    {
      q: 'Faut-il payer un supplément pour le chien ?',
      r: 'Cela dépend du propriétaire : certains ne demandent rien, d’autres un petit forfait ménage ou une caution un peu plus élevée. Comme vous lui écrivez directement, vous le savez avant de réserver.',
    },
    {
      q: 'Quels documents emporter pour son chien en vacances ?',
      r: 'Son carnet de santé ou son passeport européen avec les vaccins à jour, sa puce d’identification bien enregistrée, et son médicament habituel s’il en prend un. Pour les chiens de 1re et 2e catégorie, le permis de détention est obligatoire.',
    },
    {
      q: 'Où trouver une plage qui accepte les chiens ?',
      r: 'Chaque commune fixe ses propres règles, souvent plus strictes l’été. Le plus simple est de demander au propriétaire, qui connaît les plages et les sentiers autorisés autour de chez lui.',
    },
  ]

  return (
    <div className="bg-white text-ink">
      <SiteHeader isLoggedIn={isLoggedIn} current="chiens" />
      <main id="contenu" className="flex flex-col gap-10 pb-20">
        <div className="bg-dog">
          <div className="mx-auto flex max-w-[1280px] flex-col gap-5 px-5 pb-12 sm:px-8">
            <FilAriane etapes={[{ nom: 'Logements', href: '/logements' }, { nom: 'Chien accepté' }]} />
            <h1 className="text-balance text-[34px] font-bold leading-[1.08] tracking-[-0.04em] sm:text-5xl">
              Location de vacances avec chien
            </h1>
            <p className="max-w-[68ch] text-lg leading-relaxed text-ink-soft">
              Ici, chaque logement accepte les chiens, même ceux de plus de 10 kg. Pas de mauvaise surprise à l’arrivée :
              vous écrivez au propriétaire, vous lui présentez votre compagnon et vous partez tranquille.
            </p>
            <Chiffres
              elements={[
                { valeur: String(s.total), label: s.total > 1 ? 'logements' : 'logement' },
                ...(s.prixMin ? [{ valeur: `${s.prixMin} €`, label: 'la nuit, au plus bas' }] : []),
                { valeur: String(parRegion.length), label: parRegion.length > 1 ? 'régions' : 'région' },
              ]}
            />
          </div>
        </div>

        <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-10 px-5 sm:px-8">
          {parRegion.length > 1 && (
            <nav aria-labelledby="regions-chien" className="flex flex-col gap-3">
              <h2 id="regions-chien" className="text-lg font-bold">
                Par région
              </h2>
              <ul className="flex flex-wrap gap-2">
                {parRegion.map(r => (
                  <li key={r.slug}>
                    <Link
                      href={`/location-vacances/${r.slug}?chien=1`}
                      className="flex min-h-[44px] items-center gap-1.5 rounded-full bg-surface px-4 text-sm font-semibold text-ink no-underline hover:bg-brand-soft hover:text-brand-strong"
                    >
                      {r.nom}
                      <span className="font-normal text-muted">{r.nombre}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          )}

          <Suspense>
            <LogementsClient logements={logements} chemin="/logements/chiens" chienFixe />
          </Suspense>

          <section aria-labelledby="guide-chien" className="grid gap-6 rounded-[28px] bg-dog-soft p-8 sm:p-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
            <div className="flex flex-col gap-2">
              <h2 id="guide-chien" className="text-balance text-2xl font-bold tracking-[-0.02em]">
                Préparer ses vacances avec un grand chien
              </h2>
              <p className="max-w-[68ch] text-base leading-relaxed text-ink-soft">
                Transport, règles des parcs nationaux et des plages, chaleur, chenilles processionnaires : notre guide
                rassemble tout ce qu’il faut savoir avant de partir.
              </p>
            </div>
            <Link
              href="/blog/vacances-grand-chien-france"
              className="flex min-h-[48px] items-center self-start rounded-[14px] bg-ink px-5 text-base font-bold text-white no-underline hover:bg-black"
            >
              Lire le guide
            </Link>
          </section>

          <Faq titre="Partir en vacances avec son chien : vos questions" questions={questions} />

          <BandeauProprietaires
            href={isLoggedIn ? '/espace/ma-vitrine' : '/publier'}
            titre="Vous acceptez les chiens dans votre logement ?"
            texte="Beaucoup de voyageurs cherchent un logement où leur chien est le bienvenu. Publiez votre annonce gratuitement et cochez « Chiens de plus de 10 kg acceptés » pour apparaître ici."
          />
        </div>
      </main>
    </div>
  )
}
