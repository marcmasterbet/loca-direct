'use client'

import { useState, type FormEvent } from 'react'
import Link from 'next/link'
import AuthShell, { AuthMessage } from '@/components/forms/AuthShell'
import { BoutonPrincipal, Champ, ErreurFormulaire, emailValide } from '@/components/forms/Champ'

export default function MotDePasseOubliePage() {
  const [email, setEmail] = useState('')
  const [erreurEmail, setErreurEmail] = useState('')
  const [erreur, setErreur] = useState('')
  const [chargement, setChargement] = useState(false)
  const [envoye, setEnvoye] = useState(false)

  const envoyer = async (e: FormEvent) => {
    e.preventDefault()
    if (!emailValide(email)) {
      setErreurEmail('Saisissez une adresse e-mail valide, par exemple nom@exemple.fr.')
      return
    }
    setChargement(true)
    setErreur('')
    try {
      await fetch('/api/mot-de-passe-oublie', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      setEnvoye(true)
    } catch {
      setErreur('L’envoi n’a pas abouti. Vérifiez votre réseau et réessayez.')
    }
    setChargement(false)
  }

  if (envoye) {
    return (
      <AuthMessage titre="Regardez votre boîte mail">
        <p>
          Si un compte existe avec l’adresse <strong className="text-ink">{email}</strong>, vous allez recevoir un lien
          pour choisir un nouveau mot de passe.
        </p>
        <Link href="/connexion" className="flex min-h-[44px] items-center font-bold text-brand">
          Retour à la connexion
        </Link>
      </AuthMessage>
    )
  }

  return (
    <AuthShell
      titre="Mot de passe oublié"
      intro="Saisissez l’adresse e-mail de votre compte : nous vous envoyons un lien pour choisir un nouveau mot de passe."
      pied={
        <Link href="/connexion" className="font-bold text-brand">
          Retour à la connexion
        </Link>
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
          erreur={erreurEmail}
          placeholder="nom@exemple.fr"
        />
        <BoutonPrincipal chargement={chargement} libelleChargement="Envoi du lien…">
          Recevoir le lien
        </BoutonPrincipal>
      </form>
    </AuthShell>
  )
}
