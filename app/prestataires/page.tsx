import { createClient } from '@supabase/supabase-js'
import type { Metadata } from 'next'
import Link from 'next/link'
import { Suspense } from 'react'
import { getSessionUserId } from '@/lib/session'
import { SITE_URL } from '@/lib/seo'
import { COLONNES_PUBLIQUES, METIERS, type PrestatairePublic } from '@/lib/prestataires'
import SiteHeader from '@/components/site/SiteHeader'
import FilAriane from '@/components/pages/FilAriane'
import Faq from '@/components/pages/Faq'
import PrestatairesClient from '@/components/prestataires/PrestatairesClient'
import BandeauPros from '@/components/prestataires/BandeauPros'

export const dynamic = 'force-dynamic'

const TITRE = 'Conciergerie, ménage, photographe : annuaire location saisonnière'
const TITRE_GOOGLE = 'Prestataires pour location saisonnière : annuaire'
const DESCRIPTION =
  'Conciergeries, ménage, photographes, artisans : trouvez un prestataire près de votre location de vacances et contactez-le directement sur WhatsApp, sans intermédiaire.'

export const metadata: Metadata = {
  title: { absolute: TITRE_GOOGLE },
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/prestataires` },
  openGraph: { title: TITRE, description: DESCRIPTION, url: `${SITE_URL}/prestataires` },
}

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

export default async function PrestatairesPage() {
  const isLoggedIn = !!(await getSessionUserId())
  const { data } = await supabase
    .from('prestataires')
    .select(COLONNES_PUBLIQUES)
    .eq('statut', 'active')
    .order('created_at', { ascending: false })
  const prestataires = (data || []) as PrestatairePublic[]
  const parMetier = METIERS.map(m => ({ ...m, nombre: prestataires.filter(p => p.activite === m.nom).length })).filter(
    m => m.nombre > 0
  )

  return (
    <div className="bg-white text-ink">
      <SiteHeader isLoggedIn={isLoggedIn} current="prestataires" />
      <main id="contenu" className="mx-auto flex max-w-[1280px] flex-col gap-10 px-5 pb-20 sm:px-8">
        <FilAriane etapes={[{ nom: 'Prestataires' }]} />
        <header className="-mt-4 flex flex-col gap-4">
          <h1 className="text-balance text-[34px] font-bold leading-[1.08] tracking-[-0.04em] sm:text-5xl">
            Les prestataires de la location saisonnière
          </h1>
          <p className="max-w-[68ch] text-lg leading-relaxed text-ink-soft">
            {prestataires.length} professionnels près de chez vous pour gérer, nettoyer, photographier ou entretenir
            votre location de vacances. Vous les contactez directement, sans intermédiaire et sans frais.
          </p>
        </header>

        {parMetier.length > 0 && (
          <nav aria-labelledby="metiers-titre" className="flex flex-col gap-3">
            <h2 id="metiers-titre" className="text-lg font-bold">
              Par métier
            </h2>
            <ul className="flex flex-wrap gap-2">
              {parMetier.map(m => (
                <li key={m.slug}>
                  <Link
                    href={`/prestataires/${m.slug}`}
                    className="flex min-h-[44px] items-center gap-1.5 rounded-full bg-surface px-4 text-sm font-semibold text-ink no-underline hover:bg-brand-soft hover:text-brand-strong"
                  >
                    {m.court}
                    <span className="font-normal text-muted">{m.nombre}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}

        <Suspense>
          <PrestatairesClient prestataires={prestataires} chemin="/prestataires" />
        </Suspense>

        <Faq
          titre="Trouver un prestataire : vos questions"
          questions={[
            {
              q: 'Comment contacter un prestataire de l’annuaire ?',
              r: 'Ouvrez sa fiche et appuyez sur « Écrire sur WhatsApp » ou « Afficher le numéro ». Vous échangez directement avec lui : LocaDirect ne prend aucune commission et n’intervient pas dans votre accord.',
            },
            {
              q: 'Combien coûte une conciergerie pour une location saisonnière ?',
              r: 'La plupart des conciergeries prennent un pourcentage des loyers, souvent entre 15 et 25 %, ou un forfait par séjour. Le prix dépend des services compris (accueil, ménage, linge, gestion des annonces) : demandez un devis à plusieurs prestataires de votre ville.',
            },
            {
              q: 'Les prestataires sont-ils vérifiés ?',
              r: 'Chaque prestataire indique son numéro SIRET à l’inscription et chaque fiche est relue avant publication. Avant de vous engager, demandez un devis écrit et, si besoin, une attestation d’assurance.',
            },
          ]}
        />

        <BandeauPros href={isLoggedIn ? '/espace/devenir-prestataire' : '/rejoindre-annuaire'} />
      </main>
    </div>
  )
}
