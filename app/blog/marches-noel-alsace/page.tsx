import type { Metadata } from 'next'
import Link from 'next/link'
import ArticleLayout, { articleStyles as s } from '@/components/article/ArticleLayout'
import { titreGoogle } from '@/lib/seo'

const SLUG = "marches-noel-alsace"
const TITRE = "Les plus beaux marchés de Noël d’Alsace : notre sélection complète"
const CHAPEAU = "Strasbourg, Colmar, Kaysersberg, Ribeauvillé… L’Alsace possède les plus beaux marchés de Noël de France."

export const metadata: Metadata = {
  title: { absolute: titreGoogle("Les plus beaux marchés de Noël d'Alsace : guide complet 2026") },
  description: "Strasbourg, Colmar, Kaysersberg, Ribeauvillé... L'Alsace possède les plus beaux marchés de Noël de France et d'Europe. Notre sélection et tous nos conseils pratiques.",
  alternates: { canonical: `https://www.loca-direct.fr/blog/${SLUG}` },
  openGraph: { type: 'article', title: TITRE, description: CHAPEAU, url: `https://www.loca-direct.fr/blog/${SLUG}`, publishedTime: "2026-07-04" },
}

const SECTIONS = [{"id": "le-marche-de-noel-de-strasbourg-le-plus-grand-et-le-plus-anc", "titre": "Le Marché de Noël de Strasbourg — le plus grand et le plus ancien"}, {"id": "le-marche-de-noel-de-colmar-le-plus-romantique", "titre": "Le Marché de Noël de Colmar — le plus romantique"}, {"id": "le-marche-de-noel-de-kaysersberg-le-plus-authentique", "titre": "Le Marché de Noël de Kaysersberg — le plus authentique"}, {"id": "ribeauville-le-marche-des-vins-chauds", "titre": "Ribeauvillé — le marché des vins chauds"}, {"id": "eguisheim-le-village-de-creches", "titre": "Eguisheim — le village de crèches"}, {"id": "hunawihr-et-zellenberg-les-secrets-bien-gardes", "titre": "Hunawihr et Zellenberg — les secrets bien gardés"}, {"id": "les-indispensables-a-gouter", "titre": "Les indispensables à goûter"}, {"id": "nos-conseils-pour-bien-preparer-votre-visite", "titre": "Nos conseils pour bien préparer votre visite"}]

