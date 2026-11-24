import { createClient } from '@supabase/supabase-js'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { Suspense } from 'react'
import { getSessionUserId } from '@/lib/session'
import { MIN_PRESTATAIRES_INDEX, NOINDEX, SITE_URL, premierTitre } from '@/lib/seo'
import { REGIONS_METRO, REGIONS_SLUGS, slugifier, slugRegion } from '@/lib/france'
import { COLONNES_PUBLIQUES, METIERS, metierParSlug, type PrestatairePublic } from '@/lib/prestataires'
import SiteHeader from '@/components/site/SiteHeader'
import FilAriane from '@/components/pages/FilAriane'
import Faq from '@/components/pages/Faq'
import PrestatairesClient from '@/components/prestataires/PrestatairesClient'
import BandeauPros from '@/components/prestataires/BandeauPros'

export const dynamic = 'force-dynamic'

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

type Props = { params: Promise<{ activite: string; region: string }> }

export async function generateStaticParams() {
  return METIERS.flatMap(m => Object.keys(REGIONS_SLUGS).map(region => ({ activite: m.slug, region })))
}

/**
 * Le dernier segment est soit une région (/prestataires/conciergerie/occitanie),
 * soit une ville (/prestataires/conciergerie/bordeaux). Une ville n'existe que si
 * au moins un professionnel de ce métier y est inscrit.
 */
async function donnees(activite: string, slug: string) {
  const m = metierParSlug(activite)
  if (!m) return null
  const region = REGIONS_SLUGS[slug]
  if (region) {
    const { data } = await supabase
      .from('prestataires')
      .select(COLONNES_PUBLIQUES)
      .eq('statut', 'active')
      .eq('activite', m.nom)
      .eq('region', region)
      .order('created_at', { ascending: false })
    return { m, region, ville: null as string | null, liste: (data || []) as PrestatairePublic[] }
  }
  const { data } = await supabase
    .from('prestataires')
    .select(COLONNES_PUBLIQUES)
    .eq('statut', 'active')
    .eq('activite', m.nom)
    .order('created_at', { ascending: false })
  const liste = ((data || []) as PrestatairePublic[]).filter(p => p.ville && slugifier(p.ville) === slug)
  if (!liste.length) return null
  const ville = liste[0].ville!.trim()
  return { m, region: liste[0].region || '', ville, liste }
}

/** Le lieu tel qu'on l'écrit dans une phrase : « en Occitanie », « à Bordeaux » */
const dansLieu = (d: { region: string; ville: string | null }) => (d.ville ? `à ${d.ville}` : `en ${d.region}`)

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { activite, region } = await params
  const d = await donnees(activite, region)
  if (!d) return { title: 'Introuvable', robots: NOINDEX }
  const { m, liste } = d
  const lieu = d.ville ?? d.region
  // « conciergerie Airbnb {ville} » est la requête la plus tapée
  const titre = premierTitre(
    ...(m.slug === 'conciergerie' ? [`Conciergerie Airbnb ${dansLieu(d)} : location saisonnière`, `Conciergerie Airbnb ${dansLieu(d)}`] : []),
    ...(m.slug === 'menage' ? [`Ménage location saisonnière ${dansLieu(d)}`, `Ménage Airbnb ${dansLieu(d)}`] : []),
    `${m.court} location saisonnière ${lieu}`,
    `${m.court} ${dansLieu(d)}`,
    `${m.court} ${lieu}`
  )
  const description = `${liste.length} professionnel${liste.length > 1 ? 's' : ''} « ${m.court.toLowerCase()} » ${dansLieu(d)} pour votre location de vacances. Contact direct sur WhatsApp, sans intermédiaire ni commission.`
  return {
    title: { absolute: titre },
    description,
    alternates: { canonical: `${SITE_URL}/prestataires/${m.slug}/${region}` },
    ...(liste.length < MIN_PRESTATAIRES_INDEX ? { robots: NOINDEX } : {}),
    openGraph: { title: titre, description, url: `${SITE_URL}/prestataires/${m.slug}/${region}` },
  }
}

