import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tour en Vendée — que voir et que faire ? Guide complet | LocaDirect',
  description: 'Puy du Fou, Marais Poitevin, plages du littoral atlantique... La Vendée réserve bien des surprises. Notre guide pour un séjour réussi.',
}

const ORANGE = '#EA580C'
const WHITE = '#FFFFFF'
const GRAY = '#F9FAFB'
const TEXT = '#1F2937'
const TEXT_DIM = '#6B7280'
const BORDER = '#E5E7EB'
const AMBER = '#B45309'
const AMBER_LIGHT = '#FFFBEB'

export default function ArticleVendeePage() {
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
        blockquote { border-left: 4px solid #B45309; padding: 16px 24px; background: #FFFBEB; border-radius: 0 12px 12px 0; margin: 28px 0; font-style: italic; color: #B45309; }
      `}</style>

      <nav style={{ position: 'sticky', top: 0, zIndex: 100, background: WHITE, borderBottom: `1px solid ${BORDER}`, padding: '12px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
        <a href="/" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 34, height: 34, background: ORANGE, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>🏠</div>
          <span style={{ fontSize: 18, fontWeight: 800, color: TEXT }}>Loca<span style={{ color: ORANGE }}>Direct</span></span>
        </a>
        <div style={{ display: 'flex', gap: 8, fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
          <a href="/blog" style={{ fontSize: 14, color: TEXT_DIM, padding: '8px 14px' }}>← Blog</a>
          <a href="/location-vacances/pays-de-la-loire" style={{ background: ORANGE, color: WHITE, borderRadius: 10, padding: '10px 18px', fontSize: 14, fontWeight: 700 }}>Logements Vendée</a>
        </div>
      </nav>

      <div style={{ position: 'relative', height: 480 }}>
        <img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1400&q=85" alt="Plage atlantique Vendée" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 40%' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.15) 60%, transparent 100%)' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '40px 20px', maxWidth: 780, margin: '0 auto' }}>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 16, fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
            <span style={{ background: ORANGE, color: WHITE, borderRadius: 20, padding: '4px 14px', fontSize: 12, fontWeight: 800 }}>🌊 Guides régionaux</span>
            <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13 }}>4 juillet 2026 · 7 min de lecture</span>
          </div>
          <h1 style={{ fontSize: 38, fontWeight: 900, color: WHITE, lineHeight: 1.2, fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif', maxWidth: 700 }}>
            Tour en Vendée — que voir, que faire ? Le guide complet
          </h1>
        </div>
      </div>

      <div style={{ maxWidth: 740, margin: '0 auto', padding: '48px 20px 80px' }}>
        <blockquote>
          "Je pensais que la Vendée c'était juste des plages. J'ai découvert un département incroyablement riche — marais, histoire, gastronomie, et le Puy du Fou qui reste le meilleur spectacle que j'aie vu de ma vie." — Claire, touriste parisienne
        </blockquote>

        <p>La Vendée est l'un des départements français qui réserve le plus de surprises. Souvent associée à ses plages atlantiques, elle cache un patrimoine historique exceptionnel, des paysages variés entre marais, bocage et littoral, et surtout le Puy du Fou, régulièrement élu meilleur parc d'attractions du monde. Tour d'horizon de tout ce que vous ne pouvez pas manquer.</p>

        <h2>🎭 Le Puy du Fou — une expérience hors du commun</h2>
        <p>Le Puy du Fou n'est pas un parc d'attractions ordinaire. C'est un spectacle vivant à ciel ouvert où 1 900 acteurs bénévoles reconstituent l'histoire de la Vendée avec des décors grandioses, des effets spéciaux époustouflants et une mise en scène cinématographique. Le Cinéscénie, le spectacle nocturne du vendredi et samedi soir, est le plus grand spectacle de nuit au monde.</p>
        <div style={{ background: AMBER_LIGHT, borderRadius: 12, padding: 16, marginBottom: 20, fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif', border: `1px solid #FCD34D` }}>
          <p style={{ fontSize: 13, color: AMBER, marginBottom: 0 }}>💡 Réservez plusieurs mois à l'avance pour juillet-août. Prévoyez 2 jours minimum pour tout voir. Le Grand Parc est ouvert d'avril à novembre.</p>
        </div>

        <h2>🌿 Le Marais Poitevin — la Venise verte</h2>
        <p>Le Marais Poitevin est l'un des plus grands marais de France. Ses canaux ombragés par les frênes et les aulnes créent un paysage d'une beauté étrange et apaisante, surnommé la "Venise verte". La visite en barque plate est incontournable — les bateliers vous guident silencieusement sous un couvert végétal d'un vert intense. Un moment de sérénité absolue.</p>

        <h2>🏖️ Le littoral — 250 km de côtes atlantiques</h2>

        <h3>Saint-Jean-de-Monts</h3>
        <p>L'une des stations balnéaires les plus appréciées des familles. Ses 13 km de plage de sable fin, ses pistes cyclables (65 km !) et ses nombreuses activités nautiques en font une destination idéale avec des enfants.</p>

        <h3>Les Sables-d'Olonne</h3>
        <p>Ville la plus touristique de Vendée, Les Sables est connue pour sa plage monumentale de 2,5 km en plein cœur de ville et pour être le port d'arrivée du Vendée Globe, la course à la voile en solitaire autour du monde. Le vieux quartier de La Chaume, de l'autre côté du chenal, vaut la visite.</p>

        <h3>L'Île de Noirmoutier</h3>
        <p>Accessible par le pont ou, à marée basse uniquement, par le Passage du Gois (4,5 km de route submersible), Noirmoutier est une île douce et lumineuse avec ses marais salants, ses mimosas et ses plages abritées. La pomme de terre de Noirmoutier, la Bonnotte, est la plus chère du monde.</p>

        <h2>🏰 Le patrimoine historique</h2>

        <h3>Le Château des Ducs de La Trémoïlle à Tiffauges</h3>
        <p>Les ruines impressionnantes du château de Barbe-Bleue (Gilles de Rais) dominent la vallée de la Crûme. Un site médiéval exceptionnel avec des animations historiques en saison.</p>

        <h3>Le Mémorial de Vendée</h3>
        <p>À Saint-Laurent-sur-Sèvre, ce mémorial retrace l'histoire des Guerres de Vendée (1793-1796), l'un des épisodes les plus dramatiques de la Révolution française. Un lieu de mémoire sobre et émouvant.</p>

        <h2>🍽️ La gastronomie vendéenne</h2>
        <ul>
          <li><strong>La brioche vendéenne</strong> — tressée et parfumée à la fleur d'oranger, elle n'a rien à voir avec la brioche industrielle</li>
          <li><strong>Le préfou</strong> — pain à l'ail chaud, spécialité de charcutier, parfait à l'apéritif</li>
          <li><strong>Les huîtres de Noirmoutier</strong> — élevées dans des eaux exceptionnelles</li>
          <li><strong>Le jambon de Vendée</strong> — séché et fumé selon des méthodes traditionnelles</li>
          <li><strong>Le muscadet</strong> — le vin blanc sec et minéral de la Loire, parfait avec les fruits de mer</li>
        </ul>

        <div style={{ background: `linear-gradient(135deg, #EA580C 0%, #C2410C 100%)`, borderRadius: 20, padding: '32px 28px', marginTop: 40, textAlign: 'center', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>🌊</div>
          <h3 style={{ fontSize: 22, fontWeight: 800, color: WHITE, marginBottom: 8 }}>Trouvez votre logement en Vendée</h3>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.8)', marginBottom: 20 }}>Maisons de vacances, gîtes ruraux, appartements côtiers. Contact direct sans commission.</p>
          <a href="/location-vacances/pays-de-la-loire" style={{ display: 'inline-block', background: WHITE, color: ORANGE, borderRadius: 12, padding: '14px 28px', fontSize: 15, fontWeight: 800 }}>
            Voir les logements en Vendée →
          </a>
        </div>

        <div style={{ marginTop: 48, paddingTop: 32, borderTop: `1px solid ${BORDER}`, fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
          <p style={{ fontSize: 11, color: ORANGE, letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 16 }}>À lire aussi</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { slug: 'chateaux-de-la-loire', titre: 'Les châteaux de la Loire — guide de visite' },
              { slug: 'vacances-bretagne-guide', titre: 'Vacances en Bretagne — le guide complet' },
              { slug: 'vacances-famille-france', titre: 'Top 10 des régions françaises pour les vacances en famille' },
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