export default function Article() {
  return (
    <ArticleLayout
      slug={SLUG}
      categorie="Noël en Alsace"
      titre={TITRE}
      chapeau={CHAPEAU}
      publie="2026-07-04"
      misAJour="2026-07-04"
      lecture="8 min"
      sections={SECTIONS}
    >
      <p>L’Alsace est la région des marchés de Noël. Depuis 1570 à Strasbourg — le plus ancien de France — jusqu’aux plus intimes villages du vignoble, l’Alsace vit Noël comme nulle autre région. Chaque week-end de l’Avent, des millions de visiteurs affluent de toute l’Europe pour vivre cette magie unique. Voici notre sélection des marchés que vous ne pouvez pas manquer.</p>

      <h2 id="le-marche-de-noel-de-strasbourg-le-plus-grand-et-le-plus-anc">Le Marché de Noël de Strasbourg — le plus grand et le plus ancien</h2>
      <p>Le Christkindelsmärik (Marché de l’Enfant Jésus) de Strasbourg est le plus ancien marché de Noël de France, fondé en 1570. Chaque année, ses 300 chalets en bois répartis sur 11 sites différents dans le centre historique accueillent plus de 2 millions de visiteurs pendant les 4 semaines de l’Avent. La Grande Sapin de la Place Kléber, haut de 30 mètres, est allumé chaque premier vendredi de décembre lors d’une cérémonie très suivie.</p>
      <div className={s.note}>
      <p>Dates 2026 : 27 novembre — 27 décembre</p>
      <p>Réservez votre logement 6 à 8 mois à l’avance pour les week-ends. Les prix triplent en décembre.</p>
      </div>

      <p>Les sites incontournables du marché de Strasbourg :</p>
      <ul>
      <li><strong>Place Broglie</strong> — le marché principal avec les chalets en bois, l’arbre géant et la patinoire</li>
      <li><strong>Place de la Cathédrale</strong> — face à la façade rose de Notre-Dame, ambiance inégalable</li>
      <li><strong>Place du Marché aux Cochons de Lait</strong> — le marché des saveurs, gastronomie alsacienne</li>
      <li><strong>Place du Château</strong> — le marché des arts et traditions populaires</li>
      <li><strong>Place Saint-Thomas</strong> — le marché des arts de la table</li>
      </ul>

      <h2 id="le-marche-de-noel-de-colmar-le-plus-romantique">Le Marché de Noël de Colmar — le plus romantique</h2>
      <p>Si Strasbourg est le plus grand, Colmar est le plus beau. La « Petite Venise » alsacienne avec ses canaux, ses maisons à colombages multicolores et ses ruelles pavées offre un décor de conte de fées incomparable. Ses cinq marchés thématiques se déroulent en différents points de la vieille ville, chacun avec son ambiance propre.</p>
      <ul>
      <li><strong>Marché des Dominicains</strong> — le plus traditionnel, sous les voûtes d’une église gothique</li>
      <li><strong>Marché de la Place de l’Ancienne Douane</strong> — le plus animé</li>
      <li><strong>Marché de la Petite Venise</strong> — le plus photographique, sur les berges de la Lauch</li>
      <li><strong>Marché des Jouets</strong> — Place des Six Montagnes Noires</li>
      <li><strong>Marché des Gourmets</strong> — Place de la Cathédrale</li>
      </ul>

      <h2 id="le-marche-de-noel-de-kaysersberg-le-plus-authentique">Le Marché de Noël de Kaysersberg — le plus authentique</h2>
      <p>Kaysersberg, classé parmi les Plus Beaux Villages de France, organise l’un des marchés de Noël les plus authentiques d’Alsace. Petit (une quarantaine de chalets), intime, avec des artisans locaux qui proposent des créations uniques. Pas de tourisme de masse, pas de stands de camelote — que de l’artisanat véritable. À faire absolument en semaine pour éviter l’afflux du week-end.</p>

      <h2 id="ribeauville-le-marche-des-vins-chauds">Ribeauvillé — le marché des vins chauds</h2>
      <p>Ribeauvillé propose chaque week-end de l’Avent un marché médiéval éclairé aux flambeaux. Le particularité : les stands proposent uniquement des produits régionaux et artisanaux, et le vin chaud est servi dans des verrines en verre réutilisables. L’ambiance est intimiste et chaleureuse, très différente des grands marchés urbains.</p>

      <h2 id="eguisheim-le-village-de-creches">Eguisheim — le village de crèches</h2>
      <p>Chaque maison d’Eguisheim expose une crèche dans sa fenêtre pendant l’Avent. Se promener dans les rues circulaires de ce village, lanterne à la main, est une expérience inoubliable. Le marché est petit mais délicieux — bredele (petits gâteaux alsaciens), pain d’épices maison, décorations en bois sculptées à la main.</p>

      <h2 id="hunawihr-et-zellenberg-les-secrets-bien-gardes">Hunawihr et Zellenberg — les secrets bien gardés</h2>
      <p>Ces deux petits villages du vignoble organisent des marchés confidentiels, connus principalement des habitants. Pas de foule, des prix raisonnables, une authenticité totale. Parfaits pour une escapade en couple loin de l’agitation des grands marchés.</p>

      <h2 id="les-indispensables-a-gouter">Les indispensables à goûter</h2>
      <ul>
      <li><strong>Le vin chaud (Glühwein)</strong> — évidemment. Chaque village a sa recette secrète</li>
      <li><strong>Les bredele</strong> — petits gâteaux de Noël alsaciens en dizaines de variétés</li>
      <li><strong>Le pain d’épices de Gertwiller</strong> — capital mondiale du pain d’épices à 10 min de Strasbourg</li>
      <li><strong>Les bretzel chauds</strong> — à manger immédiatement à la sortie du four</li>
      <li><strong>La soupe à l’oignon</strong> — indispensable pour se réchauffer</li>
      <li><strong>Le Flammekueche</strong> — tarte flambée au fromage blanc, lardons et oignons</li>
      <li><strong>La Forêt Noire</strong> — le gâteau emblématique d’Alsace</li>
      </ul>

      <h2 id="nos-conseils-pour-bien-preparer-votre-visite">Nos conseils pour bien préparer votre visite</h2>
      <ul>
      <li><strong>Réservez votre logement tôt</strong> — 6 à 8 mois à l’avance pour les week-ends de décembre</li>
      <li><strong>Préférez la semaine</strong> — les marchés sont bien plus agréables du lundi au jeudi</li>
      <li><strong>Habillez-vous chaudement</strong> — les températures descendent à -5°C certaines nuits</li>
      <li><strong>Privilégiez les transports en commun</strong> — le stationnement est un cauchemar en décembre</li>
      <li><strong>Combinez plusieurs marchés</strong> — les villages sont très proches, idéal pour une journée itinérante en voiture</li>
      </ul>

      <div className={s.cta}>
        <h2>Trouvez votre logement pour Noël en Alsace</h2>
        <p>Maisons à colombages, appartements en vieille ville, gîtes de charme. Réservez vite — les logements partent des mois à l’avance.</p>
        <Link href="/blog/logement-alsace-noel" className={s.ctaButton}>
          Trouver un logement pour Noël
        </Link>
      </div>
    </ArticleLayout>
  )
}
