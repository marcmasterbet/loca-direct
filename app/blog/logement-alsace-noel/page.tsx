import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Comment trouver un logement en Alsace pendant les marchés de Noël | LocaDirect',
  description: 'Les logements en Alsace à Noël partent en quelques heures. Nos conseils pour trouver la perle rare, les bons prix et les pièges à éviter pour votre séjour de Noël.',
}

const ORANGE = '#EA580C'
const WHITE = '#FFFFFF'
const GRAY = '#F9FAFB'
const TEXT = '#1F2937'
const TEXT_DIM = '#6B7280'
const BORDER = '#E5E7EB'
const NOEL = '#B91C1C'
const NOEL_LIGHT = '#FEF2F2'
const GREEN = '#15803D'
const GREEN_LIGHT = '#F0FDF4'

export default function ArticleLogementAlsaceNoelPage() {
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
          <a href="/location-vacances/grand-est" style={{ background: NOEL, color: WHITE, borderRadius: 10, padding: '10px 18px', fontSize: 14, fontWeight: 700 }}>🎄 Logements Alsace</a>
        </div>
      </nav>

      <div style={{ position: 'relative', height: 480 }}>
        <img src="https://images.unsplash.com/photo-1512389142860-9c449e58a543?w=1400&q=85" alt="Maison alsacienne à Noël illuminée" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 40%' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 55%, transparent 100%)' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '40px 20px', maxWidth: 780, margin: '0 auto' }}>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 16, fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
            <span style={{ background: NOEL, color: WHITE, borderRadius: 20, padding: '4px 14px', fontSize: 12, fontWeight: 800 }}>🏠 Conseils logement</span>
            <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13 }}>4 juillet 2026 · 7 min de lecture</span>
          </div>
          <h1 style={{ fontSize: 36, fontWeight: 900, color: WHITE, lineHeight: 1.2, fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif', maxWidth: 700 }}>
            Comment trouver un logement en Alsace pendant les marchés de Noël ?
          </h1>
        </div>
      </div>

      <div style={{ maxWidth: 740, margin: '0 auto', padding: '48px 20px 80px' }}>
        <blockquote>
          "J'ai cherché un appartement à Colmar pour le premier week-end de décembre en octobre. Tout était déjà pris ou à des prix délirants. J'ai finalement trouvé une chambre chez l'habitant à 15 km, en direct avec le propriétaire. C'était parfait." — Isabelle, visiteuse régulière
        </blockquote>

        <p>Le mois de décembre en Alsace est l'une des périodes les plus tendues pour trouver un logement en France. Les prix s'envolent, les disponibilités fondent et les plateformes affichent "complet" des mois à l'avance. Mais avec les bonnes stratégies, il est possible de trouver un logement de qualité à un prix raisonnable — et même d'en profiter pour vivre une expérience authentique.</p>

        <h2>Comprendre le marché — les chiffres qui font peur</h2>

        <table>
          <thead>
            <tr>
              <th>Type de séjour</th>
              <th>Prix moyen hors saison</th>
              <th>Prix décembre (week-end)</th>
              <th>Augmentation</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Studio à Strasbourg</td><td>60-80€/nuit</td><td>180-280€/nuit</td><td>+200%</td></tr>
            <tr><td>Appartement à Colmar</td><td>80-120€/nuit</td><td>220-350€/nuit</td><td>+180%</td></tr>
            <tr><td>Maison à colombages</td><td>100-150€/nuit</td><td>300-500€/nuit</td><td>+220%</td></tr>
            <tr><td>Chambre d'hôtes village</td><td>70-100€/nuit</td><td>130-180€/nuit</td><td>+70%</td></tr>
          </tbody>
        </table>

        <p>Ces chiffres peuvent sembler décourageants — mais ils concernent principalement les grandes plateformes. En réservant en direct avec les propriétaires, vous pouvez économiser 20 à 40% sur ces tarifs.</p>

        <h2>Stratégie 1 — Réservez entre mai et juillet</h2>
        <p>C'est la règle d'or. Les propriétaires alsaciens qui louent en direct ouvrent souvent leurs réservations de Noël dès le printemps. Un logement réservé en juin pour décembre coûte en moyenne 25-35% moins cher qu'en octobre-novembre. Et surtout, vous avez le choix — vous n'êtes pas contraint de prendre ce qui reste.</p>

        <h2>Stratégie 2 — Optez pour la semaine plutôt que le week-end</h2>
        <p>Les marchés de Noël sont ouverts tous les jours, du lundi au dimanche. Mais la fréquentation est deux à trois fois plus faible en semaine. Avantages :</p>
        <ul>
          <li>Prix des logements 30 à 50% moins élevés qu'un week-end</li>
          <li>Marchés accessibles sans bousculade</li>
          <li>Ambiance plus authentique, moins touristique</li>
          <li>Restaurants disponibles sans attente</li>
        </ul>

        <h2>Stratégie 3 — Logez dans les villages du vignoble</h2>
        <p>Kaysersberg, Ribeauvillé, Eguisheim, Riquewihr — ces villages à 20-40 km de Strasbourg ou Colmar ont leurs propres marchés de Noël magnifiques et des logements bien moins chers que les grandes villes. Avec une voiture, vous pouvez facilement aller à Strasbourg ou Colmar dans la journée.</p>

        <div style={{ background: GREEN_LIGHT, borderRadius: 14, padding: '20px 24px', marginBottom: 28, fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif', border: '1px solid #BBF7D0' }}>
          <p style={{ fontSize: 14, fontWeight: 700, color: GREEN, marginBottom: 8 }}>✅ Notre conseil meilleur rapport qualité/prix</p>
          <p style={{ fontSize: 13, color: '#166534', lineHeight: 1.6, marginBottom: 0 }}>Un gîte ou une maison à colombages dans un village du vignoble (Obernai, Barr, Dambach-la-Ville) à 25-35 km de Strasbourg. Vous êtes au cœur de l'Alsace authentique, vous avez votre propre marché de Noël local, et vous pouvez aller à Strasbourg ou Colmar facilement. Prix : 80-120€/nuit contre 250-350€ en ville.</p>
        </div>

        <h2>Stratégie 4 — Réservez en direct avec les propriétaires</h2>
        <p>Les plateformes comme Airbnb ajoutent jusqu'à 20% de frais de service sur des logements déjà très chers. En passant directement par le propriétaire sur LocaDirect, vous économisez ces frais ET vous pouvez négocier pour des séjours plus longs.</p>

        <h2>Les types de logements disponibles</h2>

        <h3>🏠 La maison à colombages</h3>
        <p>L'expérience la plus authentique. Ces maisons typiques alsaciennes avec poutres apparentes, poêle en faïence et décorations de Noël traditionnelles sont nombreuses dans les villages. Souvent proposées par des propriétaires locaux fiers de leur patrimoine. Prix : 120-200€/nuit pour 4-6 personnes.</p>

        <h3>🛏️ La chambre d'hôtes chez le vigneron</h3>
        <p>Quelques vignerons alsaciens proposent des chambres dans leur domaine. L'avantage : vous dormez au milieu des vignes, le propriétaire vous fait déguster ses vins, et vous vivez l'Alsace de l'intérieur. Ces adresses sont très demandées — réservez absolument tôt.</p>

        <h3>🏙️ L'appartement en vieille ville</h3>
        <p>Pour les amoureux de l'ambiance urbaine, un appartement au cœur de Strasbourg ou Colmar permet de profiter des marchés à pied, à toute heure. Plus cher mais incomparable pour l'expérience. Cherchez les rues adjacentes à la Grand'Île — moins central que la Place Kléber mais bien moins cher.</p>

        <h2>Les dates clés à éviter (ou à surveiller)</h2>
        <ul>
          <li><strong>Premier week-end de l'Avent</strong> (fin novembre) — le plus fréquenté, les prix sont au maximum</li>
          <li><strong>Week-end du 6 décembre</strong> (Saint-Nicolas) — tradition très importante en Alsace, logements pris d'assaut</li>
          <li><strong>Week-end du 13 décembre</strong> — généralement le plus fréquenté de l'année</li>
          <li><strong>Les lundi-mardi</strong> — les moins chers et les plus tranquilles</li>
        </ul>

        <div style={{ background: `linear-gradient(135deg, ${NOEL} 0%, #991B1B 100%)`, borderRadius: 20, padding: '32px 28px', marginTop: 40, textAlign: 'center', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>🎄</div>
          <h3 style={{ fontSize: 22, fontWeight: 800, color: WHITE, marginBottom: 8 }}>Trouvez votre logement pour Noël en Alsace</h3>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.8)', marginBottom: 20 }}>Des centaines de logements alsaciens en location directe. Contactez les propriétaires sur WhatsApp pour les meilleures offres.</p>
          <a href="/location-vacances/grand-est" style={{ display: 'inline-block', background: WHITE, color: NOEL, borderRadius: 12, padding: '14px 28px', fontSize: 15, fontWeight: 800 }}>
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
