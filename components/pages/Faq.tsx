export type Question = { q: string; r: string }

/** Questions fréquentes, ouvrables au clic, avec les données FAQ pour Google */
export default function Faq({ titre = 'Questions fréquentes', questions }: { titre?: string; questions: Question[] }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: questions.map(({ q, r }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: r },
    })),
  }
  return (
    <section className="flex flex-col gap-4" aria-labelledby="faq-titre">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <h2 id="faq-titre" className="text-balance text-2xl font-bold tracking-[-0.02em]">
        {titre}
      </h2>
      <div className="divide-y divide-line rounded-[22px] border border-line">
        {questions.map(({ q, r }) => (
          <details key={q} className="group px-5">
            <summary className="flex min-h-[56px] cursor-pointer list-none items-center justify-between gap-4 py-3 text-base font-semibold [&::-webkit-details-marker]:hidden">
              {q}
              <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" className="shrink-0 text-muted group-open:rotate-180">
                <path d="m4 6 4 4 4-4" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </summary>
            <p className="max-w-[68ch] pb-5 text-base leading-relaxed text-ink-soft">{r}</p>
          </details>
        ))}
      </div>
    </section>
  )
}
