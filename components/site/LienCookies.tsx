'use client'

import { rouvrirBandeau } from '@/lib/consentement'

/** Bouton pour revenir sur son choix de cookies, à tout moment */
export default function LienCookies({ className, children = 'Gérer les cookies' }: { className?: string; children?: React.ReactNode }) {
  return (
    <button type="button" onClick={rouvrirBandeau} className={className}>
      {children}
    </button>
  )
}
