import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pourquoi réserver en direct plutôt qu\'Airbnb ? | LocaDirect',
  description: 'Commission de 15 à 20%, contact limité, prix gonflés... Voici pourquoi de plus en plus de voyageurs et propriétaires fuient les grandes plateformes.',
}

const ORANGE = '#EA580C'
const ORANGE_LIGHT = '#FFF7ED'
const WHITE = '#FFFFFF'
const GRAY = '#F9FAFB'
const TEXT = '#1F2937'
const TEXT_DIM = '#6B7280'
const BORDER = '#E5E7EB'
const GREEN = '#16A34A'
const RED = '#DC2626'

export default function ArticleAirbnbPage() {
  return (
    <div style={{ background: WHITE, minHeight: '100vh', fontFamily: 'Georgia, serif', color: TEXT }}>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        a { text-decoration: none; color: inherit; }
        p { line-height: 1.85; margin-bottom: 20px; font-size: 17px; color: #374151; }
        h2 { font-size: 24px; font-weight: 800; margin: 40px 0 16px; color: #1F2937; font-family: -apple-system, BlinkMacSystemFont, sans-serif; }
        h3 { font-size: 19px; font-weight: 700; margin: 28px 0 12px; color: #1F2937; font-family: -apple-system, BlinkMacSystemFont, sans-serif; }
        ul { padding-left: 24px; margin-bottom: 20px; }
        ul li { font-size: 17px; line-height: 1.8; color: #374151; margin-bottom: 6px; }
        blockquote { border-left: 4px solid #EA580C; padding: 16px 24px; background: #FFF7ED; border-radius: 0 12px 12px 0; margin: 28px 0; font-style: italic; color: #92400E; }
        table { width: 100%; border-collapse: collapse; margin: 24px 0; font-family: -apple-system, BlinkMacSystemFont, sans-serif; }
        th { background: #1F2937; color: white; padding: 12px 16px; text-align: left; font-size: 14px; }
        td { padding: 12px 16px; border-bottom: 1px solid #E5E7EB; font-size: 14px; }
        tr:nth-child(even) td { background: #F9FAFB; }
      `}</style>

      <nav style={{ position: 'sticky', top: 0, zIndex: 100, background: WHITE, borderBottom: `1px solid ${BORDER}`, padding: '12px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
        <a href="/" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 34, height: 34, background: ORANGE, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>🏠</div>
          <span style={{ fontSize: 18, fontWeight: 800, color: TEXT }}>Loca<span style={{ color: ORANGE }}>Direct</span></span>
        </a>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <a href="/blog" style={{ fontSize: 14, color: TEXT_DIM, padding: '8px 14px' }}>← Blog</a>
          <a href="/inscription" style={{ background: ORANGE, color: WHITE, borderRadius: 10, padding: '10px 18px', fontSize: 14, fontWeight: 700 }}>
            Publier gratuitement
          </a>
        </div>
      </nav>

      <div style={{ position: 'relative', height: 460 }}>
        <img src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1400&q=85" alt="Belle maison de vacances" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '40px 20px', maxWidth: 780, margin: '0 auto' }}>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 16, fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
            <span style={{ background: ORANGE, color: WHITE, borderRadius: 20, padding: '4px 14px', fontSize: 12, fontWeight: 800 }}>💡 Conseils</span>
            <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13 }}>4 juillet 2026 · 6 min de lecture</span>
          </div>
          <h1 style={{ fontSize: 36, fontWeight: 900, color: WHITE, lineHeight: 1.2, fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif', maxWidth: 700 }}>
            Pourquoi réserver en direct plutôt qu'Airbnb ?
          </h1>
        </div>
      </div>

      <div style={{ maxWidth: 740, margin: '0 auto', padding: '48px 20px 80px' }}>

        <blockquote>
          "J'ai payé 340€ pour un appartement affiché à 260€. La différence ? Les frais de service Airbnb. Le propriétaire, lui, n'a touché que 220€." — Thomas, voyageur régulier
        </blockquote>

        <p>
          Airbnb a révolutionné la location de vacances en mettant en relation propriétaires et voyageurs à l'échelle mondiale. Mais en 2026, le modèle montre ses limites : frais exorbitants, relation déshumanisée, algorithmes opaques. De plus en plus de particuliers cherchent une alternative — et la réservation en direct est en train de s'imposer.
        </p>

        <h2>Le problème des commissions</h2>

        <p>Voici ce qui se passe réellement quand vous réservez sur Airbnb :</p>

        <table>
          <thead>
            <tr>
              <th>Élément</th>
              <th>Airbnb</th>
              <th>Location directe</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Prix affiché</td><td>200€/nuit</td><td>180€/nuit</td></tr>
            <tr><td>Frais voyageur</td><td>+30€ (15%)</td><td>0€</td></tr>
            <tr><td>Frais ménage</td><td>+80€</td><td>inclus ou négociable</td></tr>
            <tr><td>Commission propriétaire</td><td>-26€ (13%)</td><td>0€</td></tr>
            <tr><td>Ce que paie le voyageur</td><td><strong>310€</strong></td><td><strong>180€</strong></td></tr>
            <tr><td>Ce que touche le propriétaire</td><td><strong>174€</strong></td><td><strong>180€</strong></td></tr>
          </tbody>
        </table>

        <p>
          La différence est flagrante. Airbnb prend jusqu'à 30% de la transaction totale. Propriétaire et voyageur paient tous les deux pour un service d'intermédiaire qui n'a plus grand chose à apporter une fois la relation établie.
        </p>

        <h2>5 bonnes raisons de réserver en direct</h2>

        <h3>1. Vous payez le vrai prix</h3>
        <p>
          Sans intermédiaire, le prix affiché est le prix réel. Pas de frais de service surprise au moment de payer, pas de frais de ménage cachés. Ce que vous voyez est ce que vous payez.
        </p>

        <h3>2. Vous avez un vrai contact humain</h3>
        <p>
          Sur Airbnb, la messagerie est filtrée et surveillée. En direct, vous échangez directement sur WhatsApp avec le propriétaire. Vous pouvez négocier, poser toutes vos questions, demander des photos supplémentaires, et créer une vraie relation de confiance.
        </p>

        <h3>3. Plus de flexibilité</h3>
        <p>
          Arrivée tardive ? Départ anticipé ? Séjour rallongé ? En contact direct avec le propriétaire, tout est négociable. Les plateformes imposent des règles rigides ; les particuliers sont bien plus souples.
        </p>

        <h3>4. Vous soutenez directement les propriétaires</h3>
        <p>
          Les propriétaires qui louent en direct sont souvent des particuliers qui louent leur résidence secondaire ou leur logement pendant leurs vacances. En les contactant directement, vous les aidez à garder 100% de leurs revenus — et eux peuvent se permettre de vous proposer un meilleur prix.
        </p>

        <h3>5. Moins de risques d'annulation de dernière minute</h3>
        <p>
          Les annulations de propriétaires sur Airbnb sont un vrai problème. En contact direct, vous avez établi une relation personnelle. Un propriétaire qui vous connaît annulera beaucoup moins facilement qu'une fiche Airbnb anonyme.
        </p>

        <h2>Les précautions à prendre</h2>

        <p>
          Réserver en direct est sûr, à condition de suivre quelques règles simples :
        </p>

        <ul>
          <li>Vérifiez que l'annonce est sur une plateforme sérieuse avec modération manuelle</li>
          <li>Échangez par écrit — WhatsApp laisse une trace</li>
          <li>Ne versez jamais d'acompte sans avoir signé un document ou sans confirmation écrite</li>
          <li>Utilisez des plateformes où les propriétaires sont vérifiés par email</li>
          <li>Méfiez-vous des prix anormalement bas — c'est souvent le signe d'une arnaque</li>
        </ul>

        <h2>LocaDirect — la location directe vérifiée</h2>

        <p>
          C'est exactement pour répondre à ces besoins que LocaDirect a été créé. Chaque annonce est vérifiée manuellement par notre équipe avant publication. Chaque propriétaire a confirmé son adresse email. Et le contact se fait directement sur WhatsApp — sans intermédiaire, sans commission.
        </p>

        <div style={{ background: `linear-gradient(135deg, #1F2937 0%, #374151 100%)`, borderRadius: 20, padding: '32px 28px', marginTop: 40, textAlign: 'center', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>🏠</div>
          <h3 style={{ fontSize: 22, fontWeight: 800, color: WHITE, marginBottom: 8 }}>Publiez ou trouvez un logement gratuitement</h3>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.75)', marginBottom: 24, maxWidth: 400, margin: '0 auto 24px' }}>
            Sans commission, sans frais cachés. Contact direct WhatsApp avec le propriétaire.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="/logements" style={{ background: ORANGE, color: WHITE, borderRadius: 12, padding: '13px 24px', fontSize: 14, fontWeight: 700 }}>
              Trouver un logement →
            </a>
            <a href="/inscription" style={{ background: 'rgba(255,255,255,0.1)', color: WHITE, borderRadius: 12, padding: '13px 24px', fontSize: 14, fontWeight: 600, border: '1px solid rgba(255,255,255,0.2)' }}>
              Publier mon logement
            </a>
          </div>
        </div>

        <div style={{ marginTop: 48, paddingTop: 32, borderTop: `1px solid ${BORDER}`, fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
          <p style={{ fontSize: 11, color: ORANGE, letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 16 }}>À lire aussi</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { slug: 'eviter-arnaques-location-saisonniere', titre: 'Comment éviter les arnaques en location saisonnière ?' },
              { slug: 'louer-sans-airbnb-proprietaire', titre: 'Propriétaire — comment louer sans passer par Airbnb ?' },
              { slug: 'location-sans-commission-comment-ca-marche', titre: 'Location saisonnière sans commission — comment ça marche ?' },
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
