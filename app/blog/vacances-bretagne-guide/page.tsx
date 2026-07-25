import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Vacances en Bretagne — guide complet pour bien choisir son logement | LocaDirect',
  description: 'Côte sauvage, crêperies, menhirs... La Bretagne est la région la plus demandée en location saisonnière. Voici comment trouver le bon logement au bon prix.',
}

const ORANGE = '#EA580C'
const WHITE = '#FFFFFF'
const GRAY = '#F9FAFB'
const TEXT = '#1F2937'
const TEXT_DIM = '#6B7280'
const BORDER = '#E5E7EB'
const BLUE = '#1D4ED8'
const BLUE_LIGHT = '#EFF6FF'

export default function ArticleBretagnePage() {
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
        blockquote { border-left: 4px solid #EA580C; padding: 16px 24px; background: #FFF7ED; border-radius: 0 12px 12px 0; margin: 28px 0; font-style: italic; color: #92400E; }
      `}</style>

      <nav style={{ position: 'sticky', top: 0, zIndex: 100, background: WHITE, borderBottom: `1px solid ${BORDER}`, padding: '12px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
        <a href="/" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 34, height: 34, background: ORANGE, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>🏠</div>
          <span style={{ fontSize: 18, fontWeight: 800, color: TEXT }}>Loca<span style={{ color: ORANGE }}>Direct</span></span>
        </a>
        <div style={{ display: 'flex', gap: 8, fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
          <a href="/blog" style={{ fontSize: 14, color: TEXT_DIM, padding: '8px 14px' }}>← Blog</a>
          <a href="/location-vacances/bretagne" style={{ background: ORANGE, color: WHITE, borderRadius: 10, padding: '10px 18px', fontSize: 14, fontWeight: 700 }}>Logements Bretagne</a>
        </div>
      </nav>

      <div style={{ position: 'relative', height: 480 }}>
        <img src="https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=1400&q=85" alt="Côte bretonne" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 60%' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '40px 20px', maxWidth: 780, margin: '0 auto' }}>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 16, fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
            <span style={{ background: ORANGE, color: WHITE, borderRadius: 20, padding: '4px 14px', fontSize: 12, fontWeight: 800 }}>🗺️ Guides régionaux</span>
            <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13 }}>4 juillet 2026 · 6 min de lecture</span>
          </div>
          <h1 style={{ fontSize: 36, fontWeight: 900, color: WHITE, lineHeight: 1.2, fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif', maxWidth: 700 }}>
            Vacances en Bretagne — le guide complet pour bien choisir son logement
          </h1>
        </div>
      </div>

      <div style={{ maxWidth: 740, margin: '0 auto', padding: '48px 20px 80px' }}>

        <blockquote>
          "La Bretagne, c'est la région où j'ai le plus de retours positifs. Les propriétaires sont chaleureux, les logements authentiques, et la nature est à couper le souffle." — L'équipe LocaDirect
        </blockquote>

        <p>
          Chaque été, des millions de Français prennent la route vers la Bretagne. Et pour cause : cette région à nulle autre pareille offre une diversité de paysages, une richesse culturelle et une gastronomie qui font toujours l'unanimité. Mais trouver le bon logement au bon prix, surtout en haute saison, est devenu un vrai défi. Voici notre guide complet.
        </p>

        <h2>Pourquoi choisir la Bretagne ?</h2>
        <ul>
          <li><strong>1 200 km de côtes</strong> — des plages de sable fin aux falaises vertigineuses</li>
          <li><strong>Un patrimoine exceptionnel</strong> — menhirs de Carnac, Pointe du Raz, presqu'île de Crozon</li>
          <li><strong>La gastronomie</strong> — crêpes, galettes, huîtres, homard, cidre et kouign-amann</li>
          <li><strong>Le climat océanique</strong> — plus tempéré qu'on ne le croit, avec de longues journées lumineuses</li>
          <li><strong>Dog-friendly</strong> — nombreuses plages et sentiers autorisés aux chiens</li>
        </ul>

        <h2>Les 5 zones incontournables</h2>

        <h3>🌊 Le Finistère — la Bretagne sauvage</h3>
        <p>
          C'est ici que la Bretagne est la plus authentique. La Pointe du Raz, la presqu'île de Crozon, la Baie des Trépassés, les îles d'Ouessant et de Sein... Le Finistère est pour les amoureux de nature sauvage et de grands espaces. Les logements y sont souvent moins chers qu'en Côtes-d'Armor.
        </p>
        <div style={{ background: BLUE_LIGHT, borderRadius: 12, padding: 16, marginBottom: 20, fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
          <p style={{ fontSize: 13, color: BLUE, fontWeight: 600, marginBottom: 0 }}>💡 Bon à savoir : Brest est une excellente base pour explorer le Finistère, avec des prix de logements plus abordables que les stations balnéaires.</p>
        </div>

        <h3>🦀 Le Morbihan — la Bretagne douce</h3>
        <p>
          Le Gulf Stream adoucit le climat du Morbihan, qui est la partie la plus ensoleillée de Bretagne. Carnac et ses menhirs, Vannes et ses remparts médiévaux, la presqu'île de Quiberon et Belle-Île-en-Mer en font l'une des destinations les plus prisées de la région.
        </p>

        <h3>🏰 Les Côtes-d'Armor — entre mer et campagne</h3>
        <p>
          La Côte de Granit Rose, la Côte d'Émeraude, le Cap Fréhel... Les Côtes-d'Armor offrent des paysages parmi les plus photographiés de France. Dinan, avec ses maisons à colombages, est l'un des plus beaux villages médiévaux du pays.
        </p>

        <h3>🦪 L'Ille-et-Vilaine — la Bretagne historique</h3>
        <p>
          Saint-Malo la corsaire, le Mont-Saint-Michel (à deux pas), Dinard et ses villas Belle Époque, Cancale et ses huîtres... L'Ille-et-Vilaine est la porte d'entrée de la Bretagne depuis Paris.
        </p>

        <h3>🌿 Les terres bretonnes — l'Argoat</h3>
        <p>
          Moins touristique mais magnifique : les forêts de Brocéliande, les Monts d'Arrée, les petits villages de granite. Pour ceux qui fuient les foules estivales et cherchent l'authenticité bretonne.
        </p>

        <h2>Quand partir en Bretagne ?</h2>

        <ul>
          <li><strong>Juin</strong> — idéal. Pas trop chaud, peu de monde, prix plus bas. Les plages sont déjà praticables.</li>
          <li><strong>Juillet-Août</strong> — haute saison. Prix élevés, réservez 6 mois à l'avance pour les meilleures adresses.</li>
          <li><strong>Septembre</strong> — notre coup de cœur. La mer est chaude, les foules sont parties, les prix chutent de 30 à 40%.</li>
          <li><strong>Octobre-Mars</strong> — pour les amoureux de la nature sauvage. Vents, tempêtes et lumières magiques.</li>
        </ul>

        <h2>Quel type de logement choisir ?</h2>

        <ul>
          <li><strong>Gîte rural</strong> — idéal pour les familles et les groupes. Souvent avec jardin clos. Ambiance authentique.</li>
          <li><strong>Maison de pêcheur</strong> — en bord de mer, souvent petite mais charmante. Parfaite pour les couples.</li>
          <li><strong>Longère bretonne</strong> — grande maison de campagne avec du caractère. Idéale pour les grandes réunions de famille.</li>
          <li><strong>Appartement côtier</strong> — pratique et souvent moins cher. Bon pour les courts séjours.</li>
        </ul>

        <h2>Nos conseils pour économiser</h2>
        <ul>
          <li>Évitez les semaines du 14 juillet et du 15 août — les prix peuvent tripler</li>
          <li>Préférez les logements en direct — pas de commission, prix souvent négociables</li>
          <li>Cherchez hors des stations ultra-connues (Quiberon, La Trinité) — 15 minutes plus loin, les prix sont 40% moins chers</li>
          <li>Demandez au propriétaire une réduction pour une longue durée (2 semaines ou plus)</li>
        </ul>

        <div style={{ background: `linear-gradient(135deg, #1D4ED8 0%, #1E40AF 100%)`, borderRadius: 20, padding: '32px 28px', marginTop: 40, textAlign: 'center', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>🌊</div>
          <h3 style={{ fontSize: 22, fontWeight: 800, color: WHITE, marginBottom: 8 }}>Trouvez votre logement en Bretagne</h3>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.8)', marginBottom: 20 }}>Contact direct avec les propriétaires bretons. Sans commission.</p>
          <a href="/location-vacances/bretagne" style={{ display: 'inline-block', background: WHITE, color: BLUE, borderRadius: 12, padding: '14px 28px', fontSize: 15, fontWeight: 800 }}>
            Voir les logements en Bretagne →
          </a>
        </div>

        <div style={{ marginTop: 48, paddingTop: 32, borderTop: `1px solid ${BORDER}`, fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
          <p style={{ fontSize: 11, color: ORANGE, letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 16 }}>À lire aussi</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { slug: 'vacances-provence-guide', titre: 'Location vacances en Provence — guide complet' },
              { slug: 'vacances-grand-chien-france', titre: 'Vacances avec un grand chien — les meilleures destinations' },
              { slug: 'eviter-arnaques-location-saisonniere', titre: 'Comment éviter les arnaques en location saisonnière ?' },
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
