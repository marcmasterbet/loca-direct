import type { Metadata } from 'next'
import Link from 'next/link'
import ArticleLayout, { articleStyles as s } from '@/components/article/ArticleLayout'

const SLUG = 'vacances-grand-chien-france'
const TITRE = 'Partir en vacances avec un grand chien : le guide complet'
const CHAPEAU =
  "Logement qui l'accepte vraiment, papiers, train ou voiture, plages, parcs nationaux, chaleur : tout ce qu'il faut savoir avant de partir en vacances en France avec un chien de plus de 10 kg."

export const metadata: Metadata = {
  title: 'Vacances avec un grand chien en France : le guide complet',
  description:
    "Trouver un logement qui accepte les grands chiens, papiers, train, plages, parcs nationaux et santé : le guide pratique pour partir en vacances avec un chien de plus de 10 kg.",
  alternates: { canonical: `https://www.loca-direct.fr/blog/${SLUG}` },
  openGraph: {
    type: 'article',
    title: TITRE,
    description: CHAPEAU,
    url: `https://www.loca-direct.fr/blog/${SLUG}`,
    publishedTime: '2026-07-04',
    modifiedTime: '2026-11-16',
  },
}

const SECTIONS = [
  { id: 'logement', titre: 'Trouver un logement qui accepte vraiment un grand chien' },
  { id: 'papiers', titre: 'Les papiers à emporter' },
  { id: 'trajet', titre: 'Le trajet : voiture ou train' },
  { id: 'plages', titre: 'Les plages : ce que dit la règle' },
  { id: 'randonnee', titre: 'Randonner : parcs nationaux et sentiers autorisés' },
  { id: 'sante', titre: 'Chaleur, chenilles, leishmaniose : les risques selon la saison' },
  { id: 'destination', titre: 'Bien choisir sa destination' },
]

const FAQ = [
  {
    question: 'Combien coûte un billet de train pour un grand chien ?',
    reponse:
      "Sur les TGV INOUI et les INTERCITÉS de jour en France, un chien en laisse paie un forfait de 10 € par trajet et doit rester muselé pendant tout le voyage. En TER, le prix dépend de la région : forfait fixe dans certaines, moitié du tarif normal dans d'autres.",
  },
  {
    question: 'Mon chien peut-il aller à la plage en été ?',
    reponse:
      "Cela dépend de la commune. Il n'existe pas de règle nationale : chaque maire fixe les règles par arrêté. Beaucoup de communes interdisent les chiens sur les plages surveillées en été, d'autres leur réservent une plage ou des horaires. Renseignez-vous auprès de la mairie ou de l'office de tourisme avant de partir.",
  },
  {
    question: 'Le vaccin contre la rage est-il obligatoire pour partir en vacances en France ?',
    reponse:
      "Pas pour un séjour en France métropolitaine avec un chien non catégorisé. Il devient obligatoire pour sortir du territoire et pour les chiens de 1re et 2e catégorie. L'identification par puce ou tatouage, elle, est obligatoire pour tous les chiens.",
  },
  {
    question: 'Peut-on randonner avec son chien dans un parc national ?',
    reponse:
      "Pas dans le cœur de la plupart des parcs nationaux de montagne : les chiens y sont interdits, même en laisse, notamment dans la Vanoise, les Écrins, le Mercantour et les Pyrénées. Le parc national des Cévennes les accepte en laisse. Les zones périphériques des parcs et les parcs naturels régionaux sont en général ouverts aux chiens tenus en laisse.",
  },
  {
    question: 'Que demander au propriétaire avant de réserver avec un grand chien ?',
    reponse:
      "Le poids maximal accepté, le nombre de chiens, l'accès aux chambres et aux canapés, la hauteur et l'état de la clôture du jardin, la possibilité de laisser le chien seul, et les frais éventuels (supplément, caution, ménage). Demandez une confirmation écrite.",
  },
]

