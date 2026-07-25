import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'
import type { Metadata } from 'next'
import PrestatairesClient from './PrestatairesClient'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Annuaire des prestataires',
  description: "Trouvez gratuitement des prestataires pour votre logement : conciergerie, ménage, photographe, aide au digital. Annuaire vérifié, contact direct par WhatsApp ou téléphone.",
  openGraph: {
    title: 'Annuaire des prestataires | LocaDirect',
    description: "Conciergerie, ménage, photographe, digital... trouvez les bons partenaires pour votre logement, gratuitement.",
  },
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export default async function PrestatairesPage() {
  const cookieStore = await cookies()
  const isLoggedIn = !!cookieStore.get('loca_session')?.value

  const { data: prestataires } = await supabase
    .from('prestataires')
    .select('*')
    .eq('statut', 'active')
    .order('created_at', { ascending: false })

  return <PrestatairesClient prestataires={prestataires || []} isLoggedIn={isLoggedIn} />
}
