import type { Metadata } from 'next'
import Link from 'next/link'
import ArticleLayout, { articleStyles as s } from '@/components/article/ArticleLayout'
import { titreGoogle } from '@/lib/seo'

const SLUG = "louer-sans-airbnb-proprietaire"
const TITRE = "Propriétaire : comment louer sans passer par Airbnb ?"
const CHAPEAU = "Gardez 100% de vos revenus. Voici comment mettre en location votre logement en direct et attirer des locataires sérieux."

export const metadata: Metadata = {
  title: { absolute: titreGoogle("Propriétaire : comment louer sans passer par Airbnb ?") },
  description: "Gardez 100% de vos revenus. Voici comment mettre en location votre logement en direct, attirer des locataires sérieux et sécuriser vos réservations.",
  alternates: { canonical: `https://www.loca-direct.fr/blog/${SLUG}` },
  openGraph: { type: 'article', title: TITRE, description: CHAPEAU, url: `https://www.loca-direct.fr/blog/${SLUG}`, publishedTime: "2026-07-04" },
}

const SECTIONS = [{"id": "pourquoi-quitter-les-plateformes", "titre": "Pourquoi quitter les plateformes ?"}, {"id": "le-guide-complet-pour-louer-en-direct", "titre": "Le guide complet pour louer en direct"}, {"id": "combien-pouvez-vous-gagner-de-plus", "titre": "Combien pouvez-vous gagner de plus ?"}, {"id": "les-questions-frequentes", "titre": "Les questions fréquentes"}]

export default function Article() {
  return (
    <ArticleLayout
      slug={SLUG}
      categorie="Propriétaires"
      titre={TITRE}
      chapeau={CHAPEAU}
      publie="2026-07-04"
      misAJour="2026-07-04"
      lecture="8 min"
      sections={SECTIONS}
    >
      <p>
      En France, plus de 400 000 propriétaires louent leur logement sur Airbnb. Beaucoup le font par habitude ou par manque d’alternative. Pourtant, la location directe est non seulement possible, mais souvent plus rentable et moins stressante.
      </p>

      <h2 id="pourquoi-quitter-les-plateformes">Pourquoi quitter les plateformes ?</h2>

      <p>
      Les grandes plateformes présentent des inconvénients sérieux pour les propriétaires :
      </p>

      <ul>
      <li><strong>Commission de 10 à 20%</strong> prélevée sur chaque réservation</li>
      <li><strong>Algorithme opaque</strong> qui peut déréférencer votre annonce sans explication</li>
      <li><strong>Dépendance totale</strong> — si la plateforme change ses règles, vous subissez</li>
      <li><strong>Contact filtré</strong> avec les locataires — impossible d’avoir une vraie relation</li>
      <li><strong>Avis difficiles à contester</strong> — un mauvais avis injustifié peut ruiner votre note</li>
      <li><strong>Caution limitée</strong> — Airbnb plafonne les dommages remboursables</li>
      </ul>

      <h2 id="le-guide-complet-pour-louer-en-direct">Le guide complet pour louer en direct</h2>

      <h3>Étape 1 — Créez votre vitrine en ligne</h3>
      <p>
      La première étape est d’avoir une présence en ligne propre. Sur LocaDirect, créez votre annonce gratuitement en quelques minutes. Ajoutez des photos de qualité, une description honnête et votre numéro WhatsApp. Votre annonce a sa propre URL que vous pouvez partager partout.
      </p>

      <h3>Étape 2 — Partagez sur vos réseaux</h3>
      <p>
      Facebook reste le canal numéro un pour trouver des locataires en direct. Partagez votre annonce dans les groupes de votre région, les groupes de voyageurs, les groupes de chiens (si vous acceptez les animaux), les groupes de nomades digitaux. Un partage bien fait peut générer 20 à 30 demandes en quelques heures.
      </p>

      <h3>Étape 3 — Demandez à votre réseau</h3>
      <p>
      Famille, amis, collègues, anciens locataires — votre réseau est votre meilleur apporteur d’affaires. Un ancien locataire satisfait vaut mieux que dix avis Airbnb. N’hésitez pas à leur demander de parler de votre logement autour d’eux.
      </p>

      <h3>Étape 4 — Sécurisez vos réservations</h3>
      <p>
      En direct, c’est vous qui gérez. Quelques règles simples pour sécuriser vos réservations :
      </p>
      <ul>
      <li>Rédigez un contrat de location court (une page suffit) avec les dates, le prix et les conditions</li>
      <li>Demandez un acompte de 30% à la signature, le solde à l’arrivée</li>
      <li>Prenez une caution par chèque (non encaissé) ou virement</li>
      <li>Faites un état des lieux d’entrée et de sortie avec photos</li>
      <li>Vérifiez l’identité du locataire (demandez une pièce d’identité)</li>
      </ul>

      <h3>Étape 5 — Gérez les demandes</h3>
      <p>
      Sur WhatsApp, les échanges sont directs et rapides. Répondez vite, soyez clair sur les conditions et n’hésitez pas à refuser une réservation si quelque chose ne vous convient pas. En direct, vous avez le contrôle total sur qui entre chez vous.
      </p>

      <h2 id="combien-pouvez-vous-gagner-de-plus">Combien pouvez-vous gagner de plus ?</h2>

      <div>
      <p>Exemple concret — appartement à Nice, 80€/nuit</p>
      <div>
      <div>
      <p>Via Airbnb</p>
      <p>66€</p>
      <p>après commission de 17%</p>
      </div>
      <div>
      <p>Via LocaDirect</p>
      <p>80€</p>
      <p>100% pour vous</p>
      </div>
      </div>
      <p>Sur 30 nuits/mois : 420€ de revenus supplémentaires</p>
      </div>

      <h2 id="les-questions-frequentes">Les questions fréquentes</h2>

      <h3>Faut-il déclarer ses revenus de location directe ?</h3>
      <p>Oui, comme pour toute location saisonnière. Les revenus de location meublée courte durée sont à déclarer en BIC (Bénéfices Industriels et Commerciaux). Pour moins de 77 700€ de revenus annuels, le régime micro-BIC avec abattement de 50% s’applique.</p>

      <h3>Comment gérer les impayés ?</h3>
      <p>Un contrat signé et un acompte perçu vous protègent. En cas de litige, le contrat est votre meilleure arme. Pour les petits montants, la juridiction de proximité traite les dossiers rapidement.</p>

      <h3>Et si quelque chose est cassé ?</h3>
      <p>C’est pour ça que vous avez demandé une caution. Un état des lieux d’entrée et de sortie avec photos est votre meilleure protection. Votre assurance habitation couvre également certains dommages causés par les locataires.</p>

      <div className={s.cta}>
        <h2>Publiez votre logement gratuitement</h2>
        <p>Annonce relue avant publication. Contact direct WhatsApp. Zéro commission.</p>
        <Link href="/inscription" className={s.ctaButton}>
          Créer mon annonce
        </Link>
      </div>
    </ArticleLayout>
  )
}