const SOURCES = [
  { titre: 'SNCF Voyageurs — Voyagez avec votre animal domestique', url: 'https://www.sncf-voyageurs.com/fr/voyagez-avec-nous/preparez-votre-voyage/voyagez-avec-votre-animal-domestique/' },
  { titre: 'Service-public.fr — Chiens dangereux : obligations et interdictions', url: 'https://www.service-public.gouv.fr/particuliers/vosdroits/F1839' },
  { titre: "Préfecture de l'Yonne — Animaux de compagnie (identification, rage)", url: 'https://www.yonne.gouv.fr/contenu/telechargement/38005/278894/file/Animaux%20de%20compagnie.pdf' },
  { titre: 'France.fr — Votre chien vous accompagne en vacances ?', url: 'https://www.france.fr/fr/article/votre-chien-vous-accompagne-en-vacances/' },
  { titre: 'Fédération française de randonnée — Randonner avec son chien', url: 'https://www.ffrandonnee.fr/s-informer/actualites/randonner-avec-son-chien-conseils-et-reglementation' },
  { titre: 'Fédération française de randonnée — Randonner avec son chien dans la Vanoise', url: 'https://www.ffrandonnee.fr/s-informer/actualites/randonner-avec-son-chien-dans-le-parc-de-la-vanoise' },
  { titre: 'Ulysse — Chiens et plages : les règles de l’été 2026', url: 'https://ulysse.com/news/chiens-plages-interdiction-ete-2026' },
  { titre: 'Futura — Canicule : les conseils des vétérinaires', url: 'https://www.futura-sciences.com/planete/actualites/chien-chiens-meurent-ce-moment-toute-france-conseils-veterinaires-eviter-pire-135572/' },
  { titre: 'SantéVet — Chenilles processionnaires et chiens', url: 'https://www.santevet.com/?p=34633' },
  { titre: 'SantéVet — Leishmaniose : zones à risque en France', url: 'https://www.santevet.com/?p=34743' },
]

