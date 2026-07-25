import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Comment éviter les arnaques en location saisonnière ? | LocaDirect',
  description: '5 règles simples pour ne jamais se faire avoir en réservant un logement de vacances, que ce soit sur une plateforme ou en direct.',
}

const ORANGE = '#EA580C'
const WHITE = '#FFFFFF'
const GRAY = '#F9FAFB'
const TEXT = '#1F2937'
const TEXT_DIM = '#6B7280'
const BORDER = '#E5E7EB'
const RED_LIGHT = '#FEF2F2'
const GREEN_LIGHT = '#F0FDF4'

export default function ArticleArnaquesPage() {
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
        <a href="/blog" style={{ fontSize: 14, color: TEXT_DIM, padding: '8px 14px', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>← Blog</a>
      </nav>

      <div style={{ position: 'relative', height: 460 }}>
        <img src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1400&q=85" alt="Sécurité location saisonnière" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '40px 20px', maxWidth: 780, margin: '0 auto' }}>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 16, fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
            <span style={{ background: ORANGE, color: WHITE, borderRadius: 20, padding: '4px 14px', fontSize: 12, fontWeight: 800 }}>🛡️ Conseils</span>
            <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13 }}>4 juillet 2026 · 7 min de lecture</span>
          </div>
          <h1 style={{ fontSize: 36, fontWeight: 900, color: WHITE, lineHeight: 1.2, fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif', maxWidth: 700 }}>
            Comment éviter les arnaques en location saisonnière ?
          </h1>
        </div>
      </div>

      <div style={{ maxWidth: 740, margin: '0 auto', padding: '48px 20px 80px' }}>

        <blockquote>
          "On a payé 1 200€ d'acompte pour un appartement à Barcelone. Le jour J, l'adresse n'existait pas. L'escroc avait copié une vraie annonce Airbnb." — Famille Moreau, 2025
        </blockquote>

        <p>
          Les arnaques à la location saisonnière ont explosé ces dernières années. Selon la DGCCRF, les signalements ont augmenté de 40% entre 2023 et 2025. Avec la démocratisation des outils d'IA, les fausses annonces sont de plus en plus difficiles à détecter. Pourtant, quelques règles simples suffisent à s'en protéger.
        </p>

        <h2>Les 5 arnaques les plus courantes</h2>

        <div style={{ background: RED_LIGHT, borderRadius: 14, padding: '20px 24px', marginBottom: 28, fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
          <p style={{ fontSize: 15, fontWeight: 700, color: '#DC2626', marginBottom: 8 }}>⚠️ Les signaux d'alarme à fuir</p>
          <ul style={{ fontSize: 14, color: '#991B1B' }}>
            <li>Prix anormalement bas (50% moins cher que le marché)</li>
            <li>Paiement demandé par virement Western Union ou carte cadeau</li>
            <li>Propriétaire "à l'étranger" qui ne peut pas vous montrer le logement</li>
            <li>Photos issues de Google Street View ou de sites immobiliers</li>
            <li>Urgence artificielle ("une autre famille est intéressée, décidez vite")</li>
          </ul>
        </div>

        <h3>1. L'annonce fantôme</h3>
        <p>Un escroc copie une vraie annonce sur un site légitime et la republie à un prix attractif. Il demande un virement d'acompte, puis disparaît. La seule protection : toujours passer par des plateformes avec modération manuelle des annonces.</p>

        <h3>2. Le logement sur-vendu</h3>
        <p>Le logement existe, mais les photos datent de 10 ans. La "vue mer" est en réalité la vue sur le parking du voisin. Protection : demandez des photos récentes prises le jour même, et une vidéo de l'extérieur.</p>

        <h3>3. La double réservation</h3>
        <p>Le propriétaire accepte plusieurs réservations pour la même période. Vous arrivez et quelqu'un est déjà dans le logement. Protection : obtenez une confirmation écrite de la réservation avec les dates exactes.</p>

        <h3>4. Les frais cachés</h3>
        <p>Frais de ménage, taxe de séjour, caution, frais de linge... Les frais annexes peuvent doubler le prix initial. Protection : demandez le prix total avant de réserver.</p>

        <h3>5. Le faux propriétaire</h3>
        <p>Quelqu'un se fait passer pour le propriétaire alors que le logement est en location ou en vente légitime. Il encaisse l'acompte et disparaît. Protection : vérifiez que le logement n'est pas en vente sur le Bon Coin ou les sites immobiliers.</p>

        <h2>Les 7 règles d'or pour se protéger</h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 28, fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
          {[
            { num: '01', titre: 'Utilisez une plateforme avec modération humaine', desc: 'Les plateformes qui vérifient manuellement chaque annonce avant publication offrent une protection bien supérieure aux sites en auto-publication.' },
            { num: '02', titre: 'Vérifiez le propriétaire', desc: "Demandez à faire un appel vidéo. Un escroc refusera toujours. Vérifiez aussi son profil sur les réseaux sociaux — un compte créé la semaine dernière est suspect." },
            { num: '03', titre: 'Exigez tout par écrit', desc: 'WhatsApp, email, SMS — peu importe, mais tout doit être écrit. Les accords verbaux ne valent rien en cas de litige.' },
            { num: '04', titre: "N'envoyez jamais d'argent avant d'avoir signé", desc: "Un propriétaire sérieux ne vous demandera pas un virement sur un compte personnel avant que vous ayez au moins un contrat de location signé." },
            { num: '05', titre: 'Méfiez-vous des prix trop bas', desc: 'Un appartement à Paris à 60€/nuit au mois d\'août, c\'est une arnaque. Comparez toujours avec le marché local.' },
            { num: '06', titre: 'Vérifiez l\'adresse', desc: 'Cherchez l\'adresse sur Google Maps Street View. Si l\'immeuble n\'existe pas ou ne correspond pas aux photos, fuyez.' },
            { num: '07', titre: 'Utilisez une carte bancaire', desc: 'En cas d\'arnaque, un paiement par carte est plus facile à contester qu\'un virement. Certaines banques remboursent automatiquement en cas de fraude avérée.' },
          ].map(item => (
            <div key={item.num} style={{ display: 'flex', gap: 16, padding: 18, background: GREEN_LIGHT, borderRadius: 14, border: '1px solid #BBF7D0' }}>
              <span style={{ fontSize: 13, fontWeight: 800, color: '#16A34A', flexShrink: 0, width: 28 }}>{item.num}</span>
              <div>
                <p style={{ fontSize: 15, fontWeight: 700, color: '#166534', marginBottom: 4 }}>{item.titre}</p>
                <p style={{ fontSize: 13, color: '#166534', lineHeight: 1.6, marginBottom: 0 }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <h2>Que faire si vous avez été victime d'une arnaque ?</h2>
        <ul>
          <li>Signalez immédiatement à votre banque pour tenter un chargeback</li>
          <li>Déposez une plainte auprès de la police ou de la gendarmerie</li>
          <li>Signalez l'annonce sur la plateforme concernée</li>
          <li>Signalez sur <strong>signal.conso.gouv.fr</strong> (site officiel gouvernemental)</li>
        </ul>

        <div style={{ background: `linear-gradient(135deg, #1F2937 0%, #374151 100%)`, borderRadius: 20, padding: '32px 28px', marginTop: 40, textAlign: 'center', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>✅</div>
          <h3 style={{ fontSize: 20, fontWeight: 800, color: WHITE, marginBottom: 8 }}>Annonces vérifiées manuellement</h3>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.75)', marginBottom: 20 }}>Chaque annonce LocaDirect est validée par notre équipe avant publication.</p>
          <a href="/logements" style={{ display: 'inline-block', background: ORANGE, color: WHITE, borderRadius: 12, padding: '13px 24px', fontSize: 14, fontWeight: 700 }}>
            Voir les annonces vérifiées →
          </a>
        </div>

        <div style={{ marginTop: 48, paddingTop: 32, borderTop: `1px solid ${BORDER}`, fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
          <p style={{ fontSize: 11, color: ORANGE, letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 16 }}>À lire aussi</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { slug: 'reserver-direct-plutot-airbnb', titre: 'Pourquoi réserver en direct plutôt qu\'Airbnb ?' },
              { slug: 'location-sans-commission-comment-ca-marche', titre: 'Location saisonnière sans commission — comment ça marche ?' },
              { slug: 'louer-sans-airbnb-proprietaire', titre: 'Propriétaire — comment louer sans passer par Airbnb ?' },
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
