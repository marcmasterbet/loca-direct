import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Visiter Marseille — que voir, que faire ? Guide complet | LocaDirect',
  description: 'Vieux-Port, Calanques, MuCEM, Panier, bouillabaisse... Marseille est une ville qui ne laisse pas indifférent. Notre guide pour la découvrir comme un local.',
}

const ORANGE = '#EA580C'
const WHITE = '#FFFFFF'
const GRAY = '#F9FAFB'
const TEXT = '#1F2937'
const TEXT_DIM = '#6B7280'
const BORDER = '#E5E7EB'
const BLUE = '#1D4ED8'
const BLUE_LIGHT = '#EFF6FF'

export default function ArticleMarseillePage() {
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
        blockquote { border-left: 4px solid #1D4ED8; padding: 16px 24px; background: #EFF6FF; border-radius: 0 12px 12px 0; margin: 28px 0; font-style: italic; color: #1D4ED8; }
      `}</style>

      <nav style={{ position: 'sticky', top: 0, zIndex: 100, background: WHITE, borderBottom: `1px solid ${BORDER}`, padding: '12px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
        <a href="/" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 34, height: 34, background: ORANGE, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>🏠</div>
          <span style={{ fontSize: 18, fontWeight: 800, color: TEXT }}>Loca<span style={{ color: ORANGE }}>Direct</span></span>
        </a>
        <div style={{ display: 'flex', gap: 8, fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
          <a href="/blog" style={{ fontSize: 14, color: TEXT_DIM, padding: '8px 14px' }}>← Blog</a>
          <a href="/location-vacances/provence-alpes-cote-dazur" style={{ background: ORANGE, color: WHITE, borderRadius: 10, padding: '10px 18px', fontSize: 14, fontWeight: 700 }}>Logements Marseille</a>
        </div>
      </nav>

      <div style={{ position: 'relative', height: 500 }}>
        <img src="https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=1400&q=85" alt="Marseille Vieux-Port" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.15) 60%, transparent 100%)' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '40px 20px', maxWidth: 780, margin: '0 auto' }}>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 16, fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
            <span style={{ background: ORANGE, color: WHITE, borderRadius: 20, padding: '4px 14px', fontSize: 12, fontWeight: 800 }}>🌊 Guides villes</span>
            <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13 }}>4 juillet 2026 · 8 min de lecture</span>
          </div>
          <h1 style={{ fontSize: 38, fontWeight: 900, color: WHITE, lineHeight: 1.2, fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif', maxWidth: 700 }}>
            Visiter Marseille — que voir, que faire ? Le guide du local
          </h1>
        </div>
      </div>

      <div style={{ maxWidth: 740, margin: '0 auto', padding: '48px 20px 80px' }}>
        <blockquote>
          "Marseille, c'est la ville que les gens qui n'y sont jamais allés critiquent, et que ceux qui y ont habité ne peuvent pas quitter." — Un Marseillais de souche
        </blockquote>

        <p>Marseille est la plus ancienne ville de France (600 ans avant J.-C.) et la deuxième ville du pays. Longtemps boudée par les touristes, elle s'est profondément transformée depuis son titre de Capitale Européenne de la Culture en 2013. Aujourd'hui, Marseille est l'une des villes les plus attachantes de France — bruyante, colorée, imprévisible, avec une mer d'un bleu électrique à 20 minutes du centre.</p>

        <h2>Les incontournables</h2>

        <h3>⚓ Le Vieux-Port</h3>
        <p>C'est le cœur battant de Marseille depuis 2 600 ans. Chaque matin, les pêcheurs y vendent leur prise directement depuis leurs bateaux. La criée au poisson, face à la Mairie, est un spectacle vivant et authentique. Le soir, le Vieux-Port s'anime de terrasses et de restaurants. L'ombrière de Norman Foster, immense miroir d'acier poli qui reflète le port, est devenu l'un des symboles modernes de la ville.</p>

        <h3>🏛️ Le MuCEM — le musée phare</h3>
        <p>Le Musée des Civilisations de l'Europe et de la Méditerranée est une œuvre d'art en soi. Son architecture en dentelle de béton, reliée par une passerelle au Fort Saint-Jean vieux de 600 ans, est spectaculaire. Les collections permanentes retracent l'histoire des civilisations méditerranéennes, mais ce sont les expositions temporaires qui font l'actualité culturelle de la ville.</p>

        <h3>⛪ Notre-Dame de la Garde — la Bonne Mère</h3>
        <p>Perchée sur son rocher à 162 mètres, Notre-Dame de la Garde est le symbole absolu de Marseille. Du haut de sa tour, la vue à 360° sur la ville, les îles du Frioul et les Calanques est inoubliable. Les Marseillais l'appellent affectueusement la "Bonne Mère" et lui vouent une dévotion sincère, quelle que soit leur religion.</p>

        <h3>🌿 Le Panier — le plus vieux quartier</h3>
        <p>Le quartier du Panier, bâti sur la colline qui domine le Vieux-Port, est le plus vieux quartier de Marseille. Ses ruelles colorées, ses escaliers, ses street-arts et ses placettes ombragées constituent une expérience unique. La Vieille Charité, ancienne aumônerie du XVIIe siècle, abrite aujourd'hui des musées et une salle de spectacle.</p>

        <h2>🏖️ Les Calanques — la nature à portée de ville</h2>
        <p>Les Calanques sont ce qui rend Marseille vraiment unique. Ces fjords calcaires aux eaux turquoise s'étendent sur 20 km entre Marseille et Cassis. Plusieurs calanques sont accessibles à pied depuis la ville en 1 à 2 heures de marche. Les plus belles — Morgiou, Sormiou, En-Vau, Port-Pin — nécessitent une réservation en saison pour préserver le site.</p>

        <div style={{ background: BLUE_LIGHT, borderRadius: 12, padding: 16, marginBottom: 20, fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif', border: `1px solid #BFDBFE` }}>
          <p style={{ fontSize: 13, color: BLUE, marginBottom: 0 }}>💡 Entre juin et septembre, l'accès aux Calanques est réglementé en raison du risque incendie. Réservez en ligne sur le site du Parc National des Calanques. L'accès est parfois restreint les jours de grand vent.</p>
        </div>

        <h2>La gastronomie marseillaise</h2>

        <h3>🐟 La bouillabaisse — le plat mythique</h3>
        <p>La vraie bouillabaisse est un rituel. Ce n'est pas une soupe de poisson ordinaire — c'est un plat élaboré avec au minimum quatre espèces de poissons de roche, servi en deux temps : le bouillon avec les croûtons et la rouille d'abord, les poissons entiers ensuite. Comptez entre 50 et 80€ par personne dans un restaurant sérieux. Méfiez-vous des "fausses" bouillabaisses vendues 15€.</p>

        <h3>🥐 Le petit-déjeuner marseillais</h3>
        <p>Les navettes de Saint-Victor (petits biscuits à la fleur d'oranger), la tapenade, les panisses (beignets de farine de pois chiches) et les pissaladières font partie du patrimoine culinaire local.</p>

        <h3>🍷 Le marché du Cours Julien</h3>
        <p>Chaque mercredi et samedi, le marché du Cours Julien rassemble producteurs locaux, fromagers, charcutiers et viticulteurs. C'est l'endroit idéal pour goûter les saveurs de la Provence et du Languedoc.</p>

        <h2>Nos conseils pratiques</h2>
        <ul>
          <li><strong>Meilleure période</strong> : mai-juin et septembre. Évitez août (canicule, foules, parking impossible)</li>
          <li><strong>Transports</strong> : le métro couvre bien le centre. Louez un vélo pour longer la côte</li>
          <li><strong>Sécurité</strong> : comme dans toute grande ville, évitez de montrer vos objets de valeur dans certains quartiers. Le centre touristique est parfaitement sûr</li>
          <li><strong>Budget</strong> : plus abordable que Paris ou Nice. Un bon restaurant : 25-40€/personne</li>
        </ul>

        <div style={{ background: `linear-gradient(135deg, #1D4ED8 0%, #1E40AF 100%)`, borderRadius: 20, padding: '32px 28px', marginTop: 40, textAlign: 'center', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>⚓</div>
          <h3 style={{ fontSize: 22, fontWeight: 800, color: WHITE, marginBottom: 8 }}>Logements à Marseille et en PACA</h3>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.8)', marginBottom: 20 }}>Appartements, maisons, studios. Contact direct avec les propriétaires marseillais.</p>
          <a href="/location-vacances/provence-alpes-cote-dazur" style={{ display: 'inline-block', background: WHITE, color: BLUE, borderRadius: 12, padding: '14px 28px', fontSize: 15, fontWeight: 800 }}>
            Voir les logements →
          </a>
        </div>

        <div style={{ marginTop: 48, paddingTop: 32, borderTop: `1px solid ${BORDER}`, fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
          <p style={{ fontSize: 11, color: ORANGE, letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 16 }}>À lire aussi</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { slug: 'gorges-verdon-guide', titre: 'Que faire dans les Gorges du Verdon ?' },
              { slug: 'vacances-provence-guide', titre: 'Location vacances en Provence — guide complet' },
              { slug: 'plages-corse', titre: 'Les plus belles plages de Corse' },
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
