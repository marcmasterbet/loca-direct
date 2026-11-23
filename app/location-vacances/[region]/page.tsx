import { createClient } from '@supabase/supabase-js'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { Suspense } from 'react'
import { getSessionUserId } from '@/lib/session'
import { MIN_ANNONCES_INDEX, NOINDEX, SITE_URL, STATUTS_VISIBLES, premierTitre } from '@/lib/seo'
import { REGIONS_METRO, REGIONS_SLUGS, statistiques } from '@/lib/france'
import { CONTENU_REGIONS } from '@/lib/regions-contenu'
import SiteHeader from '@/components/site/SiteHeader'
import FilAriane from '@/components/pages/FilAriane'
import Faq from '@/components/pages/Faq'
import Chiffres from '@/components/pages/Chiffres'
import BandeauProprietaires from '@/components/pages/BandeauProprietaires'
import LogementsClient, { type Logement } from '@/app/logements/LogementsClient'

export const dynamic = 'force-dynamic'

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

type Props = { params: Promise<{ region: string }> }

async function logementsDeLaRegion(nom: string): Promise<Logement[]> {
  const { data } = await supabase
    .from('vitrines')
    .select('id, titre, ville, pays, region, type_logement, prix_nuit, capacite, nb_chambres, statut, photos, equipements, created_at')
    .in('statut', STATUTS_VISIBLES)
    .eq('region', nom)
    .order('created_at', { ascending: false })
  return (data || []) as Logement[]
}

