import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ARTICLES, type Article } from '@/lib/articles'
import { SITE_URL } from '@/lib/seo'
import { getSessionUserId } from '@/lib/session'
import SiteHeader from '@/components/site/SiteHeader'
import FilAriane from '@/components/pages/FilAriane'
import { slugifier } from '@/lib/france'

const TITRE = 'Le guide des vacances en France entre particuliers'
const DESCRIPTION =
  'Conseils pour louer sans commission, partir avec son chien, éviter les arnaques, et guides des régions : tout pour préparer des vacances réussies en France.'

export const metadata: Metadata = {
  title: { absolute: 'Guide des vacances en France : conseils et destinations' },
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/blog` },
  openGraph: { title: TITRE, description: DESCRIPTION, url: `${SITE_URL}/blog` },
}

function Carte({ a, grande = false }: { a: Article; grande?: boolean }) {
  return (
    <Link href={`/blog/${a.slug}`} className="group flex min-w-0 flex-col gap-3 text-ink no-underline">
      <div className={`relative overflow-hidden rounded-[18px] bg-surface ${grande ? 'aspect-[16/9]' : 'aspect-[4/3]'}`}>
        {a.photo && (
          <Image
            src={a.photo}
            alt=""
            fill
            sizes={grande ? '(max-width: 1024px) 100vw, 640px' : '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'}
            priority={grande}
            className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
        )}
      </div>
      <div className="flex flex-col gap-1.5">
        <span className="text-sm font-semibold text-brand">{a.categorie || 'Conseils'}</span>
        <strong className={`text-balance font-bold leading-snug group-hover:text-brand-strong ${grande ? 'text-2xl sm:text-3xl' : 'text-lg'}`}>
          {a.titre}
        </strong>
        {grande && <p className="max-w-[60ch] text-base leading-relaxed text-ink-soft">{a.description}</p>}
        <span className="text-sm text-muted">{a.lecture} de lecture</span>
      </div>
    </Link>
  )
}

export default async function BlogPage() {
  const isLoggedIn = !!(await getSessionUserId())
  const [une, ...autres] = ARTICLES
  const rubriques = [...new Set(ARTICLES.map(a => a.categorie || 'Conseils'))]

  return (
    <div className="bg-white text-ink">
      <SiteHeader isLoggedIn={isLoggedIn} current="guide" />
      <main id="contenu" className="mx-auto flex max-w-[1280px] flex-col gap-12 px-5 pb-20 sm:px-8">
        <FilAriane etapes={[{ nom: 'Le guide' }]} />
        <header className="-mt-6 flex flex-col gap-3">
          <h1 className="text-balance text-[34px] font-bold leading-[1.08] tracking-[-0.04em] sm:text-5xl">Le guide</h1>
          <p className="max-w-[60ch] text-lg leading-relaxed text-ink-soft">
            Louer sans commission, partir avec son chien, éviter les arnaques, choisir sa région : nos conseils pour des
            vacances réussies en France.
          </p>
        </header>

        {une && <Carte a={une} grande />}

        {rubriques.map(r => {
          const liste = autres.filter(a => (a.categorie || 'Conseils') === r)
          if (!liste.length) return null
          return (
            <section key={r} aria-labelledby={`rubrique-${slugifier(r)}`} className="flex flex-col gap-6 border-t border-line pt-10">
              <h2 id={`rubrique-${slugifier(r)}`} className="text-2xl font-bold tracking-[-0.02em]">
                {r}
              </h2>
              <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
                {liste.map(a => (
                  <Carte key={a.slug} a={a} />
                ))}
              </div>
            </section>
          )
        })}
      </main>
    </div>
  )
}
