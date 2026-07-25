import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Les meilleurs restaurants d\'Alsace à Noël — gastronomie et adresses | LocaDirect',
  description: 'Winstub, étoilés Michelin, brasseries traditionnelles... L\'Alsace est l\'une des régions gastronomiques les plus riches de France. Nos meilleures adresses pour Noël.',
}

const ORANGE = '#EA580C'
const WHITE = '#FFFFFF'
const GRAY = '#F9FAFB'
const TEXT = '#1F2937'
const TEXT_DIM = '#6B7280'
const BORDER = '#E5E7EB'
const NOEL = '#B91C1C'
const OR = '#92400E'

export default function ArticleRestaurantsAlsacePage() {
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
        <img src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1400&q=85" alt="Restaurant alsacien gastronomique" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 40%' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 55%, transparent 100%)' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '40px 20px', maxWidth: 780, margin: '0 auto' }}>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 16, fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
            <span style={{ background: NOEL, color: WHITE, borderRadius: 20, padding: '4px 14px', fontSize: 12, fontWeight: 800 }}>🍽️ Gastronomie</span>
            <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13 }}>4 juillet 2026 · 7 min de lecture</span>
          </div>
          <h1 style={{ fontSize: 36, fontWeight: 900, color: WHITE, lineHeight: 1.2, fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif', maxWidth: 700 }}>
            Visiter l'Alsace à Noël — les meilleurs restaurants et adresses gourmandes
          </h1>
        </div>
      </div>

      <div style={{ maxWidth: 740, margin: '0 auto', padding: '48px 20px 80px' }}>
        <blockquote>
          "L'Alsace est une région à part en France. Elle a su garder ses traditions culinaires intactes tout en développant une gastronomie de très haut niveau. En décembre, les tables sont encore plus généreuses."
        </blockquote>

        <p>L'Alsace est l'une des régions gastronomiques les plus riches de France. Elle compte plus d'étoiles Michelin par habitant que presque n'importe quelle autre région française, mais surtout, elle a gardé vivante une tradition culinaire populaire et généreuse que beaucoup de régions ont perdue. En décembre, quand les marchés de Noël sont en plein essor, les restaurants alsaciens déploient leur meilleure hospitalité.</p>

        <h2>Comprendre la gastronomie alsacienne</h2>

        <h3>La Winstub — l'âme de la gastronomie alsacienne</h3>
        <p>La Winstub (littéralement "salle à vin" en alsacien) est l'équivalent du bistrot parisien, mais en version alsacienne. Boiseries sombres, lumière tamisée, nappes à carreaux rouges et blancs, tables communes — la Winstub est un lieu de convivialité où l'on mange copieusement pour pas trop cher. C'est là que vous trouverez les plats alsaciens les plus authentiques : choucroute, baeckeoffe, tarte flambée, foie gras d'Alsace.</p>

        <h3>Les plats incontournables à commander en décembre</h3>
        <ul>
          <li><strong>La choucroute garnie</strong> — lard fumé, saucisse de Montbéliard, jarret, pommes de terre. Le plat alsacien par excellence, parfait en hiver</li>
          <li><strong>Le baeckeoffe</strong> — terrine de trois viandes (bœuf, porc, agneau) et pommes de terre marinées dans le Riesling. Cuit 3 heures minimum. Commandez à l'avance</li>
          <li><strong>Le foie gras d'Alsace</strong> — l'Alsace est avec le Périgord la grande région du foie gras. En terrine avec du Gewurztraminer vendange tardive</li>
          <li><strong>La tarte flambée (Flammekueche)</strong> — fine comme du papier, crème fraîche, lardons, oignons. La plus simple et la plus addictive</li>
          <li><strong>Le presskopf</strong> — fromage de tête artisanal, accompagné de vinaigrette aux herbes</li>
          <li><strong>La Forêt Noire maison</strong> — pas celle des boulangeries industrielles. Une vraie, avec de la vraie chantilly</li>
        </ul>

        <h2>Nos adresses — Strasbourg</h2>

        <h3>🌟 Pour une winstub authentique — Zum Strissel</h3>
        <p>L'une des plus anciennes winstubs de Strasbourg (1584). Ses boiseries sombres, ses vitraux Art Nouveau et sa carte de classiques alsaciens impeccablement exécutés en font l'adresse parfaite pour une soirée de marché de Noël. Réservez absolument — impossible d'entrer sans réservation en décembre.</p>

        <h3>🌟 Pour la gastronomie — Maison Kammerzell</h3>
        <p>Dans l'une des plus belles maisons Renaissance d'Alsace, face à la cathédrale, la Maison Kammerzell propose une cuisine alsacienne élaborée dans un cadre exceptionnel. La choucroute au Riesling y est particulièrement réputée. Prix : 35-60€ par personne. Vue imprenable sur la cathédrale illuminée depuis les tables du premier étage.</p>

        <h3>🌟 Pour la tarte flambée — Flam's</h3>
        <p>La chaîne Flam's est née à Strasbourg et reste la référence pour la tarte flambée en version moderne. Atmosphère décontractée, tartes flambées en formule à volonté, bières alsaciennes — idéal pour un repas convivial entre amis après le marché.</p>

        <h2>Nos adresses — Colmar</h2>

        <h3>🌟 La Maison des Têtes</h3>
        <p>Cette maison Renaissance de 1609, ornée de 111 têtes sculptées sur sa façade, abrite l'un des meilleurs restaurants de Colmar. La cuisine du chef Marc Royer revisite les classiques alsaciens avec une élégance moderne. Le foie gras poêlé aux épices de Noël et la choucroute de la mer sont particulièrement remarquables.</p>

        <h3>🌟 Winstub Brenner</h3>
        <p>L'adresse préférée des Colmariens pour manger sans chichi. Cuisine alsacienne traditionnelle, portions généreuses, service direct — la vraie Alsace populaire sans concession au tourisme. Réservez trois semaines à l'avance pour décembre.</p>

        <h2>Nos adresses — les villages</h2>

        <h3>🌟 Auberge du Père Floranc à Wettolsheim</h3>
        <p>À 3 km de Colmar, cette auberge familiale propose une cuisine alsacienne de terroir d'une sincérité rare. Le baeckeoffe préparé la veille, le saumon fumé maison et les fromages locaux sont à tomber. Cadre en colombages, feu de cheminée en hiver.</p>

        <h3>🌟 Caveau d'Eguisheim à Eguisheim</h3>
        <p>Dans les caves voûtées du château comtal d'Eguisheim, ce restaurant propose une cuisine alsacienne accompagnée des vins du domaine adjacent. En décembre, les voûtes sont décorées et l'ambiance est particulièrement chaleureuse.</p>

        <h2>Les marchés gastronomiques à ne pas manquer</h2>
        <ul>
          <li><strong>Marché de Noël des Saveurs à Strasbourg</strong> — Place du Marché aux Cochons de Lait. Charcuteries, fromages, vins et spécialités alsaciennes de producteurs locaux</li>
          <li><strong>Marché gourmand de Colmar</strong> — Place de la Cathédrale. Les meilleurs producteurs de la région</li>
          <li><strong>Brezelmarkt d'Obernai</strong> — dédié aux bredele et pains d'épices artisanaux</li>
        </ul>

        <div style={{ background: `linear-gradient(135deg, ${NOEL} 0%, #991B1B 100%)`, borderRadius: 20, padding: '32px 28px', marginTop: 40, textAlign: 'center', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>🍽️</div>
          <h3 style={{ fontSize: 22, fontWeight: 800, color: WHITE, marginBottom: 8 }}>Séjournez en Alsace pour Noël</h3>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.8)', marginBottom: 20 }}>Des logements au cœur des villages alsaciens, en contact direct avec les propriétaires.</p>
          <a href="/location-vacances/grand-est" style={{ display: 'inline-block', background: WHITE, color: NOEL, borderRadius: 12, padding: '14px 28px', fontSize: 15, fontWeight: 800 }}>
            Trouver un logement →
          </a>
        </div>

        <div style={{ marginTop: 48, paddingTop: 32, borderTop: `1px solid ${BORDER}`, fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
          <p style={{ fontSize: 11, color: ORANGE, letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 16 }}>À lire aussi</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { slug: 'marches-noel-alsace', titre: 'Les plus beaux marchés de Noël d\'Alsace' },
              { slug: 'logement-alsace-noel', titre: 'Comment trouver un logement en Alsace à Noël ?' },
              { slug: 'vignobles-alsace', titre: 'Vignobles alsaciens — la Route des Vins' },
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