export async function generateStaticParams() {
  return Object.keys(REGIONS_SLUGS).map(region => ({ region }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { region: slug } = await params
  const nom = REGIONS_SLUGS[slug]
  if (!nom) return { title: 'Région introuvable' }

  const s = statistiques(await logementsDeLaRegion(nom))
  const titre = premierTitre(
    `Location vacances ${nom} entre particuliers`,
    `Location vacances ${nom} sans commission`,
    `Location vacances ${nom}`
  )
  const description =
    s.total > 0
      ? `${s.total} location${s.total > 1 ? 's' : ''} de vacances en ${nom}, louée${s.total > 1 ? 's' : ''} par les propriétaires${s.prixMin ? `, dès ${s.prixMin} € la nuit` : ''}${s.chiens ? `, dont ${s.chiens} avec chien accepté` : ''}. Contact direct sur WhatsApp, sans commission.`
      : `Locations de vacances en ${nom} entre particuliers, sans commission. Contact direct avec le propriétaire sur WhatsApp.`

  return {
    title: { absolute: titre },
    description,
    alternates: { canonical: `${SITE_URL}/location-vacances/${slug}` },
    ...(s.total < MIN_ANNONCES_INDEX ? { robots: NOINDEX } : {}),
    openGraph: { title: titre, description, url: `${SITE_URL}/location-vacances/${slug}` },
  }
}

export default async function RegionPage({ params }: Props) {
  const { region: slug } = await params
  const nom = REGIONS_SLUGS[slug]
  if (!nom) notFound()

  const [isLoggedIn, logements] = await Promise.all([getSessionUserId().then(Boolean), logementsDeLaRegion(nom)])
  const s = statistiques(logements)
  const contenu = CONTENU_REGIONS[slug]
  const voisines = (contenu?.voisines || []).map(v => REGIONS_METRO.find(r => r.slug === v)).filter(Boolean) as typeof REGIONS_METRO
  const lienPublier = isLoggedIn ? '/espace/ma-vitrine' : '/inscription'

  const chiffres = [
    { valeur: String(s.total), label: s.total > 1 ? 'logements' : 'logement' },
    ...(s.prixMin ? [{ valeur: `${s.prixMin} €`, label: 'la nuit, au plus bas' }] : []),
    ...(s.chiens ? [{ valeur: String(s.chiens), label: 'avec chien accepté' }] : []),
  ]

  const questions = [
    {
      q: `Comment louer un logement de vacances en ${nom} sans commission ?`,
      r: `Sur LocaDirect, chaque annonce est publiée par le propriétaire lui-même. Vous lui écrivez directement sur WhatsApp depuis l’annonce, sans créer de compte, puis vous vous mettez d’accord sur les dates et le paiement. LocaDirect ne prend aucune commission, ni sur vous ni sur le propriétaire.`,
    },
    ...(s.prixMin
      ? [
          {
            q: `Combien coûte une location de vacances en ${nom} ?`,
            r: `Sur LocaDirect, les ${s.total} logements en ${nom} démarrent à ${s.prixMin} € la nuit${s.prixMedian && s.total > 2 ? `, et la moitié coûte moins de ${s.prixMedian} € la nuit` : ''}. Le prix final dépend des dates et se fixe directement avec le propriétaire, sans frais ajoutés.`,
          },
        ]
      : []),
    {
      q: `Peut-on partir en ${nom} avec son chien ?`,
      r: `${s.chiens ? `Oui : ${s.chiens} logement${s.chiens > 1 ? 's' : ''} en ${nom} accepte${s.chiens > 1 ? 'nt' : ''} les chiens, y compris ceux de plus de 10 kg.` : `Aucun logement de la région n’indique encore accepter les grands chiens, mais de nouvelles annonces arrivent chaque semaine.`} ${contenu?.chien ?? ''}`.trim(),
    },
    {
      q: 'Comment éviter les arnaques à la location de vacances ?',
      r: 'Échangez avec le propriétaire avant de réserver, demandez un contrat de location et le numéro d’enregistrement du logement en mairie, et ne payez jamais par mandat cash ou carte prépayée. Un virement à une personne dont vous avez vérifié l’identité reste le moyen le plus sûr.',
    },
  ]

  return (
    <div className="bg-white text-ink">
      <SiteHeader isLoggedIn={isLoggedIn} current="logements" />
      <main id="contenu" className="mx-auto flex max-w-[1280px] flex-col gap-10 px-5 pb-20 sm:px-8">
        <FilAriane etapes={[{ nom: 'Logements', href: '/logements' }, { nom }]} />

        <header className="-mt-4 flex flex-col gap-5">
          <h1 className="text-balance text-[34px] font-bold leading-[1.08] tracking-[-0.04em] sm:text-5xl">
            Location de vacances en {nom}
          </h1>
          <p className="max-w-[68ch] text-lg leading-relaxed text-ink-soft">
            {contenu?.intro ??
              `Des maisons et appartements de vacances en ${nom}, loués directement par leurs propriétaires, sans commission.`}
          </p>
          <Chiffres elements={chiffres} />
        </header>

        {s.villes.length > 1 && (
          <nav aria-labelledby="villes-titre" className="flex flex-col gap-3">
            <h2 id="villes-titre" className="text-lg font-bold">
              Par ville
            </h2>
            <ul className="flex flex-wrap gap-2">
              {s.villes.map(v => (
                <li key={v.slug}>
                  <Link
                    href={`/location-vacances/${slug}/${v.slug}`}
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
            <LogementsClient logements={logements} chemin={`/location-vacances/${slug}`} regionFixe />
          </Suspense>
        ) : (
          <div className="flex flex-col items-start gap-3 rounded-[26px] bg-surface p-8 sm:p-10">
            <h2 className="text-xl font-bold">Pas encore de logement en {nom}</h2>
            <p className="text-base text-ink-soft">
              Les premières annonces arrivent bientôt. En attendant, voyez les logements des régions voisines.
            </p>
            <div className="mt-2 flex flex-wrap gap-3">
              <Link
                href="/logements"
                className="flex min-h-[48px] items-center rounded-[14px] bg-brand px-5 text-base font-bold text-white no-underline hover:bg-brand-strong"
              >
                Voir tous les logements
              </Link>
              <Link
                href={lienPublier}
                className="flex min-h-[48px] items-center rounded-[14px] px-5 text-base font-bold text-ink no-underline shadow-[inset_0_0_0_1.5px_#e4e3ee] hover:shadow-[inset_0_0_0_1.5px_#17162a]"
              >
                Publier un logement en {nom}
              </Link>
            </div>
          </div>
        )}

        {contenu && (
          <section aria-labelledby="partir-titre" className="grid gap-10 border-t border-line pt-12 lg:grid-cols-[minmax(0,1fr)_380px]">
            <div className="flex flex-col gap-6">
              <h2 id="partir-titre" className="text-balance text-2xl font-bold tracking-[-0.02em]">
                Que faire en vacances en {nom}
              </h2>
              <dl className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
                {contenu.envies.map(e => (
                  <div key={e.titre} className="flex flex-col gap-1">
                    <dt className="text-base font-bold">{e.titre}</dt>
                    <dd className="text-base leading-relaxed text-ink-soft">{e.texte}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <aside className="flex flex-col gap-3 self-start rounded-[22px] bg-dog p-6">
              <h2 className="text-lg font-bold">En {nom} avec votre chien</h2>
              <p className="text-base leading-relaxed text-ink-soft">{contenu.chien}</p>
              <Link href="/logements/chiens" className="flex min-h-[44px] items-center text-base font-bold text-ink">
                Voir les logements où le chien est accepté
              </Link>
            </aside>
          </section>
        )}

        <Faq titre={`Location de vacances en ${nom} : vos questions`} questions={questions} />

        {voisines.length > 0 && (
          <nav aria-labelledby="voisines-titre" className="flex flex-col gap-3">
            <h2 id="voisines-titre" className="text-lg font-bold">
              Régions voisines
            </h2>
            <ul className="flex flex-wrap gap-2">
              {voisines.map(r => (
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
        )}

        <BandeauProprietaires
          href={lienPublier}
          titre={`Vous avez un logement en ${nom} ?`}
          texte="Publiez votre annonce gratuitement. Les voyageurs vous écrivent directement sur WhatsApp et vous gardez 100 % de vos loyers."
        />
      </main>
    </div>
  )
}
