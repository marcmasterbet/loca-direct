import type { Metadata } from 'next'
import Link from 'next/link'
import SiteHeader from '@/components/site/SiteHeader'

export const metadata: Metadata = { title: 'Page introuvable', robots: { index: false, follow: true } }

const LIENS = [
  { href: '/logements', label: 'Voir tous les logements' },
  { href: '/logements/chiens', label: 'Logements où le chien est accepté' },
  { href: '/prestataires', label: 'Trouver un prestataire' },
  { href: '/blog', label: 'Lire le guide' },
]

export default function NotFound() {
  return (
    <div className="bg-surface text-ink">
      <div className="bg-white">
        <SiteHeader />
      </div>
      <main id="contenu" className="mx-auto flex max-w-[640px] flex-col gap-6 px-5 py-16 sm:py-24">
        <p className="text-base font-semibold text-brand-strong">Erreur 404</p>
        <h1 className="text-balance text-[32px] font-bold leading-tight tracking-[-0.03em] sm:text-[40px]">
          Cette page n’existe pas ou plus
        </h1>
        <p className="text-base leading-relaxed text-ink-soft">
          Le logement a peut-être été loué ou retiré par son propriétaire, ou l’adresse contient une erreur. Voici de quoi
          reprendre votre recherche.
        </p>
        <ul className="flex flex-col gap-2">
          {LIENS.map(l => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="flex min-h-[52px] items-center justify-between gap-3 rounded-[14px] bg-white px-5 text-base font-semibold text-ink no-underline shadow-[0_0_0_1px_#e4e3ee] hover:shadow-[0_0_0_1.5px_#c9bffb]"
              >
                {l.label}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="text-muted">
                  <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </li>
          ))}
        </ul>
        <Link href="/" className="inline-flex min-h-[48px] items-center self-start rounded-[14px] bg-brand px-5 text-base font-bold text-white no-underline hover:bg-brand-strong">
          Retour à l’accueil
        </Link>
      </main>
    </div>
  )
}
