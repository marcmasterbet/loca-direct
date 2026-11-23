import type { Metadata } from 'next'
import PageLegale from '@/components/legal/PageLegale'
import LienCookies from '@/components/site/LienCookies'

export const metadata: Metadata = {
  title: 'Cookies',
  description: 'Les cookies utilisés par LocaDirect et comment changer votre choix à tout moment.',
  alternates: { canonical: '/cookies' },
}

export default function CookiesPage() {
  return (
    <PageLegale titre="Cookies" maj="23 novembre 2026">
      <p>
        Un cookie est un petit fichier enregistré par votre navigateur. LocaDirect en utilise très peu, et aucun pour la
        publicité.
      </p>

      <h2>Cookies indispensables</h2>
      <p>Ils font fonctionner le site et ne demandent pas votre accord.</p>
      <table>
        <thead>
          <tr>
            <th scope="col">Nom</th>
            <th scope="col">Rôle</th>
            <th scope="col">Durée</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>loca_session</td>
            <td>Vous garder connecté à votre compte</td>
            <td>30 jours</td>
          </tr>
          <tr>
            <td>ld_consentement</td>
            <td>Retenir votre choix sur la mesure d’audience (stocké dans le navigateur)</td>
            <td>6 mois</td>
          </tr>
        </tbody>
      </table>

      <h2>Mesure d’audience</h2>
      <p>
        Avec votre accord, Google Analytics compte les visites et les pages vues pour nous aider à améliorer le site. Il
        n’est chargé qu’après un clic sur «&nbsp;Accepter&nbsp;». Si vous refusez, rien n’est mesuré.
      </p>
      <table>
        <thead>
          <tr>
            <th scope="col">Nom</th>
            <th scope="col">Rôle</th>
            <th scope="col">Durée</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>_ga, _ga_*</td>
            <td>Distinguer les visiteurs et les visites (Google Analytics)</td>
            <td>13 mois</td>
          </tr>
        </tbody>
      </table>

      <h2>Changer d’avis</h2>
      <p>Votre choix est redemandé tous les 6 mois. Vous pouvez le modifier à tout moment&nbsp;:</p>
      <p>
        <LienCookies className="inline-flex min-h-[48px] items-center rounded-[14px] bg-brand px-5 text-base font-bold text-white hover:bg-brand-strong">
          Modifier mon choix
        </LienCookies>
      </p>
      <p>
        Vous pouvez aussi bloquer ou supprimer les cookies dans les réglages de votre navigateur. Pour toute question&nbsp;:{' '}
        <a href="mailto:contact@seokraft.fr">contact@seokraft.fr</a>.
      </p>
    </PageLegale>
  )
}
