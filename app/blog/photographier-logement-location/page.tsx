import type { Metadata } from 'next'
import Link from 'next/link'
import ArticleLayout, { articleStyles as s } from '@/components/article/ArticleLayout'
import { titreGoogle } from '@/lib/seo'

const SLUG = "photographier-logement-location"
const TITRE = "Comment bien photographier son logement pour le louer ?"
const CHAPEAU = "Des photos de qualité peuvent doubler vos réservations. Les techniques des professionnels, applicables avec un smartphone."

export const metadata: Metadata = {
  title: { absolute: titreGoogle("Comment bien photographier son logement pour le louer ?") },
  description: "Des photos de qualité peuvent doubler vos réservations. Voici les techniques simples utilisées par les professionnels, applicables avec un simple smartphone.",
  alternates: { canonical: `https://www.loca-direct.fr/blog/${SLUG}` },
  openGraph: { type: 'article', title: TITRE, description: CHAPEAU, url: `https://www.loca-direct.fr/blog/${SLUG}`, publishedTime: "2026-07-04" },
}

const SECTIONS = [{"id": "le-materiel-votre-smartphone-suffit", "titre": "Le matériel — votre smartphone suffit"}, {"id": "la-lumiere-le-secret-de-tout", "titre": "La lumière — le secret de tout"}, {"id": "la-composition-l-art-de-montrer-l-espace", "titre": "La composition — l'art de montrer l'espace"}, {"id": "la-mise-en-scene-le-home-staging", "titre": "La mise en scène — le home staging"}, {"id": "les-photos-indispensables", "titre": "Les photos indispensables"}, {"id": "la-retouche-simple-et-rapide", "titre": "La retouche — simple et rapide"}, {"id": "faire-appel-a-un-professionnel-quand-est-ce-rentable", "titre": "Faire appel à un professionnel — quand est-ce rentable ?"}]

