import type { ReactNode } from 'react'
import SiteHeader from '@/components/site/SiteHeader'

/** Mise en page des écrans de compte : connexion, inscription, mot de passe */
export default function AuthShell({
  titre,
  intro,
  children,
  pied,
}: {
  titre: string
  intro?: ReactNode
  children: ReactNode
  pied?: ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col bg-surface text-ink">
      <div className="bg-white">
        <SiteHeader />
      </div>
      <main id="contenu" className="mx-auto flex w-full max-w-[480px] flex-1 flex-col gap-5 px-5 py-10 sm:py-16">
        <div className="flex flex-col gap-6 rounded-[26px] bg-white p-6 shadow-[0_0_0_1px_#e4e3ee,0_8px_24px_rgba(23,22,42,0.06)] sm:p-8">
          <header className="flex flex-col gap-2">
            <h1 className="text-balance text-[28px] font-bold leading-tight tracking-[-0.03em]">{titre}</h1>
            {intro && <p className="text-base leading-relaxed text-ink-soft">{intro}</p>}
          </header>
          {children}
        </div>
        {pied && <div className="text-center text-base text-ink-soft [&_a]:inline-flex [&_a]:min-h-[44px] [&_a]:items-center">{pied}</div>}
      </main>
    </div>
  )
}

/** Message d'état (succès, lien envoyé…) dans le même cadre */
export function AuthMessage({ titre, children }: { titre: string; children: ReactNode }) {
  return (
    <AuthShell titre={titre}>
      <div className="flex flex-col gap-4 text-base leading-relaxed text-ink-soft">{children}</div>
    </AuthShell>
  )
}