export default async function MetierRegionPage({ params }: Props) {
  const { activite, region: regionSlug } = await params
  const [d, isLoggedIn] = await Promise.all([donnees(activite, regionSlug), getSessionUserId().then(Boolean)])
  if (!d) notFound()
  const { m, region, ville, liste } = d
  const lieu = dansLieu(d)

  // Les villes de cette région où ce métier est présent (pages ville)
  const villes = ville
    ? []
    : Array.from(
        liste.reduce((acc, p) => {
          if (!p.ville?.trim()) return acc
          const s = slugifier(p.ville)
          const v = acc.get(s) ?? { nom: p.ville.trim(), nombre: 0 }
          acc.set(s, { ...v, nombre: v.nombre + 1 })
          return acc
        }, new Map<string, { nom: string; nombre: number }>())
      )
        .filter(([s]) => !REGIONS_SLUGS[s])
        .sort((a, b) => b[1].nombre - a[1].nombre)

  // Les autres régions où ce métier est présent
  const { data: tous } = await supabase.from('prestataires').select('region').eq('statut', 'active').eq('activite', m.nom)
  const autres = REGIONS_METRO.map(r => ({ ...r, nombre: (tous || []).filter(p => p.region === r.nom).length })).filter(
    r => r.nombre > 0 && r.slug !== regionSlug
  )

  return (
    <div className="bg-white text-ink">
      <SiteHeader isLoggedIn={isLoggedIn} current="prestataires" />
      <main id="contenu" className="mx-auto flex max-w-[1280px] flex-col gap-10 px-5 pb-20 sm:px-8">
        <FilAriane
          etapes={[
            { nom: 'Prestataires', href: '/prestataires' },
            { nom: m.court, href: `/prestataires/${m.slug}` },
            ...(ville
              ? [{ nom: region, href: `/prestataires/${m.slug}/${slugRegion(region) ?? ""}` }, { nom: ville }]
              : [{ nom: region }]),
          ]}
        />
        <header className="-mt-4 flex flex-col gap-4">
          <h1 className="text-balance text-[34px] font-bold leading-[1.08] tracking-[-0.04em] sm:text-5xl">
            {m.slug === 'conciergerie' && ville ? `Conciergerie Airbnb à ${ville}` : `${m.court} ${lieu}`}
          </h1>
          <p className="max-w-[68ch] text-lg leading-relaxed text-ink-soft">
            {liste.length
              ? `${liste.length} professionnel${liste.length > 1 ? 's' : ''} ${lieu} pour votre location saisonnière. ${m.intro}`
              : `Pas encore de professionnel « ${m.court.toLowerCase()} » inscrit ${lieu}. ${m.intro}`}
          </p>
        </header>

        {villes.length > 1 && (
          <nav aria-labelledby="villes" className="flex flex-col gap-3">
            <h2 id="villes" className="text-lg font-bold">
              {m.court} par ville en {region}
            </h2>
            <ul className="flex flex-wrap gap-2">
              {villes.map(([s, v]) => (
                <li key={s}>
                  <Link
                    href={`/prestataires/${m.slug}/${s}`}
                    className="flex min-h-[44px] items-center gap-1.5 rounded-full bg-surface px-4 text-sm font-semibold text-ink no-underline hover:bg-brand-soft hover:text-brand-strong"
                  >
                    {v.nom}
                    <span className="font-normal text-muted">{v.nombre}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}

        {liste.length > 0 ? (
          <Suspense>
            <PrestatairesClient prestataires={liste} chemin={`/prestataires/${m.slug}/${regionSlug}`} metierFixe regionFixe />
          </Suspense>
        ) : (
          <div className="flex flex-col items-start gap-3 rounded-[26px] bg-surface p-8 sm:p-10">
            <h2 className="text-xl font-bold">Aucun professionnel pour l’instant en {region}</h2>
            <p className="text-base text-ink-soft">Voyez les professionnels des autres régions, certains se déplacent.</p>
            <Link
              href={`/prestataires/${m.slug}`}
              className="mt-2 flex min-h-[48px] items-center rounded-[14px] bg-brand px-5 text-base font-bold text-white no-underline hover:bg-brand-strong"
            >
              Voir tous les professionnels « {m.court.toLowerCase()} »
            </Link>
          </div>
        )}

        <Faq
          titre={`${m.court} ${lieu} : vos questions`}
          questions={[
            {
              q: `Comment choisir un professionnel « ${m.court.toLowerCase()} » ${lieu} ?`,
              r: `${m.conseils.join(' ')}`,
            },
            {
              q: 'LocaDirect prend-il une commission ?',
              r: 'Non. Vous contactez le professionnel directement sur WhatsApp ou par téléphone et vous vous mettez d’accord avec lui.',
            },
          ]}
        />

        {autres.length > 0 && !ville && (
          <nav aria-labelledby="autres-regions" className="flex flex-col gap-3">
            <h2 id="autres-regions" className="text-lg font-bold">
              {m.court} dans les autres régions
            </h2>
            <ul className="flex flex-wrap gap-2">
              {autres.map(r => (
                <li key={r.slug}>
                  <Link
                    href={`/prestataires/${m.slug}/${r.slug}`}
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

        <BandeauPros
          href={isLoggedIn ? '/espace/devenir-prestataire' : '/rejoindre-annuaire'}
          titre={`Vous êtes « ${m.court.toLowerCase()} » ${lieu} ?`}
        />
      </main>
    </div>
  )
}
