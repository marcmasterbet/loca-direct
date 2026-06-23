'use client'

import { useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'

const ORANGE = '#EA580C'
const ORANGE_LIGHT = '#FFF7ED'
const WHITE = '#FFFFFF'
const TEXT = '#1F2937'
const TEXT_DIM = '#6B7280'
const BORDER = '#E5E7EB'

export default function ReinitialiserMotDePassePage() {
  const router = useRouter()
  const params = useParams()
  const token = params.token as string

  const [motDePasse, setMotDePasse] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async () => {
    if (motDePasse.length < 8 || !/[A-Z]/.test(motDePasse) || !/[0-9]/.test(motDePasse) || !/[!@#$%^&*(),.?":{}|<>_\-]/.test(motDePasse)) {
      setError('8 caractères min, 1 majuscule, 1 chiffre, 1 caractère spécial')
      return
    }
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/reinitialiser-mot-de-passe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, motDePasse }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || 'Une erreur est survenue')
        setLoading(false)
        return
      }
      setSuccess(true)
      setTimeout(() => router.push('/connexion'), 2500)
    } catch (e) {
      setError('Une erreur est survenue')
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div style={{ background: ORANGE_LIGHT, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20, fontFamily: '-apple-system, sans-serif' }}>
        <div style={{ background: WHITE, borderRadius: 20, padding: 36, maxWidth: 440, textAlign: 'center', boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>✅</div>
          <h1 style={{ fontSize: 20, fontWeight: 800, color: TEXT, marginBottom: 12 }}>Mot de passe modifié !</h1>
          <p style={{ fontSize: 14, color: TEXT_DIM, lineHeight: 1.7 }}>
            Vous allez être redirigé vers la page de connexion...
          </p>
        </div>
      </div>
    )
  }

  return (
    <div style={{ background: ORANGE_LIGHT, minHeight: '100vh', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif', display: 'flex', flexDirection: 'column' }}>
      <style>{`* { box-sizing: border-box; margin: 0; padding: 0; } a { text-decoration: none; } input { font-family: inherit; } button { font-family: inherit; cursor: pointer; border: none; }`}</style>

      <div style={{ padding: '20px 20px 0' }}>
        <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 34, height: 34, background: ORANGE, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>🏠</div>
          <span style={{ fontSize: 18, fontWeight: 800, color: TEXT }}>Loca<span style={{ color: ORANGE }}>Direct</span></span>
        </Link>
      </div>

      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px 16px' }}>
        <div style={{ width: '100%', maxWidth: 440 }}>
          <div style={{ background: WHITE, borderRadius: 20, padding: 28, boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
            <h1 style={{ fontSize: 22, fontWeight: 800, color: TEXT, marginBottom: 6, textAlign: 'center' }}>
              Choisissez un nouveau mot de passe
            </h1>
            <p style={{ fontSize: 13, color: TEXT_DIM, textAlign: 'center', marginBottom: 24 }}>
              Ce lien est valable une heure
            </p>

            {error && (
              <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: 10, padding: 12, marginBottom: 16 }}>
                <p style={{ fontSize: 13, color: '#DC2626' }}>{error}</p>
              </div>
            )}

            <label style={{ fontSize: 12, fontWeight: 600, color: TEXT, marginBottom: 6, display: 'block' }}>Nouveau mot de passe</label>
            <div style={{ position: 'relative', marginBottom: 8 }}>
              <input
                type={showPassword ? 'text' : 'password'}
                value={motDePasse}
                onChange={e => setMotDePasse(e.target.value)}
                placeholder="8 car. min, 1 majuscule, 1 chiffre, 1 spécial"
                onKeyDown={e => { if (e.key === 'Enter') handleSubmit() }}
                style={{ width: '100%', padding: '12px 44px 12px 14px', borderRadius: 10, border: `1px solid ${BORDER}`, fontSize: 15, outline: 'none', color: TEXT }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(s => !s)}
                style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', background: 'transparent', padding: 6, fontSize: 18, color: TEXT_DIM }}
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
            <p style={{ fontSize: 11, color: TEXT_DIM, marginBottom: 20 }}>
              Minimum 8 caractères, 1 majuscule, 1 chiffre, 1 caractère spécial
            </p>

            <button onClick={handleSubmit} disabled={loading} style={{ width: '100%', background: ORANGE, color: WHITE, borderRadius: 12, padding: 15, fontSize: 15, fontWeight: 700, opacity: loading ? 0.7 : 1 }}>
              {loading ? 'Enregistrement...' : 'Réinitialiser mon mot de passe'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
