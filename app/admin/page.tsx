'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import AuthShell from '@/components/forms/AuthShell'
import { BoutonPrincipal, Champ, ErreurFormulaire } from '@/components/forms/Champ'

export default function AdminConnexionPage() {
  const router = useRouter()
  const [motDePasse, setMotDePasse] = useState('')
  const [erreur, setErreur] = useState('')
  const [chargement, setChargement] = useState(false)

  const envoyer = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!motDePasse) return setErreur('Saisissez le mot de passe administrateur.')
    setChargement(true)
    setErreur('')
    try {
      const res = await fetch('/api/admin-connexion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: motDePasse }),
      })
      if (!res.ok) {
        setErreur('Mot de passe incorrect.')
        setChargement(false)
        return
      }
      router.push('/admin/dashboard')
    } catch {
      setErreur('Connexion impossible. Vérifiez votre réseau et réessayez.')
      setChargement(false)
    }
  }

  return (
    <AuthShell titre="Administration" intro="Accès réservé à l’éditeur du site.">
      <form onSubmit={envoyer} noValidate className="flex flex-col gap-5">
        <ErreurFormulaire>{erreur}</ErreurFormulaire>
        <Champ label="Mot de passe" type="password" autoComplete="current-password" value={motDePasse} onChange={setMotDePasse} />
        <BoutonPrincipal chargement={chargement} libelleChargement="Connexion…">
          Se connecter
        </BoutonPrincipal>
      </form>
    </AuthShell>
  )
}
