import type { Metadata } from 'next'
import Link from 'next/link'
import ArticleLayout, { articleStyles as s } from '@/components/article/ArticleLayout'
import { titreGoogle } from '@/lib/seo'

const SLUG = "cathedrales-france"
const TITRE = "Les plus belles cathédrales de France : notre sélection des 10 incontournables"
const CHAPEAU = "Notre-Dame de Paris, Chartres, Reims, Strasbourg… La France possède les plus belles cathédrales gothiques au monde."

export const metadata: Metadata = {
  title: { absolute: titreGoogle("Les plus belles cathédrales de France : guide complet") },
  description: "Notre-Dame de Paris, Chartres, Reims, Strasbourg, Bourges... La France possède certaines des plus belles cathédrales gothiques au monde. Notre sélection des 10 incontournables.",
  alternates: { canonical: `https://www.loca-direct.fr/blog/${SLUG}` },
  openGraph: { type: 'article', title: TITRE, description: CHAPEAU, url: `https://www.loca-direct.fr/blog/${SLUG}`, publishedTime: "2026-07-04" },
}

const SECTIONS = [{"id": "notre-dame-de-paris-la-renaissance-d-un-symbole", "titre": "Notre-Dame de Paris — la renaissance d'un symbole"}, {"id": "cathedrale-de-chartres-la-perfection-gothique", "titre": "Cathédrale de Chartres — la perfection gothique"}, {"id": "cathedrale-de-reims-le-sacre-des-rois-de-france", "titre": "Cathédrale de Reims — le sacre des rois de France"}, {"id": "la-sainte-chapelle-de-paris-le-chef-d-uvre-de-lumiere", "titre": "La Sainte-Chapelle de Paris — le chef-d'œuvre de lumière"}, {"id": "cathedrale-de-strasbourg-la-dentelle-de-gres-rose", "titre": "Cathédrale de Strasbourg — la dentelle de grès rose"}, {"id": "cathedrale-de-bourges-l-espace-et-la-lumiere", "titre": "Cathédrale de Bourges — l'espace et la lumière"}, {"id": "cathedrale-d-amiens-la-plus-grande-de-france", "titre": "Cathédrale d'Amiens — la plus grande de France"}, {"id": "cathedrale-de-rouen-la-cathedrale-de-monet", "titre": "Cathédrale de Rouen — la cathédrale de Monet"}, {"id": "cathedrale-de-lyon-entre-deux-fleuves", "titre": "Cathédrale de Lyon — entre deux fleuves"}, {"id": "cathedrale-de-metz-la-lanterne-divine", "titre": "Cathédrale de Metz — la lanterne divine"}]

