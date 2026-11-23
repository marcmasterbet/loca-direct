import type { Metadata } from 'next'
import Link from 'next/link'
import ArticleLayout, { articleStyles as s } from '@/components/article/ArticleLayout'

const SLUG = 'prix-conciergerie-airbnb'
const TITRE = 'Combien coûte une conciergerie Airbnb ? Prix, commission et frais cachés'
const CHAPEAU =
  'Commission de 15 à 30 %, forfait mensuel ou services à la carte : ce que coûte vraiment une conciergerie pour une location saisonnière, ce qui est compris, et les questions à poser avant de signer.'

export const metadata: Metadata = {
  title: { absolute: 'Prix d’une conciergerie Airbnb : commission et frais' },
  description:
    'Une conciergerie Airbnb prend en général 15 à 30 % des loyers, souvent autour de 20 %, plus le ménage. Ce qui est compris, les frais cachés et les questions à poser.',
  alternates: { canonical: `https://www.loca-direct.fr/blog/${SLUG}` },
  openGraph: {
    type: 'article',
    title: TITRE,
    description: CHAPEAU,
    url: `https://www.loca-direct.fr/blog/${SLUG}`,
    publishedTime: '2026-11-23',
  },
}

const SECTIONS = [
  { id: 'fourchette', titre: 'La fourchette de prix en 2026' },
  { id: 'modeles', titre: 'Les trois façons de payer une conciergerie' },
  { id: 'exemple', titre: 'Un exemple chiffré' },
  { id: 'caches', titre: 'Les frais qui ne se voient pas' },
  { id: 'questions', titre: 'Les questions à poser avant de signer' },
  { id: 'alternatives', titre: 'Les alternatives à la conciergerie complète' },
]

const FAQ = [
  {
    question: 'Quel est le pourcentage moyen d’une conciergerie Airbnb ?',
    reponse:
      'La plupart des conciergeries prennent entre 15 et 30 % des revenus locatifs. Le taux le plus courant tourne autour de 20 %, avec le ménage et le linge facturés en plus aux voyageurs.',
  },
  {
    question: 'Le ménage est-il compris dans la commission ?',
    reponse:
      'Rarement. Dans la majorité des offres, le ménage et le linge sont facturés à part, le plus souvent aux voyageurs sous forme de frais de ménage. Demandez si ces frais sont facturés à prix coûtant ou avec une marge.',
  },
  {
    question: 'Une conciergerie est-elle rentable pour un petit logement ?',
    reponse:
      'Elle l’est surtout si le logement est bien occupé ou si vous habitez loin. Pour un petit studio peu loué, un prestataire de ménage et un accueil ponctuel coûtent souvent moins cher qu’une gestion complète.',
  },
]

const SOURCES = [
  { titre: 'Lodgify — Combien coûte une conciergerie Airbnb ? (mis à jour en juillet 2026)', url: 'https://www.lodgify.com/fr/guides/conciergerie-airbnb/tarifs/' },
  { titre: 'Mediaterranée — Conciergerie Airbnb : tarifs et 7 points à comparer (2026)', url: 'https://www.mediaterranee.com/guides/conciergerie-airbnb-tarifs-et-7-points-comparer' },
  { titre: 'Mon Meublé Saisonnier — Frais de conciergerie Airbnb (mai 2026)', url: 'https://www.monmeublesaisonnier.com/blog/frais-conciergerie-airbnb-tarifs-rentabilite' },
  { titre: 'Lodgify — Combien coûte réellement Airbnb aux propriétaires en 2026', url: 'https://www.lodgify.com/blog/fr/combien-vous-coute-reellement-airbnb/' },
]

