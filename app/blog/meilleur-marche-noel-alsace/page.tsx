import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Quel est le plus beau marché de Noël d\'Alsace ? | LocaDirect',
  description: 'Strasbourg ou Colmar ? Kaysersberg ou Ribeauvillé ? On tranche. Notre comparatif complet pour choisir le marché de Noël alsacien qui correspond à votre voyage.',
}

const ORANGE = '#EA580C'
const WHITE = '#FFFFFF'
const GRAY = '#F9FAFB'
const TEXT = '#1F2937'
const TEXT_DIM = '#6B7280'
const BORDER = '#E5E7EB'
const NOEL = '#B91C1C'
const OR = '#92400E'
const OR_LIGHT = '#FFFBEB'

export default function ArticleMeilleurMarcheNoelPage() {
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

      <div style={{ position: 'relative', height: 480 }}>
        <img src="https://images.unsplash.com/photo-1608096299210-db7e38487075?w=1400&q=85" alt="Marché de Noël Alsace nuit étoilée" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 55%, transparent 100%)' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '40px 20px', maxWidth: 780, margin: '0 auto' }}>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 16, fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
            <span style={{ background: NOEL, color: WHITE, borderRadius: 20, padding: '4px 14px', fontSize: 12, fontWeight: 800 }}>🏆 Comparatif</span>
            <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13 }}>4 juillet 2026 · 6 min de lecture</span>
          </div>
          <h1 style={{ fontSize: 36, fontWeight: 900, color: WHITE, lineHeight: 1.2, fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif', maxWidth: 700 }}>
            Quel est le plus beau marché de Noël d'Alsace ? On tranche.
          </h1>
        </div>
      </div>

      <div style={{ maxWidth: 740, margin: '0 auto', padding: '48px 20px 80px' }}>
        <blockquote>
          "C'est LA question que tout le monde pose. Et la réponse honnête : ça dépend de ce que vous cherchez. Voici notre comparatif sans langue de bois."
        </blockquote>

        <p>Chaque année, la même question revient : Strasbourg ou Colmar ? Le grand ou le pittoresque ? L'ambiance urbaine ou le village de conte ? Après des années à parcourir les marchés alsaciens, voici notre réponse honnête, sans langue de bois.</p>

        <h2>🥇 Notre verdict : Kaysersberg pour l'authenticité</h2>
        <p>Si vous ne devez en choisir qu'un seul et que vous cherchez l'authenticité, choisissez Kaysersberg. Ce village de 3 000 habitants classe ses chalets dans les ruelles médiévales — pas dans une grande place bétonnée. Les artisans sont de vrais artisans locaux. L'ambiance est intime. Le vin chaud est servi dans des chopes en céramique faites main. Et vous pouvez croiser les habitants qui font leurs courses entre les touristes.</p>
        <div style={{ background: OR_LIGHT, borderRadius: 14, padding: '18px 20px', marginBottom: 24, fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif', border: `1px solid #FCD34D` }}>
          <p style={{ fontSize: 14, fontWeight: 700, color: OR, marginBottom: 4 }}>🏆 Kaysersberg — notre coup de cœur</p>
          <p style={{ fontSize: 13, color: '#92400E', lineHeight: 1.6, marginBottom: 0 }}>Idéal pour : les couples, les amoureux de l'authentique, les visites en semaine<br/>À éviter : les week-ends du 8, 13 et 20 décembre — c'est la folie</p>
        </div>

        <h2>🎄 Strasbourg — pour l'expérience complète</h2>
        <p>Strasbourg est le plus grand, le plus connu, le plus beau par son décor urbain. La cathédrale illuminée, l'arbre de 30 mètres, la patinoire, les 300 chalets — c'est une expérience à vivre au moins une fois. En revanche, c'est aussi le plus fréquenté : 2 millions de visiteurs en 4 semaines, c'est 70 000 personnes par jour certains week-ends. Notre conseil : venez en semaine, idéalement un lundi ou mardi.</p>
        <div style={{ background: GRAY, borderRadius: 14, padding: '18px 20px', marginBottom: 24, fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif', border: `1px solid ${BORDER}` }}>
          <p style={{ fontSize: 13, color: TEXT_DIM, lineHeight: 1.6, marginBottom: 0 }}>✅ Idéal pour : les familles, les premiers visiteurs, les amateurs de grande ambiance<br/>❌ À éviter : les week-ends, les 13 et 20 décembre</p>
        </div>

        <h2>💕 Colmar — pour les photos et le romantisme</h2>
        <p>Colmar gagne haut la main le titre du marché le plus photogénique. La Petite Venise avec ses maisons colorées reflétées dans les canaux illuminés est une image qui fait le tour d'Instagram chaque décembre. C'est aussi le marché qui monte le plus en qualité depuis quelques années — les organisateurs ont fait un vrai effort pour sélectionner des artisans de qualité.</p>
        <div style={{ background: GRAY, borderRadius: 14, padding: '18px 20px', marginBottom: 24, fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif', border: `1px solid ${BORDER}` }}>
          <p style={{ fontSize: 13, color: TEXT_DIM, lineHeight: 1.6, marginBottom: 0 }}>✅ Idéal pour : les couples, la photo, les visites le soir<br/>❌ À éviter : le dimanche après-midi — c'est ingérable</p>
        </div>

        <h2>Notre recommandation selon votre profil</h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 32, fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
          {[
            { emoji: '💑', profil: 'En couple romantique', conseil: 'Colmar le soir en semaine + Kaysersberg le lendemain matin' },
            { emoji: '👨‍👩‍👧‍👦', profil: 'En famille avec enfants', conseil: 'Strasbourg + spectacle de Saint-Nicolas le 6 décembre' },
            { emoji: '👯', profil: 'Entre amis', conseil: 'Ribeauvillé le vendredi soir + Colmar le samedi + Kaysersberg le dimanche matin' },
            { emoji: '🎨', profil: 'Amateur d\'artisanat', conseil: 'Kaysersberg + Eguisheim + Bergheim (moins connu, artisans locaux)' },
            { emoji: '📸', profil: 'Photographe', conseil: 'Colmar à l\'aube (avant 8h) + Strasbourg le soir en semaine' },
            { emoji: '🍷', profil: 'Amateur de gastronomie', conseil: 'La Route des Vins de Noël : Barr + Obernai + Molsheim' },
          ].map(item => (
            <div key={item.profil} style={{ display: 'flex', gap: 14, padding: 18, background: GRAY, borderRadius: 14, border: `1px solid ${BORDER}` }}>
              <span style={{ fontSize: 28, flexShrink: 0 }}>{item.emoji}</span>
              <div>
                <p style={{ fontSize: 14, fontWeight: 700, color: TEXT, marginBottom: 4 }}>{item.profil}</p>
                <p style={{ fontSize: 13, color: TEXT_DIM, marginBottom: 0 }}>{item.conseil}</p>
              </div>
            </div>
          ))}
        </div>

        <h2>Le secret des locaux — les marchés que les touristes ne connaissent pas</h2>
        <ul>
          <li><strong>Bergheim</strong> — village médiéval fortifié, marché très confidentiel, artisans uniquement locaux</li>
          <li><strong>Hunawihr</strong> — 600 habitants, marché d'une nuit seulement (le 2e samedi de décembre), magique</li>
          <li><strong>Andlau</strong> — entre deux abbayes romanes, un marché qui sent encore l'Alsace d'avant le tourisme</li>
          <li><strong>Selestat</strong> — la ville qui a inventé le sapin de Noël (1521). Marché sous-estimé avec une atmosphère unique</li>
        </ul>

        <div style={{ background: `linear-gradient(135deg, ${NOEL} 0%, #991B1B 100%)`, borderRadius: 20, padding: '32px 28px', marginTop: 40, textAlign: 'center', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>🎄</div>
          <h3 style={{ fontSize: 22, fontWeight: 800, color: WHITE, marginBottom: 8 }}>Préparez votre séjour de Noël en Alsace</h3>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.8)', marginBottom: 20 }}>Trouvez votre logement en direct avec les propriétaires alsaciens. Sans commission.</p>
          <a href="/location-vacances/grand-est" style={{ display: 'inline-block', background: WHITE, color: NOEL, borderRadius: 12, padding: '14px 28px', fontSize: 15, fontWeight: 800 }}>
            Voir les logements →
          </a>
        </div>

        <div style={{ marginTop: 48, paddingTop: 32, borderTop: `1px solid ${BORDER}`, fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
          <p style={{ fontSize: 11, color: ORANGE, letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 16 }}>À lire aussi</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { slug: 'marches-noel-alsace', titre: 'Les plus beaux marchés de Noël d\'Alsace' },
              { slug: 'logement-alsace-noel', titre: 'Comment trouver un logement en Alsace à Noël ?' },
              { slug: 'chateaux-illumines-alsace', titre: 'Les plus beaux châteaux illuminés d\'Alsace' },
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
