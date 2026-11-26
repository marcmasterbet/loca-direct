'use client'

import { useState } from 'react'
import { trackEvent } from '@/lib/analytics'

/** Pour les voyageurs sans WhatsApp : afficher le numéro, puis appeler ou envoyer un SMS */
export default function AutreContact({ id, ville }: { id: string; ville?: string | null }) {
  const [telephone, setTelephone] = useState<string | null>(null)
  const [etat, setEtat] = useState<'repos' | 'chargement' | 'erreur'>('repos')

  const afficher = async () => {
    setEtat('chargement')
    try {
      const res = await fetch(`/api/telephone?logement=${encodeURIComponent(id)}`)
      const json = (await res.json()) as { telephone: string | null }
      if (!json.telephone) throw new Error('absent')
      setTelephone(json.telephone)
      setEtat('repos')
      trackEvent('affichage_telephone_logement', { logement_id: id, ville })
    } catch {
      setEtat('erreur')
    }
  }

  const lien = (telephone || '').replace(/[^0-9+]/g, '')
  const bouton =
    'flex min-h-[48px] flex-1 items-center justify-center rounded-2xl px-4 text-base font-bold text-ink no-underline shadow-[inset_0_0_0_1.5px_#e4e3ee] hover:bg-surface'

  if (telephone) {
    return (
      <div className="flex flex-col gap-2">
        <p className="text-center text-base font-semibold tabular-nums">{telephone}</p>
        <div className="flex gap-2">
          <a href={`tel:${lien}`} onClick={() => trackEvent('clic_appel_logement', { logement_id: id })} className={bouton}>
            Appeler
          </a>
          <a href={`sms:${lien}`} onClick={() => trackEvent('clic_sms_logement', { logement_id: id })} className={bouton}>
            Envoyer un SMS
          </a>
        </div>
      </div>
    )
  }
  return (
    <div className="flex flex-col gap-1">
      <button type="button" onClick={afficher} disabled={etat === 'chargement'} className={`${bouton} w-full text-ink-soft`}>
        {etat === 'chargement' ? 'Affichage…' : 'Pas WhatsApp ? Afficher le numéro'}
      </button>
      {etat === 'erreur' && (
        <p role="alert" className="text-center text-sm text-[#b42318]">
          Numéro indisponible pour le moment. Réessayez ou écrivez sur WhatsApp.
        </p>
      )}
    </div>
  )
}
