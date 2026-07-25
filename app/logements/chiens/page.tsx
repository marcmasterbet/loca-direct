import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'
import type { Metadata } from 'next'
import ChiensClient from './ChiensClient'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Location vacances chiens acceptés +10 kg | LocaDirect',
  description: "Trouvez votre logement de vacances acceptant les grands chiens (+10 kg). Location directe sans commission, contact WhatsApp direct avec le propriétaire.",
  openGraph: {
    title: 'Logements acceptant les chiens +10 kg | LocaDirect',
    description: "Location vacances avec grands chiens acceptés. Gîtes, maisons, appartements qui accueillent vos chiens de plus de 10 kg.",
  },
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export default async function ChiensPage() {
  const cookieStore = await cookies()
  const isLoggedIn = !!cookieStore.get('loca_session')?.value

  const { data: logements } = await supabase
    .from('vitrines')
    .select('*')
    .in('statut', ['active', 'deja_loue', 'bientot_dispo'])
    .filter('equipements', 'cs', '["chien_10kg"]')
    .order('created_at', { ascending: false })

  return <ChiensClient logements={logements || []} isLoggedIn={isLoggedIn} />
}