export default function Article() {
  return (
    <ArticleLayout
      slug={SLUG}
      categorie="Patrimoine"
      titre={TITRE}
      chapeau={CHAPEAU}
      publie="2026-07-04"
      misAJour="2026-07-04"
      lecture="8 min"
      sections={SECTIONS}
    >
      <p>La France est le pays des cathédrales gothiques. Nulle part ailleurs dans le monde la concentration de chef-d’œuvres architecturaux religieux n’est aussi dense. Du XIIe au XVe siècle, des générations d’architectes, de tailleurs de pierre et de verriers ont rivalisé d’audace pour élever vers le ciel des édifices d’une beauté surnaturelle. Voici les dix que vous devez absolument voir.</p>

      <h2 id="notre-dame-de-paris-la-renaissance-d-un-symbole">Notre-Dame de Paris — la renaissance d’un symbole</h2>
      <p>Après l’incendie dévastateur d’avril 2019 et cinq ans de restauration exceptionnelle, Notre-Dame de Paris a rouvert ses portes en décembre 2024. La cathédrale retrouvée est encore plus belle que l’originale dans certains détails — les artisans ont utilisé les techniques médiévales authentiques. Construite entre 1163 et 1345, elle reste le monument le plus visité de France avec 12 millions de visiteurs par an.</p>
      <div className={s.note}>
      <p>Réservez votre visite en ligne sur le site officiel. L’entrée est gratuite mais les visites des tours nécessitent une réservation (15€).</p>
      </div>

      <h2 id="cathedrale-de-chartres-la-perfection-gothique">Cathédrale de Chartres — la perfection gothique</h2>
      <p>Classée au patrimoine mondial de l’UNESCO, la cathédrale Notre-Dame de Chartres est considérée par les spécialistes comme le chef-d’œuvre absolu de l’art gothique. Construite entre 1194 et 1220 (une vitesse record pour l’époque), elle conserve ses deux flèches d’origine et surtout ses vitraux du XIIe siècle, d’une qualité et d’une conservation exceptionnelles. Le bleu de Chartres est unique au monde.</p>

      <h2 id="cathedrale-de-reims-le-sacre-des-rois-de-france">Cathédrale de Reims — le sacre des rois de France</h2>
      <p>C’est dans cette cathédrale que 25 rois de France ont été sacrés, de Clovis à Charles X. La façade occidentale est l’une des plus riches et des mieux conservées du monde gothique, avec ses 2 303 statues. Gravement endommagée pendant la Première Guerre mondiale, elle a été entièrement restaurée. Les vitraux de Marc Chagall dans la chapelle axiale sont un incontournable.</p>

      <h2 id="la-sainte-chapelle-de-paris-le-chef-d-uvre-de-lumiere">La Sainte-Chapelle de Paris — le chef-d’œuvre de lumière</h2>
      <p>Techniquement une chapelle royale et non une cathédrale, la Sainte-Chapelle mérite néanmoins sa place dans cette liste. Construite en seulement 7 ans (1242-1248) pour abriter les reliques de la Passion, elle est recouverte sur 75% de sa surface par des vitraux du XIIIe siècle. Par temps ensoleillé, l’intérieur se transforme en un kaléidoscope de lumière colorée d’une beauté à couper le souffle.</p>

      <h2 id="cathedrale-de-strasbourg-la-dentelle-de-gres-rose">Cathédrale de Strasbourg — la dentelle de grès rose</h2>
      <p>Pendant 229 ans (1647-1874), la cathédrale de Strasbourg a été l’édifice le plus haut du monde. Son grès rose des Vosges lui donne une couleur chaude et unique. La façade occidentale, commencée en 1277, est un dentelle de pierre d’une complexité vertigineuse. À l’intérieur, l’horloge astronomique du XVIe siècle est une merveille mécanique qui sonne tous les jours à 12h30.</p>

      <h2 id="cathedrale-de-bourges-l-espace-et-la-lumiere">Cathédrale de Bourges — l’espace et la lumière</h2>
      <p>Classée au patrimoine mondial de l’UNESCO, la cathédrale Saint-Étienne de Bourges frappe par son absence de transept — une configuration rare qui crée un espace intérieur d’une ampleur impressionnante. Ses vitraux des XIIe et XIIIe siècles sont parmi les mieux conservés de France, avec des représentations narratives de la Bible d’une finesse incomparable.</p>

      <h2 id="cathedrale-d-amiens-la-plus-grande-de-france">Cathédrale d’Amiens — la plus grande de France</h2>
      <p>La cathédrale Notre-Dame d’Amiens est la plus grande cathédrale de France par son volume intérieur (200 000 m³). Son chœur, construit en seulement 40 ans (1220-1270), a servi de modèle à toutes les grandes cathédrales gothiques suivantes. Les soirs d’été, un spectacle sons et lumières restitue les couleurs originales de la façade, peinte au Moyen Âge.</p>

      <h2 id="cathedrale-de-rouen-la-cathedrale-de-monet">Cathédrale de Rouen — la cathédrale de Monet</h2>
      <p>Claude Monet a peint la façade de la cathédrale de Rouen plus de 30 fois, à différentes heures et dans différentes lumières. C’est la cathédrale gothique la plus haute de France avec sa flèche de 151 mètres. Son trésor architectural est immense : portails sculptés, verrières médiévales, tombeaux de Richard Cœur de Lion et des ducs de Normandie.</p>

      <h2 id="cathedrale-de-lyon-entre-deux-fleuves">Cathédrale de Lyon — entre deux fleuves</h2>
      <p>La primatiale Saint-Jean de Lyon, construite entre 1175 et 1480, mêle art roman et gothique dans un mariage surprenant. Son horloge astronomique du XIVe siècle sonne à 12h, 14h, 15h et 16h avec la mise en mouvement de ses figurines automatiques. Lyon, entre Rhône et Saône, mérite à elle seule un séjour de plusieurs jours.</p>

      <h2 id="cathedrale-de-metz-la-lanterne-divine">Cathédrale de Metz — la lanterne divine</h2>
      <p>Surnommée la « Lanterne du Bon Dieu », la cathédrale Saint-Étienne de Metz possède la plus grande surface vitrée de France : 6 500 m² de vitraux couvrant 70% de sa surface. Parmi eux, des vitraux de Marc Chagall et de Jacques Villon côtoient des œuvres médiévales du XIIIe siècle. Une symphonie de lumière colorée unique.</p>

      <div className={s.cta}>
        <h2>Séjournez près des plus belles cathédrales</h2>
        <p>Logements en direct à Paris, Chartres, Reims, Strasbourg… Contact direct sans commission.</p>
        <Link href="/logements" className={s.ctaButton}>
          Voir tous les logements
        </Link>
      </div>
    </ArticleLayout>
  )
}
