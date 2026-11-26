import type { Metadata } from 'next'
import Link from 'next/link'
import { createClient } from '@supabase/supabase-js'
import PageAcquisition from '@/components/landing/PageAcquisition'
import { getSessionUserId } from '@/lib/session'
import { METIERS } from '@/lib/prestataires'

export const revalidate = 3600

// Mots-clés : « trouver des propriétaires conciergerie », « devenir conciergerie Airbnb clients »
const TITRE = 'Conciergerie : trouvez des propriétaires, gratuitement'

export const metadata: Metadata = {
  title: { absolute: TITRE },
  description:
    'Conciergerie, ménage, photo, travaux : inscrivez-vous gratuitement dans l’annuaire LocaDirect et recevez les demandes des propriétaires en direct.',
  alternates: { canonical: '/rejoindre-annuaire' },
  openGraph: { title: TITRE, description: 'L’annuaire des prestataires de la location saisonnière : gratuit, contact direct.' },
}

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

export default async function RejoindreAnnuairePage() {
  const [connecte, { count: pros }, { count: annonces }] = await Promise.all([
    getSessionUserId().then(Boolean),
    supabase.from('prestataires').select('id', { count: 'exact', head: true }).eq('statut', 'active'),
    supabase.from('vitrines').select('id', { count: 'exact', head: true }).eq('statut', 'active'),
  ])

  return (
    <PageAcquisition
      connecte={connecte}
      ariane="Rejoindre l’annuaire"
      titre="Trouvez des propriétaires de locations saisonnières près de chez vous"
      intro="Conciergeries, ménage, linge, photographes, artisans : inscrivez-vous gratuitement dans l’annuaire LocaDirect. Les propriétaires vous contactent directement, sans plateforme qui prélève sa part. Pour le moment, l’inscription est gratuite."
      cta={{ href: connecte ? '/espace/devenir-prestataire' : '/inscription?profil=prestataire', label: 'Créer ma fiche gratuitement' }}
      chiffres={[
        { valeur: '0 €', label: 'de commission' },
        ...(pros ? [{ valeur: String(pros), label: 'professionnels inscrits' }] : []),
        ...(annonces ? [{ valeur: String(annonces), label: 'logements de propriétaires' }] : []),
      ]}
      etapes={[
        ['Créez votre compte', 'Une adresse e-mail et un mot de passe, puis cochez « Rejoindre l’annuaire ».'],
        ['Remplissez votre fiche', 'Métier, zone d’intervention, tarif ou devis, photos de vos réalisations. Le SIRET sert à vérifier votre activité.'],
        ['Recevez les demandes', 'Après relecture, votre fiche est en ligne et les propriétaires vous appellent ou vous écrivent sur WhatsApp.'],
      ]}
      avantages={[
        { titre: 'Une page par ville et par métier', texte: 'Votre fiche apparaît sur les pages « Conciergerie Airbnb à {votre ville} » et de votre région, faites pour être trouvées sur Google.' },
        { titre: 'Des clients qui cherchent déjà', texte: 'Les visiteurs de l’annuaire sont des propriétaires qui louent leur logement et ont besoin d’aide maintenant.' },
        { titre: 'Aucune commission', texte: 'Vous fixez vos prix et vous facturez directement vos clients.' },
        { titre: 'Vos coordonnées protégées', texte: 'Votre téléphone s’affiche seulement à la demande et votre WhatsApp passe par un bouton : pas de démarchage automatique.' },
      ]}
      apres={
        <section aria-labelledby="metiers" className="flex flex-col gap-4">
          <h2 id="metiers" className="text-[26px] font-bold tracking-[-0.025em] sm:text-[32px]">
            Les métiers de l’annuaire
          </h2>
          <ul className="flex flex-wrap gap-2">
            {METIERS.map(m => (
              <li key={m.slug}>
                <Link
                  href={`/prestataires/${m.slug}`}
                  className="flex min-h-[44px] items-center rounded-full bg-surface px-4 text-base font-semibold text-ink no-underline hover:bg-brand-soft hover:text-brand-strong"
                >
                  {m.court}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      }
      questions={[
        { q: 'L’inscription dans l’annuaire est-elle gratuite ?', r: 'Oui, pour le moment l’inscription est gratuite. Si cela change un jour, le prix sera affiché sur cette page avant toute inscription. Dans tous les cas, LocaDirect ne prend aucune commission sur vos prestations.' },
        { q: 'Comment trouver des propriétaires quand on lance sa conciergerie ?', r: 'Soyez visible là où ils cherchent : une fiche complète avec photos et tarifs dans l’annuaire LocaDirect, votre fiche Google, et le bouche-à-oreille des premiers clients. Les propriétaires de LocaDirect louent en direct et cherchent justement des relais locaux.' },
        { q: 'Pourquoi demander mon SIRET ?', r: 'Pour vérifier que votre activité existe avant de publier la fiche. Il n’est pas affiché sur le site.' },
        { q: 'Puis-je proposer plusieurs services ?', r: 'Oui, vous pouvez créer une fiche par métier, par exemple une pour la conciergerie et une pour le ménage.' },
      ]}
    />
  )
}
