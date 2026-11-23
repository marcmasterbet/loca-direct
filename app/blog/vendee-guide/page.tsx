import type { Metadata } from 'next'
import Link from 'next/link'
import ArticleLayout, { articleStyles as s } from '@/components/article/ArticleLayout'
import { titreGoogle } from '@/lib/seo'

const SLUG = "vendee-guide"
const TITRE = "Tour en Vendée : que voir, que faire ? Le guide complet"
const CHAPEAU = "Puy du Fou, Marais Poitevin, plages atlantiques… La Vendée réserve bien des surprises."

export const metadata: Metadata = {
  title: { absolute: titreGoogle("Tour en Vendée : que voir et que faire ? Guide complet") },
  description: "Puy du Fou, Marais Poitevin, plages du littoral atlantique... La Vendée réserve bien des surprises. Notre guide pour un séjour réussi.",
  alternates: { canonical: `https://www.loca-direct.fr/blog/${SLUG}` },
  openGraph: { type: 'article', title: TITRE, description: CHAPEAU, url: `https://www.loca-direct.fr/blog/${SLUG}`, publishedTime: "2026-07-04" },
}

const SECTIONS = [{"id": "le-puy-du-fou-une-experience-hors-du-commun", "titre": "Le Puy du Fou — une expérience hors du commun"}, {"id": "le-marais-poitevin-la-venise-verte", "titre": "Le Marais Poitevin — la Venise verte"}, {"id": "le-littoral-250-km-de-cotes-atlantiques", "titre": "Le littoral — 250 km de côtes atlantiques"}, {"id": "le-patrimoine-historique", "titre": "Le patrimoine historique"}, {"id": "la-gastronomie-vendeenne", "titre": "La gastronomie vendéenne"}]

export default function Article() {
  return (
    <ArticleLayout
      slug={SLUG}
      categorie="Guides régionaux"
      titre={TITRE}
      chapeau={CHAPEAU}
      publie="2026-07-04"
      misAJour="2026-07-04"
      lecture="7 min"
      sections={SECTIONS}
    >
      <p>La Vendée est l’un des départements français qui réserve le plus de surprises. Souvent associée à ses plages atlantiques, elle cache un patrimoine historique exceptionnel, des paysages variés entre marais, bocage et littoral, et surtout le Puy du Fou, régulièrement élu meilleur parc d’attractions du monde. Tour d’horizon de tout ce que vous ne pouvez pas manquer.</p>

      <h2 id="le-puy-du-fou-une-experience-hors-du-commun">Le Puy du Fou — une expérience hors du commun</h2>
      <p>Le Puy du Fou n’est pas un parc d’attractions ordinaire. C’est un spectacle vivant à ciel ouvert où 1 900 acteurs bénévoles reconstituent l’histoire de la Vendée avec des décors grandioses, des effets spéciaux époustouflants et une mise en scène cinématographique. Le Cinéscénie, le spectacle nocturne du vendredi et samedi soir, est le plus grand spectacle de nuit au monde.</p>
      <div className={s.note}>
      <p>Réservez plusieurs mois à l’avance pour juillet-août. Prévoyez 2 jours minimum pour tout voir. Le Grand Parc est ouvert d’avril à novembre.</p>
      </div>

      <h2 id="le-marais-poitevin-la-venise-verte">Le Marais Poitevin — la Venise verte</h2>
      <p>Le Marais Poitevin est l’un des plus grands marais de France. Ses canaux ombragés par les frênes et les aulnes créent un paysage d’une beauté étrange et apaisante, surnommé la « Venise verte ». La visite en barque plate est incontournable — les bateliers vous guident silencieusement sous un couvert végétal d’un vert intense. Un moment de sérénité absolue.</p>

      <h2 id="le-littoral-250-km-de-cotes-atlantiques">Le littoral — 250 km de côtes atlantiques</h2>

      <h3>Saint-Jean-de-Monts</h3>
      <p>L’une des stations balnéaires les plus appréciées des familles. Ses 13 km de plage de sable fin, ses pistes cyclables (65 km !) et ses nombreuses activités nautiques en font une destination idéale avec des enfants.</p>

      <h3>Les Sables-d’Olonne</h3>
      <p>Ville la plus touristique de Vendée, Les Sables est connue pour sa plage monumentale de 2,5 km en plein cœur de ville et pour être le port d’arrivée du Vendée Globe, la course à la voile en solitaire autour du monde. Le vieux quartier de La Chaume, de l’autre côté du chenal, vaut la visite.</p>

      <h3>L’Île de Noirmoutier</h3>
      <p>Accessible par le pont ou, à marée basse uniquement, par le Passage du Gois (4,5 km de route submersible), Noirmoutier est une île douce et lumineuse avec ses marais salants, ses mimosas et ses plages abritées. La pomme de terre de Noirmoutier, la Bonnotte, est la plus chère du monde.</p>

      <h2 id="le-patrimoine-historique">Le patrimoine historique</h2>

      <h3>Le Château des Ducs de La Trémoïlle à Tiffauges</h3>
      <p>Les ruines impressionnantes du château de Barbe-Bleue (Gilles de Rais) dominent la vallée de la Crûme. Un site médiéval exceptionnel avec des animations historiques en saison.</p>

      <h3>Le Mémorial de Vendée</h3>
      <p>À Saint-Laurent-sur-Sèvre, ce mémorial retrace l’histoire des Guerres de Vendée (1793-1796), l’un des épisodes les plus dramatiques de la Révolution française. Un lieu de mémoire sobre et émouvant.</p>

      <h2 id="la-gastronomie-vendeenne">La gastronomie vendéenne</h2>
      <ul>
      <li><strong>La brioche vendéenne</strong> — tressée et parfumée à la fleur d’oranger, elle n’a rien à voir avec la brioche industrielle</li>
      <li><strong>Le préfou</strong> — pain à l’ail chaud, spécialité de charcutier, parfait à l’apéritif</li>
      <li><strong>Les huîtres de Noirmoutier</strong> — élevées dans des eaux exceptionnelles</li>
      <li><strong>Le jambon de Vendée</strong> — séché et fumé selon des méthodes traditionnelles</li>
      <li><strong>Le muscadet</strong> — le vin blanc sec et minéral de la Loire, parfait avec les fruits de mer</li>
      </ul>

      <div className={s.cta}>
        <h2>Trouvez votre logement en Vendée</h2>
        <p>Maisons de vacances, gîtes ruraux, appartements côtiers. Contact direct sans commission.</p>
        <Link href="/location-vacances/pays-de-la-loire" className={s.ctaButton}>
          Voir les logements en Vendée
        </Link>
      </div>
    </ArticleLayout>
  )
}
