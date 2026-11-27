import type { Metadata } from 'next'
import PageLegale from '@/components/legal/PageLegale'

export const metadata: Metadata = {
  title: 'Politique de confidentialité',
  description: 'Quelles données LocaDirect collecte, pourquoi, combien de temps elles sont gardées et comment exercer vos droits.',
  alternates: { canonical: '/politique-confidentialite' },
}

const mail = <a href="mailto:contact@seokraft.fr">contact@seokraft.fr</a>

export default function ConfidentialitePage() {
  return (
    <PageLegale titre="Politique de confidentialité" maj="27 novembre 2026">
      <p>
        Cette page explique quelles données personnelles LocaDirect utilise, pourquoi, et comment vous gardez la main
        dessus. Nous ne vendons aucune donnée et n’affichons aucune publicité.
      </p>

      <h2>Responsable du traitement</h2>
      <p>
        Marc Bretzner, entrepreneur individuel, 11 rue de la Vieille Ill, 67640 Fegersheim. Contact&nbsp;: {mail}.
      </p>

      <h2>Les données et leur usage</h2>
      <table>
        <thead>
          <tr>
            <th scope="col">Données</th>
            <th scope="col">Pourquoi</th>
            <th scope="col">Base légale</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>E-mail et mot de passe (chiffré)</td>
            <td>Créer et sécuriser votre compte</td>
            <td>Exécution du service</td>
          </tr>
          <tr>
            <td>Annonce&nbsp;: description, photos, ville, prix, numéro WhatsApp</td>
            <td>Publier le logement et permettre aux voyageurs de vous écrire</td>
            <td>Exécution du service</td>
          </tr>
          <tr>
            <td>Fiche prestataire&nbsp;: nom, SIRET, adresse du siège, téléphone, WhatsApp</td>
            <td>Vérifier l’activité et permettre aux propriétaires de vous contacter</td>
            <td>Exécution du service</td>
          </tr>
          <tr>
            <td>Favoris et alertes par ville</td>
            <td>Garder vos logements préférés, vous prévenir des nouvelles annonces</td>
            <td>Exécution du service</td>
          </tr>
          <tr>
            <td>E-mail d’inscription à la lettre d’information</td>
            <td>Vous envoyer les nouveautés du site</td>
            <td>Consentement</td>
          </tr>
          <tr>
            <td>Mesure d’audience (Google Analytics)</td>
            <td>Compter les visites et améliorer le site</td>
            <td>Consentement, voir la <a href="/cookies">page cookies</a></td>
          </tr>
          <tr>
            <td>Données techniques (adresse IP, journaux de connexion)</td>
            <td>Sécurité du site et prévention des abus</td>
            <td>Intérêt légitime</td>
          </tr>
        </tbody>
      </table>

      <h2>Ce qui est visible sur le site</h2>
      <p>
        Les annonces et les fiches de l’annuaire sont publiques. Les numéros de téléphone et de WhatsApp ne sont jamais
        écrits dans les pages&nbsp;: un visiteur vous écrit en touchant le bouton WhatsApp, et votre numéro
        (propriétaire ou prestataire) s’affiche seulement quand un visiteur le demande, pour vous appeler ou vous envoyer
        un SMS. Le SIRET, l’adresse du siège et votre e-mail ne sont jamais
        affichés.
      </p>
      <p>
        LocaDirect ne vend, ne loue et ne transmet vos coordonnées à aucun tiers à des fins commerciales. Si un
        professionnel (conciergerie, prestataire…) vous démarche, il agit de sa propre initiative et reste seul
        responsable de l’usage qu’il fait de vos données, au sens du RGPD. Vous pouvez exercer vos droits directement
        auprès de lui, et nous signaler ce démarchage à <a href="mailto:contact@seokraft.fr">contact@seokraft.fr</a>.
      </p>

      <h2>Combien de temps</h2>
      <ul>
        <li>Compte, annonces et fiches&nbsp;: tant que le compte existe. Ils sont effacés quand vous supprimez une annonce ou demandez la suppression du compte.</li>
        <li>Lettre d’information&nbsp;: jusqu’à votre désinscription.</li>
        <li>Mesure d’audience&nbsp;: 14 mois maximum chez Google.</li>
        <li>Journaux techniques&nbsp;: 12 mois maximum.</li>
      </ul>

      <h2>Qui y a accès</h2>
      <p>L’éditeur, et les prestataires techniques qui font fonctionner le site, uniquement pour ce besoin&nbsp;:</p>
      <ul>
        <li><strong>Supabase</strong>&nbsp;: base de données, stockée dans l’Union européenne&nbsp;;</li>
        <li><strong>Vercel</strong>&nbsp;: hébergement du site (États-Unis)&nbsp;;</li>
        <li><strong>Resend</strong>&nbsp;: envoi des e-mails du site (États-Unis)&nbsp;;</li>
        <li><strong>Google</strong>&nbsp;: mesure d’audience, seulement si vous l’acceptez.</li>
      </ul>
      <p>
        Les transferts vers les États-Unis sont encadrés par le cadre de protection des données UE–États-Unis (Data
        Privacy Framework) ou par les clauses contractuelles types de la Commission européenne.
      </p>

      <h2>Vos droits</h2>
      <p>
        Vous pouvez accéder à vos données, les corriger, les faire supprimer, en demander une copie, vous opposer à un
        traitement ou retirer votre consentement à tout moment. Écrivez à {mail}&nbsp;; nous répondons sous un mois.
      </p>
      <p>
        Si vous estimez que vos droits ne sont pas respectés, vous pouvez saisir la CNIL (cnil.fr, 3 place de Fontenoy,
        TSA 80715, 75334 Paris Cedex 07).
      </p>

      <h2>Sécurité</h2>
      <p>
        Les mots de passe sont chiffrés, les échanges passent par une connexion sécurisée (HTTPS) et l’accès à la base de
        données est réservé au site et à l’éditeur.
      </p>
    </PageLegale>
  )
}
