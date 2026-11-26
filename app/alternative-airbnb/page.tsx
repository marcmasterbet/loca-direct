import type { Metadata } from 'next'
import Link from 'next/link'
import SiteHeader from '@/components/site/SiteHeader'
import FilAriane from '@/components/pages/FilAriane'
import Faq from '@/components/pages/Faq'
import { getSessionUserId } from '@/lib/session'

// 57 caractères : sous la limite de 60 de Google
const TITRE = 'Alternative à Airbnb sans commission pour propriétaires'

export const metadata: Metadata = {
  title: { absolute: TITRE },
  description:
    'Depuis octobre 2026, Airbnb prélève 15,5 % à l’hôte. Sur LocaDirect, publier est gratuit, sans commission : les voyageurs vous écrivent directement.',
  alternates: { canonical: '/alternative-airbnb' },
  openGraph: {
    title: TITRE,
    description: 'Publiez votre location de vacances gratuitement, sans commission, et gardez 100 % de vos revenus.',
  },
}

const COMPARAISON: { critere: string; airbnb: string; loca: string }[] = [
  { critere: 'Publier une annonce', airbnb: 'Gratuit', loca: 'Gratuit' },
  { critere: 'Commission sur chaque réservation', airbnb: '15,5 % prélevés sur votre versement', loca: 'Aucune' },
  { critere: 'Contact avec le voyageur', airbnb: 'Par la messagerie Airbnb, coordonnées masquées avant réservation', loca: 'Direct, sur WhatsApp, dès la première question' },
  { critere: 'Paiement', airbnb: 'Encaissé par Airbnb, versé après l’arrivée', loca: 'Entre vous et le voyageur, selon vos conditions' },
  { critere: 'Choix du voyageur', airbnb: 'Réservation instantanée fréquente', loca: 'Vous échangez avant d’accepter' },
  { critere: 'Vos règles', airbnb: 'Conditions d’annulation et de remboursement d’Airbnb', loca: 'Votre contrat, votre acompte, votre caution' },
]

const EXEMPLES = [2000, 6000, 12000]
const euros = (n: number) => `${Math.round(n).toLocaleString('fr-FR')} €`

const QUESTIONS = [
  {
    q: 'Combien Airbnb prend-il aux propriétaires en 2026 ?',
    r: 'Depuis le 13 octobre 2026, Airbnb applique en France des frais uniques d’environ 15,5 % à la charge de l’hôte, calculés sur le prix des nuits et les frais de ménage. Pour 1 000 € de réservations, environ 155 € partent à Airbnb.',
  },
  {
    q: 'LocaDirect est-il vraiment gratuit ?',
    r: 'Oui. Publier une annonce est gratuit et LocaDirect ne prend aucune commission sur vos locations : le voyageur vous contacte et vous paie directement.',
  },
  {
    q: 'Puis-je garder mon annonce Airbnb en plus ?',
    r: 'Oui, rien ne l’interdit. Beaucoup de propriétaires gardent Airbnb pour la visibilité et publient aussi sur LocaDirect pour louer sans commission aux voyageurs qui préfèrent traiter en direct. Pensez simplement à tenir un seul calendrier à jour pour éviter les doubles réservations.',
  },
  {
    q: 'Comment me protéger sans le paiement d’Airbnb ?',
    r: 'Faites signer un contrat de location saisonnière, demandez un acompte par virement ou carte, puis le solde avant l’arrivée, et prévoyez une caution. Vérifiez aussi votre assurance habitation pour la location saisonnière.',
  },
  {
    q: 'Les voyageurs doivent-ils créer un compte ?',
    r: 'Non. Les voyageurs consultent les annonces et vous écrivent sur WhatsApp sans inscription. Seuls les propriétaires créent un compte pour publier.',
  },
]

