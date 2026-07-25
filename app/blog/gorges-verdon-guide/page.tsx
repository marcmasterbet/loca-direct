import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Que faire dans les Gorges du Verdon ? Guide complet | LocaDirect',
  description: 'Le Grand Canyon européen vous attend. Randonnée, kayak, escalade, baignades... Tout ce qu\'il faut savoir pour visiter les Gorges du Verdon et trouver un logement.',
}

const ORANGE = '#EA580C'
const WHITE = '#FFFFFF'
const GRAY = '#F9FAFB'
const TEXT = '#1F2937'
const TEXT_DIM = '#6B7280'
const BORDER = '#E5E7EB'
const GREEN = '#15803D'
const GREEN_LIGHT = '#F0FDF4'

export default function ArticleVerdonPage() {
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
        blockquote { border-left: 4px solid #15803D; padding: 16px 24px; background: #F0FDF4; border-radius: 0 12px 12px 0; margin: 28px 0; font-style: italic; color: #15803D; }
      `}</style>

      <nav style={{ position: 'sticky', top: 0, zIndex: 100, background: WHITE, borderBottom: `1px solid ${BORDER}`, padding: '12px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
        <a href="/" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 34, height: 34, background: ORANGE, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>🏠</div>
          <span style={{ fontSize: 18, fontWeight: 800, color: TEXT }}>Loca<span style={{ color: ORANGE }}>Direct</span></span>
        </a>
        <div style={{ display: 'flex', gap: 8, fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
          <a href="/blog" style={{ fontSize: 14, color: TEXT_DIM, padding: '8px 14px' }}>← Blog</a>
          <a href="/location-vacances/provence-alpes-cote-dazur" style={{ background: GREEN, color: WHITE, borderRadius: 10, padding: '10px 18px', fontSize: 14, fontWeight: 700 }}>Logements PACA</a>
        </div>
      </nav>

      <div style={{ position: 'relative', height: 500 }}>
        <img src="https://images.unsplash.com/photo-1558618047-3c8e6d2e9f2c?w=1400&q=85" alt="Gorges du Verdon" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.15) 60%, transparent 100%)' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '40px 20px', maxWidth: 780, margin: '0 auto' }}>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 16, fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
            <span style={{ background: GREEN, color: WHITE, borderRadius: 20, padding: '4px 14px', fontSize: 12, fontWeight: 800 }}>🏔️ Guides régionaux</span>
            <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13 }}>4 juillet 2026 · 7 min de lecture</span>
          </div>
          <h1 style={{ fontSize: 38, fontWeight: 900, color: WHITE, lineHeight: 1.2, fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif', maxWidth: 700 }}>
            Que faire dans les Gorges du Verdon ? Le guide complet
          </h1>
        </div>
      </div>

      <div style={{ maxWidth: 740, margin: '0 auto', padding: '48px 20px 80px' }}>
        <blockquote>
          "Les Gorges du Verdon m'ont laissé sans voix. Je cherchais du grandiose — je n'imaginais pas que la France pouvait offrir ça." — Alexandre, randonneur
        </blockquote>

        <p>Surnommées le "Grand Canyon européen", les Gorges du Verdon sont l'un des sites naturels les plus spectaculaires de France. Sur 25 kilomètres, la rivière Verdon a creusé dans le calcaire des falaises atteignant 700 mètres de hauteur. L'eau, d'un vert émeraude irréel, contraste avec le blanc des falaises et le bleu du ciel provençal. Un spectacle inoubliable.</p>

        <h2>Les activités incontournables</h2>

        <h3>🚣 Kayak et canoë — la meilleure façon de découvrir les gorges</h3>
        <p>Naviguer au fond des gorges est une expérience unique. Plusieurs loueurs proposent des kayaks et canoës au départ de Castellane ou de Moustiers-Sainte-Marie. Comptez une journée complète pour le parcours intégral (25 km), ou une demi-journée pour les sections les plus accessibles. Le niveau requis est débutant pour la plupart des tronçons.</p>
        <div style={{ background: GREEN_LIGHT, borderRadius: 12, padding: 16, marginBottom: 20, fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif', border: '1px solid #BBF7D0' }}>
          <p style={{ fontSize: 13, color: GREEN, marginBottom: 0 }}>💡 Réservez impérativement en juillet-août. Les loueurs affichent complet dès le mois de mai.</p>
        </div>

        <h3>🥾 Randonnée — le Sentier Martel</h3>
        <p>Le Sentier Martel est le sentier emblématique des gorges. Il longe la rivière sur 14 km, nécessitant deux heures de navette pour la logistique. La randonnée prend une journée complète et passe par des tunnels creusés dans la roche, des passerelles vertigineuses et des points de vue à couper le souffle. Niveau : intermédiaire. Chaussures de randonnée obligatoires.</p>

        <h3>🏊 Les baignades</h3>
        <p>L'eau du Verdon est fraîche même en plein été (16-18°C) mais d'une clarté absolue. Les points de baignade les plus accessibles sont au Lac de Sainte-Croix (eau plus chaude, idéale pour les familles) et à la plage des Salles-sur-Verdon. Le lac artificiel de Sainte-Croix est l'un des plus grands de France avec ses 2 200 hectares d'eau turquoise.</p>

        <h3>🧗 Escalade</h3>
        <p>Les falaises calcaires des gorges sont un paradis pour les grimpeurs. Des voies de tous niveaux sont disponibles, de l'initiation aux grandes voies pour experts. Les secteurs de la Palud-sur-Verdon et du Point Sublime sont les plus fréquentés. Des guides locaux proposent des initiations pour débutants.</p>

        <h3>🚗 La route des crêtes</h3>
        <p>Pour ceux qui préfèrent admirer les gorges depuis les hauteurs, la D23 (route des crêtes) offre des belvédères spectaculaires sur 23 km. Le belvédère de l'Escalès, avec ses 800 mètres de surplomb, est le plus impressionnant. La route est à sens unique de juin à septembre.</p>

        <h2>Les villages à ne pas manquer</h2>

        <h3>🌸 Moustiers-Sainte-Marie</h3>
        <p>Ce village, accroché à la falaise avec une étoile dorée suspendue entre deux rochers, est l'un des Plus Beaux Villages de France. Célèbre pour ses faïences depuis le XVIIe siècle, ses ruelles fleuries et sa chapelle Notre-Dame-de-Beauvoir (accessible par 262 marches), Moustiers est un passage obligé.</p>

        <h3>🏰 Castellane</h3>
        <p>Porte d'entrée des gorges depuis l'est, Castellane est dominée par un rocher de 184 mètres surmonté d'une chapelle. C'est le point de départ idéal pour les activités dans les gorges. Nombreuses boutiques de loueurs et guides de canyoning.</p>

        <h2>Pratique — comment organiser son séjour</h2>

        <ul>
          <li><strong>Durée idéale</strong> : 3 à 5 jours pour profiter de toutes les activités</li>
          <li><strong>Meilleure période</strong> : mai-juin ou septembre. Juillet-août : très chaud et très fréquenté</li>
          <li><strong>Base de logement</strong> : Moustiers-Sainte-Marie (côté ouest) ou Castellane (côté est)</li>
          <li><strong>Voiture indispensable</strong> : les transports en commun sont inexistants</li>
          <li><strong>Réservations</strong> : logements et activités se réservent plusieurs mois à l'avance pour la haute saison</li>
        </ul>

        <div style={{ background: `linear-gradient(135deg, ${GREEN} 0%, #16A34A 100%)`, borderRadius: 20, padding: '32px 28px', marginTop: 40, textAlign: 'center', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>🏔️</div>
          <h3 style={{ fontSize: 22, fontWeight: 800, color: WHITE, marginBottom: 8 }}>Logements près des Gorges du Verdon</h3>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.8)', marginBottom: 20 }}>Mas provençaux, gîtes ruraux, maisons de village. Contact direct avec les propriétaires.</p>
          <a href="/location-vacances/provence-alpes-cote-dazur" style={{ display: 'inline-block', background: WHITE, color: GREEN, borderRadius: 12, padding: '14px 28px', fontSize: 15, fontWeight: 800 }}>
            Voir les logements en PACA →
          </a>
        </div>

        <div style={{ marginTop: 48, paddingTop: 32, borderTop: `1px solid ${BORDER}`, fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
          <p style={{ fontSize: 11, color: ORANGE, letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 16 }}>À lire aussi</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { slug: 'plages-corse', titre: 'Les plus belles plages de Corse' },
              { slug: 'vacances-provence-guide', titre: 'Location vacances en Provence — guide complet' },
              { slug: 'marseille-guide', titre: 'Visiter Marseille — le guide complet' },
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