export default function Article() {
  return (
    <ArticleLayout
      slug={SLUG}
      categorie="Propriétaires"
      titre={TITRE}
      chapeau={CHAPEAU}
      publie="2026-07-04"
      misAJour="2026-07-04"
      lecture="7 min"
      sections={SECTIONS}
    >
      <p>
      Les photos sont la première chose que voit un futur locataire. Avant de lire la description, avant de regarder le prix, avant même de regarder la localisation — les photos déterminent si quelqu’un va s’arrêter ou passer à la suivante. Des études montrent que de bonnes photos peuvent augmenter les réservations de 40 à 60%.
      </p>

      <h2 id="le-materiel-votre-smartphone-suffit">Le matériel — votre smartphone suffit</h2>

      <p>
      Inutile d’investir dans un appareil photo professionnel. Un iPhone ou un Samsung récent fait des photos largement suffisantes. Ce qui compte, c’est la lumière et la composition, pas le matériel.
      </p>

      <ul>
      <li><strong>Smartphone récent</strong> — mode portrait désactivé pour les pièces (trop de flou artificiel)</li>
      <li><strong>Trépied</strong> — 15€ sur Amazon, essentiel pour éviter le flou et avoir des angles parfaits</li>
      <li><strong>Application</strong> — Lightroom Mobile (gratuit) pour retoucher rapidement</li>
      </ul>

      <h2 id="la-lumiere-le-secret-de-tout">La lumière — le secret de tout</h2>

      <p>
      C’est le facteur numéro un. Une pièce mal éclairée semblera sombre et triste même si elle est magnifique. Voici comment maîtriser la lumière :
      </p>

      <h3>Le bon moment</h3>
      <p>
      Photographiez le matin tôt ou en fin d’après-midi. La lumière est douce et chaude. Évitez la mi-journée (lumière trop dure) et les jours nuageux épais (lumière plate et grise).
      </p>

      <h3>Maximisez la lumière naturelle</h3>
      <ul>
      <li>Ouvrez tous les volets et rideaux au maximum</li>
      <li>Allumez toutes les lampes, même en pleine journée</li>
      <li>Si une pièce est sombre, évitez de la photographier face à la fenêtre</li>
      <li>Un miroir bien placé peut doubler la luminosité perçue</li>
      </ul>

      <h2 id="la-composition-l-art-de-montrer-l-espace">La composition — l’art de montrer l’espace</h2>

      <h3>Photographiez depuis le coin de la pièce</h3>
      <p>
      La règle d’or : placez-vous dans un coin de la pièce et photographiez vers l’angle opposé. Cette technique capture le maximum d’espace et donne une sensation de volume. Ne photographiez jamais face à un mur.
      </p>

      <h3>L’angle de prise de vue</h3>
      <p>
      Hauteur : environ 1,20 m (à la hauteur d’un plan de travail). Pas trop bas (ça déforme), pas trop haut (ça rapetisse). Le trépied est votre meilleur ami pour trouver le bon angle à chaque fois.
      </p>

      <h3>L’horizontalité</h3>
      <p>
      Vérifiez que vos photos sont parfaitement horizontales. Une photo légèrement penchée est très désagréable visuellement. Activez la grille sur votre smartphone (Paramètres › Appareil photo › Grille).
      </p>

      <h2 id="la-mise-en-scene-le-home-staging">La mise en scène — le home staging</h2>

      <p>
      Avant de photographier, préparez chaque pièce comme si vous receviez des invités importants :
      </p>

      <ol>
      <li><strong>Désencombrez</strong> — retirez tout ce qui traîne. Les photos avec des objets personnels font « appartement habité », pas « location de vacances »</li>
      <li><strong>La cuisine</strong> — un bol de fruits frais, une cafetière propre, des verres bien alignés</li>
      <li><strong>Le salon</strong> — coussins bien placés, plaid joliment posé sur le canapé, une plante verte</li>
      <li><strong>La chambre</strong> — lit fait impeccablement, oreillers bien gonflés, lumière de chevet allumée</li>
      <li><strong>La salle de bain</strong> — serviettes pliées en hôtel, pas d’articles de toilette visibles</li>
      <li><strong>L’extérieur</strong> — table de jardin dressée avec quelques éléments décoratifs</li>
      </ol>

      <h2 id="les-photos-indispensables">Les photos indispensables</h2>

      <p>Une annonce efficace doit comporter au minimum 10 à 15 photos :</p>

      <ul>
      <li>Photo extérieure (façade, entrée, vue depuis la rue)</li>
      <li>2-3 photos du salon depuis différents angles</li>
      <li>2-3 photos de la cuisine</li>
      <li>1-2 photos de chaque chambre</li>
      <li>1-2 photos de la salle de bain</li>
      <li>Photos de la terrasse ou du jardin (depuis l’intérieur et de l’extérieur)</li>
      <li>Photo de la vue depuis les fenêtres si elle est belle</li>
      <li>Photo du quartier ou de la rue si l’environnement est agréable</li>
      </ul>

      <h2 id="la-retouche-simple-et-rapide">La retouche — simple et rapide</h2>

      <p>Avec Lightroom Mobile (gratuit), 3 réglages suffisent :</p>
      <ul>
      <li><strong>Exposition</strong> : +0,5 à +1 pour éclaircir légèrement</li>
      <li><strong>Blanc chaud</strong> : température légèrement vers le chaud (plus accueillant)</li>
      <li><strong>Clarté</strong> : +10 à +20 pour faire ressortir les détails</li>
      </ul>

      <p>Attention à ne pas sur-retoucher. Des photos trop parfaites créent des attentes déçues et de mauvais avis.</p>

      <h2 id="faire-appel-a-un-professionnel-quand-est-ce-rentable">Faire appel à un professionnel — quand est-ce rentable ?</h2>

      <p>
      Un photographe spécialisé en location saisonnière coûte entre 150 et 400€. Pour un logement à 80€/nuit, si les bonnes photos permettent de louer 5 nuits supplémentaires par an, l’investissement est rentabilisé en quelques mois.
      </p>

      <div className={s.note}>
      <p>Notre conseil</p>
      <p>
      Commencez par faire vos photos vous-même avec les conseils de cet article. Si après 3 mois vos résultats sont insuffisants, investissez dans un photographe professionnel. LocaDirect référence des photographes spécialisés dans votre région.
      </p>
      </div>

      <div className={s.cta}>
        <h2>Trouvez un photographe professionnel</h2>
        <p>Des photographes spécialisés en location saisonnière près de chez vous.</p>
        <Link href="/prestataires/photographe/ile-de-france" className={s.ctaButton}>
          Trouver un photographe
        </Link>
      </div>
    </ArticleLayout>
  )
}
