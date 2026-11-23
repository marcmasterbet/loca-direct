'use client'

import { useState, Suspense, type FormEvent } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import AuthShell from '@/components/forms/AuthShell'
import { BoutonPrincipal, Champ, ErreurFormulaire, emailValide } from '@/components/forms/Champ'

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
  const redirectParam = searchParams.get('redirect')
  const redirect = redirectParam && /^\/(?![\/\\])/.test(redirectParam) ? redirectParam : null

  const [email, setEmail] = useState('')
  const [motDePasse, setMotDePasse] = useState('')
  const [erreurEmail, setErreurEmail] = useState('')
  const [erreur, setErreur] = useState('')
  const [chargement, setChargement] = useState(false)

  const envoyer = async (e: FormEvent) => {
    e.preventDefault()
    if (!emailValide(email)) {
      setErreurEmail('Saisissez une adresse e-mail valide, par exemple nom@exemple.fr.')
      return
    }
    if (!motDePasse) {
      setErreur('Saisissez votre mot de passe.')
      return
    }
    setChargement(true)
    setErreur('')
    try {
      const res = await fetch('/api/connexion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, motDePasse }),
      })
      const data = await res.json()
      if (!res.ok) {
        setErreur(data.error || 'La connexion n’a pas abouti. Réessayez dans un instant.')
        setChargement(false)
        return
      }
      // Après connexion : la page demandée, sinon l'espace personnel
      router.push(redirect || '/espace')
    } catch {
      setErreur('La connexion n’a pas abouti. Vérifiez votre réseau et réessayez.')
      setChargement(false)
    }
  }

  return (
    <AuthShell
      titre="Se connecter"
      intro="Accédez à votre espace pour gérer vos annonces ou votre fiche prestataire."
      pied={
        <>
          Pas encore de compte ?{' '}
          <Link href={`/inscription${redirect ? `?redirect=${encodeURIComponent(redirect)}` : ''}`} className="font-bold text-brand">
            Créer un compte
          </Link>
        </>
      }
    >
      <form onSubmit={envoyer} noValidate className="flex flex-col gap-5">
        <ErreurFormulaire>{erreur}</ErreurFormulaire>
        <Champ
          label="Adresse e-mail"
          type="email"
          name="email"
          autoComplete="email"
          inputMode="email"
          spellCheck={false}
          value={email}
          onChange={v => {
            setEmail(v)
            setErreurEmail('')
          }}
          onBlur={() => email && !emailValide(email) && setErreurEmail('Saisissez une adresse e-mail valide, par exemple nom@exemple.fr.')}
          erreur={erreurEmail}
          placeholder="nom@exemple.fr"
        />
        <div className="flex flex-col gap-1">
          <Champ
            label="Mot de passe"
            type="password"
            name="password"
            autoComplete="current-password"
            value={motDePasse}
            onChange={v => {
              setMotDePasse(v)
              setErreur('')
            }}
          />
          <Link href="/mot-de-passe-oublie" className="flex min-h-[44px] items-center self-end text-sm font-semibold text-brand">
            Mot de passe oublié ?
          </Link>
        </div>
        <BoutonPrincipal chargement={chargement} libelleChargement="Connexion…">
          Se connecter
        </BoutonPrincipal>
      </form>
    </AuthShell>
  )
}
