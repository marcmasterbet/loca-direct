import Link from 'next/link'

const ORANGE = '#EA580C'
const ORANGE_LIGHT = '#FFF7ED'
const WHITE = '#FFFFFF'
const TEXT = '#1F2937'
const TEXT_DIM = '#6B7280'

export default function SuccesPage() {
  return (
    <div style={{ background: ORANGE_LIGHT, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20, fontFamily: '-apple-system, sans-serif' }}>
      <div style={{ background: WHITE, borderRadius: 20, padding: 36, maxWidth: 440, textAlign: 'center', boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>🎉</div>
        <h1 style={{ fontSize: 20, fontWeight: 800, color: TEXT, marginBottom: 12 }}>Annonce envoyée !</h1>
        <p style={{ fontSize: 14, color: TEXT_DIM, lineHeight: 1.7, marginBottom: 24 }}>
          Votre annonce est en cours de vérification par notre équipe.
          Vous recevrez un email dès qu'elle sera en ligne (généralement sous 24-48h).
        </p>
        <Link href="/espace" style={{ display: 'inline-block', background: ORANGE, color: WHITE, borderRadius: 12, padding: '14px 28px', fontSize: 15, fontWeight: 700, textDecoration: 'none' }}>
          Retour à mon espace
        </Link>
      </div>
    </div>
  )
}