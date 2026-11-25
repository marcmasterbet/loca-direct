import type { Metadata } from 'next'
import Link from 'next/link'
import { createClient } from '@supabase/supabase-js'
import { getSessionUserId } from '@/lib/session'
import { centreCommune } from '@/lib/geo'
import { accepteGrandChien } from '@/lib/france'
import SiteHeader from '@/components/site/SiteHeader'
import ListingCard, { type ListingCardData } from '@/components/listing/ListingCard'
import CarteLogements, { type PointLogement } from '@/components/home/CarteLogements'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: { absolute: 'Location vacances en direct entre particuliers | LocaDirect' },
  description:
    'LocaDirect (loca-direct.fr) : location de vacances en direct entre particuliers, sans commission. Maisons, gîtes, chien accepté, contact WhatsApp.',
  alternates: { canonical: 'https://www.loca-direct.fr' },
  openGraph: { title: 'Location vacances en direct entre particuliers | LocaDirect', description: 'Location de vacances en direct entre particuliers, sans commission. Maisons, gîtes, chien accepté, contact WhatsApp.', url: 'https://www.loca-direct.fr' },
}

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

type Vitrine = ListingCardData & {
  code_postal: string | null
  pays: string | null
  equipements: unknown
  created_at: string
}

export default async function Accueil() {
  const isLoggedIn = !!(await getSessionUserId())

  const { data } = await supabase
    .from('vitrines')
    .select('id, titre, ville, code_postal, pays, prix_nuit, photos, type_logement, statut, equipements, created_at')
    .in('statut', ['active', 'deja_loue', 'bientot_dispo'])
    .order('created_at', { ascending: false })

  const vitrines = ((data || []) as Vitrine[]).filter(v => !v.pays || v.pays === 'France')
  const avecChien = vitrines.filter(v => accepteGrandChien(v.equipements))
  const nouveaux = vitrines.filter(v => !accepteGrandChien(v.equipements)).slice(0, 8)

  const points: PointLogement[] = (
    await Promise.all(
      vitrines.map(async v => {
        const lngLat = await centreCommune(v.code_postal, v.ville)
        return lngLat
          ? {
              id: v.id,
              titre: v.titre?.trim() || v.type_logement || 'Logement',
              ville: v.ville || '',
              prix: v.prix_nuit,
              chien: accepteGrandChien(v.equipements),
              lngLat,
            }
          : null
      })
    )
  ).filter((p): p is PointLogement => p !== null)

  return (
    <div className="bg-white text-ink">
      <SiteHeader isLoggedIn={isLoggedIn} />
      <main id="contenu">

      {/* Accroche, recherche et carte */}
      {/* Sur grand écran, la carte occupe tout l'écran et la recherche flotte à gauche. */}
      <section className="relative lg:h-[calc(100svh-84px)] lg:min-h-[640px]">
        <div className="relative z-20 flex flex-col gap-6 px-5 pb-8 pt-6 sm:px-8 lg:absolute lg:left-8 lg:top-1/2 lg:w-[500px] lg:-translate-y-1/2 lg:rounded-[28px] lg:bg-white lg:p-9 lg:shadow-[0_0_0_1px_#e4e3ee,0_16px_48px_rgba(23,22,42,0.08)] xl:left-[max(2rem,calc((100vw-1280px)/2+2rem))]">
          <p className="text-base font-semibold text-mint-ink">0&nbsp;€ de commission, 0&nbsp;€ de frais de service</p>
          <h1 className="text-balance text-[44px] font-bold leading-[1.05] tracking-[-0.05em] sm:text-[56px] lg:text-[46px]">
            Trouvez votre location. Écrivez au propriétaire.
          </h1>
          <p className="max-w-[520px] text-lg leading-relaxed text-ink-soft">
            Des maisons et appartements de vacances en France, en location directe par des particuliers.
          </p>
          <form
            action="/logements"
            role="search"
            className="flex flex-col gap-1 rounded-[22px] bg-white p-2 shadow-[0_0_0_1px_#e4e3ee,0_8px_24px_rgba(23,22,42,0.06)]"
          >
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <label className="flex flex-1 flex-col px-4 py-2.5">
                <span className="text-sm font-semibold text-ink-soft">Où partez-vous&nbsp;?</span>
                <input
                  type="text"
                  name="ville"
                  autoComplete="off"
                  placeholder="Ex. Biarritz, Annecy…"
                  className="min-h-[32px] border-0 bg-transparent p-0 text-lg text-ink outline-none placeholder:text-muted"
                />
              </label>
              <button type="submit" className="min-h-[56px] rounded-2xl bg-brand px-7 text-lg font-bold text-white hover:bg-brand-strong">
                Rechercher
              </button>
            </div>
            <label className="flex items-center gap-2.5 rounded-2xl bg-dog px-4 py-3 text-base font-semibold">
              <input type="checkbox" name="chien" value="1" className="h-5 w-5 accent-[#5534e8]" />
              Je pars avec mon chien
            </label>
          </form>
        </div>

        <div className="relative h-[78svh] min-h-[460px] lg:absolute lg:inset-0 lg:h-auto lg:min-h-0">
          <CarteLogements points={points} />
        </div>
      </section>

      {/* Section chien, séparée des autres annonces */}
      {avecChien.length > 0 && (
        <section className="bg-dog">
          <div className="mx-auto flex max-w-[1280px] flex-col gap-7 px-5 py-16 sm:px-8">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div className="flex max-w-[640px] flex-col gap-2">
                <h2 className="text-balance text-[32px] font-bold leading-tight tracking-[-0.04em] sm:text-[40px]">
                  Vous partez avec votre chien ?
                </h2>
                <p className="text-lg leading-relaxed text-ink-soft">
                  Une section rien que pour vous : uniquement des logements qui acceptent les chiens, même les grands.
                </p>
              </div>
              <Link href="/logements/chiens" className="flex min-h-[48px] items-center rounded-[14px] bg-ink px-5 text-base font-bold text-white no-underline hover:bg-black">
                Voir les {avecChien.length} logements
              </Link>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {avecChien.slice(0, 4).map(v => (
                <ListingCard key={v.id} v={v} surFond />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Nouveaux logements */}
      <section className="mx-auto flex max-w-[1280px] flex-col gap-7 px-5 pt-16 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="text-balance text-[32px] font-bold tracking-[-0.04em] sm:text-[40px]">Nouveaux logements</h2>
          <Link href="/logements" className="flex min-h-[44px] items-center text-base font-bold text-brand no-underline hover:text-brand-strong">
            Voir tous les logements
          </Link>
        </div>
        <div className="grid gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
          {nouveaux.map((v, i) => (
            <ListingCard key={v.id} v={v} priorite={i < 4} />
          ))}
        </div>
      </section>

      {/* Comment ça marche */}
      <section className="mx-auto grid max-w-[1280px] gap-10 px-5 py-20 sm:px-8 lg:grid-cols-[1fr_2fr]">
        <div className="flex flex-col gap-3">
          <h2 className="text-balance text-[32px] font-bold leading-tight tracking-[-0.04em]">Comment se passe une location</h2>
          <p className="text-lg leading-relaxed text-ink-soft">Personne entre vous et le propriétaire.</p>
        </div>
        <ol className="grid gap-4 sm:grid-cols-3">
          {[
            ['Vous choisissez', 'Par région, sur la carte, avec ou sans chien.'],
            ['Vous écrivez au propriétaire', 'Un bouton ouvre WhatsApp. Dates, questions, conditions : tout se règle entre vous.'],
            ['Vous payez le propriétaire, pas LocaDirect', 'LocaDirect n’encaisse rien et n’intervient pas dans la location. Demandez un contrat, et ne payez jamais par mandat cash ou coupon.'],
          ].map(([titre, texte], i) => (
            <li key={titre} className="flex flex-col gap-2 rounded-[22px] bg-surface p-6">
              <span className="text-3xl font-bold text-brand">{i + 1}</span>
              <strong className="text-lg">{titre}</strong>
              <span className="text-base leading-relaxed text-ink-soft">{texte}</span>
            </li>
          ))}
        </ol>
      </section>

      {/* Propriétaires et prestataires */}
      <section className="mx-auto max-w-[1280px] px-5 pb-20 sm:px-8">
        <div className="grid gap-5 rounded-[32px] bg-ink p-8 text-white sm:p-12 lg:grid-cols-2">
          <div className="flex flex-col gap-4">
            <h2 className="text-balance text-[32px] font-bold leading-tight tracking-[-0.04em] sm:text-[40px]">Propriétaires, louez sans commission.</h2>
            <p className="text-lg leading-relaxed text-[#c9c7dc]">
              Vous gardez 100 % de vos loyers. Publiez votre annonce gratuitement, les voyageurs vous écrivent directement.
            </p>
            <div className="mt-2 flex flex-wrap gap-3">
              <Link href={isLoggedIn ? '/espace/ma-vitrine' : '/publier'} className="rounded-[14px] bg-brand px-5 py-3.5 font-bold text-white no-underline hover:bg-brand-strong">
                Publier gratuitement
              </Link>
              <Link href="/alternative-airbnb" className="rounded-[14px] px-5 py-3.5 font-bold text-white no-underline ring-1 ring-inset ring-white/60 hover:bg-white/10">
                Comparer avec Airbnb
              </Link>
            </div>
          </div>
          <div className="flex flex-col justify-between gap-4 rounded-[22px] bg-night p-7">
            <div className="flex flex-col gap-2">
              <strong className="text-xl">Conciergerie, ménage, photographe ?</strong>
              <p className="text-base leading-relaxed text-[#c9c7dc]">
                Rejoignez l’annuaire des professionnels de la location saisonnière et recevez les demandes des propriétaires de vos villes.
              </p>
            </div>
            <Link href={isLoggedIn ? '/espace/devenir-prestataire' : '/rejoindre-annuaire'} className="self-start rounded-[14px] px-5 py-3 font-bold text-white no-underline ring-1 ring-inset ring-white/60 hover:bg-white/10">
              Rejoindre l’annuaire
            </Link>
          </div>
        </div>
      </section>
      </main>
    </div>
  )
}
