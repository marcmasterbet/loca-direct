'use client'

import { useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'

const ORANGE = '#EA580C'
const ORANGE_LIGHT = '#FFF7ED'
const WHITE = '#FFFFFF'
const TEXT = '#1F2937'
const TEXT_DIM = '#6B7280'
const BORDER = '#E5E7EB'

export default function ConnexionPage() {
  return (
    <Suspense fallback={<div />}>
      <ConnexionForm />
    </Suspense>
  )
}

function ConnexionForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirect = searchParams.get('redirect')

  const [email, setEmail] = useState('')
  const [motDePasse, setMotDePasse] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    if (!email.trim() || !motDePasse) {
      setError('Veuillez remplir tous les champs')
      return
    }

    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/connexion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, motDePasse }),
      })
      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Une erreur est survenue')
        setLoading(false)
        return
      }

      // ✅ CORRECTION : après connexion → page d'accueil (ou redirect si spécifié)
      router.push(redirect || '/')
    } catch (e) {
      setError('Une erreur est survenue')
      setLoading(false)
    }
  }

  return (
    <div style={{ background: ORANGE_LIGHT, minHeight: '100vh', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif', display: 'flex', flexDirection: 'column' }}>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        a { text-decoration: none; }
        input { font-family: inherit; }
        button { font-family: inherit; cursor: pointer; border: none; }
      `}</style>

      <div style={{ padding: '20px 20px 0' }}>
        <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 34, height: 34, background: ORANGE, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>🏠</div>
          <span style={{ fontSize: 18, fontWeight: 800, color: TEXT }}>Loca<span style={{ color: ORANGE }}>Direct</span></span>
        </Link>
      </div>

      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px 16px' }}>
        <div style={{ width: '100%', maxWidth: 440 }}>

          {redirect && (
            <div style={{ background: WHITE, border: `1px solid ${ORANGE}`, borderRadius: 14, padding: 16, marginBottom: 20, textAlign: 'center' }}>
              <p style={{ fontSize: 14, color: TEXT, fontWeight: 600, marginBottom: 4 }}>🔒 Connectez-vous pour voir cette annonce</p>
            </div>
          )}

          <div style={{ background: WHITE, borderRadius: 20, padding: 28, boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
            <h1 style={{ fontSize: 22, fontWeight: 800, color: TEXT, marginBottom: 6, textAlign: 'center' }}>
              Connexion
            </h1>
            <p style={{ fontSize: 13, color: TEXT_DIM, textAlign: 'center', marginBottom: 24 }}>
              Accédez à votre espace LocaDirect
            </p>

            {error && (
              <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: 10, padding: 12, marginBottom: 16 }}>
                <p style={{ fontSize: 13, color: '#DC2626' }}>{error}</p>
              </div>
            )}

            <div style={{ marginBottom: 14 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: TEXT, marginBottom: 6, display: 'block' }}>Email</label>
              <input
                type="email"
                value={email}
                onChange={e => { setEmail(e.target.value); setError('') }}
                placeholder="vous@email.com"
                style={{ width: '100%', padding: '12px 14px', borderRadius: 10, border: `1px solid ${BORDER}`, fontSize: 15, outline: 'none', color: TEXT }}
              />
            </div>

            <div style={{ marginBottom: 8 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: TEXT, marginBottom: 6, display: 'block' }}>Mot de passe</label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={motDePasse}
                  onChange={e => { setMotDePasse(e.target.value); setError('') }}
                  placeholder="Votre mot de passe"
                  style={{ width: '100%', padding: '12px 44px 12px 14px', borderRadius: 10, border: `1px solid ${BORDER}`, fontSize: 15, outline: 'none', color: TEXT }}
                  onKeyDown={e => { if (e.key === 'Enter') handleSubmit() }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(s => !s)}
                  style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', background: 'transparent', padding: 6, fontSize: 18, color: TEXT_DIM }}
                >
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            <p style={{ textAlign: 'right', marginBottom: 8 }}>
              <Link href="/mot-de-passe-oublie" style={{ fontSize: 12, color: ORANGE, fontWeight: 600 }}>
                Mot de passe oublié ?
              </Link>
            </p>

            <button onClick={handleSubmit} disabled={loading} style={{ width: '100%', background: ORANGE, color: WHITE, borderRadius: 12, padding: 15, fontSize: 15, fontWeight: 700, opacity: loading ? 0.7 : 1, marginTop: 8 }}>
              {loading ? 'Connexion en cours...' : 'Se connecter'}
            </button>
          </div>

          <p style={{ textAlign: 'center', fontSize: 14, color: TEXT_DIM, marginTop: 20 }}>
            Pas encore de compte ?{' '}
            <Link href={`/inscription${redirect ? `?redirect=${redirect}` : ''}`} style={{ color: ORANGE, fontWeight: 700 }}>
              S'inscrire gratuitement
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
