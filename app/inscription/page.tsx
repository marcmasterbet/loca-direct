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

export default function InscriptionPage() {
  return (
    <Suspense fallback={<div />}>
      <InscriptionForm />
    </Suspense>
  )
}

function InscriptionForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirect = searchParams.get('redirect')

  const [form, setForm] = useState({
    email: '',
    motDePasse: '',
    estVoyageur: false,
    estHebergeur: false,
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const set = (key: string, value: any) => {
    setForm(f => ({ ...f, [key]: value }))
    setErrors(e => { const ne = { ...e }; delete ne[key]; return ne })
  }

  const validate = () => {
    const errs: Record<string, string> = {}
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Email valide requis'
    if (!form.motDePasse || form.motDePasse.length < 8) {
      errs.motDePasse = '8 caractères minimum'
    } else if (!/[A-Z]/.test(form.motDePasse)) {
      errs.motDePasse = 'Une majuscule requise'
    } else if (!/[0-9]/.test(form.motDePasse)) {
      errs.motDePasse = 'Un chiffre requis'
    } else if (!/[!@#$%^&*(),.?":{}|<>_\-]/.test(form.motDePasse)) {
      errs.motDePasse = 'Un caractère spécial requis (!@#$%...)'
    }
    if (!form.estVoyageur && !form.estHebergeur) errs.profil = 'Sélectionnez au moins un profil'
    return errs
  }

  const handleSubmit = async () => {
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }

    setLoading(true)
    try {
      const res = await fetch('/api/inscription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, redirect }),
      })
      const data = await res.json()

      if (!res.ok) {
        setErrors({ general: data.error || 'Une erreur est survenue' })
        setLoading(false)
        return
      }

      setSuccess(true)
    } catch (e) {
      setErrors({ general: 'Une erreur est survenue' })
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div style={{ background: ORANGE_LIGHT, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20, fontFamily: '-apple-system, sans-serif' }}>
        <div style={{ background: WHITE, borderRadius: 20, padding: 36, maxWidth: 440, textAlign: 'center', boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>📧</div>
          <h1 style={{ fontSize: 20, fontWeight: 800, color: TEXT, marginBottom: 12 }}>Vérifiez votre boîte mail !</h1>
          <p style={{ fontSize: 14, color: TEXT_DIM, lineHeight: 1.7 }}>
            Nous avons envoyé un lien de confirmation à <strong>{form.email}</strong>.
            Cliquez sur ce lien pour activer votre compte.
          </p>
        </div>
      </div>
    )
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
              <p style={{ fontSize: 13, color: ORANGE, fontWeight: 700 }}>C'est 100% gratuit !</p>
            </div>
          )}

          <div style={{ background: WHITE, borderRadius: 20, padding: 28, boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
            <h1 style={{ fontSize: 22, fontWeight: 800, color: TEXT, marginBottom: 6, textAlign: 'center' }}>
              Créer mon compte gratuit
            </h1>
            <p style={{ fontSize: 13, color: TEXT_DIM, textAlign: 'center', marginBottom: 24 }}>
              Aucune carte bancaire requise
            </p>

            {errors.general && (
              <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: 10, padding: 12, marginBottom: 16 }}>
                <p style={{ fontSize: 13, color: '#DC2626' }}>{errors.general}</p>
              </div>
            )}

            <Field label="Email" type="email" value={form.email} onChange={v => set('email', v)} error={errors.email} placeholder="vous@email.com" />

            <div style={{ marginBottom: 14 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: TEXT, marginBottom: 6, display: 'block' }}>Mot de passe</label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={form.motDePasse}
                  onChange={e => set('motDePasse', e.target.value)}
                  placeholder="8 car. min, 1 majuscule, 1 chiffre, 1 spécial"
                  style={{ width: '100%', padding: '12px 44px 12px 14px', borderRadius: 10, border: `1px solid ${errors.motDePasse ? '#FCA5A5' : BORDER}`, fontSize: 15, outline: 'none', color: TEXT }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(s => !s)}
                  style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', background: 'transparent', padding: 6, fontSize: 18, color: TEXT_DIM }}
                  aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
                >
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>
              {errors.motDePasse && <p style={{ fontSize: 12, color: '#DC2626', marginTop: 4 }}>{errors.motDePasse}</p>}
              {!errors.motDePasse && (
                <p style={{ fontSize: 11, color: TEXT_DIM, marginTop: 4 }}>
                  Minimum 8 caractères, 1 majuscule, 1 chiffre, 1 caractère spécial
                </p>
              )}
            </div>

            <p style={{ fontSize: 13, fontWeight: 600, color: TEXT, marginTop: 16, marginBottom: 10 }}>Vous êtes :</p>
            {errors.profil && <p style={{ fontSize: 12, color: '#DC2626', marginBottom: 8 }}>{errors.profil}</p>}

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20 }}>
              <ProfilOption icon="✈️" label="Voyageur" desc="Je cherche un logement" checked={form.estVoyageur} onClick={() => set('estVoyageur', !form.estVoyageur)} />
              <ProfilOption icon="🏠" label="Hébergeur" desc="Je veux publier mon logement" checked={form.estHebergeur} onClick={() => set('estHebergeur', !form.estHebergeur)} />
            </div>

            <button onClick={handleSubmit} disabled={loading} style={{ width: '100%', background: ORANGE, color: WHITE, borderRadius: 12, padding: 15, fontSize: 15, fontWeight: 700, opacity: loading ? 0.7 : 1 }}>
              {loading ? 'Création en cours...' : 'Créer mon compte gratuit'}
            </button>

            <p style={{ fontSize: 12, color: TEXT_DIM, textAlign: 'center', marginTop: 16, lineHeight: 1.6 }}>
              En vous inscrivant, vous acceptez nos{' '}
              <Link href="/cgv" style={{ color: ORANGE }}>CGV</Link> et notre{' '}
              <Link href="/politique-confidentialite" style={{ color: ORANGE }}>politique de confidentialité</Link>.
            </p>
          </div>

          <p style={{ textAlign: 'center', fontSize: 14, color: TEXT_DIM, marginTop: 20 }}>
            Déjà inscrit ?{' '}
            <Link href={`/connexion${redirect ? `?redirect=${redirect}` : ''}`} style={{ color: ORANGE, fontWeight: 700 }}>
              Se connecter
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

