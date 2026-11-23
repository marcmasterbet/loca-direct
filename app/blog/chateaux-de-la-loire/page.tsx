import type { Metadata } from 'next'
import Link from 'next/link'
import ArticleLayout, { articleStyles as s } from '@/components/article/ArticleLayout'
import { titreGoogle } from '@/lib/seo'

const SLUG = "chateaux-de-la-loire"
const TITRE = "Les châteaux de la Loire : guide complet pour organiser votre visite"
const CHAPEAU = "Chambord, Chenonceau, Amboise, Villandry… La vallée de la Loire classée au patrimoine mondial de l’UNESCO."

export const metadata: Metadata = {
  title: { absolute: titreGoogle("Les châteaux de la Loire : guide de visite complet") },
  description: "Chambord, Chenonceau, Amboise, Villandry... La vallée de la Loire est classée au patrimoine mondial de l'UNESCO. Notre guide pour planifier votre visite.",
  alternates: { canonical: `https://www.loca-direct.fr/blog/${SLUG}` },
  openGraph: { type: 'article', title: TITRE, description: CHAPEAU, url: `https://www.loca-direct.fr/blog/${SLUG}`, publishedTime: "2026-07-04" },
}

const SECTIONS = [{"id": "chambord-le-plus-grand-et-le-plus-spectaculaire", "titre": "Chambord — le plus grand et le plus spectaculaire"}, {"id": "chenonceau-le-chateau-des-dames", "titre": "Chenonceau — le château des Dames"}, {"id": "amboise-le-chateau-ou-est-mort-leonard-de-vinci", "titre": "Amboise — le château où est mort Léonard de Vinci"}, {"id": "villandry-les-plus-beaux-jardins", "titre": "Villandry — les plus beaux jardins"}, {"id": "azay-le-rideau-l-ile-enchantee", "titre": "Azay-le-Rideau — l'île enchantée"}, {"id": "tableau-recapitulatif-des-principaux-chateaux", "titre": "Tableau récapitulatif des principaux châteaux"}, {"id": "comment-organiser-votre-sejour", "titre": "Comment organiser votre séjour"}, {"id": "le-meilleur-moment-pour-visiter", "titre": "Le meilleur moment pour visiter"}]

