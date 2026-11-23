import { createClient } from '@supabase/supabase-js'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { Suspense } from 'react'
import { getSessionUserId } from '@/lib/session'
import { MIN_ANNONCES_INDEX, NOINDEX, SITE_URL, STATUTS_VISIBLES, premierTitre } from '@/lib/seo'
import { REGIONS_SLUGS, slugifier, statistiques } from '@/lib/france'
import SiteHeader from '@/components/site/SiteHeader'
import FilAriane from '@/components/pages/FilAriane'
import Faq from '@/components/pages/Faq'
import Chiffres from '@/components/pages/Chiffres'
import BandeauProprietaires from '@/components/pages/BandeauProprietaires'
import LogementsClient, { type Logement } from '@/app/logements/LogementsClient'

export const dynamic = 'force-dynamic'

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

type Props = { params: Promise<{ region: string; ville: string }> }

/** Logements de la région, puis ceux de la ville demandée */
async function donnees(regionSlug: string, villeSlug: string) {
  const region = REGIONS_SLUGS[regionSlug]
  if (!region) return null
  const { data } = await supabase
    .from('vitrines')
    .select('id, titre, ville, pays, region, code_postal, type_logement, prix_nuit, capacite, nb_chambres, statut, photos, equipements, created_at')
    .in('statut', STATUTS_VISIBLES)
    .eq('region', region)
    .order('created_at', { ascending: false })
  const tous = (data || []) as (Logement & { code_postal?: string | null })[]
  const cible = slugifier(decodeURIComponent(villeSlug))
  const logements = tous.filter(v => v.ville && slugifier(v.ville) === cible)
  if (!logements.length) return { region, ville: null, logements, autresVilles: statistiques(tous).villes }
  return {
    region,
    ville: logements[0].ville!.trim(),
    departement: logements.find(v => v.code_postal)?.code_postal?.slice(0, 2) ?? null,
    logements,
    autresVilles: statistiques(tous).villes.filter(v => v.slug !== cible),
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { region, ville } = await params
  const d = await donnees(region, ville)
  if (!d?.ville) return { title: 'Location de vacances', robots: NOINDEX }

  const s = statistiques(d.logements)
  const titre = premierTitre(
    `Location vacances ${d.ville} entre particuliers`,
    `Location vacances ${d.ville} sans commission`,
    `Location vacances ${d.ville}`
  )
  const description = `${s.total} location${s.total > 1 ? 's' : ''} de vacances à ${d.ville}, en ${d.region}${s.prixMin ? `, dès ${s.prixMin} € la nuit` : ''}. Louées par les propriétaires : vous leur écrivez sur WhatsApp, sans commission.`
  const url = `${SITE_URL}/location-vacances/${region}/${slugifier(d.ville)}`
  return {
    title: { absolute: titre },
    description,
    alternates: { canonical: url },
    ...(s.total < MIN_ANNONCES_INDEX ? { robots: NOINDEX } : {}),
    openGraph: { title: titre, description, url },
  }
}

export default async function VillePage({ params }: Props) {
  const { region: regionSlug, ville: villeSlug } = await params
  const [d, isLoggedIn] = await Promise.all([donnees(regionSlug, villeSlug), getSessionUserId().then(Boolean)])
  if (!d?.ville) notFound()

  const { region, ville, logements, autresVilles } = d
  const s = statistiques(logements)
  const lienPublier = isLoggedIn ? '/espace/ma-vitrine' : '/inscription'

  const chiffres = [
    { valeur: String(s.total), label: s.total > 1 ? 'logements' : 'logement' },
    ...(s.prixMin ? [{ valeur: `${s.prixMin} €`, label: 'la nuit, au plus bas' }] : []),
    ...(s.chiens ? [{ valeur: String(s.chiens), label: 'avec chien accepté' }] : []),
  ]

  const questions = [
    {
      q: `Comment réserver une location de vacances à ${ville} ?`,
      r: `Choisissez un logement ci-dessus et appuyez sur « Écrire au propriétaire » : WhatsApp s’ouvre avec un message prêt à envoyer. Vous convenez des dates, du prix et du paiement directement avec lui. Aucun compte à créer, aucune commission.`,
    },
    ...(s.prixMin
      ? [
          {
            q: `Quel est le prix d’une location à ${ville} ?`,
            r: `Les logements à ${ville} sur LocaDirect démarrent à ${s.prixMin} € la nuit. Le propriétaire fixe ses prix, et vous ne payez aucun frais de service en plus.`,
          },
        ]
      : []),
    {
      q: `Y a-t-il des locations avec chien accepté à ${ville} ?`,
      r: s.chiens
        ? `Oui, ${s.chiens} logement${s.chiens > 1 ? 's' : ''} à ${ville} accepte${s.chiens > 1 ? 'nt' : ''} les chiens, même de plus de 10 kg. Précisez la taille de votre chien dans votre premier message.`
        : `Pas encore à ${ville}. Consultez la page « Chien accepté » pour voir tous les logements qui accueillent les chiens en ${region}.`,
    },
  ]

  return (
    <div className="bg-white text-ink">
      <SiteHeader isLoggedIn={isLoggedIn} current="logements" />
      <main id="contenu" className="mx-auto flex max-w-[1280px] flex-col gap-10 px-5 pb-20 sm:px-8">
        <FilAriane
          etapes={[
            { nom: 'Logements', href: '/logements' },
            { nom: region, href: `/location-vacances/${regionSlug}` },
            { nom: ville },
          ]}
        />

        <header className="-mt-4 flex flex-col gap-5">
          <h1 className="text-balance text-[34px] font-bold leading-[1.08] tracking-[-0.04em] sm:text-5xl">
            Location de vacances à {ville}
          </h1>
          <p className="max-w-[68ch] text-lg leading-relaxed text-ink-soft">
            {s.total > 1 ? `${s.total} logements` : 'Un logement'} à {ville}
            {d.departement ? ` (${d.departement})` : ''}, en {region}, loué{s.total > 1 ? 's' : ''} directement par
            {s.total > 1 ? ' leurs propriétaires' : ' son propriétaire'}. Vous écrivez sur WhatsApp, sans commission ni
            frais de service.
          </p>
          <Chiffres elements={chiffres} />
        </header>

        <Suspense>
          <LogementsClient
            logements={logements}
            chemin={`/location-vacances/${regionSlug}/${slugifier(ville)}`}
            regionFixe
          />
        </Suspense>

        <Faq titre={`Louer à ${ville} : vos questions`} questions={questions} />

        <nav aria-labelledby="autour-titre" className="flex flex-col gap-3">
          <h2 id="autour-titre" className="text-lg font-bold">
            Ailleurs en {region}
          </h2>
          <ul className="flex flex-wrap gap-2">
            <li>
              <Link
                href={`/location-vacances/${regionSlug}`}
                className="flex min-h-[44px] items-center rounded-full bg-brand-soft px-4 text-sm font-bold text-brand-strong no-underline hover:bg-brand-tint"
              >
                Toute la région {region}
              </Link>
            </li>
            {autresVilles.slice(0, 12).map(v => (
              <li key={v.slug}>
                <Link
                  href={`/location-vacances/${regionSlug}/${v.slug}`}
                  className="flex min-h-[44px] items-center gap-1.5 rounded-full bg-surface px-4 text-sm font-semibold text-ink no-underline hover:bg-brand-soft hover:text-brand-strong"
                >
                  {v.nom}
                  <span className="font-normal text-muted">{v.nombre}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <BandeauProprietaires
          href={lienPublier}
          titre={`Vous louez un logement à ${ville} ?`}
          texte="Publiez votre annonce gratuitement et recevez les messages des voyageurs directement sur WhatsApp."
        />
      </main>
    </div>
  )
}
