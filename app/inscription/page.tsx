'use client'

import { useState, Suspense, type FormEvent } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import AuthShell, { AuthMessage } from '@/components/forms/AuthShell'
import { BoutonPrincipal, Champ, ErreurFormulaire, emailValide, erreurMotDePasse } from '@/components/forms/Champ'

export default function InscriptionPage() {
  return (
    <Suspense fallback={<div />}>
      <InscriptionForm />
    </Suspense>
  )
}

const PROFILS = [
  {
    cle: 'estHebergeur',
    titre: 'Publier un logement',
    texte: 'Je loue une maison, un appartement ou un gîte, sans commission.',
  },
  {
    cle: 'estPrestataire',
    titre: 'Rejoindre l’annuaire des prestataires',
    texte: 'Je propose un service : conciergerie, ménage, photo, entretien…',
  },
] as const

type Profil = (typeof PROFILS)[number]['cle']

function InscriptionForm() {
  const searchParams = useSearchParams()
  const redirectParam = searchParams.get('redirect')
  const redirect = redirectParam && /^\/(?![\/\\])/.test(redirectParam) ? redirectParam : null
  // Le profil peut être choisi d'avance par le lien : /inscription?profil=prestataire
  const profilInitial = searchParams.get('profil') === 'prestataire' ? 'estPrestataire' : 'estHebergeur'

  const [email, setEmail] = useState('')
  const [motDePasse, setMotDePasse] = useState('')
  const [profils, setProfils] = useState<Record<Profil, boolean>>({
    estHebergeur: profilInitial === 'estHebergeur',
    estPrestataire: profilInitial === 'estPrestataire',
  })
  const [erreurs, setErreurs] = useState<{ email?: string; motDePasse?: string; profil?: string; general?: string }>({})
  const [chargement, setChargement] = useState(false)
  const [envoye, setEnvoye] = useState(false)

  const envoyer = async (e: FormEvent) => {
    e.preventDefault()
    const errs: typeof erreurs = {}
    if (!emailValide(email)) errs.email = 'Saisissez une adresse e-mail valide, par exemple nom@exemple.fr.'
    const mdp = erreurMotDePasse(motDePasse)
    if (mdp) errs.motDePasse = mdp
    if (!profils.estHebergeur && !profils.estPrestataire) errs.profil = 'Choisissez au moins une option.'
    if (Object.keys(errs).length) {
      setErreurs(errs)
      return
    }
    setChargement(true)
    setErreurs({})
    try {
      const res = await fetch('/api/inscription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // Les voyageurs n'ont plus besoin de compte : estVoyageur reste à false
        body: JSON.stringify({ email, motDePasse, estVoyageur: false, ...profils, redirect }),
      })
      const data = await res.json()
      if (!res.ok) {
        setErreurs({ general: data.error || 'L’inscription n’a pas abouti. Réessayez dans un instant.' })
        setChargement(false)
        return
      }
      setEnvoye(true)
    } catch {
      setErreurs({ general: 'L’inscription n’a pas abouti. Vérifiez votre réseau et réessayez.' })
      setChargement(false)
    }
  }

  if (envoye) {
    return (
      <AuthMessage titre="Confirmez votre adresse e-mail">
        <p>
          Nous avons envoyé un lien à <strong className="text-ink">{email}</strong>. Cliquez dessus pour activer votre
          compte, puis connectez-vous.
        </p>
        <p className="text-sm text-muted">
          Rien reçu après quelques minutes ? Regardez dans les courriers indésirables, ou écrivez-nous à
          contact@seokraft.fr.
        </p>
      </AuthMessage>
    )
  }

  return (
    <AuthShell
      titre="Créer un compte"
      intro="Le compte sert à publier une annonce ou une fiche prestataire. Pour louer un logement, vous n’en avez pas besoin."
      pied={
        <>
          Déjà un compte ?{' '}
          <Link href={`/connexion${redirect ? `?redirect=${encodeURIComponent(redirect)}` : ''}`} className="font-bold text-brand">
            Se connecter
          </Link>
        </>
      }
    >
      <form onSubmit={envoyer} noValidate className="flex flex-col gap-5">
        <ErreurFormulaire>{erreurs.general}</ErreurFormulaire>

        <fieldset className="flex flex-col gap-2" aria-describedby={erreurs.profil ? 'erreur-profil' : undefined}>
          <legend className="mb-1.5 text-sm font-semibold text-ink">Vous souhaitez…</legend>
          {PROFILS.map(p => (
            <label
              key={p.cle}
              className={`flex min-h-[56px] cursor-pointer items-start gap-3 rounded-[16px] p-4 ${
                profils[p.cle]
                  ? 'bg-brand-soft shadow-[inset_0_0_0_1.5px_#5534e8]'
                  : 'bg-white shadow-[inset_0_0_0_1.5px_#e4e3ee] hover:bg-surface'
              }`}
            >
              <input
                type="checkbox"
                checked={profils[p.cle]}
                onChange={() => {
                  setProfils(x => ({ ...x, [p.cle]: !x[p.cle] }))
                  setErreurs(x => ({ ...x, profil: undefined }))
                }}
                className="mt-0.5 h-5 w-5 shrink-0 accent-[#5534e8]"
              />
              <span className="flex flex-col gap-0.5">
                <strong className="text-base font-bold">{p.titre}</strong>
                <span className="text-sm text-ink-soft">{p.texte}</span>
              </span>
            </label>
          ))}
          {erreurs.profil && (
            <p id="erreur-profil" className="text-sm font-semibold text-[#b42318]">
              {erreurs.profil}
            </p>
          )}
        </fieldset>

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
            setErreurs(x => ({ ...x, email: undefined }))
          }}
          onBlur={() => email && !emailValide(email) && setErreurs(x => ({ ...x, email: 'Saisissez une adresse e-mail valide, par exemple nom@exemple.fr.' }))}
          erreur={erreurs.email}
          placeholder="nom@exemple.fr"
        />
        <Champ
          label="Mot de passe"
          type="password"
          name="new-password"
          autoComplete="new-password"
          value={motDePasse}
          onChange={v => {
            setMotDePasse(v)
            setErreurs(x => ({ ...x, motDePasse: undefined }))
          }}
          onBlur={() => motDePasse && setErreurs(x => ({ ...x, motDePasse: erreurMotDePasse(motDePasse) ?? undefined }))}
          erreur={erreurs.motDePasse}
          aide="8 caractères minimum, avec une majuscule, un chiffre et un caractère spécial."
        />

        <BoutonPrincipal chargement={chargement} libelleChargement="Création du compte…">
          Créer mon compte gratuit
        </BoutonPrincipal>
        <p className="text-sm leading-relaxed text-muted">
          En créant un compte, vous acceptez les{' '}
          <Link href="/cgu" className="font-semibold text-ink">
            conditions d’utilisation
          </Link>{' '}
          et la{' '}
          <Link href="/politique-confidentialite" className="font-semibold text-ink">
            politique de confidentialité
          </Link>
          .
        </p>
      </form>
    </AuthShell>
  )
}
