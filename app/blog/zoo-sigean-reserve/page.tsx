import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Réserve Africaine de Sigean — visite, animaux, conseils pratiques | LocaDirect',
  description: 'La plus grande réserve animalière d\'Europe vous accueille en Occitanie. Girafes, rhinocéros, lions en liberté... Notre guide complet pour une visite inoubliable.',
}

const ORANGE = '#EA580C'
const WHITE = '#FFFFFF'
const GRAY = '#F9FAFB'
const TEXT = '#1F2937'
const TEXT_DIM = '#6B7280'
const BORDER = '#E5E7EB'
const BROWN = '#78350F'
const GOLD = '#FCD34D'
const GOLD_LIGHT = '#FFFBEB'

export default function ArticleSigeanPage() {
  return (
    <div style={{ background: WHITE, minHeight: '100vh', fontFamily: 'Georgia, serif', color: TEXT }}>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        a { text-decoration: none; color: inherit; }
        p { line-height: 1.85; margin-bottom: 20px; font-size: 17px; color: #374151; }
        h2 { font-size: 24px; font-weight: 800; margin: 40px 0 16px; color: #1F2937; font-family: -apple-system, BlinkMacSystemFont, sans-serif; }
        h3 { font-size: 19px; font-weight: 700; margin: 28px 0 12px; color: #1F2937; font-family: -apple-system, BlinkMacSystemFont, sans-serif; }
        ul { padding-left: 24px; margin-bottom: 20px; }
        ul li { font-size: 17px; line-height: 1.8; color: #374151; margin-bottom: 8px; }
        blockquote { border-left: 4px solid #78350F; padding: 16px 24px; background: #FFFBEB; border-radius: 0 12px 12px 0; margin: 28px 0; font-style: italic; color: #78350F; }
      `}</style>

      <nav style={{ position: 'sticky', top: 0, zIndex: 100, background: WHITE, borderBottom: `1px solid ${BORDER}`, padding: '12px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
        <a href="/" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 34, height: 34, background: ORANGE, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>🏠</div>
          <span style={{ fontSize: 18, fontWeight: 800, color: TEXT }}>Loca<span style={{ color: ORANGE }}>Direct</span></span>
        </a>
        <div style={{ display: 'flex', gap: 8, fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
          <a href="/blog" style={{ fontSize: 14, color: TEXT_DIM, padding: '8px 14px' }}>← Blog</a>
          <a href="/location-vacances/occitanie" style={{ background: BROWN, color: GOLD, borderRadius: 10, padding: '10px 18px', fontSize: 14, fontWeight: 700 }}>Logements Occitanie</a>
        </div>
      </nav>

      <div style={{ position: 'relative', height: 500 }}>
        <img src="https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=1400&q=85" alt="Girafes en liberté réserve africaine" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.1) 60%, transparent 100%)' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '40px 20px', maxWidth: 780, margin: '0 auto' }}>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 16, fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
            <span style={{ background: BROWN, color: GOLD, borderRadius: 20, padding: '4px 14px', fontSize: 12, fontWeight: 800 }}>🦒 Famille & Activités</span>
            <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13 }}>4 juillet 2026 · 6 min de lecture</span>
          </div>
          <h1 style={{ fontSize: 38, fontWeight: 900, color: WHITE, lineHeight: 1.2, fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif', maxWidth: 700 }}>
            Réserve Africaine de Sigean — visite, animaux et conseils pratiques
          </h1>
        </div>
      </div>

      <div style={{ maxWidth: 740, margin: '0 auto', padding: '48px 20px 80px' }}>
        <blockquote>
          "Mon fils de 8 ans n'en revenait pas de voir des lions à 3 mètres de notre voiture. On a passé 6 heures là-bas et on en aurait fait le double." — Famille Dupuis, visiteurs
        </blockquote>

        <p>À 15 km au sud de Narbonne, en bordure de l'étang de Sigean, la Réserve Africaine de Sigean est la plus grande réserve animalière d'Europe. Sur 300 hectares de garrigue méditerranéenne et de zones humides, près de 3 800 animaux de 160 espèces différentes vivent en semi-liberté. Une expérience unique qui n'a rien à envier aux plus grands parcs africains.</p>

        <h2>Les animaux à ne pas manquer</h2>

        <h3>🦁 Le Parc des Lions — l'expérience la plus intense</h3>
        <p>La traversée du parc des lions en voiture est l'expérience la plus mémorable de la réserve. Les lions se déplacent librement autour des voitures, parfois à quelques centimètres. Les vitres restent fermées — c'est obligatoire et on comprend vite pourquoi. Comptez 15 à 30 minutes pour traverser ce parc selon l'activité des animaux.</p>
        <div style={{ background: GOLD_LIGHT, borderRadius: 12, padding: 16, marginBottom: 20, fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif', border: `1px solid ${GOLD}` }}>
          <p style={{ fontSize: 13, color: BROWN, marginBottom: 0 }}>⚠️ Ne jamais ouvrir les fenêtres ou les portières dans les parcs de lions, ours et rhinocéros. Cette règle est strictement appliquée par les gardiens.</p>
        </div>

        <h3>🦒 Les Girafes, Zèbres et Antilopes</h3>
        <p>La grande plaine africaine de la réserve abrite des girafes, des zèbres, des gnous, des oryx et de nombreuses espèces d'antilopes. Ces animaux vivent dans un parc accessible à pied, ce qui permet une approche très proche et des photos magnifiques. Les girafes, particulièrement curieuses, s'approchent parfois des visiteurs.</p>

        <h3>🦏 Les Rhinocéros blancs</h3>
        <p>La réserve de Sigean héberge l'un des plus grands troupeaux de rhinocéros blancs d'Europe. Ces géants paisibles, pesant jusqu'à 2 500 kg, peuvent être observés de très près depuis la voiture. Un spectacle impressionnant qui rappelle qu'il faut absolument protéger ces animaux menacés d'extinction.</p>

        <h3>🐘 Les Éléphants d'Afrique</h3>
        <p>Le groupe d'éléphants de la réserve est l'un des plus importants d'Europe. Leur espace est vaste et les animaux semblent parfaitement intégrés à leur environnement. Les heures de repas (consultez le programme à l'entrée) offrent les meilleures opportunités de les observer de près.</p>

        <h2>Organisation de la visite</h2>

        <h3>Durée recommandée</h3>
        <p>Prévoyez une journée complète. La réserve couvre 300 hectares et propose deux modes de visite : en voiture (parcours de 9 km dans les parcs africains) et à pied (8 km de sentiers dans les autres zones). Combinés, comptez 5 à 7 heures.</p>

        <h3>Le parcours en voiture</h3>
        <p>Il dessert 4 parcs accessibles uniquement en voiture : les Lions, les Ours, les Rhinocéros et la grande plaine africaine. Suivez le balisage et ne dépassez jamais les zones délimitées. La vitesse maximum est de 10 km/h.</p>

        <h3>Le parcours à pied</h3>
        <p>Les zones pédestres accueillent les oiseaux (flamants roses sur l'étang !), les primates, les félins dans des enclos sécurisés, les reptiles et une grande variété d'animaux d'Asie et d'Amérique. Des aires de pique-nique sont disponibles tout au long du parcours.</p>

        <h2>Conseils pratiques</h2>
        <ul>
          <li><strong>Horaires</strong> : ouvert tous les jours de 9h à 18h (17h en hiver)</li>
          <li><strong>Tarifs</strong> : environ 30€ adulte, 25€ enfant (3-12 ans). Gratuit pour les moins de 3 ans</li>
          <li><strong>Idéal pour</strong> : familles avec enfants de tous âges, amoureux de la nature et de la photo</li>
          <li><strong>Animaux de compagnie</strong> : interdits dans la réserve</li>
          <li><strong>Meilleure saison</strong> : mai-juin et septembre (moins de monde, animaux plus actifs par temps frais)</li>
          <li><strong>À combiner avec</strong> : Narbonne et ses plages, les Corbières, Carcassonne (40 min)</li>
        </ul>

        <h2>Les alentours — que faire près de Sigean ?</h2>
        <ul>
          <li><strong>Narbonne</strong> (15 min) — ville gallo-romaine avec une cathédrale impressionnante et un marché couvert exceptionnel</li>
          <li><strong>Gruissan</strong> (20 min) — station balnéaire pittoresque avec son village circulaire et ses plages</li>
          <li><strong>Carcassonne</strong> (45 min) — la cité médiévale la mieux conservée d'Europe</li>
          <li><strong>Collioure</strong> (40 min) — le village des peintres fauves sur la Côte Vermeille</li>
        </ul>

        <div style={{ background: `linear-gradient(135deg, ${BROWN} 0%, #92400E 100%)`, borderRadius: 20, padding: '32px 28px', marginTop: 40, textAlign: 'center', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>🦒</div>
          <h3 style={{ fontSize: 22, fontWeight: 800, color: WHITE, marginBottom: 8 }}>Séjournez près de Sigean</h3>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.8)', marginBottom: 20 }}>Gîtes, maisons de vacances et appartements en Occitanie. Contact direct sans commission.</p>
          <a href="/location-vacances/occitanie" style={{ display: 'inline-block', background: GOLD, color: BROWN, borderRadius: 12, padding: '14px 28px', fontSize: 15, fontWeight: 800 }}>
            Voir les logements en Occitanie →
          </a>
        </div>

        <div style={{ marginTop: 48, paddingTop: 32, borderTop: `1px solid ${BORDER}`, fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
          <p style={{ fontSize: 11, color: ORANGE, letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 16 }}>À lire aussi</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { slug: 'vacances-famille-france', titre: 'Top 10 des régions françaises pour les vacances en famille' },
              { slug: 'gorges-verdon-guide', titre: 'Que faire dans les Gorges du Verdon ?' },
              { slug: 'vacances-provence-guide', titre: 'Location vacances en Provence — guide complet' },
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
