import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Vacances avec un grand chien — les meilleures destinations en France | LocaDirect',
  description: 'Voyager avec un chien de plus de 10 kg peut vite devenir un casse-tête. Découvrez les régions et logements qui accueillent vraiment vos grands compagnons.',
}

const ORANGE = '#EA580C'
const ORANGE_LIGHT = '#FFF7ED'
const WHITE = '#FFFFFF'
const GRAY = '#F9FAFB'
const TEXT = '#1F2937'
const TEXT_DIM = '#6B7280'
const BORDER = '#E5E7EB'
const BROWN = '#78350F'
const GOLD = '#FCD34D'

export default function ArticleChienPage() {
  return (
    <div style={{ background: WHITE, minHeight: '100vh', fontFamily: 'Georgia, serif', color: TEXT }}>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        a { text-decoration: none; color: inherit; }
        p { line-height: 1.85; margin-bottom: 20px; font-size: 17px; color: #374151; }
        h2 { font-size: 24px; font-weight: 800; margin: 40px 0 16px; color: #1F2937; font-family: -apple-system, BlinkMacSystemFont, sans-serif; }
        h3 { font-size: 19px; font-weight: 700; margin: 28px 0 12px; color: #1F2937; font-family: -apple-system, BlinkMacSystemFont, sans-serif; }
        ul { padding-left: 24px; margin-bottom: 20px; }
        ul li { font-size: 17px; line-height: 1.8; color: #374151; margin-bottom: 6px; }
        blockquote { border-left: 4px solid #EA580C; padding: 16px 24px; background: #FFF7ED; border-radius: 0 12px 12px 0; margin: 28px 0; font-style: italic; color: #92400E; }
      `}</style>

      {/* NAVBAR */}
      <nav style={{ position: 'sticky', top: 0, zIndex: 100, background: WHITE, borderBottom: `1px solid ${BORDER}`, padding: '12px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
        <a href="/" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 34, height: 34, background: ORANGE, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>🏠</div>
          <span style={{ fontSize: 18, fontWeight: 800, color: TEXT }}>Loca<span style={{ color: ORANGE }}>Direct</span></span>
        </a>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <a href="/blog" style={{ fontSize: 14, color: TEXT_DIM, padding: '8px 14px' }}>← Blog</a>
          <a href="/logements/chiens" style={{ background: BROWN, color: GOLD, borderRadius: 10, padding: '10px 18px', fontSize: 14, fontWeight: 700 }}>
            🐕 Voir les logements
          </a>
        </div>
      </nav>

      {/* HERO ARTICLE */}
      <div style={{ position: 'relative', height: 480 }}>
        <img
          src="https://images.unsplash.com/photo-1552053831-71594a27632d?w=1400&q=85"
          alt="Golden retriever en vacances"
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 40%' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '40px 20px', maxWidth: 780, margin: '0 auto' }}>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 16, fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
            <span style={{ background: GOLD, color: BROWN, borderRadius: 20, padding: '4px 14px', fontSize: 12, fontWeight: 800 }}>🐾 Voyageurs</span>
            <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13 }}>4 juillet 2026 · 5 min de lecture</span>
          </div>
          <h1 style={{ fontSize: 36, fontWeight: 900, color: WHITE, lineHeight: 1.2, fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif', maxWidth: 700 }}>
            Vacances avec un grand chien — les meilleures destinations en France
          </h1>
        </div>
      </div>

      {/* CONTENU */}
      <div style={{ maxWidth: 740, margin: '0 auto', padding: '48px 20px 80px' }}>

        <blockquote>
          "Mon golden retriever pèse 32 kg. Trouver un logement qui l'accepte vraiment — pas juste sur le papier — m'a pris des heures." — Marie, voyageuse avec son Léo
        </blockquote>

        <p>
          Voyager avec un grand chien en France, c'est souvent un parcours du combattant. Entre les plateformes qui affichent "animaux acceptés" et la réalité (un petit chien de 5 kg maximum, en cage, dans une pièce séparée), les déceptions sont fréquentes. Pourtant, la France regorge de destinations magnifiques où vos compagnons de plus de 10 kg seront vraiment les bienvenus.
        </p>

        <h2>Pourquoi c'est si difficile de trouver un logement pour un grand chien ?</h2>

        <p>
          Les grandes plateformes de location permettent aux propriétaires d'indiquer "animaux acceptés" sans préciser de taille maximale. Résultat : vous arrivez avec votre labrador de 30 kg et le propriétaire vous annonce que c'est "réservé aux petits chiens". Sur LocaDirect, les propriétaires qui cochent la case "Chiens +10 kg acceptés" s'y engagent clairement.
        </p>

        <h2>Les 5 régions les plus accueillantes pour les grands chiens</h2>

        <h3>🌊 1. La Bretagne</h3>
        <p>
          La Bretagne est sans doute la région la plus dog-friendly de France. Ses plages immenses, souvent désertes hors saison, permettent de longues balades sans laisse. Les propriétaires bretons, souvent eux-mêmes propriétaires de chiens, sont habitués aux grands gabarits. Les gîtes ruraux y sont nombreux, avec jardins clos et accès direct à la nature.
        </p>
        <ul>
          <li>Plages autorisées aux chiens : Cap Fréhel, Pointe du Raz, Presqu'île de Crozon</li>
          <li>Idéal pour : labs, goldens, huskys, bergers</li>
          <li>Éviter : le mois d'août sur les plages populaires (restrictions renforcées)</li>
        </ul>

        <h3>🏔️ 2. Les Alpes et l'Auvergne-Rhône-Alpes</h3>
        <p>
          La montagne est faite pour les grands chiens. Chemins de randonnée, lacs d'altitude, forêts de sapins — vos chiens seront dans leur élément. Les chalets de montagne sont souvent spacieux avec terrasses et jardins. Les propriétaires de la région ont l'habitude des chiens de travail et de garde.
        </p>
        <ul>
          <li>Destinations phares : Annecy, Megève, Chamonix, Lac de Serre-Ponçon</li>
          <li>Idéal pour : bergers allemands, malinois, retrievers, huskys</li>
          <li>Bon à savoir : certains refuges et restaurants en montagne acceptent les chiens</li>
        </ul>

        <h3>🌿 3. Le Périgord et la Dordogne</h3>
        <p>
          Châteaux, rivières, forêts de chênes... La Dordogne est une région magnifique et très accueillante pour les chiens. Les gîtes y sont souvent isolés, avec de grands espaces. La densité touristique y est plus faible qu'en Bretagne ou en PACA, ce qui facilite les balades.
        </p>

        <h3>🦀 4. La Nouvelle-Aquitaine</h3>
        <p>
          Du Bassin d'Arcachon aux plages de Biarritz, la façade atlantique offre des kilomètres de plages et de forêts landaises où les grands chiens peuvent s'exprimer librement. La région est également connue pour ses propriétaires accueillants et ses prix souvent plus abordables qu'en Bretagne.
        </p>

        <h3>🌻 5. L'Occitanie</h3>
        <p>
          Pyrénées, Canal du Midi, Camargue, Cévennes... L'Occitanie est une région immense aux paysages variés. Vous y trouverez des mas provençaux avec piscine, des fermes dans les causses et des chalets pyrénéens, souvent avec de grands espaces extérieurs parfaits pour les grands chiens.
        </p>

        <h2>Les erreurs à éviter</h2>

        <ul>
          <li><strong>Ne pas vérifier la clôture du jardin</strong> — demandez toujours une photo ou une confirmation écrite</li>
          <li><strong>Réserver sans mentionner le poids exact</strong> — soyez transparent dès le premier message</li>
          <li><strong>Oublier les plages fermées en été</strong> — beaucoup de plages interdisent les chiens du 15 juin au 15 septembre</li>
          <li><strong>Négliger les voisins</strong> — demandez si le logement est isolé ou dans un village</li>
        </ul>

        <h2>Comment trouver le bon logement ?</h2>

        <p>
          Sur LocaDirect, tous les logements de la rubrique "Chiens +10 kg" ont été publiés par des propriétaires qui acceptent explicitement les grands chiens. Pas de surprise, pas de malentendu. Vous contactez directement le propriétaire sur WhatsApp pour confirmer tous les détails.
        </p>

        {/* CTA */}
        <div style={{ background: `linear-gradient(135deg, ${BROWN} 0%, #92400E 100%)`, borderRadius: 20, padding: '32px 28px', marginTop: 40, textAlign: 'center' }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🐕</div>
          <h3 style={{ fontSize: 22, fontWeight: 800, color: WHITE, marginBottom: 8, fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
            Trouvez votre logement idéal
          </h3>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.8)', marginBottom: 20, fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
            Tous nos logements chiens +10 kg sont vérifiés et confirmés par les propriétaires.
          </p>
          <a href="/logements/chiens" style={{ display: 'inline-block', background: GOLD, color: BROWN, borderRadius: 12, padding: '14px 28px', fontSize: 15, fontWeight: 800, fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
            Voir les logements 🐾
          </a>
        </div>

        {/* ARTICLES SIMILAIRES */}
        <div style={{ marginTop: 48, paddingTop: 32, borderTop: `1px solid ${BORDER}`, fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
          <p style={{ fontSize: 11, color: ORANGE, letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 16 }}>À lire aussi</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { slug: 'reserver-direct-plutot-airbnb', titre: 'Pourquoi réserver en direct plutôt qu\'Airbnb ?' },
              { slug: 'eviter-arnaques-location-saisonniere', titre: 'Comment éviter les arnaques en location saisonnière ?' },
              { slug: 'vacances-bretagne-guide', titre: 'Vacances en Bretagne — le guide complet' },
            ].map(a => (
              <a key={a.slug} href={`/blog/${a.slug}`} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 14, background: GRAY, borderRadius: 12, border: `1px solid ${BORDER}` }}>
                <span style={{ fontSize: 18 }}>📖</span>
                <span style={{ fontSize: 14, fontWeight: 600, color: TEXT }}>{a.titre}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