export default function ArticleGrandChien() {
  return (
    <ArticleLayout
      slug={SLUG}
      categorie="Vacances avec son chien"
      titre={TITRE}
      chapeau={CHAPEAU}
      publie="2026-07-04"
      misAJour="2026-11-16"
      lecture="12 min"
      sections={SECTIONS}
      faq={FAQ}
      sources={SOURCES}
    >
      <p>
        Avec un chien de moins de 10 kg, presque tout est simple : il voyage dans un sac, se glisse partout et
        rassure les propriétaires. Avec un labrador, un berger ou un bouvier, chaque étape demande un peu plus
        d&apos;organisation. La bonne nouvelle, c&apos;est qu&apos;une fois les règles connues, des vacances réussies
        avec un grand chien sont tout à fait à portée de main. Ce guide les rassemble, de la réservation du logement
        au retour à la maison.
      </p>

      <h2 id="logement">Trouver un logement qui accepte vraiment un grand chien</h2>
      <p>
        C&apos;est le point qui fait échouer le plus de séjours. Sur beaucoup d&apos;annonces, la mention « animaux
        acceptés » ne dit rien de la taille. Certains propriétaires pensent à un chat ou à un petit chien, et la
        surprise arrive le jour de l&apos;arrivée. La seule méthode fiable : poser des questions précises avant de
        réserver, et garder les réponses par écrit.
      </p>
      <h3>Les questions à poser au propriétaire</h3>
      <ul className={s.checklist}>
        <li>Quel est le poids ou la taille maximale accepté, et combien de chiens ?</li>
        <li>Le chien a-t-il accès à toutes les pièces, ou certaines lui sont-elles fermées (chambres, canapés) ?</li>
        <li>Le jardin est-il entièrement clos ? Quelle hauteur fait la clôture, et y a-t-il un portail qui ferme ?</li>
        <li>Peut-on laisser le chien seul quelques heures dans le logement ?</li>
        <li>Y a-t-il un supplément, une caution spécifique ou des frais de ménage pour l&apos;animal ?</li>
        <li>Les voisins ou les autres locataires ont-ils des animaux (chats, poules, autres chiens) ?</li>
        <li>Quels sont les chemins de promenade et la plage ou la rivière la plus proche où les chiens sont admis ?</li>
      </ul>
      <p>
        Sur LocaDirect, vous échangez directement avec le propriétaire par WhatsApp, sans messagerie intermédiaire :
        c&apos;est le moment de poser toutes ces questions et d&apos;envoyer une photo de votre chien. Les propriétaires
        qui cochent « chiens de plus de 10 kg acceptés » s&apos;engagent sur ce point, et vous les trouverez réunis dans
        notre <Link href="/logements/chiens">sélection de logements qui acceptent les grands chiens</Link>.
      </p>
      <div className={s.note}>
        <p>
          <strong>Le bon réflexe :</strong> faites figurer l&apos;accord pour votre chien dans le contrat de location ou
          dans un message écrit, avec son poids. En cas de désaccord à l&apos;arrivée, c&apos;est votre meilleure preuve.
        </p>
      </div>

      <h2 id="papiers">Les papiers à emporter</h2>
      <p>
        Pour des vacances en France métropolitaine, les formalités sont légères pour la plupart des chiens.
        L&apos;identification par puce électronique (ou par tatouage ancien et lisible) est obligatoire pour tous les
        chiens. Pensez aussi à emporter le carnet de santé ou le passeport européen : il réunit le numéro
        d&apos;identification et les vaccins, et vous sera demandé par un vétérinaire en cas de besoin.
      </p>
      <p>
        La vaccination contre la rage n&apos;est pas exigée pour circuler en France métropolitaine. Elle devient
        obligatoire dans deux cas : si vous quittez le territoire, même pour une journée en Espagne ou en Italie, et si
        votre chien est classé en 1re ou 2e catégorie.
      </p>
      <h3>Chiens de 1re et 2e catégorie</h3>
      <p>
        Les règles sont plus strictes, et elles comptent en vacances. Les chiens de 2e catégorie (chiens de garde et de
        défense) doivent porter laisse et muselière sur la voie publique, dans les lieux publics et dans les transports
        en commun. Les chiens de 1re catégorie n&apos;ont pas accès aux transports en commun, ni aux lieux et locaux
        ouverts au public, en dehors de la voie publique. Dans les deux cas, gardez sur vous le permis de détention :
        il doit être présenté en cas de contrôle. Prévenez aussi le propriétaire du logement de la catégorie de votre
        chien avant de réserver.
      </p>
      <div className={s.tableWrap}>
        <table>
          <thead>
            <tr>
              <th scope="col">Document</th>
              <th scope="col">Séjour en France</th>
              <th scope="col">Séjour à l&apos;étranger (UE)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Identification (puce)</td>
              <td>Obligatoire</td>
              <td>Obligatoire</td>
            </tr>
            <tr>
              <td>Vaccin contre la rage</td>
              <td>Obligatoire seulement pour les chiens catégorisés</td>
              <td>Obligatoire</td>
            </tr>
            <tr>
              <td>Passeport européen</td>
              <td>Conseillé (carnet de santé à défaut)</td>
              <td>Obligatoire</td>
            </tr>
            <tr>
              <td>Permis de détention</td>
              <td>Obligatoire pour les chiens catégorisés</td>
              <td>Selon le pays de destination</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 id="trajet">Le trajet : voiture ou train</h2>
      <h3>En voiture</h3>
      <p>
        C&apos;est la solution la plus courante avec un grand chien. Installez-le dans une caisse fixée ou avec un harnais
        attaché à la ceinture, pour sa sécurité et la vôtre en cas de freinage. Prévoyez une pause toutes les deux heures
        environ, avec de l&apos;eau et quelques minutes de marche. Et une règle absolue : ne laissez jamais votre chien
        seul dans une voiture garée par temps chaud, même fenêtres entrouvertes. Un chien enfermé peut mourir d&apos;un
        coup de chaleur en quelques minutes.
      </p>
      <h3>En train</h3>
      <p>
        Les grands chiens sont acceptés dans les trains SNCF. Sur les TGV INOUI et les INTERCITÉS de jour en France, un
        chien en laisse paie un forfait de 10 € par trajet. Il voyage à vos pieds, tenu en laisse et muselé pendant tout
        le trajet. Habituez-le à la muselière quelques semaines avant le départ, par de courtes séances récompensées.
      </p>
      <p>
        En TER, chaque région fixe son tarif : un forfait de quelques euros dans certaines, la moitié du prix normal dans
        d&apos;autres. Vérifiez sur le site TER de la région concernée. Pour OUIGO, les conditions sont propres à la
        compagnie et figurent sur son site.
      </p>

      <h2 id="plages">Les plages : ce que dit la règle</h2>
      <p>
        Il n&apos;existe pas de loi nationale sur les chiens à la plage : c&apos;est le maire qui décide, par arrêté
        municipal, et la règle peut changer d&apos;une année sur l&apos;autre. En pratique, de nombreuses communes
        interdisent les chiens sur les plages surveillées pendant la saison d&apos;été, même en laisse. D&apos;autres
        réservent une plage aux chiens, ou les autorisent tôt le matin et en soirée.
      </p>
      <ul>
        <li>
          <strong>Avant de partir</strong>, consultez le site de la mairie ou de l&apos;office de tourisme de votre lieu de
          vacances : l&apos;arrêté de plage y est souvent publié.
        </li>
        <li>
          <strong>Sur place</strong>, lisez les panneaux à l&apos;entrée de chaque plage : ils font foi.
        </li>
        <li>
          <strong>Hors saison</strong>, beaucoup de plages redeviennent accessibles. Le printemps et le début de
          l&apos;automne sont souvent les meilleurs moments pour un séjour au bord de la mer avec un grand chien.
        </li>
        <li>
          <strong>Ramassez toujours</strong> les déjections : c&apos;est aussi ce qui convainc les communes de garder des
          plages ouvertes aux chiens.
        </li>
      </ul>
      <p>
        Une présence sur une plage interdite expose à une amende, généralement comprise entre 11 et 135 €.
      </p>

      <h2 id="randonnee">Randonner : parcs nationaux et sentiers autorisés</h2>
      <p>
        La montagne et la campagne sont idéales pour un grand chien, à condition de connaître une règle souvent
        ignorée : les chiens sont interdits dans le cœur de la plupart des parcs nationaux de montagne, même tenus en
        laisse. C&apos;est le cas dans la Vanoise, les Écrins, le Mercantour et les Pyrénées. La raison : la
        tranquillité de la faune sauvage et des troupeaux.
      </p>
      <div className={s.tableWrap}>
        <table>
          <thead>
            <tr>
              <th scope="col">Espace</th>
              <th scope="col">Chiens</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Cœur des parcs nationaux de la Vanoise, des Écrins, du Mercantour et des Pyrénées</td>
              <td>Interdits, même en laisse</td>
            </tr>
            <tr>
              <td>Parc national des Cévennes</td>
              <td>Autorisés en laisse</td>
            </tr>
            <tr>
              <td>Zones périphériques des parcs nationaux</td>
              <td>En général autorisés, en laisse</td>
            </tr>
            <tr>
              <td>Parcs naturels régionaux</td>
              <td>Souvent tolérés en laisse, selon la réglementation de chaque parc</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        Interdit au cœur du parc ne veut pas dire interdit dans la région. Autour de la Vanoise, le site de randonnée
        du territoire recense plus de 130 itinéraires où les chiens sont autorisés, en dehors du cœur du parc.
        Renseignez-vous auprès de l&apos;office de tourisme : la plupart proposent des itinéraires adaptés.
      </p>
      <p>
        En montagne, gardez votre chien en laisse près des troupeaux et contournez-les largement : les chiens de
        protection (patous) défendent leur troupeau contre tout chien qui s&apos;approche.
      </p>

      <h2 id="sante">Chaleur, chenilles, leishmaniose : les risques selon la saison</h2>
      <h3>La chaleur, premier danger de l&apos;été</h3>
      <p>
        Les grands chiens, surtout ceux à poil épais ou à museau court, supportent mal la chaleur. Par 35 °C à
        l&apos;ombre, le sol au soleil peut dépasser 60 °C et brûler les coussinets. Promenez votre chien tôt le matin
        et tard le soir, laissez-lui toujours de l&apos;eau fraîche et de l&apos;ombre. Un halètement intense et
        inhabituel est le premier signe d&apos;un coup de chaleur : mettez-le au frais, mouillez-le avec de l&apos;eau
        fraîche (pas glacée) et appelez immédiatement un vétérinaire. C&apos;est une urgence vitale.
      </p>
      <h3>Les chenilles processionnaires au printemps</h3>
      <p>
        Leurs poils sont très urticants et peuvent provoquer des lésions graves, notamment à la langue, si le chien les
        renifle ou les lèche. La période à risque va de janvier à mai pour la processionnaire du pin, et
        d&apos;avril à juillet pour celle du chêne. En forêt de pins ou de chênes à cette saison, gardez votre chien en
        laisse et éloignez-le des files de chenilles et des nids.
      </p>
      <h3>La leishmaniose dans le Sud</h3>
      <p>
        Cette maladie parasitaire grave est transmise par un petit insecte piqueur, le phlébotome, actif environ
        d&apos;avril à octobre. Elle touche surtout le pourtour méditerranéen et le sud de la France. Si vous partez
        dans ces régions, demandez conseil à votre vétérinaire avant le départ (collier ou traitement répulsif,
        vaccination) et évitez les promenades au crépuscule, quand les phlébotomes sont les plus actifs.
      </p>
      <h3>Avant de partir</h3>
      <ul className={s.checklist}>
        <li>Traitement contre les tiques et les puces à jour</li>
        <li>Coordonnées d&apos;un vétérinaire proche du lieu de vacances</li>
        <li>Médaille avec votre numéro de téléphone sur le collier</li>
        <li>Gamelle pliable, réserve d&apos;eau, croquettes habituelles pour toute la durée du séjour</li>
        <li>Plaid ou panier familier, pour qu&apos;il retrouve ses repères dans le logement</li>
      </ul>

      <h2 id="destination">Bien choisir sa destination</h2>
      <p>
        Plutôt qu&apos;une région « idéale », cherchez un lieu qui coche les bonnes cases pour votre chien et pour la
        saison de votre séjour.
      </p>
      <ul>
        <li>
          <strong>Le littoral hors saison</strong> : au printemps et en automne, les plages sont souvent plus
          accessibles, les températures plus douces et les sentiers côtiers moins fréquentés.
        </li>
        <li>
          <strong>La moyenne montagne en été</strong> : la fraîcheur est appréciable pour un grand chien. Choisissez un
          secteur en dehors du cœur des parcs nationaux, ou les Cévennes, où les chiens en laisse sont acceptés.
        </li>
        <li>
          <strong>La campagne</strong> : une maison avec un grand jardin clos, des chemins au départ de la porte et peu
          de voisins, c&apos;est souvent le meilleur cadre pour un chien qui a besoin d&apos;espace.
        </li>
        <li>
          <strong>Le Sud en été</strong> : possible, mais avec un logement qui garde la fraîcheur, de l&apos;ombre, et
          une vraie prévention contre la leishmaniose.
        </li>
      </ul>

      <div className={s.cta}>
        <h2>Des logements qui acceptent vraiment les grands chiens</h2>
        <p>
          Sur LocaDirect, les propriétaires indiquent clairement s&apos;ils acceptent les chiens de plus de 10 kg.
          Vous les contactez directement, sans commission, pour poser toutes vos questions avant de réserver.
        </p>
        <Link href="/logements/chiens" className={s.ctaButton}>
          Voir les logements qui acceptent les grands chiens
        </Link>
      </div>

      <p>
        Pour réserver en toute sérénité, lisez aussi nos conseils pour{' '}
        <Link href="/blog/eviter-arnaques-location-saisonniere">éviter les arnaques en location saisonnière</Link>.
      </p>
    </ArticleLayout>
  )
}
