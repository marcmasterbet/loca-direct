import type { Metadata } from 'next'
import Link from 'next/link'
import ArticleLayout, { articleStyles as s } from '@/components/article/ArticleLayout'

const SLUG = 'louer-en-securite'
const TITRE = 'Location de vacances entre particuliers : comment payer en sécurité'
const CHAPEAU =
  'Arrhes ou acompte, contrat, dépôt de garantie, moyens de paiement à éviter et réflexes si l’on vous a escroqué : le guide pour réserver une location de vacances entre particuliers sans prendre de risque.'

export const metadata: Metadata = {
  title: { absolute: 'Location entre particuliers : comment payer en sécurité' },
  description:
    'Contrat, arrhes ou acompte, moyens de paiement à éviter : comment réserver une location de vacances entre particuliers sans risque, et que faire en cas d’arnaque.',
  alternates: { canonical: `https://www.loca-direct.fr/blog/${SLUG}` },
  openGraph: {
    type: 'article',
    title: TITRE,
    description: CHAPEAU,
    url: `https://www.loca-direct.fr/blog/${SLUG}`,
    publishedTime: '2026-11-23',
  },
}

const SECTIONS = [
  { id: 'avant', titre: 'Avant de payer : vérifier que le logement et le propriétaire existent' },
  { id: 'contrat', titre: 'Le contrat : obligatoire, même entre particuliers' },
  { id: 'arrhes-acompte', titre: 'Arrhes ou acompte : la différence qui compte en cas d’annulation' },
  { id: 'depot', titre: 'Le dépôt de garantie' },
  { id: 'moyens', titre: 'Les moyens de paiement : lesquels accepter, lesquels refuser' },
  { id: 'arnaque', titre: 'Si vous pensez avoir été escroqué' },
]

const FAQ = [
  {
    question: 'Le propriétaire peut-il demander la totalité du prix à la réservation ?',
    reponse:
      'Entre particuliers, la loi ne fixe pas de plafond : c’est le contrat qui décide. Le plafond de 25 % du loyer, au plus tôt six mois avant l’arrivée, s’applique quand la location passe par un professionnel de l’immobilier. Une demande de paiement total longtemps à l’avance doit toutefois vous rendre prudent.',
  },
  {
    question: 'Si le contrat ne précise pas « arrhes » ou « acompte », que se passe-t-il ?',
    reponse:
      'Les sommes versées d’avance sont alors considérées comme des arrhes : vous pouvez annuler en les perdant, et le propriétaire qui annule doit vous rendre le double.',
  },
  {
    question: 'Faut-il une assurance pour louer un logement de vacances ?',
    reponse:
      'Ce n’est pas obligatoire, mais c’est vivement conseillé. Vérifiez que votre assurance habitation couvre votre responsabilité civile pendant la location (incendie, dégât des eaux).',
  },
]

const SOURCES = [
  {
    titre: 'Service-public.fr — Règles d’une location de vacances entre particuliers (meublé de tourisme)',
    url: 'https://www.service-public.gouv.fr/particuliers/actualites/A15832',
  },
  {
    titre: 'DGCCRF — Location saisonnière : les règles à connaître',
    url: 'https://www.economie.gouv.fr/dgccrf/les-fiches-pratiques/location-saisonniere-les-regles-connaitre',
  },
  {
    titre: 'Assemblée nationale — Question écrite sur le plafond de 25 % et le délai de 6 mois (loi Hoguet)',
    url: 'https://questions.assemblee-nationale.fr/dyn/17/questions/QANR5L17QE10481.pdf',
  },
  {
    titre: 'Banque de France — Victime d’une arnaque à la location immobilière',
    url: 'https://www.banque-france.fr/fr/vous-avez-ete-victime-dune-arnaque-la-location-immobiliere-la-banque-de-france-vous-informe-sur-les',
  },
  { titre: 'Cybermalveillance.gouv.fr — Assistance aux victimes', url: 'https://www.cybermalveillance.gouv.fr/' },
  { titre: 'PHAROS — Signaler un contenu illicite sur internet', url: 'https://www.internet-signalement.gouv.fr/' },
]

