import type { ReactNode } from 'react'
import Link from 'next/link'
import SiteHeader from '@/components/site/SiteHeader'

/** Mise en page des écrans de l'espace : en-tête du site, lien retour, titre */
export default function EspaceShell({ titre, intro, children, retour = { href: '/espace', label: 'Mon espace' } }: {
  titre: string
  intro?: ReactNode
  children: ReactNode
  retour?: { href: string; label: string }
}) {
  return (
    <div className="flex min-h-screen flex-col bg-surface text-ink">
      <div className="bg-white">
        <SiteHeader isLoggedIn />
      </div>
      <main id="contenu" className="mx-auto flex w-full max-w-[760px] flex-1 flex-col gap-6 px-5 pb-16 pt-6 sm:px-8 sm:pt-10">
        <Link href={retour.href} className="-ml-2 inline-flex min-h-[44px] items-center gap-1.5 self-start rounded-[10px] px-2 text-base font-semibold text-ink-soft no-underline hover:text-ink">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          {retour.label}
        </Link>
        <header className="flex flex-col gap-2">
          <h1 className="text-balance text-[28px] font-bold leading-tight tracking-[-0.03em] sm:text-[34px]">{titre}</h1>
          {intro && <p className="max-w-[60ch] text-base leading-relaxed text-ink-soft">{intro}</p>}
        </header>
        {children}
      </main>
    </div>
  )
}
