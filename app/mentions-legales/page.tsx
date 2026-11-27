import type { Metadata } from 'next'
import PageLegale from '@/components/legal/PageLegale'

export const metadata: Metadata = {
  title: 'Mentions légales',
  description: 'Éditeur, hébergeur et contact du site LocaDirect, la location de vacances entre particuliers sans commission.',
  alternates: { canonical: '/mentions-legales' },
}

export default function MentionsLegalesPage() {
  return (
    <PageLegale titre="Mentions légales" maj="27 novembre 2026">
      <h2>Éditeur du site</h2>
      <p>
        Le site loca-direct.fr (LocaDirect) est édité par <strong>Marc Bretzner</strong>, entrepreneur individuel (EI).
      </p>
      <ul>
        <li>SIRET&nbsp;: 840&nbsp;384&nbsp;804&nbsp;00026, immatriculé au Registre national des entreprises (RNE)</li>
        <li>Adresse&nbsp;: 11 rue de la Vieille Ill, 67640 Fegersheim, France</li>
        <li>TVA non applicable, article 293&nbsp;B du Code général des impôts</li>
        <li>
          E-mail&nbsp;: <a href="mailto:contact@seokraft.fr">contact@seokraft.fr</a>
        </li>
      </ul>
      <p>Directeur de la publication&nbsp;: Marc Bretzner.</p>

      <h2>Hébergement</h2>
      <p>
        Le site est hébergé par <strong>Vercel Inc.</strong>, 340 S Lemon Ave #4133, Walnut, CA&nbsp;91789, États-Unis
        (vercel.com).
      </p>
      <p>
        Les données des comptes et des annonces sont stockées par <strong>Supabase Inc.</strong>, dans un centre de
        données situé dans l’Union européenne.
      </p>

      <h2>Ce que fait LocaDirect</h2>
      <p>
        LocaDirect présente des logements de vacances proposés par des particuliers et un annuaire de prestataires
        (conciergerie, ménage, photo…). Les voyageurs contactent directement le propriétaire ou le prestataire.
        LocaDirect ne prend aucune commission et n’intervient ni dans la réservation, ni dans le paiement.
      </p>
      <p>
        LocaDirect ne transmet pas les coordonnées des annonceurs et ne mandate aucun professionnel pour les démarcher.
        Toute sollicitation commerciale reçue d’un tiers relève de la seule responsabilité de son auteur.
      </p>

      <h2>Propriété intellectuelle</h2>
      <p>
        Les textes, le logo, la charte graphique et la structure du site appartiennent à l’éditeur. Les photos et
        descriptions des annonces appartiennent à leurs auteurs, qui autorisent leur affichage sur LocaDirect. Toute
        reproduction sans autorisation est interdite.
      </p>

      <h2>Signaler un contenu</h2>
      <p>
        Une annonce ou une fiche vous paraît fausse, illicite ou trompeuse&nbsp;? Écrivez à{' '}
        <a href="mailto:contact@seokraft.fr">contact@seokraft.fr</a> en indiquant l’adresse de la page et la raison du
        signalement. Nous l’examinons et retirons le contenu s’il ne respecte pas la loi ou nos{' '}
        <a href="/cgu">conditions d’utilisation</a>.
      </p>
    </PageLegale>
  )
}
