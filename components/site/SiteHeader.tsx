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
  return (
    <header className="mx-auto flex max-w-[1280px] flex-wrap items-center justify-between gap-x-5 gap-y-3 px-5 py-4 sm:px-8 sm:py-5">
      <Link href="/" aria-label="LocaDirect, accueil" className="no-underline">
        <Logo />
      </Link>

      <nav
        aria-label="Navigation principale"
        className="order-3 flex w-full gap-1.5 overflow-x-auto rounded-[14px] bg-surface p-1.5 text-[15px] font-semibold md:order-none md:w-auto"
      >
        {LIENS.map(l => (
          <Link
            key={l.key}
            href={l.href}
            aria-current={current === l.key ? 'page' : undefined}
            className={`whitespace-nowrap rounded-[10px] px-4 py-2.5 no-underline transition-colors ${
              current === l.key
                ? 'bg-white text-ink shadow-[0_1px_2px_rgba(23,22,42,0.08)]'
                : 'text-ink-soft hover:text-ink'
            }`}
          >
            {l.label}
          </Link>
        ))}
      </nav>

      <div className="flex items-center gap-3 text-sm font-semibold sm:gap-4 sm:text-[15px]">
        {isLoggedIn ? (
          <Link href="/espace" className="text-ink no-underline hover:text-brand">
            Mon espace
          </Link>
        ) : (
          <Link href="/connexion" className="hidden text-ink no-underline hover:text-brand sm:inline">
            Connexion
          </Link>
        )}
        <Link
          href={isLoggedIn ? '/espace/ma-vitrine' : '/inscription'}
          className="rounded-[14px] bg-ink px-3.5 py-2.5 text-white no-underline hover:bg-black sm:px-4 sm:py-3"
        >
          <span className="sm:hidden">Publier</span>
          <span className="hidden sm:inline">Publier une annonce</span>
        </Link>
      </div>
    </header>
  )
}
