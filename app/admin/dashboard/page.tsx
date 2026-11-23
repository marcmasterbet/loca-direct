import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'
import AdminDashboardClient from './AdminDashboardClient'
import { isAdmin } from '@/lib/session'

export const dynamic = 'force-dynamic'
export const metadata: Metadata = { title: 'Administration', robots: { index: false, follow: false } }

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

export default async function AdminDashboardPage({ searchParams }: { searchParams: Promise<{ onglet?: string }> }) {
  if (!(await isAdmin())) redirect('/admin')
  const { onglet } = await searchParams

  const [{ data: vitrines }, { data: prestataires }, { count: comptes }] = await Promise.all([
    supabase.from('vitrines').select('*, directloca_users(email)').order('created_at', { ascending: false }),
    supabase.from('prestataires').select('*, directloca_users(email)').order('created_at', { ascending: false }),
    supabase.from('directloca_users').select('id', { count: 'exact', head: true }),
  ])

  return (
    <AdminDashboardClient
      ongletInitial={onglet === 'prestataires' ? 'prestataires' : 'logements'}
      vitrines={vitrines || []}
      prestataires={prestataires || []}
      nbComptes={comptes ?? null}
    />
  )
}
