import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Alternative à Airbnb sans commission',
  description:
    "LocaDirect est une alternative gratuite à Airbnb : 0% de commission, contact direct WhatsApp, annonces vérifiées. Découvrez pourquoi de plus en plus de propriétaires changent de plateforme.",
  openGraph: {
    title: 'Alternative à Airbnb sans commission | LocaDirect',
    description:
      "0% de commission, contact direct WhatsApp, annonces vérifiées. Découvrez l'alternative gratuite à Airbnb.",
  },
}

const ORANGE = '#EA580C'
const ORANGE_LIGHT = '#FFF7ED'
const WHITE = '#FFFFFF'
const GRAY = '#F9FAFB'
const TEXT = '#1F2937'
const TEXT_DIM = '#6B7280'
const BORDER = '#E5E7EB'
const GREEN = '#16A34A'

export default function AlternativeAirbnbPage() {
  return (
    <div style={{ background: WHITE, color: TEXT, fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif', minHeight: '100vh' }}>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        a { text-decoration: none; color: inherit; }
        .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
        @media (max-width: 768px) {
          .grid-2 { grid-template-columns: 1fr; }
          .grid-3 { grid-template-columns: 1fr; }
        }
      `}</style>

      {/* NAVBAR */}
      <nav style={{ position: 'sticky', top: 0, zIndex: 100, background: WHITE, borderBottom: `1px solid ${BORDER}`, padding: '12px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 34, height: 34, background: ORANGE, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>🏠</div>
          <span style={{ fontSize: 18, fontWeight: 800, color: TEXT }}>Loca<span style={{ color: ORANGE }}>Direct</span></span>
        </Link>
        <Link href="/inscription" style={{ background: ORANGE, color: WHITE, borderRadius: 10, padding: '10px 18px', fontSize: 14, fontWeight: 700 }}>
          Publier gratuitement
        </Link>
      </nav>

      {/* HERO */}
      <section style={{ padding: '56px 20px 40px', background: `linear-gradient(135deg, ${ORANGE_LIGHT} 0%, ${WHITE} 60%)`, textAlign: 'center' }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <p style={{ fontSize: 11, color: ORANGE, letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 12 }}>
            Comparatif
          </p>
          <h1 style={{ fontSize: 32, fontWeight: 800, lineHeight: 1.25, marginBottom: 16, color: TEXT }}>
            La meilleure alternative à Airbnb<br />
            <span style={{ color: ORANGE }}>sans commission</span>
          </h1>
          <p style={{ fontSize: 16, color: TEXT_DIM, lineHeight: 1.7, maxWidth: 560, margin: '0 auto' }}>
            Airbnb prélève 15 à 20% de commission sur chaque réservation. LocaDirect vous permet de louer votre logement directement, sans intermédiaire, et de garder l'intégralité de vos revenus.
          </p>
        </div>
      </section>

      {/* CHIFFRE CLÉ */}
      <section style={{ padding: '32px 20px', background: ORANGE }}>
        <div style={{ maxWidth: 700, margin: '0 auto', textAlign: 'center' }}>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.85)', marginBottom: 8 }}>
            Pour un logement loué 100€/nuit, 200 nuits par an
          </p>
          <p style={{ fontSize: 36, fontWeight: 800, color: WHITE }}>
            Jusqu'à 4 000€ d'économie par an
          </p>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', marginTop: 6 }}>
            en évitant la commission Airbnb (15-20%)
          </p>
        </div>
      </section>

      {/* TABLEAU COMPARATIF DÉTAILLÉ */}
      <section style={{ padding: '56px 20px', maxWidth: 800, margin: '0 auto' }}>
        <h2 style={{ fontSize: 24, fontWeight: 800, color: TEXT, marginBottom: 28, textAlign: 'center' }}>
          LocaDirect vs Airbnb : la comparaison complète
        </h2>
        <div style={{ background: WHITE, borderRadius: 20, overflow: 'hidden', border: `1px solid ${BORDER}` }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
            <thead>
              <tr style={{ background: ORANGE }}>
                <th style={{ padding: '14px 16px', textAlign: 'left', color: WHITE, fontWeight: 600 }}>Critère</th>
                <th style={{ padding: '14px 16px', textAlign: 'center', color: WHITE, fontWeight: 700 }}>LocaDirect</th>
                <th style={{ padding: '14px 16px', textAlign: 'center', color: 'rgba(255,255,255,0.7)', fontWeight: 600 }}>Airbnb</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Commission propriétaire', '0%', '15-20%'],
                ['Commission voyageur', '0%', '10-15%'],
                ['Abonnement obligatoire', 'Non', 'Non'],
                ['Contact direct WhatsApp', '✅ Oui', '❌ Via messagerie interne'],
                ['Numéro de téléphone visible', '✅ Oui (inscrits)', '❌ Masqué'],
                ['Annonce vérifiée manuellement', '✅ Oui', '❌ Modération automatisée'],
                ['Liberté de négociation directe', '✅ Totale', '❌ Limitée par la plateforme'],
                ['Référencement Google par annonce', '✅ Oui', '✅ Oui'],
                ['Annuaire de prestataires intégré', '✅ Oui (conciergerie, ménage...)', '❌ Non'],
                ['Délai de versement des revenus', 'Immédiat (paiement direct)', '24-48h après arrivée'],
              ].map(([feature, loca, airbnb], i) => (
                <tr key={feature} style={{ background: i % 2 === 0 ? WHITE : GRAY }}>
                  <td style={{ padding: '12px 16px', color: TEXT, fontWeight: 500 }}>{feature}</td>
                  <td style={{ padding: '12px 16px', textAlign: 'center', color: GREEN, fontWeight: 700 }}>{loca}</td>
                  <td style={{ padding: '12px 16px', textAlign: 'center', color: TEXT_DIM }}>{airbnb}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* POURQUOI CHANGER */}
      <section style={{ padding: '56px 20px', background: GRAY }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <h2 style={{ fontSize: 24, fontWeight: 800, color: TEXT, marginBottom: 28, textAlign: 'center' }}>
            Pourquoi de plus en plus de propriétaires changent
          </h2>
          <div className="grid-3">
            {[
              { icon: '💰', title: 'Garder ses revenus', desc: "Sur un an, la commission Airbnb représente souvent plusieurs centaines voire milliers d'euros perdus. Avec LocaDirect, cet argent reste dans votre poche." },
              { icon: '🤝', title: 'Relation directe', desc: "Échanger directement avec le voyageur par WhatsApp permet de mieux cerner ses attentes, de négocier librement et de construire une relation de confiance, sans filtre algorithmique." },
              { icon: '🔓', title: 'Indépendance', desc: "Aucune dépendance à un algorithme qui décide de la visibilité de votre annonce. Votre lien LocaDirect vous appartient, vous pouvez le partager où vous voulez." },
            ].map(item => (
              <div key={item.title} style={{ background: WHITE, borderRadius: 16, padding: 24, border: `1px solid ${BORDER}` }}>
                <div style={{ fontSize: 32, marginBottom: 12 }}>{item.icon}</div>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: TEXT, marginBottom: 8 }}>{item.title}</h3>
                <p style={{ fontSize: 13, color: TEXT_DIM, lineHeight: 1.6 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ SPÉCIFIQUE */}
      <section style={{ padding: '56px 20px', maxWidth: 700, margin: '0 auto' }}>
        <h2 style={{ fontSize: 24, fontWeight: 800, color: TEXT, marginBottom: 28, textAlign: 'center' }}>
          Questions fréquentes
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {[
            {
              q: 'Dois-je quitter Airbnb pour utiliser LocaDirect ?',
              r: "Non, vous pouvez utiliser les deux en parallèle. Beaucoup de propriétaires gardent leur annonce Airbnb pour la visibilité, tout en publiant aussi sur LocaDirect pour récupérer une partie des réservations sans commission.",
            },
            {
              q: 'LocaDirect est-il aussi sécurisé qu\'Airbnb ?',
              r: "Chaque annonce est vérifiée manuellement par notre équipe avant publication. La différence avec Airbnb est que la transaction se fait directement entre vous et le voyageur, comme pour une location classique entre particuliers.",
            },
            {
              q: 'Comment les voyageurs me trouvent-ils sur LocaDirect ?',
              r: "Chaque annonce génère sa propre page indexée sur Google, et vous pouvez aussi partager votre lien directement sur vos réseaux sociaux, dans des groupes Facebook ou par bouche-à-oreille.",
            },
            {
              q: 'Est-ce vraiment gratuit, sans piège ?',
              r: "Oui, la publication d'annonces est et restera gratuite. Aucune carte bancaire n'est demandée à l'inscription. Des options payantes optionnelles pourront être proposées plus tard pour ceux qui souhaitent plus de visibilité, mais l'usage de base reste gratuit.",
            },
          ].map((item, i) => (
            <div key={i} style={{ background: WHITE, border: `1px solid ${BORDER}`, borderRadius: 14, padding: 20 }}>
              <h3 style={{ fontSize: 14, fontWeight: 700, color: TEXT, marginBottom: 8 }}>{item.q}</h3>
              <p style={{ fontSize: 13, color: TEXT_DIM, lineHeight: 1.7 }}>{item.r}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA FINAL */}
      <section style={{ padding: '56px 20px', background: ORANGE, textAlign: 'center' }}>
        <div style={{ maxWidth: 560, margin: '0 auto' }}>
          <div style={{ fontSize: 44, marginBottom: 16 }}>🏠</div>
          <h2 style={{ fontSize: 26, fontWeight: 800, color: WHITE, marginBottom: 14, lineHeight: 1.3 }}>
            Prêt à arrêter de payer des commissions ?
          </h2>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.85)', marginBottom: 28, lineHeight: 1.7 }}>
            Publiez votre logement gratuitement en quelques minutes, en complément ou à la place d'Airbnb.
          </p>
          <Link href="/inscription" style={{ background: WHITE, color: ORANGE, borderRadius: 14, padding: '15px 36px', fontSize: 15, fontWeight: 800, display: 'inline-block' }}>
            Publier mon logement gratuitement →
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: TEXT, padding: '32px 20px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16, justifyContent: 'center' }}>
            <div style={{ width: 28, height: 28, background: ORANGE, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>🏠</div>
            <span style={{ fontSize: 16, fontWeight: 800, color: WHITE }}>Loca<span style={{ color: ORANGE }}>Direct</span></span>
          </div>
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)' }}>© 2026 LocaDirect · loca-direct.fr</p>
        </div>
      </footer>
    </div>
  )
}
