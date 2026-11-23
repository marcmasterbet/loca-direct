import Link from 'next/link'
import { SITE_URL } from '@/lib/seo'

export type Etape = { nom: string; href?: string }

/** Fil d'Ariane visible + données structurées pour Google */
export default function FilAriane({ etapes }: { etapes: Etape[] }) {
  const toutes: Etape[] = [{ nom: 'Accueil', href: '/' }, ...etapes]
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: toutes.map((e, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: e.nom,
      ...(e.href ? { item: `${SITE_URL}${e.href === '/' ? '' : e.href}` } : {}),
    })),
  }
  return (
    <nav aria-label="Fil d’Ariane" className="text-sm text-muted">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ol className="-mx-5 flex items-center gap-x-2 overflow-x-auto whitespace-nowrap px-5 [scrollbar-width:none] sm:mx-0 sm:px-0">
        {toutes.map((e, i) => (
          <li key={e.nom + i} className="flex items-center gap-2">
            {i > 0 && <span aria-hidden="true">›</span>}
            {e.href && i < toutes.length - 1 ? (
              <Link href={e.href} className="inline-flex min-h-[44px] items-center text-muted no-underline hover:text-ink">
                {e.nom}
              </Link>
            ) : (
              <span aria-current="page" className="inline-flex min-h-[44px] items-center text-ink-soft">
                {e.nom}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
