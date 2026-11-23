import type { Metadata } from 'next'
import Link from 'next/link'
import ArticleLayout, { articleStyles as s } from '@/components/article/ArticleLayout'
import { titreGoogle } from '@/lib/seo'

const SLUG = "vignobles-alsace"
const TITRE = "Vignobles alsaciens : la Route des Vins d’Alsace"
const CHAPEAU = "Riesling, Gewurztraminer, Pinot Gris… La Route des Vins d’Alsace traverse 170 km de villages de conte de fées."

export const metadata: Metadata = {
  title: { absolute: titreGoogle("Vignobles alsaciens : la Route des Vins d'Alsace") },
  description: "Riesling, Gewurztraminer, Pinot Gris... La Route des Vins d'Alsace traverse 170 km de villages de conte de fées et de vignobles exceptionnels. Notre guide complet.",
  alternates: { canonical: `https://www.loca-direct.fr/blog/${SLUG}` },
  openGraph: { type: 'article', title: TITRE, description: CHAPEAU, url: `https://www.loca-direct.fr/blog/${SLUG}`, publishedTime: "2026-07-04" },
}

const SECTIONS = [{"id": "les-cepages-alsaciens-comprendre-avant-de-deguster", "titre": "Les cépages alsaciens — comprendre avant de déguster"}, {"id": "les-villages-incontournables-de-la-route-des-vins", "titre": "Les villages incontournables de la Route des Vins"}, {"id": "les-grands-crus-l-excellence-du-terroir-alsacien", "titre": "Les Grands Crus — l'excellence du terroir alsacien"}, {"id": "les-marches-de-noel-la-magie-en-hiver", "titre": "Les marchés de Noël — la magie en hiver"}, {"id": "conseils-pratiques", "titre": "Conseils pratiques"}]

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
      <p>La Route des Vins d’Alsace s’étire sur 170 km entre Marlenheim au nord et Thann au sud, longeant le piémont vosgien à travers une succession de villages médiévaux aux maisons à colombages et de vignobles réputés. C’est l’une des routes touristiques les plus célèbres au monde, et pour de bonnes raisons.</p>

      <h2 id="les-cepages-alsaciens-comprendre-avant-de-deguster">Les cépages alsaciens — comprendre avant de déguster</h2>

      <p>L’Alsace est la seule région viticole française à nommer ses vins d’après leurs cépages plutôt que leur appellation géographique. Les sept nobles cépages alsaciens :</p>

      <ul>
      <li><strong>Riesling</strong> — le roi des cépages alsaciens. Sec, minéral, avec une acidité caractéristique. Le meilleur allié des poissons et des crustacés.</li>
      <li><strong>Gewurztraminer</strong> — le plus parfumé, aux arômes de rose, lychee et épices. Idéal avec le foie gras et les fromages forts comme le Munster.</li>
      <li><strong>Pinot Gris</strong> — riche, puissant, aux notes de fruits secs et de miel. Parfait avec les volailles et les viandes blanches.</li>
      <li><strong>Muscat d’Alsace</strong> — sec contrairement à tous les autres muscats du monde. Arômes floraux intenses. L’apéritif alsacien par excellence.</li>
      <li><strong>Pinot Blanc</strong> — frais et fruité, le vin de tous les jours alsacien. Base du Crémant d’Alsace.</li>
      <li><strong>Sylvaner</strong> — léger, désaltérant. Parfait avec la charcuterie et la choucroute.</li>
      <li><strong>Pinot Noir</strong> — le seul rouge d’Alsace. Fruité et élégant.</li>
      </ul>

      <h2 id="les-villages-incontournables-de-la-route-des-vins">Les villages incontournables de la Route des Vins</h2>

      <h3>Riquewihr — le village le plus photogénique</h3>
      <p>Riquewihr est souvent présenté comme le plus beau village d’Alsace. Ses remparts médiévaux, ses maisons à colombages aux couleurs pastel, ses ruelles pavées et ses caves viticoles en font une carte postale vivante. C’est aussi le fief du domaine Hugel, l’une des plus grandes maisons de négoce alsaciennes. Évitez le week-end en juillet-août où l’affluence est extrême.</p>

      <h3>Kaysersberg — le village de Schweitzer</h3>
      <p>Classé parmi les Plus Beaux Villages de France, Kaysersberg était la ville natale d’Albert Schweitzer, prix Nobel de la Paix. Son château en ruines surplombe un village magnifiquement préservé avec un pont fortifié médiéval unique en Alsace. L’office de tourisme est installé dans la maison natale de Schweitzer.</p>

      <h3>Ribeauvillé — la capitale des seigneurs de Ribeaupierre</h3>
      <p>Ribeauvillé est une ville viticole animée avec trois châteaux en ruines sur les hauteurs, une Grand’Rue commerçante bordée de maisons Renaissance et de nombreuses caves ouvertes à la dégustation. Le marché du samedi matin est l’un des plus authentiques de la région.</p>

      <h3>Eguisheim — le berceau des vins d’Alsace</h3>
      <p>Eguisheim est considéré comme le berceau du vignoble alsacien — c’est ici que le pape Léon IX naquit en 1002. Le village est organisé en cercles concentriques autour de son château octogonal. Ses maisons à colombages, toutes ornées de géraniums rouges en été, ont valu à ce village son classement parmi les « Plus Beaux Villages de France ».</p>

      <h2 id="les-grands-crus-l-excellence-du-terroir-alsacien">Les Grands Crus — l’excellence du terroir alsacien</h2>

      <p>L’Alsace compte 51 Grands Crus, des parcelles délimitées aux terroirs d’exception. Les plus réputés :</p>

      <ul>
      <li><strong>Schlossberg</strong> (Kaysersberg) — premier Grand Cru alsacien classifié (1975). Granit rose. Rieslings d’une finesse exceptionnelle.</li>
      <li><strong>Rangen</strong> (Thann) — le plus au sud et le plus escarpé. Sols volcaniques. Les vins les plus puissants d’Alsace.</li>
      <li><strong>Sommerberg</strong> (Niedermorschwihr) — granit. Rieslings droits et minéraux qui vieillissent 20 ans et plus.</li>
      <li><strong>Hengst</strong> (Wintzenheim) — calcaires et marnes. Gewurztraminers d’exception.</li>
      </ul>

      <h2 id="les-marches-de-noel-la-magie-en-hiver">Les marchés de Noël — la magie en hiver</h2>
      <p>La Route des Vins d’Alsace en décembre est une expérience magique. Les marchés de Noël d’Alsace sont les plus anciens de France (Strasbourg depuis 1570) et parmi les plus beaux au monde. Vin chaud, bretzels, pain d’épices, décorations artisanales — la magie de Noël opère pleinement dans ce décor médiéval illuminé.</p>

      <h2 id="conseils-pratiques">Conseils pratiques</h2>
      <ul>
      <li><strong>Meilleure période</strong> : septembre-octobre (vendanges, couleurs d’automne) et décembre (marchés de Noël)</li>
      <li><strong>Se déplacer</strong> : vélo idéal pour la route des vins (pistes cyclables tout du long). Voiture pour les Grands Crus plus isolés</li>
      <li><strong>Dégustations</strong> : la plupart des caves proposent des dégustations gratuites ou payantes. Appelez avant de venir en haute saison</li>
      <li><strong>Hébergement</strong> : les gîtes et chambres d’hôtes chez les vignerons offrent une expérience authentique unique</li>
      </ul>

      <div className={s.cta}>
        <h2>Logements au cœur des vignobles alsaciens</h2>
        <p>Gîtes chez les vignerons, maisons à colombages, appartements en vieille ville. Contact direct sans commission.</p>
        <Link href="/location-vacances/grand-est" className={s.ctaButton}>
          Voir les logements en Alsace
        </Link>
      </div>
    </ArticleLayout>
  )
}
