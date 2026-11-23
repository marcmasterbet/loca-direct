import type { Metadata } from 'next'
import Link from 'next/link'
import AuthShell from '@/components/forms/AuthShell'

export const metadata: Metadata = { title: 'Annonce envoyée', robots: { index: false, follow: false } }

export default function AnnonceEnvoyeePage() {
  return (
    <AuthShell
      titre="Annonce envoyée"
      intro="Merci ! Nous vérifions votre annonce et la mettons en ligne sous 24 à 48 heures. Vous recevrez un e-mail dès qu’elle sera visible."
    >
      <div className="flex flex-col gap-3">
        <Link href="/espace" className="flex min-h-[52px] items-center justify-center rounded-[14px] bg-brand px-5 text-base font-bold text-white no-underline hover:bg-brand-strong">
          Retour à mon espace
        </Link>
        <Link href="/espace/ma-vitrine" className="flex min-h-[52px] items-center justify-center rounded-[14px] px-5 text-base font-semibold text-ink no-underline shadow-[inset_0_0_0_1.5px_#e4e3ee] hover:bg-surface">
          Publier un autre logement
        </Link>
      </div>
    </AuthShell>
  )
}
