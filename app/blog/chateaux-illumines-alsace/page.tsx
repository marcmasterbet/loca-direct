import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Les plus beaux châteaux illuminés d\'Alsace à Noël | LocaDirect',
  description: 'Haut-Koenigsbourg, Andlau, Fleckenstein... Les châteaux alsaciens illuminés à Noël sont un spectacle inoubliable. Notre sélection et comment les visiter.',
}

const ORANGE = '#EA580C'
const WHITE = '#FFFFFF'
const GRAY = '#F9FAFB'
const TEXT = '#1F2937'
const TEXT_DIM = '#6B7280'
const BORDER = '#E5E7EB'
const NOEL = '#B91C1C'
const MEDIEVAL = '#1C1917'

export default function ArticleChateauxAlsacePage() {
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
        blockquote { border-left: 4px solid #B91C1C; padding: 16px 24px; background: #FEF2F2; border-radius: 0 12px 12px 0; margin: 28px 0; font-style: italic; color: #B91C1C; }
      `}</style>

      <nav style={{ position: 'sticky', top: 0, zIndex: 100, background: WHITE, borderBottom: `1px solid ${BORDER}`, padding: '12px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
        <a href="/" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 34, height: 34, background: ORANGE, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>🏠</div>
          <span style={{ fontSize: 18, fontWeight: 800, color: TEXT }}>Loca<span style={{ color: ORANGE }}>Direct</span></span>
        </a>
        <div style={{ display: 'flex', gap: 8, fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
          <a href="/blog" style={{ fontSize: 14, color: TEXT_DIM, padding: '8px 14px' }}>← Blog</a>
          <a href="/location-vacances/grand-est" style={{ background: NOEL, color: WHITE, borderRadius: 10, padding: '10px 18px', fontSize: 14, fontWeight: 700 }}>🎄 Logements Alsace</a>
        </div>
      </nav>

      <div style={{ position: 'relative', height: 500 }}>
        <img src="https://images.unsplash.com/photo-1466442929976-97f336a657be?w=1400&q=85" alt="Château alsacien illuminé nuit de Noël" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 40%' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 55%, transparent 100%)' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '40px 20px', maxWidth: 780, margin: '0 auto' }}>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 16, fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
            <span style={{ background: NOEL, color: WHITE, borderRadius: 20, padding: '4px 14px', fontSize: 12, fontWeight: 800 }}>🏰 Châteaux & Noël</span>
            <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13 }}>4 juillet 2026 · 6 min de lecture</span>
          </div>
          <h1 style={{ fontSize: 36, fontWeight: 900, color: WHITE, lineHeight: 1.2, fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif', maxWidth: 700 }}>
            Les plus beaux châteaux illuminés d'Alsace à Noël
          </h1>
        </div>
      </div>

      <div style={{ maxWidth: 740, margin: '0 auto', padding: '48px 20px 80px' }}>
        <blockquote>
          "Voir le Haut-Koenigsbourg illuminé depuis la plaine un soir de décembre brumeux, avec la neige sur les crêtes vosgiennes — c'est une image qui ne se décrit pas. Elle se vit."
        </blockquote>

        <p>L'Alsace compte plus de 70 châteaux, dont la plupart perchés sur les crêtes vosgiennes qui dominent la plaine. En décembre, plusieurs d'entre eux organisent des illuminations et des marchés de Noël exceptionnels dans leurs enceintes médiévales. Une expérience unique à la frontière du conte de fées et de l'histoire.</p>

        <h2>🏆 Le château du Haut-Koenigsbourg — le plus grand et le plus visité</h2>
        <p>Dominant la plaine d'Alsace depuis ses 755 mètres d'altitude, le Haut-Koenigsbourg est le château le plus visité d'Alsace avec 500 000 visiteurs par an. Restauré par Guillaume II au début du XXe siècle, c'est l'un des châteaux forts les mieux conservés d'Europe. En décembre, le marché de Noël dans ses cours intérieures médiévales, aux flambeaux, est une expérience hors du commun.</p>
        <div style={{ background: '#F0F9FF', borderRadius: 12, padding: 16, marginBottom: 20, fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif', border: '1px solid #BAE6FD' }}>
          <p style={{ fontSize: 13, color: '#0369A1', marginBottom: 0 }}>📅 Marché de Noël : les premiers week-ends de décembre. Accès en voiture depuis Saint-Hippolyte (10 min) ou Kintzheim. Vérifiez les dates sur le site du château chaque année.</p>
        </div>

        <h2>🏰 Le château du Fleckenstein — les ruines les plus spectaculaires</h2>
        <p>À la frontière nord de l'Alsace, dans le Parc Naturel Régional des Vosges du Nord, le Fleckenstein est un château-rocher du XIIe siècle taillé directement dans le grès rose des Vosges. Ses ruines impressionnantes perchées sur un éperon rocheux offrent une vue époustouflante. En décembre, le château s'illumine et accueille un marché médiéval nocturne aux flambeaux — l'une des expériences les plus saisissantes de l'Alsace de Noël.</p>

        <h2>🌟 Le château Saint-Ulrich à Ribeauvillé — les ruines romantiques</h2>
        <p>Surplombant Ribeauvillé depuis ses 530 mètres, le château Saint-Ulrich est l'un des trois châteaux qui dominent la ville. Ses ruines romantiques s'illuminent chaque soir de décembre depuis le belvédère situé juste en dessous. La vue sur la plaine alsacienne illuminée, avec les cigognes nichant sur les tours, est inoubliable.</p>

        <h2>🎄 Le château des Rohan à Saverne — le "Versailles alsacien"</h2>
        <p>Le château des Rohan de Saverne, surnommé le "Versailles alsacien" pour sa façade de 144 mètres, accueille chaque année un marché de Noël dans sa cour d'honneur. Le contraste entre l'architecture néoclassique imposante et les chalets en bois illuminés crée une atmosphère unique. Le marché se tient généralement les deux premiers week-ends de décembre.</p>

        <h2>⭐ Les illuminations de Sélestat — la ville du sapin de Noël</h2>
        <p>Sélestat revendique l'invention du sapin de Noël — une mention dans un registre de comptes de 1521 en atteste. Chaque décembre, la ville illumine ses rues et ses monuments avec une générosité particulière. Le château d'eau transformé en sapin géant lumineux est devenu l'un des symboles de Noël en Alsace.</p>

        <h2>Comment visiter les châteaux de nuit</h2>
        <ul>
          <li><strong>Habillez-vous très chaudement</strong> — les châteaux sont sur les hauteurs, les températures descendent facilement à -5°C voire -10°C</li>
          <li><strong>Chaussures de randonnée obligatoires</strong> — les chemins d'accès sont souvent en pierres ou en terre, parfois enneigés</li>
          <li><strong>Torche ou lampe frontale</strong> — indispensable pour les châteaux en ruines</li>
          <li><strong>Réservez les événements à l'avance</strong> — les marchés dans les châteaux sont contingentés</li>
          <li><strong>Prévoyez une heure de marche</strong> pour la plupart des châteaux sur les crêtes</li>
        </ul>

        <h2>Les illuminations des villages — encore plus belles</h2>
        <p>Au-delà des châteaux, les villages alsaciens illuminés à Noël sont souvent encore plus beaux. Eguisheim avec ses maisons à colombages éclairées aux bougies, Riquewihr avec ses fenêtres fleuries de houx et ses guirlandes de lumière, Kaysersberg avec ses lanternes aux carrefours — chaque village a ses propres illuminations. Une promenade nocturne dans ces ruelles est l'une des expériences les plus mémorables d'Alsace.</p>

        <div style={{ background: `linear-gradient(135deg, ${MEDIEVAL} 0%, #292524 100%)`, borderRadius: 20, padding: '32px 28px', marginTop: 40, textAlign: 'center', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>🏰</div>
          <h3 style={{ fontSize: 22, fontWeight: 800, color: WHITE, marginBottom: 8 }}>Séjournez au pied des châteaux alsaciens</h3>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.8)', marginBottom: 20 }}>Gîtes et maisons dans les villages viticoles, à deux pas des châteaux les plus beaux d'Alsace.</p>
          <a href="/location-vacances/grand-est" style={{ display: 'inline-block', background: NOEL, color: WHITE, borderRadius: 12, padding: '14px 28px', fontSize: 15, fontWeight: 800 }}>
            Voir les logements en Alsace →
          </a>
        </div>

        <div style={{ marginTop: 48, paddingTop: 32, borderTop: `1px solid ${BORDER}`, fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
          <p style={{ fontSize: 11, color: ORANGE, letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 16 }}>À lire aussi</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { slug: 'marches-noel-alsace', titre: 'Les plus beaux marchés de Noël d\'Alsace' },
              { slug: 'restaurants-alsace-noel', titre: 'Les meilleurs restaurants d\'Alsace à Noël' },
              { slug: 'alsace-belle-region', titre: 'L\'Alsace, une si belle région' },
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
