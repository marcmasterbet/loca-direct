import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Les plus belles plages de Corse — guide complet | LocaDirect',
  description: 'Eau turquoise, sable blanc, maquis parfumé... La Corse possède les plus belles plages de France. Notre sélection des incontournables par région.',
}

const ORANGE = '#EA580C'
const WHITE = '#FFFFFF'
const GRAY = '#F9FAFB'
const TEXT = '#1F2937'
const TEXT_DIM = '#6B7280'
const BORDER = '#E5E7EB'
const TEAL = '#0F766E'
const TEAL_LIGHT = '#F0FDFA'

export default function ArticleCorsePage() {
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
        blockquote { border-left: 4px solid #0F766E; padding: 16px 24px; background: #F0FDFA; border-radius: 0 12px 12px 0; margin: 28px 0; font-style: italic; color: #0F766E; }
      `}</style>

      <nav style={{ position: 'sticky', top: 0, zIndex: 100, background: WHITE, borderBottom: `1px solid ${BORDER}`, padding: '12px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
        <a href="/" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 34, height: 34, background: ORANGE, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>🏠</div>
          <span style={{ fontSize: 18, fontWeight: 800, color: TEXT }}>Loca<span style={{ color: ORANGE }}>Direct</span></span>
        </a>
        <div style={{ display: 'flex', gap: 8, fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
          <a href="/blog" style={{ fontSize: 14, color: TEXT_DIM, padding: '8px 14px' }}>← Blog</a>
          <a href="/location-vacances/corse" style={{ background: TEAL, color: WHITE, borderRadius: 10, padding: '10px 18px', fontSize: 14, fontWeight: 700 }}>Logements Corse</a>
        </div>
      </nav>

      <div style={{ position: 'relative', height: 500 }}>
        <img src="https://images.unsplash.com/photo-1533587851505-d119e13fa0d7?w=1400&q=85" alt="Plage de Corse eau turquoise" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 60%' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.1) 60%, transparent 100%)' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '40px 20px', maxWidth: 780, margin: '0 auto' }}>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 16, fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
            <span style={{ background: TEAL, color: WHITE, borderRadius: 20, padding: '4px 14px', fontSize: 12, fontWeight: 800 }}>🏖️ Guides régionaux</span>
            <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13 }}>4 juillet 2026 · 8 min de lecture</span>
          </div>
          <h1 style={{ fontSize: 38, fontWeight: 900, color: WHITE, lineHeight: 1.2, fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif', maxWidth: 700 }}>
            Les plus belles plages de Corse — notre sélection complète
          </h1>
        </div>
      </div>

      <div style={{ maxWidth: 740, margin: '0 auto', padding: '48px 20px 80px' }}>
        <blockquote>
          "Je suis allé dans 30 pays. Les plages de Corse restent parmi les plus belles que j'aie vues. Leau est à couper le souffle." — Julien, voyageur passionné
        </blockquote>

        <p>La Corse, surnommée l'Île de Beauté, possède plus de 200 plages. Certaines sont célèbres dans le monde entier, d'autres sont des secrets jalousement gardés par les locaux. Entre eau turquoise, sable blanc immaculé et maquis qui parfume l'air, chaque plage corse est une expérience unique.</p>

        <h2>Le Sud — les plages de carte postale</h2>

        <h3>🏅 Palombaggia — la plus photographiée de Corse</h3>
        <p>Près de Porto-Vecchio, Palombaggia est souvent classée parmi les plus belles plages d'Europe. Son sable rosé très fin, ses eaux limpides aux dégradés de turquoise et ses pins parasols en font un endroit magique. Arrivez avant 9h en juillet-août pour trouver de la place — ou hors saison pour la vivre comme vous la méritez.</p>
        <div style={{ background: TEAL_LIGHT, borderRadius: 12, padding: 16, marginBottom: 20, fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif', border: `1px solid #99F6E4` }}>
          <p style={{ fontSize: 13, color: TEAL, marginBottom: 0 }}>📍 Accès : depuis Porto-Vecchio, D468 vers le sud. Parking payant en saison (5-8€). Arrivée possible en navette depuis le village.</p>
        </div>

        <h3>🌊 Santa Giulia — la lagune parfaite</h3>
        <p>À quelques kilomètres de Palombaggia, Santa Giulia forme une baie quasi fermée avec un lagon naturel aux eaux d'un calme absolu. Idéale pour les familles avec enfants grâce aux eaux peu profondes et transparentes. Les écoles de kitesurf y sont nombreuses pour les amateurs de sports nautiques.</p>

        <h3>🐠 Rondinara — un cirque naturel époustouflant</h3>
        <p>En forme de coquille, la plage de Rondinara est entourée de collines qui la protègent du vent. Son eau cristalline permet de voir le fond à plusieurs mètres de profondeur. L'une des plus belles pour la plongée avec masque et tuba.</p>

        <h2>La Côte Ouest — grandiose et sauvage</h2>

        <h3>🌅 Plage de Arone — entre falaises rouges et mer bleue</h3>
        <p>Nichée dans le golfe de Porto, classé au patrimoine mondial de l'UNESCO, la plage d'Arone est accessible par une route en lacets mais récompense largement l'effort. Les falaises de granit rouge qui la dominent créent un contraste saisissant avec l'eau bleu cobalt.</p>

        <h3>⭐ Girolata — accessible uniquement à pied ou en bateau</h3>
        <p>Ce petit village de pêcheurs est l'un des derniers endroits de France accessible uniquement à pied (2h de marche depuis Bocca à la Croce) ou en bateau depuis Porto. La récompense est à la hauteur : une plage de galets dans une baie protégée, d'une beauté absolument sauvage.</p>

        <h2>Le Cap Corse — les plages secrètes</h2>

        <h3>💎 Plage de Nonza — noire et unique</h3>
        <p>La plage de Nonza est l'une des curiosités géologiques de Corse : son sable est noir, issu de l'érosion des roches serpentines. Surplombée par une tour génoise accrochée à la falaise, elle offre un panorama à couper le souffle sur le golfe de Saint-Florent. Beaucoup moins fréquentée que les plages du Sud.</p>

        <h3>🌿 Plage de Albo — le bout du monde</h3>
        <p>Sur la côte est du Cap Corse, la plage d'Albo est l'une des plus isolées de l'île. Galets gris, eau d'une pureté exceptionnelle, pas un touriste à l'horizon en dehors de juillet-août. Pour les amoureux de solitude et de nature brute.</p>

        <h2>La Haute-Corse — le nord préservé</h2>

        <h3>🐚 Lotu et Ostriconi — les joyaux de la Balagne</h3>
        <p>Dans la région de la Balagne, les plages de Lotu et d'Ostriconi font partie des plus sauvages de Corse. Leurs dunes naturelles sont protégées et leur accès est volontairement difficile pour préserver leur beauté. Ostriconi, en particulier, avec son embouchure de rivière, crée des paysages dignes de la Polynésie.</p>

        <h3>🌺 Saleccia — la reine des plages sauvages</h3>
        <p>Accessible uniquement en 4x4 sur une piste de 10 km ou en bateau depuis Saint-Florent, Saleccia est considérée par beaucoup comme la plus belle plage de Corse. 800 mètres de sable blanc quasi vierge, une eau d'une pureté absolue, entourée de pins et de maquis. Un paradis préservé.</p>

        <h2>Nos conseils pratiques</h2>
        <ul>
          <li><strong>Meilleure période</strong> : juin et septembre. Mer chaude, foules absentes, prix 30-40% moins chers</li>
          <li><strong>Réservez tôt</strong> : les logements près de Palombaggia partent 8-10 mois à l'avance pour août</li>
          <li><strong>Location de voiture</strong> : indispensable pour découvrir les plages sauvages</li>
          <li><strong>Respect de l'environnement</strong> : ne ramassez pas de sable, ne cueillez pas de fleurs de maquis</li>
          <li><strong>Évitez les feux de camp</strong> : la Corse est l'une des régions les plus sujettes aux incendies de forêt</li>
        </ul>

        <div style={{ background: `linear-gradient(135deg, ${TEAL} 0%, #0D9488 100%)`, borderRadius: 20, padding: '32px 28px', marginTop: 40, textAlign: 'center', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>🏖️</div>
          <h3 style={{ fontSize: 22, fontWeight: 800, color: WHITE, marginBottom: 8 }}>Trouvez votre logement en Corse</h3>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.8)', marginBottom: 20 }}>Villas, maisons de village, appartements face à la mer. Contact direct avec les propriétaires corses.</p>
          <a href="/location-vacances/corse" style={{ display: 'inline-block', background: WHITE, color: TEAL, borderRadius: 12, padding: '14px 28px', fontSize: 15, fontWeight: 800 }}>
            Voir les logements en Corse →
          </a>
        </div>

        <div style={{ marginTop: 48, paddingTop: 32, borderTop: `1px solid ${BORDER}`, fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
          <p style={{ fontSize: 11, color: ORANGE, letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 16 }}>À lire aussi</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { slug: 'gorges-verdon-guide', titre: 'Que faire dans les Gorges du Verdon ?' },
              { slug: 'vacances-bretagne-guide', titre: 'Vacances en Bretagne — le guide complet' },
              { slug: 'chateaux-de-la-loire', titre: 'Les châteaux de la Loire — guide de visite' },
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
