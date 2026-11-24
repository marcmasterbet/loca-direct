import type { Metadata } from 'next'
import Link from 'next/link'
import ArticleLayout, { articleStyles as s } from '@/components/article/ArticleLayout'
import { titreGoogle } from '@/lib/seo'

const SLUG = "eviter-arnaques-location-saisonniere"
const TITRE = "Comment éviter les arnaques en location saisonnière ?"
const CHAPEAU = "5 règles simples pour ne jamais se faire avoir en réservant un logement de vacances."

export const metadata: Metadata = {
  title: { absolute: titreGoogle("Comment éviter les arnaques en location saisonnière ?") },
  description: "5 règles simples pour ne jamais se faire avoir en réservant un logement de vacances, que ce soit sur une plateforme ou en direct.",
  alternates: { canonical: `https://www.loca-direct.fr/blog/${SLUG}` },
  openGraph: { type: 'article', title: TITRE, description: CHAPEAU, url: `https://www.loca-direct.fr/blog/${SLUG}`, publishedTime: "2026-07-04" },
}

const SECTIONS = [{"id": "les-5-arnaques-les-plus-courantes", "titre": "Les 5 arnaques les plus courantes"}, {"id": "les-7-regles-d-or-pour-se-proteger", "titre": "Les 7 règles d'or pour se protéger"}, {"id": "que-faire-si-vous-avez-ete-victime-d-une-arnaque", "titre": "Que faire si vous avez été victime d'une arnaque ?"}]

export default function Article() {
  return (
    <ArticleLayout
      slug={SLUG}
      categorie="Conseils"
      titre={TITRE}
      chapeau={CHAPEAU}
      publie="2026-07-04"
      misAJour="2026-07-04"
      lecture="7 min"
      sections={SECTIONS}
    >
      <p>
      Les arnaques à la location saisonnière ont explosé ces dernières années. Selon la DGCCRF, les signalements ont augmenté de 40% entre 2023 et 2025. Avec la démocratisation des outils d’IA, les fausses annonces sont de plus en plus difficiles à détecter. Pourtant, quelques règles simples suffisent à s’en protéger.
      </p>

      <h2 id="les-5-arnaques-les-plus-courantes">Les 5 arnaques les plus courantes</h2>

      <div className={s.note}>
      <p>Les signaux d’alarme à fuir</p>
      <ul>
      <li>Prix anormalement bas (50% moins cher que le marché)</li>
      <li>Paiement demandé par virement Western Union ou carte cadeau</li>
      <li>Propriétaire « à l’étranger » qui ne peut pas vous montrer le logement</li>
      <li>Photos issues de Google Street View ou de sites immobiliers</li>
      <li>Urgence artificielle (« une autre famille est intéressée, décidez vite »)</li>
      </ul>
      </div>

      <h3>1. L’annonce fantôme</h3>
      <p>Un escroc copie une vraie annonce sur un site légitime et la republie à un prix attractif. Il demande un virement d’acompte, puis disparaît. La seule protection : toujours passer par des plateformes avec modération manuelle des annonces.</p>

      <h3>2. Le logement sur-vendu</h3>
      <p>Le logement existe, mais les photos datent de 10 ans. La « vue mer » est en réalité la vue sur le parking du voisin. Protection : demandez des photos récentes prises le jour même, et une vidéo de l’extérieur.</p>

      <h3>3. La double réservation</h3>
      <p>Le propriétaire accepte plusieurs réservations pour la même période. Vous arrivez et quelqu’un est déjà dans le logement. Protection : obtenez une confirmation écrite de la réservation avec les dates exactes.</p>

      <h3>4. Les frais cachés</h3>
      <p>Frais de ménage, taxe de séjour, caution, frais de linge… Les frais annexes peuvent doubler le prix initial. Protection : demandez le prix total avant de réserver.</p>

      <h3>5. Le faux propriétaire</h3>
      <p>Quelqu’un se fait passer pour le propriétaire alors que le logement est en location ou en vente légitime. Il encaisse l’acompte et disparaît. Protection : vérifiez que le logement n’est pas en vente sur le Bon Coin ou les sites immobiliers.</p>

      <h2 id="les-7-regles-d-or-pour-se-proteger">Les 7 règles d’or pour se protéger</h2>

      <div>
      {[
      { num: '01', titre: 'Choisissez un site qui relit les annonces', desc: 'Préférez les sites qui relisent chaque annonce avant publication et permettent de signaler une annonce suspecte. Aucun site ne remplace votre propre vigilance.' },
      { num: '02', titre: 'Vérifiez le propriétaire', desc: "Demandez à faire un appel vidéo. Un escroc refusera toujours. Vérifiez aussi son profil sur les réseaux sociaux — un compte créé la semaine dernière est suspect." },
      { num: '03', titre: 'Exigez tout par écrit', desc: 'WhatsApp, email, SMS — peu importe, mais tout doit être écrit. Les accords verbaux ne valent rien en cas de litige.' },
      { num: '04', titre: "N'envoyez jamais d'argent avant d'avoir signé", desc: "Un propriétaire sérieux ne vous demandera pas un virement sur un compte personnel avant que vous ayez au moins un contrat de location signé." },
      { num: '05', titre: 'Méfiez-vous des prix trop bas', desc: 'Un appartement à Paris à 60€/nuit au mois d\'août, c\'est une arnaque. Comparez toujours avec le marché local.' },
      { num: '06', titre: 'Vérifiez l\'adresse', desc: 'Cherchez l\'adresse sur Google Maps Street View. Si l\'immeuble n\'existe pas ou ne correspond pas aux photos, fuyez.' },
      { num: '07', titre: 'Utilisez une carte bancaire', desc: 'En cas d\'arnaque, un paiement par carte est plus facile à contester qu\'un virement. Certaines banques remboursent automatiquement en cas de fraude avérée.' },
      ].map(item => (
      <div key={item.num}>
      <span>{item.num}</span>
      <div>
      <p>{item.titre}</p>
      <p>{item.desc}</p>
      </div>
      </div>
      ))}
      </div>

      <h2 id="que-faire-si-vous-avez-ete-victime-d-une-arnaque">Que faire si vous avez été victime d’une arnaque ?</h2>
      <ul>
      <li>Signalez immédiatement à votre banque pour tenter un chargeback</li>
      <li>Déposez une plainte auprès de la police ou de la gendarmerie</li>
      <li>Signalez l’annonce sur la plateforme concernée</li>
      <li>Signalez sur <strong>signal.conso.gouv.fr</strong> (site officiel gouvernemental)</li>
      </ul>

      <div className={s.cta}>
        <h2>Des annonces relues avant publication</h2>
        <p>Chaque annonce LocaDirect est relue avant sa mise en ligne. Restez vigilant : demandez un contrat et ne payez jamais par mandat cash.</p>
        <Link href="/logements" className={s.ctaButton}>
          Voir les annonces
        </Link>
      </div>
    </ArticleLayout>
  )
}
