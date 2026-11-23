import type { Metadata } from 'next'
import Link from 'next/link'
import ArticleLayout, { articleStyles as s } from '@/components/article/ArticleLayout'
import { titreGoogle } from '@/lib/seo'

const SLUG = "chateaux-illumines-alsace"
const TITRE = "Les plus beaux châteaux illuminés d’Alsace à Noël"
const CHAPEAU = "Haut-Koenigsbourg, Fleckenstein, Saint-Ulrich… Les châteaux alsaciens illuminés à Noël sont un spectacle inoubliable."

export const metadata: Metadata = {
  title: { absolute: titreGoogle("Les plus beaux châteaux illuminés d'Alsace à Noël") },
  description: "Haut-Koenigsbourg, Andlau, Fleckenstein... Les châteaux alsaciens illuminés à Noël sont un spectacle inoubliable. Notre sélection et comment les visiter.",
  alternates: { canonical: `https://www.loca-direct.fr/blog/${SLUG}` },
  openGraph: { type: 'article', title: TITRE, description: CHAPEAU, url: `https://www.loca-direct.fr/blog/${SLUG}`, publishedTime: "2026-07-04" },
}

const SECTIONS = [{"id": "le-chateau-du-haut-koenigsbourg-le-plus-grand-et-le-plus-vis", "titre": "Le château du Haut-Koenigsbourg — le plus grand et le plus visité"}, {"id": "le-chateau-du-fleckenstein-les-ruines-les-plus-spectaculaire", "titre": "Le château du Fleckenstein — les ruines les plus spectaculaires"}, {"id": "le-chateau-saint-ulrich-a-ribeauville-les-ruines-romantiques", "titre": "Le château Saint-Ulrich à Ribeauvillé — les ruines romantiques"}, {"id": "le-chateau-des-rohan-a-saverne-le-versailles-alsacien", "titre": "Le château des Rohan à Saverne — le \"Versailles alsacien\""}, {"id": "les-illuminations-de-selestat-la-ville-du-sapin-de-noel", "titre": "Les illuminations de Sélestat — la ville du sapin de Noël"}, {"id": "comment-visiter-les-chateaux-de-nuit", "titre": "Comment visiter les châteaux de nuit"}, {"id": "les-illuminations-des-villages-encore-plus-belles", "titre": "Les illuminations des villages — encore plus belles"}]

