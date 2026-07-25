import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'
import type { Metadata } from 'next'
import LogementsClient from './LogementsClient'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Tous les logements | LocaDirect',
  description: "Trouvez votre logement de vacances en location directe, sans commission. Contact WhatsApp direct avec le propriétaire.",
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export default async function LogementsPage() {
  const cookieStore = await cookies()
  const isLoggedIn = !!cookieStore.get('loca_session')?.value

  const { data: logements } = await supabase
    .from('vitrines')
    .select('*')
    .in('statut', ['active', 'deja_loue', 'bientot_dispo'])
    .order('created_at', { ascending: false })

  return <LogementsClient logements={logements || []} isLoggedIn={isLoggedIn} />
}
