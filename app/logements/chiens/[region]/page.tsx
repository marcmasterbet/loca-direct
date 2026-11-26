import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { Suspense } from 'react'
import { getSessionUserId } from '@/lib/session'
import { MIN_ANNONCES_INDEX, NOINDEX, SITE_URL, premierTitre } from '@/lib/seo'
import { REGIONS_METRO, REGIONS_SLUGS, statistiques } from '@/lib/france'
import { CONTENU_REGIONS } from '@/lib/regions-contenu'
import { logementsChienRegion } from '@/lib/pages-seo'
import SiteHeader from '@/components/site/SiteHeader'
import FilAriane from '@/components/pages/FilAriane'
import Faq from '@/components/pages/Faq'
import Chiffres from '@/components/pages/Chiffres'
import BandeauProprietaires from '@/components/pages/BandeauProprietaires'
import LogementsClient from '@/app/logements/LogementsClient'

export const dynamic = 'force-dynamic'

type Props = { params: Promise<{ region: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { region: slug } = await params
  const nom = REGIONS_SLUGS[slug]
  if (!nom) return { title: 'Région introuvable' }

  const s = statistiques(await logementsChienRegion(nom))
  const titre = premierTitre(
    `Location vacances avec chien en ${nom} | LocaDirect`,
    `Location vacances avec chien en ${nom}`,
    `Location avec chien en ${nom}`
  )
  const description =
    s.total > 0
      ? `${s.total} location${s.total > 1 ? 's' : ''} de vacances en ${nom} où votre chien est accepté, même de plus de 10 kg${s.prixMin ? `, dès ${s.prixMin} € la nuit` : ''}. Contact direct avec le propriétaire, sans commission.`
      : `Locations de vacances en ${nom} où les chiens sont acceptés, même de plus de 10 kg. Contact direct avec le propriétaire, sans commission.`
  const url = `${SITE_URL}/logements/chiens/${slug}`

  return {
    title: { absolute: titre },
    description,
    alternates: { canonical: url },
    ...(s.total < MIN_ANNONCES_INDEX ? { robots: NOINDEX } : {}),
    openGraph: { title: titre, description, url },
  }
}

export default async function ChiensRegionPage({ params }: Props) {
  const { region: slug } = await params
  const nom = REGIONS_SLUGS[slug]
  if (!nom) notFound()

  const [isLoggedIn, logements] = await Promise.all([getSessionUserId().then(Boolean), logementsChienRegion(nom)])
  const s = statistiques(logements)
  const contenu = CONTENU_REGIONS[slug]
  const voisines = (contenu?.voisines || []).map(v => REGIONS_METRO.find(r => r.slug === v)).filter(Boolean) as typeof REGIONS_METRO
  const lienPublier = isLoggedIn ? '/espace/ma-vitrine' : '/publier'

  const questions = [
    {
      q: `Les grands chiens sont-ils acceptés dans ces logements en ${nom} ?`,
      r: 'Oui. Tous les logements de cette page acceptent les chiens de plus de 10 kg : c’est le propriétaire qui l’indique dans son annonce. Précisez la race, la taille et l’âge de votre chien dans votre premier message.',
    },
    ...(contenu?.chien ? [{ q: `Où se promener avec son chien en ${nom} ?`, r: contenu.chien }] : []),
    {
      q: 'Faut-il payer un supplément pour le chien ?',
      r: 'Cela dépend du propriétaire : certains ne demandent rien, d’autres un petit forfait ménage ou une caution un peu plus élevée. Comme vous lui écrivez directement, vous le savez avant de réserver.',
    },
  ]

  return (
    <div className="bg-white text-ink">
      <SiteHeader isLoggedIn={isLoggedIn} current="chiens" />
      <main id="contenu" className="flex flex-col gap-10 pb-20">
        <div className="bg-dog">
          <div className="mx-auto flex max-w-[1280px] flex-col gap-5 px-5 pb-12 sm:px-8">
            <FilAriane
              etapes={[
                { nom: 'Logements', href: '/logements' },
                { nom: 'Chien accepté', href: '/logements/chiens' },
                { nom },
              ]}
            />
            <h1 className="text-balance text-[34px] font-bold leading-[1.08] tracking-[-0.04em] sm:text-5xl">
              Location de vacances avec chien en {nom}
            </h1>
            <p className="max-w-[68ch] text-lg leading-relaxed text-ink-soft">
              Chaque logement de cette page accepte les chiens, même ceux de plus de 10 kg. Vous écrivez au propriétaire,
              vous lui présentez votre compagnon et vous partez tranquille.
            </p>
            {s.total > 0 && (
              <Chiffres
                elements={[
                  { valeur: String(s.total), label: s.total > 1 ? 'logements' : 'logement' },
                  ...(s.prixMin ? [{ valeur: `${s.prixMin} €`, label: 'la nuit, au plus bas' }] : []),
                ]}
              />
            )}
          </div>
        </div>

        <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-10 px-5 sm:px-8">
          {s.total > 0 ? (
            <Suspense>
              <LogementsClient logements={logements} chemin={`/logements/chiens/${slug}`} regionFixe chienFixe />
            </Suspense>
          ) : (
            <div className="flex flex-col items-start gap-3 rounded-[26px] bg-surface p-8 sm:p-10">
              <h2 className="text-xl font-bold">Pas encore de logement avec chien en {nom}</h2>
              <p className="text-base text-ink-soft">Voyez tous les logements chien accepté en France.</p>
              <Link
                href="/logements/chiens"
                className="mt-2 flex min-h-[48px] items-center rounded-[14px] bg-brand px-5 text-base font-bold text-white no-underline hover:bg-brand-strong"
              >
                Voir les logements avec chien
              </Link>
            </div>
          )}

          <Link
            href={`/location-vacances/${slug}`}
            className="flex min-h-[44px] items-center self-start text-base font-bold text-ink"
          >
            Tous les logements en {nom}
          </Link>

          <Faq titre={`Vacances avec son chien en ${nom} : vos questions`} questions={questions} />

          {voisines.length > 0 && (
            <nav aria-labelledby="voisines-titre" className="flex flex-col gap-3">
              <h2 id="voisines-titre" className="text-lg font-bold">
                Régions voisines
              </h2>
              <ul className="flex flex-wrap gap-2">
                {voisines.map(r => (
                  <li key={r.slug}>
                    <Link
                      href={`/logements/chiens/${r.slug}`}
                      className="flex min-h-[44px] items-center rounded-full bg-surface px-4 text-sm font-semibold text-ink no-underline hover:bg-brand-soft hover:text-brand-strong"
                    >
                      Avec chien en {r.nom}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          )}

          <BandeauProprietaires
            href={lienPublier}
            titre={`Votre logement en ${nom} accepte les chiens ?`}
            texte="Publiez votre annonce gratuitement et cochez « Chien accepté » : elle apparaîtra sur cette page, très recherchée."
          />
        </div>
      </main>
    </div>
  )
}
