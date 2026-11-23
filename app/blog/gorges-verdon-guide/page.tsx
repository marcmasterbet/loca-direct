import type { Metadata } from 'next'
import Link from 'next/link'
import ArticleLayout, { articleStyles as s } from '@/components/article/ArticleLayout'
import { titreGoogle } from '@/lib/seo'

const SLUG = "gorges-verdon-guide"
const TITRE = "Que faire dans les Gorges du Verdon ? Le guide complet"
const CHAPEAU = "Kayak, randonnée, escalade, baignades… Le Grand Canyon européen vous attend."

export const metadata: Metadata = {
  title: { absolute: titreGoogle("Que faire dans les Gorges du Verdon ? Guide complet") },
  description: "Le Grand Canyon européen vous attend. Randonnée, kayak, escalade, baignades... Tout ce qu'il faut savoir pour visiter les Gorges du Verdon et trouver un logement.",
  alternates: { canonical: `https://www.loca-direct.fr/blog/${SLUG}` },
  openGraph: { type: 'article', title: TITRE, description: CHAPEAU, url: `https://www.loca-direct.fr/blog/${SLUG}`, publishedTime: "2026-07-04" },
}

const SECTIONS = [{"id": "les-activites-incontournables", "titre": "Les activités incontournables"}, {"id": "les-villages-a-ne-pas-manquer", "titre": "Les villages à ne pas manquer"}, {"id": "pratique-comment-organiser-son-sejour", "titre": "Pratique — comment organiser son séjour"}]

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
      <p>Surnommées le « Grand Canyon européen », les Gorges du Verdon sont l’un des sites naturels les plus spectaculaires de France. Sur 25 kilomètres, la rivière Verdon a creusé dans le calcaire des falaises atteignant 700 mètres de hauteur. L’eau, d’un vert émeraude irréel, contraste avec le blanc des falaises et le bleu du ciel provençal. Un spectacle inoubliable.</p>

      <h2 id="les-activites-incontournables">Les activités incontournables</h2>

      <h3>Kayak et canoë — la meilleure façon de découvrir les gorges</h3>
      <p>Naviguer au fond des gorges est une expérience unique. Plusieurs loueurs proposent des kayaks et canoës au départ de Castellane ou de Moustiers-Sainte-Marie. Comptez une journée complète pour le parcours intégral (25 km), ou une demi-journée pour les sections les plus accessibles. Le niveau requis est débutant pour la plupart des tronçons.</p>
      <div className={s.note}>
      <p>Réservez impérativement en juillet-août. Les loueurs affichent complet dès le mois de mai.</p>
      </div>

      <h3>Randonnée — le Sentier Martel</h3>
      <p>Le Sentier Martel est le sentier emblématique des gorges. Il longe la rivière sur 14 km, nécessitant deux heures de navette pour la logistique. La randonnée prend une journée complète et passe par des tunnels creusés dans la roche, des passerelles vertigineuses et des points de vue à couper le souffle. Niveau : intermédiaire. Chaussures de randonnée obligatoires.</p>

      <h3>Les baignades</h3>
      <p>L’eau du Verdon est fraîche même en plein été (16-18°C) mais d’une clarté absolue. Les points de baignade les plus accessibles sont au Lac de Sainte-Croix (eau plus chaude, idéale pour les familles) et à la plage des Salles-sur-Verdon. Le lac artificiel de Sainte-Croix est l’un des plus grands de France avec ses 2 200 hectares d’eau turquoise.</p>

      <h3>Escalade</h3>
      <p>Les falaises calcaires des gorges sont un paradis pour les grimpeurs. Des voies de tous niveaux sont disponibles, de l’initiation aux grandes voies pour experts. Les secteurs de la Palud-sur-Verdon et du Point Sublime sont les plus fréquentés. Des guides locaux proposent des initiations pour débutants.</p>

      <h3>La route des crêtes</h3>
      <p>Pour ceux qui préfèrent admirer les gorges depuis les hauteurs, la D23 (route des crêtes) offre des belvédères spectaculaires sur 23 km. Le belvédère de l’Escalès, avec ses 800 mètres de surplomb, est le plus impressionnant. La route est à sens unique de juin à septembre.</p>

      <h2 id="les-villages-a-ne-pas-manquer">Les villages à ne pas manquer</h2>

      <h3>Moustiers-Sainte-Marie</h3>
      <p>Ce village, accroché à la falaise avec une étoile dorée suspendue entre deux rochers, est l’un des Plus Beaux Villages de France. Célèbre pour ses faïences depuis le XVIIe siècle, ses ruelles fleuries et sa chapelle Notre-Dame-de-Beauvoir (accessible par 262 marches), Moustiers est un passage obligé.</p>

      <h3>Castellane</h3>
      <p>Porte d’entrée des gorges depuis l’est, Castellane est dominée par un rocher de 184 mètres surmonté d’une chapelle. C’est le point de départ idéal pour les activités dans les gorges. Nombreuses boutiques de loueurs et guides de canyoning.</p>

      <h2 id="pratique-comment-organiser-son-sejour">Pratique — comment organiser son séjour</h2>

      <ul>
      <li><strong>Durée idéale</strong> : 3 à 5 jours pour profiter de toutes les activités</li>
      <li><strong>Meilleure période</strong> : mai-juin ou septembre. Juillet-août : très chaud et très fréquenté</li>
      <li><strong>Base de logement</strong> : Moustiers-Sainte-Marie (côté ouest) ou Castellane (côté est)</li>
      <li><strong>Voiture indispensable</strong> : les transports en commun sont inexistants</li>
      <li><strong>Réservations</strong> : logements et activités se réservent plusieurs mois à l’avance pour la haute saison</li>
      </ul>

      <div className={s.cta}>
        <h2>Logements près des Gorges du Verdon</h2>
        <p>Mas provençaux, gîtes ruraux, maisons de village. Contact direct avec les propriétaires.</p>
        <Link href="/location-vacances/provence-alpes-cote-dazur" className={s.ctaButton}>
          Voir les logements en PACA
        </Link>
      </div>
    </ArticleLayout>
  )
}
