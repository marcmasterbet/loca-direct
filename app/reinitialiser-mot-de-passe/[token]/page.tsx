'use client'

import { useState, type FormEvent } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import AuthShell, { AuthMessage } from '@/components/forms/AuthShell'
import { BoutonPrincipal, Champ, ErreurFormulaire, erreurMotDePasse } from '@/components/forms/Champ'

export default function ReinitialiserMotDePassePage() {
  const router = useRouter()
  const params = useParams()
  const token = params.token as string

  const [motDePasse, setMotDePasse] = useState('')
  const [erreurMdp, setErreurMdp] = useState('')
  const [erreur, setErreur] = useState('')
  const [chargement, setChargement] = useState(false)
  const [fait, setFait] = useState(false)

  const envoyer = async (e: FormEvent) => {
    e.preventDefault()
    const mdp = erreurMotDePasse(motDePasse)
    if (mdp) {
      setErreurMdp(mdp)
      return
    }
    setChargement(true)
    setErreur('')
    try {
      const res = await fetch('/api/reinitialiser-mot-de-passe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, motDePasse }),
      })
      const data = await res.json()
      if (!res.ok) {
        setErreur(data.error || 'Le changement n’a pas abouti. Le lien a peut-être expiré : demandez-en un nouveau.')
        setChargement(false)
        return
      }
      setFait(true)
      setTimeout(() => router.push('/connexion'), 2500)
    } catch {
      setErreur('Le changement n’a pas abouti. Vérifiez votre réseau et réessayez.')
      setChargement(false)
    }
  }

  if (fait) {
    return (
      <AuthMessage titre="Mot de passe changé">
        <p>Votre nouveau mot de passe est enregistré. Vous allez être redirigé vers la connexion…</p>
        <Link href="/connexion" className="flex min-h-[44px] items-center font-bold text-brand">
          Se connecter maintenant
        </Link>
      </AuthMessage>
    )
  }

  return (
    <AuthShell
      titre="Choisir un nouveau mot de passe"
      pied={
        <Link href="/mot-de-passe-oublie" className="font-bold text-brand">
          Demander un nouveau lien
        </Link>
      }
    >
      <form onSubmit={envoyer} noValidate className="flex flex-col gap-5">
        <ErreurFormulaire>{erreur}</ErreurFormulaire>
        <Champ
          label="Nouveau mot de passe"
          type="password"
          name="new-password"
          autoComplete="new-password"
          value={motDePasse}
          onChange={v => {
            setMotDePasse(v)
            setErreurMdp('')
          }}
          onBlur={() => motDePasse && setErreurMdp(erreurMotDePasse(motDePasse) ?? '')}
          erreur={erreurMdp}
          aide="8 caractères minimum, avec une majuscule, un chiffre et un caractère spécial."
        />
        <BoutonPrincipal chargement={chargement} libelleChargement="Enregistrement…">
          Enregistrer le mot de passe
        </BoutonPrincipal>
      </form>
    </AuthShell>
  )
}
