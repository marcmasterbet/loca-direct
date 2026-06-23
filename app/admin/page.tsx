'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

const ORANGE = '#EA580C'
const ORANGE_LIGHT = '#FFF7ED'
const WHITE = '#FFFFFF'
const TEXT = '#1F2937'
const TEXT_DIM = '#6B7280'
const BORDER = '#E5E7EB'

export default function AdminLoginPage() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/admin-connexion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })
      if (!res.ok) {
        setError('Mot de passe incorrect')
        setLoading(false)
        return
      }
      router.push('/admin/dashboard')
    } catch (e) {
      setError('Une erreur est survenue')
      setLoading(false)
    }
  }

  return (
    <div style={{ background: ORANGE_LIGHT, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20, fontFamily: '-apple-system, sans-serif' }}>
      <style>{`* { box-sizing: border-box; } button { cursor: pointer; border: none; font-family: inherit; } input { font-family: inherit; }`}</style>
      <div style={{ background: WHITE, borderRadius: 20, padding: 32, maxWidth: 380, width: '100%', boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
        <h1 style={{ fontSize: 20, fontWeight: 800, color: TEXT, marginBottom: 6, textAlign: 'center' }}>🔐 Admin LocaDirect</h1>
        <p style={{ fontSize: 13, color: TEXT_DIM, textAlign: 'center', marginBottom: 24 }}>Accès réservé</p>

        {error && (
          <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: 10, padding: 12, marginBottom: 16 }}>
            <p style={{ fontSize: 13, color: '#DC2626' }}>{error}</p>
          </div>
        )}

        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Mot de passe"
          onKeyDown={e => { if (e.key === 'Enter') handleSubmit() }}
          style={{ width: '100%', padding: '12px 14px', borderRadius: 10, border: `1px solid ${BORDER}`, fontSize: 15, outline: 'none', marginBottom: 16 }}
        />

        <button onClick={handleSubmit} disabled={loading} style={{ width: '100%', background: ORANGE, color: WHITE, borderRadius: 12, padding: 14, fontSize: 15, fontWeight: 700, opacity: loading ? 0.7 : 1 }}>
          {loading ? 'Connexion...' : 'Se connecter'}
        </button>
      </div>
    </div>
  )
}