export default function Article() {
  return (
    <ArticleLayout
      slug={SLUG}
      categorie="Propriétaires"
      titre={TITRE}
      chapeau={CHAPEAU}
      publie="2026-11-23"
      misAJour="2026-11-23"
      lecture="7 min"
      sections={SECTIONS}
      faq={FAQ}
      sources={SOURCES}
    >
      <p>
        Accueillir les voyageurs, faire le ménage, laver le linge, répondre aux messages à 23 h : louer un logement
        de vacances prend du temps, surtout si vous habitez loin. Une conciergerie peut tout prendre en charge. Reste
        à savoir combien elle coûte réellement, au-delà du pourcentage affiché.
      </p>

      <h2 id="fourchette">La fourchette de prix en 2026</h2>
      <p>
        En France, une conciergerie prend en général <strong>entre 15 et 30 % des revenus locatifs</strong>, avec un
        taux courant de 20 à 25 %. Certaines proposent plutôt un forfait, de l’ordre de 100 à 800 € par mois selon
        le logement et les services.
      </p>
      <p>
        La formule la plus répandue reste : <strong>20 % des loyers, plus le ménage et le linge facturés aux
        voyageurs</strong>. Les grandes conciergeries nationales affichent des taux qui démarrent autour de 15 à 22 %,
        parfois avec des frais de dossier à l’entrée.
      </p>
      <div className={s.note}>
        <p>
          Ce pourcentage s’ajoute aux frais de la plateforme. Sur Airbnb, le modèle de frais à la charge de l’hôte
          représente 15,5 % du montant de la réservation, soit environ 18,6 % TVA comprise pour un hôte qui ne la
          récupère pas. En louant en direct, vous économisez cette part-là.
        </p>
      </div>

      <h2 id="modeles">Les trois façons de payer une conciergerie</h2>
      <h3>La commission sur les loyers</h3>
      <p>
        La plus courante. La conciergerie touche un pourcentage de ce que vous encaissez : elle gagne plus quand
        vous gagnez plus, ce qui aligne vos intérêts. Vérifiez sur quoi porte ce pourcentage : les nuitées seules, ou
        aussi les frais de ménage et les taxes.
      </p>
      <h3>Le forfait mensuel</h3>
      <p>
        Un montant fixe chaque mois, quel que soit le nombre de séjours. Intéressant pour un logement très bien
        rempli ; moins pour une résidence secondaire louée quelques semaines par an.
      </p>
      <h3>Les services à la carte</h3>
      <p>
        Vous ne payez que ce que vous déléguez : un accueil, un ménage, une remise de clés. C’est souvent la formule
        la plus économique quand vous gérez déjà vos annonces et vos messages vous-même.
      </p>

      <h2 id="exemple">Un exemple chiffré</h2>
      <p>
        Prenons un appartement loué 100 € la nuit, occupé 15 nuits dans le mois, soit 1 500 € de loyers. Le ménage
        est payé par les voyageurs.
      </p>
      <div className={s.tableWrap}>
        <table>
          <thead>
            <tr>
              <th>Taux de la conciergerie</th>
              <th>Ce que vous versez</th>
              <th>Ce qui vous reste (avant impôts et charges)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>15 %</td>
              <td>225 €</td>
              <td>1 275 €</td>
            </tr>
            <tr>
              <td>20 %</td>
              <td>300 €</td>
              <td>1 200 €</td>
            </tr>
            <tr>
              <td>25 %</td>
              <td>375 €</td>
              <td>1 125 €</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        Cinq points de commission représentent ici 75 € par mois, soit 900 € sur une année au même rythme : de quoi
        comparer plusieurs devis.
      </p>

      <h2 id="caches">Les frais qui ne se voient pas</h2>
      <p>Le pourcentage affiché ne dit pas tout. Faites préciser par écrit :</p>
      <ul>
        <li><strong>Les frais d’entrée</strong> : mise en service, photos, création des annonces.</li>
        <li><strong>Le ménage</strong> : facturé à prix coûtant ou avec une marge ?</li>
        <li><strong>Le linge et les produits</strong> : fournis, loués, refacturés ?</li>
        <li><strong>Les petites interventions</strong> : une ampoule, une serrure, un déplacement en urgence.</li>
        <li><strong>La TVA</strong> : le taux est-il annoncé hors taxes ou toutes taxes comprises ?</li>
        <li><strong>La durée d’engagement</strong> et le préavis pour arrêter.</li>
      </ul>

      <h2 id="questions">Les questions à poser avant de signer</h2>
      <ul className={s.checklist}>
        <li>Combien de logements gérez-vous dans ma ville, et depuis quand ?</li>
        <li>Qui fait le ménage : vos équipes ou un sous-traitant ? Avec quelle liste de contrôle ?</li>
        <li>Que se passe-t-il si un voyageur a un problème la nuit ou le week-end ?</li>
        <li>Qui encaisse les loyers, et quand me sont-ils reversés ?</li>
        <li>Les annonces, les photos et les avis restent-ils à mon nom si j’arrête ?</li>
        <li>Pouvez-vous me mettre en contact avec deux propriétaires dont vous gérez le logement ?</li>
      </ul>
      <p>
        Gardez en tête que vous restez responsable de vos obligations de loueur, comme la déclaration en mairie ou la
        taxe de séjour, même en déléguant la gestion.
      </p>

      <h2 id="alternatives">Les alternatives à la conciergerie complète</h2>
      <p>
        Si vous gérez déjà vos messages et vos réservations, vous n’avez peut-être besoin que d’un ou deux
        professionnels de confiance près du logement : un prestataire de ménage, une personne pour l’accueil, un
        artisan réactif. C’est souvent bien moins cher qu’une gestion complète.
      </p>
      <p>
        L’annuaire LocaDirect réunit justement des{' '}
        <Link href="/prestataires/conciergerie">conciergeries</Link>, des prestataires de{' '}
        <Link href="/prestataires/menage">ménage</Link> et des{' '}
        <Link href="/prestataires/photographe">photographes</Link> partout en France. Vous les contactez directement,
        sans intermédiaire et sans commission.
      </p>

      <div className={s.cta}>
        <h2>Trouvez une conciergerie près de votre logement</h2>
        <p>Comparez les professionnels de votre région et demandez-leur un devis directement sur WhatsApp.</p>
        <Link href="/prestataires/conciergerie" className={s.ctaButton}>
          Voir les conciergeries
        </Link>
      </div>
    </ArticleLayout>
  )
}
