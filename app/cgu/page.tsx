import type { Metadata } from 'next'
import PageLegale from '@/components/legal/PageLegale'

export const metadata: Metadata = {
  title: 'Conditions d’utilisation',
  description: 'Les règles d’utilisation de LocaDirect : annonces, annuaire des prestataires, contact direct sans commission.',
  alternates: { canonical: '/cgu' },
}

export default function CGUPage() {
  return (
    <PageLegale titre="Conditions générales d’utilisation" maj="27 novembre 2026">
      <p>
        Ces conditions s’appliquent à toute personne qui utilise loca-direct.fr (LocaDirect), édité par Marc Bretzner,
        entrepreneur individuel (voir les <a href="/mentions-legales">mentions légales</a>). En utilisant le site, vous
        les acceptez.
      </p>

      <h2>1. Le service</h2>
      <p>LocaDirect permet&nbsp;:</p>
      <ul>
        <li>aux propriétaires de publier des annonces de location de vacances&nbsp;;</li>
        <li>aux prestataires (conciergerie, ménage, photo, travaux…) de figurer dans un annuaire&nbsp;;</li>
        <li>à tout visiteur de consulter les annonces et l’annuaire, et de contacter directement le propriétaire ou le prestataire, sans créer de compte.</li>
      </ul>
      <p>
        Le site est aujourd’hui entièrement gratuit. LocaDirect ne prélève aucune commission sur les locations ni sur les
        prestations. Si des options payantes sont proposées plus tard, leurs prix et conditions seront présentés avant
        tout achat, dans des conditions générales de vente distinctes.
      </p>

      <h2>2. Compte</h2>
      <p>
        Un compte n’est nécessaire que pour publier une annonce ou une fiche prestataire, et pour garder des favoris ou
        des alertes. Vous vous engagez à donner des informations exactes et à garder votre mot de passe secret. Vous
        pouvez demander la suppression de votre compte à tout moment à{' '}
        <a href="mailto:contact@seokraft.fr">contact@seokraft.fr</a>.
      </p>

      <h2>3. Annonces de logement</h2>
      <p>Le propriétaire qui publie une annonce garantit&nbsp;:</p>
      <ul>
        <li>qu’il a le droit de louer le logement (propriétaire, ou autorisé par le propriétaire)&nbsp;;</li>
        <li>que la description, les photos, le prix et les équipements sont exacts et à jour&nbsp;;</li>
        <li>qu’il respecte les règles de la location saisonnière&nbsp;: déclaration en mairie, numéro d’enregistrement là où il est exigé, taxe de séjour, limite de jours pour une résidence principale.</li>
      </ul>
      <p>
        Chaque annonce est vérifiée avant sa mise en ligne. LocaDirect peut refuser, suspendre ou retirer une annonce
        trompeuse, incomplète, en double ou contraire à la loi, en indiquant la raison au propriétaire.
      </p>

      <h2>4. Annuaire des prestataires</h2>
      <p>
        Le prestataire fournit un numéro SIRET valide et des informations exactes sur son activité. LocaDirect vérifie
        chaque fiche avant sa publication. Cette vérification n’est ni une certification, ni une garantie de la qualité
        des prestations&nbsp;: demandez toujours un devis écrit et une attestation d’assurance.
      </p>

      <h2>5. Contact direct et responsabilités</h2>
      <p>
        Le contact se fait directement par WhatsApp ou par téléphone. LocaDirect n’est pas partie au contrat de location
        ou de prestation&nbsp;: la réservation, le paiement, l’annulation et les éventuels litiges se règlent entre le
        voyageur et le propriétaire, ou entre le client et le prestataire.
      </p>
      <p>
        Pour éviter les arnaques, ne payez jamais par mandat cash, coupon prépayé ou virement vers un compte étranger, et
        méfiez-vous d’un prix anormalement bas. Nos conseils sont réunis dans{' '}
        <a href="/blog/louer-en-securite">Louer en sécurité</a>. Signalez toute annonce suspecte à{' '}
        <a href="mailto:contact@seokraft.fr">contact@seokraft.fr</a>.
      </p>

      <h2>6. Ce qui est interdit</h2>
      <ul>
        <li>publier une annonce fictive, ou un logement que l’on n’a pas le droit de louer&nbsp;;</li>
        <li>utiliser les coordonnées des annonceurs pour du démarchage ou des messages en masse&nbsp;;</li>
        <li>copier les annonces ou le contenu du site de façon automatisée&nbsp;;</li>
        <li>publier un contenu illicite, injurieux ou discriminatoire.</li>
      </ul>
      <p>En cas de manquement, LocaDirect peut supprimer le contenu concerné et fermer le compte.</p>

      <h2>Démarchage entre utilisateurs</h2>
      <p>
        LocaDirect ne vend, ne loue et ne transmet jamais les coordonnées de ses utilisateurs, et n’autorise aucun
        prestataire, conciergerie ou autre entreprise à démarcher les annonceurs en son nom. Le bouton WhatsApp et le
        numéro de téléphone d’une annonce servent uniquement à contacter le propriétaire au sujet de son logement&nbsp;:
        les utiliser pour proposer des services (conciergerie, ménage, gestion…) est interdit.
      </p>
      <p>
        Si vous recevez une proposition commerciale d’un professionnel, par WhatsApp, SMS, téléphone ou e-mail, celui-ci l’envoie de sa propre initiative et sous
        sa seule responsabilité. LocaDirect n’en est ni l’auteur ni le commanditaire, et ne peut être tenu responsable de
        son contenu ni des suites que vous lui donnez. Un professionnel de l’annuaire qui démarche les annonceurs sans
        leur accord s’expose au retrait de sa fiche et à la fermeture de son compte. Signalez-le à{' '}
        <a href="mailto:contact@seokraft.fr">contact@seokraft.fr</a>.
      </p>

      <h2>7. Disponibilité du site</h2>
      <p>
        LocaDirect fait son possible pour que le site fonctionne sans interruption, sans pouvoir le garantir. Une
        maintenance ou une panne peut le rendre momentanément indisponible.
      </p>

      <h2>8. Données personnelles</h2>
      <p>
        Leur traitement est décrit dans la <a href="/politique-confidentialite">politique de confidentialité</a> et la{' '}
        <a href="/cookies">page cookies</a>.
      </p>

      <h2>9. Modification et droit applicable</h2>
      <p>
        Ces conditions peuvent évoluer&nbsp;; la date de mise à jour figure en haut de la page. Elles sont soumises au
        droit français. En cas de désaccord, une solution amiable est recherchée en priorité en écrivant à{' '}
        <a href="mailto:contact@seokraft.fr">contact@seokraft.fr</a>.
      </p>
    </PageLegale>
  )
}
