import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'
import AdminVitrinesClient from './AdminVitrinesClient'

export const dynamic = 'force-dynamic'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export default async function AdminVitrinesPage() {
  const cookieStore = await cookies()
  const isAdmin = cookieStore.get('admin_session')?.value

  if (!isAdmin) redirect('/admin')

  const { data: vitrines } = await supabase
    .from('vitrines')
    .select('*, directloca_users(email)')
    .order('created_at', { ascending: false })

  return <AdminVitrinesClient vitrines={vitrines || []} />
}