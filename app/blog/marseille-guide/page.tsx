import type { Metadata } from 'next'
import Link from 'next/link'
import ArticleLayout, { articleStyles as s } from '@/components/article/ArticleLayout'
import { titreGoogle } from '@/lib/seo'

const SLUG = "marseille-guide"
const TITRE = "Visiter Marseille : que voir, que faire ? Le guide du local"
const CHAPEAU = "Vieux-Port, Calanques, MuCEM, Panier, bouillabaisse… Marseille comme vous ne l’avez jamais vue."

export const metadata: Metadata = {
  title: { absolute: titreGoogle("Visiter Marseille : que voir, que faire ? Guide complet") },
  description: "Vieux-Port, Calanques, MuCEM, Panier, bouillabaisse... Marseille est une ville qui ne laisse pas indifférent. Notre guide pour la découvrir comme un local.",
  alternates: { canonical: `https://www.loca-direct.fr/blog/${SLUG}` },
  openGraph: { type: 'article', title: TITRE, description: CHAPEAU, url: `https://www.loca-direct.fr/blog/${SLUG}`, publishedTime: "2026-07-04" },
}

const SECTIONS = [{"id": "les-incontournables", "titre": "Les incontournables"}, {"id": "les-calanques-la-nature-a-portee-de-ville", "titre": "Les Calanques — la nature à portée de ville"}, {"id": "la-gastronomie-marseillaise", "titre": "La gastronomie marseillaise"}, {"id": "nos-conseils-pratiques", "titre": "Nos conseils pratiques"}]

export default function Article() {
  return (
    <ArticleLayout
      slug={SLUG}
      categorie="Guides villes"
      titre={TITRE}
      chapeau={CHAPEAU}
      publie="2026-07-04"
      misAJour="2026-07-04"
      lecture="8 min"
      sections={SECTIONS}
    >
      <p>Marseille est la plus ancienne ville de France (600 ans avant J.-C.) et la deuxième ville du pays. Longtemps boudée par les touristes, elle s’est profondément transformée depuis son titre de Capitale Européenne de la Culture en 2013. Aujourd’hui, Marseille est l’une des villes les plus attachantes de France — bruyante, colorée, imprévisible, avec une mer d’un bleu électrique à 20 minutes du centre.</p>

      <h2 id="les-incontournables">Les incontournables</h2>

      <h3>Le Vieux-Port</h3>
      <p>C’est le cœur battant de Marseille depuis 2 600 ans. Chaque matin, les pêcheurs y vendent leur prise directement depuis leurs bateaux. La criée au poisson, face à la Mairie, est un spectacle vivant et authentique. Le soir, le Vieux-Port s’anime de terrasses et de restaurants. L’ombrière de Norman Foster, immense miroir d’acier poli qui reflète le port, est devenu l’un des symboles modernes de la ville.</p>

      <h3>Le MuCEM — le musée phare</h3>
      <p>Le Musée des Civilisations de l’Europe et de la Méditerranée est une œuvre d’art en soi. Son architecture en dentelle de béton, reliée par une passerelle au Fort Saint-Jean vieux de 600 ans, est spectaculaire. Les collections permanentes retracent l’histoire des civilisations méditerranéennes, mais ce sont les expositions temporaires qui font l’actualité culturelle de la ville.</p>

      <h3>Notre-Dame de la Garde — la Bonne Mère</h3>
      <p>Perchée sur son rocher à 162 mètres, Notre-Dame de la Garde est le symbole absolu de Marseille. Du haut de sa tour, la vue à 360° sur la ville, les îles du Frioul et les Calanques est inoubliable. Les Marseillais l’appellent affectueusement la « Bonne Mère » et lui vouent une dévotion sincère, quelle que soit leur religion.</p>

      <h3>Le Panier — le plus vieux quartier</h3>
      <p>Le quartier du Panier, bâti sur la colline qui domine le Vieux-Port, est le plus vieux quartier de Marseille. Ses ruelles colorées, ses escaliers, ses street-arts et ses placettes ombragées constituent une expérience unique. La Vieille Charité, ancienne aumônerie du XVIIe siècle, abrite aujourd’hui des musées et une salle de spectacle.</p>

      <h2 id="les-calanques-la-nature-a-portee-de-ville">Les Calanques — la nature à portée de ville</h2>
      <p>Les Calanques sont ce qui rend Marseille vraiment unique. Ces fjords calcaires aux eaux turquoise s’étendent sur 20 km entre Marseille et Cassis. Plusieurs calanques sont accessibles à pied depuis la ville en 1 à 2 heures de marche. Les plus belles — Morgiou, Sormiou, En-Vau, Port-Pin — nécessitent une réservation en saison pour préserver le site.</p>

      <div className={s.note}>
      <p>Entre juin et septembre, l’accès aux Calanques est réglementé en raison du risque incendie. Réservez en ligne sur le site du Parc National des Calanques. L’accès est parfois restreint les jours de grand vent.</p>
      </div>

      <h2 id="la-gastronomie-marseillaise">La gastronomie marseillaise</h2>

      <h3>La bouillabaisse — le plat mythique</h3>
      <p>La vraie bouillabaisse est un rituel. Ce n’est pas une soupe de poisson ordinaire — c’est un plat élaboré avec au minimum quatre espèces de poissons de roche, servi en deux temps : le bouillon avec les croûtons et la rouille d’abord, les poissons entiers ensuite. Comptez entre 50 et 80€ par personne dans un restaurant sérieux. Méfiez-vous des « fausses » bouillabaisses vendues 15€.</p>

      <h3>Le petit-déjeuner marseillais</h3>
      <p>Les navettes de Saint-Victor (petits biscuits à la fleur d’oranger), la tapenade, les panisses (beignets de farine de pois chiches) et les pissaladières font partie du patrimoine culinaire local.</p>

      <h3>Le marché du Cours Julien</h3>
      <p>Chaque mercredi et samedi, le marché du Cours Julien rassemble producteurs locaux, fromagers, charcutiers et viticulteurs. C’est l’endroit idéal pour goûter les saveurs de la Provence et du Languedoc.</p>

      <h2 id="nos-conseils-pratiques">Nos conseils pratiques</h2>
      <ul>
      <li><strong>Meilleure période</strong> : mai-juin et septembre. Évitez août (canicule, foules, parking impossible)</li>
      <li><strong>Transports</strong> : le métro couvre bien le centre. Louez un vélo pour longer la côte</li>
      <li><strong>Sécurité</strong> : comme dans toute grande ville, évitez de montrer vos objets de valeur dans certains quartiers. Le centre touristique est parfaitement sûr</li>
      <li><strong>Budget</strong> : plus abordable que Paris ou Nice. Un bon restaurant : 25-40€/personne</li>
      </ul>

      <div className={s.cta}>
        <h2>Logements à Marseille et en PACA</h2>
        <p>Appartements, maisons, studios. Contact direct avec les propriétaires marseillais.</p>
        <Link href="/location-vacances/provence-alpes-cote-dazur" className={s.ctaButton}>
          Voir les logements
        </Link>
      </div>
    </ArticleLayout>
  )
}
