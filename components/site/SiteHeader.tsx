import Link from 'next/link'
import Logo from './Logo'

type Props = {
  isLoggedIn?: boolean
  current?: 'logements' | 'chiens' | 'prestataires' | 'guide'
}

const LIENS = [
  { key: 'logements', href: '/logements', label: 'Logements' },
  { key: 'chiens', href: '/logements/chiens', label: 'Chien accepté' },
  { key: 'prestataires', href: '/prestataires', label: 'Prestataires' },
  { key: 'guide', href: '/blog', label: 'Le guide' },
] as const

export default function SiteHeader({ isLoggedIn = false, current }: Props) {
  const publier = isLoggedIn ? '/espace/ma-vitrine' : '/publier'
  const compte = isLoggedIn
    ? { href: '/espace', label: 'Mon espace' }
    : { href: '/connexion', label: 'Se connecter' }

  return (
    <header className="relative mx-auto flex max-w-[1280px] items-center justify-between gap-5 px-5 py-4 sm:px-8 sm:py-5">
      <Link href="/" aria-label="LocaDirect, accueil" className="flex min-h-[44px] items-center no-underline">
        <Logo />
      </Link>

      {/* Ordinateur et tablette : menu visible */}
      <nav
        aria-label="Navigation principale"
        className="hidden gap-1.5 rounded-[14px] bg-surface p-1.5 text-base font-semibold lg:flex"
      >
        {LIENS.map(l => (
          <Link
            key={l.key}
            href={l.href}
            aria-current={current === l.key ? 'page' : undefined}
            className={`flex min-h-[44px] items-center whitespace-nowrap rounded-[10px] px-4 no-underline ${
              current === l.key
                ? 'bg-white text-ink shadow-[0_0_0_1px_#e4e3ee]'
                : 'text-ink-soft hover:bg-white/60 hover:text-ink'
            }`}
          >
            {l.label}
          </Link>
        ))}
      </nav>

      <div className="flex items-center gap-2 text-base font-semibold sm:gap-3">
        <Link
          href={compte.href}
          className="hidden min-h-[44px] items-center rounded-[12px] px-3 text-ink no-underline hover:bg-surface lg:flex"
        >
          {compte.label}
        </Link>
        <Link
          href={publier}
          className="flex min-h-[44px] items-center rounded-[14px] bg-ink px-4 text-white no-underline hover:bg-black"
        >
          <span className="sm:hidden">Publier</span>
          <span className="hidden sm:inline">Publier une annonce</span>
        </Link>

        {/* Téléphone : un bouton Menu qui ouvre les mêmes liens */}
        <details className="group lg:hidden">
          <summary
            aria-label="Ouvrir le menu"
            className="flex h-[44px] w-[44px] cursor-pointer list-none items-center justify-center rounded-[14px] bg-surface text-ink hover:bg-brand-soft [&::-webkit-details-marker]:hidden"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true" className="group-open:hidden">
              <path d="M3 6h14M3 10h14M3 14h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
            <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true" className="hidden group-open:block">
              <path d="M5 5l10 10M15 5 5 15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </summary>
          <nav
            aria-label="Navigation principale"
            className="absolute inset-x-5 top-full z-50 flex flex-col gap-1 rounded-[22px] bg-white p-2 text-base font-semibold shadow-[0_0_0_1px_#e4e3ee,0_12px_32px_rgba(23,22,42,0.08)] sm:inset-x-8"
          >
            {LIENS.map(l => (
              <Link
                key={l.key}
                href={l.href}
                aria-current={current === l.key ? 'page' : undefined}
                className={`flex min-h-[48px] items-center rounded-[14px] px-4 no-underline ${
                  current === l.key ? 'bg-brand-soft text-brand-strong' : 'text-ink hover:bg-surface'
                }`}
              >
                {l.label}
              </Link>
            ))}
            <Link
              href={compte.href}
              className="mt-1 flex min-h-[48px] items-center rounded-[14px] border-t border-line px-4 text-ink no-underline hover:bg-surface"
            >
              {compte.label}
            </Link>
          </nav>
        </details>
      </div>
    </header>
  )
}
