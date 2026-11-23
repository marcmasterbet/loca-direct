import type { Metadata } from 'next'
import Link from 'next/link'
import ArticleLayout, { articleStyles as s } from '@/components/article/ArticleLayout'

const SLUG = 'vendee-avec-son-chien'
const TITRE = 'La Vendée avec son chien : plages autorisées, horaires et balades'
const CHAPEAU =
  'Saint-Jean-de-Monts, Noirmoutier, Les Sables-d’Olonne, Saint-Gilles : les plages où votre chien est accepté, aux horaires de chaque commune, et les meilleures balades pour des vacances en Vendée à deux… ou à quatre pattes.'

export const metadata: Metadata = {
  title: { absolute: 'Vendée avec son chien : plages autorisées et balades' },
  description:
    'Plages autorisées aux chiens en Vendée, commune par commune : Saint-Jean-de-Monts, Noirmoutier, Les Sables-d’Olonne, Saint-Gilles. Horaires, laisse, balades.',
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
  { id: 'regle', titre: 'La règle : chaque commune décide' },
  { id: 'saint-jean-de-monts', titre: 'Saint-Jean-de-Monts et le nord de la Vendée' },
  { id: 'noirmoutier', titre: 'L’île de Noirmoutier' },
  { id: 'saint-gilles', titre: 'Saint-Gilles-Croix-de-Vie et Saint-Hilaire-de-Riez' },
  { id: 'sables', titre: 'Les Sables-d’Olonne' },
  { id: 'sud', titre: 'La Tranche-sur-Mer et le sud Vendée' },
  { id: 'balades', titre: 'Balades et sorties avec son chien' },
  { id: 'pratique', titre: 'Les conseils pratiques' },
]

const FAQ = [
  {
    question: 'Les chiens sont-ils autorisés sur les plages de Vendée en été ?',
    reponse:
      'Sur certaines plages, oui, souvent en laisse et parfois seulement tôt le matin ou le soir. Chaque commune fixe ses règles par arrêté : à Saint-Jean-de-Monts, plusieurs plages du nord de la commune acceptent les chiens en laisse ; à Noirmoutier, les chiens sont admis le matin et le soir en saison.',
  },
  {
    question: 'Quelle amende si mon chien est sur une plage interdite ?',
    reponse:
      'Le montant dépend de l’arrêté de la commune. Il s’agit en général d’une contravention, à laquelle s’ajoute une amende si les déjections ne sont pas ramassées.',
  },
  {
    question: 'Peut-on emmener son chien au Puy du Fou ?',
    reponse:
      'Non, les animaux ne sont pas admis dans le parc. Renseignez-vous à l’avance sur les solutions de garde, ou prévoyez cette journée sans lui.',
  },
]

const SOURCES = [
  {
    titre: 'Office de tourisme de l’île de Noirmoutier — Guide 2026 : séjourner avec son chien',
    url: 'https://www.ile-noirmoutier.com/sites/default/files/uplodaed_files/Guide%202026%20-%20s%C3%A9jour%20chien%20%C3%AEle%20de%20Noirmoutier.pdf',
  },
  {
    titre: 'Office de tourisme du Pays de Saint-Jean-de-Monts — Plages accessibles aux chiens',
    url: 'https://paysdesaintjeandemonts.fr/brochure/plages-accessibles-chiens/',
  },
  {
    titre: 'Office de tourisme du Pays de Saint-Gilles-Croix-de-Vie — Que faire avec un chien',
    url: 'https://www.payssaintgilles-tourisme.fr/wp-content/uploads/2023/07/que-faire-avec-un-chien.pdf',
  },
  { titre: 'Plages.tv — Plages autorisées aux chiens à Saint-Jean-de-Monts', url: 'https://www.plages.tv/chiens/liste-saint-jean-de-monts-85160' },
  { titre: 'Emmène ton chien — Les Sables-d’Olonne avec son chien', url: 'https://emmenetonchien.com/destinations-voyage-avec-un-chien/les-sables-d-olonne-avec-son-chien/' },
  { titre: 'Emmène ton chien — Top 5 des plages autorisées aux chiens en Vendée', url: 'https://emmenetonchien.com/destinations-voyage-avec-un-chien/top-5-plages-vendee/' },
]

