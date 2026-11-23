import type { Metadata } from 'next'
import Link from 'next/link'
import ArticleLayout, { articleStyles as s } from '@/components/article/ArticleLayout'
import { titreGoogle } from '@/lib/seo'

const SLUG = "zoo-sigean-reserve"
const TITRE = "Réserve Africaine de Sigean : visite, animaux et conseils pratiques"
const CHAPEAU = "La plus grande réserve animalière d’Europe. Girafes, rhinocéros, lions en liberté… Notre guide complet."

export const metadata: Metadata = {
  title: { absolute: titreGoogle("Réserve Africaine de Sigean : visite, animaux, conseils pratiques") },
  description: "La plus grande réserve animalière d'Europe vous accueille en Occitanie. Girafes, rhinocéros, lions en liberté... Notre guide complet pour une visite inoubliable.",
  alternates: { canonical: `https://www.loca-direct.fr/blog/${SLUG}` },
  openGraph: { type: 'article', title: TITRE, description: CHAPEAU, url: `https://www.loca-direct.fr/blog/${SLUG}`, publishedTime: "2026-07-04" },
}

const SECTIONS = [{"id": "les-animaux-a-ne-pas-manquer", "titre": "Les animaux à ne pas manquer"}, {"id": "organisation-de-la-visite", "titre": "Organisation de la visite"}, {"id": "conseils-pratiques", "titre": "Conseils pratiques"}, {"id": "les-alentours-que-faire-pres-de-sigean", "titre": "Les alentours — que faire près de Sigean ?"}]

export default function Article() {
  return (
    <ArticleLayout
      slug={SLUG}
      categorie="Famille & Activités"
      titre={TITRE}
      chapeau={CHAPEAU}
      publie="2026-07-04"
      misAJour="2026-07-04"
      lecture="6 min"
      sections={SECTIONS}
    >
      <p>À 15 km au sud de Narbonne, en bordure de l’étang de Sigean, la Réserve Africaine de Sigean est la plus grande réserve animalière d’Europe. Sur 300 hectares de garrigue méditerranéenne et de zones humides, près de 3 800 animaux de 160 espèces différentes vivent en semi-liberté. Une expérience unique qui n’a rien à envier aux plus grands parcs africains.</p>

      <h2 id="les-animaux-a-ne-pas-manquer">Les animaux à ne pas manquer</h2>

      <h3>Le Parc des Lions — l’expérience la plus intense</h3>
      <p>La traversée du parc des lions en voiture est l’expérience la plus mémorable de la réserve. Les lions se déplacent librement autour des voitures, parfois à quelques centimètres. Les vitres restent fermées — c’est obligatoire et on comprend vite pourquoi. Comptez 15 à 30 minutes pour traverser ce parc selon l’activité des animaux.</p>
      <div className={s.note}>
      <p>Ne jamais ouvrir les fenêtres ou les portières dans les parcs de lions, ours et rhinocéros. Cette règle est strictement appliquée par les gardiens.</p>
      </div>

      <h3>Les Girafes, Zèbres et Antilopes</h3>
      <p>La grande plaine africaine de la réserve abrite des girafes, des zèbres, des gnous, des oryx et de nombreuses espèces d’antilopes. Ces animaux vivent dans un parc accessible à pied, ce qui permet une approche très proche et des photos magnifiques. Les girafes, particulièrement curieuses, s’approchent parfois des visiteurs.</p>

      <h3>Les Rhinocéros blancs</h3>
      <p>La réserve de Sigean héberge l’un des plus grands troupeaux de rhinocéros blancs d’Europe. Ces géants paisibles, pesant jusqu’à 2 500 kg, peuvent être observés de très près depuis la voiture. Un spectacle impressionnant qui rappelle qu’il faut absolument protéger ces animaux menacés d’extinction.</p>

      <h3>Les Éléphants d’Afrique</h3>
      <p>Le groupe d’éléphants de la réserve est l’un des plus importants d’Europe. Leur espace est vaste et les animaux semblent parfaitement intégrés à leur environnement. Les heures de repas (consultez le programme à l’entrée) offrent les meilleures opportunités de les observer de près.</p>

      <h2 id="organisation-de-la-visite">Organisation de la visite</h2>

      <h3>Durée recommandée</h3>
      <p>Prévoyez une journée complète. La réserve couvre 300 hectares et propose deux modes de visite : en voiture (parcours de 9 km dans les parcs africains) et à pied (8 km de sentiers dans les autres zones). Combinés, comptez 5 à 7 heures.</p>

      <h3>Le parcours en voiture</h3>
      <p>Il dessert 4 parcs accessibles uniquement en voiture : les Lions, les Ours, les Rhinocéros et la grande plaine africaine. Suivez le balisage et ne dépassez jamais les zones délimitées. La vitesse maximum est de 10 km/h.</p>

      <h3>Le parcours à pied</h3>
      <p>Les zones pédestres accueillent les oiseaux (flamants roses sur l’étang !), les primates, les félins dans des enclos sécurisés, les reptiles et une grande variété d’animaux d’Asie et d’Amérique. Des aires de pique-nique sont disponibles tout au long du parcours.</p>

      <h2 id="conseils-pratiques">Conseils pratiques</h2>
      <ul>
      <li><strong>Horaires</strong> : ouvert tous les jours de 9h à 18h (17h en hiver)</li>
      <li><strong>Tarifs</strong> : environ 30€ adulte, 25€ enfant (3-12 ans). Gratuit pour les moins de 3 ans</li>
      <li><strong>Idéal pour</strong> : familles avec enfants de tous âges, amoureux de la nature et de la photo</li>
      <li><strong>Animaux de compagnie</strong> : interdits dans la réserve</li>
      <li><strong>Meilleure saison</strong> : mai-juin et septembre (moins de monde, animaux plus actifs par temps frais)</li>
      <li><strong>À combiner avec</strong> : Narbonne et ses plages, les Corbières, Carcassonne (40 min)</li>
      </ul>

      <h2 id="les-alentours-que-faire-pres-de-sigean">Les alentours — que faire près de Sigean ?</h2>
      <ul>
      <li><strong>Narbonne</strong> (15 min) — ville gallo-romaine avec une cathédrale impressionnante et un marché couvert exceptionnel</li>
      <li><strong>Gruissan</strong> (20 min) — station balnéaire pittoresque avec son village circulaire et ses plages</li>
      <li><strong>Carcassonne</strong> (45 min) — la cité médiévale la mieux conservée d’Europe</li>
      <li><strong>Collioure</strong> (40 min) — le village des peintres fauves sur la Côte Vermeille</li>
      </ul>

      <div className={s.cta}>
        <h2>Séjournez près de Sigean</h2>
        <p>Gîtes, maisons de vacances et appartements en Occitanie. Contact direct sans commission.</p>
        <Link href="/location-vacances/occitanie" className={s.ctaButton}>
          Voir les logements en Occitanie
        </Link>
      </div>
    </ArticleLayout>
  )
}