export default async function AlternativeAirbnbPage() {
  const connecte = !!(await getSessionUserId())
  const publier = connecte ? '/espace/ma-vitrine' : '/inscription'

  return (
    <div className="bg-white text-ink">
      <SiteHeader isLoggedIn={connecte} />
      <main id="contenu" className="mx-auto flex max-w-[1080px] flex-col gap-16 px-5 pb-20 pt-4 sm:px-8 sm:pt-8">
        <FilAriane etapes={[{ nom: 'Alternative à Airbnb' }]} />

        <header className="flex max-w-[760px] flex-col gap-5">
          <h1 className="text-balance text-[34px] font-bold leading-[1.1] tracking-[-0.035em] sm:text-[52px]">
            Louez sans laisser 15,5&nbsp;% à Airbnb
          </h1>
          <p className="text-[18px] leading-relaxed text-ink-soft">
            Depuis octobre 2026, Airbnb prélève environ 15,5&nbsp;% sur chaque réservation, à la charge du seul
            propriétaire. Sur LocaDirect, vous publiez gratuitement, sans commission, et les voyageurs vous écrivent
            directement sur WhatsApp.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href={publier} className="inline-flex min-h-[52px] items-center rounded-[14px] bg-brand px-6 text-base font-bold text-white no-underline hover:bg-brand-strong">
              Publier mon logement gratuitement
            </Link>
            <Link href="/logements" className="inline-flex min-h-[52px] items-center rounded-[14px] px-5 text-base font-semibold text-ink no-underline shadow-[inset_0_0_0_1.5px_#e4e3ee] hover:bg-surface">
              Voir les annonces
            </Link>
          </div>
        </header>

        <section aria-labelledby="calcul" className="flex flex-col gap-5">
          <h2 id="calcul" className="text-[26px] font-bold tracking-[-0.025em] sm:text-[32px]">
            Ce que la commission vous coûte
          </h2>
          <p className="max-w-[640px] text-base leading-relaxed text-ink-soft">
            Montant prélevé par Airbnb à 15,5&nbsp;%, comparé à LocaDirect, pour une saison de location.
          </p>
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {EXEMPLES.map(montant => (
              <li key={montant} className="flex flex-col gap-4 rounded-[22px] bg-surface p-6">
                <p className="text-base text-ink-soft">
                  Pour <strong className="font-bold text-ink tabular-nums">{euros(montant)}</strong> de locations
                </p>
                <div className="flex items-baseline justify-between gap-3 border-b border-line pb-3">
                  <span className="text-base text-ink-soft">Airbnb</span>
                  <span className="text-[22px] font-bold tabular-nums text-[#912018]">−{euros(montant * 0.155)}</span>
                </div>
                <div className="flex items-baseline justify-between gap-3">
                  <span className="text-base text-ink-soft">LocaDirect</span>
                  <span className="text-[22px] font-bold tabular-nums text-mint-ink">0&nbsp;€</span>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="comparatif" className="flex flex-col gap-5">
          <h2 id="comparatif" className="text-[26px] font-bold tracking-[-0.025em] sm:text-[32px]">
            Airbnb ou LocaDirect, point par point
          </h2>
          <div className="overflow-hidden rounded-[22px] shadow-[0_0_0_1px_#e4e3ee]">
            <table className="w-full border-collapse text-left text-base">
              <thead className="bg-surface">
                <tr>
                  <th scope="col" className="hidden p-4 font-semibold sm:table-cell">
                    <span className="sr-only">Critère</span>
                  </th>
                  <th scope="col" className="p-4 font-semibold">Airbnb</th>
                  <th scope="col" className="p-4 font-semibold text-brand-strong">LocaDirect</th>
                </tr>
              </thead>
              <tbody>
                {COMPARAISON.map(l => (
                  <tr key={l.critere} className="border-t border-line align-top">
                    <th scope="row" className="hidden w-[28%] p-4 font-semibold sm:table-cell">
                      {l.critere}
                    </th>
                    <td className="p-4 text-ink-soft">
                      <span className="mb-1 block text-sm font-semibold text-ink sm:hidden">{l.critere}</span>
                      {l.airbnb}
                    </td>
                    <td className="bg-brand-soft/40 p-4 font-semibold text-ink max-sm:pt-9">
                      {l.loca}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section aria-labelledby="honnete" className="grid grid-cols-1 gap-8 rounded-[26px] bg-dog-soft p-6 sm:p-10 lg:grid-cols-2">
          <div className="flex flex-col gap-3">
            <h2 id="honnete" className="text-[24px] font-bold tracking-[-0.02em] sm:text-[28px]">
              Ce qu’Airbnb fait et que nous ne faisons pas
            </h2>
            <p className="text-base leading-relaxed text-ink-soft">
              Airbnb encaisse le paiement à votre place et propose sa propre garantie en cas de dégâts. En louant en
              direct, ces deux points reposent sur vous. Ils se gèrent très bien avec quelques réflexes.
            </p>
          </div>
          <ul className="flex flex-col gap-3 text-base leading-relaxed text-ink-soft">
            <li>
              <strong className="font-semibold text-ink">Un contrat de location saisonnière</strong> signé avant
              l’arrivée, avec les dates, le prix et les conditions d’annulation.
            </li>
            <li>
              <strong className="font-semibold text-ink">Un acompte</strong> à la réservation, puis le solde avant
              l’arrivée, par virement ou carte.
            </li>
            <li>
              <strong className="font-semibold text-ink">Une caution</strong> rendue après l’état des lieux de sortie.
            </li>
            <li>
              <strong className="font-semibold text-ink">Votre assurance habitation</strong>, à vérifier pour la
              location saisonnière.
            </li>
            <li>
              <Link href="/blog/louer-en-securite" className="font-semibold text-brand-strong underline underline-offset-2">
                Tous nos conseils pour louer en sécurité
              </Link>
            </li>
          </ul>
        </section>

        <section aria-labelledby="etapes" className="flex flex-col gap-6">
          <h2 id="etapes" className="text-[26px] font-bold tracking-[-0.025em] sm:text-[32px]">
            Publier en trois étapes
          </h2>
          <ol className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {[
              ['Créez votre compte', 'Une adresse e-mail et un mot de passe suffisent.'],
              ['Décrivez le logement', 'Photos, prix, équipements, et votre numéro WhatsApp, affiché seulement à la demande d’un voyageur.'],
              ['Recevez les messages', 'Après relecture, l’annonce est en ligne et les voyageurs vous écrivent directement.'],
            ].map(([t, d], i) => (
              <li key={t} className="flex flex-col gap-2 rounded-[22px] p-6 shadow-[0_0_0_1px_#e4e3ee]">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-soft text-base font-bold text-brand-strong">{i + 1}</span>
                <h3 className="text-[18px] font-bold">{t}</h3>
                <p className="text-base leading-relaxed text-ink-soft">{d}</p>
              </li>
            ))}
          </ol>
          <Link href={publier} className="inline-flex min-h-[52px] items-center self-start rounded-[14px] bg-brand px-6 text-base font-bold text-white no-underline hover:bg-brand-strong">
            Publier mon logement gratuitement
          </Link>
        </section>

        <Faq questions={QUESTIONS} />

        <p className="text-sm text-muted">
          Frais Airbnb&nbsp;: frais uniques à la charge de l’hôte appliqués en France depuis le 13&nbsp;octobre&nbsp;2026,
          d’environ 15,5&nbsp;% du sous-total (nuits et frais de ménage). Le taux exact figure dans votre compte Airbnb.
        </p>
      </main>
    </div>
  )
}
