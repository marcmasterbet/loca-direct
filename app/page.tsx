import { createClient } from '@supabase/supabase-js'
import HomeClient from './HomeClient'

export const dynamic = 'force-dynamic'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export default async function Home() {
  const { data: vitrines } = await supabase
    .from('vitrines')
    .select('*')
    .in('statut', ['active', 'deja_loue', 'bientot_dispo'])
    .order('created_at', { ascending: false })
    .limit(8)

  const { data: prestataires } = await supabase
    .from('prestataires')
    .select('*')
    .eq('statut', 'active')
    .order('created_at', { ascending: false })
    .limit(4)

  return <HomeClient vitrines={vitrines || []} prestataires={prestataires || []} />
}
