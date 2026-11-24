import { createClient } from '@supabase/supabase-js'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { Suspense } from 'react'
import { getSessionUserId } from '@/lib/session'
import { NOINDEX, SITE_URL, premierTitre, titreGoogle } from '@/lib/seo'
import { REGIONS_METRO, slugRegion } from '@/lib/france'
import {
  COLONNES_PUBLIQUES,
  estImage,
  metierParNom,
  metierParSlug,
  nomAffiche,
  type Metier,
  type PrestatairePublic,
} from '@/lib/prestataires'
import SiteHeader from '@/components/site/SiteHeader'
import FilAriane from '@/components/pages/FilAriane'
import Faq from '@/components/pages/Faq'
import Chiffres from '@/components/pages/Chiffres'
import PrestatairesClient from '@/components/prestataires/PrestatairesClient'
import PrestataireCard, { tarif } from '@/components/prestataires/PrestataireCard'
import ContactPrestataire from '@/components/prestataires/ContactPrestataire'
import GaleriePrestataire from '@/components/prestataires/GaleriePrestataire'
import BandeauPros from '@/components/prestataires/BandeauPros'

export const dynamic = 'force-dynamic'

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

// Ce segment sert à deux pages, car Next.js impose un seul nom par niveau d'adresse :
//   /prestataires/conciergerie  → la page d'un métier
//   /prestataires/<identifiant> → la fiche d'un prestataire (adresse inchangée)
type Props = { params: Promise<{ activite: string }> }

async function prestatairesDuMetier(m: Metier) {
  const { data } = await supabase
    .from('prestataires')
    .select(COLONNES_PUBLIQUES)
    .eq('statut', 'active')
    .eq('activite', m.nom)
    .order('created_at', { ascending: false })
  return (data || []) as PrestatairePublic[]
}

async function fiche(id: string) {
  const { data } = await supabase
    .from('prestataires')
    .select(`${COLONNES_PUBLIQUES}, site_web, siret, code_postal, nb_vues, whatsapp, telephone`)
    .eq('id', id)
    .eq('statut', 'active')
    .single()
  return data as
    | (PrestatairePublic & {
        site_web: string | null
        siret: string | null
        code_postal: string | null
        nb_vues: number | null
        whatsapp: string | null
        telephone: string | null
      })
    | null
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { activite } = await params
  const m = metierParSlug(activite)

  if (m) {
    const liste = await prestatairesDuMetier(m)
    const titre = premierTitre(`${m.titre} : annuaire`, m.titre, m.court)
    const description = `${m.intro.split('.')[0]}. ${liste.length} professionnel${liste.length > 1 ? 's' : ''} à contacter directement sur WhatsApp, sans intermédiaire.`
    return {
      title: { absolute: titre },
      description: description.length > 160 ? `${description.slice(0, 157).trimEnd()}…` : description,
      alternates: { canonical: `${SITE_URL}/prestataires/${m.slug}` },
      ...(liste.length === 0 ? { robots: NOINDEX } : {}),
      openGraph: { title: titre, description, url: `${SITE_URL}/prestataires/${m.slug}` },
    }
  }

  const p = await fiche(activite)
  if (!p) return { title: 'Prestataire introuvable', robots: NOINDEX }
  const metier = metierParNom(p.activite)
  const titre = titreGoogle(`${metier?.court ?? p.activite} à ${p.ville} : ${nomAffiche(p)}`)
  const description =
    (p.description?.trim() || `${p.activite} à ${p.ville}. Contactez ${nomAffiche(p)} directement sur WhatsApp.`).replace(/\s+/g, ' ')
  return {
    title: { absolute: titre },
    description: description.length > 160 ? `${description.slice(0, 157).trimEnd()}…` : description,
    alternates: { canonical: `${SITE_URL}/prestataires/${p.id}` },
    openGraph: { title: titre, description, images: estImage(p.flyer_url) ? [p.flyer_url!] : undefined },
  }
}

export default async function Page({ params }: Props) {
  const { activite } = await params
  const isLoggedIn = !!(await getSessionUserId())
  const m = metierParSlug(activite)
  return m ? <PageMetier m={m} isLoggedIn={isLoggedIn} /> : <FichePrestataire id={activite} isLoggedIn={isLoggedIn} />
}

/* ---------- Page d'un métier ---------- */

