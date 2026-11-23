import Link from 'next/link'
import Logo from './Logo'

const COLONNES = [
  {
    titre: 'Voyageurs',
    liens: [
      { href: '/logements', label: 'Tous les logements' },
      { href: '/logements/chiens', label: 'Chien accepté' },
      { href: '/blog/louer-en-securite', label: 'Louer en sécurité' },
      { href: '/blog', label: 'Le guide' },
    ],
  },
  {
    titre: 'Propriétaires',
    liens: [
      { href: '/inscription', label: 'Publier une annonce' },
      { href: '/alternative-airbnb', label: 'Comparer avec Airbnb' },
      { href: '/prestataires', label: 'Trouver un prestataire' },
      { href: '/inscription?profil=prestataire', label: 'Rejoindre l’annuaire' },
    ],
  },
  {
    titre: 'LocaDirect',
    liens: [
      { href: '/mentions-legales', label: 'Mentions légales' },
      { href: '/cgu', label: 'Conditions d’utilisation' },
      { href: '/politique-confidentialite', label: 'Confidentialité' },
      { href: '/cookies', label: 'Cookies' },
    ],
  },
]

export default function SiteFooter() {
  return (
    <footer className="border-t border-line bg-white">
      <div className="mx-auto flex max-w-[1280px] flex-col gap-10 px-5 py-12 sm:px-8">
        <div className="flex flex-wrap justify-between gap-10">
          <div className="flex max-w-xs flex-col gap-3">
            <Logo size={32} />
            <p className="text-base leading-relaxed text-muted">
              La location de vacances en direct avec le propriétaire, sans commission.
            </p>
          </div>
          <nav aria-label="Pied de page" className="flex flex-wrap gap-14 text-base">
            {COLONNES.map(col => (
              <div key={col.titre} className="flex flex-col gap-0.5">
                <h2 className="mb-1.5 text-base font-bold text-ink">{col.titre}</h2>
                {col.liens.map(l => (
                  <Link key={l.href} href={l.href} className="flex min-h-[44px] items-center text-muted no-underline hover:text-ink">
                    {l.label}
                  </Link>
                ))}
              </div>
            ))}
          </nav>
        </div>
        <p className="text-sm text-muted">© {new Date().getFullYear()} LocaDirect</p>
      </div>
    </footer>
  )
}
