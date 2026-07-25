import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Vignobles alsaciens — la Route des Vins d\'Alsace | LocaDirect',
  description: 'Riesling, Gewurztraminer, Pinot Gris... La Route des Vins d\'Alsace traverse 170 km de villages de conte de fées et de vignobles exceptionnels. Notre guide complet.',
}

const ORANGE = '#EA580C'
const WHITE = '#FFFFFF'
const GRAY = '#F9FAFB'
const TEXT = '#1F2937'
const TEXT_DIM = '#6B7280'
const BORDER = '#E5E7EB'
const WINE = '#7C2D12'
const WINE_LIGHT = '#FFF1F2'

export default function ArticleAlsacePage() {
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
        blockquote { border-left: 4px solid #7C2D12; padding: 16px 24px; background: #FFF1F2; border-radius: 0 12px 12px 0; margin: 28px 0; font-style: italic; color: #7C2D12; }
      `}</style>

      <nav style={{ position: 'sticky', top: 0, zIndex: 100, background: WHITE, borderBottom: `1px solid ${BORDER}`, padding: '12px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
        <a href="/" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 34, height: 34, background: ORANGE, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>🏠</div>
          <span style={{ fontSize: 18, fontWeight: 800, color: TEXT }}>Loca<span style={{ color: ORANGE }}>Direct</span></span>
        </a>
        <div style={{ display: 'flex', gap: 8, fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
          <a href="/blog" style={{ fontSize: 14, color: TEXT_DIM, padding: '8px 14px' }}>← Blog</a>
          <a href="/location-vacances/grand-est" style={{ background: WINE, color: WHITE, borderRadius: 10, padding: '10px 18px', fontSize: 14, fontWeight: 700 }}>Logements Alsace</a>
        </div>
      </nav>

      <div style={{ position: 'relative', height: 500 }}>
        <img src="https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=1400&q=85" alt="Vignobles d'Alsace automne" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 50%' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.15) 60%, transparent 100%)' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '40px 20px', maxWidth: 780, margin: '0 auto' }}>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 16, fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
            <span style={{ background: WINE, color: WHITE, borderRadius: 20, padding: '4px 14px', fontSize: 12, fontWeight: 800 }}>🍷 Guides régionaux</span>
            <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13 }}>4 juillet 2026 · 7 min de lecture</span>
          </div>
          <h1 style={{ fontSize: 38, fontWeight: 900, color: WHITE, lineHeight: 1.2, fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif', maxWidth: 700 }}>
            Vignobles alsaciens — la Route des Vins d'Alsace
          </h1>
        </div>
      </div>

      <div style={{ maxWidth: 740, margin: '0 auto', padding: '48px 20px 80px' }}>
        <blockquote>
          "La Route des Vins d'Alsace est la plus ancienne route touristique de France (1953). En automne, quand les feuilles des vignes virent au rouge et or, c'est un spectacle que nulle autre région ne peut rivaliser." — Guide viticole d'Alsace
        </blockquote>

        <p>La Route des Vins d'Alsace s'étire sur 170 km entre Marlenheim au nord et Thann au sud, longeant le piémont vosgien à travers une succession de villages médiévaux aux maisons à colombages et de vignobles réputés. C'est l'une des routes touristiques les plus célèbres au monde, et pour de bonnes raisons.</p>

        <h2>Les cépages alsaciens — comprendre avant de déguster</h2>

        <p>L'Alsace est la seule région viticole française à nommer ses vins d'après leurs cépages plutôt que leur appellation géographique. Les sept nobles cépages alsaciens :</p>

        <ul>
          <li><strong>Riesling</strong> — le roi des cépages alsaciens. Sec, minéral, avec une acidité caractéristique. Le meilleur allié des poissons et des crustacés.</li>
          <li><strong>Gewurztraminer</strong> — le plus parfumé, aux arômes de rose, lychee et épices. Idéal avec le foie gras et les fromages forts comme le Munster.</li>
          <li><strong>Pinot Gris</strong> — riche, puissant, aux notes de fruits secs et de miel. Parfait avec les volailles et les viandes blanches.</li>
          <li><strong>Muscat d'Alsace</strong> — sec contrairement à tous les autres muscats du monde. Arômes floraux intenses. L'apéritif alsacien par excellence.</li>
          <li><strong>Pinot Blanc</strong> — frais et fruité, le vin de tous les jours alsacien. Base du Crémant d'Alsace.</li>
          <li><strong>Sylvaner</strong> — léger, désaltérant. Parfait avec la charcuterie et la choucroute.</li>
          <li><strong>Pinot Noir</strong> — le seul rouge d'Alsace. Fruité et élégant.</li>
        </ul>

        <h2>Les villages incontournables de la Route des Vins</h2>

        <h3>🌸 Riquewihr — le village le plus photogénique</h3>
        <p>Riquewihr est souvent présenté comme le plus beau village d'Alsace. Ses remparts médiévaux, ses maisons à colombages aux couleurs pastel, ses ruelles pavées et ses caves viticoles en font une carte postale vivante. C'est aussi le fief du domaine Hugel, l'une des plus grandes maisons de négoce alsaciennes. Évitez le week-end en juillet-août où l'affluence est extrême.</p>

        <h3>🏰 Kaysersberg — le village de Schweitzer</h3>
        <p>Classé parmi les Plus Beaux Villages de France, Kaysersberg était la ville natale d'Albert Schweitzer, prix Nobel de la Paix. Son château en ruines surplombe un village magnifiquement préservé avec un pont fortifié médiéval unique en Alsace. L'office de tourisme est installé dans la maison natale de Schweitzer.</p>

        <h3>🍷 Ribeauvillé — la capitale des seigneurs de Ribeaupierre</h3>
        <p>Ribeauvillé est une ville viticole animée avec trois châteaux en ruines sur les hauteurs, une Grand'Rue commerçante bordée de maisons Renaissance et de nombreuses caves ouvertes à la dégustation. Le marché du samedi matin est l'un des plus authentiques de la région.</p>

        <h3>🌺 Eguisheim — le berceau des vins d'Alsace</h3>
        <p>Eguisheim est considéré comme le berceau du vignoble alsacien — c'est ici que le pape Léon IX naquit en 1002. Le village est organisé en cercles concentriques autour de son château octogonal. Ses maisons à colombages, toutes ornées de géraniums rouges en été, ont valu à ce village son classement parmi les "Plus Beaux Villages de France".</p>

        <h2>Les Grands Crus — l'excellence du terroir alsacien</h2>

        <p>L'Alsace compte 51 Grands Crus, des parcelles délimitées aux terroirs d'exception. Les plus réputés :</p>

        <ul>
          <li><strong>Schlossberg</strong> (Kaysersberg) — premier Grand Cru alsacien classifié (1975). Granit rose. Rieslings d'une finesse exceptionnelle.</li>
          <li><strong>Rangen</strong> (Thann) — le plus au sud et le plus escarpé. Sols volcaniques. Les vins les plus puissants d'Alsace.</li>
          <li><strong>Sommerberg</strong> (Niedermorschwihr) — granit. Rieslings droits et minéraux qui vieillissent 20 ans et plus.</li>
          <li><strong>Hengst</strong> (Wintzenheim) — calcaires et marnes. Gewurztraminers d'exception.</li>
        </ul>

        <h2>Les marchés de Noël — la magie en hiver</h2>
        <p>La Route des Vins d'Alsace en décembre est une expérience magique. Les marchés de Noël d'Alsace sont les plus anciens de France (Strasbourg depuis 1570) et parmi les plus beaux au monde. Vin chaud, bretzels, pain d'épices, décorations artisanales — la magie de Noël opère pleinement dans ce décor médiéval illuminé.</p>

        <h2>Conseils pratiques</h2>
        <ul>
          <li><strong>Meilleure période</strong> : septembre-octobre (vendanges, couleurs d'automne) et décembre (marchés de Noël)</li>
          <li><strong>Se déplacer</strong> : vélo idéal pour la route des vins (pistes cyclables tout du long). Voiture pour les Grands Crus plus isolés</li>
          <li><strong>Dégustations</strong> : la plupart des caves proposent des dégustations gratuites ou payantes. Appelez avant de venir en haute saison</li>
          <li><strong>Hébergement</strong> : les gîtes et chambres d'hôtes chez les vignerons offrent une expérience authentique unique</li>
        </ul>

        <div style={{ background: `linear-gradient(135deg, ${WINE} 0%, #991B1B 100%)`, borderRadius: 20, padding: '32px 28px', marginTop: 40, textAlign: 'center', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>🍷</div>
          <h3 style={{ fontSize: 22, fontWeight: 800, color: WHITE, marginBottom: 8 }}>Logements au cœur des vignobles alsaciens</h3>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.8)', marginBottom: 20 }}>Gîtes chez les vignerons, maisons à colombages, appartements en vieille ville. Contact direct sans commission.</p>
          <a href="/location-vacances/grand-est" style={{ display: 'inline-block', background: WHITE, color: WINE, borderRadius: 12, padding: '14px 28px', fontSize: 15, fontWeight: 800 }}>
            Voir les logements en Alsace →
          </a>
        </div>

        <div style={{ marginTop: 48, paddingTop: 32, borderTop: `1px solid ${BORDER}`, fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
          <p style={{ fontSize: 11, color: ORANGE, letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 16 }}>À lire aussi</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { slug: 'cathedrales-france', titre: 'Les plus belles cathédrales de France' },
              { slug: 'chateaux-de-la-loire', titre: 'Les châteaux de la Loire — guide de visite' },
              { slug: 'reserver-direct-plutot-airbnb', titre: 'Pourquoi réserver en direct plutôt qu\'Airbnb ?' },
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
