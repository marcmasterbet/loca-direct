import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Propriétaire — comment louer sans passer par Airbnb ? | LocaDirect',
  description: 'Gardez 100% de vos revenus. Voici comment mettre en location votre logement en direct, attirer des locataires sérieux et sécuriser vos réservations.',
}

const ORANGE = '#EA580C'
const ORANGE_LIGHT = '#FFF7ED'
const WHITE = '#FFFFFF'
const GRAY = '#F9FAFB'
const TEXT = '#1F2937'
const TEXT_DIM = '#6B7280'
const BORDER = '#E5E7EB'

export default function ArticleProprietairePage() {
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
        ol { padding-left: 24px; margin-bottom: 20px; }
        ol li { font-size: 17px; line-height: 1.8; color: #374151; margin-bottom: 12px; }
        blockquote { border-left: 4px solid #EA580C; padding: 16px 24px; background: #FFF7ED; border-radius: 0 12px 12px 0; margin: 28px 0; font-style: italic; color: #92400E; }
      `}</style>

      <nav style={{ position: 'sticky', top: 0, zIndex: 100, background: WHITE, borderBottom: `1px solid ${BORDER}`, padding: '12px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
        <a href="/" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 34, height: 34, background: ORANGE, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>🏠</div>
          <span style={{ fontSize: 18, fontWeight: 800, color: TEXT }}>Loca<span style={{ color: ORANGE }}>Direct</span></span>
        </a>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
          <a href="/blog" style={{ fontSize: 14, color: TEXT_DIM, padding: '8px 14px' }}>← Blog</a>
          <a href="/inscription" style={{ background: ORANGE, color: WHITE, borderRadius: 10, padding: '10px 18px', fontSize: 14, fontWeight: 700 }}>Publier mon logement</a>
        </div>
      </nav>

      <div style={{ position: 'relative', height: 460 }}>
        <img src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1400&q=85" alt="Propriétaire qui loue son logement" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '40px 20px', maxWidth: 780, margin: '0 auto' }}>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 16, fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
            <span style={{ background: ORANGE, color: WHITE, borderRadius: 20, padding: '4px 14px', fontSize: 12, fontWeight: 800 }}>🏡 Propriétaires</span>
            <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13 }}>4 juillet 2026 · 8 min de lecture</span>
          </div>
          <h1 style={{ fontSize: 36, fontWeight: 900, color: WHITE, lineHeight: 1.2, fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif', maxWidth: 700 }}>
            Propriétaire — comment louer sans passer par Airbnb ?
          </h1>
        </div>
      </div>

      <div style={{ maxWidth: 740, margin: '0 auto', padding: '48px 20px 80px' }}>

        <blockquote>
          "J'ai quitté Airbnb après 4 ans. Je gagne maintenant 18% de plus par réservation, j'ai moins de stress et je choisis mes locataires. Je n'y retournerai jamais." — Laurent, propriétaire à Annecy
        </blockquote>

        <p>
          En France, plus de 400 000 propriétaires louent leur logement sur Airbnb. Beaucoup le font par habitude ou par manque d'alternative. Pourtant, la location directe est non seulement possible, mais souvent plus rentable et moins stressante.
        </p>

        <h2>Pourquoi quitter les plateformes ?</h2>

        <p>
          Les grandes plateformes présentent des inconvénients sérieux pour les propriétaires :
        </p>

        <ul>
          <li><strong>Commission de 10 à 20%</strong> prélevée sur chaque réservation</li>
          <li><strong>Algorithme opaque</strong> qui peut déréférencer votre annonce sans explication</li>
          <li><strong>Dépendance totale</strong> — si la plateforme change ses règles, vous subissez</li>
          <li><strong>Contact filtré</strong> avec les locataires — impossible d'avoir une vraie relation</li>
          <li><strong>Avis difficiles à contester</strong> — un mauvais avis injustifié peut ruiner votre note</li>
          <li><strong>Caution limitée</strong> — Airbnb plafonne les dommages remboursables</li>
        </ul>

        <h2>Le guide complet pour louer en direct</h2>

        <h3>Étape 1 — Créez votre vitrine en ligne</h3>
        <p>
          La première étape est d'avoir une présence en ligne propre. Sur LocaDirect, créez votre annonce gratuitement en quelques minutes. Ajoutez des photos de qualité, une description honnête et votre numéro WhatsApp. Votre annonce a sa propre URL que vous pouvez partager partout.
        </p>

        <h3>Étape 2 — Partagez sur vos réseaux</h3>
        <p>
          Facebook reste le canal numéro un pour trouver des locataires en direct. Partagez votre annonce dans les groupes de votre région, les groupes de voyageurs, les groupes de chiens (si vous acceptez les animaux), les groupes de nomades digitaux. Un partage bien fait peut générer 20 à 30 demandes en quelques heures.
        </p>

        <h3>Étape 3 — Demandez à votre réseau</h3>
        <p>
          Famille, amis, collègues, anciens locataires — votre réseau est votre meilleur apporteur d'affaires. Un ancien locataire satisfait vaut mieux que dix avis Airbnb. N'hésitez pas à leur demander de parler de votre logement autour d'eux.
        </p>

        <h3>Étape 4 — Sécurisez vos réservations</h3>
        <p>
          En direct, c'est vous qui gérez. Quelques règles simples pour sécuriser vos réservations :
        </p>
        <ul>
          <li>Rédigez un contrat de location court (une page suffit) avec les dates, le prix et les conditions</li>
          <li>Demandez un acompte de 30% à la signature, le solde à l'arrivée</li>
          <li>Prenez une caution par chèque (non encaissé) ou virement</li>
          <li>Faites un état des lieux d'entrée et de sortie avec photos</li>
          <li>Vérifiez l'identité du locataire (demandez une pièce d'identité)</li>
        </ul>

        <h3>Étape 5 — Gérez les demandes</h3>
        <p>
          Sur WhatsApp, les échanges sont directs et rapides. Répondez vite, soyez clair sur les conditions et n'hésitez pas à refuser une réservation si quelque chose ne vous convient pas. En direct, vous avez le contrôle total sur qui entre chez vous.
        </p>

        <h2>Combien pouvez-vous gagner de plus ?</h2>

        <div style={{ background: GRAY, borderRadius: 16, padding: '24px', marginBottom: 28, fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif', border: `1px solid ${BORDER}` }}>
          <p style={{ fontSize: 15, fontWeight: 700, color: TEXT, marginBottom: 12 }}>Exemple concret — appartement à Nice, 80€/nuit</p>
          <div style={{ display: 'flex', gap: 16 }}>
            <div style={{ flex: 1, background: WHITE, borderRadius: 12, padding: 16, border: `1px solid ${BORDER}` }}>
              <p style={{ fontSize: 12, color: TEXT_DIM, marginBottom: 4 }}>Via Airbnb</p>
              <p style={{ fontSize: 22, fontWeight: 800, color: '#DC2626' }}>66€</p>
              <p style={{ fontSize: 12, color: TEXT_DIM }}>après commission de 17%</p>
            </div>
            <div style={{ flex: 1, background: ORANGE_LIGHT, borderRadius: 12, padding: 16, border: `1px solid ${ORANGE}` }}>
              <p style={{ fontSize: 12, color: ORANGE, marginBottom: 4 }}>Via LocaDirect</p>
              <p style={{ fontSize: 22, fontWeight: 800, color: ORANGE }}>80€</p>
              <p style={{ fontSize: 12, color: TEXT_DIM }}>100% pour vous</p>
            </div>
          </div>
          <p style={{ fontSize: 13, color: TEXT_DIM, marginTop: 12 }}>Sur 30 nuits/mois : 420€ de revenus supplémentaires</p>
        </div>

        <h2>Les questions fréquentes</h2>

        <h3>Faut-il déclarer ses revenus de location directe ?</h3>
        <p>Oui, comme pour toute location saisonnière. Les revenus de location meublée courte durée sont à déclarer en BIC (Bénéfices Industriels et Commerciaux). Pour moins de 77 700€ de revenus annuels, le régime micro-BIC avec abattement de 50% s'applique.</p>

        <h3>Comment gérer les impayés ?</h3>
        <p>Un contrat signé et un acompte perçu vous protègent. En cas de litige, le contrat est votre meilleure arme. Pour les petits montants, la juridiction de proximité traite les dossiers rapidement.</p>

        <h3>Et si quelque chose est cassé ?</h3>
        <p>C'est pour ça que vous avez demandé une caution. Un état des lieux d'entrée et de sortie avec photos est votre meilleure protection. Votre assurance habitation couvre également certains dommages causés par les locataires.</p>

        <div style={{ background: `linear-gradient(135deg, ${ORANGE} 0%, #C2410C 100%)`, borderRadius: 20, padding: '32px 28px', marginTop: 40, textAlign: 'center', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>🏠</div>
          <h3 style={{ fontSize: 22, fontWeight: 800, color: WHITE, marginBottom: 8 }}>Publiez votre logement gratuitement</h3>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.85)', marginBottom: 20 }}>Annonce vérifiée par notre équipe. Contact direct WhatsApp. Zéro commission.</p>
          <a href="/inscription" style={{ display: 'inline-block', background: WHITE, color: ORANGE, borderRadius: 12, padding: '14px 28px', fontSize: 15, fontWeight: 800 }}>
            Créer mon annonce →
          </a>
        </div>

        <div style={{ marginTop: 48, paddingTop: 32, borderTop: `1px solid ${BORDER}`, fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
          <p style={{ fontSize: 11, color: ORANGE, letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 16 }}>À lire aussi</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { slug: 'photographier-logement-location', titre: 'Comment bien photographier son logement pour le louer ?' },
              { slug: 'conciergerie-location-saisonniere', titre: 'Conciergerie Airbnb — tout ce qu\'il faut savoir' },
              { slug: 'location-sans-commission-comment-ca-marche', titre: 'Location sans commission — comment ça marche ?' },
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
