import { redirect } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'
import AdminPrestatairesClient from './AdminPrestatairesClient'
import { isAdmin } from '@/lib/session'

export const dynamic = 'force-dynamic'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export default async function AdminPrestatairesPage() {
  const adminOk = await isAdmin()

  if (!adminOk) redirect('/admin')

  const { data: prestataires } = await supabase
    .from('prestataires')
    .select('*, directloca_users(email)')
    .order('created_at', { ascending: false })

  return <AdminPrestatairesClient prestataires={prestataires || []} />
}