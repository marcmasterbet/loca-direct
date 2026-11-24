import type { ReactNode } from 'react'
import Link from 'next/link'
import SiteHeader from '@/components/site/SiteHeader'
import FilAriane from '@/components/pages/FilAriane'
import Faq from '@/components/pages/Faq'
import Chiffres from '@/components/pages/Chiffres'

/** Page d'accueil des annonceurs (propriétaires ou prestataires) : promesse, étapes, avantages, FAQ */
export default function PageAcquisition({
  connecte,
  ariane,
  titre,
  intro,
  cta,
  chiffres,
  etapes,
  avantages,
  questions,
  apres,
}: {
  connecte: boolean
  ariane: string
  titre: string
  intro: string
  cta: { href: string; label: string }
  chiffres: { valeur: string; label: string }[]
  etapes: [string, string][]
  avantages: { titre: string; texte: string }[]
  questions: { q: string; r: string }[]
  apres?: ReactNode
}) {
  const bouton = (
    <Link href={cta.href} className="inline-flex min-h-[52px] items-center self-start rounded-[14px] bg-brand px-6 text-base font-bold text-white no-underline hover:bg-brand-strong">
      {cta.label}
    </Link>
  )
  return (
    <div className="bg-white text-ink">
      <SiteHeader isLoggedIn={connecte} />
      <main id="contenu" className="mx-auto flex max-w-[1080px] flex-col gap-16 px-5 pb-20 pt-4 sm:px-8 sm:pt-8">
        <FilAriane etapes={[{ nom: ariane }]} />

        <header className="flex max-w-[760px] flex-col gap-6">
          <h1 className="text-balance text-[34px] font-bold leading-[1.1] tracking-[-0.035em] sm:text-[52px]">{titre}</h1>
          <p className="text-[18px] leading-relaxed text-ink-soft">{intro}</p>
          {bouton}
          <Chiffres elements={chiffres} />
        </header>

        <section aria-labelledby="etapes" className="flex flex-col gap-6">
          <h2 id="etapes" className="text-[26px] font-bold tracking-[-0.025em] sm:text-[32px]">
            Comment ça marche
          </h2>
          <ol className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {etapes.map(([t, d], i) => (
              <li key={t} className="flex flex-col gap-2 rounded-[22px] p-6 shadow-[0_0_0_1px_#e4e3ee]">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-soft text-base font-bold text-brand-strong">{i + 1}</span>
                <h3 className="text-[18px] font-bold">{t}</h3>
                <p className="text-base leading-relaxed text-ink-soft">{d}</p>
              </li>
            ))}
          </ol>
        </section>

        <section aria-labelledby="avantages" className="flex flex-col gap-6 rounded-[26px] bg-surface p-6 sm:p-10">
          <h2 id="avantages" className="text-[26px] font-bold tracking-[-0.025em] sm:text-[32px]">
            Ce que vous y gagnez
          </h2>
          <ul className="grid grid-cols-1 gap-x-10 gap-y-6 sm:grid-cols-2">
            {avantages.map(a => (
              <li key={a.titre} className="flex flex-col gap-1.5">
                <h3 className="text-[18px] font-bold">{a.titre}</h3>
                <p className="text-base leading-relaxed text-ink-soft">{a.texte}</p>
              </li>
            ))}
          </ul>
        </section>

        {apres}

        <Faq questions={questions} />

        <section className="flex flex-col items-start gap-4 rounded-[26px] bg-night p-8 text-white sm:p-12">
          <h2 className="text-[26px] font-bold tracking-[-0.025em] sm:text-[32px]">Prêt à commencer ?</h2>
          <p className="max-w-[56ch] text-base leading-relaxed text-white/80">Gratuit, sans commission, sans engagement.</p>
          <Link href={cta.href} className="inline-flex min-h-[52px] items-center rounded-[14px] bg-white px-6 text-base font-bold text-ink no-underline hover:bg-brand-soft">
            {cta.label}
          </Link>
        </section>
      </main>
    </div>
  )
}
