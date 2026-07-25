import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Les châteaux de la Loire — guide de visite complet | LocaDirect',
  description: 'Chambord, Chenonceau, Amboise, Villandry... La vallée de la Loire est classée au patrimoine mondial de l\'UNESCO. Notre guide pour planifier votre visite.',
}

const ORANGE = '#EA580C'
const WHITE = '#FFFFFF'
const GRAY = '#F9FAFB'
const TEXT = '#1F2937'
const TEXT_DIM = '#6B7280'
const BORDER = '#E5E7EB'
const ROYAL = '#1E3A8A'
const ROYAL_LIGHT = '#EFF6FF'

export default function ArticleLoirePage() {
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
        blockquote { border-left: 4px solid #1E3A8A; padding: 16px 24px; background: #EFF6FF; border-radius: 0 12px 12px 0; margin: 28px 0; font-style: italic; color: #1E3A8A; }
        table { width: 100%; border-collapse: collapse; margin: 24px 0; font-family: -apple-system, BlinkMacSystemFont, sans-serif; }
        th { background: #1F2937; color: white; padding: 12px 16px; text-align: left; font-size: 13px; }
        td { padding: 11px 16px; border-bottom: 1px solid #E5E7EB; font-size: 13px; }
        tr:nth-child(even) td { background: #F9FAFB; }
      `}</style>

      <nav style={{ position: 'sticky', top: 0, zIndex: 100, background: WHITE, borderBottom: `1px solid ${BORDER}`, padding: '12px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
        <a href="/" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 34, height: 34, background: ORANGE, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>🏠</div>
          <span style={{ fontSize: 18, fontWeight: 800, color: TEXT }}>Loca<span style={{ color: ORANGE }}>Direct</span></span>
        </a>
        <div style={{ display: 'flex', gap: 8, fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
          <a href="/blog" style={{ fontSize: 14, color: TEXT_DIM, padding: '8px 14px' }}>← Blog</a>
          <a href="/location-vacances/centre-val-de-loire" style={{ background: ROYAL, color: WHITE, borderRadius: 10, padding: '10px 18px', fontSize: 14, fontWeight: 700 }}>Logements Val de Loire</a>
        </div>
      </nav>

      <div style={{ position: 'relative', height: 500 }}>
        <img src="https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=1400&q=85" alt="Château de Chambord" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 60%' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.15) 60%, transparent 100%)' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '40px 20px', maxWidth: 780, margin: '0 auto' }}>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 16, fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
            <span style={{ background: ROYAL, color: WHITE, borderRadius: 20, padding: '4px 14px', fontSize: 12, fontWeight: 800 }}>🏰 Patrimoine UNESCO</span>
            <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13 }}>4 juillet 2026 · 9 min de lecture</span>
          </div>
          <h1 style={{ fontSize: 38, fontWeight: 900, color: WHITE, lineHeight: 1.2, fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif', maxWidth: 700 }}>
            Les châteaux de la Loire — guide complet pour organiser votre visite
          </h1>
        </div>
      </div>

      <div style={{ maxWidth: 740, margin: '0 auto', padding: '48px 20px 80px' }}>
        <blockquote>
          "La vallée de la Loire n'est pas seulement un jardin de la France — c'est un jardin de l'Europe, et même du monde entier." — Gustave Flaubert
        </blockquote>

        <p>La vallée de la Loire est classée au patrimoine mondial de l'UNESCO depuis 2000. Sur 280 km entre Chalonnes-sur-Loire et Sully-sur-Loire, cette région concentre plus de 300 châteaux, témoins de la présence royale pendant les XVe et XVIe siècles. C'est ici que les rois de France ont développé l'art de vivre à la Renaissance, mêlant architecture italienne et génie français.</p>

        <h2>🥇 Chambord — le plus grand et le plus spectaculaire</h2>
        <p>Chambord est un château-monde. Avec ses 440 pièces, ses 365 cheminées et sa forêt de 5 440 hectares (la plus grande forêt close d'Europe), il est à la mesure de l'ambition de François Ier qui l'a commandé. Son escalier à double révolution, attribué à Léonard de Vinci, est un chef-d'œuvre de génie : deux personnes peuvent monter et descendre simultanément sans jamais se croiser. Les toits terrasses, avec leur skyline de dômes et de cheminées, offrent un panorama inoubliable.</p>
        <div style={{ background: ROYAL_LIGHT, borderRadius: 12, padding: 16, marginBottom: 20, fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif', border: `1px solid #BFDBFE` }}>
          <p style={{ fontSize: 13, color: ROYAL, marginBottom: 0 }}>💡 À ne pas manquer : le spectacle équestre "Ainsi Soie-t-il" le soir en saison. Le domaine de Chambord est ouvert aux vélos — c'est la meilleure façon de découvrir la forêt et d'observer les cerfs à l'aube.</p>
        </div>

        <h2>🥈 Chenonceau — le château des Dames</h2>
        <p>Chenonceau est le château le plus visité de France après Versailles. Sa situation unique — enjambant le Cher sur un pont à cinq arches — et ses jardins dessinés par Diane de Poitiers et Catherine de Médicis en font une œuvre d'art totale. L'histoire des femmes qui l'ont habité est fascinante : Diane de Poitiers y a régné, Catherine de Médicis l'a repris à sa mort, puis Louise de Lorraine l'a transformé en château de deuil après l'assassinat d'Henri III.</p>

        <h2>🏰 Amboise — le château où est mort Léonard de Vinci</h2>
        <p>Amboise est intimement lié à Léonard de Vinci, qui y a passé les trois dernières années de sa vie (1516-1519) au Clos Lucé, à 500 mètres du château royal. Le château d'Amboise domine la ville et la Loire depuis un promontoire rocheux. La chapelle Saint-Hubert abrite ce qui serait le tombeau de Léonard de Vinci. Le Clos Lucé, résidence du maître, présente des maquettes de ses inventions — indispensable pour les enfants.</p>

        <h2>🌺 Villandry — les plus beaux jardins</h2>
        <p>Villandry est le seul grand château de la Loire dont les jardins ont été entièrement restaurés dans leur état d'origine Renaissance. Ses jardins d'ornement et potagers géométriques, étalés sur trois terrasses, sont uniques en Europe. Au printemps et en été, les 52 000 légumes et 40 000 fleurs créent des tapis colorés d'une précision stupéfiante. L'entretien mobilise une équipe de 9 jardiniers à plein temps.</p>

        <h2>⚔️ Azay-le-Rideau — l'île enchantée</h2>
        <p>Construit entre 1518 et 1527 sur une île de l'Indre, Azay-le-Rideau est un joyau de l'architecture Renaissance. Sa façade blanche reflétée dans les douves, ses tourelles d'angle et ses fenêtres à meneaux en font l'un des châteaux les plus élégants de la Loire. Son escalier intérieur à rampes droites, novateur pour l'époque, a influencé toute l'architecture française.</p>

        <h2>Tableau récapitulatif des principaux châteaux</h2>
        <table>
          <thead>
            <tr>
              <th>Château</th>
              <th>Point fort</th>
              <th>Durée visite</th>
              <th>Idéal pour</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Chambord</td><td>Architecture, nature, toits</td><td>3-4h</td><td>Tout public</td></tr>
            <tr><td>Chenonceau</td><td>Cadre, jardins, histoire</td><td>2-3h</td><td>Couples, familles</td></tr>
            <tr><td>Amboise + Clos Lucé</td><td>Da Vinci, vue sur Loire</td><td>3-4h</td><td>Familles, curieux</td></tr>
            <tr><td>Villandry</td><td>Jardins extraordinaires</td><td>2-3h</td><td>Amoureux des jardins</td></tr>
            <tr><td>Azay-le-Rideau</td><td>Élégance, reflets dans l'eau</td><td>1-2h</td><td>Amateurs d'architecture</td></tr>
            <tr><td>Blois</td><td>4 styles architecturaux</td><td>2h</td><td>Passionnés d'histoire</td></tr>
            <tr><td>Cheverny</td><td>Meublé, chasse, Tintin</td><td>2h</td><td>Familles, Tintin fans</td></tr>
          </tbody>
        </table>

        <h2>Comment organiser votre séjour</h2>

        <h3>En 2 jours</h3>
        <p><strong>Jour 1</strong> : Chambord (matin) + Cheverny (après-midi) + Blois (soirée)<br/><strong>Jour 2</strong> : Chenonceau (matin) + Amboise et Clos Lucé (après-midi)</p>

        <h3>En 4-5 jours</h3>
        <p>Ajoutez Villandry, Azay-le-Rideau, une balade à vélo sur la Loire à Vélo (800 km de pistes cyclables balisées) et la dégustation de vins locaux (Chinon, Bourgueil, Vouvray).</p>

        <h2>Le meilleur moment pour visiter</h2>
        <ul>
          <li><strong>Mai-juin</strong> — idéal. Jardins en fleurs, foules modérées, temps agréable</li>
          <li><strong>Juillet-août</strong> — haute saison. Réservez les billets en ligne à l'avance</li>
          <li><strong>Septembre-octobre</strong> — excellent. Moins de monde, lumières d'automne magnifiques</li>
          <li><strong>Décembre-janvier</strong> — Chambord en hiver sous la neige : magique mais vérifiez les horaires</li>
        </ul>

        <div style={{ background: `linear-gradient(135deg, ${ROYAL} 0%, #1E40AF 100%)`, borderRadius: 20, padding: '32px 28px', marginTop: 40, textAlign: 'center', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>🏰</div>
          <h3 style={{ fontSize: 22, fontWeight: 800, color: WHITE, marginBottom: 8 }}>Logements au cœur du Val de Loire</h3>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.8)', marginBottom: 20 }}>Maisons de maître, gîtes de charme, châteaux en location. Contact direct sans commission.</p>
          <a href="/location-vacances/centre-val-de-loire" style={{ display: 'inline-block', background: WHITE, color: ROYAL, borderRadius: 12, padding: '14px 28px', fontSize: 15, fontWeight: 800 }}>
            Voir les logements →
          </a>
        </div>

        <div style={{ marginTop: 48, paddingTop: 32, borderTop: `1px solid ${BORDER}`, fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
          <p style={{ fontSize: 11, color: ORANGE, letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 16 }}>À lire aussi</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { slug: 'vignobles-alsace', titre: 'Vignobles alsaciens — la Route des Vins d\'Alsace' },
              { slug: 'vendee-guide', titre: 'Tour en Vendée — que voir, que faire ?' },
              { slug: 'cathedrales-france', titre: 'Les plus belles cathédrales de France' },
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
