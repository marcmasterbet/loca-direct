'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Champ, ErreurFormulaire } from '@/components/forms/Champ'
import { METIERS } from '@/lib/prestataires'
import { Bloc, Case, Choix, Grille, TeleversementPhotos, Zone } from './briques'

export type DonneesPrestataire = {
  nom: string
  prenom: string
  siret: string
  adresse_siege: string
  ville: string
  code_postal: string
  activite: string
  description: string
  telephone: string
  whatsapp: string
  site_web: string
  tarif_horaire: string
  sur_devis: boolean
  flyer_url: string
  photos: string[]
}

export const PRESTATAIRE_VIDE: DonneesPrestataire = {
  nom: '',
  prenom: '',
  siret: '',
  adresse_siege: '',
  ville: '',
  code_postal: '',
  activite: 'Conciergerie',
  description: '',
  telephone: '',
  whatsapp: '',
  site_web: '',
  tarif_horaire: '',
  sur_devis: false,
  flyer_url: '',
  photos: [],
}

type Erreurs = Partial<Record<keyof DonneesPrestataire, string>>

const REQUIS: [keyof DonneesPrestataire, string][] = [
  ['prenom', 'Indiquez votre prénom.'],
  ['nom', 'Indiquez votre nom ou celui de votre entreprise.'],
  ['siret', 'Indiquez votre numéro SIRET.'],
  ['adresse_siege', 'Indiquez l’adresse de votre siège.'],
  ['ville', 'Indiquez la ville où vous travaillez.'],
  ['code_postal', 'Indiquez le code postal.'],
  ['telephone', 'Indiquez votre numéro de téléphone.'],
  ['whatsapp', 'Indiquez votre numéro WhatsApp.'],
]

function verifier(d: DonneesPrestataire): Erreurs {
  const e: Erreurs = {}
  for (const [c, m] of REQUIS) if (!String(d[c]).trim()) e[c] = m
  if (!d.sur_devis && !String(d.tarif_horaire).trim()) e.tarif_horaire = 'Indiquez un tarif horaire ou cochez « Sur devis ».'
  return e
}

