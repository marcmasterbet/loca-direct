import Link from 'next/link'
import SiteHeader from '@/components/site/SiteHeader'
import { getSessionUserId } from '@/lib/session'
import { ARTICLES } from '@/lib/articles'
import type { ReactNode } from 'react'
import styles from './article.module.css'

const SITE_URL = 'https://www.loca-direct.fr'

export type ArticleSection = { id: string; titre: string }
export type ArticleFaq = { question: string; reponse: string }
export type ArticleSource = { titre: string; url: string }

type Props = {
  slug: string
  categorie: string
  titre: string
  chapeau: string
  /** Dates au format AAAA-MM-JJ. */
  publie: string
  misAJour: string
  lecture: string
  sections: ArticleSection[]
  faq?: ArticleFaq[]
  sources?: ArticleSource[]
  children: ReactNode
}

function dateFr(iso: string) {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  })
}

/**
 * Gabarit commun des articles du guide : fil d'Ariane, sommaire, FAQ,
 * sources et données structurées (Article, BreadcrumbList, FAQPage).
 */
export default async function ArticleLayout({
  slug,
  categorie,
  titre,
  chapeau,
  publie,
  misAJour,
  lecture,
  sections,
  faq = [],
  sources = [],
  children,
}: Props) {
  const url = `${SITE_URL}/blog/${slug}`
  const isLoggedIn = !!(await getSessionUserId())
  // Trois autres articles : d'abord ceux de la même rubrique
  const lies = ARTICLES.filter(a => a.slug !== slug)
    .sort((a, b) => Number(b.categorie === categorie) - Number(a.categorie === categorie))
    .slice(0, 3)

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: titre,
      description: chapeau,
      datePublished: publie,
      dateModified: misAJour,
      mainEntityOfPage: url,
      inLanguage: 'fr-FR',
      author: { '@type': 'Organization', name: 'LocaDirect', url: SITE_URL },
      publisher: { '@type': 'Organization', name: 'LocaDirect', url: SITE_URL },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Le guide', item: `${SITE_URL}/blog` },
        { '@type': 'ListItem', position: 3, name: titre, item: url },
      ],
    },
    ...(faq.length
      ? [
          {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faq.map(f => ({
              '@type': 'Question',
              name: f.question,
              acceptedAnswer: { '@type': 'Answer', text: f.reponse },
            })),
          },
        ]
      : []),
  ]

  const sommaire = (
    <ol>
      {sections.map(s => (
        <li key={s.id}>
          <a href={`#${s.id}`}>{s.titre}</a>
        </li>
      ))}
      {faq.length > 0 && (
        <li>
          <a href="#questions-frequentes">Questions fréquentes</a>
        </li>
      )}
    </ol>
  )

  return (
    <div className={styles.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />

      <SiteHeader isLoggedIn={isLoggedIn} current="guide" />

      <main id="contenu" className={styles.layout}>
        <article>
          <nav aria-label="Fil d’Ariane">
            <ol className={styles.crumbs}>
              <li>
                <Link href="/">Accueil</Link>
              </li>
              <li>
                <Link href="/blog">Le guide</Link>
              </li>
              <li aria-current="page">{categorie}</li>
            </ol>
          </nav>

          <span className={styles.category}>{categorie}</span>
          <h1 className={styles.title}>{titre}</h1>
          <p className={styles.lead}>{chapeau}</p>
          <p className={styles.meta}>
            Par l’équipe LocaDirect · Mis à jour le <time dateTime={misAJour}>{dateFr(misAJour)}</time> ·{' '}
            {lecture} de lecture
          </p>

          <nav className={styles.tocInline} aria-label="Sommaire">
            {sommaire}
          </nav>

          <div className={styles.body}>
            {children}

            {faq.length > 0 && (
              <section className={styles.faq} aria-labelledby="questions-frequentes">
                <h2 id="questions-frequentes">Questions fréquentes</h2>
                {faq.map(f => (
                  <details key={f.question}>
                    <summary>{f.question}</summary>
                    <p>{f.reponse}</p>
                  </details>
                ))}
              </section>
            )}

            {sources.length > 0 && (
              <section className={styles.sources} aria-labelledby="sources">
                <h2 id="sources">Sources</h2>
                <p>
                  Informations vérifiées le {dateFr(misAJour)}. Les règles locales (plages, parcs, transports) peuvent
                  changer : vérifiez-les avant votre départ.
                </p>
                <ul>
                  {sources.map(s => (
                    <li key={s.url}>
                      <a href={s.url} target="_blank" rel="noopener noreferrer">
                        {s.titre}
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>

          {lies.length > 0 && (
            <nav className={styles.lies} aria-labelledby="a-lire-aussi">
              <h2 id="a-lire-aussi">À lire aussi</h2>
              <ul>
                {lies.map(a => (
                  <li key={a.slug}>
                    <Link href={`/blog/${a.slug}`}>
                      <strong>{a.titre}</strong>
                      <span>{a.lecture} de lecture</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </article>

        <aside className={styles.aside}>
          <nav className={styles.toc} aria-label="Sommaire">
            <p>Sommaire</p>
            {sommaire}
          </nav>
        </aside>
      </main>
    </div>
  )
}

export { styles as articleStyles }
