'use client'

import { useEffect, useState, type ReactNode } from 'react'
import { useParams, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { AuthMessage } from '@/components/forms/AuthShell'

type Etat = 'loading' | 'success' | 'already_active' | 'invalid' | 'error'

export default function ValiderEmailPage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const redirectParam = searchParams.get('redirect')
  const redirect = redirectParam && /^\/(?![\/\\])/.test(redirectParam) ? redirectParam : null
  const token = params.token as string

  const [etat, setEtat] = useState<Etat>('loading')

  useEffect(() => {
    fetch('/api/valider-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token }),
    })
      .then(res => res.json())
      .then(data => setEtat(data.status))
      .catch(() => setEtat('error'))
  }, [token])

  const bouton = (href: string, texte: string): ReactNode => (
    <Link
      href={href}
      className="flex min-h-[52px] w-full items-center justify-center rounded-[14px] bg-brand px-5 text-base font-bold text-white no-underline hover:bg-brand-strong"
    >
      {texte}
    </Link>
  )

  if (etat === 'loading')
    return (
      <AuthMessage titre="Confirmation en cours…">
        <p aria-live="polite">Un instant, nous confirmons votre adresse e-mail.</p>
      </AuthMessage>
    )
  if (etat === 'invalid')
    return (
      <AuthMessage titre="Ce lien ne fonctionne pas">
        <p>Le lien de confirmation est incomplet ou a déjà servi. Essayez de vous connecter : si votre compte est actif, tout est en ordre.</p>
        {bouton('/connexion', 'Se connecter')}
      </AuthMessage>
    )
  if (etat === 'error')
    return (
      <AuthMessage titre="La confirmation n’a pas abouti">
        <p>Rechargez la page dans quelques instants. Si le problème continue, écrivez-nous à contact@seokraft.fr.</p>
      </AuthMessage>
    )
  if (etat === 'already_active')
    return (
      <AuthMessage titre="Votre compte est déjà actif">
        <p>Votre adresse e-mail a déjà été confirmée. Vous pouvez vous connecter.</p>
        {bouton('/connexion', 'Se connecter')}
      </AuthMessage>
    )
  return (
    <AuthMessage titre="Adresse e-mail confirmée">
      <p>Votre compte est actif. Bienvenue sur LocaDirect !</p>
      {bouton(redirect || '/espace', 'Accéder à mon espace')}
    </AuthMessage>
  )
}
