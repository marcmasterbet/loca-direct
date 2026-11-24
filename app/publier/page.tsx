import type { Metadata } from 'next'
import { createClient } from '@supabase/supabase-js'
import PageAcquisition from '@/components/landing/PageAcquisition'
import { getSessionUserId } from '@/lib/session'

export const revalidate = 3600

// 50 caractères : mot-clé « annonce location saisonnière gratuite »
const TITRE = 'Annonce location saisonnière gratuite, sans commission'

export const metadata: Metadata = {
  title: { absolute: TITRE },
  description:
    'Déposez gratuitement votre annonce de location de vacances : sans commission, les voyageurs vous écrivent directement sur WhatsApp.',
  alternates: { canonical: '/publier' },
  openGraph: { title: TITRE, description: 'Publiez votre location de vacances gratuitement, sans commission.' },
}

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

export default async function PublierPage() {
  const [connecte, { count: annonces }, { data: vues }] = await Promise.all([
    getSessionUserId().then(Boolean),
    supabase.from('vitrines').select('id', { count: 'exact', head: true }).eq('statut', 'active'),
    supabase.from('vitrines').select('nb_vues').eq('statut', 'active'),
  ])
  const visites = (vues || []).reduce((s, v) => s + (Number(v.nb_vues) || 0), 0)

  return (
    <PageAcquisition
      connecte={connecte}
      ariane="Publier une annonce"
      titre="Publiez votre location de vacances, gratuitement"
      intro="Déposez votre annonce en dix minutes, sans commission ni frais de service. Les voyageurs vous écrivent directement sur WhatsApp et vous louez à vos conditions."
      cta={{ href: connecte ? '/espace/ma-vitrine' : '/inscription', label: 'Déposer mon annonce gratuitement' }}
      chiffres={[
        { valeur: '0 €', label: 'de commission' },
        ...(annonces ? [{ valeur: String(annonces), label: 'annonces en ligne' }] : []),
        ...(visites > 1000 ? [{ valeur: visites.toLocaleString('fr-FR'), label: 'visites des annonces' }] : []),
      ]}
      etapes={[
        ['Créez votre compte', 'Une adresse e-mail et un mot de passe. Aucune carte bancaire demandée.'],
        ['Décrivez le logement', 'Photos, prix, équipements, et votre numéro WhatsApp, qui n’est jamais affiché sur la page.'],
        ['Recevez les demandes', 'Après vérification sous 24 à 48 heures, l’annonce est en ligne et les voyageurs vous écrivent directement.'],
      ]}
      avantages={[
        { titre: 'Aucune commission', texte: 'Le prix que vous fixez est celui que vous encaissez. Pas de frais pour vous, ni pour le voyageur.' },
        { titre: 'Le contact en direct', texte: 'Les voyageurs vous écrivent sur WhatsApp sans créer de compte. Vous échangez avant d’accepter.' },
        { titre: 'Votre numéro protégé', texte: 'Il n’apparaît jamais dans la page : les robots qui récoltent les numéros ne le trouvent pas.' },
        { titre: 'Une page vue par Google', texte: 'Chaque annonce a sa propre page, sur la carte de France et dans les pages de sa région et de sa ville.' },
        { titre: 'Les grands chiens mis en avant', texte: 'Si vous acceptez les chiens de plus de 10 kg, votre logement apparaît aussi dans la rubrique Chien accepté.' },
        { titre: 'Des annonces vérifiées', texte: 'Chaque annonce est relue avant sa mise en ligne. Les voyageurs savent qu’ils parlent à de vrais propriétaires.' },
      ]}
      questions={[
        { q: 'Déposer une annonce est-il vraiment gratuit ?', r: 'Oui. La publication est gratuite et LocaDirect ne prend aucune commission sur vos locations.' },
        { q: 'Combien de temps pour être en ligne ?', r: 'Comptez une dizaine de minutes pour remplir l’annonce, photos comprises. Elle est vérifiée puis mise en ligne sous 24 à 48 heures.' },
        { q: 'Comment les voyageurs me contactent-ils ?', r: 'Par le bouton WhatsApp de votre annonce. Votre numéro n’est jamais écrit sur la page.' },
        { q: 'Faut-il un numéro d’enregistrement ?', r: 'Il est obligatoire dans certaines communes (Paris, Lyon, Bordeaux…) pour la location courte durée. Renseignez-vous auprès de votre mairie : vous pourrez l’indiquer dans l’annonce.' },
        { q: 'Puis-je garder mes annonces sur d’autres sites ?', r: 'Oui. Tenez simplement un seul calendrier à jour pour éviter les doubles réservations.' },
      ]}
    />
  )
}