export default function Article() {
  return (
    <ArticleLayout
      slug={SLUG}
      categorie="Patrimoine"
      titre={TITRE}
      chapeau={CHAPEAU}
      publie="2026-07-04"
      misAJour="2026-07-04"
      lecture="9 min"
      sections={SECTIONS}
    >
      <p>La vallée de la Loire est classée au patrimoine mondial de l’UNESCO depuis 2000. Sur 280 km entre Chalonnes-sur-Loire et Sully-sur-Loire, cette région concentre plus de 300 châteaux, témoins de la présence royale pendant les XVe et XVIe siècles. C’est ici que les rois de France ont développé l’art de vivre à la Renaissance, mêlant architecture italienne et génie français.</p>

      <h2 id="chambord-le-plus-grand-et-le-plus-spectaculaire">Chambord — le plus grand et le plus spectaculaire</h2>
      <p>Chambord est un château-monde. Avec ses 440 pièces, ses 365 cheminées et sa forêt de 5 440 hectares (la plus grande forêt close d’Europe), il est à la mesure de l’ambition de François Ier qui l’a commandé. Son escalier à double révolution, attribué à Léonard de Vinci, est un chef-d’œuvre de génie : deux personnes peuvent monter et descendre simultanément sans jamais se croiser. Les toits terrasses, avec leur skyline de dômes et de cheminées, offrent un panorama inoubliable.</p>
      <div className={s.note}>
      <p>À ne pas manquer : le spectacle équestre « Ainsi Soie-t-il » le soir en saison. Le domaine de Chambord est ouvert aux vélos — c’est la meilleure façon de découvrir la forêt et d’observer les cerfs à l’aube.</p>
      </div>

      <h2 id="chenonceau-le-chateau-des-dames">Chenonceau — le château des Dames</h2>
      <p>Chenonceau est le château le plus visité de France après Versailles. Sa situation unique — enjambant le Cher sur un pont à cinq arches — et ses jardins dessinés par Diane de Poitiers et Catherine de Médicis en font une œuvre d’art totale. L’histoire des femmes qui l’ont habité est fascinante : Diane de Poitiers y a régné, Catherine de Médicis l’a repris à sa mort, puis Louise de Lorraine l’a transformé en château de deuil après l’assassinat d’Henri III.</p>

      <h2 id="amboise-le-chateau-ou-est-mort-leonard-de-vinci">Amboise — le château où est mort Léonard de Vinci</h2>
      <p>Amboise est intimement lié à Léonard de Vinci, qui y a passé les trois dernières années de sa vie (1516-1519) au Clos Lucé, à 500 mètres du château royal. Le château d’Amboise domine la ville et la Loire depuis un promontoire rocheux. La chapelle Saint-Hubert abrite ce qui serait le tombeau de Léonard de Vinci. Le Clos Lucé, résidence du maître, présente des maquettes de ses inventions — indispensable pour les enfants.</p>

      <h2 id="villandry-les-plus-beaux-jardins">Villandry — les plus beaux jardins</h2>
      <p>Villandry est le seul grand château de la Loire dont les jardins ont été entièrement restaurés dans leur état d’origine Renaissance. Ses jardins d’ornement et potagers géométriques, étalés sur trois terrasses, sont uniques en Europe. Au printemps et en été, les 52 000 légumes et 40 000 fleurs créent des tapis colorés d’une précision stupéfiante. L’entretien mobilise une équipe de 9 jardiniers à plein temps.</p>

      <h2 id="azay-le-rideau-l-ile-enchantee">Azay-le-Rideau — l’île enchantée</h2>
      <p>Construit entre 1518 et 1527 sur une île de l’Indre, Azay-le-Rideau est un joyau de l’architecture Renaissance. Sa façade blanche reflétée dans les douves, ses tourelles d’angle et ses fenêtres à meneaux en font l’un des châteaux les plus élégants de la Loire. Son escalier intérieur à rampes droites, novateur pour l’époque, a influencé toute l’architecture française.</p>

      <h2 id="tableau-recapitulatif-des-principaux-chateaux">Tableau récapitulatif des principaux châteaux</h2>
      <div className={s.tableWrap}>
      <table>
      <thead>
      <tr>
      <th>Château</th>
      <th>Point fort</th>
      <th>Durée visite</th>
      <th>Idéal pour</th>
      </tr>
      </thead>
      <tbody>
      <tr><td>Chambord</td><td>Architecture, nature, toits</td><td>3-4h</td><td>Tout public</td></tr>
      <tr><td>Chenonceau</td><td>Cadre, jardins, histoire</td><td>2-3h</td><td>Couples, familles</td></tr>
      <tr><td>Amboise + Clos Lucé</td><td>Da Vinci, vue sur Loire</td><td>3-4h</td><td>Familles, curieux</td></tr>
      <tr><td>Villandry</td><td>Jardins extraordinaires</td><td>2-3h</td><td>Amoureux des jardins</td></tr>
      <tr><td>Azay-le-Rideau</td><td>Élégance, reflets dans l’eau</td><td>1-2h</td><td>Amateurs d’architecture</td></tr>
      <tr><td>Blois</td><td>4 styles architecturaux</td><td>2h</td><td>Passionnés d’histoire</td></tr>
      <tr><td>Cheverny</td><td>Meublé, chasse, Tintin</td><td>2h</td><td>Familles, Tintin fans</td></tr>
      </tbody>
      </table>
      </div>

      <h2 id="comment-organiser-votre-sejour">Comment organiser votre séjour</h2>

      <h3>En 2 jours</h3>
      <p><strong>Jour 1</strong> : Chambord (matin) + Cheverny (après-midi) + Blois (soirée)<br/><strong>Jour 2</strong> : Chenonceau (matin) + Amboise et Clos Lucé (après-midi)</p>

      <h3>En 4-5 jours</h3>
      <p>Ajoutez Villandry, Azay-le-Rideau, une balade à vélo sur la Loire à Vélo (800 km de pistes cyclables balisées) et la dégustation de vins locaux (Chinon, Bourgueil, Vouvray).</p>

      <h2 id="le-meilleur-moment-pour-visiter">Le meilleur moment pour visiter</h2>
      <ul>
      <li><strong>Mai-juin</strong> — idéal. Jardins en fleurs, foules modérées, temps agréable</li>
      <li><strong>Juillet-août</strong> — haute saison. Réservez les billets en ligne à l’avance</li>
      <li><strong>Septembre-octobre</strong> — excellent. Moins de monde, lumières d’automne magnifiques</li>
      <li><strong>Décembre-janvier</strong> — Chambord en hiver sous la neige : magique mais vérifiez les horaires</li>
      </ul>

      <div className={s.cta}>
        <h2>Logements au cœur du Val de Loire</h2>
        <p>Maisons de maître, gîtes de charme, châteaux en location. Contact direct sans commission.</p>
        <Link href="/location-vacances/centre-val-de-loire" className={s.ctaButton}>
          Voir les logements
        </Link>
      </div>
    </ArticleLayout>
  )
}
