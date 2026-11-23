import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import EspaceShell from '@/components/espace/EspaceShell'
import FormulairePrestataire from '@/components/espace/FormulairePrestataire'
import { getSessionUserId } from '@/lib/session'

export const dynamic = 'force-dynamic'
export const metadata: Metadata = { title: 'Rejoindre l’annuaire', robots: { index: false, follow: false } }

export default async function RejoindreAnnuairePage() {
  if (!(await getSessionUserId())) redirect('/connexion?redirect=/espace/devenir-prestataire')
  return (
    <EspaceShell
      titre="Rejoindre l’annuaire des prestataires"
      intro="Conciergerie, ménage, linge, photo, travaux : les propriétaires de LocaDirect vous contactent directement, sans intermédiaire."
    >
      <FormulairePrestataire />
    </EspaceShell>
  )
}
