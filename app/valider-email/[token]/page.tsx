'use client'

import { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'next/navigation'
import Link from 'next/link'

const ORANGE = '#EA580C'
const ORANGE_LIGHT = '#FFF7ED'
const WHITE = '#FFFFFF'
const TEXT = '#1F2937'
const TEXT_DIM = '#6B7280'

export default function ValiderEmailPage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const redirect = searchParams.get('redirect')
  const token = params.token as string

  const [status, setStatus] = useState<'loading' | 'success' | 'already_active' | 'invalid' | 'error'>('loading')

  useEffect(() => {
    fetch('/api/valider-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token }),
    })
      .then(res => res.json())
      .then(data => setStatus(data.status))
      .catch(() => setStatus('error'))
  }, [token])

  if (status === 'loading') {
    return <Page icon="⏳" title="Vérification..." text="Un instant, nous confirmons votre email." />
  }

  if (status === 'invalid') {
    return <Page icon="❌" title="Lien invalide" text="Ce lien de validation n'existe pas." />
  }

  if (status === 'error') {
    return <Page icon="❌" title="Une erreur est survenue" text="Veuillez réessayer dans quelques instants." />
  }

  if (status === 'already_active') {
    return (
      <Page
        icon="✅"
        title="Compte déjà activé"
        text="Votre adresse email a déjà été confirmée. Vous pouvez vous connecter."
        buttonHref="/connexion"
        buttonLabel="Se connecter"
      />
    )
  }

  return (
    <Page
      icon="✅"
      title="Email confirmé !"
      text="Votre compte est maintenant actif. Bienvenue sur LocaDirect !"
      buttonHref={redirect || '/espace'}
      buttonLabel="Accéder à mon espace"
    />
  )
}

function Page({ icon, title, text, buttonHref, buttonLabel }: {
  icon: string, title: string, text: string, buttonHref?: string, buttonLabel?: string
}) {
  return (
    <div style={{ background: ORANGE_LIGHT, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20, fontFamily: '-apple-system, sans-serif' }}>
      <div style={{ background: WHITE, borderRadius: 20, padding: 36, maxWidth: 440, textAlign: 'center', boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>{icon}</div>
        <h1 style={{ fontSize: 20, fontWeight: 800, color: TEXT, marginBottom: 12 }}>{title}</h1>
        <p style={{ fontSize: 14, color: TEXT_DIM, lineHeight: 1.7, marginBottom: buttonHref ? 24 : 0 }}>{text}</p>
        {buttonHref && (
          <Link href={buttonHref} style={{ display: 'inline-block', background: ORANGE, color: WHITE, borderRadius: 12, padding: '14px 28px', fontSize: 15, fontWeight: 700, textDecoration: 'none' }}>
            {buttonLabel}
          </Link>
        )}
      </div>
    </div>
  )
}