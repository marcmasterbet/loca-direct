import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { Suspense } from 'react'
import { getSessionUserId } from '@/lib/session'
import { MIN_ANNONCES_INDEX, NOINDEX, SITE_URL, premierTitre } from '@/lib/seo'
import { slugRegion, REGIONS_SLUGS, statistiques } from '@/lib/france'
import { DEPARTEMENTS, departementParSlug } from '@/lib/departements'
import { logementsDepartement } from '@/lib/pages-seo'
import SiteHeader from '@/components/site/SiteHeader'
import FilAriane from '@/components/pages/FilAriane'
import Faq from '@/components/pages/Faq'
import Chiffres from '@/components/pages/Chiffres'
import BandeauProprietaires from '@/components/pages/BandeauProprietaires'
import LogementsClient from '@/app/logements/LogementsClient'

export const dynamic = 'force-dynamic'

type Props = { params: Promise<{ departement: string }> }

function regionSlug(nom: string) {
  return slugRegion(nom) ?? Object.entries(REGIONS_SLUGS).find(([, n]) => n === nom)?.[0] ?? null
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { departement: slug } = await params
  const d = departementParSlug(slug)
  if (!d) return { title: 'Département introuvable' }

  const s = statistiques(await logementsDepartement(d))
  const titre = premierTitre(
    `Location vacances ${d.nom} (${d.code}) entre particuliers`,
    `Location vacances ${d.nom} (${d.code}) sans commission`,
    `Location vacances ${d.nom} (${d.code})`
  )
  const description =
    s.total > 0
      ? `${s.total} location${s.total > 1 ? 's' : ''} de vacances ${d.nom} (${d.code}) louée${s.total > 1 ? 's' : ''} par les propriétaires${s.prixMin ? `, dès ${s.prixMin} € la nuit` : ''}${s.chiens ? `, dont ${s.chiens} avec chien accepté` : ''}. Contact WhatsApp, sans commission.`
      : `Locations de vacances ${d.nom} (${d.code}) entre particuliers, sans commission. Contact direct avec le propriétaire sur WhatsApp.`
  const url = `${SITE_URL}/location-vacances/departement/${slug}`

  return {
    title: { absolute: titre },
    description,
    alternates: { canonical: url },
    ...(s.total < MIN_ANNONCES_INDEX ? { robots: NOINDEX } : {}),
    openGraph: { title: titre, description, url },
  }
}