export default function Article() {
  return (
    <ArticleLayout
      slug={SLUG}
      categorie="Voyageurs"
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
        Grandes plages, forêts de pins, pistes cyclables à perte de vue : la Vendée est l’une des destinations les
        plus agréables pour partir avec son chien. À condition de connaître les règles de chaque plage, qui changent
        d’une commune à l’autre et selon la saison.
      </p>

      <h2 id="regle">La règle : chaque commune décide</h2>
      <p>
        Il n’existe pas de loi nationale sur les chiens à la plage : chaque maire fixe les règles par arrêté
        municipal. En Vendée comme ailleurs, la plupart des plages sont libres hors saison et restreintes l’été, avec
        souvent trois cas de figure :
      </p>
      <ul>
        <li>des plages <strong>autorisées toute l’année</strong>, le plus souvent en laisse ;</li>
        <li>des plages autorisées <strong>tôt le matin et le soir</strong> en saison ;</li>
        <li>des plages <strong>interdites en été</strong>, ouvertes le reste de l’année.</li>
      </ul>
      <div className={s.note}>
        <p>
          Les arrêtés peuvent changer d’une année à l’autre. Les informations ci-dessous viennent des offices de
          tourisme et des guides cités en fin d’article : vérifiez-les sur place, aux panneaux d’entrée de plage, ou
          demandez à votre propriétaire, qui connaît les plages autorisées près de chez lui.
        </p>
      </div>

      <h2 id="saint-jean-de-monts">Saint-Jean-de-Monts et le nord de la Vendée</h2>
      <p>
        Saint-Jean-de-Monts est l’une des communes les plus accueillantes pour les chiens. Les plages du nord de la
        commune, de la plage de la Davière jusqu’à Notre-Dame-de-Monts, acceptent les chiens tenus en laisse : la
        Davière, la Parée du Jonc, les Tonnelles, le Petit Sochard ou le Pont d’Yeu. La plage de la Parée du Jonc,
        plus sauvage, est particulièrement appréciée.
      </p>
      <p>
        Notre-Dame-de-Monts et La Barre-de-Monts – Fromentine ont aussi des plages accessibles, selon des périodes et
        des horaires propres à chaque commune. L’office de tourisme du Pays de Saint-Jean-de-Monts publie chaque année
        une brochure qui les recense plage par plage.
      </p>
      <p>
        Derrière les plages, la forêt domaniale offre des kilomètres de chemins ombragés, parfaits aux heures chaudes.
      </p>

      <h2 id="noirmoutier">L’île de Noirmoutier</h2>
      <p>
        Sur l’île, les chiens sont acceptés sur les plages des quatre communes, toujours en laisse, mais avec des
        horaires en saison :
      </p>
      <div className={s.tableWrap}>
        <table>
          <thead>
            <tr>
              <th>Commune</th>
              <th>Hors saison</th>
              <th>En saison</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>Noirmoutier-en-l’Île</th>
              <td>Du 1er octobre au 31 mars, à toute heure</td>
              <td>Du 1er avril au 30 septembre, de 19 h à 9 h</td>
            </tr>
            <tr>
              <th>L’Épine</th>
              <td>Du 1er octobre au 31 mars, à toute heure</td>
              <td>Du 1er avril au 30 septembre, de 20 h à 10 h</td>
            </tr>
            <tr>
              <th>La Guérinière</th>
              <td>Du 16 septembre au 14 juin, à toute heure</td>
              <td>Du 15 juin au 15 septembre, de 20 h à 9 h</td>
            </tr>
            <tr>
              <th>Barbâtre</th>
              <td>Du 1er octobre au 31 mars, à toute heure</td>
              <td>Du 1er avril au 30 septembre, de 19 h à 9 h</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        Bon plan : à Noirmoutier-en-l’Île, la plage du perré des Sénégalais, depuis la cale du Devin, accepte les
        chiens toute l’année et à toute heure.
      </p>
      <p>
        L’île compte aussi une cinquantaine de kilomètres de sentiers balisés entre dunes, marais salants et bois de
        chênes verts. Plusieurs loueurs de vélos de l’île proposent des remorques pour chiens.
      </p>

      <h2 id="saint-gilles">Saint-Gilles-Croix-de-Vie et Saint-Hilaire-de-Riez</h2>
      <p>
        Ici, la règle est plus stricte en été : les animaux sont interdits sur les plages du 1er juin au 30
        septembre, de 9 h à 19 h. La plage de Boisvinet, à Saint-Gilles-Croix-de-Vie, leur est interdite toute
        l’année. Le reste du temps, les chiens doivent être tenus en laisse, sur la plage comme en ville.
      </p>
      <p>
        Juste au sud, Brétignolles-sur-Mer accepte les chiens sur la portion de littoral comprise entre la plage de
        la Sauzaie et la plage des Dunes 2.
      </p>

      <h2 id="sables">Les Sables-d’Olonne</h2>
      <p>
        Deux plages acceptent les chiens en laisse toute l’année : <strong>les Granges</strong> et{' '}
        <strong>Sauveterre</strong>, plus sauvages, au milieu de la forêt d’Olonne. Les chiens peuvent s’y baigner en
        dehors de la zone surveillée. La Grande Plage, Tanchet, la Paracou et le bassin Dombret ne leur sont ouvertes
        que l’hiver, du 1er octobre au 31 mars.
      </p>

      <h2 id="sud">La Tranche-sur-Mer et le sud Vendée</h2>
      <p>
        Le long du site naturel de la Belle Henriette, à La Tranche-sur-Mer, une plage sauvage d’environ 3 km
        accueille les chiens en laisse toute l’année. Plus au sud, le Marais poitevin se découvre à pied ou à vélo
        sur des chemins de halage tranquilles.
      </p>

      <h2 id="balades">Balades et sorties avec son chien</h2>
      <ul>
        <li>
          <strong>La forêt des Pays de Monts</strong>, entre Saint-Jean-de-Monts et Notre-Dame-de-Monts : des sentiers
          à l’ombre des pins, idéals l’été.
        </li>
        <li>
          <strong>La Vélodyssée</strong>, l’itinéraire cyclable du littoral atlantique, qui traverse la Vendée du
          nord au sud : avec une remorque pour chien, elle se fait en famille.
        </li>
        <li>
          <strong>Les sentiers de Noirmoutier</strong>, entre marais salants et dunes, en restant sur les chemins
          balisés pour préserver les dunes.
        </li>
        <li>
          <strong>Le Marais poitevin</strong> et ses chemins de halage, à pied ou à vélo.
        </li>
      </ul>

      <h2 id="pratique">Les conseils pratiques</h2>
      <ul className={s.checklist}>
        <li>Chien identifié (puce ou tatouage) et carnet de vaccination à jour.</li>
        <li>Muselière obligatoire dans les lieux publics pour les chiens de 1re et 2e catégorie.</li>
        <li>Toujours de l’eau, des sorties tôt le matin et le soir, et jamais seul dans la voiture.</li>
        <li>Des sacs pour ramasser les déjections : c’est obligatoire, et c’est ce qui garde les plages ouvertes.</li>
        <li>Le numéro d’une clinique vétérinaire de garde près de votre location.</li>
      </ul>
      <p>
        Et avant tout, choisissez un logement qui accueille vraiment les chiens, même grands, de préférence avec un
        jardin clos. Pour tout le reste (train, papiers, chaleur), lisez notre{' '}
        <Link href="/blog/vacances-grand-chien-france">guide pour partir en vacances avec un grand chien</Link>.
      </p>

      <div className={s.cta}>
        <h2>Votre location en Vendée, chien accepté</h2>
        <p>Des maisons et appartements où votre chien est le bienvenu, même s’il fait plus de 10 kg. En direct avec le propriétaire.</p>
        <Link href="/logements/chiens" className={s.ctaButton}>
          Voir les logements avec chien accepté
        </Link>
      </div>
    </ArticleLayout>
  )
}