function Field({ label, type = 'text', value, onChange, error, placeholder }: {
  label: string, type?: string, value: string, onChange: (v: string) => void, error?: string, placeholder?: string
}) {
  return (
    <div style={{ marginBottom: 14 }}>
      <label style={{ fontSize: 12, fontWeight: 600, color: TEXT, marginBottom: 6, display: 'block' }}>{label}</label>
      <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
        style={{ width: '100%', padding: '12px 14px', borderRadius: 10, border: `1px solid ${error ? '#FCA5A5' : BORDER}`, fontSize: 15, outline: 'none', color: TEXT }} />
      {error && <p style={{ fontSize: 12, color: '#DC2626', marginTop: 4 }}>{error}</p>}
    </div>
  )
}

function ProfilOption({ icon, label, desc, checked, onClick }: {
  icon: string, label: string, desc: string, checked: boolean, onClick: () => void
}) {
  return (
    <button onClick={onClick} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', borderRadius: 12, border: `2px solid ${checked ? ORANGE : BORDER}`, background: checked ? ORANGE_LIGHT : WHITE, textAlign: 'left', width: '100%' }}>
      <span style={{ fontSize: 24 }}>{icon}</span>
      <div style={{ flex: 1 }}>
        <p style={{ fontSize: 14, fontWeight: 700, color: TEXT }}>{label}</p>
        <p style={{ fontSize: 12, color: TEXT_DIM }}>{desc}</p>
      </div>
      <div style={{ width: 22, height: 22, borderRadius: 6, border: `2px solid ${checked ? ORANGE : BORDER}`, background: checked ? ORANGE : WHITE, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {checked && <span style={{ color: WHITE, fontSize: 13 }}>✓</span>}
      </div>
    </button>
  )
}