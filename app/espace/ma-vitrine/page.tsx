import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import EspaceShell from '@/components/espace/EspaceShell'
import FormulaireLogement from '@/components/espace/FormulaireLogement'
import { getSessionUserId } from '@/lib/session'

export const dynamic = 'force-dynamic'
export const metadata: Metadata = { title: 'Publier un logement', robots: { index: false, follow: false } }

export default async function PublierLogementPage() {
  if (!(await getSessionUserId())) redirect('/connexion?redirect=/espace/ma-vitrine')
  return (
    <EspaceShell titre="Publier un logement" intro="Gratuit et sans commission. Comptez une dizaine de minutes, photos comprises.">
      <FormulaireLogement />
    </EspaceShell>
  )
}