export default function FormulairePrestataire({ initial, id }: { initial?: DonneesPrestataire; id?: string }) {
  const router = useRouter()
  const creation = !id
  const [d, setD] = useState<DonneesPrestataire>(initial ?? PRESTATAIRE_VIDE)
  const [erreurs, setErreurs] = useState<Erreurs>({})
  const [erreurGenerale, setErreurGenerale] = useState('')
  const [envoi, setEnvoi] = useState(false)
  const [enregistre, setEnregistre] = useState(false)

  const maj = <K extends keyof DonneesPrestataire>(cle: K, valeur: DonneesPrestataire[K]) => {
    setD(prev => ({ ...prev, [cle]: valeur }))
    setEnregistre(false)
    if (erreurs[cle]) setErreurs(prev => ({ ...prev, [cle]: undefined }))
  }

  const envoyer = async (ev: React.FormEvent) => {
    ev.preventDefault()
    const e = verifier(d)
    setErreurs(e)
    if (Object.keys(e).length) {
      setErreurGenerale('Certaines informations manquent : elles sont signalées en rouge.')
      requestAnimationFrame(() => {
        const el = document.querySelector<HTMLElement>('[aria-invalid="true"]')
        el?.focus()
        el?.scrollIntoView({ block: 'center', behavior: 'smooth' })
      })
      return
    }
    setEnvoi(true)
    setErreurGenerale('')
    try {
      const res = await fetch(creation ? '/api/save-prestataire' : '/api/update-prestataire', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(creation ? d : { id, ...d }),
      })
      const r = await res.json().catch(() => ({}))
      if (!res.ok) {
        setErreurGenerale(`${r.error || 'L’envoi n’a pas abouti'}. Vos informations sont conservées, réessayez.`)
        setEnvoi(false)
        return
      }
      if (creation) {
        router.push('/espace')
        router.refresh()
      } else {
        setEnregistre(true)
        setEnvoi(false)
        router.refresh()
      }
    } catch {
      setErreurGenerale('Connexion perdue. Vos informations sont conservées, réessayez.')
      setEnvoi(false)
    }
  }

  return (
    <form onSubmit={envoyer} noValidate className="flex flex-col gap-6">
      <ErreurFormulaire>{erreurGenerale}</ErreurFormulaire>

      <Bloc titre="Votre activité" intro="Ce que les propriétaires voient en premier dans l’annuaire.">
        <Choix label="Métier" value={d.activite} onChange={v => maj('activite', v)} options={METIERS.map(m => m.nom)} />
        <Zone
          label="Présentation"
          rows={6}
          max={600}
          value={d.description}
          onChange={v => maj('description', v)}
          aide="Vos services, votre expérience, les communes où vous intervenez."
        />
        <Case label="Sur devis (pas de tarif fixe)" checked={d.sur_devis} onChange={v => maj('sur_devis', v)} />
        {!d.sur_devis && (
          <Champ
            label="Tarif horaire (€)"
            type="number"
            inputMode="decimal"
            min={1}
            value={d.tarif_horaire}
            onChange={v => maj('tarif_horaire', v)}
            erreur={erreurs.tarif_horaire}
          />
        )}
      </Bloc>

      <Bloc titre="Vos coordonnées" intro="Votre téléphone s’affiche seulement quand un visiteur touche « Afficher le numéro ». Le WhatsApp passe par un bouton, sans afficher le numéro.">
        <Grille>
          <Champ label="Téléphone" type="tel" inputMode="tel" autoComplete="tel" value={d.telephone} onChange={v => maj('telephone', v)} erreur={erreurs.telephone} />
          <Champ label="WhatsApp" type="tel" inputMode="tel" value={d.whatsapp} onChange={v => maj('whatsapp', v)} erreur={erreurs.whatsapp} />
        </Grille>
        <Champ label="Site internet (facultatif)" type="url" inputMode="url" value={d.site_web} onChange={v => maj('site_web', v)} placeholder="https://" />
      </Bloc>

      <Bloc titre="Votre entreprise" intro="Ces informations servent à vérifier votre activité avant la mise en ligne. Le SIRET et l’adresse du siège ne sont pas affichés.">
        <Grille>
          <Champ label="Prénom" autoComplete="given-name" value={d.prenom} onChange={v => maj('prenom', v)} erreur={erreurs.prenom} />
          <Champ label="Nom ou nom de l’entreprise" autoComplete="family-name" value={d.nom} onChange={v => maj('nom', v)} erreur={erreurs.nom} />
        </Grille>
        <Champ label="Numéro SIRET" inputMode="numeric" value={d.siret} onChange={v => maj('siret', v)} erreur={erreurs.siret} placeholder="123 456 789 00012" />
        <Champ label="Adresse du siège" autoComplete="street-address" value={d.adresse_siege} onChange={v => maj('adresse_siege', v)} erreur={erreurs.adresse_siege} />
        <Grille>
          <Champ label="Ville" autoComplete="address-level2" value={d.ville} onChange={v => maj('ville', v)} erreur={erreurs.ville} />
          <Champ
            label="Code postal"
            inputMode="numeric"
            autoComplete="postal-code"
            value={d.code_postal}
            onChange={v => maj('code_postal', v)}
            erreur={erreurs.code_postal}
            aide="Il place votre fiche dans la bonne région."
          />
        </Grille>
      </Bloc>

      <Bloc titre="Visuels (facultatif)" intro="Un logo ou un flyer, puis des photos de vos réalisations.">
        <div className="flex flex-col gap-2">
          <h3 className="text-base font-bold">Logo ou flyer</h3>
          <TeleversementPhotos
            id="flyer"
            photos={d.flyer_url ? [d.flyer_url] : []}
            onChange={p => maj('flyer_url', p[0] ?? '')}
            max={1}
            principale={null}
          />
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="text-base font-bold">Photos de réalisations</h3>
          <TeleversementPhotos id="realisations" photos={d.photos} onChange={p => maj('photos', p)} principale={null} />
        </div>
      </Bloc>

      {creation && (
        <p className="rounded-[14px] bg-dog-soft px-4 py-3 text-base leading-relaxed text-ink-soft">
          Nous vérifions chaque fiche avant sa mise en ligne dans l’annuaire. Vous recevrez un e-mail dès qu’elle sera visible.
        </p>
      )}

      <div className="sticky bottom-0 -mx-5 flex flex-wrap items-center justify-end gap-3 border-t border-line bg-white px-5 py-3 sm:mx-0 sm:rounded-[18px] sm:border sm:px-4">
        <p aria-live="polite" className="mr-auto text-base font-semibold text-mint-ink">
          {enregistre ? 'Modifications enregistrées' : ''}
        </p>
        <Link href="/espace" className="inline-flex min-h-[48px] items-center rounded-[14px] px-4 text-base font-semibold text-ink-soft no-underline hover:bg-surface">
          {creation ? 'Annuler' : 'Retour à mon espace'}
        </Link>
        <button
          type="submit"
          disabled={envoi}
          aria-busy={envoi || undefined}
          className="inline-flex min-h-[48px] items-center rounded-[14px] bg-brand px-5 text-base font-bold text-white hover:bg-brand-strong disabled:opacity-70"
        >
          {envoi ? 'Envoi…' : creation ? 'Envoyer ma fiche' : 'Enregistrer les modifications'}
        </button>
      </div>
    </form>
  )
}