export default function Article() {
  return (
    <ArticleLayout
      slug={SLUG}
      categorie="Conseils"
      titre={TITRE}
      chapeau={CHAPEAU}
      publie="2026-11-23"
      misAJour="2026-11-23"
      lecture="8 min"
      sections={SECTIONS}
      faq={FAQ}
      sources={SOURCES}
    >
      <p>
        Louer en direct auprès d’un particulier, c’est payer le juste prix, sans frais de service. C’est aussi vous
        qui choisissez comment payer et quoi signer. La bonne nouvelle : les règles sont simples, et quelques
        réflexes suffisent à écarter la grande majorité des arnaques.
      </p>

      <h2 id="avant">Avant de payer : vérifier que le logement et le propriétaire existent</h2>
      <p>
        L’arnaque la plus courante consiste à copier les photos d’une vraie annonce et à la republier à prix cassé,
        avec d’autres coordonnées. Avant de verser quoi que ce soit, prenez dix minutes pour vérifier :
      </p>
      <ul className={s.checklist}>
        <li>
          <strong>Parlez au propriétaire de vive voix</strong>, idéalement en appel vidéo depuis le logement. Un vrai
          propriétaire vous montre volontiers la terrasse ou la vue.
        </li>
        <li>
          <strong>Demandez l’adresse exacte</strong> et regardez-la sur une carte et en vue de rue : la façade, le
          jardin, la piscine doivent correspondre aux photos.
        </li>
        <li>
          <strong>Demandez le numéro d’enregistrement en mairie</strong> quand la commune l’exige. Il doit figurer
          dans le contrat et le descriptif.
        </li>
        <li>
          <strong>Méfiez-vous d’un prix très en dessous du marché</strong> et de la pression du « dépêchez-vous,
          d’autres personnes sont intéressées ».
        </li>
      </ul>
      <p>
        Sur LocaDirect, chaque annonce est relue avant publication et vous écrivez directement au propriétaire sur
        WhatsApp. Ces vérifications restent néanmoins le meilleur réflexe, ici comme ailleurs.
      </p>

      <h2 id="contrat">Le contrat : obligatoire, même entre particuliers</h2>
      <p>
        Pour la location d’un meublé de tourisme, un contrat écrit est obligatoire, signé en deux exemplaires : un
        pour le propriétaire, un pour vous. Le propriétaire doit aussi vous remettre, si vous le demandez, un état
        descriptif du logement avant la signature.
      </p>
      <p>Le contrat doit préciser, au minimum :</p>
      <ul>
        <li>les dates du séjour et l’adresse du logement ;</li>
        <li>le prix, les modalités de paiement et le montant des charges s’il n’est pas compris ;</li>
        <li>la nature de l’avance versée : « arrhes » ou « acompte » ;</li>
        <li>le montant du dépôt de garantie et ses conditions de restitution ;</li>
        <li>la taxe de séjour prévue et, s’il existe, le numéro d’enregistrement.</li>
      </ul>
      <div className={s.note}>
        <p>
          Un propriétaire qui refuse tout contrat écrit, ou qui ne veut signer qu’après avoir reçu votre argent, est
          un signal d’alerte.
        </p>
      </div>

      <h2 id="arrhes-acompte">Arrhes ou acompte : la différence qui compte en cas d’annulation</h2>
      <p>
        Les deux mots désignent une avance sur le prix, mais ils n’engagent pas de la même façon. Si le contrat ne
        prévoit rien d’autre, voici ce qui s’applique :
      </p>
      <div className={s.tableWrap}>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Vous annulez</th>
              <th>Le propriétaire annule</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>Arrhes</th>
              <td>Vous perdez les arrhes versées.</td>
              <td>Il vous rend le double des arrhes.</td>
            </tr>
            <tr>
              <th>Acompte</th>
              <td>Vous devez le prix total, sauf si le logement est reloué.</td>
              <td>Il vous rembourse et peut devoir vous indemniser.</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        Les arrhes laissent donc une porte de sortie aux deux parties ; l’acompte vous engage fermement. Lisez bien
        le mot écrit sur le contrat. En cas de force majeure, les règles changent : vous êtes remboursé.
      </p>
      <p>
        Quel montant ? Entre particuliers, la loi ne fixe pas de plafond : c’est le contrat qui le détermine. Les
        professionnels de l’immobilier, eux, ne peuvent pas demander plus de 25 % du loyer, ni plus de six mois avant
        la remise des clés. C’est un bon repère : une avance d’un quart du prix est courante, un paiement intégral
        des mois à l’avance doit vous faire réfléchir.
      </p>

      <h2 id="depot">Le dépôt de garantie</h2>
      <p>
        Le propriétaire peut demander un dépôt de garantie (souvent appelé caution) pour couvrir d’éventuels dégâts.
        Son montant n’est pas plafonné par la loi, mais le contrat doit préciser le délai dans lequel il vous sera
        rendu. Il est restitué à la fin du séjour, déduction faite, le cas échéant, des réparations de dégâts que vous
        auriez causés ou des consommations prévues au contrat ; vous pouvez demander les justificatifs. L’usure
        normale ne peut pas vous être facturée.
      </p>
      <p>
        Faites un tour du logement à l’arrivée et signalez par écrit, photos à l’appui, ce qui est abîmé ou manquant.
        Un simple message WhatsApp daté suffit souvent à éviter un litige au départ.
      </p>

      <h2 id="moyens">Les moyens de paiement : lesquels accepter, lesquels refuser</h2>
      <p>
        <strong>À privilégier :</strong> le virement bancaire vers un compte au nom du propriétaire, après signature
        du contrat. Vérifiez que le nom du titulaire du RIB correspond à celui du propriétaire avec qui vous avez
        échangé. Le chèque reste possible pour l’avance si les délais le permettent.
      </p>
      <p>
        <strong>À refuser :</strong> le mandat cash, les coupons et cartes prépayées (PCS, Transcash, Neosurf), les
        transferts d’argent de type Western Union ou MoneyGram. Ces moyens sont quasi impossibles à tracer et à
        récupérer : c’est précisément pour cela que les escrocs les réclament.
      </p>
      <div className={s.note}>
        <p>
          Un « propriétaire » qui vit à l’étranger, ne peut pas vous montrer le logement et vous demande de payer par
          coupons ou mandat : c’est le scénario classique de l’escroquerie. Arrêtez l’échange.
        </p>
      </div>

      <h2 id="arnaque">Si vous pensez avoir été escroqué</h2>
      <p>Chaque heure compte. Dans l’ordre :</p>
      <ol>
        <li>
          <strong>Appelez votre banque immédiatement</strong> pour demander un rappel du virement, ou faire opposition
          sur un chèque pas encore encaissé.
        </li>
        <li>
          <strong>Gardez toutes les preuves</strong> : annonce, captures des messages, coordonnées, RIB reçu, preuve
          de paiement.
        </li>
        <li>
          <strong>Portez plainte</strong>, au commissariat, à la gendarmerie ou en ligne si votre situation le
          permet.
        </li>
        <li>
          <strong>Signalez l’annonce</strong> sur PHAROS (internet-signalement.gouv.fr) et au site où vous l’avez
          trouvée. Cybermalveillance.gouv.fr propose aussi une assistance aux victimes.
        </li>
      </ol>
      <p>
        Si vous avez trouvé l’annonce sur LocaDirect, écrivez-nous à bienvenue@loca-direct.fr avec le lien de
        l’annonce : nous la retirons et vérifions le compte.
      </p>

      <div className={s.cta}>
        <h2>Louez en direct, en confiance</h2>
        <p>
          Des maisons et appartements de vacances loués par leurs propriétaires. Vous leur écrivez directement, sans
          commission.
        </p>
        <Link href="/logements" className={s.ctaButton}>
          Voir les logements
        </Link>
      </div>
    </ArticleLayout>
  )
}