export default async function DepartementPage({ params }: Props) {
  const { departement: slug } = await params
  const d = departementParSlug(slug)
  if (!d) notFound()

  const [isLoggedIn, logements] = await Promise.all([getSessionUserId().then(Boolean), logementsDepartement(d)])
  const s = statistiques(logements)
  const rSlug = regionSlug(d.region)
  const lienPublier = isLoggedIn ? '/espace/ma-vitrine' : '/publier'
  const voisins = DEPARTEMENTS.filter(x => x.region === d.region && x.code !== d.code)

  const questions = [
    {
      q: `Comment louer en direct dans le département ${d.nom} ?`,
      r: `Chaque annonce est publiée par le propriétaire lui-même. Vous lui écrivez sur WhatsApp depuis l’annonce, vous vous mettez d’accord sur les dates et le paiement, et LocaDirect ne prend aucune commission.`,
    },
    ...(s.prixMin
      ? [
          {
            q: `Combien coûte une location de vacances ${d.nom} ?`,
            r: `Sur LocaDirect, les logements ${d.nom} (${d.code}) démarrent à ${s.prixMin} € la nuit${s.prixMedian && s.total > 2 ? `, et la moitié coûte moins de ${s.prixMedian} € la nuit` : ''}. Le prix final se fixe directement avec le propriétaire, sans frais ajoutés.`,
          },
        ]
      : []),
    {
      q: `Peut-on venir avec son chien ?`,
      r: s.chiens
        ? `Oui : ${s.chiens} logement${s.chiens > 1 ? 's' : ''} ${d.nom} accepte${s.chiens > 1 ? 'nt' : ''} les chiens de plus de 10 kg. Présentez votre chien au propriétaire dans votre premier message.`
        : `Aucun logement du département n’indique encore accepter les grands chiens. Voyez les logements chien accepté de toute la région ${d.region}.`,
    },
  ]

  return (
    <div className="bg-white text-ink">
      <SiteHeader isLoggedIn={isLoggedIn} current="logements" />
      <main id="contenu" className="mx-auto flex max-w-[1280px] flex-col gap-10 px-5 pb-20 sm:px-8">
        <FilAriane
          etapes={[
            { nom: 'Logements', href: '/logements' },
            ...(rSlug ? [{ nom: d.region, href: `/location-vacances/${rSlug}` }] : []),
            { nom: `${d.nom} (${d.code})` },
          ]}
        />

        <header className="-mt-4 flex flex-col gap-5">
          <h1 className="text-balance text-[34px] font-bold leading-[1.08] tracking-[-0.04em] sm:text-5xl">
            Location de vacances : {d.nom} ({d.code})
          </h1>
          <p className="max-w-[68ch] text-lg leading-relaxed text-ink-soft">
            Maisons, gîtes et appartements de vacances {d.nom}, loués directement par leurs propriétaires. Vous leur
            écrivez sur WhatsApp, sans commission.
          </p>
          {s.total > 0 && (
            <Chiffres
              elements={[
                { valeur: String(s.total), label: s.total > 1 ? 'logements' : 'logement' },
                ...(s.prixMin ? [{ valeur: `${s.prixMin} €`, label: 'la nuit, au plus bas' }] : []),
                ...(s.chiens ? [{ valeur: String(s.chiens), label: 'avec chien accepté' }] : []),
              ]}
            />
          )}
        </header>

        {s.villes.length > 1 && rSlug && (
          <nav aria-labelledby="villes-titre" className="flex flex-col gap-3">
            <h2 id="villes-titre" className="text-lg font-bold">
              Par ville
            </h2>
            <ul className="flex flex-wrap gap-2">
              {s.villes.map(v => (
                <li key={v.slug}>
                  <Link
                    href={`/location-vacances/${rSlug}/${v.slug}`}
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

        {s.total > 0 ? (
          <Suspense>
            <LogementsClient logements={logements} chemin={`/location-vacances/departement/${slug}`} regionFixe />
          </Suspense>
        ) : (
          <div className="flex flex-col items-start gap-3 rounded-[26px] bg-surface p-8 sm:p-10">
            <h2 className="text-xl font-bold">Pas encore de logement {d.nom}</h2>
            <p className="text-base text-ink-soft">Voyez les logements de toute la région {d.region}.</p>
            <div className="mt-2 flex flex-wrap gap-3">
              <Link
                href={rSlug ? `/location-vacances/${rSlug}` : '/logements'}
                className="flex min-h-[48px] items-center rounded-[14px] bg-brand px-5 text-base font-bold text-white no-underline hover:bg-brand-strong"
              >
                Voir la région {d.region}
              </Link>
              <Link
                href={lienPublier}
                className="flex min-h-[48px] items-center rounded-[14px] px-5 text-base font-bold text-ink no-underline shadow-[inset_0_0_0_1.5px_#e4e3ee] hover:shadow-[inset_0_0_0_1.5px_#17162a]"
              >
                Publier un logement
              </Link>
            </div>
          </div>
        )}

        {s.chiens > 0 && rSlug && (
          <Link
            href={`/logements/chiens/${rSlug}`}
            className="flex min-h-[48px] items-center self-start rounded-[14px] bg-dog px-5 text-base font-bold text-ink no-underline"
          >
            Logements avec chien en {d.region}
          </Link>
        )}

        <Faq titre={`Location de vacances ${d.nom} : vos questions`} questions={questions} />

        {voisins.length > 0 && (
          <nav aria-labelledby="voisins-titre" className="flex flex-col gap-3">
            <h2 id="voisins-titre" className="text-lg font-bold">
              Autres départements de la région
            </h2>
            <ul className="flex flex-wrap gap-2">
              {voisins.map(x => (
                <li key={x.code}>
                  <Link
                    href={`/location-vacances/departement/${x.slug}`}
                    className="flex min-h-[44px] items-center rounded-full bg-surface px-4 text-sm font-semibold text-ink no-underline hover:bg-brand-soft hover:text-brand-strong"
                  >
                    {x.nom} ({x.code})
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}

        <BandeauProprietaires
          href={lienPublier}
          titre={`Vous avez un logement ${d.nom} ?`}
          texte="Publiez votre annonce gratuitement. Les voyageurs vous écrivent directement sur WhatsApp et vous gardez 100 % de vos loyers."
        />
      </main>
    </div>
  )
}
