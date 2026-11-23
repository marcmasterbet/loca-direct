import type { ReactNode } from 'react'
import { getSessionUserId } from '@/lib/session'
import SiteHeader from '@/components/site/SiteHeader'
import FilAriane from '@/components/pages/FilAriane'

/** Gabarit des pages légales : lisible, sobre, daté */
export default async function PageLegale({ titre, maj, children }: { titre: string; maj: string; children: ReactNode }) {
  const connecte = !!(await getSessionUserId())
  return (
    <div className="bg-white text-ink">
      <SiteHeader isLoggedIn={connecte} />
      <main id="contenu" className="mx-auto flex max-w-[760px] flex-col gap-8 px-5 pb-20 pt-4 sm:px-8 sm:pt-8">
        <FilAriane etapes={[{ nom: titre }]} />
        <header className="flex flex-col gap-2">
          <h1 className="text-balance text-[32px] font-bold leading-tight tracking-[-0.03em] sm:text-[40px]">{titre}</h1>
          <p className="text-base text-muted">Mise à jour le {maj}</p>
        </header>
        <div className="legal flex flex-col gap-4 text-base leading-[1.7] text-ink-soft">{children}</div>
      </main>
    </div>
  )
}
