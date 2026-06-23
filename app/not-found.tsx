import Link from 'next/link'

const ORANGE = '#EA580C'
const ORANGE_LIGHT = '#FFF7ED'
const WHITE = '#FFFFFF'
const TEXT = '#1F2937'
const TEXT_DIM = '#6B7280'

export default function NotFound() {
  return (
    <div
      style={{
        background: ORANGE_LIGHT,
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
      }}
    >
      <div
        style={{
          background: WHITE,
          borderRadius: 24,
          padding: '48px 36px',
          maxWidth: 440,
          width: '100%',
          textAlign: 'center',
          boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
        }}
      >
        <div style={{ fontSize: 56, marginBottom: 16 }}>🏠</div>

        <p
          style={{
            fontSize: 13,
            color: ORANGE,
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            marginBottom: 10,
          }}
        >
          Erreur 404
        </p>

        <h1
          style={{
            fontSize: 22,
            fontWeight: 800,
            color: TEXT,
            marginBottom: 12,
            lineHeight: 1.3,
          }}
        >
          Cette page n'existe pas ou plus
        </h1>

        <p
          style={{
            fontSize: 14,
            color: TEXT_DIM,
            lineHeight: 1.7,
            marginBottom: 28,
          }}
        >
          L'annonce ou la page que vous cherchez a peut-être été supprimée, ou l'adresse comporte une erreur.
        </p>

        <Link
          href="/"
          style={{
            display: 'inline-block',
            background: ORANGE,
            color: WHITE,
            borderRadius: 12,
            padding: '14px 28px',
            fontSize: 15,
            fontWeight: 700,
            textDecoration: 'none',
            marginBottom: 12,
          }}
        >
          ← Retour à l'accueil
        </Link>

        <div style={{ marginTop: 8 }}>
          <Link
            href="/prestataires"
            style={{
              fontSize: 13,
              color: TEXT_DIM,
              textDecoration: 'underline',
            }}
          >
            Voir l'annuaire des prestataires
          </Link>
        </div>
      </div>
    </div>
  )
}