async function PageMetier({ m, isLoggedIn }: { m: Metier; isLoggedIn: boolean }) {
  const liste = await prestatairesDuMetier(m)
  const parRegion = REGIONS_METRO.map(r => ({ ...r, nombre: liste.filter(p => p.region === r.nom).length })).filter(
    r => r.nombre > 0
  )
  const tarifs = liste.map(p => Number(p.tarif_horaire)).filter(n => Number.isFinite(n) && n > 0).sort((a, b) => a - b)

  return (
    <div className="bg-white text-ink">
      <SiteHeader isLoggedIn={isLoggedIn} current="prestataires" />
      <main id="contenu" className="mx-auto flex max-w-[1280px] flex-col gap-10 px-5 pb-20 sm:px-8">
        <FilAriane etapes={[{ nom: 'Prestataires', href: '/prestataires' }, { nom: m.court }]} />
        <header className="-mt-4 flex flex-col gap-5">
          <h1 className="text-balance text-[34px] font-bold leading-[1.08] tracking-[-0.04em] sm:text-5xl">{m.titre}</h1>
          <p className="max-w-[68ch] text-lg leading-relaxed text-ink-soft">{m.intro}</p>
          <Chiffres
            elements={[
              { valeur: String(liste.length), label: liste.length > 1 ? 'professionnels' : 'professionnel' },
              { valeur: String(parRegion.length), label: parRegion.length > 1 ? 'régions' : 'région' },
              ...(tarifs.length ? [{ valeur: `${Math.round(tarifs[0])} €`, label: 'de l’heure, au plus bas' }] : []),
            ]}
          />
        </header>

        {parRegion.length > 0 && (
          <nav aria-labelledby="regions-metier" className="flex flex-col gap-3">
            <h2 id="regions-metier" className="text-lg font-bold">
              Par région
            </h2>
            <ul className="flex flex-wrap gap-2">
              {parRegion.map(r => (
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

        <Suspense>
          <PrestatairesClient prestataires={liste} chemin={`/prestataires/${m.slug}`} metierFixe />
        </Suspense>

        <section aria-labelledby="choisir" className="flex flex-col gap-4 rounded-[28px] bg-surface p-8 sm:p-10">
          <h2 id="choisir" className="text-balance text-2xl font-bold tracking-[-0.02em]">
            Bien choisir : les questions à poser
          </h2>
          <ul className="flex max-w-[68ch] flex-col gap-3">
            {m.conseils.map(c => (
              <li key={c} className="flex gap-3 text-base leading-relaxed text-ink-soft">
                <span aria-hidden="true" className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-soft">
                  <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                    <path d="M2.5 6.2 5 8.5l4.5-5" stroke="#5534e8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                {c}
              </li>
            ))}
          </ul>
        </section>

        <Faq
          titre={`${m.court} : vos questions`}
          questions={[
            {
              q: `Comment contacter un professionnel « ${m.court.toLowerCase()} » ?`,
              r: 'Ouvrez sa fiche, puis écrivez-lui sur WhatsApp ou affichez son numéro. Vous vous mettez d’accord directement avec lui : LocaDirect ne prend aucune commission.',
            },
            {
              q: 'Comment trouver un prestataire près de mon logement ?',
              r: `Choisissez votre région ci-dessus, ou tapez le nom de votre ville dans le filtre. ${parRegion.length ? `L’annuaire compte aujourd’hui des professionnels dans ${parRegion.length} région${parRegion.length > 1 ? 's' : ''}.` : ''}`.trim(),
            },
          ]}
        />

        <BandeauPros
          href={isLoggedIn ? '/espace/devenir-prestataire' : '/rejoindre-annuaire'}
          titre={`Vous proposez un service « ${m.court.toLowerCase()} » ?`}
        />
      </main>
    </div>
  )
}

/* ---------- Fiche d'un prestataire ---------- */

async function FichePrestataire({ id, isLoggedIn }: { id: string; isLoggedIn: boolean }) {
  const p = await fiche(id)
  if (!p) notFound()

  // Compteur de vues (inchangé)
  supabase
    .from('prestataires')
    .update({ nb_vues: (p.nb_vues || 0) + 1 })
    .eq('id', p.id)
    .then(() => {})

  const metier = metierParNom(p.activite)
  const regionSlug = slugRegion(p.region)
  const nom = nomAffiche(p)
  const images = [p.flyer_url, ...(p.photos || [])].filter(estImage)
  const flyerPdf = p.flyer_url && !estImage(p.flyer_url) ? p.flyer_url : null
  const siteWeb = p.site_web ? (p.site_web.startsWith('http') ? p.site_web : `https://${p.site_web}`) : null
  const prix = tarif(p)

  const { data: autresData } =
    p.region && p.activite
      ? await supabase
          .from('prestataires')
          .select(COLONNES_PUBLIQUES)
          .eq('statut', 'active')
          .eq('activite', p.activite)
          .eq('region', p.region)
          .neq('id', p.id)
          .limit(4)
      : { data: [] }
  const autres = (autresData || []) as PrestatairePublic[]

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: nom,
    description: p.description || `${p.activite} à ${p.ville}`,
    image: images[0] || undefined,
    url: `${SITE_URL}/prestataires/${p.id}`,
    address: { '@type': 'PostalAddress', addressLocality: p.ville, postalCode: p.code_postal || undefined, addressRegion: p.region || undefined, addressCountry: 'FR' },
    areaServed: p.ville,
    priceRange: prix ?? undefined,
  }

  const etapes = [
    { nom: 'Prestataires', href: '/prestataires' },
    ...(metier ? [{ nom: metier.court, href: `/prestataires/${metier.slug}` }] : []),
    ...(metier && regionSlug && p.region ? [{ nom: p.region, href: `/prestataires/${metier.slug}/${regionSlug}` }] : []),
    { nom },
  ]

  return (
    <div className="bg-white text-ink">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <SiteHeader isLoggedIn={isLoggedIn} current="prestataires" />
      <main id="contenu" className="mx-auto flex max-w-[1180px] flex-col gap-8 px-5 pb-20 sm:px-8">
        <FilAriane etapes={etapes} />

        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_380px]">
          <div className="flex flex-col gap-8">
            <header className="flex flex-col gap-3">
              <p className="text-base font-semibold text-brand">{metier?.court ?? p.activite}</p>
              <h1 className="text-balance text-[32px] font-bold leading-[1.1] tracking-[-0.04em] sm:text-[42px]">{nom}</h1>
              <p className="text-lg text-ink-soft">
                {[p.ville, p.region].filter(Boolean).join(', ')}
              </p>
              <dl className="mt-2 flex flex-wrap gap-x-10 gap-y-3 border-y border-line py-5">
                <div className="flex flex-col">
                  <dt className="order-2 text-sm text-muted">tarif</dt>
                  <dd className="text-xl font-bold">{prix ?? 'À demander'}</dd>
                </div>
                {p.siret && (
                  <div className="flex flex-col">
                    <dt className="order-2 text-sm text-muted">numéro SIRET fourni</dt>
                    <dd className="text-xl font-bold">Entreprise déclarée</dd>
                  </div>
                )}
              </dl>
            </header>

            {p.description?.trim() && (
              <section className="flex flex-col gap-3">
                <h2 className="text-2xl font-bold tracking-[-0.02em]">Présentation</h2>
                <p className="max-w-[68ch] whitespace-pre-line text-base leading-[1.75] text-ink-soft">{p.description}</p>
              </section>
            )}

            {(images.length > 0 || flyerPdf) && (
              <section className="flex flex-col gap-3">
                <h2 className="text-2xl font-bold tracking-[-0.02em]">Photos et flyer</h2>
                <GaleriePrestataire images={images} nom={nom} />
                {flyerPdf && (
                  <a href={flyerPdf} target="_blank" rel="noreferrer" className="flex min-h-[44px] items-center text-base font-bold text-brand">
                    Ouvrir son flyer (PDF)
                  </a>
                )}
              </section>
            )}
          </div>

          <aside id="contact" className="scroll-mt-6">
            <div className="flex flex-col gap-4 rounded-[26px] bg-white p-6 shadow-[0_0_0_1px_#e4e3ee,0_8px_24px_rgba(23,22,42,0.06)] lg:sticky lg:top-6">
              <h2 className="text-lg font-bold">Contacter {p.prenom || nom}</h2>
              <ContactPrestataire
                id={p.id}
                prenom={p.prenom || nom}
                activite={p.activite}
                ville={p.ville}
                aWhatsapp={!!p.whatsapp}
                aTelephone={!!p.telephone}
                siteWeb={siteWeb}
              />
              <p className="border-t border-line pt-4 text-sm leading-relaxed text-muted">
                Vous vous mettez d’accord directement avec le prestataire. LocaDirect ne prend aucune commission.
              </p>
            </div>
          </aside>
        </div>

        {autres.length > 0 && metier && (
          <section className="flex flex-col gap-6 border-t border-line pt-12">
            <h2 className="text-balance text-2xl font-bold tracking-[-0.02em]">
              Autres professionnels « {metier.court.toLowerCase()} » en {p.region}
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {autres.map(a => (
                <PrestataireCard key={a.id} p={a} />
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  )
}
