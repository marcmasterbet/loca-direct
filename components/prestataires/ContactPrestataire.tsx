'use client'

import { useState } from 'react'
import { trackEvent } from '@/lib/analytics'

type Props = {
  id: string
  prenom: string
  activite: string | null
  ville: string | null
  aWhatsapp: boolean
  aTelephone: boolean
  siteWeb: string | null
}

/** Boutons de contact : WhatsApp, téléphone affiché au clic, site web */
export default function ContactPrestataire({ id, prenom, activite, ville, aWhatsapp, aTelephone, siteWeb }: Props) {
  const [telephone, setTelephone] = useState<string | null>(null)
  const [etat, setEtat] = useState<'repos' | 'chargement' | 'erreur'>('repos')
  const suivi = { prestataire_id: id, activite, ville }

  async function afficherNumero() {
    setEtat('chargement')
    try {
      const res = await fetch(`/api/telephone?prestataire=${encodeURIComponent(id)}`)
      const json = (await res.json()) as { telephone: string | null }
      if (!json.telephone) throw new Error('absent')
      setTelephone(json.telephone)
      setEtat('repos')
      trackEvent('affichage_telephone_prestataire', suivi)
    } catch {
      setEtat('erreur')
    }
  }

  return (
    <div className="flex flex-col gap-2.5">
      {aWhatsapp && (
        <a
          href={`/api/whatsapp?prestataire=${encodeURIComponent(id)}`}
          target="_blank"
          rel="nofollow noreferrer"
          onClick={() => trackEvent('clic_whatsapp_prestataire', suivi)}
          className="flex min-h-[56px] items-center justify-center gap-2.5 rounded-2xl bg-[#25D366] px-5 text-lg font-bold text-white no-underline hover:bg-[#1ebe5b]"
        >
          Écrire à {prenom} sur WhatsApp
        </a>
      )}
      {aTelephone &&
        (telephone ? (
          <a
            href={`tel:${telephone.replace(/[^0-9+]/g, '')}`}
            onClick={() => trackEvent('appel_prestataire', suivi)}
            className="flex min-h-[48px] items-center justify-center rounded-2xl px-5 text-base font-bold text-ink no-underline shadow-[inset_0_0_0_1.5px_#e4e3ee] hover:shadow-[inset_0_0_0_1.5px_#17162a]"
          >
            Appeler le {telephone}
          </a>
        ) : (
          <button
            type="button"
            onClick={afficherNumero}
            disabled={etat === 'chargement'}
            className="flex min-h-[48px] items-center justify-center rounded-2xl px-5 text-base font-bold text-ink shadow-[inset_0_0_0_1.5px_#e4e3ee] hover:shadow-[inset_0_0_0_1.5px_#17162a] disabled:text-muted"
          >
            {etat === 'chargement' ? 'Affichage du numéro…' : 'Afficher le numéro'}
          </button>
        ))}
      {etat === 'erreur' && (
        <p role="alert" className="text-sm text-ink-soft">
          Le numéro n’a pas pu s’afficher. Écrivez-lui sur WhatsApp ou réessayez dans un instant.
        </p>
      )}
      {siteWeb && (
        <a
          href={siteWeb}
          target="_blank"
          rel="noreferrer"
          onClick={() => trackEvent('clic_site_prestataire', suivi)}
          className="flex min-h-[48px] items-center justify-center rounded-2xl px-5 text-base font-bold text-brand no-underline shadow-[inset_0_0_0_1.5px_#c9bffb] hover:bg-brand-soft"
        >
          Voir son site internet
        </a>
      )}
    </div>
  )
}
