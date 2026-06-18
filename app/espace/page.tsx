import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'
import EspaceClient from './EspaceClient'

export const dynamic = 'force-dynamic'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export default async function EspacePage() {
  const cookieStore = await cookies()
  const userId = cookieStore.get('loca_session')?.value

  if (!userId) redirect('/connexion')

  const { data: user } = await supabase
    .from('directloca_users')
    .select('*')
    .eq('id', userId)
    .single()

  if (!user) redirect('/connexion')

  const { data: vitrines } = await supabase
    .from('vitrines')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  const { data: favorisData } = await supabase
    .from('favoris')
    .select('*, vitrines(*)')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  const { data: alertes } = await supabase
    .from('alertes')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  const { data: toutesVitrines } = await supabase
    .from('vitrines')
    .select('*')
    .in('statut', ['active', 'deja_loue', 'bientot_dispo'])
    .order('created_at', { ascending: false })
    .limit(50)

  return (
    <EspaceClient
      user={user}
      vitrines={vitrines || []}
      favoris={favorisData || []}
      alertes={alertes || []}
      toutesVitrines={toutesVitrines || []}
    />
  )
}