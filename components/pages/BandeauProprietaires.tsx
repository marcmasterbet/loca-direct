import Link from 'next/link'

/** Appel aux propriétaires en bas des pages de liste */
export default function BandeauProprietaires({
  titre,
  texte,
  href = '/inscription',
}: {
  titre: string
  texte: string
  href?: string
}) {
  return (
    <section className="flex flex-col items-start gap-4 rounded-[28px] bg-ink p-8 text-white sm:flex-row sm:items-center sm:justify-between sm:p-10">
      <div className="flex max-w-[640px] flex-col gap-2">
        <h2 className="text-balance text-2xl font-bold tracking-[-0.02em]">{titre}</h2>
        <p className="text-base leading-relaxed text-[#c9c7dc]">{texte}</p>
      </div>
      <Link
        href={href}
        className="flex min-h-[48px] shrink-0 items-center rounded-[14px] bg-brand px-5 text-base font-bold text-white no-underline hover:bg-brand-strong"
      >
        Publier mon logement gratuitement
      </Link>
    </section>
  )
}
