import type { Metadata } from 'next'
import Link from 'next/link'
import ArticleLayout, { articleStyles as s } from '@/components/article/ArticleLayout'
import { titreGoogle } from '@/lib/seo'

const SLUG = "plages-corse"
const TITRE = "Les plus belles plages de Corse : notre sélection complète"
const CHAPEAU = "Palombaggia, Santa Giulia, Rondinara, Saleccia… La Corse possède les plus belles plages de France."

export const metadata: Metadata = {
  title: { absolute: titreGoogle("Les plus belles plages de Corse : guide complet") },
  description: "Eau turquoise, sable blanc, maquis parfumé... La Corse possède les plus belles plages de France. Notre sélection des incontournables par région.",
  alternates: { canonical: `https://www.loca-direct.fr/blog/${SLUG}` },
  openGraph: { type: 'article', title: TITRE, description: CHAPEAU, url: `https://www.loca-direct.fr/blog/${SLUG}`, publishedTime: "2026-07-04" },
}

const SECTIONS = [{"id": "le-sud-les-plages-de-carte-postale", "titre": "Le Sud — les plages de carte postale"}, {"id": "la-cote-ouest-grandiose-et-sauvage", "titre": "La Côte Ouest — grandiose et sauvage"}, {"id": "le-cap-corse-les-plages-secretes", "titre": "Le Cap Corse — les plages secrètes"}, {"id": "la-haute-corse-le-nord-preserve", "titre": "La Haute-Corse — le nord préservé"}, {"id": "nos-conseils-pratiques", "titre": "Nos conseils pratiques"}]

export default function Article() {
  return (
    <ArticleLayout
      slug={SLUG}
      categorie="Guides régionaux"
      titre={TITRE}
      chapeau={CHAPEAU}
      publie="2026-07-04"
      misAJour="2026-07-04"
      lecture="8 min"
      sections={SECTIONS}
    >
      <p>La Corse, surnommée l’Île de Beauté, possède plus de 200 plages. Certaines sont célèbres dans le monde entier, d’autres sont des secrets jalousement gardés par les locaux. Entre eau turquoise, sable blanc immaculé et maquis qui parfume l’air, chaque plage corse est une expérience unique.</p>

      <h2 id="le-sud-les-plages-de-carte-postale">Le Sud — les plages de carte postale</h2>

      <h3>Palombaggia — la plus photographiée de Corse</h3>
      <p>Près de Porto-Vecchio, Palombaggia est souvent classée parmi les plus belles plages d’Europe. Son sable rosé très fin, ses eaux limpides aux dégradés de turquoise et ses pins parasols en font un endroit magique. Arrivez avant 9h en juillet-août pour trouver de la place — ou hors saison pour la vivre comme vous la méritez.</p>
      <div className={s.note}>
      <p>Accès : depuis Porto-Vecchio, D468 vers le sud. Parking payant en saison (5-8€). Arrivée possible en navette depuis le village.</p>
      </div>

      <h3>Santa Giulia — la lagune parfaite</h3>
      <p>À quelques kilomètres de Palombaggia, Santa Giulia forme une baie quasi fermée avec un lagon naturel aux eaux d’un calme absolu. Idéale pour les familles avec enfants grâce aux eaux peu profondes et transparentes. Les écoles de kitesurf y sont nombreuses pour les amateurs de sports nautiques.</p>

      <h3>Rondinara — un cirque naturel époustouflant</h3>
      <p>En forme de coquille, la plage de Rondinara est entourée de collines qui la protègent du vent. Son eau cristalline permet de voir le fond à plusieurs mètres de profondeur. L’une des plus belles pour la plongée avec masque et tuba.</p>

      <h2 id="la-cote-ouest-grandiose-et-sauvage">La Côte Ouest — grandiose et sauvage</h2>

      <h3>Plage de Arone — entre falaises rouges et mer bleue</h3>
      <p>Nichée dans le golfe de Porto, classé au patrimoine mondial de l’UNESCO, la plage d’Arone est accessible par une route en lacets mais récompense largement l’effort. Les falaises de granit rouge qui la dominent créent un contraste saisissant avec l’eau bleu cobalt.</p>

      <h3>Girolata — accessible uniquement à pied ou en bateau</h3>
      <p>Ce petit village de pêcheurs est l’un des derniers endroits de France accessible uniquement à pied (2h de marche depuis Bocca à la Croce) ou en bateau depuis Porto. La récompense est à la hauteur : une plage de galets dans une baie protégée, d’une beauté absolument sauvage.</p>

      <h2 id="le-cap-corse-les-plages-secretes">Le Cap Corse — les plages secrètes</h2>

      <h3>Plage de Nonza — noire et unique</h3>
      <p>La plage de Nonza est l’une des curiosités géologiques de Corse : son sable est noir, issu de l’érosion des roches serpentines. Surplombée par une tour génoise accrochée à la falaise, elle offre un panorama à couper le souffle sur le golfe de Saint-Florent. Beaucoup moins fréquentée que les plages du Sud.</p>

      <h3>Plage de Albo — le bout du monde</h3>
      <p>Sur la côte est du Cap Corse, la plage d’Albo est l’une des plus isolées de l’île. Galets gris, eau d’une pureté exceptionnelle, pas un touriste à l’horizon en dehors de juillet-août. Pour les amoureux de solitude et de nature brute.</p>

      <h2 id="la-haute-corse-le-nord-preserve">La Haute-Corse — le nord préservé</h2>

      <h3>Lotu et Ostriconi — les joyaux de la Balagne</h3>
      <p>Dans la région de la Balagne, les plages de Lotu et d’Ostriconi font partie des plus sauvages de Corse. Leurs dunes naturelles sont protégées et leur accès est volontairement difficile pour préserver leur beauté. Ostriconi, en particulier, avec son embouchure de rivière, crée des paysages dignes de la Polynésie.</p>

      <h3>Saleccia — la reine des plages sauvages</h3>
      <p>Accessible uniquement en 4x4 sur une piste de 10 km ou en bateau depuis Saint-Florent, Saleccia est considérée par beaucoup comme la plus belle plage de Corse. 800 mètres de sable blanc quasi vierge, une eau d’une pureté absolue, entourée de pins et de maquis. Un paradis préservé.</p>

      <h2 id="nos-conseils-pratiques">Nos conseils pratiques</h2>
      <ul>
      <li><strong>Meilleure période</strong> : juin et septembre. Mer chaude, foules absentes, prix 30-40% moins chers</li>
      <li><strong>Réservez tôt</strong> : les logements près de Palombaggia partent 8-10 mois à l’avance pour août</li>
      <li><strong>Location de voiture</strong> : indispensable pour découvrir les plages sauvages</li>
      <li><strong>Respect de l’environnement</strong> : ne ramassez pas de sable, ne cueillez pas de fleurs de maquis</li>
      <li><strong>Évitez les feux de camp</strong> : la Corse est l’une des régions les plus sujettes aux incendies de forêt</li>
      </ul>

      <div className={s.cta}>
        <h2>Trouvez votre logement en Corse</h2>
        <p>Villas, maisons de village, appartements face à la mer. Contact direct avec les propriétaires corses.</p>
        <Link href="/location-vacances/corse" className={s.ctaButton}>
          Voir les logements en Corse
        </Link>
      </div>
    </ArticleLayout>
  )
}
