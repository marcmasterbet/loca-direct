'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { chargerAnalytics, enregistrerChoix, EVENEMENT_OUVRIR, lireChoix, type Choix } from '@/lib/consentement'

/** Bandeau de consentement : « Accepter » et « Refuser » au même niveau, rien n'est mesuré avant un choix */
export default function BandeauCookies() {
  const [ouvert, setOuvert] = useState(false)
  const titre = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    const choix = lireChoix()
    if (choix === 'oui') chargerAnalytics()
    // Lecture du stockage du navigateur : possible seulement après l'affichage
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (choix === null) setOuvert(true)
    const ouvrir = () => {
      setOuvert(true)
      requestAnimationFrame(() => titre.current?.focus())
    }
    window.addEventListener(EVENEMENT_OUVRIR, ouvrir)
    return () => window.removeEventListener(EVENEMENT_OUVRIR, ouvrir)
  }, [])

  if (!ouvert) return null

  const choisir = (c: Choix) => {
    enregistrerChoix(c)
    setOuvert(false)
  }

  const bouton = 'flex min-h-[48px] flex-1 items-center justify-center rounded-[14px] px-5 text-base font-bold sm:flex-none sm:min-w-[140px]'

  return (
    <section
      role="region"
      aria-labelledby="cookies-titre"
      className="fixed inset-x-3 bottom-3 z-50 mx-auto flex max-w-[720px] flex-col gap-4 rounded-[22px] bg-white p-5 shadow-[0_0_0_1px_#e4e3ee,0_12px_32px_rgba(23,22,42,0.08)] sm:flex-row sm:items-center sm:p-6"
    >
      <div className="flex flex-1 flex-col gap-1">
        <h2 id="cookies-titre" ref={titre} tabIndex={-1} className="text-base font-bold text-ink outline-none">
          Mesure d’audience
        </h2>
        <p className="text-sm leading-relaxed text-ink-soft">
          Nous aimerions compter les visites avec Google Analytics pour améliorer le site. Rien n’est mesuré sans votre accord.{' '}
          <Link href="/cookies" className="font-semibold text-brand-strong underline underline-offset-2">
            En savoir plus
          </Link>
        </p>
      </div>
      <div className="flex gap-2">
        <button type="button" onClick={() => choisir('non')} className={`${bouton} bg-surface text-ink shadow-[inset_0_0_0_1.5px_#e4e3ee] hover:bg-brand-soft`}>
          Refuser
        </button>
        <button type="button" onClick={() => choisir('oui')} className={`${bouton} bg-brand text-white hover:bg-brand-strong`}>
          Accepter
        </button>
      </div>
    </section>
  )
}