export default function Article() {
  return (
    <ArticleLayout
      slug={SLUG}
      categorie="Noël en Alsace"
      titre={TITRE}
      chapeau={CHAPEAU}
      publie="2026-07-04"
      misAJour="2026-07-04"
      lecture="6 min"
      sections={SECTIONS}
    >
      <p>L’Alsace compte plus de 70 châteaux, dont la plupart perchés sur les crêtes vosgiennes qui dominent la plaine. En décembre, plusieurs d’entre eux organisent des illuminations et des marchés de Noël exceptionnels dans leurs enceintes médiévales. Une expérience unique à la frontière du conte de fées et de l’histoire.</p>

      <h2 id="le-chateau-du-haut-koenigsbourg-le-plus-grand-et-le-plus-vis">Le château du Haut-Koenigsbourg — le plus grand et le plus visité</h2>
      <p>Dominant la plaine d’Alsace depuis ses 755 mètres d’altitude, le Haut-Koenigsbourg est le château le plus visité d’Alsace avec 500 000 visiteurs par an. Restauré par Guillaume II au début du XXe siècle, c’est l’un des châteaux forts les mieux conservés d’Europe. En décembre, le marché de Noël dans ses cours intérieures médiévales, aux flambeaux, est une expérience hors du commun.</p>
      <div>
      <p>Marché de Noël : les premiers week-ends de décembre. Accès en voiture depuis Saint-Hippolyte (10 min) ou Kintzheim. Vérifiez les dates sur le site du château chaque année.</p>
      </div>

      <h2 id="le-chateau-du-fleckenstein-les-ruines-les-plus-spectaculaire">Le château du Fleckenstein — les ruines les plus spectaculaires</h2>
      <p>À la frontière nord de l’Alsace, dans le Parc Naturel Régional des Vosges du Nord, le Fleckenstein est un château-rocher du XIIe siècle taillé directement dans le grès rose des Vosges. Ses ruines impressionnantes perchées sur un éperon rocheux offrent une vue époustouflante. En décembre, le château s’illumine et accueille un marché médiéval nocturne aux flambeaux — l’une des expériences les plus saisissantes de l’Alsace de Noël.</p>

      <h2 id="le-chateau-saint-ulrich-a-ribeauville-les-ruines-romantiques">Le château Saint-Ulrich à Ribeauvillé — les ruines romantiques</h2>
      <p>Surplombant Ribeauvillé depuis ses 530 mètres, le château Saint-Ulrich est l’un des trois châteaux qui dominent la ville. Ses ruines romantiques s’illuminent chaque soir de décembre depuis le belvédère situé juste en dessous. La vue sur la plaine alsacienne illuminée, avec les cigognes nichant sur les tours, est inoubliable.</p>

      <h2 id="le-chateau-des-rohan-a-saverne-le-versailles-alsacien">Le château des Rohan à Saverne — le « Versailles alsacien »</h2>
      <p>Le château des Rohan de Saverne, surnommé le « Versailles alsacien » pour sa façade de 144 mètres, accueille chaque année un marché de Noël dans sa cour d’honneur. Le contraste entre l’architecture néoclassique imposante et les chalets en bois illuminés crée une atmosphère unique. Le marché se tient généralement les deux premiers week-ends de décembre.</p>

      <h2 id="les-illuminations-de-selestat-la-ville-du-sapin-de-noel">Les illuminations de Sélestat — la ville du sapin de Noël</h2>
      <p>Sélestat revendique l’invention du sapin de Noël — une mention dans un registre de comptes de 1521 en atteste. Chaque décembre, la ville illumine ses rues et ses monuments avec une générosité particulière. Le château d’eau transformé en sapin géant lumineux est devenu l’un des symboles de Noël en Alsace.</p>

      <h2 id="comment-visiter-les-chateaux-de-nuit">Comment visiter les châteaux de nuit</h2>
      <ul>
      <li><strong>Habillez-vous très chaudement</strong> — les châteaux sont sur les hauteurs, les températures descendent facilement à -5°C voire -10°C</li>
      <li><strong>Chaussures de randonnée obligatoires</strong> — les chemins d’accès sont souvent en pierres ou en terre, parfois enneigés</li>
      <li><strong>Torche ou lampe frontale</strong> — indispensable pour les châteaux en ruines</li>
      <li><strong>Réservez les événements à l’avance</strong> — les marchés dans les châteaux sont contingentés</li>
      <li><strong>Prévoyez une heure de marche</strong> pour la plupart des châteaux sur les crêtes</li>
      </ul>

      <h2 id="les-illuminations-des-villages-encore-plus-belles">Les illuminations des villages — encore plus belles</h2>
      <p>Au-delà des châteaux, les villages alsaciens illuminés à Noël sont souvent encore plus beaux. Eguisheim avec ses maisons à colombages éclairées aux bougies, Riquewihr avec ses fenêtres fleuries de houx et ses guirlandes de lumière, Kaysersberg avec ses lanternes aux carrefours — chaque village a ses propres illuminations. Une promenade nocturne dans ces ruelles est l’une des expériences les plus mémorables d’Alsace.</p>

      <div className={s.cta}>
        <h2>Séjournez au pied des châteaux alsaciens</h2>
        <p>Gîtes et maisons dans les villages viticoles, à deux pas des châteaux les plus beaux d’Alsace.</p>
        <Link href="/location-vacances/grand-est" className={s.ctaButton}>
          Voir les logements en Alsace
        </Link>
      </div>
    </ArticleLayout>
  )
}
